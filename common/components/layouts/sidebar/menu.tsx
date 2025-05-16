"use client";
import { MENU_ITEMS } from "@/common/constants/menu";
import { Divider } from "antd";
import { SquareDashedKanbanIcon } from "lucide-react";
import NavCollapse from "./nav-collapse";
import NavItem from "./nav-item";
import { usePathname } from "next/navigation";

const Menus = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col flex-1">
      <div className="flex items-center gap-2 text-primary font-semibold">
        <div className="p-1 bg-primary rounded-md text-white">
          <SquareDashedKanbanIcon size={30} />
        </div>
        Ujian Online
      </div>
      <Divider />
      <div className="flex flex-col gap-2">
        {MENU_ITEMS.map((menu, idx) => {
          const activeMenu = menu.href === pathname;
          return menu?.children ? (
            <NavCollapse key={idx} menu={menu} />
          ) : (
            <NavItem key={idx} menu={menu} activeMenu={activeMenu} />
          );
        })}
      </div>
    </nav>
  );
};

export default Menus;
