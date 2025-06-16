import { useMenu } from "@/common/stores/menu";
import { MenuItemProps } from "@/common/types/menu";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { useShallow } from "zustand/shallow";

const NavItem = ({
  activeMenu,
  menu,
  mobileMenu,
}: {
  activeMenu: boolean;
  menu: MenuItemProps;
  mobileMenu?: boolean;
}) => {
  const { setIsOpen, isHover } = useMenu(
    useShallow((state) => ({
      setIsOpen: state.setIsOpen,
      isHover: state.isHover,
    }))
  );
  return (
    <Link
      onClick={() => setIsOpen()}
      href={menu.href || "/"}
      className={clsx(
        "rounded-lg p-2 flex items-center gap-3 text-sm font-medium hover:bg-white hover:shadow-[0_4px_50px_rgba(0,0,0,0.015)] hover:text-primary duration-300 ease-in-out group overflow-hidden text-nowrap",
        activeMenu
          ? "bg-white shadow-[0_4px_50px_rgba(0,0,0,0.015)] text-primary"
          : "bg-background text-neutral-700",
        isHover || mobileMenu ? "gap-3" : "!gap-0"
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
      <div
        className={clsx(
          "duration-300 ease-in-out",
          isHover || mobileMenu ? "opacity-100" : "opacity-0 !w-0"
        )}
      >
        {menu.title}
      </div>
    </Link>
  );
};

export default NavItem;
