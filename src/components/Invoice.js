import React from 'react'
import styled from 'styled-components';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px;
`;


const Invoice = ({cartItems}) => {
  console.log('Cart items: ',cartItems)
  const [uuid, setUUID] = useState('');

  useEffect(() => {
    const newUUID = uuidv4();
    setUUID(newUUID);
  }, []);

  const [customer, setCustomer] = useState({
    given_names: "John",
    surname: "Doe", 
    email: "lexome6963@tiervio.com",
    mobile_number: "+639123456789",
  });

    
    const totalPrice = cartItems.reduce((total, item) => total + (item.quantity*item.price), 0)  

    const handleCreateInvoice = async () => {
      const uuid = uuidv4();
      const fees = { type: "DISCOUNT", value: 100 };
    
      try {
        const response = await axios.post(
          'https://api.xendit.co/v2/invoices',
          {
            external_id: uuid,
            description: "Mockup Purchase",
            amount: totalPrice - fees.value,
            currency: 'PHP',
            customer,
            items: cartItems.map(({ description, ...rest }) => ({
              ...rest
            })),
            success_redirect_url: "https://developers.xendit.co/api-reference/#create-invoice",
            failure_redirect_url: "https://developers.xendit.co/api-reference/#create-invoice",
            fees: [fees]
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            auth: {
              username: 'xnd_development_Z0pPnaAjMudSMQAm1zjfVAKT3DyHb8ttsOuHVZOcW0tJU5voo1AkG7qShUc9crCS',
              password: ''
            }
          }
        );
    
        console.log('Invoice created successfully:', response.data);
        const checkoutUrl = response.data.invoice_url; // Assuming the URL is in the `invoice_url` field
        window.location.href = checkoutUrl; // Redirect the user to the checkout URL
        // Optionally, update the UI to indicate that the invoice was created successfully
      } catch (error) {
        console.error("Error creating invoice:", error);
        // Optionally, display an error message to the user
      }
    };

  return (
    <Card>
        <h2>Invoice</h2>
        {cartItems.map(item => (
            <li key={item.id}>
            [{item.quantity}] {item.name} - {item.price} PHP
            </li>
        ))}
        <h3>Total Price: {totalPrice} PHP</h3>
        <button onClick={handleCreateInvoice}>Confirm Payment</button>
    </Card>
  )
}

export default Invoice