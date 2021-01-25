import React from "react";
import { connect, useSelector } from "react-redux";
import { Card, CardDeck, Button } from "react-bootstrap";
import { RemoveResultButton } from "../Buttons";
import RelatedResults from "./Related";
import { limitString } from "../../modules/helpers";
import { albumResults } from "../../../actions";

function AlbumResults({ albumResults }) {
  const state = {
    albumResults: useSelector((state) => state.albumResults),
    searchQuery: useSelector((state) => state.searchQuery),
    currentUser: useSelector((state) => state.currentUser),
    blackList: useSelector((state) => state.blackList),
  };

  return (
    <div className="album-results container">
      <CardDeck className="album-results">
        {state.albumResults
          .slice(0, 6)
          .map(({ id, name, url, images, release_date, related }, index) => {
            return (
              <Card className="album-results" key={index}>
                <RemoveResultButton id={id} />
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
                    href={url}
                    block
                  >
                    Find on Spotify
                  </Button>
                  {related ? <RelatedResults related={related} /> : null}
                </Card.Body>
              </Card>
            );
          })}
      </CardDeck>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { albumResults })(AlbumResults);