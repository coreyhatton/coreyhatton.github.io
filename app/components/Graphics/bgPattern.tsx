import styles from "./styles.module.css";

interface BgPosition {
  "top left": string;
  "top center": string;
  "top right": string;
  "bottom left": string;
  "bottom center": string;
  "bottom right": string;
  "left top": string;
  "left center": string;
  "left bottom": string;
  "right top": string;
  "right center": string;
  "right bottom": string;
  "center top": string;
  "center center": string;
  "center bottom": string;
  "center left": string;
  "center right": string;
}

interface BgPatternProps extends React.SVGProps<SVGSVGElement> {
  full?: boolean;
  flip?: boolean | "horizontal" | "vertical";
  position?: BgPosition[keyof BgPosition];
  maxInlineSize?: React.CSSProperties["maxInlineSize"];
  maxBlockSize?: React.CSSProperties["maxBlockSize"];
  opacity?: React.CSSProperties["opacity"];
  color?: React.CSSProperties["color"];
}

/**
 * A reusable SVG pattern to be used as a background.
 *
 * @prop {boolean} full - Whether the pattern should be full or cropped.
 * @prop {boolean | "horizontal" | "vertical"} flip - Whether the pattern should be flipped horizontally, vertically, or both.
 * @prop {BgPosition[keyof BgPosition]} position - Where the pattern should be positioned.
 */
