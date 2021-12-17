import React, { useState } from "react";
import DarkTheme from "./DarkTheme";

const localKey = "darkMode";

function loadDarkMode() {
  if (typeof localStorage === "undefined") return false;

  const localValue = localStorage.getItem(localKey);
  return localValue === null ? false : JSON.parse(localValue);
}

const ThemeSwitch = () => {
  const [darkMode, setDarkMode] = useState(loadDarkMode);

  const handleClick = () => {
    localStorage.setItem(localKey, JSON.stringify(!darkMode));
    setDarkMode(!darkMode);
  };

  const text = darkMode ? "Light Mode" : "Dark Mode";
  return (
    <>
      <button onClick={handleClick} suppressHydrationWarning>
        {text}
      </button>
      <style jsx>{`
        button {
          background: none;
          border: 1px gray solid;
          border-radius: 5px;
          padding: 5px 10px;
          color: inherit;
        }
      `}</style>
      {darkMode && <DarkTheme />}
    </>
  );
};

export default ThemeSwitch;
