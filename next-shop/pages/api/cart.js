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
    res.status(200).json(cartItems.map(stripCardItem));
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
    quantity: item.quantity,
  };
};
