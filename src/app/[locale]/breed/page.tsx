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

import toast from "react-hot-toast";
import { getError } from "@/lib/general";
import { ISuit } from "@/store/models/interfaces/base.interfaces";
import {
  useDeleteBreedMutation,
  useGetBreedQuery,
} from "@/store/services/breedApi";

const pageLocale = {
  ru: "размер",
  ky: "өлчөмү",
};
interface IFilter {
  page: number;
  size: number;
  title?: string;
}

const Breed: FC = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations();

  const searchParams = useSearchParams();

  const [suitState] = useState<any>();

  const { paginationHandler, filter, changeFilter } = useFilter<IFilter>({
    page: Number(searchParams.get("page")) || 0,
    size: Number(searchParams.get("size")) || 10,
  });

  const [allMales, setAllMales] = useState<IMale[]>([]);
  const [filteredMales, setFilteredMales] = useState<IMale[]>([]);

  const { data, isFetching } = useGetBreedQuery(suitState, {
    refetchOnMountOrArgChange: true,
    ...filter,
  });

  const [deleteBreed] = useDeleteBreedMutation();

  const deleteSuitHandler = async (id: any) => {
    try {
      await deleteBreed(id).unwrap();
      toast.success(t("Успешно удалено"));
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setAllMales(data as IMale[]);
      setFilteredMales(data as IMale[]);
    }
  }, [data]);

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

  const columns: TableProps<ISuit>["columns"] = [
    {
      title: t("pet.breed"),
      dataIndex: "title",
      key: "title",
      render: (_, data) => <p>{data?.title}</p>,
    },
    {
      title: t("farmpage.try"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/${locale}/breed/edit/${record.id}`}>
            <Button>{t("common.edit")}</Button>
          </Link>
          <Button danger onClick={() => deleteSuitHandler(record.id)}>
            {t("common.delete")}
          </Button>
        </Space>
      ),
    },
  ];

  const router = useRouter();
  const handleClickOpenCreate = () => {
    router.push(`/${locale}/breed/create`);
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

export default Breed;
