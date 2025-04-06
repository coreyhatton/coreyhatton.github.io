import { useButton, type AriaButtonOptions } from "react-aria";
import React, { useRef } from "react";
import clsx from "clsx";
import styles from "./button.module.css";
import { Link } from "react-router";

interface ButtonProps extends AriaButtonOptions<"button"> {
  className?: HTMLElement["className"];
  style?: React.CSSProperties;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "accent" | "icon";
  isRounded?: boolean;
  background?: React.CSSProperties["background"];
  asLink?: boolean;
  to?: string;
  effect?: "none" | "shine";
  outline?: boolean;
}

/**
 * A simple button component which wraps `react-aria`'s
 * `useButton` hook.
 *
 * @example
 * import { Button } from '~/ui';
 *
 * <Button onClick={() => console.log('I was clicked!')}>
 *   Click me
 * </Button>
 *
 * @see https://react-spectrum.adobe.com/react-aria/useButton.html
 * @see https://github.com/adobe/react-spectrum/blob/main/packages/react-aria/src/useButton.ts
 */
export const Button = ({
  variant = "primary",
  effect = "none",
  style = {},
  background = "",
  isRounded = false,
  asLink = false,
  outline = false,
  ...props
}: ButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const { elementType: Element = asLink ? Link : "button" } = props;

  const { buttonProps, isPressed } = useButton(props, ref);

  const buttonClassName = clsx(
    props.className,
    styles.main,
    styles[variant],
    outline && styles.outline,
    isPressed && styles.isPressed,
    isRounded && styles.isRounded,
    effect === "shine" && styles.shine,
  );

  const handleClick = asLink ? { to: props.to as string } : buttonProps.onClick;

  return (
    <Element
      // React-aria's useButton hook doesn't extend our style, children or
      // className props so we need to add them manually
      {...buttonProps}
      style={{ background, ...style }}
      className={buttonClassName}
      ref={ref}
      {...handleClick}
    >
      {props.children}
    </Element>
  );
};
