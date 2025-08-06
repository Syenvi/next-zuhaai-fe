"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useAuthStore } from "@/common/stores/auth";
import { useGetMe } from "@/modules/auth/services";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Loader from "../elements/loader";
import { Toaster } from "react-hot-toast";

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts = ({ children }: LayoutsProps) => {
  const pathname = usePathname();
  const publicRoutes = ["/login"];
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuthStore(
    useShallow((state) => ({ setUser: state.setUser }))
  );

  const matchRoute = (pathname: string, routes: string[]) => {
    return routes.some((route) => {
      if (route.endsWith("/*")) {
        const baseRoute = route.replace("/*", "");
        return pathname.startsWith(baseRoute);
      }
      return pathname === route;
    });
  };

  const noLayout = matchRoute(pathname, publicRoutes);

  const { data: meResponse, isFetching: loadingCheckAuth } = useGetMe(
    !noLayout
  );

  useEffect(() => {
    if (noLayout) {
      setLoading(false);
      return;
    }

    // Tunggu sampai `meResponse` selesai
    if (meResponse) {
      setUser({
        name: meResponse.name,
        email: meResponse.email,
        avatar: meResponse?.profile?.avatar,
        business: {
          name: meResponse?.bussiness?.[0]?.name,
          phone: meResponse?.bussiness?.[0]?.phone,
        },
      });
      setLoading(false);
    }
  }, [loadingCheckAuth, meResponse]);

  return loading ? (
    <Dialog open={loading && !noLayout}>
      <DialogContent>
        <Loader />
        Memeriksa Sesi...
      </DialogContent>
    </Dialog>
  ) : noLayout ? (
    <>{children}</>
  ) : (
    <div>
      <Toaster position="top-center" />
      <div className="flex flex-col lg:flex-row mx-auto">
        <Sidebar />
        <main className="transition-all rounded-2xl shadow-[0_4px_50px_rgba(0,0,0,0.015)] flex flex-col justify-start duration-300 flex-1 min-h-dvh bg-white relative">
          <Topbar />
          <div className="p-3 lg:p-5">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layouts;
