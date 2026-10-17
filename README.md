# Bilas Laundry

Website sederhana untuk usaha laundry: hitung biaya, pesan lewat WhatsApp, dan lacak status cucian. Dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework).

## Fitur

- **Kalkulator biaya** berdasarkan layanan, jumlah (kg, pasang, atau m²), dan antar-jemput, dengan validasi input (maksimal 50)
- **Estimasi tanggal selesai** sesuai lama pengerjaan tiap layanan
- **Pesan lewat WhatsApp** dengan detail pesanan dan estimasi terisi otomatis
- **Simpan pesanan dan kode pesanan** (contoh: `BL-1234`), tersimpan di browser
- **Lacak cucian**: status Dijemput, Dicuci, Disetrika, Diantar (simulasi demo, berpindah tiap 20 detik)
- **Daftar harga** dan kartu layanan, termasuk cuci sepatu dan karpet
- **Galeri sebelum dan sesudah** dengan slider geser
- **Testimoni pelanggan** dan **FAQ** berbentuk accordion
- **Tombol WhatsApp melayang** dan **tombol kembali ke atas**
- **Mode terang dan gelap** dengan tombol, pilihan tersimpan di browser
- Tampilan responsif untuk HP dan komputer

## Teknologi

HTML, CSS, dan JavaScript. Data pesanan dan tema disimpan dengan `localStorage`.

## Cara menjalankan

1. Unduh atau clone repositori ini.
2. Buka `index.html` di browser.

## Struktur file

- `index.html`: struktur halaman
- `style.css`: tampilan
- `script.js`: kalkulator, estimasi, pesanan, lacak status, tema, slider, dan tombol kembali ke atas
- `README.md`: dokumentasi proyek

## Mengubah data usaha

Nama, alamat, jam buka, dan harga ada di `index.html`. Nomor WhatsApp ada di `script.js` (variabel `WA`) dan di `index.html` (tautan `wa.me`). Gunakan format `62...` tanpa angka 0 di depan dan tanpa tanda `+`.

## Catatan

Pelacakan status pada versi ini hanya simulasi di sisi browser. Untuk status yang nyata, dibutuhkan server atau database.