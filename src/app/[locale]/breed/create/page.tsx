"use client";

import React from "react";
import { Button, Form, Input } from "antd";
import { useLocale } from "next-intl";

import toast from "react-hot-toast";
import { getError } from "@/lib/general";
import BackButton from "@/components/shared/createBackButton";

import { Locale } from "@/lib/locales";
import { useRouter } from "next/navigation";
import { useCreateBreedMutation } from "@/store/services/breedApi";

const CreateBreedPage = () => {
  const [form] = Form.useForm<string>();
  const locale = useLocale() as Locale;

  const router = useRouter();

  const [createBreed, { isLoading: isLoadingAdd }] = useCreateBreedMutation();

  const formRules = {
    personTitle: [{ required: true, message: "Введите Фермера" }],
    personId: [{ required: true, message: "Выберите пункт" }],
  };

  const onFinish = async (values: any) => {
    try {
      await createBreed({ ...values }).unwrap();
      toast.success("Порода успешно создана");
      router.push(`/${locale}/breed`);
      form.resetFields();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6">
        <BackButton />
        <Form id="suit" layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="title" label="Порода" rules={formRules.personTitle}>
            <Input />
          </Form.Item>
          <Button
            className="mt-4"
            type="primary"
            form="suit"
            loading={isLoadingAdd}
            htmlType="submit"
          >
            Сохранить
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateBreedPage;
