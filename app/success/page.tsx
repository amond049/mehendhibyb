"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cartContext";

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

  const { clearCart } = useCart();

  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/checkout/session-status?session_id=${sessionId}`);
        if (!res.ok) throw new Error("Failed to fetch session");
        const data = await res.json();
        setReceipt(data);
        clearCart();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FDFDFD] text-[#3A3D2A] px-6">
        <p>Loading your receipt...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-[#FDFDFD] px-6 py-20 text-[#3A3D2A]">
      <div className="bg-[#FDFDFD] p-8 rounded-2xl shadow-md w-full max-w-xl border border-[#3A3D2A]/20">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#2E3022]">
          Payment Successful 🎉
        </h1>

        <p className="text-center mb-6 text-[#3A3D2A]/70">
          Thank you for your order. A receipt has been sent to your email.
        </p>

        {receipt ? (
          <div className="border border-[#3A3D2A]/30 rounded-lg p-6 space-y-3 bg-[#FDFDFD]">
            <h2 className="text-xl font-semibold mb-2 text-[#2E3022]">Receipt</h2>

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
        ) : (
          <p className="text-center text-red-500">Receipt not found.</p>
        )}

        <Link
          href="/"
          className="block text-center mt-6 bg-[#B2A36B] text-[#FDFDFD] py-3 rounded shadow hover:bg-[#A6944D] transition"
        >
          Return to Store
        </Link>
      </div>
    </main>
  );
}