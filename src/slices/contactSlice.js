import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ContactService } from '../services/ContactService';

//action
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

// export const deleteContact = createAsyncThunk(
// 	'DELETE_CONTACT',
// 	async (payload, { rejectWithValue }) => {
// 		try {
// 			const response = await ContactService.deleteContact(payload);
// 			return response;
// 		} catch (error) {
// 			if (!error.response) {
// 				throw error;
// 			}
// 			return rejectWithValue(error.response);
// 		}
// 	}
// );

//slice
const contactsDataSlice = createSlice({
	name: 'contactsData',
	initialState: { isLoading: false, error: null, contacts: [] },
	extraReducers: {
		[getContacts.pending]: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		[getContacts.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.contacts = action.payload;
		},
		[getContacts.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export default contactsDataSlice.reducer;
