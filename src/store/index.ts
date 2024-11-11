import { configureStore } from "@reduxjs/toolkit";
import { farmApi } from "./services/farmApi";
import { AuthSlice } from "./features/auth.slice";
import { localityApi } from "./services/localityApi";
import { personApi } from "./services/personApi";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    [farmApi.reducerPath]: farmApi.reducer,
    [localityApi.reducerPath]: localityApi.reducer,
    [personApi.reducerPath]: personApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      farmApi.middleware,
      localityApi.middleware,
      personApi.middleware,
    ]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
