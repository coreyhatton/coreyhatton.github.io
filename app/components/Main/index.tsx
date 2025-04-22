const Main = ({ children, ...props }) => {
  return (
    <main {...props} className={" bg-pattern " + props.className || ""}>
      {/* <Nav /> */}
      {children || null}
    </main>
  );
};

export default Main;
