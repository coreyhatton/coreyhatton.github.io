import IconComponent from "../Icon";
import styles from "./styles.module.css";

interface SocialsProps extends React.HTMLAttributes<HTMLDivElement> {
  fillColor?: string;
  iconHeight?: string;
}

const Socials = ({
  fillColor = "currentColor",
  iconHeight = "1.2cap",
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
        <IconComponent iconifyIcon="ri:linkedin-box-fill" {...iconProps} />
      </a>
      <a
        href="https://github.com/coreyhatton/"
        target="_blank"
        title="Github"
        {...iconContainerProps}
      >
        <IconComponent iconifyIcon="ri:github-fill" {...iconProps} />
      </a>
      <a
        href="mailto:hello@coreyhatton.au"
        target="_blank"
        title="Email"
        {...iconContainerProps}
      >
        <IconComponent iconifyIcon="ph:envelope-fill" {...iconProps} />
      </a>
    </div>
  );
};

export default Socials;
