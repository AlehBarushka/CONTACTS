import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/slices/authSlice';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase/auth';

import Navbar from './components/NavBar/Navbar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ContactsPage from './pages/ContactsPage';
import AddContactPage from './pages/AddContactPage';
import EditContactPage from './pages/EditContactPage';
import ContactDetailsPage from './pages/ContactDetailsPage';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUser = {
          id: user.uid,
          userName: user.displayName,
          email: user.email,
        };
        dispatch(setCurrentUser(currentUser));
      }
    });
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to={'/contacts/list'} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/contacts/list' element={<ContactsPage />} />
        <Route path='/contacts/add' element={<AddContactPage />} />
        <Route path='/contacts/edit/:contactId' element={<EditContactPage />} />
        <Route
          path='/contacts/veiw/:contactId'
          element={<ContactDetailsPage />}
        />
      </Routes>
    </>
  );
};

export default App;
