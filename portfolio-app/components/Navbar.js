import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import NavLink from "./NavLink";
import NavButton from "./NavButton";
import Logo from "./Logo";
import { colors } from "../constants/colors";
import { routes } from "../constants/routes";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("Home");
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();

  const styleLinks = (route) => {
    const isCurrentPath = router.pathname == route.href;
    console.log(currentPath, route.name);
    return {
      color: isCurrentPath && colors.black,
    };
  };

  const styleUnderline = (route) => {
    const isCurrentPath = router.pathname == route.href;
    return {
      backgroundColor: isCurrentPath && colors.blue,
      visibility: "visible",
    };
  };

  const handleNavItemClick = (routeName) => {
    setCurrentPath(routeName);
    setNavbarOpen(false);
  };

  const navOpenClass = navbarOpen ? "open" : "";

  return (
    <nav className={styles["nav-container"]}>
      <Logo />
      <ul className={`${styles["nav-list"]} ${styles[navOpenClass]}`}>
        {routes.map((route) =>
          route.name !== "Contact Me" ? (
            <li
              key={route.name}
              onClick={() => handleNavItemClick(route.name)}
              style={styleLinks(route)}
              className={`${styles["nav-item"]} ${styles[navOpenClass]}`}
            >
              <NavLink
                name={route.name}
                href={route.href}
                color="inherit"
                hoverColor={colors.blue}
              />
              <div
                className={styles.underline}
                style={styleUnderline(route)}
              ></div>
            </li>
          ) : (
            <li
              className={`${styles["nav-item"]} ${styles[navOpenClass]}`}
              key={route.name}
              onClick={() => handleNavItemClick(route.name)}
            >
              <NavButton route={route} />
            </li>
          )
        )}
      </ul>
      <button
        className={`${styles["nav-button"]} ${styles[navOpenClass]}`}
        onClick={() => setNavbarOpen(!navbarOpen)}
      >
        <FontAwesomeIcon
          icon={faBars}
          size="2x"
          className={styles.fa}
          cursor="pointer"
        />
      </button>
    </nav>
  );
};

export default Navbar;
