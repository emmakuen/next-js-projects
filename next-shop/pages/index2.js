// Option 2: fetch products on the client side (in useEffect hook)

import Head from "next/head";

const products = [
  { id: 1, title: "First Product" },
  { id: 2, title: "Second Product" },
];

export default function Home() {
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
