import React from "react";
import NavLink from "./NavLink";
import { routes } from "../utils/routes";

const Button = ({ text, routename, color, backgroundColor, borderColor }) => {
  const route = routes.filter((route) => route.name === routename)[0];
  return (
    <>
      <button className="action-button">
        <NavLink
          name={text}
          href={route.href}
          color={color}
          hoverColor={color}
        />
      </button>

      <style jsx>{`
        .action-button {
          border-radius: 20px;
          width: 168px;
          height: 56px;
          border: 2px ${borderColor} solid;
          background-color: ${backgroundColor};
          margin-top: 30px;
        }

        .action-button:hover {
          transform: scale(1.05);
          transition: 0.3s ease-in;
        }
      `}</style>
    </>
  );
};

export default Button;
