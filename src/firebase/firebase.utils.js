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

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () =>
  signInWithPopup(auth, googleProvider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  console.log(transformedCollection);

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export default firebase;
