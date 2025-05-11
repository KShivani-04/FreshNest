// src/components/Checkout.jsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentPage from './PaymentPage';

const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'); // Replace with your real Stripe public key

function Checkout({ cart }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentPage cart={cart} />
    </Elements>
  );
}

export default Checkout;
