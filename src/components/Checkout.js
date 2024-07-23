import React from 'react';
import axios from 'axios';

const Checkout = ({ cartItems }) => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/create-invoice', {
        external_id: `order-${Date.now()}`,
        amount: cartItems.reduce((total, item) => total + item.price, 0),
        description: 'Order from Xendit E-commerce',
        payer_email: 'customer@example.com',
        currency: 'IDR',
        success_redirect_url: 'http://localhost:3000/success',
        failure_redirect_url: 'http://localhost:3000/failure',
      });
      window.location.href = response.data.invoice_url;
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Proceed to Payment</button>
    </div>
  );
};

export default Checkout;
