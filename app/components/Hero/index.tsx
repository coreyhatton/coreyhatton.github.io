import portrait from "~/assets/portrait.png";
import Socials from "~/components/Socials";
import styles from "./hero.module.css";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section className={`${styles.hero} ${className || ""}`}>
      <img src={portrait} alt="Corey Hatton" className={styles.img} />
      <div className={styles.content}>
        <hgroup className={styles.heroText}>
          <h1>
            Communications & Marketing Professional based in{" "}
            {/* <span className={clsx(styles.shine, styles.text)}> */}
            Perth, Western Australia
            {/* </span> */}
          </h1>
          <p>
            Currently working as an independent marcomms consultant for SME
            businesses across WA and Australia.
          </p>
        </hgroup>
        <hr className={styles.divider} />
        <Socials iconHeight="1.5cap" />
      </div>
    </section>
  );
};

export default Hero;
