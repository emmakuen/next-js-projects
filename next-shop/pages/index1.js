// Option 1: fetch products on the server side (getStaticProps)

import Head from "next/head";
import { getProducts } from "../lib/products";

export async function getStaticProps(context) {
  const products = await getProducts();
  return {
    props: { products },
  };
}

export default function Home({ products }) {
  console.log(products);
  return (
    <>
      <Head>
        <title>Next Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-6 py-4">
        <h1 className="text-2xl pb-4">Next Shop</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
