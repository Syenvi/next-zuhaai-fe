"use client";
import React from "react";
import ChatbotCard from "./chatbot-card";
import { Bot, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";

type CreateAiAgentPayload = {
  name: string;
  template: "customer_service" | "sales";
};

const AiAgentsView = () => {
  const [form] = useForm();
  const onFinish = (values: CreateAiAgentPayload) => {
    console.log(values);
  };
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
        {[1, 2, 3].map((_, idx) => {
          return <ChatbotCard key={idx} />;
        })}

        <Dialog>
          <DialogTrigger asChild>
            <div className="border rounded-xl bg-gradient-to-br from-primary to-indigo-300 cursor-pointer text-white p-5 shadow-[0_4px_50px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-3 font-semibold">
              <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center">
                <Plus size={20} />
              </div>
              Create New
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New AI Agent</DialogTitle>
              <DialogDescription>
                This AI agent is designed to help you with customer support and
                sales inquiries for your business.{" "}
              </DialogDescription>
            </DialogHeader>
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Nama AI Agent harus diisi !" },
                ]}
              >
                <Input type="text" placeholder="Enter AI name ..." />
              </Form.Item>
              <Form.Item
                label="Template"
                name="template"
                rules={[
                  {
                    required: true,
                    message: "Template harus dipilih !",
                  },
                ]}
              >
                <Select
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  showSearch
                  placeholder="Select a template"
                  optionFilterProp="label"
                  options={[
                    {
                      value: "customer_service",
                      label: "Customer Service AI",
                    },
                    {
                      value: "sales",
                      label: "Sales AI",
                    },
                  ]}
                />
              </Form.Item>

              <Button
                htmlType="submit"
                type="primary"
                className="!font-medium !w-full"
              >
                <Bot size={20} />
                Create AI Agent
              </Button>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AiAgentsView;
