import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type JWT = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

export type TAuth = {
  refreshedJwt: JWT | null;
  isReady: boolean;
};

const initialState: TAuth = {
  refreshedJwt: null,
  isReady: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleSession: (state, action: PayloadAction<JWT | null>) => {
      state.refreshedJwt = action.payload || null;
      state.isReady = !!action.payload;
    },

    updateToken: (state, action: PayloadAction<string>) => {
      if (state.refreshedJwt) {
        state.refreshedJwt.accessToken = action.payload;
      }
    },
  },
});

export const { toggleSession, updateToken } = AuthSlice.actions;

export default AuthSlice.reducer;
