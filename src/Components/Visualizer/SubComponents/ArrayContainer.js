import React from 'react';
import { DEFAULTS } from '../../../constants';

export const ArrayContainer = ({ currentPhase, isValueVisible }) => {
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
          {isValueVisible && value}
        </div>
      ))}
    </div>
  );
};
