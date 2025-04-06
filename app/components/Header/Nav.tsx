import { Link } from "react-router";
import styles from "./Header.module.css";
import { Button } from "../Button";

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
            <Button isRounded variant="accent" asLink effect="shine" outline>
              {featureButton.label}
              {featureButton.children}
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
