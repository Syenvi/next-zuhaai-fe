"use client";
import { MENU_ITEMS } from "@/common/constants/menu";
import { Divider } from "antd";
import { SquareDashedKanbanIcon } from "lucide-react";
import NavCollapse from "./nav-collapse";
import NavItem from "./nav-item";
import { usePathname } from "next/navigation";
import NavDivider from "./nav-divider";
import { useMenu } from "@/common/stores/menu";
import clsx from "clsx";

const Menus = ({ mobileMenu }: { mobileMenu?: boolean }) => {
  const pathname = usePathname();
  const { isHover } = useMenu();
  return (
    <nav className="flex flex-col flex-1">
      <div
        className={clsx(
          "flex items-center text-primary font-semibold duration-300 ease-in-out justify-center",
          isHover || mobileMenu ? "gap-2" : "gap-0"
        )}
      >
        <div className="p-1 bg-primary rounded-md text-white">
          <SquareDashedKanbanIcon size={30} />
        </div>
        <div
          className={clsx(
            "duration-300 ease-in-out text-nowrap",
            isHover || mobileMenu ? "opacity-100" : "opacity-0 !w-0"
          )}
        >
          Zuhaa AI
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-2">
        {MENU_ITEMS.map((menu, idx) => {
          const activeMenu = menu.href === pathname;
          return menu?.type == "divider" ? (
            <NavDivider key={idx} />
          ) : menu?.children ? (
            <NavCollapse key={idx} menu={menu} />
          ) : (
            <NavItem
              mobileMenu={mobileMenu}
              key={idx}
              menu={menu}
              activeMenu={activeMenu}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default Menus;
