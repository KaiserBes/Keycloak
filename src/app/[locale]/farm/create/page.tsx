"use client";

import React, { FC, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useCreateFarmMutation } from "@/store/services/farmApi";
import toast from "react-hot-toast";
import { IOrganizationTypes } from "@/store/models/interfaces/base.interfaces";
import { getError } from "@/lib/general";

import BackButton from "@/components/shared/createBackButton";
import { useGetLocalityQuery } from "@/store/services/localityApi";
import { FarmState } from "@/store/models/enums/general";
import _, { debounce } from "lodash";

interface IProps {
  onClose: () => void;
  organizationType: IOrganizationTypes[];
}

const CreateFarmerPage: FC<IProps> = ({ onClose }) => {
  const t = useTranslations();

  const [farmState, setFarmState] = useState<string>(FarmState.STARTED);
  const [form] = Form.useForm<any>();

  const [createFarm, { isLoading: isLoadingAdd }] = useCreateFarmMutation();

  const [searchQuery, setSearchQuery] = React.useState("");

  const { data: localities, isFetching } = useGetLocalityQuery(searchQuery);

  const onFinish = async (values: any) => {
    try {
      await createFarm(values).unwrap();
      toast.success("Фермер успешно создан");
      onClose();
      form.resetFields();
    } catch (error) {
      console.error("CreateFarm Error:", error);
      toast.error(getError(error));
    }
  };

  const handleSearch = _.debounce((value: string) => {
    setSearchQuery(value);
  }, 600);

  console.log("localities:", localities);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6">
        <BackButton />

        <Form id="farm" layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="personTitle"
            label="Фермер"
            rules={[
              {
                required: true,
                message: "Введите Фермера",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="personId"
            label="Населенный пункт"
            rules={[
              {
                required: true,
                message: "Выберите пункт",
              },
            ]}
          >
            <Select
              mode="multiple"
              showSearch
              onSearch={handleSearch}
              loading={isFetching}
              placeholder="Поиск населенного пункта"
              filterOption={false}
            >
              {localities?.map((locality) => (
                <Select.Option key={locality.key} value={locality.value}>
                  {locality.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="personAddress" label="Адрес фермера">
            <Input />
          </Form.Item>
          <Form.Item name="INN" label="ИНН фермера">
            <Input />
          </Form.Item>
          <Form.Item name="personContacts" label="Контакты">
            <Input />
          </Form.Item>
          <div className="flex justify-end">
            <Button key="submit" type="primary" form="farm" htmlType="submit">
              Сохранить
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateFarmerPage;
