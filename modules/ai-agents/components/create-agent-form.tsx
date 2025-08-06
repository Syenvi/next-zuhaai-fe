import React from "react";
import { Button, Form, Input, Select } from "antd";
import { Bot } from "lucide-react";
import { useForm } from "antd/es/form/Form";
import { AgentPayloadType } from "../types";
import { useCreateAgent } from "../services";
import toast from "react-hot-toast";

const CreateAgentForm = ({
  refetch,
  setDialog,
}: {
  refetch: () => void;
  setDialog: () => void;
}) => {
  const [form] = useForm();
  const { mutate: createAgent, isPending: loadingCreateAgent } = useCreateAgent(
    {
      onSuccess: () => {
        toast.success("Agent successfully created");
        refetch();
        setDialog();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );
  const onFinish = (values: AgentPayloadType) => {
    createAgent(values);
  };
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Nama AI Agent harus diisi !" }]}
      >
        <Input type="text" placeholder="Enter AI name ..." />
      </Form.Item>
      <Form.Item
        label="Template"
        name="type"
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
        loading={loadingCreateAgent}
      >
        <Bot size={20} />
        Create AI Agent
      </Button>
    </Form>
  );
};

export default CreateAgentForm;
