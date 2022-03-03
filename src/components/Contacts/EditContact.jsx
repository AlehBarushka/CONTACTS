import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ContactService } from '../../services/ContactService';
import userImg from '../../assets/user.png';
import Preloader from '../../common/Preloader';
import ContactForm from './ContactForm';
import Title from './Title';

const EditContact = () => {
	let { contactId } = useParams();
	const navigate = useNavigate();

	const [state, setState] = useState({
		isLoading: false,
		contact: {},
		groups: [],
		error: '',
	});

	useEffect(() => {
		const getContact = async () => {
			try {
				setState({ ...state, isLoading: true });
				let response = await ContactService.getContact(contactId);
				let groupResponse = await ContactService.getAllGoups(response.data);
				setState({
					...state,
					isLoading: false,
					contact: response.data,
					groups: groupResponse.data,
				});
			} catch (error) {
				setState({ ...state, isLoading: false, error: error.message });
			}
		};
		getContact();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contactId]);

	const onSubmitForm = async (values) => {
		try {
			let response = await ContactService.updateContact(values, contactId);
			if (response) {
				navigate('/contacts/list', { replace: true });
			}
		} catch (error) {
			setState({ ...state, isLoading: false, error: error.message });
			navigate(`/contacts/edit/${contactId}`, { replace: false });
		}
	};

	const { isLoading, groups, contact } = state;

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
								contactData={contact}
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
