import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

const ContactForm = (props) => {
	const { onSubmitForm, groups, btnColor, contactData } = props;

	const formik = useFormik({
		initialValues: {
			name: contactData.name,
			mobile: contactData.mobile,
			email: contactData.email,
			company: contactData.company,
			title: contactData.title,
			groupId: contactData.groupId,
		},
		onSubmit: onSubmitForm,
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<div className='mb-2'>
				<input
					name='name'
					value={formik.values.name}
					onChange={formik.handleChange}
					type='text'
					className='form-control'
					placeholder='Name'
				/>
			</div>
			<div className='mb-2'>
				<input
					name='mobile'
					value={formik.values.mobile}
					onChange={formik.handleChange}
					type='number'
					className='form-control'
					placeholder='Mobile number'
				/>
			</div>
			<div className='mb-2'>
				<input
					name='email'
					value={formik.values.email}
					onChange={formik.handleChange}
					type='email'
					className='form-control'
					placeholder='Email'
				/>
			</div>
			<div className='mb-2'>
				<input
					name='company'
					value={formik.values.company}
					onChange={formik.handleChange}
					type='text'
					className='form-control'
					placeholder='Company'
				/>
			</div>
			<div className='mb-2'>
				<input
					name='title'
					value={formik.values.title}
					onChange={formik.handleChange}
					type='text'
					className='form-control'
					placeholder='Title'
				/>
			</div>
			<div className='mb-2'>
				<select
					name='groupId'
					value={formik.values.groupId}
					onChange={formik.handleChange}
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
				<button type='submit' className={`btn ${btnColor}`}>
					{props.children}
				</button>
				<Link to={'/contacts/list'} className='btn btn-dark ms-2'>
					Close
				</Link>
			</div>
		</form>
	);
};

export default ContactForm;
