import React from "react";
import Head from "next/head";
import Image from "next/image";
import { getProduct, getProductIds } from "../../lib/products";
import { ApiError } from "../../lib/api";

export async function getStaticPaths() {
  const ids = await getProductIds();
  return {
    paths: ids.map((id) => ({
      params: { id: id.toString() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { id } }) {
  try {
    const product = await getProduct(id);
    return {
      props: { product },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS), // seconds
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return { notFound: true };
    }
    throw err;
  }
}

const Product = ({ product }) => {
  return (
    <>
      <Head>
        <title>{product.title} - Next Shop</title>
      </Head>
      <main className="px-6 lg:px-20 md:px-10 py-4">
        <h1 className="text-2xl pb-4">{product.title}</h1>
        <div className="flex flex-col lg:flex-row">
          <Image src={product.pictureUrl} alt="" width={640} height={480} />
          <div className="mt-4 lg:ml-10 lg:mt-0 lg:w-1/2">
            <p className="text-sm">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
