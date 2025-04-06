import Socials from "~/components/Socials";
import styles from "./hero.module.css";
// import portrait from "~/assets/portrait.png";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section className={`${styles.hero} ${className || ""}`}>
      {/* <img src={portrait} alt="Corey Hatton" className={styles.img} /> */}
      <img
        src={"https://placehold.co/400"}
        alt="Corey Hatton"
        className={styles.img}
      />
      <div className={styles.content}>
        <hgroup className={styles.heroText}>
          <h1>
            Communications & Marketing Professional based in{" "}
            <span className={styles.location}>Perth, Western Australia</span>
          </h1>
          <p>
            Currently working as an independent marcomms consultant for SME
            businesses across WA and Australia.
          </p>
        </hgroup>
        <hr className={styles.divider} />
        <Socials className={styles.socials} />
      </div>
    </section>
  );
};

export default Hero;
