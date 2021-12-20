import Head from "next/head";
import Link from "next/link";
import { getProducts } from "../lib/products";
import ProductCard from "../components/ProductCard";

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS), // seconds
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
        <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 place-items-center">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
