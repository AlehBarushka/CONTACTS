import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Preloader from '../../common/Preloader';
import { ContactService } from '../../services/ContactService';

const EditContact = () => {
	let { contactId } = useParams();
	const navigate = useNavigate();

	const [state, setState] = useState({
		isLoading: false,
		contact: {
			name: '',
			photo: '',
			mobile: '',
			email: '',
			company: '',
			title: '',
			groupId: '',
		},
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

	const updateInput = (e) => {
		setState({
			...state,
			contact: {
				...state.contact,
				[e.target.name]: e.target.value,
			},
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let response = await ContactService.updateContact(
				state.contact,
				contactId
			);
			if (response) {
				navigate('/contacts/list', { replace: true });
			}
		} catch (error) {
			setState({ ...state, isLoading: false, error: error.message });
			navigate(`/contacts/edit/${contactId}`, { replace: false });
		}
	};

	const { isLoading, contact, groups, error } = state;

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
								<form onSubmit={handleSubmit}>
									<div className='mb-2'>
										<input
											required={true}
											name='name'
											onChange={updateInput}
											value={contact.name}
											type='text'
											className='form-control'
											placeholder='Name'
										/>
									</div>
									<div className='mb-2'>
										<input
											name='photo'
											onChange={updateInput}
											value={contact.photo}
											type='text'
											className='form-control'
											placeholder='Photo URL'
										/>
									</div>
									<div className='mb-2'>
										<input
											name='mobile'
											onChange={updateInput}
											value={contact.mobile}
											type='number'
											className='form-control'
											placeholder='Mobile number'
										/>
									</div>
									<div className='mb-2'>
										<input
											name='email'
											onChange={updateInput}
											value={contact.email}
											type='email'
											className='form-control'
											placeholder='Email'
										/>
									</div>
									<div className='mb-2'>
										<input
											name='company'
											onChange={updateInput}
											value={contact.company}
											type='text'
											className='form-control'
											placeholder='Company'
										/>
									</div>
									<div className='mb-2'>
										<input
											name='title'
											onChange={updateInput}
											value={contact.title}
											type='text'
											className='form-control'
											placeholder='Title'
										/>
									</div>
									<div className='mb-2'>
										<select
											name='groupId'
											onChange={updateInput}
											value={contact.groupId}
											className='form-control'
										>
											<option value=''>Select a group</option>
											{groups.length > 0 &&
												groups.map((group) => {
													return (
														<option key={group.id} value={group.id}>
															{group.name}
														</option>
													);
												})}
										</select>
									</div>
									<div className='mb-2'>
										<button type='submit' className='btn btn-warning'>
											Update
										</button>
										<Link to={'/contacts/list'} className='btn btn-dark ms-2'>
											Close
										</Link>
									</div>
								</form>
							</div>
							<div className='col-md-6'>
								<img
									src='https://cdn-icons-png.flaticon.com/512/146/146031.png'
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
