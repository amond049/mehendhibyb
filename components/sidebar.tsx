"use client";

import { useState } from "react";
import { Menu, X, Home, Users, Settings } from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed }: any) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = [
    { name: "Dashboard", icon: Home },
    { name: "Users", icon: Users },
    { name: "Settings", icon: Settings },
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
        fixed top-0 left-0 z-50 h-screen bg-gray-900 text-white
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

          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden"
          >
            <X />
          </button>
        </div>

        {/* NAV ITEMS */}
        <nav className="space-y-6 mt-10 px-4">
          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer"
              >
                <Icon size={24} />
                {!collapsed && <span className="text-lg">{item.name}</span>}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}