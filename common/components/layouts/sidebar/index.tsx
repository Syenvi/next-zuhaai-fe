"use client";
import { useMenu } from "@/common/stores/menu";
import { useShallow } from "zustand/shallow";
import React from "react";
import clsx from "clsx";
import Menus from "./menu";

const DesktopMenu = () => {
  const { setIsHover, isHover } = useMenu();
  return (
    <div
      className={clsx(
        "hidden lg:flex h-dvh sticky top-0 p-5 duration-300 ease-in-out overflow-y-auto",
        isHover ? "w-[18em]" : "w-[97px]"
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Menus />
    </div>
  );
};

const MobileMenu = () => {
  const { isOpen, setIsOpen } = useMenu(
    useShallow((state) => ({
      isOpen: state.isOpen,
      setIsOpen: state.setIsOpen,
    }))
  );
  return (
    <>
      <div
        className={clsx(
          "lg:hidden duration-300 ease-in-out fixed top-0 left-0 bg-background h-dvh z-30 p-3 w-[18em] overflow-y-auto",
          isOpen ? "" : "-translate-x-full"
        )}
      >
        <Menus mobileMenu />
      </div>
      <div
        onClick={() => setIsOpen()}
        className={clsx(
          "fixed bg-black/60 w-full h-dvh z-20 duration-300 ease-in-out lg:hidden cursor-pointer",
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
      />
    </>
  );
};

const Sidebar = () => {
  return (
    <>
      <DesktopMenu />
      <MobileMenu />
    </>
  );
};

export default Sidebar;
