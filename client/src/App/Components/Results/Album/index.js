import React from "react";
import { connect, useSelector } from "react-redux";
import { Card, CardDeck, Button } from "react-bootstrap";
import { RemoveResultButton } from "../../Buttons";
import RelatedResults from "./Related";
import { limitString } from "../../../modules/helpers";

function AlbumResults() {
  const results = useSelector((state) => state.albumResults);

  return (
    <div className="album-results container">
      <CardDeck className="album-results">
        {results
          .slice(0, 6)
          .map(({ id, name, url, images, release_date, artists }, index) => {
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
                  {artists ? <RelatedResults related={artists} /> : null}
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

export default connect(mapStateToProps)(AlbumResults);
