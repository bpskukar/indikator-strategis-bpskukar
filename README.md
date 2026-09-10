# Indikator Strategis Kabupaten Kutai Kartanegara 2026

Dashboard web interaktif yang menyajikan ulang **Booklet Indikator Strategis Kabupaten Kutai Kartanegara**
(Triwulan I dan Triwulan II 2026) terbitan BPS Kabupaten Kutai Kartanegara.

🔗 **Situs:** https://bpskukar.github.io/indikator-strategis-bpskukar/

Situs ini adalah **gerbang angka** dari **PINTAR Kukar** — Pusat Informasi & Layanan Statistik
Terpadu BPS Kabupaten Kutai Kartanegara — bersama beranda pintu (https://bpskukar.github.io/)
dan gerbang layanan **Katalog Data & PST** (https://bpskukar.github.io/katalog-data-bpskukar/).

---

## Fitur

| Fitur | Keterangan |
|---|---|
| **Pemilih periode** | Bandingkan Triwulan I dan Triwulan II 2026. Booklet TW II menambahkan indikator kemiskinan (P0) dan penduduk rentan miskin. |
| **Pencarian & filter** | Cari indikator berdasarkan nama/keterangan, atau saring berdasarkan kategori (demografi, ketenagakerjaan, ekonomi, pembangunan manusia, pemerataan). |
| **Grafik interaktif** | 5 grafik Chart.js: PDRB triwulanan & tahunan (kombinasi batang + garis), tren IPM 2021–2025, komposisi generasi, indeks kemiskinan P0/P1/P2, dan garis kemiskinan. |
| **Peta kartogram Kaltim** | 10 kabupaten/kota dengan pewarnaan choropleth. Bisa dialihkan antara jumlah penduduk dan angka kemiskinan; klik untuk melihat rincian. |
| **Bandingkan kab/kota se-Kaltim** | Peringkat Kukar di antara 10 kabupaten/kota untuk IPM & komponennya, kemiskinan, penduduk (2025, BPS Kaltim); indikator lain tampil bila kolomnya diisi (Ruang Pegawai atau Web API). |
| **Kartu angka siap bagikan** | Tombol *Bagikan kartu* di tiap indikator: PNG 1080×1080 berlogo PINTAR dengan deret & sumber (`assets/kartu.js`, Web Share di HP). |
| **Dari angka ke layanan** | Setiap kartu indikator punya tautan *Minta data lengkap* (membuka Katalog Data PST dengan pencarian terisi), *Tanya PST* (membuka asisten PST di halaman ini juga, pertanyaannya langsung terjawab), *Apa ini?* (glosarium), dan *Bagikan kartu*. |
| **Asisten PST di halaman ini** | Tombol *Tanya PST* di pojok kanan bawah. Mesinnya dimuat dari repositori katalog lewat `assets/asisten.js` (satu domain), sehingga jawabannya sama persis dengan di katalog. |
| **Isi dikelola pegawai** | Semua angka, grafik, narasi, dan teks dibaca dari tabel `indikator_konten` di Supabase dan disunting dari Ruang Pegawai situs katalog (tab **Indikator**), dengan riwayat versi. |
| **Bilah PINTAR & mode gelap** | Bilah atas bersama tiga situs dengan menu silang dan tombol tema terang/gelap yang sinkron (satu domain, satu simpanan `kukar-theme`). |
| **Animasi & responsif** | Count-up, muncul saat digulir (nonaktif bila *reduced motion*), tata letak desktop–ponsel. |

## Struktur berkas

```
indikator-strategis-bpskukar/
├── index.html          # Struktur halaman (isi teks/angka diisi oleh app.js)
├── assets/
│   ├── pintar.js       # Bilah PINTAR Kukar + tema — berkas IDENTIK di tiga repositori
│   ├── style.css       # Seluruh gaya + tema terang/gelap
│   ├── data.js         # Isi awal (benih) & cadangan — setelah terbit di server, bukan lagi sumber utama
│   ├── muat.js         # Pemuat isi: server → salinan terakhir → data.js
│   ├── kartu.js        # Kartu angka siap bagikan (canvas → PNG), dipakai juga beranda PINTAR
│   └── app.js          # Render, grafik, filter, peta, pembanding kab/kota, interaksi
└── README.md
```

Tidak ada berkas konfigurasi di repositori ini: kunci Supabase dibaca dari
`/katalog-data-bpskukar/assets/config.js` (situs saudara, satu domain), sehingga kunci
hanya diisi di satu tempat.

## Cara memperbarui data

**Lewat Ruang Pegawai (cara yang dianjurkan).** Buka
https://bpskukar.github.io/katalog-data-bpskukar/admin.html → masuk → tab **Indikator**.
Pilih bagian di kiri (kartu indikator, deret kemiskinan/PDRB/IPM, kartogram, narasi, teks, …),
ubah, tekan **Pratinjau** bila ingin melihatnya dulu, lalu **Simpan & terbitkan**. Situs ini
menampilkan isi baru begitu dimuat ulang. Setiap simpanan tercatat sebagai versi (siapa,
kapan, catatan) dan bisa dipulihkan.

Untuk booklet triwulan berikutnya: tambah periode di bagian *Periode data*, tambah baris
tahun/triwulan di deret yang bersangkutan, perbarui nilai kartu dan sorotan, lalu terbitkan.

**`assets/data.js`** kini berperan sebagai isi awal (dimuat sekali ke server lewat tombol
*Muat dari berkas awal*) dan cadangan bila server tidak terjangkau. Mengubahnya tidak lagi
mengubah tampilan selama isi di server ada.

Urutan sumber yang dipakai `assets/muat.js`: `?pratinjau` (draf dari penyunting) →
server Supabase → salinan terakhir di peramban → mode demo → `data.js`. Sumber yang sedang
dipakai tertulis di kaki halaman.

## Menjalankan secara lokal

Karena ketiga situs saling merujuk lewat jalur absolut (`/katalog-data-bpskukar/…`),
jalankan server lokal dari satu folder induk yang berisi ketiga repositori dengan nama
yang sama seperti di GitHub:

```bash
mkdir www && cd www
ln -s ../indikator-strategis-bpskukar .
ln -s ../katalog-data-bpskukar .
cp ../bpskukar.github.io/index.html . && cp -r ../bpskukar.github.io/assets .
python3 -m http.server 8000
# lalu buka http://localhost:8000/indikator-strategis-bpskukar/
```

Membuka `index.html` langsung dari berkas juga bisa — bilah PINTAR tetap tampil, angka
memakai `data.js`, tetapi tautan silang tidak bekerja.

## Teknologi

- HTML, CSS, dan JavaScript murni — tanpa framework, tanpa proses build
- [Chart.js 4.4.1](https://www.chartjs.org/) via CDN
- Supabase (REST, kunci publik) untuk isi yang dikelola pegawai — dibaca dengan `fetch`, tanpa pustaka
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
