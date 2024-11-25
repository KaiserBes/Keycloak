"use client";

import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import { useTranslations } from "next-intl";
import { FC } from "react";
import toast from "react-hot-toast";

import { getError } from "@/lib/general";
import { useAddPetMutation } from "@/store/services/petApi";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const CreatePet: FC = () => {
  const t = useTranslations();
  const [form] = Form.useForm<any>();
  const dateFormat = "YYYY-MM-DD";
  const [addPet, { isLoading: isLoadingAdd }] = useAddPetMutation();

  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      await addPet({
        ...values,
        date: values?.date
          ? values.date?.format("YYYY-MM-DD")
          : dayjs("2023-01-01", dateFormat),
      }).unwrap();
      toast.success(t("common.success"));

      form.resetFields();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const genderOptions = [
    { value: "MALE", label: "Самец" },
    { value: "FEMALE", label: "Самка" },
  ];

  const breedOptions = [
    { label: "Симментальская", value: "breed1" },
    { label: "Голштинская", value: "breed2" },
    { label: "Шароле", value: "breed3" },
    { label: "Холмогорская", value: "breed4" },
    { label: "Абердин-Ангусская", value: "breed5" },
    { label: "Неизвестная", value: "breed6" },
  ];

  const suitOptions = [
    { label: "Бурая", value: "suit1" },
    { label: "Кориченевая", value: "suit2" },
    { label: "Красная", value: "suit3" },
    { label: "Красно-пестрая", value: "suit4" },
    { label: "Пестрая", value: "suit5" },
    { label: "Рыжая", value: "suit6" },
  ];

  const fatherOptions = [
    { label: "Гендельф", value: "father1" },
    { label: "Зевс", value: "father2" },
    { label: "Париж", value: "father3" },
    { label: "Сункар", value: "father4" },
    { label: "Лев", value: "father5" },
  ];

  return (
    <div className="flex min-h-screen ">
      <div className="flex-1 ">
        <div className="m ">
          <Button
            onClick={() => router.back()}
            type="link"
            loading={isLoadingAdd}
            icon={<ArrowLeft />}
          >
            {t("common.back")}
          </Button>
        </div>
        <Form
          className="p-6"
          id="pet-add"
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "Введите кличку",
              },
            ]}
            name="title"
            label={"Кличка"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Введите дату рождения",
              },
            ]}
            name="birthDate"
            label={"Дата рождения"}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Пол"
            rules={[
              {
                required: true,
                message: "Выберите пол",
              },
            ]}
          >
            <Select options={genderOptions} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Введите Ид.номер",
              },
            ]}
            name="number"
            label={"Ид.номер"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="breedTitle"
            label="Порода"
            rules={[
              {
                required: true,
                message: "Выберите породу",
              },
            ]}
          >
            <Select options={breedOptions} />
          </Form.Item>
          <Form.Item
            name="suitTitle"
            label="Масть"
            rules={[
              {
                required: true,
                message: "Выберите масть",
              },
            ]}
          >
            <Select options={suitOptions} />
          </Form.Item>
          <Card title="Информация об отце">
            <Form.Item name="fatherTitle" label="Батыр">
              <Select options={fatherOptions} />
            </Form.Item>
          </Card>
          <Card title="Информация о матери">
            <Form.Item name="motherId" label={"Ид.номер"}>
              <Input />
            </Form.Item>
            <Form.Item
              name="motherBreed"
              label="Порода"
              rules={[
                {
                  required: true,
                  message: "Выберите породу",
                },
              ]}
            >
              <Select options={breedOptions} />
            </Form.Item>
            <Form.Item
              name="motherSuit"
              label="Масть"
              rules={[
                {
                  required: true,
                  message: "Выберите масть",
                },
              ]}
            >
              <Select options={suitOptions} />
            </Form.Item>
            <Button
              form="pet-add"
              htmlType="submit"
              type="primary"
              loading={isLoadingAdd}
            >
              {t("common.save")}
            </Button>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default CreatePet;
