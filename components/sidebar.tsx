"use client";

import { useState } from "react";
import { Menu, X, Home, Calendar, Store, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cartContext";

export default function Sidebar({ collapsed, setCollapsed }: any) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname(); // <-- current route
  const { cart } = useCart();

  const items = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Bookings", icon: Calendar, href: "/bookings" },
    { name: "Store", icon: Store, href: "/store" },
    { name: "Custom Orders", icon: ShoppingBag, href: "/customorders" },
    { name: "Cart", icon: ShoppingCart, href: "/cart" },
  ];

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 bg-gray-900 text-white p-2 rounded"
      >
        <Menu />
      </button>

      {/* BACKDROP */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen bg-white text-black
          transition-all duration-300
          w-full
          ${collapsed ? "md:w-16" : "md:w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="p-4 flex justify-between">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block"
          >
            <Menu />
          </button>

          <button onClick={() => setMobileOpen(false)} className="md:hidden">
            <X />
          </button>
        </div>

        {/* NAV ITEMS */}
        <nav className="space-y-2 mt-10 px-2">
          {items.map((item, i) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/"); // highlights dynamic routes too

            return (
              <Link
                key={i}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                <div
                  className={`
                    group flex items-center gap-4
                    p-3 rounded cursor-pointer
                    border-l-4 transition-all duration-200
                    ${isActive
                      ? "bg-gray-900 text-white border-yellow-500"
                      : "border-transparent hover:border-yellow-500 hover:bg-gray-900"
                    }
                  `}
                >
                  <Icon
                    size={24}
                    className={`
                      transition-colors
                      ${isActive ? "text-white" : "text-black group-hover:text-white"}
                    `}
                  />

                  {!collapsed && (
                    <span
                      className={`
                        text-lg flex items-center gap-2 transition-colors
                        ${isActive ? "text-white" : "text-black group-hover:text-white"}
                      `}
                    >
                      {item.name}

                      {/* CART COUNT */}
                      {item.name === "Cart" && cart.length > 0 && (
                        <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full">
                          {cart.length}
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}