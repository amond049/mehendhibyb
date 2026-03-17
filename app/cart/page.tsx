"use client";

import { useCart } from "@/components/cartContext";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useState, useMemo } from "react";

const TAX_RATE = 0.13;

function getDeliveryFee(postalCode: string): number {
  if (!postalCode) return 0;
  const fsa = postalCode.replace(/\s/g, "").substring(0, 2).toUpperCase();

  if (["K1", "K2", "K3", "K4"].includes(fsa)) return 5;
  if (["K", "L", "M", "N", "P"].includes(fsa[0])) return 12;

  return 20;
}

export default function CartPage() {
  const { cart, removeFromCart, decreaseQuantity, addToCart } = useCart();
  const { t } = useTranslation();

  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country] = useState("Canada");

  const [paymentStatus, setPaymentStatus] = useState("");

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [cart]
  );

  const tax = subtotal * TAX_RATE;

  const deliveryFee = useMemo(
    () => (deliveryMethod === "delivery" ? getDeliveryFee(postalCode) : 0),
    [deliveryMethod, postalCode]
  );

  const total = subtotal + tax + deliveryFee;

  const allDeliveryFieldsFilled =
    deliveryMethod === "pickup" ||
    (street && city && province && postalCode);

  const handlePayment = async () => {
    if (!allDeliveryFieldsFilled) {
      setPaymentStatus("Please fill out all delivery address fields.");
      return;
    }

    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cart,
          deliveryMethod,
          address: {
            street,
            city,
            province,
            postalCode,
            country
          }
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

        {/* LEFT SIDE */}
        <div className="space-y-6">

          <h1 className="text-4xl italic mb-6 text-center md:text-left">
            {t("cartPage.yourCart")}
          </h1>

          {cart.length === 0 && (
            <p className="text-lg text-center md:text-left">
              Your cart is empty.
            </p>
          )}

          {cart.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">

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

                  <div className="flex items-center gap-2 mt-1">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>

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
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>

                  </div>

                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          {/* DELIVERY */}
          {cart.length > 0 && (
            <div className="mt-6">

              <h2 className="text-2xl font-semibold mb-4">
                Delivery / Pickup
              </h2>

              <div className="flex gap-4 mb-4">

                <button
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`flex-1 border rounded-lg py-3 ${
                    deliveryMethod === "pickup"
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  Pickup
                </button>

                <button
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`flex-1 border rounded-lg py-3 ${
                    deliveryMethod === "delivery"
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  Delivery
                </button>

              </div>

              {deliveryMethod === "delivery" && (
                <div className="flex flex-col gap-3">

                  <input
                    placeholder="Street Address"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="p-3 border rounded"
                  />

                  <input
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-3 border rounded"
                  />

                  <input
                    placeholder="Province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="p-3 border rounded"
                  />

                  <input
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="p-3 border rounded"
                  />

                </div>
              )}

            </div>
          )}

          {/* PAYMENT */}
          {cart.length > 0 && (
            <button
              onClick={handlePayment}
              disabled={!allDeliveryFieldsFilled}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Pay ${total.toFixed(2)}
            </button>
          )}

          {paymentStatus && (
            <p className="text-red-600">{paymentStatus}</p>
          )}

        </div>

        {/* ORDER SUMMARY */}
        {cart.length > 0 && (
          <div className="p-6 bg-white rounded-xl shadow space-y-3">

            <h2 className="text-2xl font-semibold">
              Order Summary
            </h2>

            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            <div className="flex justify-between">
              <p>Tax</p>
              <p>${tax.toFixed(2)}</p>
            </div>

            {deliveryMethod === "delivery" && (
              <div className="flex justify-between">
                <p>Delivery</p>
                <p>${deliveryFee.toFixed(2)}</p>
              </div>
            )}

            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}