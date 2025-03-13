import styles from "./style.module.css";

import MainContent from "./MainContent";

export function Content(props) {
  return (
    <>
      <section className={`${styles.main}`} {...props}>
        <MainContent />
        <p>... more coming soon!</p>
      </section>
    </>
  );
}
