import clsx from "clsx";
import { useEffect, useState } from "react";
import type { GridWidth, PxWidth } from "~/components/types";
import { useDomWindowDimensions } from "~/utils/useWindowDimensions";
import styles from "./styles.module.css";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
  width?: GridWidth | PxWidth;
  contentWidth?: GridWidth | PxWidth;
}

/**
 * If customWidth is provided, this hook will detect if the footer should be
 * full width or not by comparing the customWidth value to the window width.
 * It will return true if the footer should be full width and false otherwise.
 * If customWidth is not provided, it will always return false.
 */
const useCustomWidthFooter = (customWidth: undefined | number | string) => {
  const [isFullWidth, setFullWidth] = useState(false);
  const windowDimensions = useDomWindowDimensions();

  useEffect(() => {
    const handleResize = () => {
      const { width: windowWidth } = windowDimensions.current;
      if (!customWidth || !windowWidth) return;

      const customWidthPx =
        typeof customWidth === "number" ? customWidth : parseInt(customWidth);

      setFullWidth(customWidthPx >= windowWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  });

  return isFullWidth;
};

export const Footer = ({
  width = "full",
  contentWidth = "full",
  ...props
}: FooterProps) => {
  const isGridWidth = {
    width: ["full", "wide", "content"].includes(width as string),
    contentWidth: ["full", "wide", "content"].includes(contentWidth as string),
  };

  const isFullWidth = useCustomWidthFooter(
    isGridWidth.width ? undefined : width,
  );

  const footerClassName = clsx(
    props.className,
    styles.main,
    styles[isGridWidth.width ? `${width}` : "customWidth"],
  );

  const footerStyles = {
    ...props.style,
    inlineSize:
      isGridWidth.width ? undefined : (
        `min(${typeof width === "number" ? width : parseInt(width)}px, 100%)`
      ),
    marginInline: isGridWidth.width ? undefined : "auto",
    borderInline: !isGridWidth.width && isFullWidth ? "none" : undefined,
    borderRadius: !isGridWidth.width && isFullWidth ? 0 : undefined,
  };

  return (
    <footer className={footerClassName} style={footerStyles}>
      {props.children}
    </footer>
  );
};

export default Footer;
