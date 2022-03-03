import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactService } from '../../services/ContactService';
import ContactForm from './ContactForm';
import Title from './Title';

const AddContact = () => {
	const [state, setState] = useState({
		isLoading: false,
		contact: {},
		groups: [],
		error: '',
	});

	const navigate = useNavigate();

	useEffect(() => {
		const getAllGoups = async () => {
			try {
				setState({ ...state, isLoading: true });
				let response = await ContactService.getAllGoups();
				setState({ ...state, isLoading: false, groups: response.data });
			} catch (error) {
				setState({ ...state, isLoading: false, error: error.message });
			}
		};
		getAllGoups();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmitForm = async (values) => {
		try {
			let response = await ContactService.createContact(values);
			if (response) {
				navigate('/contacts/list', { replace: true });
			}
		} catch (error) {
			setState({ ...state, isLoading: false, error: error.message });
			navigate('/contacts/add', { replace: false });
		}
	};

	const { groups, contact } = state;

	return (
		<>
			<Title textColor='text-success'>Create Contact</Title>
			<div className='container mt-3'>
				<div className='row'>
					<div className='col-md-4'>
						<ContactForm
							contactData={contact}
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
