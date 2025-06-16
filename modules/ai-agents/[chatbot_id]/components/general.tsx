import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { Bot } from "lucide-react";
import React from "react";

const GeneralView = () => {
  const [form] = useForm();
  const onFinish = () => {
    console.log("submit");
  };
  const prompt = Form.useWatch("prompt", form);
  const welcome_msg = Form.useWatch("welcome_msg", form);
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      className="!w-full lg:!max-w-4xl !py-10 !gap-0 !mx-auto !flex !flex-col !items-center"
    >
      <Form.Item
        name={"name"}
        rules={[
          {
            required: true,
            message: "Nama Ai Agent tidak boleh kosong !",
          },
        ]}
        className="!mb-0"
      >
        <Input
          className="!border-none !max-w-max !text-neutal-700 !text-center !ring-0 !text-lg !font-bold"
          placeholder="Ai Agent Name"
        />
      </Form.Item>
      <Form.Item name={"description"}>
        <Input
          className="!border-none !max-w-max !text-center !ring-0 !text-sm !text-neutral-500 !font-medium"
          placeholder="Description"
        />
      </Form.Item>
      <div className="w-full">
        <p className="font-medium text-primary text-center text-lg">
          AI Agent behavior
        </p>
        <p className="text-neutral-500 text-center">
          This is an AI Prompt that will set its AI speech style and identity.
        </p>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Prompt AI tidak boleh kosong !",
            },
          ]}
          name={"prompt"}
          className="!mb-0 w-full"
        >
          <TextArea className="w-full !min-h-[300px]" />
        </Form.Item>
        <p className="text-end text-neutral-700">{prompt?.length || 0}/1000</p>
      </div>
      <div className="w-full mb-10">
        <p className="font-medium text-primary text-center text-lg">
          Welcome Message
        </p>
        <p className="text-neutral-500 text-center">
          The first message that AI will send to the user.
        </p>
        <Form.Item name={"welcome_msg"} className="!mb-0 w-full">
          <TextArea className="w-full !min-h-[150px]" />
        </Form.Item>
        <p className="text-end text-neutral-700">
          {welcome_msg?.length || 0}/200
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

export default GeneralView;
