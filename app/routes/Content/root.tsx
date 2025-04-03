import styles from "./style.module.css";

import MainContent from "./MainContent";

export function Content(props) {
  return (
    <>
      <section {...props}>
        <MainContent />
        <p>... more coming soon!</p>
      </section>
    </>
  );
}
