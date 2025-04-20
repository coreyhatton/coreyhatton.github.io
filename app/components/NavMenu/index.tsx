import clsx from "clsx";
import React, { useRef } from "react";
import { NavLink } from "react-router";

import { Icon } from "@iconify/react";

import { Button } from "../_Primitives/Button";
import styles from "./styles.module.css";

interface NavLinkProps extends React.ComponentPropsWithoutRef<"li"> {
  to?: string;
  label: string;
  linkStyle?: React.CSSProperties;
  linkClassName?: string;
  disabled?: boolean;
  title?: string;
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

interface NavMenuProps {
  navLinks: NavLinkProps[];
  featureButton?: featureButtonProps;
  panelState;
  setPanelState;
}

export const NavMenuButton = ({
  panelState,
  setPanelState,
  triggerRef,
  iconHeight = "1lh",
  ...props
}) => {
  return (
    <Button
      className={clsx(styles.menuBtn)}
      ref={triggerRef}
      variant="icon"
      fill="base"
      isRounded
      onClick={() => {
        setPanelState({ open: !open });
      }}
      {...props}
    >
      <Icon icon="ph:list-bold" height={iconHeight} />
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  // const [panelState, setPanelState] = useState({ open: false });

  const menuButtonProps = {
    panelState,
    setPanelState,
    triggerRef,
    onClick: () => {
      setPanelState({
        open: !panelState.open,
      });
    },
  };

  return (
    <nav className={styles.navMenu} {...containerProps}>
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
                <NavLink to={to || ""} title={title}>
                  {label}
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
