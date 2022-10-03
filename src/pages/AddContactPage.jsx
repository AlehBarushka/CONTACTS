import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { createContact } from '../redux/actions/contacts';

import Title from '../components/Title';
import ContactForm from '../components/ContactForm';

const AddContactPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.contactsData.groups);

  //use local state for ContactForm component
  const [contactFields] = useState({
    company: '',
    email: '',
    groupId: '',
    mobile: '',
    name: '',
    title: '',
  });

  const onSubmitForm = async (values) => {
    dispatch(createContact(values)).then(({ meta }) => {
      if (meta.requestStatus === 'fulfilled') {
        navigate('/contacts/list', { replace: true });
      }
    });
  };

  return (
    <>
      <Title textColor='text-success'>Create Contact</Title>
      <div className='container mt-3'>
        <div className='row'>
          <div className='col-md-4'>
            <ContactForm
              contactData={contactFields}
              groups={groups}
              onSubmitForm={onSubmitForm}
              btnColor='success'
            >
              Add
            </ContactForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddContactPage;
