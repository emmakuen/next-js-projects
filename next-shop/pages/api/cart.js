import { fetchJson } from "../../lib/api";

const { CMS_URL } = process.env;

export default async function handleCart(req, res) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  try {
    const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    res.status(200).json(addGrandTotal(cartItems.map(stripCardItem)));
  } catch (err) {
    res.status(401).end();
  }
}

const stripCardItem = (item) => {
  return {
    id: item.id,
    product: {
      id: item.product.id,
      title: item.product.title,
      price: item.product.price,
    },
    total: item.product.price * item.quantity,
    quantity: item.quantity,
  };
};

function addGrandTotal(cartItems) {
  try {
    const prices = cartItems.map((item) => item.product.price);
    const grandTotal = prices.reduce(add, 0);
    return {
      items: cartItems,
      grandTotal,
    };
  } catch (err) {
    return undefined;
  }
}

const add = (accumulator, a) => {
  return accumulator + a;
};
