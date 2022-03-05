import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
	faEye,
	faPen,
	faTrash,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userImg from '../../assets/user.png';
import Preloader from '../../common/Preloader';
import Title from './Title';
import SearchInput from './SearchInput';
import { deleteContact, getContacts } from '../../slices/contactSlice';

const ContactList = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.contactsData);

	useEffect(() => {
		dispatch(getContacts());
	}, [dispatch]);

	const handleDelete = async (contactId) => {
		dispatch(deleteContact(contactId)).then((response) => {
			if (response) {
				dispatch(getContacts());
			}
		});
	};

	let { isLoading, contacts } = state;

	return (
		<>
			<Title textColor='text-dark'>
				Contact Manager
				<Link to={'/contacts/add'} className='btn btn-success ms-2'>
					<FontAwesomeIcon icon={faPlus} className='me-1' />
					New
				</Link>
			</Title>
			<SearchInput />
			{isLoading ? (
				<Preloader />
			) : (
				<div className='container'>
					<div className='row'>
						{contacts.length > 0 &&
							contacts.map((contact) => {
								return (
									<div className='col-md-6' key={contact.id}>
										<div className='card my-2'>
											<div className='card-body'>
												<div className='row align-items-center d-flex justify-content-around'>
													<div className='col-md-4'>
														<img
															className='contact-img'
															src={userImg}
															alt={`${contact.name}'s avatar`}
														/>
													</div>
													<div className='col-md-7'>
														<ul className='list-group'>
															<li className='list-group-item list-group-item-action'>
																Name:
																<span className='ms-1 fw-bold'>
																	{contact.name}
																</span>
															</li>
															<li className='list-group-item list-group-item-action'>
																Mobile number:
																<span className='ms-1 fw-bold'>
																	{contact.mobile}
																</span>
															</li>
															<li className='list-group-item list-group-item-action'>
																Email:
																<span className='ms-1 fw-bold'>
																	{contact.email}
																</span>
															</li>
														</ul>
													</div>
													<div className='col-md-1 d-flex flex-column align-items-center'>
														<Link
															to={`/contacts/veiw/${contact.id}`}
															className='btn btn-primary my-1'
														>
															<FontAwesomeIcon icon={faEye} />
														</Link>
														<Link
															to={`/contacts/edit/${contact.id}`}
															className='btn btn-warning my-1'
														>
															<FontAwesomeIcon icon={faPen} />
														</Link>
														<button
															onClick={() => handleDelete(contact.id)}
															className='btn btn-danger my-1'
														>
															<FontAwesomeIcon icon={faTrash} />
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			)}
		</>
	);
};

export default ContactList;
