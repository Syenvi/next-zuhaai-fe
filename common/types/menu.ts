import { JSX } from "react";

export type MenuItemProps = {
  title: string;
  href?: string;
  icon: JSX.Element;
  type: "item" | "collapse";
  onClick?: () => void;
  className?: string;
  isHover?: boolean;
  children?: MenuItemProps[];
};
