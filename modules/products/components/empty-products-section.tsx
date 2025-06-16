import { Button } from "antd";
import { Archive } from "lucide-react";
import React from "react";

const EmptyProductSection = () => {
  return (
    <div className="my-10 flex flex-col items-center gap-2">
      <h3 className="text-neutral-700 font-semibold text-center">
        Product List Empty
      </h3>
      <p className="text-sm text-neutral-500 text-center">
        There are currently no products in your list. Please create your product
        first.
      </p>
      <Button className="!text-primary !font-medium">
        <Archive size={18} />
        Create Product
      </Button>
    </div>
  );
};

export default EmptyProductSection;
