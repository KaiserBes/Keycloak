"use client";

import { useLocale, useTranslations } from "next-intl";

import React, { FC, useState, useCallback, useEffect } from "react";
import { Input } from "antd";

import { Button, Space, Table, TableProps } from "antd";
import { Locale } from "@/lib/locales";

import useFilter from "@/hooks/useFilter";

import { useRouter, useSearchParams } from "next/navigation";

import _ from "lodash";
import Link from "next/link";

import { useGetMaleQuery } from "@/store/services/maleApi";

const pageLocale = {
  ru: "размер",
  ky: "өлчөмү",
};
interface IFilter {
  page: number;
  size: number;
  title?: string;
}

const Male: FC = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations();

  const searchParams = useSearchParams();

  const { paginationHandler, filter, changeFilter } = useFilter<IFilter>({
    page: Number(searchParams.get("page")) || 0,
    size: Number(searchParams.get("size")) || 10,
  });

  const [allMales, setAllMales] = useState<IMale[]>([]);
  const [filteredMales, setFilteredMales] = useState<IMale[]>([]);

  const { data: males = [], isFetching } = useGetMaleQuery(undefined, {
    refetchOnMountOrArgChange: true,
    ...filter,
  });

  useEffect(() => {
    if (males && Array.isArray(males)) {
      setAllMales(males as IMale[]);
      setFilteredMales(males as IMale[]);
    }
  }, [males]);

  const handleSearch = useCallback(
    _.debounce((e) => {
      const value = e.target.value.toLowerCase();
      const filteredData = allMales.filter((male) =>
        male.title.toLowerCase().includes(value)
      );
      setFilteredMales(filteredData);
    }, 300),
    [allMales]
  );

  const columns: TableProps<IMale>["columns"] = [
    {
      title: "Кличка",
      dataIndex: "title",
      key: "1",
      render: (_, data) => <p>{data?.title}</p>,
    },
    {
      title: "Ид.номер",
      dataIndex: "number",
      key: "2",
      render: (_, data) => <p>{data?.number}</p>,
    },
    {
      title: t("pet.color"),
      dataIndex: "suitId",
      key: "3",
      render: (_, data) => <p>{data?.suitTitle}</p>,
    },
    {
      title: t("pet.breed"),
      dataIndex: "breedId",
      key: "4",
      render: (_, data) => <p>{data?.breedTitle}</p>,
    },
    {
      title: t("male.weight"),
      dataIndex: "weight",
      key: "5",
      render: (_, data) => <p>{data?.weight}</p>,
    },
    {
      title: t("farmpage.try"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/${locale}/male/edit/${record.id}`}>
            <Button>{t("common.edit")}</Button>
          </Link>
          <Link href={`/${locale}/male/show/${record.id}`}>
            <Button>{t("common.show")}</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const router = useRouter();
  const handleClickOpenCreate = () => {
    router.push(`/${locale}/male/create`);
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
              placeholder="Поиск по кличке"
              onChange={handleSearch}
            />
            <Table
              bordered
              size="small"
              loading={isFetching}
              pagination={{
                pageSize: filter.size,
                total: filteredMales.length,
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
              dataSource={filteredMales}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Male;
