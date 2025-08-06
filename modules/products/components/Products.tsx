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
import { DataTable } from "@/common/components/elements/data-table";
import { ProductsCollumns } from "../table-columns";
import { useSearchParams } from "next/navigation";
import { useGetProducts } from "../services";
import { useDebounce } from "use-debounce";
import Loader from "@/common/components/elements/loader";
import ProductForm from "./product-form";

const ProductsView = () => {
  const [dialog, setDialog] = useState({
    product: { status: false },
  });
  const [filter, setFilter] = useState({
    s_name: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const searchParams = useSearchParams();
  const [debounceName] = useDebounce(filter.s_name, 500);

  useEffect(() => {
    const paramPage = Number(searchParams.get("page")) || 1;
    setPage(paramPage);
  }, [searchParams]);

  const {
    data: productDatas,
    isFetching: loadingProducts,
    refetch,
  } = useGetProducts(page, pageSize, debounceName);

  return (
    <div className="flex flex-col gap-3 lg:gap-5 flex-1">
      <h3 className="text-neutral-700 lg:text-xl font-medium">Products</h3>
      <section className="flex items-center justify-between">
        <Search
          placeholder="Search products..."
          allowClear
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, s_name: e.target.value }))
          }
          onSearch={(val: string) => {
            setFilter((prev) => ({ ...prev, s_name: val }));
          }}
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

      {loadingProducts ? (
        <Loader />
      ) : productDatas?.data?.length > 0 ? (
        <DataTable
          columns={ProductsCollumns(refetch)}
          data={productDatas}
          page={page}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      ) : (
        <EmptyProductSection />
      )}
      <Dialog
        open={dialog.product.status}
        onOpenChange={() =>
          setDialog((prev) => ({ ...prev, product: { status: false } }))
        }
      >
        <DialogContent className="max-h-[80dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new product. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            refetch={refetch}
            setDialog={() =>
              setDialog((prev) => ({ ...prev, product: { status: false } }))
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsView;
