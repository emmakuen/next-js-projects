import { fetchJson } from "./api";

const CMS_URL = "http://localhost:1337";

function stripProduct(product) {
  return {
    id: product.id,
    title: product.title,
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
