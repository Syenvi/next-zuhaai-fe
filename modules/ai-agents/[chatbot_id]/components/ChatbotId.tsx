"use client";
import { Button, Tabs, TabsProps } from "antd";
import { ArrowLeft, BookOpenText, Settings2 } from "lucide-react";
import React from "react";
import GeneralView from "./general";
import KnowledgeView from "./knowledge";

const ChatbotIdView = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span className="flex items-center gap-2 px-5">
          <Settings2 size={18} />
          General
        </span>
      ),
      children: <GeneralView />,
    },
    {
      key: "2",
      label: (
        <span className="flex items-center gap-2 px-5">
          <BookOpenText size={18} />
          Knowledge
        </span>
      ),
      children: <KnowledgeView />,
    },
  ];

  return (
    <div className="flex flex-col gap-5 relative">
      <Button className="!absolute !top-0 !left-0 !bg-neutral-100 !border-none">
        <ArrowLeft size={18} />
        Back
      </Button>
      <h3 className="text-center text-neutral-700 lg:text-lg font-bold">
        Zuhaa AI
      </h3>
      <Tabs defaultActiveKey="1" items={items} centered />
    </div>
  );
};

export default ChatbotIdView;
