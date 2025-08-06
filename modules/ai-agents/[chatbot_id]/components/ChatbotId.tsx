"use client";
import { Button, Tabs, TabsProps } from "antd";
import { ArrowLeft, BookOpenText, Settings2 } from "lucide-react";
import React from "react";
import GeneralView from "./general";
import KnowledgeView from "./knowledge";
import { useParams, useRouter } from "next/navigation";
import { useGetAgent } from "../services";
import Loader from "@/common/components/elements/loader";

const ChatbotIdView = () => {
  const router = useRouter();
  const { chatbot_id } = useParams<{ chatbot_id: string }>();
  const {
    data: agentData,
    isFetching: loadingAgent,
    refetch,
  } = useGetAgent(chatbot_id);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span className="flex items-center gap-2 px-5">
          <Settings2 size={18} />
          General
        </span>
      ),
      children: <GeneralView data={agentData} refetch={refetch} />,
    },
    {
      key: "2",
      label: (
        <span className="flex items-center gap-2 px-5">
          <BookOpenText size={18} />
          Knowledge
        </span>
      ),
      children: <KnowledgeView data={agentData} refetch={refetch} />,
    },
  ];

  return loadingAgent ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-5 relative">
      <Button
        onClick={() => router.back()}
        className="!absolute !top-0 !left-0 !bg-neutral-100 !border-none"
      >
        <ArrowLeft size={18} />
        Back
      </Button>
      <h3 className="text-center text-neutral-700 lg:text-lg font-bold">
        {agentData?.name}
      </h3>
      <Tabs defaultActiveKey="1" items={items} centered />
    </div>
  );
};

export default ChatbotIdView;
