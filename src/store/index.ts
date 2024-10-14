import { configureStore } from "@reduxjs/toolkit";
import { farmApi } from "./services/farmApi";
import authReducer from "./features/auth.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [farmApi.reducerPath]: farmApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([farmApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
