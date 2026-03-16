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
  const pathname = usePathname(); // current route
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
        className="md:hidden fixed top-4 left-4 z-40 bg-[var(--mobile-menu-button-background)] text-[var(--mobile-menu-button-text-color)] p-2 rounded"
      >
        <Menu />
      </button>

      {/* BACKDROP */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[var(--sidebar-backdrop-background)]/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen
          bg-[var(--sidebar-background)]
          text-[var(--sidebar-text-color)]
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
                        ? "bg-[var(--sidebar-item-active-background)] text-[var(--sidebar-item-active-text-color)] border-[var(--sidebar-item-active-border-color)]"
                        : "border-transparent hover:border-[var(--sidebar-item-active-border-color)] hover:bg-[var(--sidebar-item-hover-background)] hover:text-[var(--sidebar-item-hover-text-color)]"
                    }
                  `}
                >
                  <Icon
                    size={24}
                    className={`
                      transition-colors
                      ${
                        isActive
                          ? "text-[var(--sidebar-icon-is-active)]"
                          : "text-[var(--sidebar-icon-not-active)] group-hover:text-[var(--sidebar-icon-hover-color)]"
                      }
                    `}
                  />

                  {!collapsed && (
                    <span
                      className={`
                        text-lg flex items-center gap-2 transition-colors
                        ${
                          isActive
                            ? "text-[var(--sidebar-item-active-text-color)]"
                            : "text-[var(--sidebar-item-text-color)] group-hover:text-[var(--sidebar-item-hover-text-color)]"
                        }
                      `}
                    >
                      {item.name}

                      {/* CART COUNT */}
                      {item.href === "/cart" && cart.length > 0 && (
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