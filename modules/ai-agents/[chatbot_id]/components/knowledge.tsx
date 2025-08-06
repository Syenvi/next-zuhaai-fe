import { Button, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { Bot } from "lucide-react";
import React, { useEffect } from "react";
import { AgentPayloadType } from "../../types";
import { useUpdateAgent } from "../services";
import toast from "react-hot-toast";

const KnowledgeView = ({
  data,
  refetch,
}: {
  data: AgentPayloadType;
  refetch: () => void;
}) => {
  const [form] = useForm();

  const { mutate: updateAgent, isPending: loadingUpdate } = useUpdateAgent({
    onSuccess: () => {
      toast.success("Agent successfully updated !");
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onFinish = (values: AgentPayloadType) => {
    updateAgent({ body: values, agent_id: data.id });
  };
  const knowledge = Form.useWatch("knowledge", form);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        knowledge: data.knowledge,
      });
    }
  }, [data]);

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
        loading={loadingUpdate}
      >
        <Bot size={20} /> Save AI Settings
      </Button>
    </Form>
  );
};

export default KnowledgeView;
