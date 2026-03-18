"use client";

import { useCart } from "@/components/cartContext";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useState, useMemo } from "react";

const TAX_RATE = 0.13;

export default function CartPage() {
  const { cart, removeFromCart, decreaseQuantity, addToCart } = useCart();
  const { t } = useTranslation();

  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [paymentStatus, setPaymentStatus] = useState("");

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [cart]
  );

  const tax = subtotal * TAX_RATE;

  // 🚨 NO delivery fee here anymore
  const total = subtotal + tax;

  const handlePayment = async () => {
    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cart,
          deliveryMethod
        })
      });

      const data = await res.json();

      if (!data.url) {
        setPaymentStatus("Unable to start Stripe checkout.");
        return;
      }

      window.location.href = data.url;

    } catch {
      setPaymentStatus("Payment failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex justify-center px-6 py-20 bg-gray-50">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="space-y-6">

          <h1 className="text-4xl italic mb-6 text-center md:text-left">
            {t("cartPage.yourCart")}
          </h1>

          {cart.length === 0 && (
            <p>Your cart is empty.</p>
          )}

          {cart.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex justify-between bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="flex gap-4">

                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>
                    ${item.price} × {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="flex gap-2 mt-1">
                    <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-gray-200 rounded">−</button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: Number(item.price),
                          image: item.image
                        })
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          {/* DELIVERY TOGGLE */}
          {cart.length > 0 && (
            <div>
              <h2 className="text-xl mb-2">Delivery Method</h2>

              <div className="flex gap-4">
                <button
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`flex-1 py-3 rounded border ${
                    deliveryMethod === "pickup"
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  Pickup
                </button>

                <button
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`flex-1 py-3 rounded border ${
                    deliveryMethod === "delivery"
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  Delivery
                </button>
              </div>
            </div>
          )}

          {/* PAY BUTTON */}
          {cart.length > 0 && (
            <button
              onClick={handlePayment}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Proceed to Payment
            </button>
          )}

          {paymentStatus && (
            <p className="text-red-600">{paymentStatus}</p>
          )}

        </div>

        {/* SUMMARY */}
        {cart.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl mb-4">Order Summary</h2>

            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            <div className="flex justify-between">
              <p>Tax</p>
              <p>${tax.toFixed(2)}</p>
            </div>

            <div className="flex justify-between font-bold border-t pt-2 mt-2">
              <p>Total (before Stripe)</p>
              <p>${total.toFixed(2)}</p>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}