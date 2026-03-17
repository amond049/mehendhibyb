"use client";

import React from "react";
import useSWR from "swr";
import Image from "next/image";
import AddToCartButton from "@/components/addToCartButton";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = React.use(params);
  const { data: products, error } = useSWR("/api/grabProducts", fetcher);

  if (error) return <div className="p-20 text-center">Failed to load product.</div>;
  if (!products) return <div className="p-20 text-center">Loading...</div>;

  const product = products.find((p: any) => p.normalizedName === slug);
  if (!product) return <div className="p-20 text-center">Product not found.</div>;

  const normalizedProduct = {
    id: product.id,
    name: product.productName,
    price: Number(product.productPrice),
    image: product.image,
    description: product.productDescription,
  };

  return (
    <main className="min-h-screen bg-[var(--store-item-page-background)] flex justify-center px-6 py-20">
      <div className="max-w-4xl w-full bg-[var(--store-item-background)] rounded-2xl shadow-lg p-10 grid md:grid-cols-2 gap-10">
        <div className="relative w-full h-80">
          <Image src={normalizedProduct.image} alt={normalizedProduct.name} fill className="object-cover rounded-xl" />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl italic mb-4">{normalizedProduct.name}</h1>
          <p className="text-[var(--store-item-price)] text-xl font-semibold mb-6">${normalizedProduct.price}</p>
          <p className="text-[var(--store-item-description)] mb-8">{normalizedProduct.description}</p>
          <AddToCartButton product={normalizedProduct} />
        </div>
      </div>
    </main>
  );
}