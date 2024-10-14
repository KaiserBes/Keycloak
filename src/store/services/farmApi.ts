import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../index";
import { getSession } from "next-auth/react";

const API_URL = "https://almetico.university.kg/cattle";

export const farmApi = createApi({
  reducerPath: "farmApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();

      if (session?.access_token) {
        headers.set("Authorization", `Bearer ${session?.access_token}`);
      } else {
        console.warn("Токен не найден, запрос может вернуть 401");
      }
      p;

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFarmData: builder.query({
      query: () => "/farm",
    }),
  }),
});

export const { useGetFarmDataQuery } = farmApi;
