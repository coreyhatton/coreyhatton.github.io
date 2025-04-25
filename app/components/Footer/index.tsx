import clsx from "clsx";
import type { GridWidth, OtherWidth } from "~/components/types";
import styles from "./styles.module.css";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
  width?: GridWidth | OtherWidth;
  contentWidth?: GridWidth | OtherWidth;
}

export const Footer = ({
  width = "full",
  // contentWidth = "full",
  ...props
}: FooterProps) => {
  const isGridWidth = ["full", "wide", "content"].includes(width);

  const footerClassName = clsx(
    props.className,
    styles.main,
    styles[isGridWidth ? width : "customWidth"],
  );

  const footerStyles = {
    ...props.style,
    inlineSize: isGridWidth ? undefined : `min(${width}, 100%)`,
    marginInline: isGridWidth ? undefined : "auto",
  };

  return (
    <footer className={footerClassName} style={footerStyles}>
      {props.children}
    </footer>
  );
};

export default Footer;
