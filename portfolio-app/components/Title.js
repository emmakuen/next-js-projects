import styles from "../styles/Title.module.css";

const Title = () => {
  return (
    <>
      <h1 className={styles.title}>
        Hi.
        <br />I am
        <span className={`${styles.title} ${styles.orange}`}> Emma.</span>
      </h1>
      <div className={styles["title-underline"]}></div>

      <p className={styles.description}>
        I develop beautiful websites using my own design.
      </p>
    </>
  );
};

export default Title;
