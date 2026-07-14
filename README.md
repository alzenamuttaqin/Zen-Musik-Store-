# Zen Musik Store

Zen Musik Store adalah platform toko alat musik online berbasis web yang dirancang secara responsif untuk menawarkan berbagai instrumen musik premium, seperti gitar elektrik, gitar akustik, bass, dan amplifier. Proyek ini dibangun menggunakan HTML5, CSS3, dan JavaScript murni (Vanilla JS).

## Fitur Utama

*   **Antarmuka Responsif:** Dioptimalkan sepenuhnya untuk berbagai perangkat, mulai dari komputer desktop, tablet, hingga layar HP (menggunakan grid 2 kolom yang ringkas).
*   **Slider Banner Otomatis:** Banner beranda yang bergulir tanpa jeda (*seamless*) sebagai etalase visual toko.
*   **Sistem Kategori & Pencarian:** Pengguna dapat mencari instrumen berdasarkan kata kunci atau memfilter produk berdasarkan kategori (Elektrik, Akustik, Bass, dan Amplifier).
*   **Detail Produk Interaktif:** Modal detail yang menampilkan gambar resolusi tinggi, deskripsi lengkap, dan tombol integrasi langsung ke keranjang.
*   **Keranjang Belanja Real-Time:** Menghitung jumlah item, subtotal, dan total pembayaran secara otomatis dengan opsi menambah/mengurangi jumlah produk secara instan.
*   **Penyimpanan Lokal (Local Storage):** Data keranjang belanja dan status login pengguna tetap tersimpan meskipun halaman dimuat ulang (*refresh*).
*   **Autentikasi Sederhana:** Sistem masuk (*login*) terintegrasi menggunakan kata sandi bawaan untuk simulasi akun pengguna.
*   **Integrasi Checkout ke WhatsApp:** Menghasilkan format ringkasan pesanan otomatis dan mengarahkan pengguna langsung ke WhatsApp penjual untuk finalisasi transaksi (mendukung opsi pembayaran COD, Transfer, E-Wallet, dan QRIS).

---

## Struktur File Proyek

```text
├── index.html       # Struktur HTML utama dan tata letak halaman
├── style.css        # Desain gaya, skema warna gelap-neon, dan media queries responsif
├── script.js       # Logika aplikasi, pengelolaan keranjang belanja, dan integrasi WhatsApp
└── README.md        # Dokumentasi proyek