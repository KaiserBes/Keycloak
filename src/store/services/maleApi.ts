import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const API_URL = "https://almetico.university.kg/cattle-dev";

export const maleApi = createApi({
  reducerPath: "maleApi",
  tagTypes: ["male"],
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
    getMale: builder.query<IMale[], any>({
      query: () => `/male`,
      providesTags: ["male"],
    }),
    getMaleById: builder.query<IMale, any>({
      query: (id) => ({
        url: `/male/${id}`,
      }),
      providesTags: ["male"],
    }),
    updateMale: builder.mutation<IMale, any>({
      query: ({ id, body }) => ({
        url: `/male/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["male"],
    }),
    createMale: builder.mutation<IMale, any>({
      query: (body) => ({
        url: "/male",
        method: "POST",
        body,
      }),
      invalidatesTags: ["male"],
    }),
  }),
});

export const {
  useGetMaleQuery,
  useGetMaleByIdQuery,

  useCreateMaleMutation,
  useUpdateMaleMutation,
} = maleApi;
