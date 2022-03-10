import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firebaseAuth } from '../services/firebase';

//actions
export const signUp = createAsyncThunk(
	'authData/signUp',
	async (payload, { rejectWithValue }) => {
		const { email, password, userName } = payload;
		try {
			const resData = await firebaseAuth.registerNewUser(email, password);
			// add username
			await firebaseAuth.updateUserName(userName);
			const user = {
				uId: resData.user.uid,
				userName: resData.user.displayName,
				email: resData.user.email,
			};
			//return serializable values
			return user;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const logIn = createAsyncThunk(
	'authData/logIn',
	async (payload, { rejectWithValue }) => {
		const { email, password } = payload;
		try {
			const resData = await firebaseAuth.logIn(email, password);
			const user = {
				uId: resData.user.uid,
				userName: resData.user.displayName,
				email: resData.user.email,
			};
			//return serializable values
			return user;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

//slice
const authSlice = createSlice({
	name: 'authData',
	initialState: {
		isLoading: false,
		isAuth: false,
		error: null,
		currentUser: null,
	},
	extraReducers: {
		[signUp.pending]: (state) => {
			state.isLoading = true;
		},
		[signUp.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.isAuth = true;
			state.error = null;
			state.currentUser = payload;
		},
		[signUp.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.isAuth = false;
			state.currentUser = null;
			state.error = payload;
		},
		[logIn.pending]: (state) => {
			state.isLoading = true;
		},
		[logIn.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.isAuth = true;
			state.error = null;
			state.currentUser = payload;
		},
		[logIn.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.isAuth = false;
			state.currentUser = null;
			state.error = payload;
		},
	},
});

export default authSlice.reducer;
