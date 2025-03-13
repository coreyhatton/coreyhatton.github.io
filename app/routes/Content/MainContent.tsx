import { Link } from "react-router";
import styles from "./style.module.css";

const content = [
  {
    title: "",
    display: "inline",
    content: (
      <>
        <p>
          Communications & Marketing Professional based in Perth, Western
          Australia.
        </p>
        <p>
          Currently working as an independent marcomms consultant for SME
          businesses across WA and Australia.
        </p>
        <p>Previously xxx</p>
        <p>
          My love for leveraging data to craft captivating content, optimise
          communications and implement effective internal and external
          engagement strategies translates to xxx.
        </p>
        <p>
          Strong understanding of digital, and have created multiple projects
          from scratch - check them out in <Link to="/projects">Projects</Link>.
        </p>
      </>
    ),
  },
  {
    title: "About Me",
    display: "inline",
    content: (
      <>
        <ul>
          <li>
            <p>
              {`I think like a marketer, but I write like a writer. That means
              that no matter the piece I’m writing, from that catchy bit of
              SEO-optimised web content to the most basic of product
              copywriting, people always come first. Converting readers to
              customers is no easy feat – but it gets a whole lot easier when
              they’re engaged with relevant, informative content tailored to
              their unique needs.`}
            </p>
          </li>
          <li>
            <p>
              Communication and transparency are core values of every project I
              work on. I believe that proactive communication and transparency
              are integral to creating successful content for successful
              businesses. Whether it’s tailor-made content briefs or unlimited
              rewrites until you’re 100% satisfied with the work before we
              publish, I make sure that every step of the project lifecycle
              lives and breathes collaboration and co-creation.
            </p>
          </li>
          <li>
            <p>
              I understand what goes in and what comes out of your business
              planning. I’ve worked on both sides of the marketing equation –
              from in-house communications teams to agency-side consulting, I’ve
              got the knowledge and skills to provide quality content that
              audiences want to read, and businesses want to show.
            </p>
          </li>
        </ul>
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
        if (item.display === "inline") {
          return (
            <article key={item.title}>
              <h2>{item.title && item.title}</h2>
              {item.content}
            </article>
          );
        }

        return (
          <article key={item.title}>
            {item.title && <h2>{item.title}</h2>}
            {item.content}
          </article>
        );
      })}
    </>
  );
};

export default MainContent;
