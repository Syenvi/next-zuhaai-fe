import { Button, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import { Building2, Save } from "lucide-react";
import React from "react";
import { createBusinessPayload } from "../types";
import { useCreateBusiness } from "../services";
import toast from "react-hot-toast";

const CreateBusinessForm = ({ setDialogs }: { setDialogs: () => void }) => {
  const [form] = useForm();

  const { mutate: createBusiness, isPending: loadingCreateBusiness } =
    useCreateBusiness({
      onSuccess: () => {
        setDialogs();
        toast.success("Business created successfully");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  const onFinish = (values: createBusinessPayload) => {
    createBusiness(values);
  };

  const iconSize = 18;
  const iconPrefixClassname = "text-neutral-500 mr-1";

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        rules={[
          {
            message: "Business name required",
            required: true,
          },
        ]}
        name={"name"}
        label="Business Name"
      >
        <Input
          placeholder="Input business name..."
          prefix={<Building2 className={iconPrefixClassname} size={iconSize} />}
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            message: "Phone number required",
            required: true,
          },
        ]}
        name={"phone"}
        label="Phone"
      >
        <Input placeholder="Input phone number..." addonBefore={"+62"} />
      </Form.Item>
      <Button
        type="primary"
        className="w-full"
        htmlType="submit"
        loading={loadingCreateBusiness}
      >
        <Save size={iconSize} />
        Save
      </Button>
    </Form>
  );
};

export default CreateBusinessForm;
