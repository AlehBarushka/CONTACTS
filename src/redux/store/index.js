import { configureStore } from '@reduxjs/toolkit';

import contactReducer from '../slices/contactsSlice';
import authReducer from '../slices/authSlice';

const store = configureStore({
  reducer: {
    contactsData: contactReducer,
    authData: authReducer,
  },
});

export default store;
