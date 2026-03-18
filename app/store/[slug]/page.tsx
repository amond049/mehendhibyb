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

  if (error)
    return (
      <div className="p-20 text-center text-[#3A3D2A] font-medium">
        Failed to load product.
      </div>
    );
  if (!products)
    return (
      <div className="p-20 text-center text-[#3A3D2A] font-medium">
        Loading...
      </div>
    );

  const product = products.find((p: any) => p.normalizedName === slug);
  if (!product)
    return (
      <div className="p-20 text-center text-[#3A3D2A] font-medium">
        Product not found.
      </div>
    );

  const normalizedProduct = {
    id: product.id,
    name: product.productName,
    price: Number(product.productPrice),
    image: product.image,
    description: product.productDescription,
  };

  return (
    <main className="min-h-screen bg-[#f0f7ed] flex justify-center px-6 py-20">
      <div className="max-w-4xl w-full bg-[#FDFDFD] rounded-2xl shadow-md hover:shadow-lg transition p-10 grid md:grid-cols-2 gap-10 border-2 border-[#3A3D2A]/20">
        
        {/* Product Image */}
        <div className="relative w-full h-80">
          <Image
            src={normalizedProduct.image}
            alt={normalizedProduct.name}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl italic mb-4 text-[#2E3022] font-bold">
            {normalizedProduct.name}
          </h1>
          <p className="text-[#B2A36B] text-xl font-semibold mb-6">
            ${normalizedProduct.price.toFixed(2)}
          </p>
          <p className="text-[#3A3D2A] mb-8">{normalizedProduct.description}</p>

          <AddToCartButton product={normalizedProduct} />
        </div>
      </div>
    </main>
  );
}