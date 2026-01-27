"use client";

import { useState } from "react";

export default function SearchInput({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const [q, setQ] = useState("");

  return (
    <div className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cari produk (kode / nama)..."
        className="input flex-1"
      />
      <button
        className="btn"
        onClick={() => onSearch(q)}
      >
        Cari
      </button>
    </div>
  );
}
