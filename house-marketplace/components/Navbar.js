import OfferIcon from "../public/assets/svg/localOfferIcon.svg";
import ExploreIcon from "../public/assets/svg/exploreIcon.svg";
import PersonOutlineIcon from "../public/assets/svg/personOutlineIcon.svg";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <Link href="/explore" passHref>
              <a>
                <ExploreIcon
                  width="36"
                  height="36"
                  fill={router.pathname === "/explore" ? "#2c2c2c" : "#8f8f8f"}
                />
                <p
                  className={
                    router.pathname === "/explore"
                      ? "navbarListItemNameActive"
                      : "navbarListItemName"
                  }
                >
                  Explore
                </p>
              </a>
            </Link>
          </li>
          <li className="navbarListItem">
            <Link href="/offers" passHref>
              <a>
                <OfferIcon
                  width="36"
                  height="36"
                  fill={router.pathname === "/offers" ? "#2c2c2c" : "#8f8f8f"}
                />
                <p
                  className={
                    router.pathname === "/offers"
                      ? "navbarListItemNameActive"
                      : "navbarListItemName"
                  }
                >
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
                  fill={router.pathname === "/profile" ? "#2c2c2c" : "#8f8f8f"}
                />
                <p
                  className={
                    router.pathname === "/profile"
                      ? "navbarListItemNameActive"
                      : "navbarListItemName"
                  }
                >
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
