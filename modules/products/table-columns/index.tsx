import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Box,
  Calendar,
  Edit,
  MoreHorizontal,
  Text,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ConfirmDelete from "@/common/components/elements/confirm-delete";
import { Button } from "antd";

type ProductsType = {
  id: string;
  name: string;
  detail: string;
  created_at: string;
};

// nama, aksi

export const ProductsCollumns: ColumnDef<ProductsType, unknown>[] = [
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
    accessorKey: "detail",
    header: () => (
      <div className="flex items-center gap-2">
        <Text size={16} />
        <span>Detail</span>
      </div>
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-2 min-w-max">
          {product.detail}
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
        data: ProductsType | null;
      }>({
        type: "",
        data: null,
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
              <DropdownMenuItem className="flex items-center gap-2 font-medium  !text-blue-500 cursor-pointer rounded-md">
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
              <ConfirmDelete
                onCancel={() => setDialog((prev) => ({ ...prev, type: "" }))}
                onConfirm={() => console.log("delted")}
                title={product?.name}
              />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
