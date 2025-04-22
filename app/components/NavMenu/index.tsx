import clsx from "clsx";
import React, { useRef } from "react";
import { NavLink } from "react-router";

import { Button } from "../.primitives/Button";
import IconComponent from "../Icon";
import styles from "./styles.module.css";

interface NavLinkProps extends React.ComponentPropsWithoutRef<"li"> {
  to?: string;
  label: string;
  linkStyle?: React.CSSProperties;
  linkClassName?: string;
  disabled?: boolean;
  title?: string;
  icon?: string;
  linkType?: "page" | "resource" | "external";
}

interface featureButtonProps
  extends Partial<React.ReactHTMLElement<HTMLButtonElement | HTMLDivElement>> {
  to?: string;
  href?: string;
  label: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

interface NavMenuProps extends React.ComponentPropsWithoutRef<"nav"> {
  navLinks: NavLinkProps[];
  featureButton?: featureButtonProps;
  panelState;
  setPanelState;
}

export const NavMenuButton = ({
  triggerRef,
  handleClick,
  ...props
}: {
  iconHeight?: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
  handleClick: () => void;
} & React.ComponentPropsWithoutRef<"button">) => {
  return (
    <Button
      className={clsx(styles.menuBtn)}
      ref={triggerRef}
      variant="icon"
      fill="base"
      isRounded
      onClick={handleClick}
      {...props}
    >
      <IconComponent iconifyIcon="ph:list-bold" height={"1lh"} />
    </Button>
  );
};

export const NavMenu = ({
  navLinks,
  featureButton,
  panelState,
  setPanelState,
  ...containerProps
}: NavMenuProps) => {
  const triggerRef = useRef<HTMLButtonElement>(
    null,
  ) as React.RefObject<HTMLButtonElement>;
  const ulRef = useRef<HTMLUListElement>(null);

  // const [panelState, setPanelState] = useState({ open: false });

  const menuButtonProps = {
    triggerRef,
    handleClick: () => {
      setPanelState({
        open: !panelState.open,
      });
    },
  };

  return (
    <nav
      {...containerProps}
      className={clsx(styles.navMenu, containerProps.className)}
    >
      <NavMenuButton {...menuButtonProps} />
      <ul
        className={clsx(styles.menu, panelState.open ? styles.panelOpen : "")}
        ref={ulRef}
      >
        {navLinks?.map(
          ({
            label,
            linkStyle,
            disabled,
            to,
            linkClassName,
            title,
            icon,
            linkType,
            ...props
          }) => (
            <li
              key={label}
              className={clsx(
                styles.menuItem,
                disabled && styles.disabled,
                linkClassName,
              )}
              style={linkStyle}
              {...props}
            >
              {!disabled ?
                <NavLink
                  to={to || ""}
                  title={title}
                  reloadDocument={linkType === "resource"}
                >
                  {label}{" "}
                  {icon && (
                    <IconComponent iconifyIcon={icon} height={"1.2cap"} />
                  )}
                </NavLink>
              : <span title={title}>{label}</span>}
            </li>
          ),
        )}
        {featureButton && (
          <li
            key="featureButton"
            className={clsx(styles.menuItem, styles.featureBtn_Item)}
          >
            <Button
              isRounded
              className={styles.featureBtn_Btn}
              fill="accent"
              asElement={"a"}
              variant="shine"
              {...featureButton}
            >
              {featureButton.label}
              {featureButton.children}
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavMenu;
