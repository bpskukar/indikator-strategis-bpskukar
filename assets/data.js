/* ==========================================================================
   DATA — Indikator Strategis Kabupaten Kutai Kartanegara 2026
   Versi berkas: Triwulan III 2026 (meta.terbit 2026-11-17T06:00:00+08:00).
   Sumber:
     • Booklet Indikator Strategis BPS Kab. Kutai Kartanegara, Volume 1 (TW I 2026) & Volume 2 (TW II 2026)
     • BRS BPS Prov. Kaltim No. 74/11/64/Th. XXIX (5 Nov 2026): IPM 2026 & komponennya per kab/kota
     • BRS BPS Prov. Kaltim No. 73/11/64/Th. XXIX (5 Nov 2026): TPT & TPAK Agustus 2026 per kab/kota
     • Tabel statistik BPS Prov. Kaltim: PDRB triwulanan kab/kota (ADHB, ADHK, y-on-y, q-to-q, c-to-c), TW II-2026
   Seluruh angka disalin apa adanya dari sumber di atas; label & narasi disusun dengan
   aturan yang sama seperti wizard Pembaruan berkala di Ruang Pegawai.

   PERAN BERKAS INI:
   • Cadangan & benih untuk tabel indikator_konten di Supabase.
   • "Yang terbaru menang": bila meta.terbit di sini lebih baru daripada tanggal terbit
     isi server, situs menampilkan berkas ini sampai Ruang Pegawai menerbitkan versi
     yang lebih baru. Setiap kali berkas ini diubah, perbarui meta.terbit.
   Teks boleh memakai **tebal** (dua bintang) — dirender sebagai huruf tebal.
   ========================================================================== */

