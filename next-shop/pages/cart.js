import React from "react";
import Page from "../components/Page";
import { useCart } from "../hooks/cart";

import CartTable from "../components/CartTable";

const Cart = () => {
  const cartItems = useCart();

  console.log("cart page", cartItems);
  return (
    <Page title="Cart">
      <CartTable cartItems={cartItems} />
    </Page>
  );
};

export default Cart;
