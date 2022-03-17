import NavLink from "./NavLink";
import { colors } from "../constants/colors";
import Link from "next/link";

const NavButton = ({ route }) => {
  return (
    <Link href={route.href}>
      <a>
        <button className="nav-button">
          <p>{route.name}</p>
        </button>

        <style jsx>{`
          .nav-button {
            border-radius: 15px;
            padding: 8px 22px;
            border: 2px ${colors.blue} solid;
            background-color: ${colors.backgroundColor};
            margin-top: -5px;
            cursor: pointer;
          }

          .nav-button:hover {
            transform: scale(1.05);
            transition: 0.3s ease-in;
          }

          p {
            text-decoration: none;
            color: ${colors.blue};
            font-weight: 600;
            font-size: 18px;
          }
        `}</style>
      </a>
    </Link>
  );
};

export default NavButton;
