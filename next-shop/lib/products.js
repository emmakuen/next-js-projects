function stripProduct(product) {
  return {
    id: product.id,
    title: product.title,
  };
}

export async function getProducts() {
  const res = await fetch("http://localhost:1337/products");
  const products = await res.json();
  return products.map(stripProduct);
}
