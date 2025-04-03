import type React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router";

export const Header = (props: {
  className?: string;
  children?: React.ReactNode;
  siteLogo?: string;
  siteTitle?: string;
  siteTagline?: string;
}) => {
  const { siteLogo = null, siteTitle = "", siteTagline = "" } = props;
  return (
    <header className={`${styles.main} .wide ${props.className || ""}`}>
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
                siteTagline
                  ? {}
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
                siteTitle
                  ? {}
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
