import OfferIcon from "../public/assets/svg/localOfferIcon.svg";
import ExploreIcon from "../public/assets/svg/exploreIcon.svg";
import PersonOutlineIcon from "../public/assets/svg/personOutlineIcon.svg";
import Link from "next/link";
import { useRouter } from "next/router";

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
            <Link href="/" passHref>
              <a>
                <ExploreIcon width="36" height="36" fill={styleIcon("/")} />
                <p className={isActive("navbarListItemName", "/")}>Explore</p>
              </a>
            </Link>
          </li>
          <li className="navbarListItem">
            <Link href="/offers" passHref>
              <a>
                <OfferIcon width="36" height="36" fill={styleIcon("/offers")} />
                <p className={isActive("navbarListItemName", "/offers")}>
                  Offers
                </p>
              </a>
            </Link>
          </li>
          <li className="navbarListItem">
            <Link href="/profile" passHref>
              <a>
                <PersonOutlineIcon
                  width="36"
                  height="36"
                  fill={styleIcon("/profile")}
                />
                <p className={isActive("navbarListItemName", "/profile")}>
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
