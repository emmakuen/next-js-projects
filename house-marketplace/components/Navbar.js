import OfferIcon from "../public/assets/svg/localOfferIcon.svg";
import ExploreIcon from "../public/assets/svg/exploreIcon.svg";
import PersonOutlineIcon from "../public/assets/svg/personOutlineIcon.svg";
import Link from "next/link";
import { useRouter } from "next/router";

import { routes } from "../lib/routes";

const Navbar = () => {
  const router = useRouter();

  const styleIcon = (path) => {
    return router.pathname === path ? "#2c2c2c" : "#8f8f8f";
  };

  const isActive = (className, path) => {
    return router.pathname === path ? `${className}Active` : className;
  };

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <Link href={routes.explore} passHref>
              <a>
                <ExploreIcon
                  width="36"
                  height="36"
                  fill={styleIcon(routes.explore)}
                />
                <p className={isActive("navbarListItemName", routes.explore)}>
                  Explore
                </p>
              </a>
            </Link>
          </li>
          <li className="navbarListItem">
            <Link href={routes.offers} passHref>
              <a>
                <OfferIcon
                  width="36"
                  height="36"
                  fill={styleIcon(routes.offers)}
                />
                <p className={isActive("navbarListItemName", routes.offers)}>
                  Offers
                </p>
              </a>
            </Link>
          </li>
          <li className="navbarListItem">
            <Link href={routes.profile} passHref>
              <a>
                <PersonOutlineIcon
                  width="36"
                  height="36"
                  fill={styleIcon(routes.profile)}
                />
                <p className={isActive("navbarListItemName", routes.profile)}>
                  Profile
                </p>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
