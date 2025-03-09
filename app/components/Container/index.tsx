import styles from "./style.module.css";

const Container = ({ children }) => {
  return <div className={styles.container}>{children || null}</div>;
};

export default Container;
