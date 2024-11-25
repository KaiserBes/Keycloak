import Login from "./login/page";
import { Sidebar } from "@/components/shared/sidebar";

export default function HomePage() {
  return (
    <div>
      <Login />
      <Sidebar />
    </div>
  );
}
