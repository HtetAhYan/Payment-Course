import React, { useState,useEffect } from "react";
import Checkout from './Checkout'

const Product = ({ items }) => {
  // Initialize the total price state
  const [total, setTotal] = useState(0);

  // Calculate the total price based on the items in the cart
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (items) {
      items.forEach(item => {
        totalPrice += item.webinarData.price;
      });
    }
    return totalPrice;
  };

  // Update the total price state whenever the items change
  useEffect(() => {
    setTotal(calculateTotalPrice());
  }, [items]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      <ul className="space-y-4">
        {items && items.map(item => (
          <li key={item.webinarData.id} className="flex justify-between items-center">
            <span>{item.webinarData.slug}</span>
            <span>${item.webinarData.price}</span>
          </li>
        ))}
      </ul>

      <Checkout total={total} items={items} />
    </div>
  );
};

export default Product;
