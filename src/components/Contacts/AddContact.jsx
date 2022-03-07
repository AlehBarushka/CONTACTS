import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createContact, getGroups } from '../../slices/contactSlice';

import ContactForm from './ContactForm';
import Title from './Title';

const AddContact = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const groups = useSelector((state) => state.contactsData.groups);

	//use local state for ContactForm component
	const [contactFields] = useState({
		company: '',
		email: '',
		groupId: '',
		mobile: '',
		name: '',
		title: '',
	});

	//sending a request to receive all groups
	useEffect(() => {
		dispatch(getGroups());
	}, [dispatch]);

	//sending a create contact request and then redirect if request status 'OK'
	const onSubmitForm = async (values) => {
		dispatch(createContact(values)).then((response) => {
			if (!response?.error) {
				navigate('/contacts/list', { replace: true });
			} else {
				alert(response.payload);
				navigate('/contacts/add', { replace: false });
			}
		});
	};

	return (
		<>
			<Title textColor='text-success'>Create Contact</Title>
			<div className='container mt-3'>
				<div className='row'>
					<div className='col-md-4'>
						<ContactForm
							contactData={contactFields}
							groups={groups}
							onSubmitForm={onSubmitForm}
							btnColor='btn-success'
						>
							Add
						</ContactForm>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddContact;
