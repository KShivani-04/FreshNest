import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentPage.css';

function PaymentPage({ cart }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!cart || cart.length === 0) {
    return (
      <div className="payment-page">
        <h2>Payment Page</h2>
        <p>Your cart is empty. Please add items before proceeding to payment.</p>
      </div>
    );
  }

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      const cardElement = elements.getElement(CardElement);
      const response = await fetch('http://localhost:4000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice * 100 }) // amount in paise
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setPaymentStatus(`❌ Payment failed: ${error.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentStatus('✅ Payment Successful! Your order is being processed.');
      }
    } catch (err) {
      setPaymentStatus(`⚠️ Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment Page</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {cart.map((product) => (
          <div key={product.id} className="order-item">
            <img src={product.imageUrl} alt={product.name} />
            <div className="order-details">
              <h4>{product.name}</h4>
              <p>₹ {product.price.toLocaleString()} x {product.quantity}</p>
              <p>Total: ₹ {(product.price * product.quantity).toLocaleString()}</p>
            </div>
          </div>
        ))}
        <p className="total">Total: ₹ {totalPrice.toLocaleString()}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Payment Information</h3>
        <CardElement />
        <button type="submit" disabled={!stripe || isProcessing}>
          {isProcessing ? 'Processing…' : `Pay ₹ ${totalPrice.toLocaleString()}`}
        </button>
      </form>

      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
    </div>
  );
}

export default PaymentPage;
