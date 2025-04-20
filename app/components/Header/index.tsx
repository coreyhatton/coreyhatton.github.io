import clsx from "clsx";
import React from "react";
import { Link } from "react-router";
import styles from "./styles.module.css";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  siteLogo?: string;
  siteTitle?: string;
  siteTagline?: string;
  hideOnScrollDown?: boolean;
  scrollThreshold?: number | { up: number; down: number };
  isVisible?: boolean;
  headerRef?: React.RefObject<HTMLElement>;
}

export const Header = ({
  siteLogo,
  siteTitle,
  siteTagline,
  hideOnScrollDown = false,
  scrollThreshold,
  headerRef,
  ...props
}: HeaderProps) => {
  // const headerRef = useRef<HTMLDivElement | null>(null);

  // const { isHidden, overrideState } = useStickyHeader({
  //   headerElement:
  //     hideOnScrollDown ? (headerRef as React.RefObject<HTMLElement>) : null,
  //   scrollThreshold: scrollThreshold,
  // });

  const classNameProp = clsx(styles.main, props.className || "");

  return (
    <header {...props} ref={headerRef} className={classNameProp}>
      <hgroup>
        <Link to="/" style={{ display: "contents" }}>
          {siteLogo && (
            <img src={siteLogo} className={styles.icon} alt="Corey Hatton" />
          )}
          {siteLogo && (siteTitle || siteTagline) && (
            <span className={styles.vr} />
          )}
          {siteTitle && (
            <h1
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
            </h1>
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
      </hgroup>
      {props.children}
    </header>
  );
};

export default Header;
