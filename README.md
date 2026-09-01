# Indikator Strategis Kabupaten Kutai Kartanegara 2026

Dashboard web interaktif yang menyajikan ulang **Booklet Indikator Strategis Kabupaten Kutai Kartanegara**
(Triwulan I dan Triwulan II 2026) terbitan BPS Kabupaten Kutai Kartanegara.

🔗 **Demo:** https://mrafiraamadhan.github.io/indikator-strategis-kukar/

---

## Fitur

| Fitur | Keterangan |
|---|---|
| **Pemilih periode** | Bandingkan Triwulan I dan Triwulan II 2026. Booklet TW II menambahkan indikator kemiskinan (P0) dan penduduk rentan miskin. |
| **Pencarian & filter** | Cari indikator berdasarkan nama/keterangan, atau saring berdasarkan kategori (demografi, ketenagakerjaan, ekonomi, pembangunan manusia, pemerataan). |
| **Grafik interaktif** | 5 grafik Chart.js: PDRB triwulanan & tahunan (kombinasi batang + garis), tren IPM 2021–2025, komposisi generasi, indeks kemiskinan P0/P1/P2, dan garis kemiskinan. |
| **Peta kartogram Kaltim** | 10 kabupaten/kota dengan pewarnaan choropleth. Bisa dialihkan antara jumlah penduduk dan angka kemiskinan; klik untuk melihat rincian. |
| **Mode gelap** | Toggle terang/gelap, tersimpan di `localStorage`, mengikuti preferensi sistem saat pertama dibuka. |
| **Animasi** | Angka menghitung naik (count-up) dan elemen muncul saat digulir. Otomatis nonaktif bila pengguna memilih *reduced motion*. |
| **Responsif** | Tata letak menyesuaikan desktop, tablet, dan ponsel. |

## Struktur berkas

```
indikator-strategis-kukar/
├── index.html          # Struktur halaman
├── assets/
│   ├── style.css       # Seluruh gaya + tema terang/gelap
│   ├── data.js         # SEMUA ANGKA ada di sini — ubah data cukup di file ini
│   └── app.js          # Render, grafik, filter, peta, interaksi
├── .nojekyll           # Agar GitHub Pages menyajikan berkas apa adanya
└── README.md
```

## Cara memperbarui data

Semua angka terpusat di **`assets/data.js`**. Untuk booklet triwulan berikutnya:

1. Ubah nilai pada objek `DATA.indikator` (kolom `value`).
2. Tambahkan periode baru di `DATA.periode`, lalu tambahkan tombolnya di `index.html`
   pada elemen `<div class="seg" data-seg="periode">`.
3. Tambahkan titik data baru pada `DATA.pdrbTriwulan`, `DATA.pdrbTahun`, `DATA.ipm`,
   dan `DATA.kemiskinan` (label dan nilainya harus sama panjang).
4. Simpan, commit, dan push. GitHub Pages akan memperbarui situs dalam 1–2 menit.

## Menjalankan secara lokal

Cukup buka `index.html` di browser. Bila ingin menjalankan lewat server lokal:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## Teknologi

- HTML, CSS, dan JavaScript murni — tanpa framework, tanpa proses build
- [Chart.js 4.4.1](https://www.chartjs.org/) via CDN
- Font [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts

## Sumber data

Seluruh angka disalin apa adanya dari:

- Booklet Indikator Strategis Kabupaten Kutai Kartanegara, **Triwulan I 2026** (Volume 1)
- Booklet Indikator Strategis Kabupaten Kutai Kartanegara, **Triwulan II 2026** (Volume 2)

Diterbitkan oleh **BPS Kabupaten Kutai Kartanegara** — <https://kukarkab.bps.go.id>

> **Catatan:** Situs ini adalah penyajian ulang data publik dalam bentuk web dan **bukan
> produk atau publikasi resmi Badan Pusat Statistik**. Untuk keperluan resmi, gunakan
> publikasi asli dari laman BPS.

## Lisensi

Kode sumber: MIT. Data statistik tetap milik dan bersumber dari Badan Pusat Statistik.
