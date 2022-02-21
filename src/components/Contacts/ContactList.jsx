import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
	faEye,
	faPen,
	faPlus,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContactService } from '../../services/ContactService';
import Preloader from '../../common/Preloader';

const ContactList = () => {
	const [state, setState] = useState({
		isLoading: false,
		contacts: [],
		error: '',
	});

	useEffect(() => {
		const getAllContacts = async () => {
			try {
				setState({ ...state, isLoading: true });
				let response = await ContactService.getAllContacts();
				setState({ ...state, isLoading: false, contacts: response.data });
			} catch (error) {
				setState({ ...state, isLoading: false, error: error.message });
			}
		};
		getAllContacts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let { isLoading, contacts, error } = state;

	return (
		<>
			<section className='contact-search p-3'>
				<div className='container'>
					<div className='grid'>
						<div className='row'>
							<div className='col'>
								<p className='h3'>
									Contact Manager
									<Link to={'/contacts/add'} className='btn btn-success ms-2'>
										<FontAwesomeIcon icon={faPlus} className='me-1' />
										New
									</Link>
								</p>
								<p className='fst-italic'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
									laboriosam veritatis laudantium non saepe, voluptatum tenetur
									at numquam id mollitia dolorem in deserunt, aspernatur
									voluptatem provident architecto iste eos expedita!
								</p>
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6'>
								{/* use fomrik */}
								<form className='row'>
									<div className='col'>
										<div className='mb-2'>
											<input
												type='text'
												className='form-control'
												placeholder='Search names...'
											/>
										</div>
									</div>
									<div className='col'>
										<div className='mb-2'>
											<button className='btn btn-outline-dark'>Seacrh</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			{isLoading ? (
				<Preloader />
			) : (
				<section className='contact-list'>
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
																src={contact.photo}
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
																to={`/contacts/edit/:contactId`}
																className='btn btn-warning my-1'
															>
																<FontAwesomeIcon icon={faPen} />
															</Link>
															<button className='btn btn-danger my-1'>
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
				</section>
			)}
		</>
	);
};

export default ContactList;
