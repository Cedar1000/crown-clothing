import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCKLsV5Z7s0rZcWYuFU2mhGPQi2ZsH8n3Y',
  authDomain: 'crown-clothing-4a6fc.firebaseapp.com',
  projectId: 'crown-clothing-4a6fc',
  storageBucket: 'crown-clothing-4a6fc.appspot.com',
  messagingSenderId: '195143530706',
  appId: '1:195143530706:web:b6dadaab30acc51cdd950b',
  measurementId: 'G-RHBM10G211',
};

firebase.initializeApp(config);

export const auth = getAuth();
export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = async () => signInWithPopup(auth, provider);

export default firebase;
