import logo from "./data-black";
import type { ImgHTMLAttributes } from "react";

interface LogoProps {
  props?: ImgHTMLAttributes<HTMLImageElement>;
  darkMode?: boolean;
}

const svgMode = (isDarkMode: boolean, svg: string) => {
  const lightMode = /fill="black"/g;
  const darkMode = 'fill="white"';
  if (isDarkMode) {
    return svg.replace(lightMode, darkMode);
  }
  return svg;
};

export default function Logo({ darkMode = false, ...props }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`data:image/svg+xml;utf8, ${svgMode(darkMode, logo)}`}
      alt=""
      {...props}
    />
  );
}
