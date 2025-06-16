import Sidebar from "./sidebar";
import Topbar from "./topbar";

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts = ({ children }: LayoutsProps) => {
  return (
    <div>
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
