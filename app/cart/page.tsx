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
  const total = subtotal + tax;

  const handlePayment = async () => {
    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, deliveryMethod })
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
    <main className="min-h-screen flex justify-center px-6 py-20 bg-[#FDFDFD] text-[#3A3D2A]">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="space-y-6">

          <h1 className="text-4xl italic mb-6 text-center md:text-left text-[#2E3022] font-bold">
            {t("cartPage.yourCart")}
          </h1>

          {cart.length === 0 && <p>Your cart is empty.</p>}

          {cart.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex justify-between bg-[#FDFDFD] p-4 rounded-xl shadow-md border border-[#3A3D2A]/20"
            >
              <div className="flex gap-4">

                <div className="relative w-20 h-20">
                  <Image src={item.image} alt={item.name} fill className="object-cover rounded-lg" />
                </div>

                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>

                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 bg-[#E8E6D1] rounded hover:bg-[#DAD7B9]"
                    >−</button>
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
                      className="px-2 py-1 bg-[#E8E6D1] rounded hover:bg-[#DAD7B9]"
                    >+</button>
                  </div>
                </div>

              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-[#D46A6A] text-white px-3 py-1 rounded hover:bg-[#B94E4E]"
              >
                Remove
              </button>
            </div>
          ))}

          {/* DELIVERY TOGGLE */}
          {cart.length > 0 && (
            <div>
              <h2 className="text-xl mb-2 font-semibold">Delivery Method</h2>

              <div className="flex gap-4">
                <button
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`flex-1 py-3 rounded border font-medium ${
                    deliveryMethod === "pickup"
                      ? "bg-[#B2A36B] text-[#FDFDFD]"
                      : "bg-[#FDFDFD] text-[#3A3D2A] border-[#3A3D2A]/30"
                  } hover:brightness-95`}
                >
                  Pickup
                </button>

                <button
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`flex-1 py-3 rounded border font-medium ${
                    deliveryMethod === "delivery"
                      ? "bg-[#B2A36B] text-[#FDFDFD]"
                      : "bg-[#FDFDFD] text-[#3A3D2A] border-[#3A3D2A]/30"
                  } hover:brightness-95`}
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
              className="mt-4 w-full py-3 rounded-lg font-semibold bg-[#B2A36B] text-[#FDFDFD] shadow-md hover:bg-[#A6944D] transition"
            >
              Proceed to Payment
            </button>
          )}

          {paymentStatus && <p className="text-[#D46A6A] mt-2">{paymentStatus}</p>}

        </div>

        {/* SUMMARY */}
        {cart.length > 0 && (
          <div className="bg-[#FDFDFD] p-6 rounded-xl shadow-md border border-[#3A3D2A]/20">
            <h2 className="text-xl mb-4 font-semibold">Order Summary</h2>

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