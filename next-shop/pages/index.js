import Page from "../components/Page";
import { getProducts } from "../lib/products";
import ProductCart from "../components/ProductCart";

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS), // seconds
  };
}

export default function Home({ products }) {
  return (
    <Page title="Indoor Plants">
      <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-10 place-items-center place-content-center max-w-7xl m-auto">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCart product={product} />
          </li>
        ))}
      </ul>
    </Page>
  );
}
