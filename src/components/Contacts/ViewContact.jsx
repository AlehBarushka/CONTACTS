import React from 'react';
import { Link } from 'react-router-dom';

const ViewContact = () => {
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
			<section className='veiw-contact mt-3'>
				<div className='container'>
					<div className='row align-items-center'>
						<div className='col-md-4'>
							<img
								src='http://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png'
								alt={`name of current contact`}
								className='contact-img'
							/>
						</div>
						<div className='col-md-8'>
							<ul className='list-group'>
								<li className='list-group-item list-group-item-action'>
									Name: <span className='fw-bold'>Aleh</span>
								</li>
								<li className='list-group-item list-group-item-action'>
									Mobile number:
									<span className='fw-bold'>+375336720627</span>
								</li>
								<li className='list-group-item list-group-item-action'>
									Email: <span className='fw-bold'>Aleh@gmail.com</span>
								</li>
								<li className='list-group-item list-group-item-action'>
									Company: <span className='fw-bold'>Apple</span>
								</li>
								<li className='list-group-item list-group-item-action'>
									Title: <span className='fw-bold'>Aleh@gmail.com</span>
								</li>
								<li className='list-group-item list-group-item-action'>
									Group: <span className='fw-bold'>Aleh@gmail.com</span>
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
		</>
	);
};

export default ViewContact;
