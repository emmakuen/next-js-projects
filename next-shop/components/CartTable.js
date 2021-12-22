import React from "react";

const CartTable = ({ cartItems = [] }) => {
  return (
    <table className="table-fixed">
      <thead>
        <tr>
          <th className="px-4 py-2">Product</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {cartItems &&
          cartItems.map(({ id, product: { title, price }, quantity }) => (
            <tr key={id}>
              <td className="px-4 py-2">{title}</td>
              <td className="px-4 py-2 text-right">{price}</td>
              <td className="px-4 py-2 text-right">{quantity}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CartTable;
