import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCurrentContact,
  addCurrentGroup,
  deleteCurrentGroup,
} from '../redux/slices/contactsSlice';
import { getContact } from '../redux/actions/contacts';

import userImg from '../assets/user.png';
import Title from '../components/Title';
import Preloader from '../components/Preloader';

const ContactDetailsPage = () => {
  const { contactId } = useParams();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.contactsData);

  //sending a request to receive current contact by id
  useEffect(() => {
    dispatch(getContact(contactId)).then(({ payload }) => {
      const { groupId } = payload;
      //add current group of contact
      dispatch(addCurrentGroup(groupId));
    });
    //after unmounting
    return () => {
      dispatch(deleteCurrentGroup());
      dispatch(deleteCurrentContact());
    };
  }, [dispatch, contactId]);

  let { isLoading, currentContact, currentGroup } = state;

  return (
    <>
      <Title textColor='text-primary'>View Contact</Title>
      {isLoading ? (
        <Preloader />
      ) : (
        Object.keys(currentContact).length > 0 && (
          <div className='container mt-3'>
            <div className='row align-items-center'>
              <div className='col-md-4 d-flex justify-content-center'>
                <img
                  src={userImg}
                  alt={`${currentContact.name}'s avatar`}
                  className='contact-img'
                />
              </div>
              <div className='col-md-8'>
                <ul className='list-group'>
                  <li className='list-group-item list-group-item-action'>
                    Name:
                    <span className='ms-1 fw-bold'>{currentContact.name}</span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                    Mobile number:
                    <span className='ms-1 fw-bold'>
                      {currentContact.mobile}
                    </span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                    Email:
                    <span className='ms-1 fw-bold'>{currentContact.email}</span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                    Company:
                    <span className='ms-1 fw-bold'>
                      {currentContact.company}
                    </span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                    Title:
                    <span className='ms-1 fw-bold'>{currentContact.title}</span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                    Group:
                    <span className='ms-1 fw-bold'>{currentGroup.name}</span>
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
        )
      )}
    </>
  );
};

export default ContactDetailsPage;
