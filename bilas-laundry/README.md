# Bilas Laundry

Website sederhana untuk usaha laundry: hitung biaya, keranjang pesanan, booking jemput, paket langganan, lacak status cucian, dan halaman admin untuk mencatat transaksi. Dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework).

## Fitur untuk pelanggan

**Pemesanan**
- **Kalkulator biaya** berdasarkan layanan, jumlah (kg, pasang, atau m²), dan antar-jemput, dengan validasi input
- **Estimasi tanggal selesai** sesuai lama pengerjaan tiap layanan
- **Keranjang pesanan** untuk menggabungkan beberapa layanan, dengan **kode promo** (`HEMAT10`, `HEMAT5K`) dan antar-jemput gratis untuk pesanan besar
- **Pesan lewat WhatsApp** dengan detail pesanan terisi otomatis
- **Booking jemput cucian**: form nama, nomor HP, alamat, tanggal, dan jam jemput
- **Simpan pesanan dan kode pesanan** (contoh: `BL-1234`) dengan tombol salin kode
- **Lacak cucian**: status Dijemput, Dicuci, Disetrika, Diantar (simulasi demo)

**Informasi**
- **Daftar harga**, kartu layanan, galeri sebelum dan sesudah
- **Paket langganan** (Hemat, Plus, Keluarga) dengan **rekomendasi paket** berdasarkan kg per bulan
- **Testimoni** dan **ulasan pelanggan** dengan rating bintang dan rata-rata rating
- **FAQ** berbentuk accordion dengan kolom pencarian
- **Penanda buka/tutup** di bagian kontak sesuai jam buka

**Kenyamanan**
- Tombol WhatsApp melayang, tombol kembali ke atas, dan sapaan sesuai waktu
- **Mode terang dan gelap** dengan pilihan tersimpan di browser
- Animasi muncul saat halaman digulir (mati otomatis jika perangkat meminta gerakan dikurangi)
- Judul tab berubah saat ditinggal, halaman `404.html` kustom, dan pesan cadangan jika JavaScript mati
- Tampilan responsif untuk HP dan komputer

## Fitur untuk pemilik (admin)

Buka `admin.html` untuk:

- Melihat ringkasan booking, pendapatan lunas, dan tagihan yang belum dibayar
- Melihat daftar booking dan menjadikannya transaksi
- Mencatat transaksi (metode Tunai, Transfer, atau QRIS) dan mengubah status lunas
- Mengunduh riwayat transaksi sebagai file CSV

## Teknologi

HTML, CSS, dan JavaScript. Data pesanan, keranjang, booking, ulasan, transaksi, dan tema disimpan dengan `localStorage`.

## Cara menjalankan

1. Unduh atau clone repositori ini.
2. Buka `index.html` di browser.

## Struktur file

- `index.html`: halaman utama
- `admin.html`: halaman admin booking dan transaksi
- `404.html`: halaman tidak ditemukan
- `style.css`: tampilan
- `script.js`: kalkulator, keranjang, booking, pesanan, lacak status, ulasan, tema, dan animasi
- `robots.txt`: pengaturan penelusuran mesin pencari
- `.gitignore`: daftar file yang tidak diunggah ke Git
- `LICENSE`: lisensi MIT

## Mengubah data usaha

- Nama, alamat, jam buka, dan harga ada di `index.html`.
- Nomor WhatsApp ada di `script.js` (variabel `WA`) dan di `index.html` (tautan `wa.me`). Gunakan format `62...` tanpa angka 0 di depan dan tanpa tanda `+`.
- Kode promo ada di objek `PROMO`, dan harga paket di objek `PAKET`, keduanya di `script.js`.
- Jam buka untuk penanda buka/tutup ada di bagian bawah `script.js`.

## Catatan

- Pelacakan status hanya simulasi di sisi browser.
- Data booking, ulasan, keranjang, dan transaksi tersimpan per browser dan perangkat, belum tersambung antar-perangkat. Halaman admin juga belum memakai password. Untuk pemakaian sungguhan dibutuhkan server dan database.