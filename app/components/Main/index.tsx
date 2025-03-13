import Nav from "./Nav";
import styles from "./style.module.css";

const Main = ({ children }) => {
  return (
    <main className={styles.main + " bg-pattern"}>
      <Nav />
      {children || null}
    </main>
  );
};

export default Main;
