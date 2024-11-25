"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Input } from "antd";
import { useLocale, useTranslations } from "next-intl";

import toast from "react-hot-toast";
import { getError } from "@/lib/general";
import {
  useDeleteSuitMutation,
  useGetSuitByIdQuery,
  useUpdateSuitMutation,
} from "@/store/services/suitApi";

const EditSuitPage = () => {
  const { id = "" } = useParams<{ id: any }>();

  const { data: selectedEdit } = useGetSuitByIdQuery(id);

  const [updateSuit, { isLoading: isLoadingUpdate }] = useUpdateSuitMutation();
  const [deleteSuit] = useDeleteSuitMutation();
  const [form] = Form.useForm();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    if (selectedEdit) {
      form.setFieldsValue({
        title: selectedEdit.title || "",
      });
    }
  }, [selectedEdit, form]);

  const deleteSuitHandler = async (id: string) => {
    try {
      await deleteSuit(id).unwrap();
      toast.success(t("Успешно удалено"));
      router.push(`/${locale}/suit`);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const onFinish = async (values: any) => {
    try {
      await updateSuit({ id: id, body: values }).unwrap();
      toast.success("Успешно изменено");
      router.push(`/${locale}/suit`);
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
          <Form.Item name="title" label="Масть">
            <Input />
          </Form.Item>
          <Button type="primary" key="submit" htmlType="submit">
            {t("common.save")}
          </Button>
          <Button
            type="primary"
            key="submit"
            htmlType="submit"
            danger
            onClick={() => deleteSuitHandler(id)}
          >
            {t("common.delete")}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditSuitPage;
