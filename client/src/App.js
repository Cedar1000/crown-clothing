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
import Header from './components/header/header.component.jsx';
import Spinner from './components/spinner/spinner.component';

const SignInWrapper = ({ currentUser }) => {
  return currentUser ? <Navigate to="/" replace /> : <SignInAndSignUpPage />;
};

const Homepage = lazy(() => import('./pages/homepage/homepage.component'));
const Shopage = lazy(() => import('./pages/shopage/shop.component'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx')
);

const CheckoutPage = lazy(() =>
  import('./pages/checkout/checkout.copmonent.jsx')
);

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
            <Suspense fallback={<Spinner />}>
              <Homepage />{' '}
            </Suspense>
          }
        />

        <Route
          path="/shop/*"
          element={
            <Suspense fallback={<Spinner />}>
              <Shopage />
            </Suspense>
          }
        />

        <Route
          path="/checkout"
          element={
            <Suspense fallback={<Spinner />}>
              <CheckoutPage />
            </Suspense>
          }
        />

        <Route
          path="/signin"
          element={
            <Suspense fallback={<Spinner />}>
              <SignInWrapper currentUser={currentUser} />
            </Suspense>
          }
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
