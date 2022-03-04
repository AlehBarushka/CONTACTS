import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../slices/contactSlice';

const store = configureStore({
	reducer: {
		contactsData: contactReducer,
	},
});

export default store;
