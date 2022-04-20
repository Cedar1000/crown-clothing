import React, { useEffect, lazy, Suspense } from 'react';
import { GlobalStyle } from './global.styles';

//Router
import { Route, Routes, Navigate } from 'react-router';

//Redux
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { checkUserSession } from './redux/user/user.actions';

//Components
import Shopage from './pages/shopage/shop.component';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import CheckoutPage from './pages/checkout/checkout.copmonent.jsx';

const SignInWrapper = ({ currentUser }) => {
  return currentUser ? <Navigate to="/" replace /> : <SignInAndSignUpPage />;
};

const Homepage = lazy(() => import('./pages/homepage/homepage.component'));
const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Homepage />{' '}
            </Suspense>
          }
        />

        <Route path="/shop/*" element={<Shopage />} />

        <Route path="/checkout" element={<CheckoutPage />} />

        <Route
          path="/signin"
          element={<SignInWrapper currentUser={currentUser} />}
        />
      </Routes>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: (user) => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
