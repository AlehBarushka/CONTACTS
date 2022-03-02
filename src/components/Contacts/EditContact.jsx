import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ContactService } from '../../services/ContactService';
import userImg from '../../assets/user.png';
import Preloader from '../../common/Preloader';
import ContactForm from './ContactForm';

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

	const { isLoading, groups } = state;

	return (
		<>
			<section className='edit-contact-info p-3'>
				<div className='container'>
					<div className='row'>
						<div className='col'>
							<p className='h4 text-warning fw-bold'>Edit Contact</p>
							<p className='fst-italic'>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit.
								Officiis hic deleniti illo necessitatibus odit facere
								accusantium et provident esse error, magnam sit, harum modi
								saepe, quisquam repudiandae placeat autem impedit.
							</p>
						</div>
					</div>
				</div>
			</section>
			{isLoading ? (
				<Preloader />
			) : (
				<section className='edit-contact mt-3'>
					<div className='container'>
						<div className='row align-items-center'>
							<div className='col-md-4'>
								<ContactForm
									onSubmitForm={onSubmitForm}
									groups={groups}
									btnColor='btn-primary'
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
				</section>
			)}
		</>
	);
};

export default EditContact;
