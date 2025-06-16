import { Button, Divider } from "antd";
import Search from "antd/es/input/Search";
import { Plus } from "lucide-react";

const Inboxes = () => {
  return (
    <div className="flex-1 lg:max-w-[600px] lg:sticky top-[101px] h-[calc(100dvh-121px)] flex flex-col overflow-hidden p-3 lg:p-5 border rounded-lg gap-3">
      <div className="lg:sticky top-0 z-10">
        <h3 className="text-neutral-700 font-semibold">Inboxes</h3>
        <p className="text-sm text-neutral-500">
          This is where you can connect all your platforms
        </p>
      </div>
      <Search placeholder="Search by name..." allowClear onSearch={() => {}} />
      <Divider className="!my-2" />
      <div className="flex-1 flex flex-col gap-5 items-center justify-center">
        <div className="leading-6 max-w-[250px]">
          <h3 className="text-neutral-700 font-semibold text-center">
            Inbox is Empty
          </h3>
          <p className="text-sm text-neutral-500 text-center">
            You don&apos;t have any inboxes yet. Click the button below to
            create one.{" "}
          </p>
        </div>
        <Button type="primary" className="!p-5">
          <Plus size={20} />
          Create New Inbox
        </Button>
      </div>
    </div>
  );
};

export default Inboxes;
