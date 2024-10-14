"use client";

import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { SquarePlus } from "lucide-react";
import { FC, useState } from "react";
import { Input } from "@/components/ui/input";
import SearchInput from "./searchInput";
import { Table, message } from "antd";
import { Locale } from "@/lib/locales";
import { Pagination } from "antd";

import useFilter from "@/hooks/useFilter";

import { useSearchParams } from "next/navigation";
import { useGetFarmDataQuery } from "@/store/services/farmApi";
import { Sidebar } from "@/components/shared/sidebar";

const pageLocale = {
  ru: "размер",
  ky: "өлчөмү",
};
interface IFilter {
  page: number;
  size: number;
  name?: string;
}

const FarmTable: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const locale = useLocale() as Locale;
  const searchParams = useSearchParams();
  const currentLanguage = useLocale() as Locale;
  const { data, error, isLoading } = useGetFarmDataQuery("/farm");

  const { paginationHandler, filter, changeFilter, changeSearch } =
    useFilter<IFilter>({
      page: Number(searchParams.get("page")) || 0,
      size: Number(searchParams.get("size")) || 10,
    });
  const t = useTranslations();

  return (
    <div className="flex flex-col h-screen ">
      {contextHolder}
      <Header />
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="content-area bg-gray-100 dark:bg-black">
            <div className="flex justify-between">
              <span className="text-xl font-semibold">
                {t("farmpage.title")}
              </span>
              <Button className="flex items-center gap-2">
                <SquarePlus className="w-4 h-4" />
                {t("farmpage.create-button")}
              </Button>
            </div>
            <SearchInput />
            <Table
              size="small"
              pagination={{
                pageSize: filter.size,
                locale: {
                  items_per_page: pageLocale[locale],
                },
                onShowSizeChange: (_, size) => changeFilter("size", size),
                onChange: paginationHandler,
                pageSizeOptions: [10, 20, 50],
              }}
            />
          </div>
          <Pagination
            className="flex justify-end mt-5 mr-2"
            defaultCurrent={6}
            total={500}
          />
        </div>
      </div>
    </div>
  );
};

export default FarmTable;
