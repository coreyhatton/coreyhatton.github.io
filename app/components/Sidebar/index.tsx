import Header from "./Header";
import styles from "./Sidebar.module.css";
import Socials from "./Socials";

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
