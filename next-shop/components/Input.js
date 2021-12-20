import React from "react";

const Input = ({ type, value, handleChange, required }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      required={required}
      className="border rounded px-3 py-1 w-80"
    />
  );
};

export default Input;
