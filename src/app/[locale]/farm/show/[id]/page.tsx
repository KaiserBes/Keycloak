"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, message, Space, Table, TableProps, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { EditOutlined } from "@ant-design/icons";

import { useGetFarmByIdQuery } from "@/store/services/farmApi";
import { getError } from "@/lib/general";

import { IPet } from "@/store/models/interfaces/pet.interfaces";
import { useDeletePetMutation, useGetPetQuery } from "@/store/services/petApi";

import ModalEditShow from "./modal-edit-show";

import ViewDocuments from "./view.documents";

import ModalAddShow from "./modal-add-show";
import { Trash2 } from "lucide-react";

const ShowFarmerPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedChange, setSelectedChange] = useState<IPet | null>(null);
  const [selectedAdd, setSelectedAdd] = useState<IPet | null>(null);

  const { id = "" } = useParams<{ id: any }>();
  const [filteredPets, setFilteredPets] = useState<IPet[]>([]);
  const [allPets, setAllPets] = useState<IPet[]>([]);

  const { data: selectedEdit } = useGetFarmByIdQuery(id);
  const { data: petsData, isLoading: isLoadingPets } = useGetPetQuery({
    farmId: parseInt(id),
    title: "",
  });

  const handleUnSelectAdd = () => setSelectedAdd(null);
  const handleSelectAdd = (farm: IPet) => setSelectedAdd(farm);

  const handleSelectEdit = (farm: IPet) => setSelectedChange(farm);
  const handleUnSelectEdit = () => setSelectedChange(null);

  useEffect(() => {
    if (petsData && Array.isArray(petsData)) {
      setAllPets(petsData as IPet[]);
      setFilteredPets(petsData as IPet[]);
    }
  }, [petsData, id]);

  const [form] = Form.useForm();

  const router = useRouter();
  const t = useTranslations();

  const [deletePet] = useDeletePetMutation();

  const deleteFarmHandler = async (id: string) => {
    try {
      await deletePet(id).unwrap();
      console.log(allPets);

      messageApi.open({ type: "success", content: t("common.success") });
    } catch (error) {
      messageApi.open({ type: "error", content: getError(error) });
    }
  };

  useEffect(() => {
    if (selectedEdit) {
      form.setFieldsValue({
        title: selectedEdit.title || "",
        localityId: selectedEdit.localityTitle || "",
        personAddress: selectedEdit.personAddress || "",
        personId: selectedEdit.personId || "",
        personContacts: selectedEdit.personContacts || "",
      });
    }
  }, [selectedEdit, form]);

  const columns: TableProps<IPet>["columns"] = [
    {
      title: "Кличка",
      dataIndex: "title",
      key: "title",
      render: (_, data) => <p>{data?.title}</p>,
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
      dataIndex: "fatherTitle",
      key: "fatherTitle",
      render: (_, data) => <p>{data?.father?.title}</p>,
    },
    {
      title: t("pet.mom"),
      dataIndex: "MotherId",
      key: "MotherId",
      render: (_, data) => <p>{data?.mother?.id}</p>,
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
          <Button
            onClick={() => handleSelectEdit(record)}
            icon={<EditOutlined />}
          >
            {t("common.edit")}
          </Button>
          <ViewDocuments
            certificateType={record.certificateType}
            certificateId={record.certificateId}
          />
          <Tooltip title="Удалить">
            <Button
              onClick={() => deleteFarmHandler(id)}
              danger
              icon={<Trash2 className="w-4 h-4" />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="mx-10">
      <div className="">
        <Button onClick={() => router.back()} type="link">
          {t("common.back")}
        </Button>
      </div>

      <Form.Item className="" name="title">
        <h2 className="font-semibold text-lg mb-2">Фермер</h2>
        <span>{selectedEdit?.title}</span>
      </Form.Item>
      <Form.Item className="" name="title">
        <h2 className="font-semibold text-lg mb-2">{t("farmpage.address")}</h2>
        <span>{selectedEdit?.localityTitle}</span>
      </Form.Item>
      <h2 className="font-semibold text-lg mb-2">
        Список прикрепленных к ферме животных
      </h2>
      <div className="flex flex-col h-screen ">
        {contextHolder}
        <div className="flex">
          <div className="w-full">
            <Table
              bordered
              size="small"
              loading={isLoadingPets}
              columns={columns}
              dataSource={filteredPets}
            />
          </div>
        </div>
        <div className="w-full">
          <Button onClick={() => handleSelectAdd(id)} type="primary">
            Добавить животное
          </Button>
        </div>
      </div>
      <ModalAddShow selectedAdd={selectedAdd} onClose={handleUnSelectAdd} />
      <ModalEditShow
        selectedChange={selectedChange}
        onClose={handleUnSelectEdit}
      />
    </div>
  );
};

export default ShowFarmerPage;
