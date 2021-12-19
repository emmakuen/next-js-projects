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

export async function getProductIds() {
  const res = await fetch("http://localhost:1337/products");
  const products = await res.json();
  return products.map((product) => product.id);
}

export async function getProduct(id) {
  const res = await fetch(`http://localhost:1337/products/${id}`);
  const product = await res.json();
  return {
    id: id,
    title: product.title,
    description: product.description,
  };
}
