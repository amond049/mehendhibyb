"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import './globals.css'

export default function RootLayout({ children }: any) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <html>
      <body>
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
      </body>
    </html>
  );
}