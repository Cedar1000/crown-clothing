import React from 'react';
import './App.css';

import { Route, Routes, Navigate } from 'react-router';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';

import { setCurrentUser } from './redux/user/user.actions';

import Homepage from './pages/homepage/homepage.component';
import Shopage from './pages/shopage/shop.component';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';

const SignInWrapper = ({ currentUser }) => {
  return currentUser ? <Navigate to="/" replace /> : <SignInAndSignUpPage />;
};

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((onSnapshot) =>
          setCurrentUser({ id: onSnapshot.id, ...onSnapshot.data() })
        );
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Shopage />} />

          <Route
            path="/signin"
            element={<SignInWrapper currentUser={this.props.currentUser
            } />}
          />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
