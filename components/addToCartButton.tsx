"use client";

import { useCart } from "@/components/cartContext";
import { useTranslation } from "react-i18next";
type Product = {
  name: string;
  price: string;
  image: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  return (
    <button
      onClick={() =>
        addToCart({
          name: product.name,
          price: product.price,
          image: product.image,
        })
      }
      className="bg-[var(--add-to-cart-button-background)] text-[var(--add-to-cart-button-text)] px-6 py-3 rounded-lg hover:bg-[var(--add-to-cart-button-hover)] transition"
    >
      {t("buttons.addToCart")}
    </button>
  );
}