import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { Box, Camera } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const CreateProductForm = () => {
  const [form] = useForm();
  const onFinish = () => {
    console.log("submited");
  };
  const [photoFile, setPhotoFile] = useState<{
    file: File | null;
    url: string;
  }>({
    url: "",
    file: null,
  });

  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Form.Item
        label="Product Image"
        name="photo"
        rules={[{ required: true, message: "Product image is required !" }]}
      >
        <div className="w-full">
          {!photoFile.url ? (
            <div className="w-[200px] text-xs text-blue-500 border-blue-500 h-[200px] border p-3 border-dashed rounded-md relative flex flex-col gap-1 bg-neutral-100 items-center justify-center">
              <Camera size={20} />
              <p>Upload Foto</p>

              <input
                type="file"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPhotoFile({
                      file,
                      url: URL.createObjectURL(file),
                    });
                    form.setFieldValue("photo", file);
                  }
                }}
                className={`border p-2 rounded absolute w-full h-full opacity-0
                      }`}
              />
            </div>
          ) : (
            <div className="w-[200px] h-[200px] relative rounded-md overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src={photoFile.url}
                fill
                alt="photo-image"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPhotoFile({
                      file,
                      url: URL.createObjectURL(file),
                    });
                    form.setFieldValue("photo", file);
                  }
                }}
                className={`border p-2 rounded absolute w-full h-full opacity-0 right-0 top-0`}
              />
            </div>
          )}
        </div>
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Product name is required !" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea className="!min-h-[100px]" />
      </Form.Item>
      <Button className="!font-medium !w-full !p-5" type="primary">
        <Box size={20} /> Create Product
      </Button>
    </Form>
  );
};

export default CreateProductForm;
