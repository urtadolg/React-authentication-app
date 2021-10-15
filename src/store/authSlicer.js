import { createSlice } from "@reduxjs/toolkit";

import Auth from "../pages/Auth";

const defaultState = {
  idToken: localStorage.getItem("token"),
  isLoggedIn: !!localStorage.getItem("token"),
  isCreating: false,
  isLoadingRequest: false,
};

const AuthSlicer = createSlice({
  name: Auth,
  initialState: defaultState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.idToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
    },
    login(state, action) {
      state.isLoggedIn = true;
      state.idToken = action.payload.idToken;
      localStorage.setItem("token", state.idToken);
      localStorage.setItem("expirationDate", action.payload.expiresTime);
    },
    enterSignUp(state) {
      state.isCreating = true;
    },
    leavingSignUp(state) {
      state.isCreating = false;
    },
    startLoading(state) {
      state.isLoadingRequest = true;
    },
    stopLoading(state) {
      state.isLoadingRequest = false;
    },
  },
});

export const AuthActions = AuthSlicer.actions;
export default AuthSlicer.reducer;
