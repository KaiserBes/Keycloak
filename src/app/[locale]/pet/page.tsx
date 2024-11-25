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
import { IPet } from "@/store/models/interfaces/pet.interfaces";
import { useGetPetQuery } from "@/store/services/petApi";
import ViewDocuments from "../farm/show/[id]/view.documents";

const pageLocale = {
  ru: "размер",
  ky: "өлчөмү",
};
interface IFilter {
  page: number;
  size: number;
  title?: string;
}

const Pet: FC = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations();

  const searchParams = useSearchParams();

  const [petState] = useState<any>();

  const { paginationHandler, filter, changeFilter } = useFilter<IFilter>({
    page: Number(searchParams.get("page")) || 0,
    size: Number(searchParams.get("size")) || 10,
  });

  const [allPets, setAllPets] = useState<IPet[]>([]);
  const [filteredPets, setFilteredPets] = useState<IPet[]>([]);

  const { data, isFetching } = useGetPetQuery(petState, {
    refetchOnMountOrArgChange: true,
    ...filter,
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setAllPets(data as IPet[]);
      setFilteredPets(data as IPet[]);
    }
  }, [data]);

  const handleSearch = useCallback(
    _.debounce((e) => {
      const value = e.target.value.toLowerCase();
      const filteredData = allPets.filter((pet) =>
        pet.title.toLowerCase().includes(value)
      );
      setFilteredPets(filteredData);
    }, 300),
    [allPets]
  );

  const columns: TableProps<IPet>["columns"] = [
    {
      title: "Кличка",
      dataIndex: "title",
      key: "title",
      render: (_, data) => <p>{data?.title}</p>,
    },
    {
      title: "Ид.номер",
      dataIndex: "number",
      key: "number",
      render: (_, data) => <p>{data?.number}</p>,
    },
    {
      title: t("pet.gender"),

      dataIndex: "gender",
      key: "gender",
      render: (_, data) => <p>{data?.gender}</p>,
    },
    {
      title: t("pet.dayOfBirth"),
      dataIndex: "birthDate",
      key: "birthDate",
      render: (_, data) => <p>{data?.birthDate}</p>,
    },
    {
      title: t("pet.breed"),
      dataIndex: "breedTitle",
      key: "breedTitle",
      render: (_, data) => <p>{data?.breedTitle}</p>,
    },
    {
      title: t("pet.color"),
      dataIndex: "suitTitle",
      key: "suitTitle",
      render: (_, data) => <p>{data?.suitTitle}</p>,
    },
    {
      title: t("pet.dad"),
      dataIndex: "FatherTitle",
      key: "FatherTitle",
      render: (_, data) => <p>{data?.father?.title}</p>,
    },
    {
      title: t("pet.mom"),
      dataIndex: "motherTitle",
      key: "motherTitle",
      render: (_, data) => <p>{data?.mother?.title}</p>,
    },
    {
      title: t("pet.status"),
      dataIndex: "status",
      key: "status",
      render: (_, data) => <p>{data?.status}</p>,
    },
    {
      title: t("farmpage.try"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/${locale}/pet/edit/${record.id}`}>
            <Button>{t("common.edit")}</Button>
          </Link>

          <ViewDocuments
            certificateType={record.certificateType}
            certificateId={record.certificateId}
          />
        </Space>
      ),
    },
  ];

  const router = useRouter();
  const handleClickOpenCreate = () => {
    router.push(`/${locale}/pet/create`);
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
              dataSource={filteredPets}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pet;
