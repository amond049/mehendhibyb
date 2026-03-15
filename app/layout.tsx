"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import './globals.css'
import { CartProvider } from "@/components/cartContext";
import "../i18n"

export default function RootLayout({ children }: any) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <html>
      <head>
        <title>Mehendi by B</title>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
      </head>
      <body className="bg-[var(--layout-background)] min-h-screen">
        <CartProvider>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main
          className={`
          transition-all duration-300
          p-8
          ${collapsed ? "md:ml-16" : "md:ml-64"}
        `}
        >
          {children}
        </main>
        </CartProvider>
      </body>
    </html>
  );
}