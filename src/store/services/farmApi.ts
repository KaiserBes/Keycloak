import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const API_URL = "https://almetico.university.kg/cattle-dev";

const getAuthToken = async () => {
  const session = await getSession();
  return session?.access_token;
};

export const farmApi = createApi({
  reducerPath: "farmApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFarm: builder.query({
      query: () => "/farm",
    }),
  }),
});

export const { useGetFarmQuery } = farmApi;

getAuthToken().then((token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
});
