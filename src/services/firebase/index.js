import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyB8Pjg3dB2acgXX5BqQFaxQcWHLoCLF2Tg',
	authDomain: 'conatct-app-react.firebaseapp.com',
	projectId: 'conatct-app-react',
	storageBucket: 'conatct-app-react.appspot.com',
	messagingSenderId: '358469295730',
	appId: '1:358469295730:web:167f87ffc89e2cc7f6aceb',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const firebaseAuth = {
	registerNewUser(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	},
	updateUserName(userName) {
		return updateProfile(auth.currentUser, { displayName: userName });
	},
	logIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	},
	logOut() {
		return signOut(auth);
	},
};
