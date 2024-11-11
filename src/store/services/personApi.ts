import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { IPerson } from "../models/interfaces/person.interfaces";

const API_URL = "https://almetico.university.kg/cattle-dev";

export const personApi = createApi({
  reducerPath: "personApi",
  tagTypes: ["person"],
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
    getPerson: builder.query<IPerson[], string>({
      query: () => `/person`,
      providesTags: ["person"],
    }),
    updatePerson: builder.mutation<IPerson, any>({
      query: ({ id, body }) => ({
        url: `/person/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["person"],
    }),
    getPersonById: builder.query<IPerson, string>({
      query: (id) => ({
        url: `/person/${id}`,
      }),
      providesTags: ["person"],
    }),
  }),
});

export const {
  useGetPersonQuery,
  useGetPersonByIdQuery,

  useUpdatePersonMutation,
} = personApi;
