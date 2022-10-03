import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { deleteCurrentContact } from '../redux/slices/contactsSlice';
import { getContact, updateContact } from '../redux/actions/contacts';

import userImg from '../assets/user.png';
import Preloader from '../components/Preloader';
import Title from '../components/Title';
import ContactForm from '../components/ContactForm';

const EditContactPage = () => {
  let { contactId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.contactsData);

  //sending a request to receive current contact by id
  useEffect(() => {
    dispatch(getContact(contactId));
    //after unmounting
    return () => {
      dispatch(deleteCurrentContact());
    };
  }, [dispatch, contactId]);

  const onSubmitForm = async (values) => {
    dispatch(updateContact({ values, contactId })).then(({ meta }) => {
      if (meta.requestStatus === 'fulfilled') {
        navigate('/contacts/list', { replace: true });
      }
    });
  };

  const { isLoading, groups, currentContact, currentGroup } = state;

  return (
    <>
      <Title textColor='text-warning'>Edit Contact</Title>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className='container mt-3'>
          <div className='row align-items-center'>
            <div className='col-md-4'>
              <ContactForm
                contactData={currentContact}
                onSubmitForm={onSubmitForm}
                groups={groups}
                currentGroup={currentGroup}
                btnColor='warning'
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
      )}
    </>
  );
};

export default EditContactPage;
