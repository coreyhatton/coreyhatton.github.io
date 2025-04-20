import { Outlet } from "react-router";

import maskStyles from "~/styles/skyline-mask.module.css";
import styles from "./styles.module.css";

import footerStyles from "~/components/Footer/styles.module.css";

import { useEffect, useRef, useState } from "react";
import icon from "~/assets/favicon.png";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Main from "~/components/Main";
import NavMenu from "~/components/NavMenu";
import Socials from "~/components/Socials";
import useStickyHeader from "~/utils/useStickyHeader";

const HomeLayout = () => {
  const navLinks = [
    {
      label: "About",
      disabled: true,
      title: "🚧Coming soon!🚧",
    },
    {
      to: "/",
      label: "Resume",
    },
    // {
    //   label: "Projects",
    //   disabled: true,
    //   title: "🚧Coming soon!🚧",
    // },
    {
      to: "https://coreyhatton.github.io/colorDemo/",
      label: "Color Demo",
    },
  ];

  const featureButton = {
    href: "mailto:hello@coreyhatton.au",
    label: "Contact",
    title: "Contact me via email",
  };

  const [panelState, setPanelState] = useState({ open: false });

  const headerRef = useRef<HTMLDivElement | null>(null);

  const { overrideRef } = useStickyHeader({
    headerElement: headerRef as React.RefObject<HTMLElement>,
    scrollThreshold: 30,
  });

  // block translation effects when panelState is open
  useEffect(() => {
    overrideRef.current = panelState.open;
  }, [panelState.open]);

  return (
    <>
      <Header
        siteLogo={icon}
        siteTitle="Corey Hatton"
        siteTagline="Communications | Marketing | Digital"
        className={`${styles.linearGradientBg} `}
        headerRef={headerRef as React.RefObject<HTMLElement>}
      >
        <NavMenu
          navLinks={navLinks}
          featureButton={featureButton}
          panelState={panelState}
          setPanelState={setPanelState}
        />
      </Header>

      <Main
        className={`
        ${styles.gridContainer} 
        ${styles.linearGradientBg2}
        ${maskStyles.skylineMask} 
        `}
      >
        <Outlet />
      </Main>

      <Footer className={styles.linearGradientBg}>
        <p
          className={styles.wideLeft}
        >{`© Corey Hatton ${new Date().getFullYear()}`}</p>
        <Socials iconHeight="1em" className={styles.center} />
        <p className={footerStyles.wideRight}>This website is open source.</p>
      </Footer>
    </>
  );
};

export default HomeLayout;
