"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Calendar,
  Store,
  ShoppingBag,
  ShoppingCart,
  Info,
  Book
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cartContext";

export default function Sidebar({ collapsed, setCollapsed }: any) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();
  const { t } = useTranslation();

  const items = [
    { name: t("sections.sideBar.home"), icon: Home, href: "/" },
    { name: t("sections.sideBar.booking"), icon: Calendar, href: "/bookings" },
    { name: t("sections.sideBar.store"), icon: Store, href: "/store" },
    { name: t("sections.sideBar.customOrders"), icon: ShoppingBag, href: "/customorders" },
    { name: t("sections.sideBar.cart"), icon: ShoppingCart, href: "/cart" },
    { name: t("sections.sideBar.information"), icon: Info, href: "/information" },
    { name: t("sections.sideBar.portfolio"), icon: Book, href: "/portfolio" },
  ];

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 bg-[#D2E0B0] text-[#3A3D2A] p-2 rounded shadow"
      >
        <Menu />
      </button>

      {/* BACKDROP */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[#3A3D2A]/20 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen
          bg-[#E8F0D7]
          text-[#3A3D2A]
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
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link key={i} href={item.href} onClick={() => setMobileOpen(false)}>
                <div
                  className={`
                    group flex items-center gap-4
                    p-3 rounded cursor-pointer
                    border-l-4 transition-all duration-200
                    ${
                      isActive
                        ? "bg-white text-black border-black"
                        : "border-transparent hover:border-[#FDE047] hover:bg-[#F4F6ED] hover:text-[#2E3022]"
                    }
                  `}
                >
                  <Icon
                    size={24}
                    className={`
                      transition-colors
                      ${isActive ? "text-black" : "text-[#3A3D2A] group-hover:text-[#2E3022]"}
                    `}
                  />

                  {!collapsed && (
                    <span
                      className={`
                        text-lg flex items-center gap-2 transition-colors
                        ${isActive ? "text-black" : "text-[#3A3D2A] group-hover:text-[#2E3022]"}
                      `}
                    >
                      {item.name}

                      {/* CART COUNT */}
                      {item.href === "/cart" && cart.length > 0 && (
                        <span className="bg-[#FDE047] text-[#2E3022] text-xs px-2 py-0.5 rounded-full">
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