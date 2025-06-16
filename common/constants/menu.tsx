import { Home, Plug, Bot, Boxes, BarChart } from "lucide-react";
import { MenuItemProps } from "../types/menu";

const iconSize = 17;

export const MENU_ITEMS: MenuItemProps[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home size={iconSize} />,
    type: "item",
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <BarChart size={iconSize} />,
    type: "item",
  },
  {
    type: "divider",
  },
  {
    title: "Connected Platforms",
    href: "/connected-platforms",
    icon: <Plug size={iconSize} />,
    type: "item",
  },
  {
    title: "AI Agents",
    href: "/ai-agents",
    icon: <Bot size={iconSize} />,
    type: "item",
  },
  {
    title: "Products",
    href: "/products",
    icon: <Boxes size={iconSize} />,
    type: "item",
  },
];
