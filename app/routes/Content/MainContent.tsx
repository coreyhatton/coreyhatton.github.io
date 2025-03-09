import styles from "./style.module.css";

const content = [
  {
    title: "About Me",
    content: (
      <>
        <p>
          I am a seasoned Marketing & Communications Strategist based in Perth,
          Western Australia. I have a strong background in Marketing and
          Communications with a focus on driving personable and professional
          engagement no matter your target audience. I have always had a knack
          for problem solving and am passionate about using data and analytics
          to optimise communications and drive growth.
        </p>
        <p>
          With 5+ years of experience driving organic growth and engagement for
          various clients across WA and Australia, my love for leveraging data
          to craft captivating content, optimise communications and implement
          effective internal and external engagement strategies has been a
          driving force in my career.
        </p>
      </>
    ),
  },
  {
    title: "My Projects",
    content: (
      <>
        <p>
          I have a{" "}
          <a
            href="https://github.com/coreyhatton"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          account where I have worked on a number of projects, including this
          website.
        </p>
        <code className={styles.todos}>
          {"// "}@todo: write about my projects
        </code>
      </>
    ),
  },
  {
    title: "Contact Me",
    content: (
      <>
        <p>
          If you would like to get in touch with me, please{" "}
          <a
            href="https://www.linkedin.com/in/corey-hatton/"
            target="_blank"
            rel="noopener noreferrer"
          >
            connect with me
          </a>{" "}
          on LinkedIn.
        </p>
        <code className={styles.todos}>{"// "}@todo: write about contact</code>
      </>
    ),
  },
  {
    title: "My Resume",
    content: (
      <>
        <p>
          If you would like to get a copy of my resume, please{" "}
          <a
            href="https://www.linkedin.com/in/corey-hatton/"
            target="_blank"
            rel="noopener noreferrer"
          >
            connect with me
          </a>{" "}
          on LinkedIn.
        </p>
        <code className={styles.todos}>{"// "}@todo: write about resume</code>
      </>
    ),
  },
];

const MainContent = () => {
  return (
    <>
      {content.map((item) => {
        // if (item.title === "About Me") {
        //   return (
        //     <div key={item.title} className={styles.aboutMe}>
        //       {item.content}
        //     </div>
        //   );
        // }

        return (
          <details key={item.title}>
            <summary>{item.title}</summary>
            {item.content}
          </details>
        );
      })}
    </>
  );
};

export default MainContent;
