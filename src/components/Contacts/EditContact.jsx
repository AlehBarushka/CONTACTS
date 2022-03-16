import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteCurrentContact,
	getContact,
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

	//sending a request to receive current contact by id
	useEffect(() => {
		dispatch(getContact(contactId));
		//after unmounting
		return () => {
			dispatch(deleteCurrentContact());
		};
	}, [dispatch, contactId]);

	const onSubmitForm = async (values) => {
		dispatch(updateContact({ values, contactId })).then(({ meta }) => {
			if (meta.requestStatus === 'fulfilled') {
				navigate('/contacts/list', { replace: true });
			}
		});
	};

	const { isLoading, groups, currentContact, currentGroup } = state;

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
								currentGroup={currentGroup}
								btnColor='warning'
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
