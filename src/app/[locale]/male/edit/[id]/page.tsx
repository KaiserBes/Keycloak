"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { getError } from "@/lib/general";
import {
  useGetMaleByIdQuery,
  useUpdateMaleMutation,
} from "@/store/services/maleApi";
import dayjs from "dayjs";
import moment from "moment";
import { useGetBreedQuery } from "@/store/services/breedApi";
import { useGetSuitQuery } from "@/store/services/suitApi";
import { useGetCountryQuery } from "@/store/services/countryApi";

const EditMalePage = () => {
  const { id = "" } = useParams<{ id: any }>();
  const dateFormat = "YYYY-MM-DD";

  const { data: selectedEdit } = useGetMaleByIdQuery(id);

  const [updateMale, { isLoading: isLoadingUpdate }] = useUpdateMaleMutation();
  const [form] = Form.useForm();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();

  const { data: breeds = [] } = useGetBreedQuery("");
  const { data: suits = [] } = useGetSuitQuery("");
  const { data: countries = [] } = useGetCountryQuery("");

  useEffect(() => {
    if (selectedEdit) {
      form.setFieldsValue({
        title: selectedEdit.title || "",
        birthDate: selectedEdit.birthDate
          ? moment(selectedEdit.birthDate, dateFormat)
          : null,
        number: selectedEdit.number,
        breedTitle: selectedEdit.breedTitle || "",
        suitTitle: selectedEdit.suitTitle || "",
        weight: selectedEdit.weight || "",
        originTitle: selectedEdit.origin?.title || "",
      });
    }
  }, [selectedEdit, form]);

  const onFinish = async (values: any) => {
    try {
      await updateMale({
        id: id,
        body: values,
        date: values.date
          ? values.date.format("YYYY-MM-DD")
          : dayjs("2023-01-01", dateFormat),
      }).unwrap();
      toast.success(t("common.success"));
      router.push(`/${locale}/male`);
      form.resetFields();
    } catch (error) {
      toast.error(getError(error));
    }
  };

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
          <Form.Item name="title" label="Кличка">
            <Input />
          </Form.Item>
          <Form.Item
            name="birthDate"
            label="Дата рождения"
            rules={[{ required: true, message: "Введите дату рождения" }]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item name="number" label="Ид.номер">
            <Input />
          </Form.Item>
          <Form.Item
            name="breedTitle"
            label="Порода"
            rules={[{ required: true, message: "Это обязательное поле" }]}
          >
            <Select>
              {breeds.map((breed: any) => (
                <Select.Option key={breed.id} value={breed.title}>
                  {breed.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="suitTitle"
            label="Масть"
            rules={[{ required: true, message: "Это обязательное поле" }]}
          >
            <Select>
              {suits.map((suit: any) => (
                <Select.Option key={suit.id} value={suit.title}>
                  {suit.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="weight" label="Живая масса">
            <Input />
          </Form.Item>
          <Form.Item
            name="originTitle"
            label="Страна происхождения"
            rules={[{ required: true, message: "Это обязательное поле" }]}
          >
            <Select>
              {countries.map((countries) => (
                <Select.Option key={countries.id} value={countries.id}>
                  {countries.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoadingUpdate}>
              {t("common.save")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditMalePage;
