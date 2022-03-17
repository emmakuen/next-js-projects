import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import TableauIcon from "../components/svg/tableau-logo.svg";
import { colors } from "../constants/colors";

import styles from "../styles/GlassSidebar.module.css";

const GlassSidebar = () => {
  return (
    <div className={styles["glass-wrapper"]}>
      <div className={styles["glass-sidebar"]}>
        <span className={styles.icon}>
          <FontAwesomeIcon
            icon={faGithub}
            size="2x"
            color={colors.blue}
            className={styles.fa}
            cursor="pointer"
          />
        </span>
        <span className={styles.icon}>
          <FontAwesomeIcon
            icon={faTwitter}
            size="2x"
            color={colors.blue}
            className={styles.fa}
            cursor="pointer"
          />
        </span>
        <span className={styles.icon}>
          <FontAwesomeIcon
            icon={faLinkedin}
            size="2x"
            color={colors.blue}
            cursor="pointer"
            className={styles.fa}
          />
        </span>
        <span className={styles.icon}>
          <TableauIcon className={styles["tableau-icon"]} cursor="pointer" />
        </span>
      </div>
    </div>
  );
};

export default GlassSidebar;
