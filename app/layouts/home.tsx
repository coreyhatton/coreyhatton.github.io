import { Outlet } from "react-router";

import styles from "./styles.module.css";
import maskStyles from "~/styles/skyline-mask.module.css";

import { Header } from "~/components/Header";
import Nav from "~/components/Header/Nav";

import Main from "~/components/Main";

import icon from "~/assets/favicon.png";

const HomeLayout = () => {
  const navLinks = [
    {
      to: "/",
      label: "About",
    },
    {
      to: "/",
      label: "Resume",
    },
    {
      to: "/",
      label: "Projects",
    },
    {
      to:
        import.meta.env.DEV ?
          "https://coreyhatton.github.io/colorDemo/"
        : "/colorDemo",
      label: "Color Demo",
    },
  ];

  const featureButton = {
    to: "/",
    label: "Contact",
  };

  return (
    <>
      <Header
        siteLogo={icon}
        siteTitle="Corey Hatton"
        siteTagline="Communications | Marketing | Digital"
        className={`${styles.linearGradientBg} ${styles.blur}`}
      >
        <Nav navLinks={navLinks} featureButton={featureButton} />
      </Header>

      <Main
        className={`
        ${styles.gridContainer} 
        ${styles.linearGradientBg2}
        ${maskStyles.skylineMask} 
        `}
      >
        {/* <Hero /> */}
        <Outlet />
      </Main>
    </>
  );
};

export default HomeLayout;
