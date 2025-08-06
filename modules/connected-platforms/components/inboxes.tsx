import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button, Divider, Tag } from "antd";
import Search from "antd/es/input/Search";
import { Clock, Edit, Plus, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import ConnecttedPlatformForm from "./connected-platform-form";
import {
  useConnectConnectedPlatform,
  useGetConnectedPlatforms,
  useGetDetailConnectedPlatform,
} from "../services";
import Loader from "@/common/components/elements/loader";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ConnectedPlatformType } from "../types";
import toast from "react-hot-toast";
import clsx from "clsx";
import QRCode from "react-qr-code";

const Inboxes = () => {
  const [dialogs, setDialogs] = useState<{
    create: { status: boolean };
    update: { status: boolean; data: ConnectedPlatformType | null };
    qr: {
      status: boolean;
      data: {
        message: string;
        qr: string;
        data: ConnectedPlatformType;
      } | null;
    };
  }>({
    create: { status: false },
    update: { status: false, data: null },
    qr: { status: false, data: null },
  });
  const {
    data: connectedPlatformDatas = [],
    isFetching: loadingConnectedPlatforms,
    refetch,
  } = useGetConnectedPlatforms();

  const { refetch: refetchDetailPlatform } = useGetDetailConnectedPlatform(
    dialogs?.qr?.data?.data?.id || ""
  );

  const { mutate: connectPlatform, isPending: loadingConnect } =
    useConnectConnectedPlatform({
      onSuccess: (data) => {
        setDialogs((prev) => ({ ...prev, qr: { status: true, data } }));
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (!dialogs.qr.status) return;

    setCountdown(30); // Reset ke 30 saat dialog aktif

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setDialogs((prev) => ({
            ...prev,
            qr: { status: false, data: null },
          }));
          toast.error("QR code expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dialogs.qr.status]);

  useEffect(() => {
    if (!dialogs.qr.status || !dialogs.qr.data?.message) return;

    const interval = setInterval(async () => {
      try {
        const { data: latestDetail } = await refetchDetailPlatform();

        if (latestDetail?.is_active) {
          clearInterval(interval);
          setDialogs((prev) => ({
            ...prev,
            qr: { status: false, data: null },
          }));
          refetch();
          toast.success("WhatsApp connected successfully");
        }
      } catch (err) {
        console.error("Error polling detailPlatform:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [dialogs.qr.data?.message, dialogs.qr.status]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

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
      {loadingConnectedPlatforms ? (
        <Loader />
      ) : connectedPlatformDatas?.length > 0 ? (
        <div className="grid lg:grid-cols-2">
          {connectedPlatformDatas?.map((platform) => {
            return (
              <Card
                key={platform.platform_id}
                className={clsx(
                  "!p-3",
                  loadingConnect
                    ? "!animate-pulse opacity-50 pointer-events-none"
                    : ""
                )}
              >
                <CardContent className="p-0">
                  <header className="flex justify-end">
                    {platform?.is_active ? (
                      <Tag className="rounded-full !m-0" color="green">
                        Active
                      </Tag>
                    ) : (
                      <Tag color="red" className="!rounded-full !m-0">
                        Inactive
                      </Tag>
                    )}
                  </header>
                  <main className="flex justify-center flex-col items-center gap-2">
                    <Image
                      width={60}
                      height={60}
                      className="object-cover"
                      alt="platform-logo"
                      src={`/connected platform.png`}
                    />
                    <p className="text-muted-foreground text-sm">
                      {platform?.platform_identifier}
                    </p>
                  </main>
                  <footer className="my-2 space-y-2">
                    {!platform?.is_active ? (
                      <Button
                        onClick={() =>
                          setDialogs((prev) => ({
                            ...prev,
                            update: { status: true, data: platform },
                          }))
                        }
                        variant="outlined"
                        className="!text-sm w-full"
                        color="blue"
                      >
                        <Edit size={18} />
                        Edit
                      </Button>
                    ) : null}
                    {platform?.is_active ? null : (
                      <Button
                        loading={loadingConnect}
                        onClick={() => connectPlatform(platform?.id)}
                        variant="solid"
                        color="green"
                        className="!font-semibold w-full"
                      >
                        Activate
                      </Button>
                    )}
                  </footer>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
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
          <Button
            type="primary"
            className="!p-5"
            onClick={() =>
              setDialogs((prev) => ({ ...prev, create: { status: true } }))
            }
          >
            <Plus size={20} />
            Create New Inbox
          </Button>
        </div>
      )}
      <Dialog
        open={dialogs.create.status}
        onOpenChange={() =>
          setDialogs((prev) => ({ ...prev, create: { status: false } }))
        }
      >
        <DialogContent>
          <DialogTitle>Platform</DialogTitle>
          <DialogDescription>
            Select the platform you want to connect to your inbox.
          </DialogDescription>
          <ConnecttedPlatformForm
            refetch={refetch}
            setDialogs={() =>
              setDialogs((prev) => ({ ...prev, create: { status: false } }))
            }
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={dialogs.update.status}
        onOpenChange={() =>
          setDialogs((prev) => ({
            ...prev,
            update: { status: false, data: null },
          }))
        }
      >
        <DialogContent>
          <DialogTitle>Platform</DialogTitle>
          <DialogDescription>
            Select the platform you want to connect to your inbox.
          </DialogDescription>
          <ConnecttedPlatformForm
            editMode
            data={dialogs?.update?.data}
            refetch={refetch}
            setDialogs={() =>
              setDialogs((prev) => ({
                ...prev,
                update: { status: false, data: null },
              }))
            }
          />
        </DialogContent>
      </Dialog>
      <Dialog open={dialogs.qr.status}>
        <DialogContent className="mac-h-[80dvh] overflow-y-auto">
          <DialogTitle className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary rounded-full p-2">
              <Smartphone size={20} />
            </span>
            Connect to WhatsApp
          </DialogTitle>
          <DialogDescription>
            Scan the QR code below using your WhatsApp app. Once connected, the
            system will proceed automatically. Please wait...
          </DialogDescription>
          <div className="bg-primary/10 rounded-md py-10 flex flex-col items-center gap-5">
            <div className="flex gap-2 text-sm text-primary">
              <Clock size={18} /> {formatTime(countdown)} seconds remaining
            </div>
            {dialogs.qr.data?.qr && (
              <>
                <QRCode className="w-full" value={dialogs.qr.data.qr} />
              </>
            )}{" "}
          </div>
          <div className="bg-primary/10 rounded-lg p-4">
            <h3 className="font-medium text-primary mb-2">How to connect:</h3>
            <ol className="text-sm text-primary space-y-1">
              <li>1. Open WhatsApp on your phone</li>
              <li>2. Tap Menu or Settings and select Linked Devices</li>
              <li>3. Tap Link a Device and scan this code</li>
            </ol>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inboxes;
