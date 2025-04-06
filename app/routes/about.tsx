import { Outlet } from "react-router";

const About = () => {
  return (
    <>
      <h1>About</h1>
      <p>This is the about page.</p>
      <Outlet />
    </>
  );
};

export default About;
