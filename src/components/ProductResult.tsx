export default function ProductResult({ products }: { products: any[] }) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl text-gray-500">
        Data produk tidak ditemukan
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Kode</th>
            <th className="p-3 text-left">Nama Produk</th>
            <th className="p-3 text-left">Harga Jual</th>
            <th className="p-3 text-left">Unit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i} className="border-t">
              <td className="p-3">{p.code}</td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">
                Rp {Number(p.sell_price?.price).toLocaleString()}
              </td>
              <td className="p-3">{p.sell_price?.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
