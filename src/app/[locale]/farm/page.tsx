"use client";

import { Header } from "@/components/shared/header";

import { useLocale, useTranslations } from "next-intl";
import { SquarePlus } from "lucide-react";
import { FC, useState } from "react";
import { Input } from "@/components/ui/input";
import SearchInput from "./searchInput";
import { Button, Space, Table, TableProps, Tooltip, message } from "antd";
import { Locale } from "@/lib/locales";
// import { Pagination } from "antd";

import useFilter from "@/hooks/useFilter";

import { useRouter, useSearchParams } from "next/navigation";
import { useGetFarmQuery } from "@/store/services/farmApi";
import { Sidebar } from "@/components/shared/sidebar";
import { IFarm } from "@/store/models/interfaces/farm.interfaces";
import { FarmState } from "@/store/models/enums/general";

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

const Farm: FC = () => {
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

  const columns: TableProps<IFarm>["columns"] = [
    {
      title: "Фермер",
      dataIndex: "title",
      key: "title",
      render: (_, data) => <p>{data?.title}</p>,
    },
    {
      title: t("farmpage.paragraph"),
      dataIndex: "localityTitle",
      key: "localityTitle",
      render: (_, data) => <p>{data?.localityTitle}</p>,
    },

    {
      title: t("farmpage.try"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Посмотреть">
            <Button onClick={() => handleShowDetail(record.farmId)} />
          </Tooltip>

          <Button
            disabled={
              record.type === "FARM_TIN" ||
              record.type === "FARM_NUMBER" ||
              record.type === "FARM_STAT_NO"
            }
            onClick={() => handleShowReAssign(record.farmId)}
          >
            {t("common.re-assign")}
          </Button>
        </Space>
      ),
    },
  ];
  // const {
  //   data: userFarms = {
  //     totalElements: 0,
  //     content: [],
  //   },
  //   isLoading,
  // } = useGetFarmQuery({ ...filter });
  const [farmState, setFarmState] = useState<string>(FarmState.STARTED);
  const { data, isFetching } = useGetFarmQuery(farmState, {
    refetchOnMountOrArgChange: true,
  });

  // const [reAssignRequest, { isLoading: isLoadingReAssign }] =
  //   useReAssignPerformerMutation('');

  const handleShowDetail = (id: string) => {
    setIdClickedJob({ farmId: id, type: ModalType.detail });
  };
  const handleShowReAssign = (id: string) => {
    setIdClickedJob({ farmId: id, type: ModalType.reAssign });
  };
  const router = useRouter();
  const handleClickOpenCreate = () => {
    router.push(`/${locale}/farm/create`);
  };

  const onClose = () => {
    setIdClickedJob({ farmId: initValueClickedJob, type: ModalType.detail });
  };

  // const handleReAssign = async (reAssignFields: IReassignFields) => {
  //   try {
  //     await reAssignRequest({
  //       body: reAssignFields,
  //       jobId: clickedJob.farmId,
  //     }).unwrap();
  //     onClose();
  //     messageApi.open({ type: "success", content: t("common.success") });
  //   } catch (error) {
  //     messageApi.open({ type: "error", content: getError(error) });
  //   }
  // };
  // console.log(userFarms.content);

  return (
    <div className="flex flex-col h-screen ">
      {contextHolder}
      {/* <ShowFarmDetail id={clickedJob} onClose={onClose} /> */}
      <Header />
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className=""></div>
        <div className="w-full">
          <div className="content-area bg-gray-100 dark:bg-black">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xl font-semibold">
                {t("farmpage.title")}
              </span>
              <Button onClick={handleClickOpenCreate}>
                {t("farmpage.create-button")}
              </Button>
            </div>
            <SearchInput />
            <Table
              size="small"
              // loading={isLoading}
              pagination={{
                pageSize: filter.size,
                // total: userFarms.totalElements,
                locale: {
                  items_per_page: pageLocale[locale as keyof typeof pageLocale],
                },
                onShowSizeChange: (_, size) => changeFilter("size", size),
                onChange: paginationHandler,
                pageSizeOptions: [10, 20, 50],
              }}
              columns={columns}
              dataSource={data}
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

export default Farm;
