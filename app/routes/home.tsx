import type { Route } from "./+types/home";

import { Content } from "./Content/root";
import Sidebar from "~/components/Sidebar";
import Main from "~/components/Main";

import Duo from "./Duo";

import styles from "./styles.module.css";

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

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <Main>
          <Content style={{ gridArea: "content" }} />
        </Main>
      </div>
    </>
  );
};

export default function duo() {
  return (
    <>
      <Duo />
    </>
  );
}
