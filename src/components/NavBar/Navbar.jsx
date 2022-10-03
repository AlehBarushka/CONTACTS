import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobilePhone } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/auth';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authData.isAuth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
        <div className='container'>
          <div className='col'>
            <Link to={'/'} className='navbar-brand'>
              <FontAwesomeIcon
                className='text-warning me-1'
                icon={faMobilePhone}
              />
              Contact <span className='text-warning'>Manager</span>
            </Link>
          </div>
          <div className='col d-flex justify-content-end'>
            {!isAuth ? (
              <>
                <Link
                  to={'/login'}
                  className='btn btn-sm btn-outline-light me-1'
                >
                  Login
                </Link>
                <Link
                  to={'/signup'}
                  className='btn btn-sm btn-outline-light me-1'
                >
                  SignUp
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className='btn btn-sm btn-outline-light me-1'
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
