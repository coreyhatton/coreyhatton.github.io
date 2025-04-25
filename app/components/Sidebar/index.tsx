import Header from "./Header";
import Socials from "./Socials";
import styles from "./styles.module.css";

const Sidebar = ({ children = null }) => {
  return (
    <aside className={styles.sidebar}>
      <Header />
      <hr />
      <footer>
        <Socials />
      </footer>
      {children}
    </aside>
  );
};

export default Sidebar;
