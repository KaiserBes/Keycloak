"use client";

import { AlignEndHorizontal } from "lucide-react";

import { ModeToggle } from "./theme-switcher";

import { useSession } from "next-auth/react";
import LocalSwitcher from "./local-switcher";
import { usePathname } from "next/navigation";

export const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (pathname === "/ru/login") return;
  return (
    <div className="flex justify-between items-center px-5 dark:bg-[#1f1f1f] dark:shadow-md dark:border ">
      <div className="flex gap-3">
        <AlignEndHorizontal className="text-blue-600" />
        <span className="font-semibold">Система учета</span>
      </div>
      <div className="flex justify-end py-5 gap-5 items-center">
        <LocalSwitcher />
        <ModeToggle />
        <p className="text-sm font-semibold">{session?.user?.name}</p>
      </div>
    </div>
  );
};
