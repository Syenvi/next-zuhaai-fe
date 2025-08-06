"use client";
import React, { useState } from "react";
import ChatbotCard from "./chatbot-card";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateAgentForm from "./create-agent-form";
import { useGetAgents } from "../services";
import Loader from "@/common/components/elements/loader";
import { AgentPayloadType } from "../types";

const AiAgentsView = () => {
  const [dialogs, setDialogs] = useState({
    create: {
      status: false,
    },
  });

  const {
    data: agentDatas,
    isFetching: loadingAgents,
    refetch,
  } = useGetAgents();

  return (
    <section className="py-20 flex flex-col gap-5 items-center justify-center ">
      <h3 className="text-neutral-700 lg:text-3xl font-semibold text-center">
        AI Agents
      </h3>
      <p className="text-neutral-500 text-center max-w-[720px]">
        This is the page where you can visit the AI&apos;s you have created
        previously. Feel free to make changes and create as many chatbots as you
        want at any time!
      </p>
      <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
        {loadingAgents ? (
          <Loader />
        ) : (
          <>
            {agentDatas?.length > 0 ? (
              agentDatas.map((agent: AgentPayloadType, idx: number) => {
                return <ChatbotCard refetch={refetch} data={agent} key={idx} />;
              })
            ) : (
              <div
                onClick={() =>
                  setDialogs((prev) => ({ ...prev, create: { status: true } }))
                }
                className="border rounded-xl bg-gradient-to-br from-primary to-indigo-300 cursor-pointer text-white p-5 shadow-[0_4px_50px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-3 font-semibold"
              >
                <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center">
                  <Plus size={20} />
                </div>
                Create New
              </div>
            )}
          </>
        )}

        <Dialog
          open={dialogs.create.status}
          onOpenChange={() =>
            setDialogs((prev) => ({ ...prev, create: { status: false } }))
          }
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New AI Agent</DialogTitle>
              <DialogDescription>
                This AI agent is designed to help you with customer support and
                sales inquiries for your business.{" "}
              </DialogDescription>
            </DialogHeader>
            <CreateAgentForm
              refetch={refetch}
              setDialog={() =>
                setDialogs((prev) => ({ ...prev, create: { status: false } }))
              }
            />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AiAgentsView;
