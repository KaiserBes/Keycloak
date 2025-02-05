import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import {
  IDocsListByStatementId,
  IPet,
} from "../models/interfaces/pet.interfaces";

const API_URL = "https://almetico.university.kg/cattle-dev";

export const petApi = createApi({
  reducerPath: "petApi",
  tagTypes: ["pet"],
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
    getPet: builder.query<IPet[], { farmId?: number; title?: string }>({
      query: ({ farmId, title } = {}) => {
        const params = new URLSearchParams();
        if (farmId) params.append("farmId", farmId.toString());
        if (title) params.append("title_like", title);

        return `/pet?${params.toString()}`;
      },
      providesTags: ["pet"],
    }),
    getPetById: builder.query<IPet, any>({
      query: (id) => ({
        url: `/pet/${id}`,
      }),
      providesTags: ["pet"],
    }),
    addPet: builder.mutation<void, any>({
      query: (body) => ({
        url: "/pet",
        method: "POST",
        body,
      }),
      invalidatesTags: ["pet"],
    }),
    updatePet: builder.mutation<void, any>({
      query: ({ id, ...pet }) => ({
        url: `/pet/${id}`,
        method: "PATCH",
        body: pet,
      }),
      invalidatesTags: ["pet"],
    }),
    getDocsByStatementId: builder.query<IDocsListByStatementId[], string>({
      query: (petPdfId) => ({
        url: `/pet/${petPdfId}/preview`,
      }),
    }),
    deletePet: builder.mutation<void, any>({
      query: (id) => ({
        url: `/pet/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["pet"],
    }),
  }),
});

export const {
  useAddPetMutation,
  useGetPetQuery,
  useGetPetByIdQuery,

  useDeletePetMutation,
  useUpdatePetMutation,
  useGetDocsByStatementIdQuery,
} = petApi;
