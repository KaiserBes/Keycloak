"use client";

import { useLocale, useTranslations } from "next-intl";
import { SquarePlus } from "lucide-react";
import { FC, useState } from "react";
import { Input } from "antd";

import { Button, Space, Table, TableProps, Tooltip, message } from "antd";
import { Locale } from "@/lib/locales";

import useFilter from "@/hooks/useFilter";

import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetFarmsQuery,
  useReAssignPerformerMutation,
} from "@/store/services/farmApi";

import {
  IFarm,
  IReassignFields,
} from "@/store/models/interfaces/farm.interfaces";
import { FarmState } from "@/store/models/enums/general";
import { getError } from "@/lib/general";

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
  const [clickedFarm, setIdClickedFarm] = useState({
    farmId: initValueClickedJob,
    type: ModalType.detail,
  });
  const [farmState, setFarmState] = useState<string>(FarmState.STARTED);

  const [reAssignRequest, { isLoading: isLoadingReAssign }] =
    useReAssignPerformerMutation();

  const { paginationHandler, filter, changeFilter, changeSearch } =
    useFilter<IFilter>({
      page: Number(searchParams.get("page")) || 0,
      size: Number(searchParams.get("size")) || 10,
    });
  const t = useTranslations();

  const columns: TableProps<IFarm>["columns"] = [
    {
      title: "Фермер",
      dataIndex: "personTitle",
      key: "personTitle",
      render: (_, data) => <p>{data?.title}</p>,
    },
    {
      title: t("farmpage.paragraph"),
      dataIndex: "personId",
      key: "personId",
      render: (_, data) => <p>{data?.localityTitle}</p>,
    },

    {
      title: t("farmpage.try"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Посмотреть">
            <Button onClick={() => handleShowDetail(record.id)} />
          </Tooltip>

          <Button
            disabled={
              record.type === "FARM_TIN" ||
              record.type === "FARM_NUMBER" ||
              record.type === "FARM_STAT_NO"
            }
            onClick={() => handleShowReAssign(record.id)}
          >
            {t("farmpage.re-assign")}
          </Button>
        </Space>
      ),
    },
  ];

  const { data, isFetching } = useGetFarmsQuery(farmState, {
    refetchOnMountOrArgChange: true,
  });
  // const {
  //   data = {
  //     totalElements: 0,
  //     content: [],
  //   },
  //   isLoading,
  //   isError,
  //   error,
  // } = useGetFarmsQuery({ ...filter }, { refetchOnMountOrArgChange: true });

  const handleShowDetail = (id: string) => {
    setIdClickedFarm({ farmId: id, type: ModalType.detail });
  };
  const handleShowReAssign = (id: string) => {
    setIdClickedFarm({ farmId: id, type: ModalType.reAssign });
  };
  const router = useRouter();
  const handleClickOpenCreate = () => {
    router.push(`/${locale}/farm/create`);
  };

  const onClose = () => {
    setIdClickedFarm({ farmId: initValueClickedJob, type: ModalType.detail });
  };

  const handleReAssign = async (reAssignFields: IReassignFields) => {
    try {
      await reAssignRequest({
        body: reAssignFields,
        farmId: clickedFarm.farmId,
      }).unwrap();
      onClose();
      messageApi.open({ type: "success", content: t("common.success") });
    } catch (error) {
      messageApi.open({ type: "error", content: getError(error) });
    }
  };

  return (
    <div className="flex flex-col h-screen ">
      {contextHolder}
      {/* <ShowFarmDetail id={clickedJob} onClose={onClose} /> */}
      <div className="flex">
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
            <Input
              className="w-full"
              allowClear
              name="q"
              onChange={changeSearch}
            />
            <Table
              bordered
              size="small"
              loading={isFetching}
              pagination={{
                pageSize: filter.size,
                locale: {
                  items_per_page: pageLocale[locale as keyof typeof pageLocale],
                },
                onShowSizeChange: (_, size) => {
                  changeFilter("size", size);
                },
                onChange: paginationHandler,
                pageSizeOptions: [10, 20, 50],
              }}
              columns={columns}
              dataSource={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farm;
