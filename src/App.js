import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/NavBar/Navbar';
import ContactList from './components/Contacts/ContactList';
import AddContact from './components/Contacts/AddContact';
import ViewContact from './components/Contacts/ViewContact';
import EditContact from './components/Contacts/EditContact';

import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Navigate to={'/contacts/list'} />} />
				<Route path='/contacts/list' element={<ContactList />} />
				<Route path='/contacts/add' element={<AddContact />} />
				<Route path='/contacts/veiw/:contactId' element={<ViewContact />} />
				<Route path='/contacts/edit/:contactId' element={<EditContact />} />
			</Routes>
		</>
	);
};

export default App;
