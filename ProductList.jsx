import React, { useState } from 'react';
import './ProductList.css';

const products = [
  {
    id: 1,
    name: 'Rice',
    description: 'Premium quality rice for daily meals.',
    price: 399, // price in rupees
    imageUrl: '/logo1.jpeg', // Ensure image is in public folder
  },
  {
    id: 2,
    name: 'Apple',
    description: 'Fresh and juicy apples, perfect for a snack.',
    price: 199, // price in rupees
    imageUrl: '/logo2.jpeg', // Ensure image is in public folder
  },
  {
    id: 3,
    name: 'Milk',
    description: 'Fresh milk from local farms.',
    price: 249, // price in rupees
    imageUrl: '/logo3.jpeg', // Ensure image is in public folder
  },
  {
    id: 4,
    name: 'Bread',
    description: 'Soft and fresh bread, perfect for sandwiches.',
    price: 229, // price in rupees
    imageUrl: '/logo5.jpeg', // Ensure image is in public folder
  },
  {
    id: 5,
    name: 'Eggs',
    description: 'Dozen of organic eggs from free-range hens.',
    price: 100, // price in rupees
    imageUrl: '/logo4.jpeg', // Ensure image is in public folder
  },
];

function ProductList({ addToCart }) {
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>₹ {product.price.toLocaleString()}</p> {/* Display price in ₹ format */}
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
