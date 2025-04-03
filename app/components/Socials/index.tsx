import styles from "./Socials.module.css";
import { Icon } from "@iconify/react";

interface SocialsProps extends React.HTMLAttributes<HTMLDivElement> {
  fillColor?: string;
  height?: string;
}

const Socials = ({ fillColor = "currentColor", ...props }: SocialsProps) => {
  const iconProps = {
    color: fillColor,
    height: props.height || "2em",
    className: styles.socialIcon,
  };

  return (
    <div className={`${styles.socialIcons} ${props.className || ""}`}>
      <a
        href="https://www.linkedin.com/in/corey-hatton/"
        target="_blank"
        title="LinkedIn"
      >
        <Icon icon="ri:linkedin-box-fill" {...iconProps} />
      </a>
      <a href="https://github.com/coreyhatton/" target="_blank" title="Github">
        <Icon icon="ri:github-fill" {...iconProps} />
      </a>
      <a href="mailto:hello@coreyhatton.au" target="_blank" title="Email">
        <Icon icon="ri:mail-fill" {...iconProps} />
      </a>
    </div>
  );
};

export default Socials;
