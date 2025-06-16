"use client";
import { Button, Divider } from "antd";
import Search from "antd/es/input/Search";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import EmptyProductSection from "./empty-products-section";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateProductForm from "./create-product-form";
import { DataTable } from "@/common/components/elements/data-table";
import { ProductsCollumns } from "../table-columns";
import { useSearchParams } from "next/navigation";

const ProductsView = () => {
  const [dialog, setDialog] = useState({
    product: { status: false },
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const searchParams = useSearchParams();
  useEffect(() => {
    const paramPage = Number(searchParams.get("page")) || 1;
    setPage(paramPage);
  }, [searchParams]);

  const dummyProduct = {
    prev_page_url: "1",
    next_page_url: "3",
    last_page: 10,
    data: [
      {
        id: "1",
        name: "Zuhaa",
        detail: "detail",
        created_at: "11 Juni 2025",
      },
    ],
  };
  return (
    <div className="flex flex-col gap-3 lg:gap-5 flex-1">
      <h3 className="text-neutral-700 lg:text-xl font-medium">Products</h3>
      <section className="flex items-center justify-between">
        <Search
          placeholder="Search products..."
          allowClear
          onSearch={() => {}}
          className="max-w-[300px]"
        />
        <Button
          onClick={() => {
            setDialog((prev) => ({ ...prev, product: { status: true } }));
          }}
          type="primary"
          className="!rounded-full !font-semibold"
        >
          <Plus size={20} /> Create Product{" "}
        </Button>
      </section>
      <Divider className="!my-0 !max-w-max" />
      <EmptyProductSection />
      <DataTable
        columns={ProductsCollumns}
        data={dummyProduct}
        page={page}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
      <Dialog
        open={dialog.product.status}
        onOpenChange={() =>
          setDialog((prev) => ({ ...prev, product: { status: false } }))
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new product. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <CreateProductForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsView;
