import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyB8Pjg3dB2acgXX5BqQFaxQcWHLoCLF2Tg',
  authDomain: 'conatct-app-react.firebaseapp.com',
  projectId: 'conatct-app-react',
  storageBucket: 'conatct-app-react.appspot.com',
  messagingSenderId: '358469295730',
  appId: '1:358469295730:web:167f87ffc89e2cc7f6aceb',
};

export const app = initializeApp(firebaseConfig);
