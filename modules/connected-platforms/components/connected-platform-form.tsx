import { Button, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { Contact, Network, Save } from "lucide-react";
import React, { useEffect } from "react";
import {
  useCreateConnectedPlatform,
  useGetPlatforms,
  useUpdateConnectedPlatform,
} from "../services";
import { ConnectedPlatformType } from "../types";
import toast from "react-hot-toast";

const ConnecttedPlatformForm = ({
  editMode,
  data,
  refetch,
  setDialogs,
}: {
  editMode?: boolean;
  data?: ConnectedPlatformType | null;
  refetch?: () => void;
  setDialogs: () => void;
}) => {
  const [form] = useForm();

  const {
    mutate: updateConnectedPlatform,
    isPending: loadingUpdateConenctedPlatform,
  } = useUpdateConnectedPlatform({
    onSuccess: () => {
      toast.success("Platform updated successfully");
      refetch?.();
      setDialogs();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Terjadi kesalahan");
    },
  });

  const {
    mutate: createConnectedPlatform,
    isPending: loadingCreateConenctedPlatform,
  } = useCreateConnectedPlatform({
    onSuccess: () => {
      toast.success("Platform created successfully");
      refetch?.();
      setDialogs();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Terjadi kesalahan");
    },
  });

  const { data: platformDatas, isFetching: loadingPlatforms } =
    useGetPlatforms();

  useEffect(() => {
    if (editMode) {
      form.setFieldsValue({
        platform_id: data?.platform_id,
        platform_identifier: data?.platform_identifier,
      });
    }
  }, [editMode, data, form]);

  const onFinish = (values: ConnectedPlatformType) => {
    if (editMode) {
      if (!data?.id) return;
      updateConnectedPlatform({
        body: values,
        connected_platform_id: data?.id,
      });
    } else {
      createConnectedPlatform(values);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name={"platform_id"} label="Select Platform">
        <Select
          popupMatchSelectWidth={false}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          prefix={<Network size={20} className={"mr-1"} />}
          className="flex-1 "
          showSearch
          loading={loadingPlatforms}
          placeholder="Select platform...."
          optionFilterProp="label"
          options={[
            ...(platformDatas?.map((branch: { id: string; name: string }) => ({
              value: branch?.id,
              label: branch?.name,
            })) || []),
          ]}
        />
      </Form.Item>
      <Form.Item
        name={"platform_identifier"}
        label="Platform Identifier ( start with 62 )"
      >
        <Input
          placeholder="62XXXXXXXXX"
          addonBefore={
            <div className="flex items-center gap-1">
              <Contact size={20} className={"mr-1"} />
            </div>
          }
        />
      </Form.Item>
      <div className="flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          loading={
            loadingCreateConenctedPlatform || loadingUpdateConenctedPlatform
          }
        >
          <Save size={20} />
          Simpan
        </Button>
      </div>
    </Form>
  );
};

export default ConnecttedPlatformForm;
