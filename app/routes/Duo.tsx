import Nav from "~/components/Main/Nav";
import type { Route } from "./+types/home";

import styles from "./styles.module.css";

import portrait from "~/assets/portrait.png";
import Socials from "~/components/Sidebar/Socials";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Corey Hatton | Portfolio" },
    {
      name: "description",
      content: "Corey Hatton | Communications | Marketing | Digital",
    },
    { name: "robots", content: "index, follow" },
    { name: "theme-color", content: "#007a7c" },
  ];
}

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          {/* <img
            src={portrait}
            alt="Corey Hatton"
            className={styles.portrait}
            height={"auto"}
            width={"auto"}
          /> */}
          <header className={styles.header}>
            <hgroup>
              <h1>Corey Hatton</h1>
              <p style={{ textAlign: "center" }}>
                Communications | Marketing | Digital
              </p>
            </hgroup>
          </header>
          <Socials />
        </aside>
        <div className={styles.center}>
          <div className={styles.imgContainer}>
            {/* <img
              src={portrait}
              alt="Corey Hatton"
              className={styles.portrait}
              width={"200px"}
            /> */}
            <img
              src={"https://placehold.co/600x400"}
              alt="Corey Hatton"
              className={styles.portrait}
              width={"200px"}
            />
          </div>
        </div>
        <main className={styles.main}>
          <Nav></Nav>
        </main>
      </div>
    </>
  );
}
