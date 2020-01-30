import React from 'react';

export const CustomArrayForm = ({ value, onChange, onSubmit }) => {
  return (
    <form
      className="form-inline p-3 justify-content-center"
      onSubmit={onSubmit}
    >
      <input
        className="form-control"
        type="text"
        placeholder="Enter a custom array"
        name="text"
        onChange={onChange}
        value={value}
      />
      <input className="btn btn-secondary mx-3" type="submit" value="Submit" />
    </form>
  );
};
