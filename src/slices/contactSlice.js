import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firebaseDB } from '../firebase/db';

//actions
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

//slice
const contactsDataSlice = createSlice({
	name: 'contactsData',
	initialState: {
		isLoading: false,
		error: null,
		currentContact: {},
		currentGroup: {},
		contacts: [],
		groups: [],
	},
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
