import { createAsyncThunk } from '@reduxjs/toolkit';

import { firebaseDB } from '../../services/firebase/db';

export const getContacts = createAsyncThunk(
  'contactsData/getContacts',
  async (_, { rejectWithValue }) => {
    try {
      const resData = await firebaseDB.getContacts();
      return resData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getContact = createAsyncThunk(
  'contactsData/getContact',
  async (payload, { rejectWithValue }) => {
    try {
      const resData = await firebaseDB.getContact(payload);
      return resData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createContact = createAsyncThunk(
  'contactsData/createContact',
  async (payload, { rejectWithValue }) => {
    try {
      await firebaseDB.addContact(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contactsData/updateContact',
  async (payload, { rejectWithValue }) => {
    const { values, contactId } = payload;
    try {
      await firebaseDB.updateContact(contactId, values);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contactsData/deleteContact',
  async (payload, { rejectWithValue }) => {
    try {
      await firebaseDB.deleteContact(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getGroups = createAsyncThunk(
  'contactsData/getGroups',
  async (_, { rejectWithValue }) => {
    try {
      const resData = await firebaseDB.getGroups();
      return resData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
