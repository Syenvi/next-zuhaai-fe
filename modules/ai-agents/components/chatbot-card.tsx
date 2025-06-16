import ConfirmDelete from "@/common/components/elements/confirm-delete";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "antd";
import { Settings, Trash2 } from "lucide-react";
import Link from "next/link";

const ChatbotCard = () => {
  return (
    <div className="border rounded-xl p-5 shadow-[0_4px_50px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center space-y-3">
      <p className="font-semibold text-neutral-700">Zuhazana</p>
      <div className="w-10 h-10 rounded-full bg-primary" />
      <p className="text-sm text-neutral-500">description</p>
      <div className="flex items-center gap-2">
        <Link href={"/ai-agents/117a7806-4aaf-4f87-bdf7-be8c735a42ee"}>
          <Button>
            <Settings size={18} />
            Settings
          </Button>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="!text-red-500 !border-red-500 hover:!bg-red-500/10">
              <Trash2 size={18} />
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <ConfirmDelete
              title={`"Zuhazana"`}
              onCancel={() => {}}
              onConfirm={() => alert("deleted")}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ChatbotCard;
