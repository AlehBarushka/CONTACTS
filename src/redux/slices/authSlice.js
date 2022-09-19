import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { firebaseAuth } from '../../services/firebase/auth';

//actions
export const signUp = createAsyncThunk('authData/signUp', async (payload, { rejectWithValue }) => {
  const { email, password, userName } = payload;
  try {
    const resData = await firebaseAuth.registerNewUser(email, password, userName);
    return resData;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logIn = createAsyncThunk('authData/logIn', async (payload, { rejectWithValue }) => {
  const { email, password } = payload;
  try {
    const resData = await firebaseAuth.logIn(email, password);
    return resData;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk('authData/logOut', async (_, { rejectWithValue }) => {
  try {
    await firebaseAuth.logOut();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

//slice
const authSlice = createSlice({
  name: 'authData',
  initialState: {
    isLoading: false,
    isAuth: false,
    error: null,
    currentUser: null,
  },
  reducers: {
    setCurrentUser(state, { payload }) {
      state.isAuth = true;
      state.error = null;
      state.currentUser = payload;
    },
  },
  extraReducers: {
    [signUp.pending]: state => {
      state.isLoading = true;
    },
    [signUp.fulfilled]: state => {
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
    [logIn.pending]: state => {
      state.isLoading = true;
    },
    [logIn.fulfilled]: state => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = null;
    },
    [logIn.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.currentUser = null;
      state.error = payload;
    },
    [logOut.fulfilled]: state => {
      state.isAuth = false;
      state.error = null;
      state.currentUser = null;
    },
    [logOut.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setCurrentUser, setCurrentUserFail } = authSlice.actions;
export default authSlice.reducer;
