import Image from "next/image";
import { getProduct, getProductIds } from "../../lib/products";
import { ApiError } from "../../lib/api";

import Page from "../../components/Page";

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
    <Page title={product.title}>
      <div className="flex flex-col lg:flex-row">
        <Image src={product.pictureUrl} alt="" width={640} height={480} />
        <div className="mt-4 lg:ml-10 lg:mt-0 lg:w-1/2">
          <p className="text-sm">{product.description}</p>
          <p className="text-lg font-bold mt-2">${product.price}</p>
        </div>
      </div>
    </Page>
  );
};

export default Product;
