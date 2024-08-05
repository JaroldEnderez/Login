import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => (
  <div>
    <h2>Shopping Cart</h2>
    {cartItems.length === 0 ? (
      <p>Cart is empty</p>
    ) : (
      cartItems.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: {item.price} IDR</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))
    )}
  </div>
);

export default Cart;
