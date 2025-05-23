import React, { useCallback, useEffect, useRef } from "react";

import styles from "./useStickyHeader.module.css";

export interface ScrollThresholdObject {
  up: number; // in px;
  down: number; // in px;
}

export interface UseStickyHeaderProps {
  /**
   * The scroll thresholds for hiding and showing the header.
   * If a number or string is passed, it will be used for the up threshold only.
   */
  scrollThreshold?: ScrollThresholdObject | number | string;

  /**
   * The header element to be animated. It can be an HTMLElement,
   * a React ref object pointing to an HTMLElement, or null.
   */
  headerElement: HTMLElement | React.RefObject<HTMLElement> | null;

  /**
   * The position of the header element.
   * @default "sticky"
   */
  position?: "sticky" | "fixed";

  /**
   * The top position of the header element.
   * @default "0"
   */
  stickyBoundary?: React.CSSProperties["insetBlockStart" | "top"];

  /**
   * The z-index of the header element.
   * @default "99"
   */
  zIndex?: React.CSSProperties["zIndex"];

  /**
   * The transition duration of the header element.
   * @default "700ms"
   */
  transitionDuration?: React.CSSProperties["transitionDuration"];

  /**
   * The transition function of the header element when attached.
   * @default "ease-out"
   */
  transitionFunctionIn?: React.CSSProperties["transitionTimingFunction"];

  /**
   * The transition function of the header element when detached.
   * @default "ease-in"
   */
  transitionFunctionOut?: React.CSSProperties["transitionTimingFunction"];
}

const HEIGHT_OFFSET = 30; // in px, ensures element is fully off-screen.
const SCROLL_THRESHOLD_MIN = 10; // in px
const DEFAULTS = {
  position: "sticky",
  stickyBoundary: "0px",
  zIndex: "99",
  transitionDuration: "700ms",
  transitionFunctionIn: "ease-out",
  transitionFunctionOut: "ease-in",
} as const;

/**
 * A hook that animates a header element in response to user scroll activity.
 *
 * The hook returns an object with the following properties:
 * - `isHidden`: A boolean indicating whether the header element is currently hidden.
 * - `overrideRef`: A React ref object to force the header to be visible. Set `overrideRef.current` to `true` to force the header to be visible.
 *
 * @param {UseStickyHeaderProps} props An object of props to control the sticky header.
 * @returns An object with properties `isHidden` and `overrideRef`.
 */
