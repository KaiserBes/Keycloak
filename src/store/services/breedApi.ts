import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { IBreed } from "../models/interfaces/breed.interfaces";

const API_URL = "https://almetico.university.kg/cattle-dev";

export const breedApi = createApi({
  reducerPath: "breedApi",
  tagTypes: ["breed"],
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
    getBreed: builder.query<IBreed[], string>({
      query: () => `/breed`,
      providesTags: ["breed"],
    }),
    getBreedById: builder.query<IBreed, any>({
      query: (id) => ({
        url: `/breed/${id}`,
      }),
      providesTags: ["breed"],
    }),
    createBreed: builder.mutation<IBreed, any>({
      query: (body) => ({
        url: "/breed",
        method: "POST",
        body,
      }),
      invalidatesTags: ["breed"],
    }),
    updateBreed: builder.mutation<void, any>({
      query: ({ id, ...suit }) => ({
        url: `/breed/${id}`,
        method: "PATCH",
        body: suit,
      }),
      invalidatesTags: ["breed"],
    }),
    deleteBreed: builder.mutation<void, any>({
      query: (id) => ({
        url: `/breed/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["breed"],
    }),
  }),
});

export const {
  useCreateBreedMutation,
  useDeleteBreedMutation,
  useGetBreedQuery,
  useGetBreedByIdQuery,
  useUpdateBreedMutation,
} = breedApi;
