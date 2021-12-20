import React from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="border w-80 shadow hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
        <a>
          <img src="https://dummyimage.com/320x240" alt="product-image" />
          <div className="p-2 flex justify-between items-baseline">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <span>${product.price}</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
