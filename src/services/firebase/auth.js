import { app } from './';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from 'firebase/auth';

export const auth = getAuth(app);

export const firebaseAuth = {
  async registerNewUser(email, password, userName) {
    //create user
    const resData = await createUserWithEmailAndPassword(auth, email, password);
    //add displayName
    await updateProfile(auth.currentUser, {
      displayName: userName,
    });
    //return object user
    const user = {
      id: resData.user.uid,
      userName: resData.user.displayName,
      email: resData.user.email,
    };
    return user;
  },
  async logIn(email, password) {
    const resData = await signInWithEmailAndPassword(auth, email, password);
    //return object user
    const user = {
      id: resData.user.uid,
      userName: resData.user.displayName,
      email: resData.user.email,
    };
    return user;
  },
  async logOut() {
    await signOut(auth);
  },
};
