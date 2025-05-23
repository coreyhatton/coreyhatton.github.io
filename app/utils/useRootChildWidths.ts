import { useEffect, useState } from "react";
import { useDomWindowDimensions } from "./useWindowDimensions";

const useRootChildWidth = (customWidth: undefined | number | string) => {
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

export default useRootChildWidth;
