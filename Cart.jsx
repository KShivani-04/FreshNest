import React from 'react';
import './Cart.css';

function Cart({ cart, updateCart }) {
  const handleAddItem = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const handleRemoveOne = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0);
    updateCart(updatedCart);
  };

  const handleDiscardItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>₹ {item.price.toLocaleString()} x {item.quantity}</p>
                <p>Total: ₹ {(item.price * item.quantity).toLocaleString()}</p>
                <div className="cart-buttons">
                  <button onClick={() => handleRemoveOne(item.id)} className="quantity-btn">−</button>
                  <span className="quantity-count">{item.quantity}</span>
                  <button onClick={() => handleAddItem(item.id)} className="quantity-btn">+</button>
                  <button onClick={() => handleDiscardItem(item.id)} className="discard-item-btn">Discard</button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total Price: ₹ {totalPrice.toLocaleString()}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
