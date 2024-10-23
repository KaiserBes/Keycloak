import { configureStore } from "@reduxjs/toolkit";
import { farmApi } from "./services/farmApi";
import { AuthSlice } from "./features/auth.slice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    [farmApi.reducerPath]: farmApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([farmApi.middleware]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
