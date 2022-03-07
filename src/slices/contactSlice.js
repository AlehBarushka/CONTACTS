import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ContactService } from '../services/ContactService';

//actions
export const getContacts = createAsyncThunk(
	'contactsData/getContacts',
	async (_, { rejectWithValue }) => {
		try {
			const response = await ContactService.getAllContacts();
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getContact = createAsyncThunk(
	'contactsData/getContact',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await ContactService.getContact(payload);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const createContact = createAsyncThunk(
	'contactsData/createContact',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await ContactService.createContact(payload);
			return response.data;
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
			const response = await ContactService.updateContact(values, contactId);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteContact = createAsyncThunk(
	'contactsData/deleteContact',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await ContactService.deleteContact(payload);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const getGroups = createAsyncThunk(
	'contactsData/getGroups',
	async (_, { rejectWithValue }) => {
		try {
			const response = await ContactService.getAllGoups();
			return response.data;
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
		contacts: [],
		groups: [],
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

export default contactsDataSlice.reducer;
