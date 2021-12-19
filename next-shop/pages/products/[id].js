import React from "react";
import Head from "next/head";
import { getProduct, getProductIds } from "../../lib/products";

export async function getStaticPaths() {
  const ids = await getProductIds();
  return {
    paths: ids.map((id) => ({
      params: { id: id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const product = await getProduct(id);
  return {
    props: { product },
    revalidate: 30, // seconds
  };
}

const Product = ({ product }) => {
  return (
    <>
      <Head>
        <title>{product.title} - Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <h1 className="text-2xl pb-4">{product.title}</h1>
        <p>{product.description}</p>
      </main>
    </>
  );
};

export default Product;
