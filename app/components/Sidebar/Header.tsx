import styles from "./Sidebar.module.css";
import portrait from "~/assets/portrait.png";

const Header = () => (
  <header className={styles.header}>
    <img
      src={portrait}
      alt="Corey Hatton"
      className={styles.portrait}
      height={"auto"}
      width={"auto"}
    />
    <hgroup>
      <h1>Corey Hatton</h1>
      <p style={{ textAlign: "center" }}>
        Communications | Marketing | Digital
      </p>
    </hgroup>
  </header>
);

export default Header;
