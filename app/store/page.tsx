"use client";

import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import AddToCartButton from "@/components/addToCartButton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type StoreProduct = {
  id: string;
  name: string;
  normalizedName: string;
  price: number;
  image: string;
};

export default function StorePage() {
  const { t } = useTranslation();
  const { data: products, error } = useSWR("/api/grabProducts", fetcher);

  if (error)
    return <div className="text-center mt-20">Failed to load products</div>;
  if (!products)
    return <div className="text-center mt-20">Loading...</div>;

  // Normalize API data
  const normalizedProducts: StoreProduct[] = products.map((p: any) => ({
    id: p.id,
    name: p.productName,
    normalizedName: p.normalizedName,
    price: Number(p.productPrice),
    image: p.image,
  }));

  return (
    <main className="min-h-screen bg-[var(--store-listing-page-background)] px-6 py-20 flex justify-center">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl md:text-5xl italic text-center mb-12">
          {t("storeListingPage.store")}
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {normalizedProducts.map((product) => (
            <div key={product.id} className="relative group">
              {/* Entire card clickable */}
              <Link
                href={`/store/${product.normalizedName}`}
                className="block bg-[var(--store-listing-item-background)] rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                </div>

                <div className="p-4 flex justify-between items-center">
                  <h2 className="font-medium text-lg">{product.name}</h2>
                  <span className="text-[var(--store-listing-item-price)] font-semibold">
                    ${product.price}
                  </span>
                </div>
              </Link>

              {/* Add to cart button outside Link */}
              <div className="p-4 mt-2">
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-gray-500 italic">
          More products coming soon!
        </p>
      </div>
    </main>
  );
}