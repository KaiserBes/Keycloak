"use client";

import { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { ApiTwoTone, BarsOutlined } from "@ant-design/icons";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import path from "path";

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
  const t = useTranslations();
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();

  if (pathname === "/ru/login") return;

  const items = [
    {
      label: t("sidebar.dashboard"),
      key: "1",
      icon: <BarsOutlined style={{ color: "purple" }} />,
      path: `/${locale}/dashboard`,
    },
    {
      label: t("sidebar.farm"),
      key: "2",
      icon: <BarsOutlined style={{ color: "purple" }} />,
      path: `/${locale}/farm`,
    },
    {
      label: t("sidebar.pet"),
      key: "3",
      icon: <BarsOutlined style={{ color: "purple" }} />,
      path: `/${locale}/pet`,
    },
    {
      label: t("sidebar.male"),
      key: "4",
      icon: <BarsOutlined style={{ color: "purple" }} />,
      path: `/${locale}/male`,
    },
    {
      label: t("sidebar.female"),
      key: "5",
      icon: <BarsOutlined style={{ color: "purple" }} />,
      path: `/${locale}/female`,
    },
    {
      label: t("sidebar.breeds"),
      key: "6",
      icon: <BarsOutlined style={{ color: "purple" }} />,
      path: `/${locale}/breeds`,
    },
    {
      label: t("sidebar.suit"),
      key: "7",
      icon: <BarsOutlined style={{ color: "purple" }} />,
      path: `/${locale}/suit`,
    },
    {
      label: t("sidebar.reports"),
      key: "8",
      icon: <BarsOutlined style={{ color: "purple" }} />,
      path: `/${locale}/reports`,
    },
  ];

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const activeKey = items.find((item) => pathname.startsWith(item.path))?.key;

  return (
    <Layout className="flex-none" style={{ minHeight: "100vh" }}>
      <Sider
        width={200}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="bg-white dark:bg-[#1f1f1f]"
      >
        <Menu
          className="dark:bg-[#1f1f1f]"
          selectedKeys={activeKey ? [activeKey] : []}
          mode="inline"
          items={items.map((item) => ({
            ...item,
            label: (
              <Link href={item.path} prefetch={false}>
                <span className="dark:text-white">{item.label}</span>
              </Link>
            ),
          }))}
        />
        <div className="w-full py-3 px-5">
          <Button className="w-full " danger href="" onClick={handleSignOut}>
            {t("sidebar.quit")}
          </Button>
        </div>
      </Sider>
    </Layout>
  );
};
