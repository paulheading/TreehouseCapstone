import React from "react";
import {
  limitString,
  getRoute,
  createRoute,
  isSaved,
} from "../../modules/helpers";
import { Card, CardDeck, Button } from "react-bootstrap";
import { RemoveIcon } from "../SvgIcon/SvgIcon";
import RelatedArtists from "../RelatedArtists/RelatedArtists";
import PropTypes from "prop-types";
import "./AlbumResults.scss";

export default function AlbumResults({
  searchTerm,
  currentUser,
  albums,
  savedFilms,
  setAlbums,
  setBlackLists,
  setIsLoginOpen,
  setSavedFilms,
}) {
  let printAlbums = null;

  if (albums) {
    printAlbums = albums
      .slice(0, 3)
      .map(
        ({ id, name, external_urls, images, release_date, related }, index) => {
          return (
            <Card className="album-results" key={index}>
              <Button
                variant="link"
                className="remove-album"
                onClick={async () => {
                  if (currentUser) {
                    if (!isSaved(savedFilms, searchTerm)) {
                      createRoute("saved", {
                        userId: currentUser.id,
                        searchTerm,
                      });
                      setSavedFilms(await getRoute("saved", currentUser.id));
                    }
                    createRoute("blacklist", {
                      userId: currentUser.id,
                      searchTerm,
                      albumId: id,
                    });
                    setBlackLists(await getRoute("blacklist", currentUser.id));
                    setAlbums(id);
                  } else {
                    setIsLoginOpen(true);
                  }
                }}
                inline="true"
              >
                <RemoveIcon />
              </Button>
              <Card.Header className="album-results">
                <img
                  className="album-results"
                  alt={limitString(name)}
                  src={images[0].url}
                />
              </Card.Header>
              <Card.Body>
                <Card.Title className="album-results">
                  <h2>{limitString(name)}</h2>
                </Card.Title>
                <Card.Subtitle className="album-results text-muted">
                  <h2>{release_date}</h2>
                </Card.Subtitle>
                <Button
                  size="sm"
                  target="_blank"
                  className="find-album"
                  href={external_urls.spotify}
                  block
                >
                  Find on Spotify
                </Button>
                {related.length ? <RelatedArtists related={related} /> : null}
              </Card.Body>
            </Card>
          );
        }
      );
  }
  return (
    <div className="album-results container">
      <CardDeck className="album-results">{printAlbums}</CardDeck>
    </div>
  );
}

AlbumResults.propTypes = {
  searchTerm: PropTypes.string,
  currentUser: PropTypes.object,
  albums: PropTypes.array,
  savedFilms: PropTypes.array,
};
