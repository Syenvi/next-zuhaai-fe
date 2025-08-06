import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Banknote,
  Box,
  Calendar,
  ClipboardList,
  Edit,
  MoreHorizontal,
  Text,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import ConfirmDelete from "@/common/components/elements/confirm-delete";
import { Button } from "antd";
import Image from "next/image";
import ProductForm from "../components/product-form";
import { ProductPayloadType } from "../types";
import { useDeleteProduct } from "../services";
import toast from "react-hot-toast";

export const ProductsCollumns = (
  refetch: () => void
): ColumnDef<ProductPayloadType, unknown>[] => [
  {
    id: "no",
    accessorKey: "no",
    header: "No",
    cell: ({ row, table }) => {
      const pageSize = table.getState().pagination.pageSize;
      const pageIndex = table.getState().pagination.pageIndex;
      return <div>{pageIndex * pageSize + row.index + 1}.</div>;
    },

    enableSorting: false,
  },
  {
    id: "img",
    cell: ({ row }) => {
      const product = row.original;
      return product?.images?.length > 0 ? (
        <div className="flex items-center">
          <div className="w-[150px] h-[150px] rounded-md overflow-hidden relative">
            <Image
              className="object-cover"
              alt={`${product.name}-image`}
              fill
              src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/product-images/${product?.images?.[0]?.url}`}
            />
          </div>
        </div>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-2">
        <Box size={16} />
        <span>Produk</span>
      </div>
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-2 min-w-max">{product.name}</div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => (
      <div className="flex items-center gap-2">
        <Banknote size={16} />
        <span>Price</span>
      </div>
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-2 min-w-max">
          IDR {product.price?.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: () => (
      <div className="flex items-center gap-2">
        <ClipboardList size={16} />
        <span>Stock</span>
      </div>
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-2 min-w-max">{product.stock}</div>
      );
    },
  },
  {
    accessorKey: "desc",
    header: () => (
      <div className="flex items-center gap-2">
        <Text size={16} />
        <span>Description</span>
      </div>
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-2 min-w-max">
          {product.description || "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => (
      <div className="flex items-center gap-2">
        <Calendar size={16} />
        <span>Created</span>
      </div>
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-2 min-w-max">
          {product.created_at}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [dialog, setDialog] = useState<{
        type: string;
        data: ProductPayloadType | null;
      }>({
        type: "",
        data: null,
      });

      const { mutate: deleteProduct, isPending: loadingDelete } =
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useDeleteProduct({
          onSuccess: () => {
            toast.success("Successfully delete product");
            refetch();
            setDialog((prev) => ({ ...prev, type: "", data: null }));
          },
          onError: (err) => {
            toast.error(err.message);
          },
        });

      return (
        <div className="flex justify-center ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="!h-8 !w-8 !p-0 !cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white flex flex-col gap-1"
            >
              <DropdownMenuLabel className="text-text_primary ">
                Aksi
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="!bg-text_third" />
              <DropdownMenuItem
                onClick={() =>
                  setDialog((prev) => ({
                    ...prev,
                    type: "edit",
                  }))
                }
                className="flex items-center gap-2 font-medium  !text-blue-500 cursor-pointer rounded-md"
              >
                <Edit className="text-blue-500" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setDialog((prev) => ({
                    ...prev,
                    type: "delete",
                  }))
                }
                className="flex items-center gap-2 font-medium hover:bg-red-500/10 duration-200 ease-in-out cursor-pointer !text-red-500 rounded-md"
              >
                <Trash2 className="text-red-500 " /> Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dialog Confirm Hapus */}
          <Dialog
            open={dialog.type != ""}
            onOpenChange={() =>
              setDialog((prev) => ({
                ...prev,
                type: "",
              }))
            }
          >
            <DialogContent>
              {dialog.type == "delete" ? (
                <ConfirmDelete
                  onLoading={loadingDelete}
                  onCancel={() => setDialog((prev) => ({ ...prev, type: "" }))}
                  onConfirm={() => deleteProduct(product.id)}
                  title={`"${product?.name}"`}
                />
              ) : dialog.type == "edit" ? (
                <>
                  <DialogTitle>Edit Product</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to add a new product. Click save
                    when you&apos;re done.
                  </DialogDescription>
                  <ProductForm
                    refetch={refetch}
                    setDialog={() =>
                      setDialog((prev) => ({ ...prev, type: "", data: null }))
                    }
                    data={product}
                    editMode
                  />
                </>
              ) : null}
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
