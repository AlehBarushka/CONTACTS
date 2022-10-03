import { createAsyncThunk } from '@reduxjs/toolkit';

import { firebaseAuth } from '../../services/firebase/auth';

export const signUp = createAsyncThunk(
  'authData/signUp',
  async ({ email, password, userName }, { rejectWithValue }) => {
    try {
      const resData = await firebaseAuth.registerNewUser(
        email,
        password,
        userName
      );

      return resData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'authData/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const resData = await firebaseAuth.logIn(email, password);

      return resData;
    } catch ({ code }) {
      return rejectWithValue(code);
    }
  }
);

export const logout = createAsyncThunk(
  'authData/logout',
  async (_, { rejectWithValue }) => {
    try {
      await firebaseAuth.logOut();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
