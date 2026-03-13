"use client";

import { useCart } from "@/components/cartContext";

type Product = {
  name: string;
  price: string;
  image: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() =>
        addToCart({
          name: product.name,
          price: product.price,
          image: product.image,
        })
      }
      className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black transition"
    >
      Add To Cart
    </button>
  );
}