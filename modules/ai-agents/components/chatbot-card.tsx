import ConfirmDelete from "@/common/components/elements/confirm-delete";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "antd";
import { Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import { AgentPayloadType } from "../types";
import Image from "next/image";
import { useDeleteAgent } from "../services";
import toast from "react-hot-toast";
import { useState } from "react";

const ChatbotCard = ({
  data,
  refetch,
}: {
  data: AgentPayloadType;
  refetch: () => void;
}) => {
  const [dialogs, setDialogs] = useState({
    delete: { status: false },
  });

  const { mutate: deleteAgent, isPending: loadingDelete } = useDeleteAgent({
    onSuccess: () => {
      toast.success("Agent successfully deleted");
      refetch();
      setDialogs((prev) => ({ ...prev, delete: { status: false } }));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return (
    <div className="border rounded-xl p-5 shadow-[0_4px_50px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center space-y-3">
      <p className="font-semibold text-neutral-700">{data.name}</p>
      <div className="w-10 h-10 rounded-full bg-primary relative">
        <Image
          fill
          src={`${process.env.NEXT_PUBLIC_DEFAULT_AVATAR_URL}${data.name}`}
          alt={`${data.name}-profile`}
        />
      </div>
      <p className="text-sm text-neutral-500">{data?.description || ""}</p>
      <div className="flex items-center gap-2">
        <Link href={`/ai-agents/${data.id}`}>
          <Button>
            <Settings size={18} />
            Settings
          </Button>
        </Link>
        <Button
          onClick={() =>
            setDialogs((prev) => ({ ...prev, delete: { status: true } }))
          }
          className="!text-red-500 !border-red-500 hover:!bg-red-500/10"
        >
          <Trash2 size={18} />
          Delete
        </Button>
      </div>
      <Dialog
        open={dialogs.delete.status}
        onOpenChange={() =>
          setDialogs((prev) => ({ ...prev, delete: { status: false } }))
        }
      >
        <DialogContent className="sm:max-w-md">
          <ConfirmDelete
            onLoading={loadingDelete}
            title={`Agent "${data.name}"`}
            onCancel={() =>
              setDialogs((prev) => ({ ...prev, delete: { status: false } }))
            }
            onConfirm={() => deleteAgent(data.id)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatbotCard;
