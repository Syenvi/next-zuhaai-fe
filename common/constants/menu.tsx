import {
  CheckCircle,
  ClipboardList,
  FileText,
  Home,
  UserCheck,
  Users,
} from "lucide-react";
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
    title: "Data Guru",
    icon: <UserCheck size={iconSize} />,
    type: "collapse",
    children: [
      {
        title: "Jus Testing",
        href: "/teachers",
        icon: <UserCheck size={iconSize} />,
        type: "item",
      },
      {
        title: "Jus Testing 2",
        href: "/teachers/child",
        icon: <UserCheck size={iconSize} />,
        type: "item",
      },
    ],
  },
  {
    title: "Data Peserta",
    href: "/participants",
    icon: <Users size={iconSize} />,
    type: "item",
  },
  {
    title: "Soal Ujian",
    href: "/exam-questions",
    icon: <FileText size={iconSize} />,
    type: "item",
  },
  {
    title: "Peserta Ujian",
    href: "/exam-participants",
    icon: <ClipboardList size={iconSize} />,
    type: "item",
  },
  {
    title: "Hasil Ujian",
    href: "/exam-results",
    icon: <CheckCircle size={iconSize} />,
    type: "item",
  },
];
