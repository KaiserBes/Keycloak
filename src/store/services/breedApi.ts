import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILocality } from "@/store/models/interfaces/base.interfaces";
import { getSession } from "next-auth/react";
import { IBreed } from "../models/interfaces/breed.interfaces";

const API_URL = "https://almetico.university.kg/cattle-dev";

export const breedApi = createApi({
  reducerPath: "breedApi",
  tagTypes: ["breedApi"],
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
      query: (searchQuery = "") => `/breed?value_like=${searchQuery}`,
      providesTags: ["breedApi"],
    }),
  }),
});

export const { useGetBreedQuery } = breedApi;
