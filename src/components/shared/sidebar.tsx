"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
  const t = useTranslations();
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();

  const items = [
    {
      label: t("sidebar.dashboard"),
      key: "1",
      icon: <PieChartOutlined style={{ color: "purple" }} />,
      path: `/${locale}/dashboard`,
    },
    {
      label: t("sidebar.farm"),
      key: "2",
      icon: <DesktopOutlined style={{ color: "purple" }} />,
      path: `/${locale}/farm`,
    },
    {
      label: t("sidebar.pet"),
      key: "3",
      icon: <UserOutlined style={{ color: "purple" }} />,
      path: `/${locale}/pet`,
    },
    {
      label: t("sidebar.bulls"),
      key: "4",
      icon: <TeamOutlined style={{ color: "purple" }} />,
      path: `/${locale}/bulls`,
    },
    {
      label: t("sidebar.breeds"),
      key: "5",
      icon: <UserOutlined style={{ color: "purple" }} />,
      path: `/${locale}/breeds`,
    },
    {
      label: t("sidebar.suit"),
      key: "6",
      icon: <BarsOutlined style={{ color: "purple" }} />,
      path: `/${locale}/suit`,
    },
    {
      label: t("sidebar.reports"),
      key: "7",
      icon: <BarsOutlined style={{ color: "purple" }} />,
      path: `/${locale}/reports`,
    },
    {
      label: t("sidebar.quit"),
      key: "8",
      icon: <BarsOutlined style={{ color: "purple" }} />,
      path: `/${locale}/login`,
    },
  ];

  const activeKey = items.find((item) => pathname.startsWith(item.path))?.key;

  return (
    <Layout className="" style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="bg-white dark:bg-[#1f1f1f]"
      >
        <Menu
          className="dark:bg-[#1f1f1f] "
          selectedKeys={[activeKey]}
          mode="inline"
          items={items.map((item) => ({
            ...item,

            label: (
              <Link className="" href={item.path} passHref>
                <span className="dark:text-white">{item.label}</span>
              </Link>
            ),
          }))}
        />
      </Sider>
    </Layout>
  );
};
