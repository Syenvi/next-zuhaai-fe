"use client";
import { MENU_ITEMS } from "@/common/constants/menu";
import { useMenu } from "@/common/stores/menu";
import { MenuItemProps } from "@/common/types/menu";
import { Avatar, Breadcrumb, Dropdown, MenuProps, Space, Tag } from "antd";
import { BadgeDollarSign, Home, LogOut, Menu, Star } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Fungsi untuk mencari menu berdasarkan path
const findMenuByPath = (
  path: string,
  menus: MenuItemProps[]
): MenuItemProps | null => {
  for (const menu of menus) {
    if (menu.href === path) return menu;
    if (menu.children) {
      const found = findMenuByPath(path, menu.children);
      if (found) return found;
    }
  }
  return null;
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  // Bangun breadcrumbs
  const breadcrumbs = parts
    .map((_, index) => {
      const path = "/" + parts.slice(0, index + 1).join("/");
      const menu = findMenuByPath(path, MENU_ITEMS);
      return menu ? { title: menu.title, href: menu.href } : null;
    })
    .filter(Boolean);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Space className="flex items-center !gap-1">
          <Avatar
            alt="avatar"
            size="large"
            icon={
              <Image
                alt="avatar"
                src={
                  "https://i.pinimg.com/736x/ae/b0/f4/aeb0f43ef8e52aa57521161ff845da66.jpg"
                }
                fill
              />
            }
          />{" "}
          <div>
            <p className="font-semibold">Syahdin Raditya</p>
            <p className="text-neutral-500">Developer</p>
          </div>
        </Space>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-2">
          <Space className="!gap-1 text-neutral-700">
            <Star size={18} />
            Upgrade Plan
          </Space>
          <Tag color="orange">Soon</Tag>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <Space className="!gap-1 text-neutral-700">
          <BadgeDollarSign size={18} />
          Credit: 0
        </Space>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: (
        <Space className="!text-red-500 !gap-1">
          <LogOut size={18} />
          Logout
        </Space>
      ),
    },
  ];

  const { setIsOpen } = useMenu();

  return (
    <header className="sticky top-0 flex items-center justify-between p-3 lg:p-5 border-b border-neutral-200 bg-white z-10">
      <Menu
        className="lg:hidden cursor-pointer p-1 active:scale-95 bg-primary/20 hover:bg-primary/30 duration-200 ease-in-out rounded-lg"
        onClick={setIsOpen}
        size={30}
      />
      <Breadcrumb
        className="hidden lg:flex"
        items={[
          {
            title: <Home size={20} />,
            href: "/",
          },
          ...breadcrumbs.map((breadcrumb) => ({
            title: breadcrumb?.title,
            href: breadcrumb?.href,
          })),
        ]}
      />
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Space className="flex items-center cursor-pointer !gap-1 text-sm">
          <Avatar
            alt="avatar"
            size="large"
            icon={
              <Image
                alt="avatar"
                src={
                  "https://i.pinimg.com/736x/ae/b0/f4/aeb0f43ef8e52aa57521161ff845da66.jpg"
                }
                fill
              />
            }
          />{" "}
          <div>
            <p className="font-semibold">Syahdin Raditya</p>
            <p className="text-neutral-500">Developer</p>
          </div>
        </Space>
      </Dropdown>
    </header>
  );
};

export default Breadcrumbs;
