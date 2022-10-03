import { createSlice } from '@reduxjs/toolkit';

import { signUp, login, logout } from '../actions/auth';

const initialState = {
  isLoading: false,
  isAuth: false,
  error: null,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'authData',
  initialState: initialState,
  reducers: {
    setCurrentUser(state, { payload }) {
      state.isAuth = true;
      state.error = null;
      state.currentUser = payload;
    },
  },
  extraReducers: {
    [signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [signUp.fulfilled]: (state) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = null;
    },
    [signUp.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.currentUser = null;
      state.error = payload;
    },
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = null;
    },
    [login.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.currentUser = null;
      state.error = payload;
    },
    [logout.fulfilled]: (state) => {
      state.isAuth = false;
      state.error = null;
      state.currentUser = null;
    },
    [logout.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
