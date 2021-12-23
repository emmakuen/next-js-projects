import React from "react";

const CartTable = ({ cartItems = [], grandTotal }) => {
  return (
    <table className="table-fixed">
      <thead>
        <tr>
          <th className="px-4 py-2">Product</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {cartItems &&
          cartItems.map(
            ({ id, product: { title, price }, quantity, total }) => (
              <tr key={id}>
                <td className="px-4 py-2">{title}</td>
                <td className="px-4 py-2 text-right">
                  {formatCurrency(price)}
                </td>
                <td className="px-4 py-2 text-right">{quantity}</td>
                <td className="px-4 py-2 text-right">
                  {formatCurrency(total)}
                </td>
              </tr>
            )
          )}
        <tr>
          <td className="px-4 py-2 font-bold">Total</td>
          <td></td>
          <td></td>
          <td className="px-4 py-2 text-right font-bold">
            {formatCurrency(grandTotal)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const formatCurrency = (value) => {
  return `$${value.toFixed(2)}`;
};

export default CartTable;
