import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import Checkout from './Checkout';

const Product = ({ items }) => {
  // Initialize the total price state
  const [total, setTotal] = useState(0);

  // Calculate the total price based on the items in the cart
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (items) {
      items.forEach(item => {
        totalPrice += item.price;
      });
    }
    return totalPrice;
  };

  // Update the total price state whenever the items change
  useEffect(() => {
    setTotal(calculateTotalPrice());
  }, [items]);

  return (
    <Card className="w-96 mx-auto mt-8 p-6 rounded-lg shadow-lg border-2 border-gray-200">
      <CardContent>
        <Typography variant="h4" component="h2" className="mb-4 font-semibold text-gray-700">
          Your Cart
        </Typography>
        <List>
          {items && items.map(item => (
            <ListItem key={item.id} className="flex justify-between items-center border-b py-2">
              <ListItemText primary={item.slug} className="text-gray-600" />
              <span className="text-gray-700">${item.price}</span>
            </ListItem>
          ))}
        </List>
        <div className="mt-4 flex justify-between items-center">
          <Typography variant="h6" className="text-gray-600">
            Total:
          </Typography>
          <Typography variant="h6" className="text-gray-700">
            ${total}
          </Typography>
        </div>
        <Checkout total={total} items={items} />
      </CardContent>
    </Card>
  );
};

export default Product;
