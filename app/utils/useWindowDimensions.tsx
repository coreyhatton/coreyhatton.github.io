import { useEffect, useRef } from "react";

export const useDomWindowDimensions = () => {
  const windowDimensions = useRef({
    width: undefined,
    height: undefined,
  } as {
    width: number | undefined;
    height: number | undefined;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      windowDimensions.current = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      };
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
