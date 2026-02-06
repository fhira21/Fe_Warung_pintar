"use client";

import { useEffect, useState } from "react";
import { getCatalog } from "@/lib/api";

type CatalogItem = {
  product_id: number;
  name: string;
  sell_price: number | null;
  sell_unit: string | null;
  base_prices: {
    id: number;
    supplier: string | null;
    price: number;
    unit: string;
  }[];
};

export default function OverviewPage() {
  const [data, setData] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const res = await getCatalog();
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl">
          <h1 className="text-2xl font-bold">Ringkasan Harga Produk</h1>
          <p className="text-sm text-gray-500">
            Perbandingan harga beli dan harga jual per produk
          </p>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left w-1/4">Produk</th>
                <th className="p-3 text-left">Harga Dasar</th>
                <th className="p-3 text-left w-1/5">Harga Jual</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.product_id} className="border-t align-top">
                    
                    {/* NAMA PRODUK */}
                    <td className="p-4 font-medium">
                      {item.name}
                    </td>

                    {/* HARGA DASAR */}
                    <td className="p-4 space-y-1">
                      {item.base_prices.length === 0 ? (
                        <span className="italic text-gray-400">
                          Belum ada harga dasar
                        </span>
                      ) : (
                        item.base_prices.map((bp) => (
                          <div
                            key={bp.id}
                            className="text-gray-700"
                          >
                            Rp {bp.price.toLocaleString()}/{bp.unit}
                            <span className="text-gray-400">
                              {" "}
                              {bp.supplier
                                ? `(${bp.supplier})`
                                : "(Tanpa Supplier)"}
                            </span>
                          </div>
                        ))
                      )}
                    </td>

                    {/* HARGA JUAL */}
                    <td className="p-4 font-semibold">
                      {item.sell_price ? (
                        <>
                          Rp {item.sell_price.toLocaleString()}/{item.sell_unit}
                        </>
                      ) : (
                        <span className="italic text-gray-400">
                          Belum diatur
                        </span>
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
