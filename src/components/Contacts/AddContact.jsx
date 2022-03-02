import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactService } from '../../services/ContactService';
import ContactForm from './ContactForm';

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

	const { groups } = state;

	return (
		<>
			<section className='add-contact p-3'>
				<div className='container'>
					<div className='row'>
						<div className='col'>
							<p className='h4 text-success fw-bold'>Create Contact</p>
							<p className='fst-italic'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
								Officiis hic deleniti illo necessitatibus odit facere
								accusantium et provident esse error, magnam sit, harum modi
								saepe, quisquam repudiandae placeat autem impedit.
							</p>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-4'>
							<ContactForm
								groups={groups}
								onSubmitForm={onSubmitForm}
								btnColor='btn-success'
							>
								Add
							</ContactForm>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default AddContact;
