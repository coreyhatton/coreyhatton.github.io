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
  headerElement: HTMLElement | React.RefObject<HTMLElement | null> | null;

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

  syncWithStates?: boolean | boolean[];
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
  scrollThreshold = { up: 30, down: SCROLL_THRESHOLD_MIN },
  position = DEFAULTS.position,
  stickyBoundary = DEFAULTS.stickyBoundary,
  zIndex = DEFAULTS.zIndex,
  transitionDuration = DEFAULTS.transitionDuration,
  transitionFunctionIn = DEFAULTS.transitionFunctionIn,
  transitionFunctionOut = DEFAULTS.transitionFunctionOut,
  syncWithStates,
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
    isHidden: false,
    browserAnimationFrames: undefined as number | undefined,
  });

  const { up: scrollUpThreshold, down: scrollDownThreshold } =
    typeof scrollThreshold === "number" || typeof scrollThreshold === "string" ?
      { up: Number(scrollThreshold), down: 0 }
    : scrollThreshold;

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
      pageScrollTop: number,
      pageScrollDistance: number,
      totalScrollDistance: number,
      elementTopPosition: number,
    ) => {
      let isHidden = scrollRef.current.isHidden;

      const height = elementHeight - HEIGHT_OFFSET;
      const scrollUp = pageScrollDistance < 0;
      const scrollDown = pageScrollDistance > 0;
      // determine which threshold to use based on scroll direction
      const threshold =
        scrollUp ? Math.abs(scrollUpThreshold)
        : scrollDown ? Math.abs(scrollDownThreshold)
        : 0;

      switch (true) {
        case overrideRef.current:
          isHidden = false;
          console.log("case overrideRef.current");
          break;
        case elementTopPosition > 0:
          // element hasn't reached top of page yet
          isHidden = false;
          scrollRef.current.totalScrollDistance = 0;
          console.log("case elementTopPosition > 0");
          break;
        case scrollUp && pageScrollTop <= height:
          scrollRef.current.totalScrollDistance = 0;
          console.log("case scrollUp && pageScrollTop <= height");
          isHidden = false;
          break;
        case pageScrollTop <= height && totalScrollDistance < height:
          scrollRef.current.totalScrollDistance = 0;
          console.log("still at top of page. rely on sticky behavior");
          isHidden = true;
          break;
        case Math.abs(totalScrollDistance) < threshold ||
          Math.abs(totalScrollDistance) < SCROLL_THRESHOLD_MIN ||
          pageScrollTop < height:
          // hasn't reached threshold yet
          console.log("case Math.abs(totalScrollDistance) < threshold");
          break;
        case scrollUp:
          isHidden = false;
          console.log("case scrollUp");
          break;
        case scrollDown:
          // finally, if none of the above cases apply and we're scrolling down, hide the header
          isHidden = true;
          console.log("case scrollDown");
          break;
      }

      // default
      return isHidden !== scrollRef.current.isHidden;
    },
    [scrollUpThreshold, scrollDownThreshold],
  );

  const handleScroll = useCallback(
    (currentScrollRef: {
      prevScrollTop: number;
      browserAnimationFrames: number | undefined;
      totalScrollDistance: number | undefined;
      currentTranslation: number | undefined;
      isHidden: boolean | undefined;
    }) => {
      const scrollTop = window.scrollY;
      const scrollDistance = calculateScrollDistance(scrollTop);
      const totalScrollDistance = calculateTotalScrollDistance(scrollDistance);
      const elementHeight = (node?.current?.offsetHeight ?? 0) + HEIGHT_OFFSET;
      const elementPosition = getElementTopPosition();

      if (currentScrollRef.browserAnimationFrames) {
        cancelAnimationFrame(currentScrollRef.browserAnimationFrames);
      }

      const changeState = calculateIsHidden(
        elementHeight,
        scrollTop,
        scrollDistance,
        totalScrollDistance,
        elementPosition,
      );

      const getActionType = () => {
        if (!node.current) {
          return null;
        }

        if (overrideRef.current || (changeState && currentScrollRef.isHidden)) {
          return "show";
        }

        if (changeState && !currentScrollRef.isHidden) {
          return "hide";
        }

        return null;
      };

      currentScrollRef.browserAnimationFrames = requestAnimationFrame(() => {
        const action = getActionType();

        if (!node.current) {
          return;
        }

        if (action === "hide") {
          // move header element off-screen if hidden
          node.current.classList.remove(styles.attached);
          node.current.classList.add(styles.detached);
          currentScrollRef.isHidden = true;
        }

        if (action === "show") {
          // move header element back on-screen if not hidden or if overridden
          node.current?.classList.remove(styles.detached);
          node.current?.classList.add(styles.attached);
          currentScrollRef.isHidden = false;
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
    console.log("useStickyHeader useEffect");
    if (!node.current) {
      node.current =
        headerElement && "current" in headerElement ?
          headerElement?.current
        : (headerElement as HTMLElement);

      // if header element is not found, return early
      if (!node.current) return;
    }

    for (const key in styleProps) {
      if (styleProps[key] === undefined) continue;
      node.current.style.setProperty(key, styleProps[key].toString());
    }

    const exSync =
      typeof syncWithStates === "undefined" ? []
      : typeof syncWithStates === "boolean" ? [syncWithStates]
      : syncWithStates;

    let overridden = false;
    for (const arg of exSync) {
      if (arg) {
        overridden = true;
        overrideRef.current = overridden;
      }
    }

    node.current.classList.add(styles.stickyHeader);
    if (overridden) {
      node.current.classList.remove(styles.detached);
      node.current.classList.add(styles.attached);
    } else {
      node.current.classList.remove(styles.attached);
      node.current.classList.add(styles.detached);
    }

    // update initial values to scrollRef reference on mount
    const currentScrollRef = scrollRef.current;
    currentScrollRef.prevScrollTop = window.scrollY;
    currentScrollRef.totalScrollDistance = 0;
    currentScrollRef.currentTranslation = 0;
    currentScrollRef.isHidden = false;

    if (!overridden) {
      // attach scroll event listener
      console.log("attaching scroll event listener");
      window.addEventListener("scroll", () => handleScroll(currentScrollRef));
    }

    return () => {
      // cleanup on unmount
      console.log("removing scroll event listener on cleanup");
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
  }, [handleScroll, headerElement, styleProps, syncWithStates]);

  return {
    /** Current header state */
    isHidden: scrollRef.current.isHidden,
    /**
     * React ref object to force the header to be visible.
     * Set overrideRef.current to true to force the header to be visible.
     */
    overrideRef,
  };
};

export default useStickyHeader;
