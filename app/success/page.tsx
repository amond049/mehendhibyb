"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cartContext"; // ✅ import the context

type Receipt = {
  amount_total: number;
  currency: string;
  customer_details?: {
    email?: string;
  };
};

export default function SuccessPage() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const { clearCart } = useCart(); // ✅ get clearCart function

  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      const res = await fetch(`/api/checkout/session-status?session_id=${sessionId}`);
      const data = await res.json();
      setReceipt(data);
      setLoading(false);

      // ✅ Clear the cart once we have a valid receipt
      clearCart();
    };

    fetchSession();
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading your receipt...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 px-6 py-20">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">

        <h1 className="text-3xl font-bold mb-4 text-center">
          Payment Successful 🎉
        </h1>

        <p className="text-center mb-6 text-gray-600">
          Thank you for your order. A receipt has been sent to your email.
        </p>

        {receipt && (
          <div className="border rounded-lg p-6 space-y-3">

            <h2 className="text-xl font-semibold mb-2">
              Receipt
            </h2>

            <div className="flex justify-between">
              <p>Email</p>
              <p>{receipt.customer_details?.email ?? "Provided at checkout"}</p>
            </div>

            <div className="flex justify-between">
              <p>Total Paid</p>
              <p>
                ${(receipt.amount_total / 100).toFixed(2)}{" "}
                {receipt.currency.toUpperCase()}
              </p>
            </div>

          </div>
        )}

        <Link
          href="/"
          className="block text-center mt-6 bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Return to Store
        </Link>

      </div>

    </main>
  );
}