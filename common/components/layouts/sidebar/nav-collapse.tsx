"use client";

import { MenuItemProps } from "@/common/types/menu";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMenu } from "@/common/stores/menu";

const NavCollapse = ({ menu }: { menu: MenuItemProps }) => {
  const { setIsOpen } = useMenu();
  const [expand, setExpand] = useState(false);
  const parent_ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const activeMenu = (menu: MenuItemProps): boolean => {
    if (menu.href == pathname) return true;
    if (menu.children) {
      return menu.children.some((child) => activeMenu(child));
    }
    return false;
  };
  useEffect(() => {
    if (activeMenu(menu)) {
      setExpand(true);
    }
  }, [menu, pathname]);
  const height =
    expand && parent_ref.current ? parent_ref.current.offsetHeight + 6 : 0;
  return (
    <div className="flex flex-col">
      {/* Parent Button */}
      <button
        onClick={() => setExpand(!expand)}
        className={clsx(
          "rounded-lg p-2 flex items-center justify-between text-sm font-medium cursor-pointer hover:bg-white hover:shadow-[0_4px_50px_rgba(0,0,0,0.015)] hover:text-primary duration-200 ease-in-out group",
          activeMenu(menu) || expand
            ? "bg-white shadow-[0_4px_50px_rgba(0,0,0,0.015)] text-primary"
            : "bg-background text-neutral-700"
        )}
      >
        <div className="flex items-center gap-3">
          {/* Parent Icon */}
          <div
            className={clsx(
              "p-2 rounded-full group-hover:bg-primary/10 duration-200 ease-in-out",
              activeMenu(menu) || expand
                ? "bg-primary/10"
                : "bg-white text-neutral-500"
            )}
          >
            <div
              className={clsx(
                "p-1 rounded-full group-hover:bg-primary group-hover:text-white duration-200 ease-in-out",
                activeMenu(menu) || expand
                  ? "bg-primary text-white"
                  : "bg-neutral-100"
              )}
            >
              {menu.icon}
            </div>
          </div>
          {menu.title}
        </div>
        <ChevronDown
          size={18}
          className={clsx(
            "duration-200 ease-in-out",
            expand ? "rotate-180" : ""
          )}
        />
      </button>

      {/* Child Items */}
      <div
        className={`transition-all overflow-hidden duration-500 ease-in-out w-full`}
        style={{
          height,
          opacity: expand ? 100 : 0,
        }}
      >
        <div ref={parent_ref} className="flex flex-col pl-6 relative">
          {menu?.children?.map((children, idx) => {
            const activeSubMenu = children?.href == pathname;
            return (
              <div
                key={idx}
                className="relative flex items-center text-sm group"
              >
                <Link
                  onClick={() => setIsOpen()}
                  href={children.href || "/"}
                  className={clsx(
                    "p-2 px-5 flex items-center group-hover:font-medium duration-200 ease-in-out",
                    activeSubMenu
                      ? "text-primary font-medium"
                      : "text-neutral-700"
                  )}
                >
                  <div
                    className={clsx(
                      "h-full absolute top-0 left-0 w-[0.5px] ",
                      activeSubMenu ? "bg-primary" : "bg-neutral-300"
                    )}
                  />
                  {children?.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavCollapse;
