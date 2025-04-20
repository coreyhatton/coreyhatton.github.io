import clsx from "clsx";
import React, { useRef } from "react";
import { useFocusRing, usePress } from "react-aria";
import styles from "./button.module.css";

type FillColors =
  | "primary"
  | "secondary"
  | "tertiary"
  | "accent"
  | "base"
  | "contrast";

type BaseButtonProps<
  E extends React.ElementType = "button" | React.JSXElementConstructor<unknown>,
> = React.ComponentPropsWithoutRef<E> &
  React.HTMLAttributes<HTMLElement> & {
    className?: string;
    variant?: "none" | "shine" | "outline" | "icon";
    fill?: FillColors | React.CSSProperties["backgroundColor"];
    textColor?: FillColors | React.CSSProperties["color"];
    style?: React.CSSProperties;
    children?: React.ReactNode;
    isRounded?: boolean;
    background?: React.CSSProperties["background"];
    asElement?: E;
    elementProps?: React.ComponentPropsWithoutRef<E>;
    isLoading?: boolean;
  };

/**
 * Checks if the given string is a predefined fill color.
 * Otherwise assumes it is a valid CSS color string.
 *
 * @param fill A string of the fill color to check
 * @returns Whether the given string is a valid fill color
 */
function isFillColor(fill: string): fill is FillColors {
  return ["primary", "secondary", "tertiary", "accent", "base"].includes(fill);
}

export const Button = ({
  fill = "primary",
  textColor,
  variant = "none",
  isRounded = false,
  asElement = "button" as unknown as React.ElementType<"button">,
  ...props
}: BaseButtonProps<typeof asElement>) => {
  const elementRef = useRef<HTMLElement | null>(null);

  const { pressProps, isPressed } = usePress({
    onPress: (props.onPress || props.onClick) as () => void,
    isDisabled: props.isDisabled,
    ref: elementRef,
  });

  const { /*isFocusVisible,*/ focusProps } = useFocusRing();

  const additionalProps =
    asElement === "button" ?
      {
        type: props.type || "button",
        disabled: props.disabled,
        title: props.title,
      }
    : {
        // role: "button",
        href: asElement === "a" && !props.disabled ? props.href : undefined,
        target: asElement === "a" && !props.disabled ? props.target : undefined,
        rel: asElement === "a" && !props.disabled ? props.rel : undefined,
        type: asElement === "input" && !props.disabled ? props.type : undefined,
        disabled: props.disabled,
        title: props.title,
      };

  const Element = asElement || ("button" as typeof asElement);

  const buttonClassName = clsx(
    props.className,
    styles.main,
    styles[fill],
    styles[variant],
    isPressed && styles.isPressed,
    isRounded && styles.isRounded,
  );

  const styleProps = {
    ...(textColor && isFillColor(textColor) ?
      { color: `var(--color-${textColor}, currentColor)` }
    : { color: textColor }),
    ...(fill && isFillColor(fill) ? "" : { backgroundColor: fill }),
    ...props.style,
  };

  return (
    <Element
      {...props}
      {...additionalProps}
      style={styleProps}
      className={buttonClassName}
      ref={elementRef}
      aria-pressed={isPressed}
      // The `data-disabled` attribute enables correct styles when doing `<Button asElement={"..."} disabled>`
      data-disabled={props.disabled || undefined}
      data-pressed={props["aria-pressed"] || undefined}
      {...pressProps}
      {...focusProps}
    >
      {props.children}
    </Element>
  );
};

Button.displayName = "Button";
