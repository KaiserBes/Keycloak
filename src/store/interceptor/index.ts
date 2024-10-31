// import {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
//   fetchBaseQuery,
// } from "@reduxjs/toolkit/query";
// import { getSession, signOut } from "next-auth/react";

// import { toggleSession } from "../features/auth.slice";
// import { refreshAccessToken } from "@/app/api/auth/[...nextauth]/route";

// export const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? "",
//   prepareHeaders: async (headers) => {
//     const session = await getSession();
//     if (session?.access_token) {
//       headers.set("authorization", `Bearer ${session?.access_token}`);
//     }

//     return headers;
//   },
// });

// export const wrapperBaseQuery = (token: string) =>
//   fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? "",
//     prepareHeaders: async (headers) => {
//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   });

// export const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result.error && result.error.status === 401) {
//     const session = await getSession();
//     if (session) {
//       try {
//         const token = await refreshAccessToken(session, true);
//         api.dispatch(toggleSession(token));
//         const baseOnRefresh = wrapperBaseQuery(token.access_token);
//         result = await baseOnRefresh(args, api, extraOptions);
//       } catch (error) {
//         await signOut();
//         throw new Error("RefreshAccessTokenError");
//       }
//     }
//   }

//   return result;
// };
