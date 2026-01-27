"use client";

import { useEffect, useState } from "react";
import {
  getCatalog,
  deleteBasePrice,
} from "@/lib/api";

export default function CatalogPage() {
  const [catalog, setCatalog] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= LOAD ================= */
  const loadData = async () => {
    setLoading(true);
    const data = await getCatalog();
    setCatalog(data);
    setFiltered(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= SEARCH ================= */
  const handleSearch = (q: string) => {
    setSearch(q);
    const keyword = q.toLowerCase();

    setFiltered(
      catalog.filter((c) =>
        c.name.toLowerCase().includes(keyword)
      )
    );
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus harga dasar ini?")) return;

    try {
      await deleteBasePrice(id);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
    }
  };

  /* ================= UI ================= */
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl">
          <h1 className="text-2xl font-bold">Manajemen Catalog</h1>
          <p className="text-sm text-gray-500">
            Harga dasar produk dari supplier
          </p>
        </div>

        {/* SEARCH */}
        <div className="bg-white p-4 rounded-xl">
          <input
            className="input w-full"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Produk</th>
                <th className="p-3 text-left">Harga Dasar</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={2} className="p-6 text-center text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={2} className="p-6 text-center text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.product_id} className="border-t">
                    {/* PRODUCT */}
                    <td className="p-4 font-medium align-top">
                      {c.name}
                    </td>

                    {/* BASE PRICE TABLE */}
                    <td className="p-4">
                      {c.base_prices.length === 0 ? (
                        <span className="italic text-gray-400">
                          Belum ada harga dasar
                        </span>
                      ) : (
                        <table className="w-full border text-xs rounded-lg overflow-hidden">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="p-2 text-left">Supplier</th>
                              <th className="p-2 text-left">Harga</th>
                              <th className="p-2 text-left">Unit</th>
                              <th className="p-2 text-center">Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {c.base_prices.map((bp: any) => (
                              <tr key={bp.id} className="border-t">
                                <td className="p-2">
                                  {bp.supplier ?? "Tanpa Supplier"}
                                </td>
                                <td className="p-2">
                                  Rp {Number(bp.price).toLocaleString()}
                                </td>
                                <td className="p-2">{bp.unit}</td>
                                <td className="p-2 text-center">
                                  <button
                                    className="text-red-600 hover:underline"
                                    onClick={() => handleDelete(bp.id)}
                                  >
                                    Hapus
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}
