import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { XLinkIcon, NextIcon, PrevIcon } from "../SvgIcon/SvgIcon";
import PropTypes from "prop-types";
import "./RelatedArtists.scss";

export default function RelatedArtists({ related }) {
  const artist = {
    total: related.length,
    minimum: 3,
  };
  const [nextClicks, setNextClicks] = useState(0);

  artist.excess = artist.total - 4;

  function displayNext() {
    if (artist.total > artist.minimum) {
      if (nextClicks < artist.excess) {
        return (
          <div className="related-artists next">
            <NextIcon
              limit={artist.total}
              nextClicks={nextClicks}
              setNextClicks={(delta) => {
                setNextClicks(delta);
              }}
            />
          </div>
        );
      }
    }
  }
  return (
    <div className="related-artists container">
      {nextClicks > 0 ? (
        <div className="related-artists prev">
          <PrevIcon
            limit={artist.total}
            nextClicks={nextClicks}
            setNextClicks={(delta) => {
              setNextClicks(delta);
            }}
          />
        </div>
      ) : null}
      <div className="related-artists wrap">
        <Table striped className="related-artists">
          <tbody>
            {related.map(({ name, url }, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Button
                      href={url}
                      className="related-artists"
                      target="_blank"
                      variant="link"
                    >
                      {name}
                    </Button>
                  </td>
                  <td style={{ width: "5rem" }}>
                    <Button
                      href={url}
                      className="related-artists"
                      target="_blank"
                      variant="link"
                    >
                      <XLinkIcon />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {displayNext()}
    </div>
  );
}

RelatedArtists.propTypes = {
  related: PropTypes.array,
};
