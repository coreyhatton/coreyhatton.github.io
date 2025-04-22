import type { IconProps } from "@iconify/react";
import { Icon } from "@iconify/react";

export type IconComponentProps = {
  iconifyIcon: IconProps["icon"];
} & Partial<IconProps>;

/**
 * A convenience wrapper around the `Icon` component from `@iconify/react`.
 *
 * It sets default values for the `style` prop, specifically:
 * - `height` to `"1.2cap"` if not provided,
 * - `width` to `"auto"`,
 * - `flex` to `"none"`.
 *
 * @param props - The props for the `Icon` component.
 * @param iconifyIcon - The icon to render.
 * @returns The rendered icon.
 */
export const IconComponent = ({
  iconifyIcon,
  ...props
}: IconComponentProps) => {
  return (
    <Icon
      {...props}
      icon={iconifyIcon}
      style={{
        height: props.height ? props.height : "1.2cap",
        width: "auto",
        flex: "none",
        ...props.style,
      }}
    />
  );
};

IconComponent.displayName = "Icon";

export default IconComponent;
