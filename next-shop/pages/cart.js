import React from "react";
import Page from "../components/Page";
import { useCart } from "../hooks/cart";

const Cart = () => {
  const cartItems = useCart();

  console.log("cart page", cartItems);
  return (
    <Page title="Cart">
      <h1>Cart</h1>
    </Page>
  );
};

export default Cart;
