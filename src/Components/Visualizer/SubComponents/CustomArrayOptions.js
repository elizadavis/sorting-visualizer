import React from 'react';

export const CustomArrayOptions = ({ value, onChange, onSubmit }) => {
  return (
    <form className="p-3" onSubmit={onSubmit}>
      <input
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
