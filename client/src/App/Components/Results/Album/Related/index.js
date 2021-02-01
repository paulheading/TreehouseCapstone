import React, { useState } from "react";
import { XLinkIcon, NextIcon, PrevIcon } from "../../../Icons";
import { limitString } from "../../../../modules/helpers";
import PropTypes from "prop-types";

export default function RelatedResults({ related }) {
  const artist = {
    total: related.length,
    minimum: 3,
  };
  const [nextClicks, setNextClicks] = useState(0);

  artist.excess = artist.total - 4;

  function displayNext() {
    if (artist.total > artist.minimum) {
      if (nextClicks <= artist.excess) {
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
        <div className="related-artists__view">
          {related.map(({ name, url }, index) => {
            return (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="related-artists__link"
              >
                <div>{limitString(name, 20)}</div>
                <XLinkIcon />
              </a>
            );
          })}
        </div>
      </div>
      {displayNext()}
    </div>
  );
}

RelatedResults.propTypes = {
  related: PropTypes.array,
};
