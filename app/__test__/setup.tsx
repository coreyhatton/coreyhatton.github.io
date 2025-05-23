import "~/app.css";

import { createRoutesStub } from "react-router";
import "vitest-browser-react";
import Layout from "~/layouts/home";

import Home from "~/routes/home";

const Stub = createRoutesStub([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

const HomePage = () => {
  return (
    <div id="root">
      <Stub />
    </div>
  );
};

export default HomePage;
