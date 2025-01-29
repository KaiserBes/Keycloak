"use client";

import React from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";

import { useLocale, useTranslations } from "next-intl";
import BackButton from "@/components/shared/createBackButton";

import { useCreateMaleMutation } from "@/store/services/maleApi";
import toast from "react-hot-toast";
import { getError } from "@/lib/general";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Locale } from "@/lib/locales";
import { useGetBreedQuery } from "@/store/services/breedApi";
import { useGetSuitQuery } from "@/store/services/suitApi";
import { useGetCountryQuery } from "@/store/services/countryApi";

const CreateMalePage = () => {
  const t = useTranslations();
  const [form] = Form.useForm<any>();
  const router = useRouter();
  const locale = useLocale() as Locale;
  const dateFormat = "YYYY-MM-DD";

  const [addMale, { isLoading: isLoadingAdd }] = useCreateMaleMutation();

  const { data: breeds = [], isLoading } = useGetBreedQuery("");
  const { data: suits = [] } = useGetSuitQuery("");
  const { data: countries = [] } = useGetCountryQuery("");

  const onFinish = async (values: any) => {
    console.log("Submitted values:", values);
    try {
      await addMale({
        ...values,
        date: values?.date
          ? values.date?.format("YYYY-MM-DD")
          : dayjs("2023-01-01", dateFormat),
      }).unwrap();
      router.push(`/${locale}/male`);
      toast.success("Успешно создано");
      form.resetFields();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6">
        <BackButton />
        <Form id="male-add" layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Кличка"
            rules={[{ required: true, message: "Введите кличку" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="birthDate"
            label="Дата рождения"
            rules={[{ required: true, message: "Введите дату рождения" }]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            name="number"
            label="Ид.номер"
            rules={[{ required: true, message: "Введите Ид.номер" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="breedId"
            label="Порода"
            rules={[{ required: true, message: "Выберите породу" }]}
          >
            <Select loading={isLoading}>
              {breeds?.map((breed) => (
                <Select.Option key={breed.id} value={breed.id}>
                  {breed.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="suitId"
            label="Масть"
            rules={[{ required: true, message: "Выберите масть" }]}
          >
            <Select>
              {suits.map((suit) => (
                <Select.Option key={suit.id} value={suit.id}>
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
            rules={[{ required: true, message: "Выберите масть" }]}
          >
            <Select>
              {countries.map((countries) => (
                <Select.Option key={countries.id} value={countries.id}>
                  {countries.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button
            form="male-add"
            htmlType="submit"
            type="primary"
            loading={isLoadingAdd}
          >
            {t("common.save")}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateMalePage;
