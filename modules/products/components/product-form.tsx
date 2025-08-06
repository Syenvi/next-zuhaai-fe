import { Button, Form, Input, InputNumber } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { Box, Camera, ClipboardList, Package } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProductPayloadType } from "../types";
import { useCreateProduct, useUpdateProduct } from "../services";
import toast from "react-hot-toast";

const ProductForm = ({
  editMode,
  setDialog,
  refetch,
  data,
}: {
  data?: ProductPayloadType;
  editMode?: boolean;
  setDialog: () => void;
  refetch: () => void;
}) => {
  const [form] = useForm();
  const [photoFile, setPhotoFile] = useState<{
    file: File | null;
    url: string;
  }>({
    url: "",
    file: null,
  });

  const { mutate: createProduct, isPending: loadingCreateProduct } =
    useCreateProduct({
      onSuccess: () => {
        toast.success("Product created successfully");
        refetch();
        setDialog();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const { mutate: updateProduct, isPending: loadingUpdateProduct } =
    useUpdateProduct({
      onSuccess: () => {
        toast.success("Product updated successfully");
        refetch();
        setDialog();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const onFinish = (values: ProductPayloadType) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("stock", values.stock);
    if (values.description) {
      formData.append("description", values.description);
    }
    if (photoFile.file) {
      formData.append("image", photoFile.file);
    }
    if (editMode && data?.id) {
      updateProduct({ body: formData, product_id: data.id });
    } else {
      createProduct(formData);
    }
  };

  const iconSize = 20;
  const iconPrefixClassname = "text-neutral-500 mr-1";

  useEffect(() => {
    if (editMode && data) {
      form.setFieldsValue({
        name: data.name,
        price: data.price,
        stock: data.stock,
        image: data.images?.[0].url,
        description: data.description,
      });
      if (data.images?.[0]?.url) {
        setPhotoFile((prev) => ({
          ...prev,
          url: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/product-images/${data.images?.[0]?.url}`,
        }));
      }
    }
  }, [data, editMode]);

  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Form.Item
        label="Product Image"
        name="image"
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
                className={`border p-2 rounded absolute w-full h-full opacity-0 !cursor-pointer
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
                className={`border p-2 rounded absolute w-full h-full opacity-0 cursor-pointer right-0 top-0`}
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
        <Input
          prefix={<Package size={iconSize} className={iconPrefixClassname} />}
          placeholder="Input product name ..."
        />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Product price is required !" }]}
      >
        <InputNumber
          className="!w-full"
          addonBefore="IDR"
          placeholder="10,000"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, "") as unknown as number
          }
        />
      </Form.Item>
      <Form.Item
        label="Stock"
        name="stock"
        rules={[{ required: true, message: "Product stock is required !" }]}
      >
        <Input
          prefix={
            <ClipboardList size={iconSize} className={iconPrefixClassname} />
          }
          placeholder="Input product stock..."
        />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea className="!min-h-[100px]" />
      </Form.Item>
      <Button
        htmlType="submit"
        className="!font-medium !w-full !p-5"
        type="primary"
        loading={loadingCreateProduct || loadingUpdateProduct}
      >
        <Box size={20} /> Create Product
      </Button>
    </Form>
  );
};

export default ProductForm;
