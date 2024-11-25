"use client";

import React from "react";
import { Button, Form, Input, Select } from "antd";
import { useLocale } from "next-intl";
import { useCreateFarmMutation } from "@/store/services/farmApi";
import toast from "react-hot-toast";
import { getError } from "@/lib/general";
import BackButton from "@/components/shared/createBackButton";
import { useGetLocalityQuery } from "@/store/services/localityApi";
import _ from "lodash";
import { Locale } from "@/lib/locales";
import { useRouter } from "next/navigation";

const CreateFarmerPage = () => {
  const [form] = Form.useForm<string>();
  const locale = useLocale() as Locale;

  const router = useRouter();

  const [createFarm, { isLoading: isLoadingAdd }] = useCreateFarmMutation();

  const [searchQuery, setSearchQuery] = React.useState("");

  const { data: localities, isFetching } = useGetLocalityQuery(searchQuery);

  const formRules = {
    personTitle: [{ required: true, message: "Введите Фермера" }],
    personId: [{ required: true, message: "Выберите пункт" }],
  };

  const onFinish = async (values: any) => {
    try {
      await createFarm({ ...values, localityTitle: "" }).unwrap();
      toast.success("Фермер успешно создан");
      router.push(`/${locale}/farm`);
      form.resetFields();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const handleSearch = _.debounce((value: string) => {
    setSearchQuery(value);
  }, 400);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6">
        <BackButton />
        <Form id="farm" layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="title" label="Фермер" rules={formRules.personTitle}>
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
            <Button
              className="mt-4"
              type="primary"
              form="farm"
              loading={isLoadingAdd}
              htmlType="submit"
            >
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateFarmerPage;
