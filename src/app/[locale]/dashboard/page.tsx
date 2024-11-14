"use client";

import { useGetDashboardQuery } from "@/store/services/dashboard";
import { Spin } from "antd";

export default function DashboardPage() {
  const { data: dashboardData, isFetching } = useGetDashboardQuery("");

  const sortedData = dashboardData
    ? [...dashboardData].sort((a, b) => b.count - a.count)
    : [];

  const maxCount = sortedData.length > 0 ? sortedData[0].count : 1;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <div className="w-full p-4">
          <div className="bg-gray-100 dark:bg-black mx-auto p-4">
            {isFetching ? (
              <div className="w-full h-screen flex justify-center items-center">
                <Spin />
              </div>
            ) : (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Топ районов по активности
                </h2>
                <ul className="space-y-2">
                  {sortedData.map((item, index) => (
                    <li key={index} className="flex items-center ">
                      <span className="font-medium w-1/4">{item.type}</span>
                      <div
                        className="bg-blue-400 h-1 rounded"
                        style={{ width: `${(item.count / maxCount) * 60}%` }}
                      />
                      <span className="text-lg font-semibold ml-4">
                        {item.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