export const BgPattern = ({
  full,
  flip,
  color,
  position = "bottom left",
  maxInlineSize = "100%",
  maxBlockSize = "100%",
  opacity = 0.2,
  ...props
}: BgPatternProps) => {
  const positionTransforms = {
    scaleX: position.includes("right") ? -1 : 1,
    scaleY: position.includes("top") ? -1 : 1,
  };

  // flip depending on position
  switch (flip) {
    case "horizontal":
      positionTransforms.scaleX *= -1;
      break;
    case "vertical":
      positionTransforms.scaleY *= -1;
      break;
    case true:
      positionTransforms.scaleX *= -1;
      positionTransforms.scaleY *= -1;
      break;
    default:
      break;
  }

  // Transforms applied to inner <g> element container
  const transforms = [
    !full && `translate(${positionTransforms.scaleX < 0 ? "" : "-"}461)`, // reverse if flipped
    !Object.values(positionTransforms).every((v) => v === 1) && // do not add if scale(1 1);
      `scale(${positionTransforms.scaleX} ${positionTransforms.scaleY})`,
  ]
    .filter(Boolean)
    .join(" ");

  // Inset positions based on position prop
  const sides = ["left", "right", "top", "bottom", "center"];
  const insetPosition = sides.reduce(
    (acc, side) => {
      if (position.includes(side)) {
        switch (side) {
          case "left":
            acc.insetInlineStart = "0";
            break;
          case "right":
            acc.insetInlineEnd = "0";
            break;
          case "top":
            acc.insetBlockStart = "0";
            break;
          case "bottom":
            acc.insetBlockEnd = "0";
            break;
          case "center":
            if (position.includes("left") || position.includes("right")) {
              acc.insetBlockStart = "50%";
              acc.insetBlockEnd = "50%";
            } else if (
              position.includes("top") ||
              position.includes("bottom")
            ) {
              acc.insetInlineStart = "50%";
              acc.insetInlineEnd = "50%";
            }
            break;
          default:
            break;
        }
      }
      return acc;
    },
    {} as { [key: string]: string | undefined },
  );

  const svgStyle = {
    ...insetPosition,
    maxInlineSize,
    maxBlockSize,
    opacity,
    color,
    ...props.style,
  };

  return (
    <svg
      id={`bgPattern-${(crypto?.randomUUID() || new Date().getTime().toString()).slice(0, 6)}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={full ? "0 0 1000 567" : "0 0 539 567"}
      // 539 * 567 for cropped, (1000 - 461) <- x
      className={`${styles.bgPattern} ${props.className || ""}`}
      style={svgStyle}
      {...props}
    >
      <g
        transform={transforms}
        //@ts-expect-error ts(2322) https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/68967
        transformOrigin="center"
      >
        <path d="M831.98,278.27c-6.51,0-13.1-1.83-18.94-5.66l-163.8-107.35c-15.98-10.47-20.46-31.99-9.99-47.97L705.87,15.65c10.47-15.98,31.99-20.46,47.97-9.99l163.8,107.35c15.98,10.47,20.46,31.99,9.99,47.97l-66.61,101.64c-6.64,10.14-17.73,15.65-29.03,15.65Zm-190.64-159.61l2.09,1.37c-8.96,13.67-5.13,32.09,8.55,41.05l163.8,107.35c13.67,8.96,32.09,5.13,41.05-8.55l66.61-101.64c8.96-13.67,5.13-32.09-8.54-41.05L751.1,9.84c-13.67-8.96-32.09-5.13-41.05,8.55l-66.62,101.64-2.09-1.37Z" />
        <path d="M925.8,437.67c-6.51,0-13.1-1.83-18.94-5.66l-67.56-44.28c-15.98-10.47-20.46-31.99-9.99-47.97l36.53-55.74c10.47-15.98,31.99-20.46,47.97-9.99l67.56,44.27c7.74,5.07,13.04,12.86,14.93,21.92,1.89,9.06,.13,18.31-4.94,26.05l-36.53,55.74c-6.64,10.14-17.73,15.65-29.03,15.65Zm-92.3-95.17c-8.96,13.67-5.13,32.09,8.54,41.05l67.56,44.28c13.67,8.96,32.09,5.13,41.05-8.55l36.53-55.74c4.34-6.62,5.84-14.54,4.23-22.29-1.61-7.75-6.15-14.41-12.77-18.75l-67.56-44.27c-13.67-8.96-32.09-5.13-41.05,8.55l-36.53,55.74Z" />
        <path d="M917.21,461.48l-287.86-188.66c-14.98-9.82-32.89-13.21-50.42-9.56-17.54,3.65-32.6,13.91-42.42,28.89l-167.89,256.17c-3.64,5.54-6.43,11.58-8.3,17.95l-.29,.79h5.28c1.72-5.66,4.23-11.04,7.48-15.99l167.89-256.17c9.08-13.86,23.03-23.36,39.25-26.74,16.23-3.38,32.8-.24,46.67,8.85l287.86,188.66c28.62,18.75,36.64,57.3,17.89,85.92l-9.19,14.02-1.12,1.45h6.14l8.35-12.73c20.27-30.93,11.59-72.58-19.33-92.84Z" />
        <path d="M550.3,442.95c-5.87-28.16-22.36-52.35-46.43-68.1l-213.59-139.88-3.23-2.11c-24.06-15.76-52.82-21.21-80.98-15.33-28.16,5.87-52.35,22.36-68.1,46.43L0,474.62v9.17l142.16-217.09c15.02-22.94,38.08-38.66,64.93-44.26,26.85-5.6,54.27-.41,77.21,14.62l216.82,141.99c22.94,15.02,38.67,38.08,44.26,64.93s.41,54.27-14.62,77.21l-29.08,44.41-1.03,1.45h6.08l28.23-43.11c15.76-24.07,21.21-52.83,15.33-80.99Z" />
        <path d="M768.61,316.43c-5.97-16.78-17.03-30.82-31.97-40.61L471.25,102.07c-18.13-11.87-39.8-15.97-61.01-11.55-21.21,4.43-39.43,16.85-51.3,34.98l-72.13,110.19L70.76,565.7l-.85,1.34h5.97L291,238.44l72.13-110.19c11.13-17.01,28.23-28.67,48.13-32.82,19.9-4.15,40.23-.31,57.24,10.83l265.39,173.76c28.03,18.35,40.86,53.55,31.21,85.6-2.08,6.95-5.19,13.61-9.22,19.77l-118.2,180.23-1.02,1.42h6.09l117.33-178.9c4.3-6.57,7.61-13.67,9.83-21.08,4.94-16.41,4.48-34.4-1.3-50.64Z" />
      </g>
    </svg>
  );
};

export default BgPattern;
