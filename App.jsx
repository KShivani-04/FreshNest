import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import ProductList from './components/ProductList';
import Cart from './components/Cart';
import LoginPage from './components/LoginPage';
import OrderDetails from './components/OrderDetails';
import PaymentPage from './components/PaymentPage';
import TrackingPage from './components/TrackingPage';

import './App.css';

// ✅ Replace this with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_YourPublishableKeyHere');

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const productInCart = cart.find(item => item.id === product.id);
    if (productInCart) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
           <div className="logo-container">
             <img src='./logo.png' alt="Fresh Logo" className="logo-image" />
             <h1>freshNest</h1>
           </div>
          <nav>
            <Link to="/">Products</Link>
            <Link to="/cart">Cart ({cart.length})</Link>
            <Link to="/login">Login</Link>
            <Link to="/order">Order</Link>
            <Link to="/payment">Payment</Link>
            <Link to="/tracking">Tracking</Link>
          </nav>
        </header>

        <main>
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path="/" element={<ProductList addToCart={addToCart} />} />
              <Route path="/cart" element={<Cart cart={cart} updateCart={updateCart} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/order" element={<OrderDetails cart={cart} />} />
              <Route path="/payment" element={<PaymentPage cart={cart} />} />
              <Route path="/tracking" element={<TrackingPage />} />
            </Routes>
          </Elements>
        </main>
        <footer className="app-footer">
        <p>© {new Date().getFullYear()} freshNest. All rights reserved.</p>
      </footer>
      </div>
    </Router>
  );
}

export default App;
