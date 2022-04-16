import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51K4nYDFhfMu2wpqfQlln91jgGnIdH9aiEJmj8Lx9zDlEtH2j5ac8IwIEwK484EriTAufgV6QWA3qeDgDjxnv7ToH00FPPxIxBZ';

  const onToken = async (token) => {
    try {
      await axios.post('http://localhost:5000/payment', {
        token,
        amount: priceForStripe,
      });
      alert('payment successful');
    } catch (error) {
      console.log(error.response);
      alert(
        'There was issue with payment. Please sure you use the provided credit card'
      );
    }
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CROWN CLOTHING"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
