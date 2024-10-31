"use client";

import { Header } from "@/components/shared/header";
import { useLocale, useTranslations } from "next-intl";
import { Eye, SquarePlus } from "lucide-react";
import { FC, useState } from "react";
import { Input } from "@/components/ui/input";
import SearchInput from "../farm/searchInput";
import { Button, Space, Table, TableProps, Tooltip, message } from "antd";
import { Locale } from "@/lib/locales";
// import { Pagination } from "antd";

import useFilter from "@/hooks/useFilter";

import { useRouter, useSearchParams } from "next/navigation";
import { useGetFarmQuery } from "@/store/services/farmApi";
import { Sidebar } from "@/components/shared/sidebar";
import { IFarm } from "@/store/models/interfaces/farm.interfaces";

const pageLocale = {
  ru: "размер",
  ky: "өлчөмү",
};
interface IFilter {
  page: number;
  size: number;
  name?: string;
}

export enum ModalType {
  reAssign = "RE_ASSIGN",
  detail = "DETAIL",
}

const initValueClickedJob = "";

const Female: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const locale = useLocale() as Locale;
  const searchParams = useSearchParams();
  const [clickedJob, setIdClickedJob] = useState({
    farmId: initValueClickedJob,
    type: ModalType.detail,
  });

  const { paginationHandler, filter, changeFilter, changeSearch } =
    useFilter<IFilter>({
      page: Number(searchParams.get("page")) || 0,
      size: Number(searchParams.get("size")) || 10,
    });
  const t = useTranslations();

  const {
    data: userJobs = {
      totalElements: 0,
      content: [],
    },
    isLoading,
  } = useGetFarmQuery({ ...filter });

  const columns: TableProps<IFarm>["columns"] = [
    {
      title: "Ид.номер",
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("female.breed"),
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("female.color"),
      dataIndex: "title",
      key: "title",
    },

    {
      title: t("farmpage.try"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Посмотреть">
            <Button
              icon={<Eye />}
              onClick={() => handleShowDetail(record.id)}
            />
          </Tooltip>

          <Button
            disabled={
              record.type === "FARM_TIN" ||
              record.type === "FARM_NUMBER" ||
              record.type === "FARM_STAT_NO"
            }
            onClick={() => handleShowReAssign(record.id)}
          >
            {t("common.re-assign")}
          </Button>
        </Space>
      ),
    },
  ];
  const handleShowDetail = (id: string) => {
    setIdClickedJob({ farmId: id, type: ModalType.detail });
  };
  const handleShowReAssign = (id: string) => {
    setIdClickedJob({ farmId: id, type: ModalType.reAssign });
  };

  const router = useRouter();
  const handleClickOpenCreate = () => {
    router.push(`/${locale}/female/create`);
  };

  return (
    <div className="flex flex-col h-screen ">
      {contextHolder}
      <div className="flex">
        <div className="w-full">
          <div className="content-area bg-gray-100 dark:bg-black">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xl font-semibold">{t("female.list")}</span>
              <Button onClick={handleClickOpenCreate}>Создать</Button>
            </div>
            <SearchInput />
            <Table
              size="small"
              loading={isLoading}
              pagination={{
                pageSize: filter.size,
                total: userJobs.totalElements,
                locale: {
                  items_per_page: pageLocale[locale],
                },
                onShowSizeChange: (_, size) => changeFilter("size", size),
                onChange: paginationHandler,
                pageSizeOptions: [10, 20, 50],
              }}
              columns={columns}
              dataSource={userJobs.content}
            />
          </div>
          {/* <Pagination
            className="flex justify-end mt-5 mr-2"
            defaultCurrent={6}
            total={500}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Female;
