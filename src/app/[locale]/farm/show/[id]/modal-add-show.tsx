import { Button, Card, DatePicker, Form, Input, Modal, Select } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";

import { IOrganizationTypes } from "@/store/models/interfaces/base.interfaces";

import { getError } from "@/lib/general";
import { Locale } from "@/lib/locales";
import { IPet } from "@/store/models/interfaces/pet.interfaces";
import {
  useAddPetMutation,
  useUpdatePetMutation,
} from "@/store/services/petApi";
import dayjs from "dayjs";
import moment from "moment";

interface IProps {
  selectedAdd: IPet | null;
  onClose: () => void;
}

const ModalAddShow: FC<IProps> = ({ selectedAdd, onClose }) => {
  const t = useTranslations();
  const [form] = Form.useForm<any>();
  const dateFormat = "YYYY-MM-DD";
  const [addPet, { isLoading: isLoadingAdd }] = useAddPetMutation();

  const onFinish = async (values: any) => {
    console.log("Submitted values:", values);
    try {
      await addPet({
        ...values,
        date: values?.date
          ? values.date?.format("YYYY-MM-DD")
          : dayjs("2023-01-01", dateFormat),
      }).unwrap();
      toast.success(t("common.success"));
      onClose();
      form.resetFields();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const isOpen = !!selectedAdd;

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
    <Modal
      width={1000}
      style={{ top: 20 }}
      open={isOpen}
      title={"Создать"}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Отменить
        </Button>,
        <Button
          key="submit"
          type="primary"
          form="pet-add"
          loading={isLoadingAdd}
          htmlType="submit"
        >
          {t("common.save")}
        </Button>,
      ]}
    >
      <Form id="pet-add" layout="vertical" form={form} onFinish={onFinish}>
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
        </Card>
      </Form>
    </Modal>
  );
};

export default ModalAddShow;
