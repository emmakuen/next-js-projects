import React from "react";
import NavLink from "./NavLink";
import { routes } from "../utils/routes";

const Button = ({ text, routename, color, backgroundColor, borderColor }) => {
  const route = routes.filter((route) => route.name === routename)[0];
  return (
    <>
      <button className="nav-button">
        <NavLink name={text} href={route.href} color={color} />
      </button>

      <style jsx>{`
        .nav-button {
          border-radius: 20px;
          width: 168px;
          height: 56px;
          border: 2px ${borderColor} solid;
          background-color: ${backgroundColor};
          margin-top: 30px;
          margin-right: 30px;
        }

        .nav-button:hover {
          filter: saturate(2.2);
        }
      `}</style>
    </>
  );
};

export default Button;
