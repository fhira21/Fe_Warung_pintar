"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // ❌ Homepage TANPA topbar
  if (pathname === "/") return null;

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg">Warung Pintar</span>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-4">
            <Link href="/products" className="nav-link">
              Produk
            </Link>
            <Link href="/suppliers" className="nav-link">
              Supplier
            </Link>
            <Link href="/catalog" className="nav-link">
              Catalog
            </Link>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* Desktop Logout */}
          <button
            onClick={() => router.push("/")}
            className="hidden md:block text-sm text-red-600 hover:underline"
          >
            Keluar
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col p-4 space-y-3">
            <Link href="/products" onClick={() => setOpen(false)}>
              Produk
            </Link>
            <Link href="/suppliers" onClick={() => setOpen(false)}>
              Supplier
            </Link>
            <Link href="/catalog" onClick={() => setOpen(false)}>
              Catalog
            </Link>

            <hr />

            <button
              onClick={() => router.push("/")}
              className="text-left text-red-600"
            >
              Keluar
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
