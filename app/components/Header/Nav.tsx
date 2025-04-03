import { Link } from "react-router";
import styles from "./Header.module.css";

interface NavProps {
  navLinks: { to: string; label: string }[];
  featureButton?: {
    to: string;
    label: string;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
  };
}

export const Nav = ({ navLinks, featureButton, ...props }: NavProps) => {
  return (
    <nav className={styles.nav} {...props}>
      <ul className={styles.menu}>
        {navLinks?.map(({ to, label }) => (
          <li key={label} className={styles.menuItem}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
        {featureButton && (
          <li key="featureButton">
            <Link
              {...featureButton}
              key={"featureButton"}
              to={featureButton.to}
              className={`${styles.featureBtn} ${styles.btnGradient} ${
                featureButton.className || ""
              }`}
            >
              {featureButton.label}
              {featureButton.children}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
