import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBdLTQa-Nm5JIGNOHYLq0A0GXrsgz5hMqQ',
  authDomain: 'intern-44641.firebaseapp.com',
  projectId: 'intern-44641',
  storageBucket: 'intern-44641.appspot.com',
  messagingSenderId: '375780782912',
  appId: '1:375780782912:web:ec108e4f882e6c532200a5',
  measurementId: 'G-DWHJ0EG03M',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
