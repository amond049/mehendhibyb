"use client";

import { useCart } from "@/components/cartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <main className="min-h-screen bg-neutral-200 flex justify-center px-6 py-20">

      <div className="max-w-3xl w-full bg-white p-10 rounded-2xl shadow">

        <h1 className="text-4xl italic mb-8">Your Cart</h1>

        {cart.length === 0 && (
          <p className="text-gray-600">Your cart is empty.</p>
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
                  <p className="text-gray-600">{item.price}</p>
                </div>

              </div>

              <button
                onClick={() => removeFromCart(i)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}