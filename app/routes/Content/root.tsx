import styles from "./style.module.css";
import portrait from "~/assets/portrait.png";

import { Icon } from "@iconify/react";
import MainContent from "./MainContent";

const Social = ({ fillColor = "var(--text-base)", ...props }) => {
  return (
    <div className={styles.socialIcons}>
      <a
        href="https://www.linkedin.com/in/corey-hatton/"
        target="_blank"
        title="LinkedIn"
      >
        <Icon
          icon="ri:linkedin-box-fill"
          color={fillColor}
          height="1.2rem"
          {...props}
        />
      </a>
      <a href="https://github.com/coreyhatton/" target="_blank" title="Github">
        <Icon
          icon="ri:github-fill"
          color={fillColor}
          height="1.2rem"
          {...props}
        />
      </a>
      <a href="mailto:hello@coreyhatton.au" target="_blank" title="Email">
        <Icon
          icon="ri:mail-fill"
          color={fillColor}
          height="1.2rem"
          {...props}
        />
      </a>
    </div>
  );
};

export function Content() {
  return (
    <>
      <header className={styles.header}>
        <hgroup>
          <img
            src={portrait}
            alt="Corey Hatton"
            className={styles.portrait}
            height={"auto"}
            width={"auto"}
          />
          <h1>Corey Hatton</h1>
          <p style={{ textAlign: "center" }}>
            Communications | Marketing | Digital
          </p>
        </hgroup>
      </header>
      <hr />
      <main className={`${styles.main}`}>
        <MainContent />
        <p>... more coming soon!</p>
      </main>
      <footer className={styles.footer} style={{ position: "relative" }}>
        <Social fillColor="var(--text-contrast)" />
      </footer>
    </>
  );
}
