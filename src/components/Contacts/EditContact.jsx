import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getContact,
	getGroups,
	updateContact,
} from '../../slices/contactSlice';

import userImg from '../../assets/user.png';
import Preloader from '../../common/Preloader';
import ContactForm from './ContactForm';
import Title from './Title';

const EditContact = () => {
	let { contactId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const state = useSelector((state) => state.contactsData);

	//sending a requests to receive current contact by ID and all groups
	useEffect(() => {
		dispatch(getContact(contactId)).then(() => {
			dispatch(getGroups());
		});
	}, [dispatch, contactId]);

	//sending a updating contact request and then redirect if request status 'OK'
	const onSubmitForm = async (values) => {
		const payload = { values, contactId };
		dispatch(updateContact(payload)).then((response) => {
			if (!response?.error) {
				navigate('/contacts/list', { replace: true });
			} else {
				alert(response.payload);
				navigate(`/contacts/edit/${contactId}`, { replace: false });
			}
		});
	};

	const { isLoading, groups, currentContact } = state;

	return (
		<>
			<Title textColor='text-warning'>Edit Contact</Title>
			{isLoading ? (
				<Preloader />
			) : (
				<div className='container mt-3'>
					<div className='row align-items-center'>
						<div className='col-md-4'>
							<ContactForm
								contactData={currentContact}
								onSubmitForm={onSubmitForm}
								groups={groups}
								btnColor='btn-warning'
							>
								Edit
							</ContactForm>
						</div>
						<div className='col-md-6'>
							<img
								src={userImg}
								alt={`name of current contact`}
								className='contact-img'
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default EditContact;
