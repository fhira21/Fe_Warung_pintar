"use client";

import { useEffect, useState } from "react";

export default function SearchInput({
  onSearch,
  placeholder = "Cari...",
}: {
  onSearch: (q: string) => void;
  placeholder?: string;
}) {
  const [q, setQ] = useState("");

  useEffect(() => {
    onSearch(q);
  }, [q]);

  return (
    <input
      value={q}
      onChange={(e) => setQ(e.target.value)}
      placeholder={placeholder}
      className="input w-full"
    />
  );
}
