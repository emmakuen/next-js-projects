import { fetchJson } from "./api";

const CMS_URL = process.env.CMS_URL;

function stripProduct(product) {
  return {
    id: product.id,
    title: product.title,
    price: product.price.toFixed(2),
  };
}

export async function getProducts() {
  const products = await fetchJson(`${CMS_URL}/products`);
  return products.map(stripProduct);
}

export async function getProductIds() {
  const products = await fetchJson(`${CMS_URL}/products`);
  return products.map((product) => product.id);
}

export async function getProduct(id) {
  const product = await fetchJson(`${CMS_URL}/products/${id}`);
  return {
    id: id,
    title: product.title,
    description: product.description,
  };
}
