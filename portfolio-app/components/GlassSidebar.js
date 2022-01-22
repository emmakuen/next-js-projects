import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import TableauIcon from "../components/svg/tableau-logo.svg";
import { colors } from "../utils/colors";

const GlassSidebar = () => {
  return (
    <div className="glass-wrapper">
      <div className="glass-sidebar">
        <span className="icon">
          <FontAwesomeIcon
            icon={faGithub}
            size="2x"
            color={colors.blue}
            className="fa"
            cursor="pointer"
          />
        </span>
        <span className="icon">
          <FontAwesomeIcon
            icon={faTwitter}
            size="2x"
            color={colors.blue}
            className="fa"
            cursor="pointer"
          />
        </span>
        <span className="icon">
          <FontAwesomeIcon
            icon={faLinkedin}
            size="2x"
            color={colors.blue}
            cursor="pointer"
            className="fa"
          />
        </span>
        <span className="icon">
          <TableauIcon className="tableau-icon" cursor="pointer" />
        </span>
      </div>
      <style jsx>{`
        .glass-sidebar {
          background-color: #fff;
          height: 500px;
          width: 70px;
          margin-top: 9.2vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(
            to right bottom,
            rgba(255, 255, 255, 0.7),
            rgba(255, 255, 255, 0.3)
          );
          border: 3px solid rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          backdrop-filter: blur(5px);
          position: relative;
          overflow: hidden;
        }

        .glass-sidebar:hover {
          transform: translate(-5px, -5px);
        }

        .glass-sidebar::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 30px;
          height: 100%;
          background: rgba(255, 255, 255, 0.5);
          transform: skewX(20deg) translateX(160px);
          transition: 0.6s;
        }

        .glass-sidebar:hover::before {
          transform: skewX(20deg) translateX(-140px);
        }

        .icon {
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default GlassSidebar;
