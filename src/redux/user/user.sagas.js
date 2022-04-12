import { takeLatest, put, all, call } from 'redux-saga/effects';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

import userActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
} from './user.actions';

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const snapShot = yield userRef.get();

    yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);

    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);

    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    console.log(error);
    put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
  ]);
}
