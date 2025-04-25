import clsx from "clsx";
import { Link } from "react-router";
import type { GridWidth, OtherWidth } from "../types";
import styles from "./styles.module.css";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  siteLogo?: string;
  siteTitle?: string;
  siteTagline?: string;
  headerRef?: React.RefObject<HTMLElement>;
  width?: GridWidth | OtherWidth;
}

export const Header = ({
  siteLogo,
  siteTitle,
  siteTagline,
  headerRef,
  width = "full",
  ...props
}: HeaderProps) => {
  const isGridWidth = ["full", "wide", "content"].includes(width);

  const headerClassName = clsx(
    styles.main,
    props.className,
    styles[isGridWidth ? width : "customWidth"],
  );

  const headerStyles = {
    ...props.style,
    inlineSize: isGridWidth ? undefined : `min(${width}, 100%)`,
    marginInline: isGridWidth ? undefined : "auto",
  };

  return (
    <header
      {...props}
      ref={headerRef}
      style={headerStyles}
      className={headerClassName}
    >
      <div className={styles.siteHome}>
        <Link to="/" style={{ display: "contents" }}>
          {siteLogo && (
            <img
              src={siteLogo}
              className={styles.siteLogo}
              alt="Corey Hatton"
            />
          )}
          {siteLogo && (siteTitle || siteTagline) && (
            <span className={styles.vr} />
          )}
          {siteTitle && (
            <p
              className={`${styles.title}`}
              style={
                siteTagline ?
                  {}
                : {
                    gridRow: "-1 / 1",
                    placeSelf: "center",
                  }
              }
            >
              Corey Hatton
            </p>
          )}
          {siteTagline && (
            <p
              className={`${styles.subtitle}`}
              style={
                siteTitle ?
                  {}
                : {
                    gridRow: "-1 / 1",
                    placeSelf: "center",
                  }
              }
            >
              Communications | Marketing | Digital
            </p>
          )}
        </Link>
      </div>
      {props.children}
    </header>
  );
};

export default Header;
