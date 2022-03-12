import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';

import { Button, Form } from 'react-bootstrap';

const ContactForm = ({
	onSubmitForm,
	groups,
	btnColor,
	contactData,
	children,
}) => {
	const contactFormSchema = Yup.object().shape({
		name: Yup.string().required('Required'),
		mobile: Yup.number().required('Required'),
	});
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
		validationSchema: contactFormSchema,
	});

	return (
		<>
			<Form noValidate onSubmit={formik.handleSubmit}>
				<Form.Group className='mb-2'>
					<Form.Control
						name='name'
						value={formik.values.name}
						onChange={formik.handleChange}
						type='text'
						placeholder='Name'
						isInvalid={formik.errors?.name && formik.touched?.name}
					/>
					<Form.Control.Feedback type='invalid'>
						{formik.errors.name}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className='mb-2'>
					<Form.Control
						name='mobile'
						value={formik.values.mobile}
						onChange={formik.handleChange}
						type='number'
						placeholder='Mobile number'
						isInvalid={formik.errors?.mobile && formik.touched?.mobile}
					/>
					<Form.Control.Feedback type='invalid'>
						{formik.errors.mobile}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className='mb-2'>
					<Form.Control
						name='email'
						value={formik.values.email}
						onChange={formik.handleChange}
						type='email'
						placeholder='Email'
					/>
				</Form.Group>
				<Form.Group className='mb-2'>
					<Form.Control
						name='company'
						value={formik.values.company}
						onChange={formik.handleChange}
						type='text'
						placeholder='Company'
					/>
				</Form.Group>
				<Form.Group className='mb-2'>
					<Form.Control
						name='title'
						value={formik.values.title}
						onChange={formik.handleChange}
						type='text'
						placeholder='Title'
					/>
				</Form.Group>
				<Form.Group className='mb-2'>
					<Form.Select
						name='groupId'
						value={formik.values.groupId}
						onChange={formik.handleChange}
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
					</Form.Select>
				</Form.Group>
				<Button variant={btnColor} type='submit' className='me-2'>
					{children}
				</Button>
				<Link to={'/contacts/list'} className='btn btn-dark'>
					Close
				</Link>
			</Form>
		</>
	);
};

export default ContactForm;
