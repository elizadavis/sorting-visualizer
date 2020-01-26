import _ from 'lodash';
import React from 'react';

export const SortingOptions = ({ options }) => {
  return (
    <div className="sort-options">
      {_.map(options, ({ text, onClick, className, disabled }, index) => {
        return (
          <button
            key={index}
            className={`btn sort-button ${className}`}
            type="button"
            onClick={onClick}
            disabled={disabled}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};
