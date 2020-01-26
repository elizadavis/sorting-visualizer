import React from 'react';
import { DEFAULTS } from 'Store/constants';

export const ArrayContainer = ({ currentPhase, showValues }) => {
  return (
    <div className="array-container">
      {currentPhase.map((value, index) => (
        <div
          key={index}
          className="array-bar"
          style={{
            height: `${value * DEFAULTS.HEIGHT_MULTIPLIER}px`,
            width: `${DEFAULTS.WIDTH}px`,
          }}
        >
          {showValues && value}
        </div>
      ))}
    </div>
  );
};
