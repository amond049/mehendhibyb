"use client";

import React from "react";
import AddToCartButton from "../../../components/addToCartButton";
import { products, Product } from "../products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = React.use(params); // unwrap the Promise

  const product: Product | undefined = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="p-20 text-center">Product not found.</div>
    );
  }

  const { name, price, image, description } = product;

  return (
    <main className="min-h-screen bg-[vars(--store-item-page-background)] flex justify-center px-6 py-20">
      <div className="max-w-4xl w-full bg-[vars(--store-item-background)] rounded-2xl shadow-lg p-10 grid md:grid-cols-2 gap-10">
        <img
          src={image}
          alt={name}
          className="w-full rounded-xl object-cover"
        />

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl italic mb-4">{name}</h1>

          <p className="text-[var(--store-item-price)] text-xl font-semibold mb-6">
            {price}
          </p>

          <p className="text-[var(--store-item-description)] mb-8">
            {description}
          </p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}