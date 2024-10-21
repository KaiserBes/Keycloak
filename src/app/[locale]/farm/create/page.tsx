"use client";

import React from "react";
import { Button, Input, Select } from "antd";
import { Sidebar } from "@/components/shared/sidebar";
import { Header } from "@/components/shared/header";
import { useTranslations } from "next-intl";
import BackButton from "@/components/shared/createBackButton";

const CreateFarmerPage = () => {
  const t = useTranslations();

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 p-6">
          <BackButton />
          <form className="space-y-6">
            <div>
              <label
                htmlFor="farmer"
                className="block text-sm font-medium text-gray-700"
              >
                Фермер
              </label>
              <Input
                type="text"
                id="farmer"
                name="farmer"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Введите имя фермера"
              />
            </div>

            <div>
              <label
                htmlFor="locality"
                className="block text-sm font-medium text-gray-700"
              >
                {t("farmpage.paragraph")}
              </label>
              <Select
                id="locality"
                className="w-full"
                placeholder="Select a locality"
              >
                <option value="locality1">Населённый пункт 1</option>
                <option value="locality2">Населённый пункт 2</option>
              </Select>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Адрес фермера
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Введите адрес"
              />
            </div>

            <div>
              <label
                htmlFor="inn"
                className="block text-sm font-medium text-gray-700"
              >
                ИНН фермера
              </label>
              <Input
                type="text"
                id="inn"
                name="inn"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Введите ИНН"
              />
            </div>

            <div>
              <label
                htmlFor="contacts"
                className="block text-sm font-medium text-gray-700"
              >
                Контакты
              </label>
              <Input
                type="text"
                id="contacts"
                name="contacts"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Введите контакты"
              />
            </div>

            <div className="flex justify-end">
              <Button>Сохранить</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateFarmerPage;
