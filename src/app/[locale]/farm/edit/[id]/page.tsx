"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Input, Select } from "antd";
import { useLocale, useTranslations } from "next-intl";
import {
  useDeleteFarmMutation,
  useGetFarmByIdQuery,
  useUpdateFarmMutation,
} from "@/store/services/farmApi";
import toast from "react-hot-toast";
import { getError } from "@/lib/general";
import _ from "lodash";
import { useGetLocalityQuery } from "@/store/services/localityApi";

const EditFarmerPage = () => {
  const { id = "" } = useParams<{ id: any }>();

  const { data: selectedEdit, isLoading } = useGetFarmByIdQuery(id);

  const [updateFarm, { isLoading: isLoadingUpdate }] = useUpdateFarmMutation();
  const [deleteFarm] = useDeleteFarmMutation();
  const [form] = Form.useForm();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = _.debounce((value: string) => {
    setSearchQuery(value);
  }, 400);

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
  console.log("selectedEdit:", selectedEdit);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6">
        <Button
          onClick={() => router.back()}
          type="link"
          loading={isLoadingUpdate}
        >
          {t("common.back")}
        </Button>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="title" label="Фермер">
            <Input />
          </Form.Item>
          <Form.Item
            name="localityId"
            label="Населенный пункт"
            rules={formRules.personId}
          >
            <Select
              showSearch
              onSearch={handleSearch}
              loading={isFetching}
              placeholder="Поиск населенного пункта"
              filterOption={false}
            >
              {localities?.map((locality) => (
                <Select.Option key={locality.key} value={locality.key}>
                  {locality.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="personAddress" label="Адрес фермера">
            <Input />
          </Form.Item>
          <Form.Item name="personId" label="ИНН фермера">
            <Input />
          </Form.Item>
          <Form.Item name="personContacts" label="Контакты">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoadingUpdate}>
              {t("common.save")}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              key="submit"
              htmlType="submit"
              danger
              onClick={() => deleteFarmHandler(id)}
            >
              {t("common.delete")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditFarmerPage;
