import { createSlice } from '@reduxjs/toolkit';

import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  getGroups,
  updateContact,
} from '../actions/contacts';

const initialState = {
  isLoading: false,
  error: null,
  currentContact: {},
  currentGroup: {},
  contacts: [],
  groups: [],
};

const contactsDataSlice = createSlice({
  name: 'contactsData',
  initialState: initialState,
  reducers: {
    deleteCurrentContact(state) {
      state.currentContact = {};
    },
    addCurrentGroup(state, { payload }) {
      state.groups.forEach((group) => {
        if (group.id === payload) {
          state.currentGroup = group;
        }
      });
    },
    deleteCurrentGroup(state) {
      state.currentGroup = {};
    },
  },
  extraReducers: {
    [getContacts.pending]: (state) => {
      state.isLoading = true;
    },
    [getContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.contacts = action.payload;
    },
    [getContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getContact.pending]: (state) => {
      state.isLoading = true;
    },
    [getContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentContact = action.payload;
    },
    [getContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getGroups.pending]: (state) => {
      state.isLoading = true;
    },
    [getGroups.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.groups = action.payload;
    },
    [getGroups.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createContact.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [updateContact.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteContact.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { deleteCurrentContact, addCurrentGroup, deleteCurrentGroup } =
  contactsDataSlice.actions;

export default contactsDataSlice.reducer;
