import React from "react";

const Button = ({ type, children }) => {
  return (
    <button
      type={type}
      className="bg-green-600 my-2 hover:bg-green-500 text-white px-4 py-1 rounded"
    >
      {children}
    </button>
  );
};

export default Button;
