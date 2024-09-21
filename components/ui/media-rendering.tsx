"use client";

import useMediaQuery from "@/hooks/use-media-query";
import tailwindConfig from "@/tailwind.config";

const tailwindBreakpoints = tailwindConfig.theme.screens;
type Breakpoint = keyof typeof tailwindBreakpoints;

interface MediaRenderingProps {
  minWidth?: Breakpoint;
  maxWidth?: Breakpoint;
  children: React.ReactNode;
}
/**
 *
 * @param minWidth screen breakpoint from tailwind config
 * @param maxWidth screen breakpoint from tailwind config
 * @param children components to conditionally render
 * @returns
 */
const MediaRendering: React.FC<MediaRenderingProps> = ({
  minWidth,
  maxWidth,
  children,
}) => {
  const minWidthPx = minWidth ? tailwindBreakpoints[minWidth] : undefined;
  const maxWidthPx = maxWidth ? tailwindBreakpoints[maxWidth] : undefined;

  let minDeviceSize = useMediaQuery(`(min-width: ${minWidthPx || "0px"})`);
  let maxDeviceSize = useMediaQuery(`(max-width: ${maxWidthPx || "0px"})`);

  minDeviceSize = minWidthPx ? minDeviceSize : true;
  maxDeviceSize = maxWidthPx ? maxDeviceSize : true;

  return <>{minDeviceSize && maxDeviceSize && children}</>;
};

export default MediaRendering;
