import React from "react";
import Page from "../components/Page";
import { useCart } from "../hooks/cart";

import CartTable from "../components/CartTable";

const Cart = () => {
  const cart = useCart();
  return (
    <Page title="Cart">
      {cart && (
        <CartTable cartItems={cart.items} grandTotal={cart.grandTotal} />
      )}
    </Page>
  );
};

export default Cart;
