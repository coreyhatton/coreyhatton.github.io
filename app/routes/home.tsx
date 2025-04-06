import { Outlet } from "react-router";
import Hero from "~/components/Hero";
import BgPattern from "~/components/Graphics/bgPattern";

const Home = () => {
  return (
    <>
      <Hero />
      <Outlet />
      <BgPattern
        position="bottom right"
        maxBlockSize={"80%"}
        maxInlineSize={"33%"}
      />
    </>
  );
};

export default Home;
