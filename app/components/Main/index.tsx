import Nav from "../Header/Nav";
import styles from "./style.module.css";

const Main = ({ children, ...props }) => {
  return (
    <main {...props} className={" bg-pattern " + props.className || ""}>
      {/* <Nav /> */}
      {children || null}
    </main>
  );
};

export default Main;
