import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { colors } from "../utils/colors";

const GlassSidebar = () => {
  return (
    <div className="glass-wrapper">
      <div className="glass-sidebar">
        <span className="icon">
          <FontAwesomeIcon icon={faGithub} size="2x" color={colors.blue} />
        </span>
        <span className="icon">
          <FontAwesomeIcon icon={faTwitter} size="2x" color={colors.blue} />
        </span>
        <span className="icon">
          <FontAwesomeIcon icon={faLinkedin} size="2x" color={colors.blue} />
        </span>
      </div>
      <style jsx>{`
        .glass-sidebar {
          background-color: #fff;
          height: 550px;
          width: 70px;
          margin-top: 100px;
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
          backdrop-filter: blur(2rem);
        }

        .icon {
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default GlassSidebar;
