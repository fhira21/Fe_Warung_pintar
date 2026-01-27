"use client";

import { useEffect, useState } from "react";
import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
} from "@/lib/api";

type Supplier = {
  id: number;
  name: string;
  phone?: string | null;
  address?: string | null;
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filtered, setFiltered] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    id: null as number | null,
    name: "",
    phone: "",
    address: "",
  });

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    setLoading(true);
    const data = await getAllSuppliers();
    setSuppliers(data);
    setFiltered(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= SEARCH ================= */
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      suppliers.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.phone ?? "").toLowerCase().includes(q) ||
          (s.address ?? "").toLowerCase().includes(q)
      )
    );
  }, [search, suppliers]);

  /* ================= RESET ================= */
  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      phone: "",
      address: "",
    });
    setShowForm(false);
  };

  /* ================= SUBMIT ================= */
  const submit = async () => {
    if (!form.name) {
      alert("Nama supplier wajib diisi");
      return;
    }

    try {
      if (!form.id) {
        await createSupplier({
          name: form.name,
          phone: form.phone || null,
          address: form.address || null,
        });
      } else {
        await updateSupplier(form.id, {
          name: form.name,
          phone: form.phone || null,
          address: form.address || null,
        });
      }

      resetForm();
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data");
    }
  };

  /* ================= UI ================= */
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">

        {/* HEADER */}
        <div className="bg-white p-4 md:p-6 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Manajemen Supplier
            </h1>
            <p className="text-sm text-gray-500">
              Kelola data supplier
            </p>
          </div>
          <button
            className="btn w-full md:w-auto"
            onClick={() => setShowForm(true)}
          >
            + Tambah Supplier
          </button>
        </div>

        {/* SEARCH */}
        <div className="bg-white p-4 rounded-xl">
          <input
            className="input w-full"
            placeholder="Cari supplier (nama, telepon, alamat)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block bg-white rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-center">No</th>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">Telepon</th>
                <th className="p-3 text-left">Alamat</th>
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
                filtered.map((s, index) => (
                  <tr key={s.id} className="border-t">
                    <td className="p-3 text-center">{index + 1}</td>
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.phone ?? "-"}</td>
                    <td className="p-3">{s.address ?? "-"}</td>
                    <td className="p-3 text-center">
                      <button
                        className="btn-outline text-xs"
                        onClick={() => {
                          setForm({
                            id: s.id,
                            name: s.name,
                            phone: s.phone ?? "",
                            address: s.address ?? "",
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

        {/* MOBILE CARD */}
        <div className="md:hidden space-y-3">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-xl p-4 space-y-2 shadow-sm"
            >
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-600">
                📞 {s.phone ?? "-"}
              </div>
              <div className="text-sm text-gray-600">
                📍 {s.address ?? "-"}
              </div>
              <button
                className="btn-outline w-full text-sm"
                onClick={() => {
                  setForm({
                    id: s.id,
                    name: s.name,
                    phone: s.phone ?? "",
                    address: s.address ?? "",
                  });
                  setShowForm(true);
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-4 md:p-6 space-y-4">
              <h2 className="text-lg font-semibold">
                {form.id ? "Edit Supplier" : "Tambah Supplier"}
              </h2>

              <input
                className="input"
                placeholder="Nama Supplier *"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                className="input"
                placeholder="No Telepon (opsional)"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <textarea
                className="input"
                placeholder="Alamat (opsional)"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
              />

              <div className="flex gap-2">
                <button
                  className="btn-outline flex-1"
                  onClick={resetForm}
                >
                  Batal
                </button>
                <button
                  className="btn flex-1"
                  onClick={submit}
                >
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
