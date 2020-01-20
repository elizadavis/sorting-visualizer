import React from 'react';
import _ from 'lodash';

export const SortingOptions = ({ options }) => {
  return (
    <div className="sort-options">
      {_.map(options, ({ text, onClick, className }, index) => {
        return (
          <button
            key={index}
            className={`btn sort-button ${className}`}
            type="button"
            onClick={onClick}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};
