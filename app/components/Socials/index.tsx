import { Icon } from "@iconify/react";
import styles from "./styles.module.css";

interface SocialsProps extends React.HTMLAttributes<HTMLDivElement> {
  fillColor?: string;
  iconHeight?: string;
}

const Socials = ({
  fillColor = "currentColor",
  iconHeight = "1lh",
  ...props
}: SocialsProps) => {
  const iconProps = {
    color: fillColor,
    height: iconHeight,
    className: styles.socialIcon,
  };

  const iconContainerProps = {
    className: styles.iconContainer,
  };

  return (
    <div
      {...props}
      className={`${styles.socialIcons} ${props.className || ""}`}
    >
      <a
        href="https://www.linkedin.com/in/corey-hatton/"
        target="_blank"
        title="LinkedIn"
        {...iconContainerProps}
      >
        <Icon icon="ri:linkedin-box-fill" {...iconProps} />
      </a>
      <a
        href="https://github.com/coreyhatton/"
        target="_blank"
        title="Github"
        {...iconContainerProps}
      >
        <Icon icon="ri:github-fill" {...iconProps} />
      </a>
      <a
        href="mailto:hello@coreyhatton.au"
        target="_blank"
        title="Email"
        {...iconContainerProps}
      >
        <Icon icon="ph:envelope-fill" {...iconProps} />
      </a>
    </div>
  );
};

export default Socials;
