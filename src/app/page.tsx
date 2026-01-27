"use client";

import { useState } from "react";
import PinInput from "../components/PinInput";

export default function HomePage() {
  const [showPin, setShowPin] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">
          Warung Pintar
        </h1>
        <button
          onClick={() => setShowPin(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          Masuk Kasir
        </button>
      </header>

      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Sistem Manajemen Toko
          </h2>
          <p className="text-gray-500 mb-6">
            Kelola produk, supplier, dan harga dengan cepat & mudah.
          </p>

          <button
            onClick={() => setShowPin(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg"
          >
            Mulai Sekarang
          </button>
        </div>
      </main>

      <PinInput
        open={showPin}
        onClose={() => setShowPin(false)}
      />
    </>
  );
}
