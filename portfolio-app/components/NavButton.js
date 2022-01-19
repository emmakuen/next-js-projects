import NavLink from "./NavLink";
import { colors } from "../utils/colors";

const NavButton = ({ route }) => {
  return (
    <>
      <button className="nav-button">
        <NavLink name={route.name} href={route.href} color={colors.blue} />
      </button>

      <style jsx>{`
        .nav-button {
          border-radius: 15px;
          padding: 8px 22px;
          border: 2px ${colors.blue} solid;
          background-color: ${colors.backgroundColor};
          margin-top: -5px;
        }

        .nav-button:hover {
          background-color: ${colors.darkWhite};
        }
      `}</style>
    </>
  );
};

export default NavButton;
