import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getSession } from "next-auth/react";
import { ISuit } from "../models/interfaces/base.interfaces";

const API_URL = "https://almetico.university.kg/cattle-dev";

export const suitApi = createApi({
  reducerPath: "suitApi",
  tagTypes: ["suitApi"],
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
    getSuit: builder.query<ISuit[], string>({
      query: () => `/suit`,
      providesTags: ["suitApi"],
    }),
    getSuitById: builder.query<ISuit, any>({
      query: (id) => ({
        url: `/suit/${id}`,
      }),
      providesTags: ["suitApi"],
    }),
    createSuit: builder.mutation<ISuit, any>({
      query: (body) => ({
        url: "/suit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["suitApi"],
    }),
    updateSuit: builder.mutation<void, any>({
      query: ({ id, ...suit }) => ({
        url: `/suit/${id}`,
        method: "PATCH",
        body: suit,
      }),
      invalidatesTags: ["suitApi"],
    }),
    deleteSuit: builder.mutation<void, any>({
      query: (id) => ({
        url: `/suit/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["suitApi"],
    }),
  }),
});

export const {
  useGetSuitQuery,
  useCreateSuitMutation,
  useDeleteSuitMutation,
  useGetSuitByIdQuery,
  useUpdateSuitMutation,
} = suitApi;
