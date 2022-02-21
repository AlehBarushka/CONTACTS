import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContactService } from '../../services/ContactService';

const AddContact = () => {
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
			let response = await ContactService.createContact(state.contact);
			if (response) {
				navigate('/contacts/list', { replace: true });
			}
		} catch (error) {
			setState({ ...state, isLoading: false, error: error.message });
			navigate('/contacts/add', { replace: false });
		}
	};

	const { isLoading, contact, groups, error } = state;

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
							<form onSubmit={handleSubmit}>
								<div className='mb-2'>
									<input
										name='name'
										required={true}
										value={contact.name}
										onChange={updateInput}
										type='text'
										className='form-control'
										placeholder='Name'
									/>
								</div>
								<div className='mb-2'>
									<input
										name='photo'
										value={contact.photo}
										onChange={updateInput}
										type='text'
										className='form-control'
										placeholder='Photo URL'
									/>
								</div>
								<div className='mb-2'>
									<input
										name='mobile'
										required={true}
										value={contact.mobile}
										onChange={updateInput}
										type='number'
										className='form-control'
										placeholder='Mobile number'
									/>
								</div>
								<div className='mb-2'>
									<input
										name='email'
										required={true}
										value={contact.email}
										onChange={updateInput}
										type='email'
										className='form-control'
										placeholder='Email'
									/>
								</div>
								<div className='mb-2'>
									<input
										name='company'
										required={true}
										value={contact.company}
										onChange={updateInput}
										type='text'
										className='form-control'
										placeholder='Company'
									/>
								</div>
								<div className='mb-2'>
									<input
										name='title'
										required={true}
										value={contact.title}
										onChange={updateInput}
										type='text'
										className='form-control'
										placeholder='Title'
									/>
								</div>
								<div className='mb-2'>
									<select
										name='groupId'
										required={true}
										value={contact.groupId}
										onChange={updateInput}
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
									<button type='submit' className='btn btn-success'>
										Add
									</button>
									<Link to={'/contacts/list'} className='btn btn-dark ms-2'>
										Close
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default AddContact;
