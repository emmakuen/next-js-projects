import React from "react";

const DarkTheme = () => {
  return (
    <style jsx global>{`
      :root {
        --background-color: rgb(36, 36, 36);
        --link-color: rgb(238, 196, 10);
        --text-color: rgb(230, 230, 230);
      }
    `}</style>
  );
};

export default DarkTheme;
