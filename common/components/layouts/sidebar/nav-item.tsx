import { useMenu } from "@/common/stores/menu";
import { MenuItemProps } from "@/common/types/menu";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

const NavItem = ({
  activeMenu,
  menu,
}: {
  activeMenu: boolean;
  menu: MenuItemProps;
}) => {
  const { setIsOpen } = useMenu();
  return (
    <Link
      onClick={() => setIsOpen()}
      href={menu.href || "/"}
      className={clsx(
        "rounded-lg p-2 flex items-center gap-3 text-sm font-medium hover:bg-white hover:shadow-[0_4px_50px_rgba(0,0,0,0.015)] hover:text-primary duration-200 ease-in-out group",
        activeMenu
          ? "bg-white shadow-[0_4px_50px_rgba(0,0,0,0.015)] text-primary"
          : "bg-background text-neutral-700"
      )}
    >
      <div
        className={clsx(
          "p-2 rounded-full group-hover:bg-primary/10 duration-200 ease-in-out",
          activeMenu ? "bg-primary/10" : "bg-white text-neutral-500"
        )}
      >
        <div
          className={clsx(
            "p-1 rounded-full group-hover:bg-primary group-hover:text-white duration-200 ease-in-out",
            activeMenu ? "bg-primary text-white" : "bg-neutral-100"
          )}
        >
          {menu.icon}
        </div>
      </div>
      {menu.title}
    </Link>
  );
};

export default NavItem;
