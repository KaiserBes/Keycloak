import { Button, Card, DatePicker, Form, Input, Modal, Select } from "antd";
import { useTranslations } from "next-intl";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";

import { getError } from "@/lib/general";

import { IPet } from "@/store/models/interfaces/pet.interfaces";
import { useUpdatePetMutation } from "@/store/services/petApi";
import dayjs from "dayjs";
import moment from "moment";

interface IProps {
  selectedChange: IPet | null;
  onClose: () => void;
}

const ModalEditShow: FC<IProps> = ({ selectedChange, onClose }) => {
  const t = useTranslations();
  const [form] = Form.useForm<any>();
  const dateFormat = "YYYY-MM-DD";
  const [updatePet, { isLoading: isLoadingUpdate }] = useUpdatePetMutation();

  const onFinish = async (values: any) => {
    if (!selectedChange?.id) {
      toast.error("ID питомца отсутствует");
      return;
    }

    try {
      await updatePet({
        id: selectedChange?.id,
        body: values,
        date: values.date
          ? values.date.format("YYYY-MM-DD")
          : dayjs("2023-01-01", dateFormat),
      }).unwrap();
      toast.success(t("common.success"));
      onClose();
      form.resetFields();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (selectedChange) {
      form.setFieldsValue({
        title: selectedChange.title,
        birthDate: selectedChange.birthDate
          ? moment(selectedChange.birthDate, dateFormat)
          : null,
        gender: selectedChange.gender,
        number: selectedChange.number,
        breedTitle: selectedChange.breedTitle,
        color: selectedChange.color,
        suitTitle: selectedChange.suitTitle,
        father: selectedChange.father?.title,
        motherId: selectedChange.mother?.breedId,
        motherBreed: selectedChange.mother?.breedTitle,
        motherSuit: selectedChange.mother?.suitTitle,
      });
    }
  }, [selectedChange, form]);

  const isOpen = !!selectedChange;
  console.log("selectedChange:", selectedChange);

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
      title={"Редактировать"}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Отменить
        </Button>,
        <Button
          key="submit"
          type="primary"
          form="pet-update"
          loading={isLoadingUpdate}
          htmlType="submit"
        >
          {t("common.save")}
        </Button>,
      ]}
    >
      <Form id="pet-update" layout="vertical" form={form} onFinish={onFinish}>
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
          <Form.Item name="father" label="Батыр">
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

export default ModalEditShow;
