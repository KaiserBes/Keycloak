import Canvas from "@/components/shared/canvas/canvas";
import { Header } from "@/components/shared/header";
import { Sidebar } from "@/components/shared/sidebar";
import { useRouter } from "next/router";

export default function DashboardPage() {
  // const { locale } = useRouter();

  return (
    <div className="flex flex-col h-screen ">
      <Header />
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="content-area bg-gray-100 dark:bg-black max-">
            <Canvas />
          </div>
        </div>
      </div>
    </div>
  );
}
