import { Button, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { Bot } from "lucide-react";
import React from "react";

const KnowledgeView = () => {
  const [form] = useForm();
  const onFinish = () => {
    console.log("submit");
  };
  const knowledge = Form.useWatch("knowledge", form);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      className="!w-full lg:!max-w-4xl !py-10 !gap-0 !mx-auto !flex !flex-col !items-center"
    >
      <div className="w-full mb-10">
        <p className="font-medium text-primary text-center text-lg">
          Knowledge Course
        </p>
        <p className="text-neutral-500 text-center">
          Explain what your business does and which industry it&apos;s in, so
          the AI can better assist you.
        </p>
        <Form.Item name={"knowledge"} className="!mb-0 w-full">
          <TextArea className="w-full !min-h-[250px]" />
        </Form.Item>
        <p className="text-end text-neutral-700">
          {knowledge?.length || 0}/500
        </p>
      </div>
      <Button
        htmlType="submit"
        type="primary"
        className="!font-semibold !w-full !p-5"
      >
        <Bot size={20} /> Save AI Settings
      </Button>
    </Form>
  );
};

export default KnowledgeView;
