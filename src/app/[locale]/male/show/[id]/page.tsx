"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form } from "antd";
import { useTranslations } from "next-intl";

import { useGetMaleByIdQuery } from "@/store/services/maleApi";

const ShowMalePage = () => {
  const { id = "" } = useParams<{ id: any }>();

  const { data: selectedEdit } = useGetMaleByIdQuery(id);

  const [form] = Form.useForm();

  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    if (selectedEdit) {
      form.setFieldsValue({
        title: selectedEdit.title || "",
        birthDate: selectedEdit.birthDate || "",
        breedTitle: selectedEdit.breedTitle || "",
        suitTitle: selectedEdit.suitTitle || "",
        weight: selectedEdit.weight || "",
        originTitle: selectedEdit.origin?.title || "",
      });
    }
  }, [selectedEdit, form]);

  return (
    <div className="mx-10">
      <div className="">
        <Button onClick={() => router.back()} type="link">
          {t("common.back")}
        </Button>
      </div>
      <div className="flex flex-col h-screen ">
        <Form.Item className="" name="title">
          <h2 className="font-semibold text-lg mb-2">Кличка</h2>
          <span>{selectedEdit?.title}</span>
        </Form.Item>
        <Form.Item className="" name="title">
          <h2 className="font-semibold text-lg mb-2">{t("pet.dayOfBirth")}</h2>
          <span>{selectedEdit?.birthDate}</span>
        </Form.Item>
        <Form.Item className="" name="title">
          <h2 className="font-semibold text-lg mb-2">{t("male.breed")}</h2>
          <span>{selectedEdit?.breedTitle}</span>
        </Form.Item>
        <Form.Item className="" name="title">
          <h2 className="font-semibold text-lg mb-2">{t("male.color")}</h2>
          <span>{selectedEdit?.suitTitle}</span>
        </Form.Item>
        <Form.Item className="" name="title">
          <h2 className="font-semibold text-lg mb-2">{t("male.weight")}</h2>
          <span>{selectedEdit?.weight}</span>
        </Form.Item>
        <Form.Item className="" name="originTitle">
          <h2 className="font-semibold text-lg mb-2">{t("male.country")}</h2>
          <span>{selectedEdit?.origin?.title}</span>
        </Form.Item>
      </div>
    </div>
  );
};

export default ShowMalePage;
