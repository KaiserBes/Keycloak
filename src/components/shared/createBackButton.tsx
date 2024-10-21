"use client";

import { Breadcrumb } from "antd";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const t = useTranslations();

  function itemRender(currentRoute: any, params: any, items: any, paths: any) {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;

    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <Link href={`/${paths.join("/")}`}>{currentRoute.title}</Link>
    );
  }

  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Breadcrumb
            itemRender={itemRender}
            items={[
              {
                href: "",
                title: (
                  <>
                    <span
                      onClick={() => router.back()}
                      className="cursor-pointer"
                    >
                      {t("sidebar.farm")}
                    </span>
                  </>
                ),
              },
              {
                title: t("farmpage.create-button"),
              },
            ]}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-5">
        <div className="p-1 hover:bg-gray-50 rounded-sm cursor-pointer">
          <ArrowLeft onClick={() => router.back()} />
        </div>
        <h1 className="text-2xl font-semibold ">
          {t("farmpage.create-button")}
        </h1>
      </div>
    </div>
  );
};

export default BackButton;
