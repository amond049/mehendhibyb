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
    return <div className="text-center mt-20 text-[#3A3D2A] font-medium">Failed to load products</div>;
  if (!products)
    return <div className="text-center mt-20 text-[#3A3D2A] font-medium">Loading...</div>;

  // Normalize API data
  const normalizedProducts: StoreProduct[] = products.map((p: any) => ({
    id: p.id,
    name: p.productName,
    normalizedName: p.normalizedName,
    price: Number(p.productPrice),
    image: p.image,
  }));

  return (
    <main className="min-h-screen bg-[#FDFDFD] px-6 py-20 flex justify-center">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl md:text-5xl italic text-center mb-12 text-[#2E3022] font-bold">
          {t("storeListingPage.store")}
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {normalizedProducts.map((product) => (
            <div key={product.id} className="relative group">

              {/* Entire card clickable */}
              <Link
                href={`/store/${product.normalizedName}`}
                className="block bg-[#FDFDFD] rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden border-2 border-[#3A3D2A]/20 hover:border-[#B2A36B]"
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
                  <h2 className="font-medium text-lg text-[#3A3D2A]">{product.name}</h2>
                  <span className="text-[#B2A36B] font-semibold">
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

        <p className="mt-12 text-center text-[#3A3D2A]/70 italic font-medium">
          More products coming soon!
        </p>
      </div>
    </main>
  );
}