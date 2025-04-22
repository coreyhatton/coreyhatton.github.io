import { Outlet } from "react-router";
import BgPattern from "~/components/Graphics/bgPattern";
import Hero from "~/components/Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <Outlet />
      <BgPattern
        id="bgPattern1"
        position="bottom right"
        maxSize={"40%"}
        opacity={0.1}
      />
    </>
  );
};

export default Home;
