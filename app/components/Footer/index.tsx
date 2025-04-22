import clsx from "clsx";
import styles from "./styles.module.css";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
}

export const Footer = (props: FooterProps) => {
  const footerClassName = clsx(props.className, styles.main);

  if (!props.children) {
    return null;
  }

  const footerStyles = {
    ...props.style,
  };

  return (
    <footer className={footerClassName} style={footerStyles}>
      {props.children}
    </footer>
  );
};

export default Footer;
