import { useEffect, useRef, useState } from "react";

interface ScrollThresholdObject {
  up: number;
  down: number;
}

/**
 * Properties for the useHideHeaderOnScroll hook.
 */
interface UseStickyHeaderProps {
  /**
   * The scroll thresholds for hiding and showing the header.
   * It can be a number, string, or an object with 'up' and 'down' properties.
   */
  scrollThreshold?: ScrollThresholdObject | number | string;

  /**
   * The header element to be animated. It can be an HTMLElement,
   * a React ref object pointing to an HTMLElement, or null.
   */
  headerElement: HTMLElement | React.RefObject<HTMLElement> | null;
  override?;
}

/**
 * Custom hook to animate the header element off-screen during downward
 * scrolling, and bring it back on-screen during upward scrolling.
 *
 * @param {UseStickyHeaderProps} props - The properties for configuring
 * the scroll behavior, including thresholds and the header element reference.
 */
export const useStickyHeader = ({
  scrollThreshold = { up: 0, down: 0 },
  headerElement,
}: UseStickyHeaderProps) => {
  const HEIGHT_OFFSET = 30; // in px, ensures element is off-screen.

  const node = useRef(
    headerElement && "current" in headerElement ?
      headerElement?.current
    : (headerElement as HTMLElement),
  );

  const scrollRef = useRef({
    prevScrollTop: 0,
    totalScrollDistance: 0,
    currentTranslation: undefined as number | undefined,
    browserAnimationFrames: undefined as number | undefined,
  });

  const { up: scrollUpThreshold, down: scrollDownThreshold } =
    typeof scrollThreshold === "number" || typeof scrollThreshold === "string" ?
      { up: Number(scrollThreshold), down: 0 }
    : scrollThreshold;

  const [state, setState] = useState({ isHidden: false, pctHidden: 0 });

  const overrideRef = useRef(false);

  /**
   * Retrieves the top position of the current header element relative to the viewport.
   *
   * @returns {number} The top position of the header element in px or 0 if not available.
   */
  function getElementTopPosition() {
    const elPosition = node.current?.getBoundingClientRect();
    return elPosition?.top ?? 0;
  }

  /**
   * Calculates the scroll distance from the previous scroll position.
   *
   * @param {number} scrollTop The current scroll position from the top of the page.
   * @returns {number} The scroll distance since the last calculation.
   */
  const calculateScrollDistance = (scrollTop) => {
    const { prevScrollTop } = scrollRef.current;
    const scrollDistance = scrollTop - prevScrollTop;

    // set previous scroll position to current
    scrollRef.current.prevScrollTop = scrollTop;

    return scrollDistance;
  };

  const calculateTotalScrollDistance = (scrollDistance) => {
    // reset total scroll distance if direction changes
    if (
      Math.sign(scrollDistance) ===
      Math.sign(scrollRef.current.totalScrollDistance)
    ) {
      scrollRef.current.totalScrollDistance += scrollDistance;
    } else {
      scrollRef.current.totalScrollDistance = scrollDistance;
    }

    return scrollRef.current.totalScrollDistance;
  };

  const calculateTranslation = (
    elementTop: number,
    elementHeight: number,
    scrollDistance: number,
    totalScrollDistance: number,
  ) => {
    // determine which threshold to use based on scroll direction
    // where scrollDistance < 0 is scroll up
    const threshold =
      scrollDistance < 0 ?
        Math.abs(scrollUpThreshold)
      : Math.abs(scrollDownThreshold);

    const height = elementHeight - HEIGHT_OFFSET;

    // reset total scroll distance if within element bounds
    // - ensures it moves without a threshold at the top
    if (elementTop >= -height) {
      // shouldn't this be scrollTop?
      scrollRef.current.totalScrollDistance = 0;
      setState({
        ...state,
        pctHidden: (Math.abs(elementTop) / height) * 100,
        isHidden: elementTop === -height ? true : false,
      });
      // scrollRef.current.pctVisibile =
      //   (Math.abs(elementTop) / elementHeight) * 100;
    } else {
      setState({ ...state, isHidden: false, pctHidden: 100 });
    }

    if (
      Math.abs(totalScrollDistance) < threshold &&
      elementTop >= 0 // not part-way through scrolling
    ) {
      return scrollRef.current.currentTranslation || 0;
    }

    //
    return Math.max(
      Math.min(
        elementTop +
          (scrollDistance < 0 ?
            Math.abs(scrollDistance)
          : -Math.abs(scrollDistance)),
        0,
      ),
      -elementHeight,
    );
  };

  /**
   * Handles the translation of an element based on the user's scroll activity.
   *
   * @param {Object} currentScrollRef - Object containing scroll-related properties.
   * @param {number} currentScrollRef.prevScrollTop - The previous scroll position from the top of the page.
   * @param {number} [currentScrollRef.browserAnimationFrames] - stores the requestAnimationFrame ID.
   * @param {number} [currentScrollRef.totalScrollDistance] - tracks the total distance scrolled.
   * @param {number} [currentScrollRef.currentTranslation] - stores the current translation amount.
   */

  const handleTranslation = (currentScrollRef: {
    prevScrollTop: number;
    browserAnimationFrames: number | undefined;
    totalScrollDistance: number | undefined;
    currentTranslation: number | undefined;
  }) => {
    scrollRef.current.browserAnimationFrames = requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const scrollDistance = calculateScrollDistance(scrollTop);
      const totalScrollDistance = calculateTotalScrollDistance(scrollDistance);
      const elementTop = getElementTopPosition();
      const elementHeight = (node?.current?.offsetHeight ?? 0) + HEIGHT_OFFSET;

      const translationAmount = calculateTranslation(
        elementTop,
        elementHeight,
        scrollDistance,
        totalScrollDistance,
      );

      if (
        overrideRef.current !== true &&
        node.current &&
        translationAmount !== currentScrollRef.currentTranslation
      ) {
        currentScrollRef.currentTranslation = translationAmount;
        node.current.style.translate = `0px ${translationAmount.toFixed(2)}px`;
      }

      currentScrollRef.prevScrollTop = scrollTop; // update prevScrollTop value after translation
    });
  };

  useEffect(() => {
    if (!node) {
      return;
    }

    if (!node.current) {
      node.current =
        headerElement && "current" in headerElement ?
          headerElement?.current
        : (headerElement as HTMLElement);
    }

    const computedStyle =
      node?.current ? window.getComputedStyle(node.current) : null;

    if (!node.current) {
      node.current =
        headerElement && "current" in headerElement ?
          headerElement?.current
        : (headerElement as HTMLElement);
    }

    if (
      computedStyle?.position !== "sticky" &&
      computedStyle?.position !== "fixed"
    ) {
      node.current.style.position = "sticky";
      node.current.style.insetBlockStart = "0";
    }

    // update initial values to scrollRef reference on mount
    const currentScrollRef = scrollRef.current;
    currentScrollRef.prevScrollTop = window.scrollY;
    currentScrollRef.totalScrollDistance = 0;
    currentScrollRef.currentTranslation = 0;

    node.current.style.translate = `0px 0px`;

    window.addEventListener("scroll", () =>
      handleTranslation(currentScrollRef),
    );
    return () => {
      scrollRef.current = {
        ...scrollRef.current,
        prevScrollTop: 0,
        totalScrollDistance: 0,
      };

      window.removeEventListener("scroll", () =>
        handleTranslation(currentScrollRef),
      );
      if (currentScrollRef.browserAnimationFrames) {
        cancelAnimationFrame(currentScrollRef.browserAnimationFrames);
      }
    };
  }, [headerElement]);

  return {
    pctHidden: state.pctHidden.toFixed(0) || 0,
    isHidden: state.isHidden,
    overrideRef,
  };
};

export default useStickyHeader;
