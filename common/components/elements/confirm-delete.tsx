import { Button } from "antd";
import { AlertCircle } from "lucide-react";
import React from "react";

type ConfirmDeleteProps = {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
  onLoading: boolean;
};

const ConfirmDelete = ({
  title,
  onCancel,
  onConfirm,
  onLoading,
}: ConfirmDeleteProps) => {
  return (
    <section className="space-y-5">
      <header className="flex items-start gap-3">
        <AlertCircle size={40} className="text-red-500" />
        <div className="leading-6">
          <p className="font-bold text-neutral-700">Confirm Delete</p>
          <p className="text-neutral-500 text-sm">
            Are you sure you want to delete {title} ? This action cannot be
            undone.
          </p>
        </div>
      </header>
      <footer className="flex justify-end gap-2">
        <Button
          type="primary"
          loading={onLoading}
          className="!bg-neutral-200 !text-neutral-600 !font-semibold"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          loading={onLoading}
          type="primary"
          className="!bg-red-500 !font-semibold"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </footer>
    </section>
  );
};

export default ConfirmDelete;
