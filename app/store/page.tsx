"use client";

import Link from "next/link";
import { products } from "./products";
import { useTranslation } from "react-i18next";
export default function StorePage() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen bg-[var(--store-listing-page-background)] px-6 py-20 flex justify-center">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl md:text-5xl italic text-center mb-12">{t("storeListingPage.store")}</h1>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/store/${product.slug}`}
              className="bg-[var(--store-listing-item-background)] rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 flex justify-between items-center">
                <h2 className="font-medium text-lg">{product.name}</h2>
                <span className="text-[var(--store-listing-item-price)] font-semibold">
                  {product.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}