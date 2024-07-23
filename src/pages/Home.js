import React, { useState } from 'react';
import Cart from '../components/Cart';
import ItemList from '../components/ItemList';
import Invoice from '../components/Invoice';

const items = [
  { id: 1, name: 'Eggs(30pcs)', description: 'Description of item 1', price: 5000, category: 'Fresh Produce', type:'PRODUCT' },
  { id: 2, name: 'T-Bone Steak', description: 'Description of item 2', price: 7000, category: 'Fresh Produce', type:'PRODUCT'},
];



const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (item) => {
    setCartItems((prevItems)=>{
      const itemExists = prevItems.find((cartItem) => cartItem.id === item.id)

      if (itemExists) {
        // Item is already in the cart, so increase the quantity
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Item is not in the cart, so add it with a quantity of 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  }
  const removeFromCart = id => setCartItems(cartItems.filter(item => item.id !== id));

  console.log("Cart items: ", cartItems)
  return (
    <div>
      <h1>Xendit E-commerce</h1>
      <ItemList items={items} addToCart={addToCart} />
      <Invoice cartItems={cartItems}/>
    </div>
  );
};

export default Home;
