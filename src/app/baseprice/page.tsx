"use client";

import { useEffect, useState } from "react";
import {
  getCatalog,
  deleteBasePrice,
  createBasePrice,
  getProductslist,
  getAllSuppliers,
} from "@/lib/api";

export default function CatalogPage() {
  const [catalog, setCatalog] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [productQuery, setProductQuery] = useState("");
  const [supplierQuery, setSupplierQuery] = useState("");
  const [showProductList, setShowProductList] = useState(false);
  const [showSupplierList, setShowSupplierList] = useState(false);

  const [form, setForm] = useState({
    product_id: null as number | null,
    supplier_id: null as number | null,
    price: "",
    unit: "pcs",
  });

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    setLoading(true);

    const [catalogData, productData, supplierData] = await Promise.all([
      getCatalog(),
      getProductslist(),
      getAllSuppliers(),
    ]);

    setCatalog(catalogData);
    setFiltered(catalogData);
    setProducts(productData);
    setSuppliers(supplierData);

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

  /* ================= SUBMIT ================= */
  const submit = async () => {
    if (!form.product_id || !form.price) {
      alert("Produk dan harga wajib diisi");
      return;
    }

    try {
      await createBasePrice({
        product_id: form.product_id,
        supplier_id: form.supplier_id,
        price: Number(form.price),
        unit: form.unit,
      });

      setShowForm(false);
      setForm({
        product_id: null,
        supplier_id: null,
        price: "",
        unit: "pcs",
      });
      setProductQuery("");
      setSupplierQuery("");

      loadData();
    } catch (err: any) {
      alert(err?.message ?? "Gagal menyimpan data");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus harga dasar ini?")) return;
    await deleteBasePrice(id);
    loadData();
  };

  /* ================= UI ================= */
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white p-4 md:p-6 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Manajemen Harga Dasar</h1>
            <p className="text-sm text-gray-500">
              Harga dasar produk dari supplier
            </p>
          </div>
          <button className="btn" onClick={() => setShowForm(true)}>
            + Harga Dasar
          </button>
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
                    <td className="p-4 font-medium">{c.name}</td>
                    <td className="p-4 space-y-2">
                      {c.base_prices.length === 0 ? (
                        <span className="italic text-gray-400">
                          Belum ada
                        </span>
                      ) : (
                        c.base_prices.map((bp: any) => (
                          <div
                            key={bp.id}
                            className="flex justify-between items-center border p-2 rounded-lg"
                          >
                            <span>
                              {bp.supplier ?? "Tanpa Supplier"} – Rp{" "}
                              {Number(bp.price).toLocaleString()} / {bp.unit}
                            </span>
                            <button
                              className="text-red-600 text-xs"
                              onClick={() => handleDelete(bp.id)}
                            >
                              Hapus
                            </button>
                          </div>
                        ))
                      )}
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

              <h2 className="font-semibold text-lg">Tambah Harga Dasar</h2>

              {/* PRODUCT */}
              <input
                className="input"
                placeholder="Cari produk..."
                value={productQuery}
                onChange={(e) => {
                  setProductQuery(e.target.value);
                  setForm({ ...form, product_id: null }); // RESET ID
                  setShowProductList(true);
                }}
              />

              {showProductList && (
                <div className="border rounded-xl max-h-40 overflow-auto">
                  {products
                    .filter(p =>
                      p.name.toLowerCase().includes(productQuery.toLowerCase())
                    )
                    .map(p => (
                      <div
                        key={p.id}
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setForm({ ...form, product_id: p.id });
                          setProductQuery(p.name);
                          setShowProductList(false);
                        }}
                      >
                        {p.name}
                      </div>
                    ))}
                </div>
              )}

              {/* SUPPLIER */}
              <input
                className="input"
                placeholder="Cari supplier (opsional)..."
                value={supplierQuery}
                onChange={(e) => {
                  setSupplierQuery(e.target.value);
                  setShowSupplierList(true);
                }}
              />

              {showSupplierList && (
                <div className="border rounded-xl max-h-40 overflow-auto">
                  <div
                    className="p-3 italic text-gray-500 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setForm({ ...form, supplier_id: null });
                      setSupplierQuery("Tanpa Supplier");
                      setShowSupplierList(false);
                    }}
                  >
                    Tanpa Supplier
                  </div>

                  {suppliers
                    .filter(s =>
                      s.name.toLowerCase().includes(supplierQuery.toLowerCase())
                    )
                    .map(s => (
                      <div
                        key={s.id}
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setForm({ ...form, supplier_id: s.id });
                          setSupplierQuery(s.name);
                          setShowSupplierList(false);
                        }}
                      >
                        {s.name}
                      </div>
                    ))}
                </div>
              )}

              <input
                type="number"
                className="input"
                placeholder="Harga"
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
                  onClick={() => setShowForm(false)}
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