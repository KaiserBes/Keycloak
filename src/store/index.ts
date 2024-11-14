import { configureStore } from "@reduxjs/toolkit";
import { farmApi } from "./services/farmApi";
import { AuthSlice } from "./features/auth.slice";
import { localityApi } from "./services/localityApi";
import { personApi } from "./services/personApi";
import { petApi } from "./services/petApi";
import { dashboardApi } from "./services/dashboard";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    [farmApi.reducerPath]: farmApi.reducer,
    [localityApi.reducerPath]: localityApi.reducer,
    [personApi.reducerPath]: personApi.reducer,
    [petApi.reducerPath]: petApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      farmApi.middleware,
      localityApi.middleware,
      personApi.middleware,
      petApi.middleware,
      dashboardApi.middleware,
    ]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
