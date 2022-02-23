import { withProtected } from "../lib/routes";
import styles from "../styles/Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <h1>Explore</h1>
    </div>
  );
}

export default withProtected(Home);
