"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Form,
  message,
  Select,
  Space,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import { useLocale, useTranslations } from "next-intl";
import { EditOutlined } from "@ant-design/icons";

import {
  useDeleteFarmMutation,
  useGetFarmByIdQuery,
  useUpdateFarmMutation,
} from "@/store/services/farmApi";
import toast from "react-hot-toast";
import { getError } from "@/lib/general";
import _ from "lodash";
import { useGetLocalityQuery } from "@/store/services/localityApi";
import Link from "next/link";
import { IPet } from "@/store/models/interfaces/pet.interfaces";
import { useGetPetQuery } from "@/store/services/petApi";
import { useSession } from "next-auth/react";
import ModalEditShow from "./modal-edit-show";
import ViewerPdf from "@/components/shared/viewer-pdf";
import ViewDocuments from "./view.documents";
import { PrimaryButton } from "@react-pdf-viewer/core";
import ModalAddShow from "./modal-add-show";

const ShowFarmerPage = () => {
  const { data: session } = useSession();
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChange, setSelectedChange] = useState<IPet | null>(null);
  const [selectedAdd, setSelectedAdd] = useState<IPet | null>(null);

  const { id = "" } = useParams<{ id: any }>();
  const [filteredPets, setFilteredPets] = useState<IPet[]>([]);
  const [allPets, setAllPets] = useState<IPet[]>([]);

  const { data: selectedEdit, isLoading } = useGetFarmByIdQuery(id);
  const { data: petsData, isLoading: isLoadingPets } = useGetPetQuery({
    farmId: parseInt(id),
    title: "",
  });

  const showEditModal = () => setIsOpen(false);

  const showModalHandler = () => setIsOpen(true);

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

  const [updateFarm, { isLoading: isLoadingUpdate }] = useUpdateFarmMutation();
  const [deleteFarm] = useDeleteFarmMutation();
  const [form] = Form.useForm();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = useCallback(
    _.debounce((e) => {
      const value = e.target.value.toLowerCase();
      const filteredData = allPets.filter((pet: any) =>
        pet.personTitle.toLowerCase().includes(value)
      );
      setFilteredPets(filteredData);
    }, 300),
    [allPets]
  );

  const formRules = {
    personId: [{ required: true, message: "Выберите пункт" }],
  };

  const { data: localities, isFetching } = useGetLocalityQuery(searchQuery);

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
        </Space>
      ),
    },
  ];

  const deleteFarmHandler = async (id: string) => {
    try {
      await deleteFarm(id).unwrap();
      toast.success(t("Успешно удалено"));
      router.push(`/${locale}/farm`);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const onFinish = async (values: any) => {
    try {
      await updateFarm({ id: id, body: values }).unwrap();
      toast.success("Успешно изменено");
      router.push(`/${locale}/farm`);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className="mx-10">
      <div className="">
        <Button
          onClick={() => router.back()}
          type="link"
          loading={isLoadingUpdate}
        >
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
