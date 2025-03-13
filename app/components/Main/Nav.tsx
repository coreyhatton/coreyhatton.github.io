import { Link } from "react-router";
import styles from "./style.module.css";

if (import.meta.env.DEV) {
}

export const navLinks = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/about",
    label: "About",
  },
  {
    to: "/resume",
    label: "Resume",
  },
  {
    to: "/projects",
    label: "Projects",
  },
  {
    to: "/contact",
    label: "Contact",
  },
  {
    to: import.meta.env.DEV
      ? "https://coreyhatton.github.io/colorDemo/"
      : "/colorDemo",
    label: "Color Demo",
  },
];

const Nav = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {navLinks.map(({ to, label }) => (
            <li key={label} className={styles.menuItem}>
              <Link to={to}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
