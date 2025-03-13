import styles from "./Sidebar.module.css";
import { Icon } from "@iconify/react";

const Socials = ({ fillColor = "currentColor", ...props }) => {
  const iconProps = {
    color: fillColor,
    height: "2em",
    className: styles.socialIcon,
    ...props,
  };

  const externalLinkIcon = (
    <Icon
      icon="ri:external-link-line"
      color={fillColor}
      height="1cap"
      style={{ translate: "0 0.08em" }}
      {...props}
    />
  );

  return (
    <div className={styles.socialIcons}>
      <a
        href="https://www.linkedin.com/in/corey-hatton/"
        target="_blank"
        title="LinkedIn"
      >
        <Icon icon="ri:linkedin-box-fill" {...iconProps} />
        <span className={styles.socialTitle}>
          <h2>LinkedIn</h2>
          {externalLinkIcon}
        </span>
        <p className={styles.socialLink}>linkedin.com/in/corey-hatton/</p>
      </a>
      <a href="https://github.com/coreyhatton/" target="_blank" title="Github">
        <Icon icon="ri:github-fill" {...iconProps} />
        <span className={styles.socialTitle}>
          <h2>Github</h2>
          {externalLinkIcon}
        </span>
        <p className={styles.socialLink}>github.com/coreyhatton/</p>
      </a>
      <a href="mailto:hello@coreyhatton.au" target="_blank" title="Email">
        <Icon icon="ri:mail-fill" {...iconProps} />
        <span className={styles.socialTitle}>
          <h2>Email</h2>
          {externalLinkIcon}
        </span>
        <p className={styles.socialLink}>hello@coreyhatton.au</p>
      </a>
    </div>
  );
};

export default Socials;
