import { useState } from "react";

import NavLink from "./NavLink";
import NavButton from "./NavButton";
import Logo from "./Logo";
import { colors } from "../utils/colors";
import { routes } from "../utils/routes";

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("Home");

  const styleLinks = (route) => {
    const isCurrentPath = currentPath === route.name;
    return {
      color: isCurrentPath && colors.black,
    };
  };

  const styleUnderline = (route) => {
    const isCurrentPath = currentPath === route.name;
    return {
      backgroundColor: isCurrentPath && colors.blue,
      visibility: "visible",
    };
  };

  return (
    <nav>
      <Logo />
      <ul>
        {routes.map((route) =>
          route.name !== "Contact Me" ? (
            <li
              key={route.name}
              onClick={() => setCurrentPath(route.name)}
              style={styleLinks(route)}
            >
              <NavLink
                name={route.name}
                href={route.href}
                color={colors.grey}
              />
              <div className="underline" style={styleUnderline(route)}></div>
            </li>
          ) : (
            <li key={route.name} onClick={() => setCurrentPath(route.name)}>
              <NavButton route={route} />
            </li>
          )
        )}
      </ul>

      <style jsx>{`
        ul {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          list-style: none;
        }

        li {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        li:not(:first-child) {
          margin-left: 50px;
        }

        .underline {
          margin-top: 5px;
          height: 3px;
          width: 35px;
          background-color: transparent;
          visibility: hidden;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
