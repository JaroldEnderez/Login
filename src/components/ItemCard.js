import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px;
`;



const ItemCard = ({ item, addToCart }) => (
  <Card>
    <h3>{item.name}</h3>
    <p>{item.description}</p>
    <p>Price: {item.price} IDR</p>
    <button onClick={() => addToCart(item)}>Add to Cart</button>
  </Card>
);

export default ItemCard;