export const useStickyHeader = ({
  headerElement,
  scrollThreshold = { up: 60, down: SCROLL_THRESHOLD_MIN },
  position = DEFAULTS.position,
  stickyBoundary = DEFAULTS.stickyBoundary,
  zIndex = DEFAULTS.zIndex,
  transitionDuration = DEFAULTS.transitionDuration,
  transitionFunctionIn = DEFAULTS.transitionFunctionIn,
  transitionFunctionOut = DEFAULTS.transitionFunctionOut,
}: UseStickyHeaderProps) => {
  /**
   * A set of CSS variables to be applied to the header element.
   * Will not be applied if the value is the same as the default, instead falling
   * back to defaults defined in the css.
   */
  const styleProps = Object.fromEntries(
    Object.entries({
      position,
      stickyBoundary,
      zIndex,
      transitionDuration,
      transitionFunctionIn,
      transitionFunctionOut,
    }).filter(
      ([key, value]) => value !== DEFAULTS[key as keyof typeof DEFAULTS],
    ),
  );

  const node = useRef(
    headerElement && "current" in headerElement ?
      headerElement?.current
    : (headerElement as HTMLElement),
  );

  const scrollRef = useRef({
    prevScrollTop: 0,
    totalScrollDistance: 0,
    currentTranslation: undefined as number | undefined,
    currentlyHidden: false,
    browserAnimationFrames: undefined as number | undefined,
  });

  const { up: scrollUpThreshold, down: scrollDownThreshold } =
    typeof scrollThreshold === "number" || typeof scrollThreshold === "string" ?
      { up: Number(scrollThreshold), down: 0 }
    : scrollThreshold;

  const stateRef = useRef({ isHidden: false });
  const overrideRef = useRef(false);

  /**
   * Retrieves the top position of the current header element relative to the viewport.
   */
  const getElementTopPosition = (): number => {
    const elPosition = node.current?.getBoundingClientRect();
    return elPosition?.top ?? 0;
  };

  /**
   * Calculates the scroll distance from the previous scroll position.
   */
  const calculateScrollDistance = (scrollTop: number): number => {
    const { prevScrollTop } = scrollRef.current;
    const scrollDistance = scrollTop - prevScrollTop;

    // set previous scroll position to current
    scrollRef.current.prevScrollTop = scrollTop;

    return scrollDistance;
  };

  const calculateTotalScrollDistance = (scrollDistance: number) => {
    // reset total scroll distance if direction changes
    if (
      Math.sign(scrollDistance) ===
        Math.sign(scrollRef.current.totalScrollDistance) ||
      scrollDistance === 0
    ) {
      scrollRef.current.totalScrollDistance += scrollDistance;
    } else {
      scrollRef.current.totalScrollDistance = scrollDistance;
    }

    return scrollRef.current.totalScrollDistance;
  };

  const calculateIsHidden = useCallback(
    (
      elementHeight: number,
      scrollTop: number,
      scrollDistance: number,
      totalScrollDistance: number,
      elementPosition: number,
    ) => {
      // determine which threshold to use based on scroll direction
      // where scrollDistance < 0 is scroll up
      const threshold =
        scrollDistance < 0 ? Math.abs(scrollUpThreshold)
        : scrollDistance > 0 ? Math.abs(scrollDownThreshold)
        : 0;

      const height = elementHeight - HEIGHT_OFFSET;
      const elementTop = elementPosition;

      if (elementTop > 0) {
        // element hasn't reached top of page yet
        stateRef.current.isHidden = false;
        scrollRef.current.totalScrollDistance = 0;
        return false;
      }
      if (scrollTop < height && totalScrollDistance < height) {
        // at top of page and within element height
        stateRef.current.isHidden = false;
        return false;
      }
      if (
        Math.abs(totalScrollDistance) < threshold ||
        totalScrollDistance < SCROLL_THRESHOLD_MIN ||
        scrollTop < height
      ) {
        // hasn't reached threshold
        stateRef.current.isHidden = false;
        return false;
      }
      if (scrollDistance > 0) {
        // scroll down
        stateRef.current.isHidden = true;
        return true;
      }
      if (scrollDistance < 0) {
        // scroll up
        stateRef.current.isHidden = false;
        return false;
      }

      // default
      return stateRef.current.isHidden;
    },
    [scrollUpThreshold, scrollDownThreshold],
  );

  const handleScroll = useCallback(
    (currentScrollRef: {
      prevScrollTop: number;
      browserAnimationFrames: number | undefined;
      totalScrollDistance: number | undefined;
      currentTranslation: number | undefined;
      currentlyHidden: boolean | undefined;
    }) => {
      const scrollTop = window.scrollY;
      const scrollDistance = calculateScrollDistance(scrollTop);
      const totalScrollDistance = calculateTotalScrollDistance(scrollDistance);
      const elementHeight = (node?.current?.offsetHeight ?? 0) + HEIGHT_OFFSET;
      const elementPosition = getElementTopPosition();

      const isHidden = calculateIsHidden(
        elementHeight,
        scrollTop,
        scrollDistance,
        totalScrollDistance,
        elementPosition,
      );

      currentScrollRef.browserAnimationFrames = requestAnimationFrame(() => {
        if (isHidden && !overrideRef.current && node.current) {
          // move header element off-screen if hidden
          node.current.classList.remove(styles.attached);
          node.current.classList.add(styles.detached);
          currentScrollRef.currentlyHidden = isHidden;
        } else {
          // move header element back on-screen if not hidden
          node.current?.classList.remove(styles.detached);
          node.current?.classList.add(styles.attached);
        }
      });
    },
    [overrideRef, calculateIsHidden],
  );

  /**
   * Handles the translation of an element based on the user's scroll activity.
   * Effect runs once on mount to attach the listener and set initial values.
   */
  useEffect(() => {
    if (!node.current) {
      node.current =
        headerElement && "current" in headerElement ?
          headerElement?.current
        : (headerElement as HTMLElement);
    }

    for (const key in styleProps) {
      if (styleProps[key] === undefined) continue;
      node.current.style.setProperty(key, styleProps[key].toString());
    }

    node.current.classList.add(styles.stickyHeader);

    // update initial values to scrollRef reference on mount
    const currentScrollRef = scrollRef.current;
    currentScrollRef.prevScrollTop = window.scrollY;
    currentScrollRef.totalScrollDistance = 0;
    currentScrollRef.currentTranslation = 0;
    currentScrollRef.currentlyHidden = false;

    window.addEventListener("scroll", () => handleScroll(currentScrollRef));

    return () => {
      // cleanup on unmount
      scrollRef.current = {
        ...scrollRef.current,
        prevScrollTop: 0,
        totalScrollDistance: 0,
      };

      window.removeEventListener("scroll", () =>
        handleScroll(currentScrollRef),
      );
      if (currentScrollRef.browserAnimationFrames) {
        cancelAnimationFrame(currentScrollRef.browserAnimationFrames);
      }
    };
  }, [handleScroll, headerElement, styleProps]);

  return {
    /** Current header state */
    isHidden: stateRef.current.isHidden,
    /**
     * React ref object to force the header to be visible.
     * Set overrideRef.current to true to force the header to be visible.
     */
    overrideRef,
  };
};

export default useStickyHeader;
