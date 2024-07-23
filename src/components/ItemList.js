import React from 'react';
import ItemCard from './ItemCard';

const ItemList = ({ items, addToCart }) => (
  <div>
    {items.map(item => (
      <ItemCard key={item.id} item={item} addToCart={addToCart} />
    ))}
  </div>
);

export default ItemList;
