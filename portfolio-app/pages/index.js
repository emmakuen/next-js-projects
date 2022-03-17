import LeftEclipse from "../components/svg/left-eclipse.svg";
import RightEclipse from "../components/svg/right-eclipse.svg";
import StyledDots from "../components/svg/styled-dots.svg";
import SmallStyledDots from "../components/svg/styled-dots-small.svg";
import GlassSidebar from "../components/GlassSidebar";
import Title from "../components/Title";
import Button from "../components/Button";
import AnimatedSVG from "../components/AnimatedSVG";
import { colors } from "../constants/colors";

import styles from "../styles/Home.module.css";

export default function HomePage() {
  return (
    <>
      <main className={styles.home}>
        <section className={styles["image-container"]}>
          <LeftEclipse className={`${styles["left-eclipse"]}`} />
          <div className={styles["animation-container"]}>
            <AnimatedSVG />
          </div>
          <StyledDots className={`${styles["styled-dots"]} ${styles.bottom}`} />
        </section>

        <section className={styles["intro-container"]}>
          <Title />
          <div className={styles["button-container"]}>
            <Button
              text="Collaborate"
              routename="Contact Me"
              color={colors.backgroundColor}
              backgroundColor={colors.blue}
              borderColor={colors.blue}
            />
            <div className={styles["ghost-button-container"]}>
              <Button
                text="Learn More"
                routename="About"
                color={colors.orange}
                backgroundColor={colors.backgroundColor}
                borderColor={colors.orange}
                className={styles["ghost-button"]}
              />
              <SmallStyledDots
                className={`${styles["styled-dots"]} ${styles.small}`}
              />
            </div>
          </div>
        </section>
        <section className={styles["sidebar-container"]}>
          <RightEclipse className={`${styles["right-eclipse"]}`} />
          <StyledDots className={`${styles["styled-dots"]} ${styles.top}`} />
          <GlassSidebar className={styles.glass} />
        </section>
      </main>
    </>
  );
}
