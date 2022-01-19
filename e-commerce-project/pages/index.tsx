import type { InferGetStaticPropsType } from "next";
import getAllProducts from "../framework/shopify/products/get-all-products";

export async function getStaticProps() {
  const products = await getAllProducts()

  return {
    props: {
      products
    },
    revalidate: 60 * 60
  }
}


export default function Home({ products } : InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>{products}</div>;
}
