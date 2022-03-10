import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { setCurrentUser } from './slices/authSlice';

import Navbar from './components/NavBar/Navbar';
import ContactList from './components/Contacts/ContactList';
import AddContact from './components/Contacts/AddContact';
import ViewContact from './components/Contacts/ViewContact';
import EditContact from './components/Contacts/EditContact';

import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const currentUser = {
					uId: user.uid,
					userName: user.displayName,
					email: user.email,
				};
				dispatch(setCurrentUser(currentUser));
			}
		});
	}, [dispatch]);

	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Navigate to={'/contacts/list'} />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/contacts/list' element={<ContactList />} />
				<Route path='/contacts/add' element={<AddContact />} />
				<Route path='/contacts/veiw/:contactId' element={<ViewContact />} />
				<Route path='/contacts/edit/:contactId' element={<EditContact />} />
			</Routes>
		</>
	);
};

export default App;
