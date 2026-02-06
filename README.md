# 📦 Sistem Manajemen Produk & Supplier

Aplikasi web untuk mengelola **produk, harga jual, supplier, dan harga dasar (base price)** berbasis **Next.js + Supabase**.  
Dirancang untuk kebutuhan manajemen data toko atau usaha kecil-menengah dengan UI sederhana dan responsif.

---

## 🚀 Fitur Utama

### 🛒 Manajemen Produk
- CRUD produk
- Harga jual (sell price) per produk
- Unit harga (pcs, dus, kg, dll)
- Pencarian produk (kode / nama)

### 🧾 Manajemen Supplier
- CRUD supplier
- Informasi supplier:
  - Nama
  - No. Telepon (opsional)
  - Alamat (opsional)
- Pencarian supplier

### 📊 Catalog / Base Price
- Satu produk bisa memiliki **lebih dari satu harga dasar**
- Harga dasar bisa berasal dari **supplier berbeda**
- Supplier boleh dikosongkan (opsional)
- Dropdown produk & supplier dengan fitur search
- Edit & hapus base price
- Tampilan rapi (bukan seperti deskripsi panjang)

### 🔍 Search & UX
- Search realtime (tanpa tombol)
- Konsisten di semua halaman
- UI responsive (desktop & mobile)
- Modal form untuk create / edit

---

## 🧱 Teknologi yang Digunakan

### Frontend
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**

### Backend / Database
- **Supabase**
  - PostgreSQL
  - Table & View (catalog_view)
  - Relasi antar tabel

---

## 🗂️ Struktur Database (Ringkas)

### Tabel:
- `products`
- `sell_prices`
- `suppliers`
- `base_prices`

### View:
- `catalog_view`  
  Digunakan untuk mengambil data gabungan:
  - Produk
  - Harga jual
  - Harga dasar
  - Supplier

---

## ⚙️ Instalasi & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/username/nama-repo.git
cd nama-repo
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Konfigurasi Environment

Buat file `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4️⃣ Jalankan Aplikasi
```bash
npm run dev
```

Akses di browser : **[http://localhost:3000]**

### 📁 Halaman Aplikasi

| Halaman      | Deskripsi                          |
| ------------ | ---------------------------------- |
| `/`          | Homepage                           |
| `/products`  | Manajemen Produk                   |
| `/suppliers` | Manajemen Supplier                 |
| `/catalog`   | Manajemen Harga Dasar (Base Price) |

### 📌 Catatan Penting

* Harga jual & base price dipisah tabel untuk fleksibilitas
* Semua data diambil via Supabase client
* Tidak menggunakan backend server terpisah
* Cocok untuk deployment Vercel + Supabase

### 🌍 Deployment

* Frontend: Vercel
* Database: Supabase

### 📄 Lisensi

Proyek ini bersifat open-source dan bebas digunakan untuk pengembangan pribadi atau pembelajaran.

## 🧑‍💻 **Pengembang**

**Fhira Triana M**
Mobile & Web Developer
Universitas Ahmad Dahlan

GitHub: [https://github.com/fhira21](https://github.com/fhira21)
