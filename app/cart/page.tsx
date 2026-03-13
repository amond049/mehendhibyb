"use client";

import { useCart } from "@/components/cartContext";
import { useTranslation } from "react-i18next";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const { t } = useTranslation();
  
  return (
    <main className="min-h-screen bg-[var(--cart-page-background)] flex justify-center px-6 py-20">

      <div className="max-w-3xl w-full bg-[var(--cart-page-form-background)] p-10 rounded-2xl shadow">

        <h1 className="text-4xl italic mb-8">{t("cartPage.yourCart")}</h1>

        {cart.length === 0 && (
          <p className="text-[var(--cart-page-empty-cart-text)]">{t("cartPage.emptyCart")}</p>
        )}

        <div className="space-y-6">

          {cart.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b pb-4"
            >

              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded"
                />

                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-[var(--cart-page-item-price-text)]">{item.price}</p>
                </div>

              </div>

              <button
                onClick={() => removeFromCart(i)}
                className="text-[var(--cart-page-remove-button-text)] hover:underline"
              >
                {t("cartPage.remove")}
              </button>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}