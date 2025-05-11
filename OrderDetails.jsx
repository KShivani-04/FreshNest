import React from 'react';
import { Link } from 'react-router-dom';
import './OrderDetails.css';

function OrderDetails({ cart }) {
  // Calculate the total price of all products in the cart
  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <div className="order-details">
      <h2>Order Details</h2>

      {/* If the cart is empty */}
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart.</p>
      ) : (
        <div className="order-summary">
          {/* Display cart items */}
          {cart.map((product) => (
            <div key={product.id} className="order-item">
              <img src={product.imageUrl} alt={product.name} />
              <div className="order-info">
                <h4>{product.name}</h4>
                <p>₹ {product.price.toLocaleString()} x {product.quantity}</p>
                <p>Total: ₹ {(product.price * product.quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
          
          {/* Total price */}
          <div className="order-total">
            <h3>Total: ₹ {totalPrice.toLocaleString()}</h3>
          </div>
          
          {/* Button to proceed to payment */}
          <div className="order-actions">
            <Link to="/payment">
              <button className="place-order-btn">Place Order</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
