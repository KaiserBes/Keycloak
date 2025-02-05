"use client";

import { useLocale, useTranslations } from "next-intl";

import React, { FC, useState, useCallback, useEffect } from "react";
import { Input } from "antd";

import { Button, Space, Table, TableProps, Tooltip } from "antd";
import { Locale } from "@/lib/locales";

import useFilter from "@/hooks/useFilter";

import { useRouter, useSearchParams } from "next/navigation";
import { useGetFarmsQuery } from "@/store/services/farmApi";

import { IFarm } from "@/store/models/interfaces/farm.interfaces";
import { FarmState } from "@/store/models/enums/general";

import _ from "lodash";
import Link from "next/link";
import { Eye } from "lucide-react";

const pageLocale = {
  ru: "размер",
  ky: "өлчөмү",
};
interface IFilter {
  page: number;
  size: number;
  title?: string;
}

const Farm: FC = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations();

  const searchParams = useSearchParams();

  const [farmState] = useState<string>(FarmState.STARTED);

  const { paginationHandler, filter, changeFilter } = useFilter<IFilter>({
    page: Number(searchParams.get("page")) || 0,
    size: Number(searchParams.get("size")) || 10,
  });

  const [allFarms, setAllFarms] = useState<IFarm[]>([]);
  const [filteredFarms, setFilteredFarms] = useState<IFarm[]>([]);

  const { data, isFetching } = useGetFarmsQuery(farmState, {
    refetchOnMountOrArgChange: true,
    ...filter,
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setAllFarms(data as IFarm[]);
      setFilteredFarms(data as IFarm[]);
    }
  }, [data]);

  const handleSearch = useCallback(
    _.debounce((e) => {
      const value = e.target.value.toLowerCase();
      const filteredData = allFarms.filter((farm) =>
        farm.personTitle.toLowerCase().includes(value)
      );
      setFilteredFarms(filteredData);
    }, 300),
    [allFarms]
  );

  const columns: TableProps<IFarm>["columns"] = [
    {
      title: "Фермер",
      dataIndex: "personTitle",
      key: "personTitle",
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
          <Link href={`/${locale}/farm/show/${record.id}`}>
            <Tooltip title="Посмотреть">
              <Button icon={<Eye className="w-4 h-4" />} />
            </Tooltip>
          </Link>

          <Link href={`/${locale}/farm/edit/${record.id}`}>
            <Button>{t("common.edit")}</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const router = useRouter();
  const handleClickOpenCreate = () => {
    router.push(`/${locale}/farm/create`);
  };

  return (
    <div className="flex flex-col h-screen ">
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
              name="name"
              placeholder="Поиск по фермеру"
              onChange={handleSearch}
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
              dataSource={filteredFarms}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farm;
