import React, { useState } from "react";

const ThemeSwitch = () => {
  const [darkMode, setDarkMode] = useState(false);

  const text = darkMode ? "Light Mode" : "Dark Mode";
  return (
    <>
      <button onClick={() => setDarkMode(!darkMode)}>{text}</button>
      <style jsx>{`
        button {
          background: none;
          border: 1px gray solid;
          border-radius: 5px;
          padding: 5px 10px;
        }
        button:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
};

export default ThemeSwitch;
