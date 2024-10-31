import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILocality } from "@/store/models/interfaces/base.interfaces";
import { getSession } from "next-auth/react";

const API_URL = "https://almetico.university.kg/cattle-dev";

export const localityApi = createApi({
  reducerPath: "localityApi",
  tagTypes: ["locality"],
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
    getLocality: builder.query<ILocality[], string>({
      query: (searchQuery = "") => `/locality?value_like=${searchQuery}`,
      providesTags: ["locality"],
    }),
  }),
});

export const { useGetLocalityQuery } = localityApi;