const DATA = {
  "periode": {
    "tw1": {
      "kode": "tw1",
      "nama": "Triwulan I 2026",
      "volume": "Volume 1, 2026",
      "terbit": "Juni 2026",
      "catatan": "Booklet Triwulan I belum memuat indikator kemiskinan pada halaman indikator strategis; angka lain identik dengan Triwulan II karena bersumber dari rilis tahunan yang sama."
    },
    "tw2": {
      "kode": "tw2",
      "nama": "Triwulan II 2026",
      "volume": "Volume 2, 2026",
      "terbit": "Juli 2026",
      "catatan": "Booklet Triwulan II menambahkan indikator kemiskinan: Persentase Penduduk Miskin (P0) dan Penduduk Rentan Miskin."
    },
    "tw3": {
      "kode": "tw3",
      "nama": "Triwulan III 2026",
      "volume": "Volume 3, 2026",
      "terbit": "November 2026",
      "catatan": "Pemutakhiran Triwulan III disusun dari rilis resmi BPS: IPM 2026 beserta komponennya, TPT/TPAK Agustus 2026, dan PDRB triwulan II-2026. Kemiskinan, Gini, IKG, dan penduduk masih angka Triwulan II (rilis 2026-nya belum terbit)."
    }
  },
  "indikator": [
    {
      "id": "penduduk",
      "label": "Jumlah Penduduk",
      "abbr": "Proyeksi penduduk pertengahan tahun 2025",
      "value": 845621,
      "dec": 0,
      "unit": "jiwa",
      "kat": "demografi",
      "icon": "👥",
      "accent": "#ED7014",
      "note": "Populasi Kukar tergolong cukup besar untuk ukuran kabupaten di Kalimantan Timur.",
      "tag": "Peringkat 2 di Kaltim",
      "tagType": ""
    },
    {
      "id": "lpp",
      "label": "Laju Pertumbuhan Penduduk",
      "abbr": "LPP",
      "value": 1.48,
      "dec": 2,
      "unit": "%",
      "kat": "demografi",
      "icon": "📈",
      "accent": "#F5B32B",
      "note": "Tergolong moderat/stabil; perlu diimbangi ketersediaan fasilitas publik dan lapangan kerja.",
      "tag": "Moderat",
      "tagType": ""
    },
    {
      "id": "tpak",
      "label": "Tingkat Partisipasi Angkatan Kerja",
      "abbr": "TPAK · Agustus 2026",
      "value": 65.85,
      "dec": 2,
      "unit": "%",
      "kat": "ketenagakerjaan",
      "icon": "🧑‍🏭",
      "accent": "#2C8F8B",
      "note": "Lebih dari separuh penduduk usia kerja aktif di pasar kerja — produktivitas cukup baik.",
      "tag": "Cukup baik",
      "tagType": "good"
    },
    {
      "id": "tpt",
      "label": "Tingkat Pengangguran Terbuka",
      "abbr": "TPT · Agustus 2026",
      "value": 4.61,
      "dec": 2,
      "unit": "%",
      "kat": "ketenagakerjaan",
      "icon": "🔍",
      "accent": "#D9534F",
      "note": "Relatif rendah dan terkendali — sekitar 5 dari 100 angkatan kerja belum terserap; naik 0,21 poin dari Agustus 2025, di bawah Kaltim (5,23%).",
      "tag": "Rendah & terkendali",
      "tagType": "good"
    },
    {
      "id": "pdrb-adhb",
      "label": "PDRB Atas Dasar Harga Berlaku",
      "abbr": "PDRB ADHB · Tahun 2025",
      "value": 210653.44,
      "dec": 2,
      "unit": "miliar Rp",
      "kat": "ekonomi",
      "icon": "🏭",
      "accent": "#ED7014",
      "note": "Skala ekonomi daerah yang besar, disokong sektor unggulan seperti pertambangan/energi.",
      "tag": "Nominal",
      "tagType": ""
    },
    {
      "id": "pdrb-adhk",
      "label": "PDRB Atas Dasar Harga Konstan",
      "abbr": "PDRB ADHK · Tahun 2025",
      "value": 147909.34,
      "dec": 2,
      "unit": "miliar Rp",
      "kat": "ekonomi",
      "icon": "⚙️",
      "accent": "#6C63A6",
      "note": "Nilai riil ekonomi tanpa pengaruh inflasi — kapasitas produksi riil daerah yang kokoh.",
      "tag": "Riil",
      "tagType": ""
    },
    {
      "id": "lpe",
      "label": "Laju Pertumbuhan Ekonomi (Y-on-Y)",
      "abbr": "LPE · Tahun 2025",
      "value": 3.43,
      "dec": 2,
      "unit": "%",
      "kat": "ekonomi",
      "icon": "📊",
      "accent": "#4B9E5F",
      "note": "Tumbuh positif namun melambat dari 5,61% (2024); perlu diversifikasi di luar sektor ekstraktif.",
      "tag": "Melambat",
      "tagType": "warn"
    },
    {
      "id": "pdrb-kapita",
      "label": "PDRB Per Kapita Harga Berlaku",
      "abbr": "PDRB per kapita",
      "value": 249.11,
      "dec": 2,
      "unit": "juta Rp",
      "kat": "ekonomi",
      "icon": "💰",
      "accent": "#F5B32B",
      "note": "Rata-rata output ekonomi per penduduk sangat tinggi secara makro.",
      "tag": "Tinggi",
      "tagType": "good"
    },
    {
      "id": "uhh",
      "label": "Umur Harapan Hidup",
      "abbr": "UHH · 2026",
      "value": 74.87,
      "dec": 2,
      "unit": "tahun",
      "kat": "manusia",
      "icon": "❤️",
      "accent": "#D9534F",
      "note": "Bayi yang lahir 2026 diperkirakan hidup hingga 74,87 tahun — derajat kesehatan masyarakat sudah sangat baik.",
      "tag": "+0,00 tahun",
      "tagType": "good"
    },
    {
      "id": "hls",
      "label": "Harapan Lama Sekolah",
      "abbr": "HLS · 2026",
      "value": 13.98,
      "dec": 2,
      "unit": "tahun",
      "kat": "manusia",
      "icon": "🏫",
      "accent": "#2C8F8B",
      "note": "Anak usia sekolah diperkirakan menempuh pendidikan hingga jenjang Diploma I–II / semester awal perguruan tinggi.",
      "tag": "+0,00 tahun",
      "tagType": "good"
    },
    {
      "id": "rls",
      "label": "Rata-Rata Lama Sekolah",
      "abbr": "RLS · 2026",
      "value": 9.51,
      "dec": 2,
      "unit": "tahun",
      "kat": "manusia",
      "icon": "📚",
      "accent": "#6C63A6",
      "note": "Penduduk 25 tahun ke atas rata-rata tamat SMP/sederajat (kelas 9). Selisih dengan HLS 4,47 tahun.",
      "tag": "+0,00 tahun",
      "tagType": "good"
    },
    {
      "id": "ppp",
      "label": "Pengeluaran Per Kapita Disesuaikan",
      "abbr": "PPP · 2026",
      "value": 13849,
      "dec": 0,
      "unit": "ribu Rp/tahun",
      "kat": "manusia",
      "icon": "🛒",
      "accent": "#4B9E5F",
      "note": "Pengeluaran riil ±Rp13,85 juta per orang per tahun — cermin daya beli masyarakat.",
      "tag": "+Rp0 ribu",
      "tagType": "good"
    },
    {
      "id": "ipm",
      "label": "Indeks Pembangunan Manusia",
      "abbr": "IPM · Tahun 2026",
      "value": 78.13,
      "dec": 2,
      "unit": "",
      "kat": "manusia",
      "icon": "🌟",
      "accent": "#ED7014",
      "note": "Kategori Tinggi. IPM naik 0,88 poin dari tahun sebelumnya.",
      "tag": "Kategori Tinggi",
      "tagType": "good"
    },
    {
      "id": "gini",
      "label": "Koefisien Gini (Gini Rasio)",
      "abbr": "Gini",
      "value": 0.285,
      "dec": 3,
      "unit": "",
      "kat": "pemerataan",
      "icon": "⚖️",
      "accent": "#2C8F8B",
      "note": "Di bawah 0,33 — ketimpangan pendapatan antarpenduduk tergolong rendah.",
      "tag": "Ketimpangan rendah",
      "tagType": "good"
    },
    {
      "id": "ikg",
      "label": "Indeks Ketimpangan Gender",
      "abbr": "IKG",
      "value": 0.349,
      "dec": 3,
      "unit": "",
      "kat": "pemerataan",
      "icon": "♀♂",
      "accent": "#6C63A6",
      "note": "Nilai relatif rendah (mendekati 0): ketimpangan gender semakin menipis.",
      "tag": "Menipis",
      "tagType": "good"
    },
    {
      "id": "p0",
      "label": "Persentase Penduduk Miskin",
      "abbr": "P0 · Tahun 2025",
      "value": 6.72,
      "dec": 2,
      "unit": "%",
      "kat": "pemerataan",
      "icon": "🏚️",
      "accent": "#D9534F",
      "note": "6 sampai 7 dari 100 penduduk masih mengalami kemiskinan pada tahun 2025.",
      "tag": "Turun dari 7,28%",
      "tagType": "good",
      "hanya": "tw2"
    },
    {
      "id": "rentan",
      "label": "Penduduk Rentan Miskin",
      "abbr": "Rentan miskin",
      "value": 18.29,
      "dec": 2,
      "unit": "%",
      "kat": "pemerataan",
      "icon": "⚠️",
      "accent": "#F5B32B",
      "note": "Kelompok yang berisiko jatuh ke bawah garis kemiskinan bila terjadi guncangan ekonomi.",
      "tag": "Perlu perlindungan sosial",
      "tagType": "warn",
      "hanya": "tw2"
    }
  ],
  "kategori": [
    {
      "id": "semua",
      "label": "Semua indikator"
    },
    {
      "id": "demografi",
      "label": "Demografi"
    },
    {
      "id": "ketenagakerjaan",
      "label": "Ketenagakerjaan"
    },
    {
      "id": "ekonomi",
      "label": "Ekonomi"
    },
    {
      "id": "manusia",
      "label": "Pembangunan Manusia"
    },
    {
      "id": "pemerataan",
      "label": "Pemerataan & Kemiskinan"
    }
  ],
  "pdrbTriwulan": {
    "sub": "Perbandingan lima triwulan terakhir, TW II-2025 sampai TW II-2026. Angka 2026 sangat sangat sementara (tabel triwulanan BPS Kaltim, 7 September 2026).",
    "label": [
      "TW II-2025",
      "TW III-2025",
      "TW IV-2025",
      "TW I-2026",
      "TW II-2026"
    ],
    "adhb": [
      52469.19,
      51461.29,
      54948.47,
      54915,
      58735.63
    ],
    "adhk": [
      36732.85,
      36672.09,
      38524.76,
      36769.75,
      37482.12
    ],
    "lpe": [
      4.45,
      3.35,
      3.72,
      2.2,
      2.04
    ]
  },
  "pdrbTahun": {
    "sub": "Perkembangan tahunan 2021–2025. *angka sementara  **angka sangat sementara",
    "label": [
      "2021",
      "2022",
      "2023",
      "2024*",
      "2025**"
    ],
    "adhb": [
      177416.58,
      240392.59,
      204872.66,
      204698.39,
      210653.44
    ],
    "adhk": [
      124197.1,
      128798.43,
      135406.05,
      143008.83,
      147909.34
    ],
    "lpe": [
      2.68,
      3.7,
      5.13,
      5.61,
      3.43
    ]
  },
  "ipm": {
    "judul": "Perkembangan IPM 2022–2026",
    "sub": "Peningkatan tahun 2026 didorong oleh naiknya seluruh indikator penyusun.",
    "judulKomponen": "Indikator Penyusun IPM",
    "subKomponen": "Perubahan dibanding tahun 2025",
    "label": [
      "2022",
      "2023",
      "2024",
      "2025",
      "2026"
    ],
    "nilai": [
      75.31,
      75.95,
      76.57,
      77.25,
      78.13
    ],
    "komponen": [
      {
        "nama": "Umur Harapan Hidup saat Lahir",
        "nilai": "74,87",
        "satuan": "tahun",
        "delta": "+0,00 tahun"
      },
      {
        "nama": "Harapan Lama Sekolah",
        "nilai": "13,98",
        "satuan": "tahun",
        "delta": "+0,00 tahun"
      },
      {
        "nama": "Rata-Rata Lama Sekolah",
        "nilai": "9,51",
        "satuan": "tahun",
        "delta": "+0,00 tahun"
      },
      {
        "nama": "Pengeluaran Riil per Kapita",
        "nilai": "13.849",
        "satuan": "ribu Rp",
        "delta": "+Rp0 ribu"
      }
    ]
  },
  "generasi": [
    {
      "nama": "Post Gen Z",
      "nilai": 23.7,
      "ket": "Usia 0–14 tahun",
      "warna": "#5A3A22"
    },
    {
      "nama": "Gen Z",
      "nilai": 26.9,
      "ket": "Usia 15–29 tahun",
      "warna": "#F5B32B"
    },
    {
      "nama": "Milenial",
      "nilai": 16.2,
      "ket": "Usia 30–39 tahun",
      "warna": "#D9534F"
    },
    {
      "nama": "Gen X",
      "nilai": 24.5,
      "ket": "Usia 40–59 tahun",
      "warna": "#ED7014"
    },
    {
      "nama": "Baby Boomer & Pre Boomer",
      "nilai": 8.8,
      "ket": "Usia 60 tahun ke atas",
      "warna": "#C4A484"
    }
  ],
  "demografiStat": [
    {
      "label": "Laju pertumbuhan penduduk 2020–2025",
      "value": "3,16%"
    },
    {
      "label": "Rasio jenis kelamin (per 100 perempuan)",
      "value": "107,46"
    },
    {
      "label": "Penduduk usia produktif (15–64 th)",
      "value": "70,96%"
    },
    {
      "label": "Penduduk lansia (60 tahun ke atas)",
      "value": "8,82%"
    }
  ],
  "kemiskinan": {
    "judul": "P0, P1, dan P2 Kemiskinan 2021–2025",
    "sub": "P0 pada sumbu kanan (%), P1 dan P2 pada sumbu kiri (indeks).",
    "judulGaris": "Perkembangan Garis Kemiskinan 2021–2025",
    "subGaris": "Rupiah per kapita per bulan.",
    "label": [
      "2021",
      "2022",
      "2023",
      "2024",
      "2025"
    ],
    "p0": [
      7.99,
      7.96,
      7.61,
      7.28,
      6.72
    ],
    "p1": [
      1.22,
      1.18,
      0.91,
      0.65,
      0.79
    ],
    "p2": [
      0.37,
      0.26,
      0.17,
      0.1,
      0.15
    ],
    "garis": [
      569640,
      605321,
      644570,
      682490,
      705397
    ]
  },
  "banding": {
    "tahunIpm": "2026",
    "tahunMiskin": "2025",
    "tahunPenduduk": "2025",
    "tahunTpt": "2026",
    "tahunLpe": "",
    "tahunPdrbKapita": "",
    "tahunGini": "",
    "provIpm": 80.09,
    "provUhh": 75.51,
    "provHls": 14.05,
    "provRls": 10.31,
    "provPpp": 14720,
    "provMiskin": 5.17,
    "provTpt": 5.23,
    "provLpe": null,
    "provPdrbKapita": null,
    "provGini": 0.312,
    "sumber": "BPS Provinsi Kalimantan Timur: IPM dan komponennya 2026 (BRS 5 November 2026), TPT Agustus 2026 (BRS 5 November 2026), persentase penduduk miskin Maret 2025, proyeksi penduduk 2025; angka provinsi dari Berita Resmi Statistik BPS Kaltim."
  },
  "wilayah": [
    {
      "nama": "Berau",
      "kode": "BRU",
      "bps": "6405",
      "ipm": 78.45,
      "uhh": 74.15,
      "hls": 13.58,
      "rls": 9.8,
      "ppp": 14909,
      "laki": 140.89,
      "perempuan": 124.41,
      "miskin": 4.44,
      "row": 1,
      "col": 2,
      "tpt": 4.55
    },
    {
      "nama": "Mahakam Ulu",
      "kode": "MHU",
      "bps": "6411",
      "ipm": 72.41,
      "uhh": 74.04,
      "hls": 12.89,
      "rls": 8.93,
      "ppp": 9843,
      "laki": 17.89,
      "perempuan": 16.85,
      "miskin": 10.09,
      "row": 2,
      "col": 1,
      "tpt": 3.63
    },
    {
      "nama": "Kutai Timur",
      "kode": "KTM",
      "bps": "6404",
      "ipm": 77.38,
      "uhh": 75.05,
      "hls": 13.4,
      "rls": 9.71,
      "ppp": 13202,
      "laki": 251.46,
      "perempuan": 218.94,
      "miskin": 8.07,
      "row": 2,
      "col": 3,
      "tpt": 6.15
    },
    {
      "nama": "Kutai Barat",
      "kode": "KBR",
      "bps": "6402",
      "ipm": 76.13,
      "uhh": 74.41,
      "hls": 13.53,
      "rls": 9.13,
      "ppp": 12725,
      "laki": 94.57,
      "perempuan": 85.74,
      "miskin": 8.72,
      "row": 3,
      "col": 1,
      "tpt": 5.3
    },
    {
      "nama": "Kutai Kartanegara",
      "kode": "KKR",
      "bps": "6403",
      "ipm": 78.13,
      "uhh": 74.87,
      "hls": 13.98,
      "rls": 9.51,
      "ppp": 13849,
      "laki": 438.02,
      "perempuan": 407.6,
      "miskin": 6.72,
      "row": 3,
      "col": 2,
      "home": true,
      "tpt": 4.61
    },
    {
      "nama": "Bontang",
      "kode": "BTG",
      "bps": "6474",
      "ipm": 83.61,
      "uhh": 75.6,
      "hls": 13.89,
      "rls": 11.13,
      "ppp": 19326,
      "laki": 97.49,
      "perempuan": 93.22,
      "miskin": 3.21,
      "row": 3,
      "col": 3,
      "tpt": 5.98
    },
    {
      "nama": "Samarinda",
      "kode": "SMD",
      "bps": "6472",
      "ipm": 84,
      "uhh": 76.14,
      "hls": 15.42,
      "rls": 11.05,
      "ppp": 16890,
      "laki": 439.04,
      "perempuan": 426.27,
      "miskin": 3.45,
      "row": 4,
      "col": 2,
      "tpt": 5.39
    },
    {
      "nama": "Paser",
      "kode": "PSR",
      "bps": "6401",
      "ipm": 76.5,
      "uhh": 74.59,
      "hls": 13.4,
      "rls": 9.13,
      "ppp": 13279,
      "laki": 150.12,
      "perempuan": 139.63,
      "miskin": 8.13,
      "row": 5,
      "col": 1,
      "tpt": 4.58
    },
    {
      "nama": "Penajam Paser Utara",
      "kode": "PPU",
      "bps": "6409",
      "ipm": 76.29,
      "uhh": 74.82,
      "hls": 13.1,
      "rls": 8.73,
      "ppp": 13987,
      "laki": 205.1,
      "perempuan": 194.93,
      "miskin": 5.78,
      "row": 5,
      "col": 2,
      "tpt": 4.25
    },
    {
      "nama": "Balikpapan",
      "kode": "BPP",
      "bps": "6471",
      "ipm": 83.95,
      "uhh": 76.49,
      "hls": 14.27,
      "rls": 11.26,
      "ppp": 18067,
      "laki": 369.83,
      "perempuan": 355.61,
      "miskin": 1.97,
      "row": 5,
      "col": 3,
      "tpt": 5.8
    }
  ],
  "kecamatan": {
    "tahun": "",
    "sumber": "Kabupaten Kutai Kartanegara Dalam Angka 2026",
    "daftar": [
      {
        "nama": "Samboja",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Samboja Barat",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Muara Jawa",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Sanga-Sanga",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Loa Janan",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Loa Kulu",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Muara Muntai",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Muara Wis",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Kota Bangun",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Kota Bangun Darat",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Tenggarong",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Sebulu",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Tenggarong Seberang",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Anggana",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Muara Badak",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Marang Kayu",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Muara Kaman",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Kenohan",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Kembang Janggut",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      },
      {
        "nama": "Tabang",
        "penduduk": null,
        "laki": null,
        "perempuan": null,
        "luas": null,
        "desa": null,
        "kelurahan": null
      }
    ]
  },
  "rekomendasi": [
    {
      "judul": "Perlindungan Sosial & Pengentasan Kemiskinan Tepat Sasaran",
      "poin": [
        [
          "Intervensi Prioritas Kelompok Rentan",
          "Penguatan Bantuan Sosial Terpadu dan jaring pengaman sosial pada kelompok rentan miskin agar tidak jatuh ke bawah garis kemiskinan akibat inflasi atau gejolak ekonomi."
        ],
        [
          "Pemberdayaan Ekonomi Keluarga Miskin",
          "Pengalokasian program berbasis wirausaha mikro dan pelatihan keterampilan kerja yang menyasar langsung rumah tangga miskin secara presisi."
        ]
      ]
    },
    {
      "judul": "Diversifikasi Ekonomi & Penguatan Sektor Non-Ekstraktif",
      "poin": [
        [
          "Akselerasi Sektor Penyediaan Makanan/Minuman & UMKM Kuliner",
          "Menjadikan sektor UMKM olahan pangan, kuliner, dan pariwisata sebagai \"motor\" baru pertumbuhan ekonomi guna mengurai ketergantungan pada sektor pertambangan/energi."
        ],
        [
          "Kemudahan Akses Modal & Pasar",
          "Pemberian insentif usaha, fasilitasi legalitas/halal, serta kemudahan sertifikasi bagi pelaku UMKM ekonomi kreatif."
        ]
      ]
    },
    {
      "judul": "Penguatan Kesetaraan Gender & Ketahanan Keluarga",
      "poin": [
        [
          "Pemberdayaan Perempuan di Pasar Kerja",
          "Peningkatan akses perempuan terhadap modal usaha, program pelatihan kepemimpinan, serta perlindungan kesehatan reproduksi di tempat kerja untuk terus menekan angka IKG."
        ],
        [
          "Penguatan Layanan Lansia",
          "Persiapan program perlindungan sosial dan fasilitas kesehatan ramah lansia sejak dini."
        ]
      ]
    },
    {
      "judul": "Peningkatan Kualitas SDM & Pembangunan Pendidikan",
      "poin": [
        [
          "Program Beasiswa & Kejar Paket C/D3",
          "Buka program afirmasi pendidikan tinggi dan pelatihan keahlian (up-skilling) untuk angkatan kerja dewasa demi menaikkan RLS."
        ],
        [
          "Vokasi Bertarget",
          "Dorong integrasi kurikulum SMK dan Pendidikan Vokasi yang disesuaikan dengan kebutuhan pasar kerja lokal dan kawasan pendukung IKN."
        ]
      ]
    },
    {
      "judul": "Optimalisasi Bonus Demografi & Penyerapan Tenaga Kerja",
      "poin": [
        [
          "Penciptaan Lapangan Kerja Hijau & Digital",
          "Sediakan ruang inkubasi bisnis digital dan kewirausahaan muda untuk menyerap angkatan kerja Gen Z dan Milenial, terutama di sektor ekonomi hijau."
        ],
        [
          "Menjaga Tingkat Partisipasi Kerja",
          "Pertahankan Tingkat Pengangguran Terbuka (TPT) di angka rendah melalui Job Fair berkala dan kemitraan strategis antara industri daerah dengan angkatan kerja lokal."
        ]
      ]
    }
  ],
  "narasi": {
    "ekonomi": [
      [
        "PDRB Harga Berlaku — Rp210.653,44 miliar",
        "Menunjukkan nilai total produk dan jasa yang dihasilkan secara nominal sangat besar, mencerminkan besarnya skala **ekonomi daerah Kukar yang disokong oleh sektor-sektor unggulan** (seperti pertambangan/energi)."
      ],
      [
        "PDRB Harga Konstan — Rp147.909,34 miliar",
        "Nilai riil ekonomi Kukar (tanpa pengaruh inflasi) menunjukkan kapasitas produksi riil daerah yang **kokoh**."
      ],
      [
        "Laju Pertumbuhan Ekonomi — 3,43%",
        "Ekonomi Kukar mengalami **pertumbuhan positif secara tahunan**. Meskipun tumbuh positif, lajunya berada di tingkat yang moderat, menandakan diperlukannya diversifikasi ekonomi agar tidak hanya bergantung pada sektor ekstraktif."
      ],
      [
        "PDRB Per Kapita — Rp249,11 juta",
        "Rata-rata output ekonomi per penduduk sangat tinggi, mengindikasikan bahwa Kukar adalah daerah **berpendapatan/produksi tinggi per kapita secara makro**."
      ]
    ],
    "manusia": [
      [
        "Umur Harapan Hidup — 74,87 tahun",
        "Bayi yang lahir pada 2026 diperkirakan dapat hidup hingga 74,87 tahun (+0,00 tahun dibanding 2025) — cermin derajat kesehatan masyarakat: akses layanan medis, sanitasi, dan gizi."
      ],
      [
        "Harapan Lama Sekolah — 13,98 tahun",
        "Anak usia 7 tahun pada 2026 diharapkan dapat menempuh pendidikan selama 13,98 tahun — setara jenjang Diploma I–II / semester awal perguruan tinggi (+0,00 tahun dibanding 2025)."
      ],
      [
        "Rata-Rata Lama Sekolah — 9,51 tahun",
        "Penduduk usia 25 tahun ke atas rata-rata bersekolah 9,51 tahun — setara tamat SMP/sederajat (kelas 9) (+0,00 tahun). Selisih 4,47 tahun dengan HLS menunjukkan generasi muda bersekolah lebih lama daripada generasi sebelumnya."
      ],
      [
        "Pengeluaran Per Kapita — Rp13.849 ribu",
        "Pengeluaran riil per kapita yang disesuaikan mencapai sekitar Rp13,85 juta per tahun (+Rp0 ribu dibanding 2025) — **menggambarkan daya beli dan standar hidup** masyarakat."
      ],
      [
        "IPM — 78,13",
        "Skor IPM tergolong kategori Tinggi (70–80), naik 0,88 poin dari 77,25 pada 2025. Seluruh komponen penyusunnya meningkat, menandakan **pembangunan manusia di Kukar berjalan merata** di bidang kesehatan, pendidikan, dan daya beli. Pertumbuhan IPM Kukar 1,14% termasuk tiga tertinggi di Kaltim, setelah Mahakam Ulu (1,23%) dan Kutai Timur (1,18%)."
      ]
    ],
    "pemerataan": [
      [
        "Koefisien Gini — 0,285",
        "Angka di bawah 0,33 menunjukkan bahwa ketimpangan pendapatan antarpenduduk di Kukar **tergolong rendah**. Hasil pertumbuhan ekonomi relatif terdistribusi dengan baik di masyarakat."
      ],
      [
        "Indeks Ketimpangan Gender — 0,349",
        "Nilai IKG yang relatif rendah (mendekati 0) mengindikasikan bahwa ketimpangan antara laki-laki dan perempuan dalam hal kesehatan reproduksi, pemberdayaan, dan pasar kerja **semakin menipis**."
      ]
    ]
  },
  "sumber": [
    [
      "Booklet Indikator Strategis Kabupaten Kutai Kartanegara, Triwulan I 2026 (Volume 1)",
      "BPS Kabupaten Kutai Kartanegara"
    ],
    [
      "Booklet Indikator Strategis Kabupaten Kutai Kartanegara, Triwulan II 2026 (Volume 2)",
      "BPS Kabupaten Kutai Kartanegara"
    ],
    [
      "Berita Resmi Statistik No. 74/11/64/Th. XXIX — Indeks Pembangunan Manusia Provinsi Kalimantan Timur Tahun 2026 (5 November 2026)",
      "BPS Provinsi Kalimantan Timur"
    ],
    [
      "Berita Resmi Statistik No. 73/11/64/Th. XXIX — Keadaan Ketenagakerjaan Kalimantan Timur Agustus 2026 (5 November 2026)",
      "BPS Provinsi Kalimantan Timur"
    ],
    [
      "Tabel statistik [Seri 2010] Triwulanan — PDRB dan laju pertumbuhan menurut kabupaten/kota, Triwulan II-2026 (diperbarui 7 September 2026)",
      "BPS Provinsi Kalimantan Timur"
    ],
    [
      "Survei Sosial Ekonomi Nasional (Susenas)",
      "Badan Pusat Statistik"
    ],
    [
      "Survei Angkatan Kerja Nasional (Sakernas)",
      "Badan Pusat Statistik"
    ],
    [
      "Hasil Proyeksi Penduduk Kabupaten/Kota Provinsi Kalimantan Timur 2020–2035 (SP2020)",
      "Badan Pusat Statistik"
    ],
    [
      "Produk Domestik Regional Bruto Kabupaten/Kota",
      "BPS Provinsi Kalimantan Timur"
    ]
  ],
  "sorotan": {
    "ekonomi": [
      {
        "judul": "Pertumbuhan Ekonomi Triwulan II-2026 (y-on-y)",
        "nilai": "2,04%",
        "gaya": "",
        "ket": "Tumbuh 2,04% dibanding TW II-2025, dan tumbuh 1,94% dibanding TW I-2026 (q-to-q)."
      },
      {
        "judul": "Pertumbuhan kumulatif Semester I-2026 (c-to-c)",
        "nilai": "2,12%",
        "gaya": "",
        "ket": "PDRB Januari–Juni 2026 dibanding periode yang sama 2025 — tetap tumbuh positif, meski di bawah laju 3,43% sepanjang 2025."
      },
      {
        "judul": "Kontribusi terhadap PDRB Kaltim",
        "nilai": "23,81%",
        "gaya": "",
        "ket": "PDRB ADHB Kukar TW II-2026 Rp58.735,63 miliar dari Rp246.684,12 miliar jumlah 10 kabupaten/kota — terbesar di Kalimantan Timur."
      }
    ],
    "kemiskinan": [
      {
        "judul": "Penduduk miskin 2025",
        "nilai": "6–7 dari 100",
        "gaya": "amber",
        "ket": "Sekitar 6 sampai 7 dari 100 penduduk masih mengalami kemiskinan pada tahun 2025."
      },
      {
        "judul": "Garis kemiskinan 2025",
        "nilai": "Rp705.397",
        "gaya": "",
        "ket": "Naik Rp22.907 dibanding 2024. Penduduk berkategori miskin bila pengeluaran per kapita per bulan di bawah angka ini."
      },
      {
        "judul": "Penduduk rentan miskin",
        "nilai": "18,29%",
        "gaya": "amber",
        "ket": "Kelompok yang berisiko jatuh ke bawah garis kemiskinan bila terjadi inflasi atau gejolak ekonomi."
      }
    ]
  },
  "teks": {
    "hero": {
      "judul": "Potret **pembangunan daerah** Kutai Kartanegara dalam angka",
      "lede": "Ringkasan indikator strategis yang menggambarkan kondisi demografi, ketenagakerjaan, perekonomian, pembangunan manusia, serta pemerataan dan kemiskinan — disarikan dari Booklet Indikator Strategis Triwulan I dan II 2026, dimutakhirkan dengan rilis resmi BPS hingga Triwulan III 2026.",
      "mini": [
        "penduduk",
        "lpe",
        "ipm",
        "tpt"
      ]
    },
    "pengantar": {
      "ringkasan": "Indikator strategis digunakan untuk mengukur **capaian pembangunan daerah** di berbagai bidang, meliputi demografi, ekonomi, kesejahteraan masyarakat, dan kesetaraan gender. Cari indikator, saring berdasarkan kategori, atau bandingkan antarperiode.",
      "ekonomi": "Produk Domestik Regional Bruto (PDRB) adalah nilai keseluruhan semua barang dan jasa yang diproduksi pada suatu wilayah dalam jangka waktu tertentu — atas dasar harga berlaku (nominal) dan atas dasar harga konstan (riil).",
      "kependudukan": "Kutai Kartanegara menduduki **peringkat kedua** sebagai kabupaten/kota dengan jumlah penduduk tertinggi di Kalimantan Timur, dengan struktur usia yang didominasi kelompok produktif.",
      "manusia": "Indeks Pembangunan Manusia Kutai Kartanegara tahun 2026 mencapai **78,13** — kategori Tinggi, dan meningkat konsisten sejak 2022.",
      "kemiskinan": "Persentase penduduk miskin turun konsisten menjadi **6,72%** pada 2025, namun indeks kedalaman (P1) dan keparahan (P2) justru naik — sinyal bahwa penduduk yang masih miskin berada semakin jauh di bawah garis kemiskinan.",
      "rekomendasi": "Lima arah kebijakan yang dirumuskan dalam Booklet Indikator Strategis Triwulan II 2026. Klik untuk membuka rinciannya.",
      "sumber": "Seluruh angka pada halaman ini disalin apa adanya dari Booklet Indikator Strategis Kabupaten Kutai Kartanegara yang diterbitkan BPS Kabupaten Kutai Kartanegara. Halaman ini adalah penyajian ulang dalam bentuk web, bukan publikasi resmi BPS."
    },
    "peta": {
      "judul": "Peta Sebaran Kabupaten/Kota di Kalimantan Timur, 2025",
      "sub": "Kartogram skematis — posisi kotak mendekati letak geografis. Klik atau arahkan kursor untuk melihat rincian.",
      "catatan": "Kutai Kartanegara termasuk **5 besar** wilayah dengan angka kemiskinan tertinggi di Kalimantan Timur."
    },
    "generasi": {
      "judul": "Komposisi Penduduk Menurut Generasi, 2025",
      "sub": "Gen Z dan Post Gen Z menyumbang lebih dari separuh penduduk — peluang bonus demografi."
    },
    "catatanKependudukan": [
      {
        "judul": "Total Penduduk Kutai Kartanegara 2025",
        "warna": "",
        "isi": "**845,62 ribu jiwa** (438,02 ribu laki-laki dan 407,60 ribu perempuan). Jumlah populasi tergolong cukup besar untuk ukuran kabupaten di Kalimantan Timur, yang menjadi modal penting sekaligus beban pembangunan jika tidak dikelola dengan baik."
      },
      {
        "judul": "Ketenagakerjaan",
        "isi": "TPAK **65,85%** menunjukkan lebih dari separuh penduduk usia kerja berpartisipasi aktif di pasar kerja; sisanya **34,15%** bukan angkatan kerja (bersekolah, mengurus rumah tangga, atau lainnya). TPT **4,61%** (Agustus 2026) tergolong relatif rendah dan terkendali — dari 100 angkatan kerja, sekitar 5 orang belum terserap pasar kerja. TPT naik 0,21 poin dari Agustus 2025 (4,40%), masih di bawah TPT Kalimantan Timur 5,23%.",
        "warna": "teal"
      }
    ],
    "penutup": {
      "judul": "Catatan penutup booklet",
      "isi": "Kabupaten Kutai Kartanegara memiliki **fondasi ekonomi makro yang sangat kuat** dengan kualitas pembangunan manusia (IPM) yang tinggi. Tantangan utamanya adalah **menjaga laju pertumbuhan ekonomi** agar tetap stabil melalui diversifikasi sektor, serta terus **mendorong peningkatan Rata-Rata Lama Sekolah (RLS)** ke jenjang pendidikan tinggi."
    },
    "catatanSumber": "Tanda * menunjukkan angka sementara, ** angka sangat sementara, dan *** angka sangat sangat sementara, sesuai penulisan BPS. Angka kependudukan kabupaten/kota merupakan hasil proyeksi penduduk 2020–2035 berbasis Sensus Penduduk 2020.",
    "footer": {
      "deskripsi": "Penyajian ulang Booklet Indikator Strategis Kabupaten Kutai Kartanegara Triwulan I dan II 2026 dalam bentuk dashboard web interaktif, dimutakhirkan dengan rilis resmi BPS (Triwulan III 2026). Bukan produk resmi Badan Pusat Statistik.",
      "slogan": "Bersama data, wujudkan Kutai Kartanegara maju, inklusif, dan berkelanjutan."
    }
  },
  "pembaruan": {
    "pdrbTw": {
      "periode": "TW II-2026",
      "pada": "2026-11-16T22:00:00.000Z",
      "oleh": "pemutakhiran dari rilis BPS — Tabel PDRB triwulanan kab/kota BPS Kaltim (7 Sep 2026)"
    },
    "ipm": {
      "periode": "2026",
      "pada": "2026-11-16T22:00:00.000Z",
      "oleh": "pemutakhiran dari rilis BPS — BRS BPS Kaltim No. 74/11/64/Th. XXIX (5 Nov 2026)"
    },
    "naker": {
      "periode": "2026",
      "pada": "2026-11-16T22:00:00.000Z",
      "oleh": "pemutakhiran dari rilis BPS — BRS BPS Kaltim No. 73/11/64/Th. XXIX (5 Nov 2026)"
    },
    "periode": {
      "periode": "Triwulan III 2026",
      "pada": "2026-11-16T22:00:00.000Z",
      "oleh": "pemutakhiran dari rilis BPS"
    }
  },
  "meta": {
    "terbit": "2026-11-17T06:00:00+08:00",
    "versi_berkas": "tw3-2026",
    "catatan": "Pemutakhiran Triwulan III 2026 dari rilis resmi BPS (IPM 2026, TPT/TPAK Agustus 2026, PDRB TW II-2026)."
  }
};

/* Dipakai pemuat data (assets/muat.js) sebagai cadangan dan benih. */
window.INDIKATOR_AWAL = DATA;
