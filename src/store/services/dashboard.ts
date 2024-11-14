import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IDashboard,
  ILocality,
} from "@/store/models/interfaces/base.interfaces";
import { getSession } from "next-auth/react";

const API_URL = "https://almetico.university.kg/cattle-dev";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  tagTypes: ["dashboardApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getDashboard: builder.query<IDashboard[], string>({
      query: () => `/dashboard`,
      providesTags: ["dashboardApi"],
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
