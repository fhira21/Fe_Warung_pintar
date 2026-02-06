"use client";

import { useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  upsertSellPrice,
} from "@/lib/api";

type Product = {
  product_id: number;
  name: string;
  sell_price_id: number | null;
  sell_price: number | null;
  sell_unit: string | null;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    id: null as number | null,
    sell_price_id: null as number | null,
    name: "",
    price: "",
    unit: "pcs",
  });

  /* ================= LOAD ================= */
  const loadData = async () => {
    setLoading(true);
    const data = await getAllProducts();
    setProducts(data);
    setFiltered(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= SEARCH ================= */
  const handleSearch = (q: string) => {
    const keyword = q.toLowerCase();
    setFiltered(
      products.filter((p) =>
        p.name.toLowerCase().includes(keyword)
      )
    );
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setForm({
      id: null,
      sell_price_id: null,
      name: "",
      price: "",
      unit: "pcs",
    });
    setShowForm(false);
  };

  /* ================= SUBMIT ================= */
  const submit = async () => {
    if (!form.name.trim()) {
      alert("Nama produk wajib diisi");
      return;
    }

    try {
      let productId = form.id;

      // CREATE
      if (!productId) {
        const product = await createProduct({
          name: form.name,
        });
        productId = product.product_id;
      }
      // UPDATE
      else {
        await updateProduct(productId, {
          name: form.name,
        });
      }

      // SELL PRICE OPSIONAL
      if (form.price) {
        await upsertSellPrice({
          product_id: productId!,
          price: Number(form.price),
          unit: form.unit,
        });
      }

      resetForm();
      loadData();
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
      alert("Gagal menyimpan data");
    }
  };

  /* ================= UI ================= */
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white p-4 md:p-6 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Manajemen Produk
            </h1>
            <p className="text-sm text-gray-500">
              Kelola data produk dan harga jual
            </p>
          </div>
          <button className="btn" onClick={() => setShowForm(true)}>
            + Tambah Produk
          </button>
        </div>

        {/* SEARCH */}
        <div className="bg-white p-4 rounded-xl">
          <SearchInput onSearch={handleSearch} />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Nama Produk</th>
                <th className="p-3 text-left">Harga Jual</th>
                <th className="p-3 text-left">Unit</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.product_id} className="border-t">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">
                      {p.sell_price
                        ? `Rp ${p.sell_price.toLocaleString()}`
                        : "-"}
                    </td>
                    <td className="p-3">{p.sell_unit ?? "-"}</td>
                    <td className="p-3 text-center">
                      <button
                        className="btn-outline"
                        onClick={() => {
                          setForm({
                            id: p.product_id,
                            sell_price_id: p.sell_price_id,
                            name: p.name,
                            price: p.sell_price
                              ? String(p.sell_price)
                              : "",
                            unit: p.sell_unit ?? "pcs",
                          });
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
              <h2 className="text-lg font-semibold">
                {form.id ? "Edit Produk" : "Tambah Produk"}
              </h2>

              <input
                className="input"
                placeholder="Nama Produk *"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="number"
                className="input"
                placeholder="Harga Jual (opsional)"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />

              <select
                className="input"
                value={form.unit}
                onChange={(e) =>
                  setForm({ ...form, unit: e.target.value })
                }
              >
                <option value="pcs">PCS</option>
                <option value="dus">DUS</option>
                <option value="kg">KG</option>
              </select>

              <div className="flex gap-2">
                <button
                  className="btn-outline flex-1"
                  onClick={resetForm}
                >
                  Batal
                </button>
                <button className="btn flex-1" onClick={submit}>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
