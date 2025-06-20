import { Outlet } from "react-router";

import maskStyles from "~/styles/skyline-mask.module.css";
import styles from "./styles.module.css";

import footerStyles from "~/components/Footer/styles.module.css";

import { useRef, useState } from "react";
import resume from "~/assets/CH_Resume_25.pdf";
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
      to: resume,
      label: "Resume",
      icon: "ph:download-simple-light",
      linkType: "resource" as const,
    },
    // {
    //   label: "Projects",
    //   disabled: true,
    //   title: "🚧Coming soon!🚧",
    // },
    {
      to: "https://coreyhatton.github.io/colorDemo/",
      label: "Color Demo",
      linkType: "external" as const,
    },
  ];

  const featureButton = {
    href: "mailto:hello@coreyhatton.au",
    label: "Contact",
    title: "Contact me via email",
  };

  const [panelState, setPanelState] = useState({ open: false });

  const headerRef = useRef<HTMLDivElement | null>(null);

  // const { overrideRef } = useStickyHeader({
  useStickyHeader({
    headerElement: headerRef as React.RefObject<HTMLElement>,
    scrollThreshold: 30,
    syncWithStates: [panelState.open],
  });

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
          className={styles.navMenu}
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
        <Socials className={styles.center} />
        <p className={footerStyles.wideRight}>This website is open source.</p>
      </Footer>
    </>
  );
};

export default HomeLayout;
