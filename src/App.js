import React from 'react';
import './App.css';

//Router
import { Route, Routes, Navigate } from 'react-router';

//Firebase
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

//Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

//Components
import Homepage from './pages/homepage/homepage.component';
import Shopage from './pages/shopage/shop.component';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import CheckoutPage from './pages/checkout/checkout.copmonent.jsx';
import Collection from './pages/collection/collection.component';
import CollectionsOverview from './components/collections-overview/collections-overview.component';

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

          <Route path="/shop" element={<Shopage />}>
            <Route path="" element={<CollectionsOverview />} />
            <Route path=":categoryId" element={<Collection />} />
          </Route>

          <Route path="/checkout" element={<CheckoutPage />} />

          <Route
            path="/signin"
            element={<SignInWrapper currentUser={this.props.currentUser} />}
          />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
