import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { faEye, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getGroups, getContacts } from '../redux/slices/contactSlice';

import userImg from '../assets/user.png';
import Title from '../components/Title';
import Preloader from '../components/Preloader';
import SearchInput from '../components/SearchInput';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.contactsData);
  const isAuth = useSelector(state => state.authData.isAuth);

  //sending a request to receive all contacts and groups
  useEffect(() => {
    if (isAuth) {
      dispatch(getContacts());
      dispatch(getGroups());
    }
  }, [dispatch, isAuth]);

  const handleDelete = async contactId => {
    dispatch(deleteContact(contactId)).then(({ meta }) => {
      if (meta.requestStatus === 'fulfilled') {
        dispatch(getContacts());
      }
    });
  };

  let { isLoading, contacts } = state;

  return !isAuth ? (
    <Navigate to='/login' />
  ) : (
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
              contacts.map(contact => {
                return (
                  <div className='col-lg-6' key={contact.id}>
                    <div className='card my-2'>
                      <div className='card-body'>
                        <div className='row align-items-center d-flex justify-content-around'>
                          <div className='col-sm-4'>
                            <img
                              className='contact-img'
                              src={userImg}
                              alt={`${contact.name}'s avatar`}
                            />
                          </div>
                          <div className='col-sm-7'>
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
                            </ul>
                          </div>
                          <div className='col-sm-1 d-flex flex-column align-items-center'>
                            <Link
                              to={`/contacts/veiw/${contact.id}`}
                              className='btn btn-primary my-1'>
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                            <Link
                              to={`/contacts/edit/${contact.id}`}
                              className='btn btn-warning my-1'>
                              <FontAwesomeIcon icon={faPen} />
                            </Link>
                            <button
                              onClick={() => handleDelete(contact.id)}
                              className='btn btn-danger my-1'>
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

export default ContactsPage;
