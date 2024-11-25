import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getSession } from "next-auth/react";
import { ICountry } from "../models/interfaces/base.interfaces";

const API_URL = "https://almetico.university.kg/cattle-dev";

export const countryApi = createApi({
  reducerPath: "countryApi",
  tagTypes: ["countryApi"],
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
    getCountry: builder.query<ICountry[], string>({
      query: (searchQuery = "") => `/country?title_like=${searchQuery}`,
      providesTags: ["countryApi"],
    }),
  }),
});

export const { useGetCountryQuery } = countryApi;
