import React from "react";
import Input from "./Input";

const Field = ({ label, children }) => {
  return (
    <label htmlFor="email" className="block my-2">
      <span className="block text-sm text-gray-600">{label}</span>
      {children}
    </label>
  );
};

export default Field;
