import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import {
  IFarm,
  IFarmByState,
  IReassignFields,
} from "../models/interfaces/farm.interfaces";
import { IPageable } from "../models/interfaces/general.interfaces";

const API_URL = "https://almetico.university.kg/cattle-dev";

export const farmApi = createApi({
  reducerPath: "farmApi",
  tagTypes: ["farms"],
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
    getFarms: builder.query<IPageable<IFarm>, any>({
      query: (params) => ({
        url: "/farm",
        params,
      }),
      providesTags: ["farms"],
    }),
    getFarmById: builder.query<IFarmByState, any>({
      query: (id) => ({
        url: `/farm/${id}`,
      }),
      providesTags: ["farms"],
    }),
    reAssignPerformer: builder.mutation<
      void,
      { body: IReassignFields; farmId: string }
    >({
      query: ({ body, farmId }) => ({
        url: `/farm/${farmId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["farms"],
    }),
    createFarm: builder.mutation<void, any>({
      query: (body) => ({
        url: "/farm",
        method: "POST",
        body,
      }),
      invalidatesTags: ["farms"],
    }),
    updateFarm: builder.mutation<void, any>({
      query: ({ id, ...farm }) => ({
        url: `/farm/${id}`,
        method: "PATCH",
        body: farm,
      }),
      invalidatesTags: ["farms"],
    }),
    deleteFarm: builder.mutation<void, any>({
      query: (id) => ({
        url: `/farm/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["farms"],
    }),
  }),
});

export const {
  useGetFarmsQuery,
  useGetFarmByIdQuery,

  useReAssignPerformerMutation,
  useDeleteFarmMutation,
  useUpdateFarmMutation,
  useCreateFarmMutation,
} = farmApi;
