import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContactService } from '../../services/ContactService';

import Preloader from '../../common/Preloader';
import userImg from '../../assets/user.png';

const ViewContact = () => {
	const { contactId } = useParams();

	const [state, setState] = useState({
		isLoading: false,
		contact: {},
		error: '',
		group: {},
	});

	useEffect(() => {
		const getContact = async () => {
			try {
				setState({ ...state, isLoading: true });
				let response = await ContactService.getContact(contactId);
				let groupResponse = await ContactService.getGroup(response.data);
				setState({
					...state,
					isLoading: false,
					contact: response.data,
					group: groupResponse.data,
				});
			} catch (error) {
				setState({ ...state, isLoading: false, error: error.message });
			}
		};
		getContact(contactId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contactId]);

	let { isLoading, contact, group } = state;

	return (
		<>
			<section className='veiw-contact p-3'>
				<div className='container'>
					<div className='row'>
						<div className='col'>
							<p className='h3 text-primary fw-bold'>Veiw Contact</p>
							<p className='fst-italic'>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit.
								Tenetur culpa alias harum dignissimos dolorum natus ullam, quam
								repellat. Obcaecati voluptatum minus dolores quasi veniam sunt
								quidem ipsa, neque architecto hic.
							</p>
						</div>
					</div>
				</div>
			</section>
			{isLoading ? (
				<Preloader />
			) : (
				Object.keys(contact).length > 0 &&
				Object.keys(group).length > 0 && (
					<section className='veiw-contact mt-3'>
						<div className='container'>
							<div className='row align-items-center'>
								<div className='col-md-4 d-flex justify-content-center'>
									<img
										src={userImg}
										alt={`${contact.name}'s avatar`}
										className='contact-img'
									/>
								</div>
								<div className='col-md-8'>
									<ul className='list-group'>
										<li className='list-group-item list-group-item-action'>
											Name:
											<span className='ms-1 fw-bold'>{contact.name}</span>
										</li>
										<li className='list-group-item list-group-item-action'>
											Mobile number:
											<span className='ms-1 fw-bold'>{contact.mobile}</span>
										</li>
										<li className='list-group-item list-group-item-action'>
											Email:
											<span className='ms-1 fw-bold'>{contact.email}</span>
										</li>
										<li className='list-group-item list-group-item-action'>
											Company:
											<span className='ms-1 fw-bold'>{contact.company}</span>
										</li>
										<li className='list-group-item list-group-item-action'>
											Title:
											<span className='ms-1 fw-bold'>{contact.title}</span>
										</li>
										<li className='list-group-item list-group-item-action'>
											Group: <span className='ms-1 fw-bold'>{group.name}</span>
										</li>
									</ul>
								</div>
							</div>
							<div className='row'>
								<div className='col'>
									<Link to={'/contacts/list'} className='btn btn-primary'>
										Back
									</Link>
								</div>
							</div>
						</div>
					</section>
				)
			)}
		</>
	);
};

export default ViewContact;
