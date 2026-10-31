# Bilas Laundry

Website sederhana untuk usaha laundry: hitung biaya, booking jemput, pesan lewat WhatsApp, lacak status cucian, dan halaman admin untuk mencatat transaksi. Dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework).

## Fitur untuk pelanggan

- **Kalkulator biaya** berdasarkan layanan, jumlah (kg, pasang, atau m²), dan antar-jemput, dengan validasi input
- **Estimasi tanggal selesai** sesuai lama pengerjaan tiap layanan
- **Pesan lewat WhatsApp** dengan detail pesanan dan estimasi terisi otomatis
- **Booking jemput cucian**: form nama, nomor HP, alamat, tanggal, dan jam jemput, lalu dikirim lewat WhatsApp
- **Simpan pesanan dan kode pesanan** (contoh: `BL-1234`) dengan tombol salin kode
- **Lacak cucian**: status Dijemput, Dicuci, Disetrika, Diantar (simulasi demo)
- **Daftar harga**, kartu layanan, galeri sebelum dan sesudah, testimoni, dan FAQ
- **Penanda buka/tutup** di bagian kontak sesuai jam buka
- **Tombol WhatsApp melayang**, tombol kembali ke atas, dan sapaan sesuai waktu
- **Mode terang dan gelap** dengan pilihan tersimpan di browser
- **Animasi muncul** saat halaman digulir (otomatis mati jika perangkat meminta gerakan dikurangi)
- Tampilan responsif untuk HP dan komputer, halaman `404.html` kustom, dan pesan cadangan jika JavaScript mati

## Fitur untuk pemilik (admin)

Buka `admin.html` untuk:

- Melihat ringkasan booking, pendapatan lunas, dan tagihan yang belum dibayar
- Melihat daftar booking dan menjadikannya transaksi
- Mencatat transaksi (metode Tunai, Transfer, atau QRIS) dan mengubah status lunas
- Mengunduh riwayat transaksi sebagai file CSV

## Teknologi

HTML, CSS, dan JavaScript. Data pesanan, booking, transaksi, dan tema disimpan dengan `localStorage`.

## Cara menjalankan

1. Unduh atau clone repositori ini.
2. Buka `index.html` di browser.

## Struktur file

- `index.html`: halaman utama
- `admin.html`: halaman admin booking dan transaksi
- `404.html`: halaman tidak ditemukan
- `style.css`: tampilan
- `script.js`: kalkulator, booking, pesanan, lacak status, tema, slider, dan animasi
- `robots.txt`: pengaturan penelusuran mesin pencari
- `.gitignore`: daftar file yang tidak diunggah ke Git
- `LICENSE`: lisensi MIT

## Mengubah data usaha

Nama, alamat, jam buka, dan harga ada di `index.html`. Nomor WhatsApp ada di `script.js` (variabel `WA`) dan di `index.html` (tautan `wa.me`). Gunakan format `62...` tanpa angka 0 di depan dan tanpa tanda `+`. Jam buka yang dipakai penanda buka/tutup ada di bagian bawah `script.js`.

## Catatan

- Pelacakan status hanya simulasi di sisi browser.
- Data booking dan transaksi tersimpan per browser dan perangkat, belum tersambung antar-perangkat. Halaman admin juga belum memakai password. Untuk pemakaian sungguhan dibutuhkan server dan database.