// Option 1: fetch products on the server side (getStaticProps)

import Head from "next/head";

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:1337/products");
  const products = await res.json();

  return {
    props: { products },
  };
}

export default function Home({ products }) {
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
