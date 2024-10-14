import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Login from "./login/page";
import { SideBar } from "@/components/shared/sidebar";

export default function HomePage() {
  const t = useTranslations("");
  return (
    <div>
      <Login />
      <SideBar />
    </div>
  );
}
