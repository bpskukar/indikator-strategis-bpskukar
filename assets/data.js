/* ==========================================================================
   DATA — Booklet Indikator Strategis Kabupaten Kutai Kartanegara 2026
   Sumber: BPS Kabupaten Kutai Kartanegara
     • Volume 1, Triwulan I 2026 (terbit Juni 2026)
     • Volume 2, Triwulan II 2026 (terbit Juli 2026)
   Seluruh angka disalin apa adanya dari booklet.

   PERAN BERKAS INI SEJAK PINTAR KUKAR:
   • Isi awal (benih) untuk tabel indikator_konten di Supabase — dimuat sekali
     lewat Ruang Pegawai → tab Indikator → "Muat dari berkas awal".
   • Cadangan bila server tidak terjangkau. Setelah data ada di server,
     yang tampil di situs adalah versi server, bukan berkas ini.
   Teks boleh memakai **tebal** (dua bintang) — dirender sebagai huruf tebal.
   ========================================================================== */

const DATA = {

  /* ---------- Metadata periode ---------- */
  periode: {
    tw1: { kode: 'tw1', nama: 'Triwulan I 2026',  volume: 'Volume 1, 2026', terbit: 'Juni 2026',
           catatan: 'Booklet Triwulan I belum memuat indikator kemiskinan pada halaman indikator strategis; angka lain identik dengan Triwulan II karena bersumber dari rilis tahunan yang sama.' },
    tw2: { kode: 'tw2', nama: 'Triwulan II 2026', volume: 'Volume 2, 2026', terbit: 'Juli 2026',
           catatan: 'Booklet Triwulan II menambahkan indikator kemiskinan: Persentase Penduduk Miskin (P0) dan Penduduk Rentan Miskin.' }
  },

  /* ---------- Indikator strategis ----------
     value  : angka utama (numerik, untuk animasi count-up)
     dec    : jumlah desimal saat ditampilkan
     unit   : satuan yang tampil kecil di samping angka
     kat    : kategori untuk filter
     hanya  : jika ada, indikator hanya muncul pada periode tersebut
  ------------------------------------------- */
  indikator: [
    { id:'penduduk', label:'Jumlah Penduduk', abbr:'Proyeksi penduduk pertengahan tahun',
      value:845621, dec:0, unit:'jiwa', kat:'demografi', icon:'👥', accent:'#ED7014',
      note:'Populasi Kukar tergolong cukup besar untuk ukuran kabupaten di Kalimantan Timur.', tag:'Peringkat 2 di Kaltim', tagType:'' },

    { id:'lpp', label:'Laju Pertumbuhan Penduduk', abbr:'LPP',
      value:1.48, dec:2, unit:'%', kat:'demografi', icon:'📈', accent:'#F5B32B',
      note:'Tergolong moderat/stabil; perlu diimbangi ketersediaan fasilitas publik dan lapangan kerja.', tag:'Moderat', tagType:'' },

    { id:'tpak', label:'Tingkat Partisipasi Angkatan Kerja', abbr:'TPAK',
      value:65.38, dec:2, unit:'%', kat:'ketenagakerjaan', icon:'🧑‍🏭', accent:'#2C8F8B',
      note:'Lebih dari separuh penduduk usia kerja aktif di pasar kerja — produktivitas cukup baik.', tag:'Cukup baik', tagType:'good' },

    { id:'tpt', label:'Tingkat Pengangguran Terbuka', abbr:'TPT',
      value:4.40, dec:2, unit:'%', kat:'ketenagakerjaan', icon:'🔍', accent:'#D9534F',
      note:'Relatif rendah dan terkendali; sebagian besar angkatan kerja terserap pasar kerja.', tag:'Rendah & terkendali', tagType:'good' },

    { id:'pdrb-adhb', label:'PDRB Atas Dasar Harga Berlaku', abbr:'PDRB ADHB · Tahun 2025',
      value:210653.44, dec:2, unit:'miliar Rp', kat:'ekonomi', icon:'🏭', accent:'#ED7014',
      note:'Skala ekonomi daerah yang besar, disokong sektor unggulan seperti pertambangan/energi.', tag:'Nominal', tagType:'' },

    { id:'pdrb-adhk', label:'PDRB Atas Dasar Harga Konstan', abbr:'PDRB ADHK · Tahun 2025',
      value:147909.34, dec:2, unit:'miliar Rp', kat:'ekonomi', icon:'⚙️', accent:'#6C63A6',
      note:'Nilai riil ekonomi tanpa pengaruh inflasi — kapasitas produksi riil daerah yang kokoh.', tag:'Riil', tagType:'' },

    { id:'lpe', label:'Laju Pertumbuhan Ekonomi (Y-on-Y)', abbr:'LPE · Tahun 2025',
      value:3.43, dec:2, unit:'%', kat:'ekonomi', icon:'📊', accent:'#4B9E5F',
      note:'Tumbuh positif namun melambat dari 5,61% (2024); perlu diversifikasi di luar sektor ekstraktif.', tag:'Melambat', tagType:'warn' },

    { id:'pdrb-kapita', label:'PDRB Per Kapita Harga Berlaku', abbr:'PDRB per kapita',
      value:249.11, dec:2, unit:'juta Rp', kat:'ekonomi', icon:'💰', accent:'#F5B32B',
      note:'Rata-rata output ekonomi per penduduk sangat tinggi secara makro.', tag:'Tinggi', tagType:'good' },

    { id:'uhh', label:'Umur Harapan Hidup', abbr:'UHH',
      value:74.65, dec:2, unit:'tahun', kat:'manusia', icon:'❤️', accent:'#D9534F',
      note:'Derajat kesehatan masyarakat sudah sangat baik, melampaui 74 tahun.', tag:'+0,32 tahun', tagType:'good' },

    { id:'hls', label:'Harapan Lama Sekolah', abbr:'HLS',
      value:13.85, dec:2, unit:'tahun', kat:'manusia', icon:'🏫', accent:'#2C8F8B',
      note:'Anak usia sekolah diperkirakan menempuh pendidikan hingga jenjang Diploma I.', tag:'+0,20 tahun', tagType:'good' },

    { id:'rls', label:'Rata-Rata Lama Sekolah', abbr:'RLS',
      value:9.28, dec:2, unit:'tahun', kat:'manusia', icon:'📚', accent:'#6C63A6',
      note:'Penduduk 25 tahun ke atas rata-rata setara kelas 9 (SMP). Gap dengan HLS masih lebar.', tag:'+0,01 tahun', tagType:'warn' },

    { id:'ppp', label:'Pengeluaran Per Kapita Disesuaikan', abbr:'PPP',
      value:13365, dec:0, unit:'ribu Rp/tahun', kat:'manusia', icon:'🛒', accent:'#4B9E5F',
      note:'Pengeluaran riil ±Rp13,36 juta per orang per tahun — daya beli cukup memadai.', tag:'+Rp408 ribu', tagType:'good' },

    { id:'ipm', label:'Indeks Pembangunan Manusia', abbr:'IPM · Tahun 2025',
      value:77.25, dec:2, unit:'', kat:'manusia', icon:'🌟', accent:'#ED7014',
      note:'Kategori Tinggi. Pembangunan manusia di Kukar seimbang dan progresif.', tag:'Kategori Tinggi', tagType:'good' },

    { id:'gini', label:'Koefisien Gini (Gini Rasio)', abbr:'Gini',
      value:0.285, dec:3, unit:'', kat:'pemerataan', icon:'⚖️', accent:'#2C8F8B',
      note:'Di bawah 0,33 — ketimpangan pendapatan antarpenduduk tergolong rendah.', tag:'Ketimpangan rendah', tagType:'good' },

    { id:'ikg', label:'Indeks Ketimpangan Gender', abbr:'IKG',
      value:0.349, dec:3, unit:'', kat:'pemerataan', icon:'♀♂', accent:'#6C63A6',
      note:'Nilai relatif rendah (mendekati 0): ketimpangan gender semakin menipis.', tag:'Menipis', tagType:'good' },

    { id:'p0', label:'Persentase Penduduk Miskin', abbr:'P0 · Tahun 2025',
      value:6.72, dec:2, unit:'%', kat:'pemerataan', icon:'🏚️', accent:'#D9534F',
      note:'6 sampai 7 dari 100 penduduk masih mengalami kemiskinan pada tahun 2025.', tag:'Turun dari 7,28%', tagType:'good', hanya:'tw2' },

    { id:'rentan', label:'Penduduk Rentan Miskin', abbr:'Rentan miskin',
      value:18.29, dec:2, unit:'%', kat:'pemerataan', icon:'⚠️', accent:'#F5B32B',
      note:'Kelompok yang berisiko jatuh ke bawah garis kemiskinan bila terjadi guncangan ekonomi.', tag:'Perlu perlindungan sosial', tagType:'warn', hanya:'tw2' }
  ],

  kategori: [
    { id:'semua',          label:'Semua indikator' },
    { id:'demografi',      label:'Demografi' },
    { id:'ketenagakerjaan',label:'Ketenagakerjaan' },
    { id:'ekonomi',        label:'Ekonomi' },
    { id:'manusia',        label:'Pembangunan Manusia' },
    { id:'pemerataan',     label:'Pemerataan & Kemiskinan' }
  ],

  /* ---------- PDRB triwulanan (miliar rupiah) ---------- */
  pdrbTriwulan: {
    sub:   'Perbandingan lima triwulan terakhir, TW I-2025 sampai TW I-2026',
    label: ['TW I-2025','TW II-2025','TW III-2025','TW IV-2025','TW I-2026'],
    adhb:  [51774.49, 52469.19, 51461.29, 54948.47, 54915.00],
    adhk:  [35979.64, 36732.85, 36672.09, 38524.76, 36769.75],
    lpe:   [2.17, 4.45, 3.35, 3.72, 2.20]
  },

  /* ---------- PDRB tahunan (miliar rupiah) ---------- */
  pdrbTahun: {
    sub:   'Perkembangan tahunan 2021–2025. *angka sementara  **angka sangat sementara',
    label: ['2021','2022','2023','2024*','2025**'],
    adhb:  [177416.58, 240392.59, 204872.66, 204698.39, 210653.44],
    adhk:  [124197.10, 128798.43, 135406.05, 143008.83, 147909.34],
    lpe:   [2.68, 3.70, 5.13, 5.61, 3.43]
  },

  /* ---------- IPM ---------- */
  ipm: {
    judul: 'Perkembangan IPM 2021–2025',
    sub:   'Peningkatan tahun 2025 didorong oleh naiknya seluruh indikator penyusun.',
    judulKomponen: 'Indikator Penyusun IPM',
    subKomponen:   'Perubahan dibanding tahun 2024',
    label: ['2021','2022','2023','2024','2025'],
    nilai: [74.69, 75.31, 75.95, 76.57, 77.25],
    komponen: [
      { nama:'Umur Harapan Hidup saat Lahir', nilai:'74,65', satuan:'tahun', delta:'+0,32 tahun' },
      { nama:'Harapan Lama Sekolah',          nilai:'13,85', satuan:'tahun', delta:'+0,20 tahun' },
      { nama:'Rata-Rata Lama Sekolah',        nilai:'9,28',  satuan:'tahun', delta:'+0,01 tahun' },
      { nama:'Pengeluaran Riil per Kapita',   nilai:'13.365',satuan:'ribu Rp', delta:'+Rp408 ribu' }
    ]
  },

  /* ---------- Komposisi generasi 2025 (%) ---------- */
  generasi: [
    { nama:'Post Gen Z',                 nilai:23.70, ket:'Lahir 2011–2025 · usia 0–14 tahun',   warna:'#5A3A22' },
    { nama:'Gen Z',                      nilai:26.90, ket:'Lahir 1996–2010 · usia 15–29 tahun',  warna:'#F5B32B' },
    { nama:'Milenial',                   nilai:16.20, ket:'Lahir 1981–1995 · usia 30–39 tahun',  warna:'#D9534F' },
    { nama:'Gen X',                      nilai:24.50, ket:'Lahir 1966–1980 · usia 40–59 tahun',  warna:'#ED7014' },
    { nama:'Baby Boomer & Pre Boomer',   nilai: 8.80, ket:'Lahir sebelum 1965 · usia 60–75+',    warna:'#C4A484' }
  ],

  demografiStat: [
    { label:'Laju pertumbuhan penduduk 2020–2025', value:'3,16%' },
    { label:'Rasio jenis kelamin (per 100 perempuan)', value:'107,46' },
    { label:'Penduduk usia produktif (15–64 th)', value:'70,96%' },
    { label:'Penduduk lansia (60 tahun ke atas)', value:'8,82%' }
  ],

  /* ---------- Kemiskinan ---------- */
  kemiskinan: {
    judul:      'P0, P1, dan P2 Kemiskinan 2021–2025',
    sub:        'P0 pada sumbu kanan (%), P1 dan P2 pada sumbu kiri (indeks).',
    judulGaris: 'Perkembangan Garis Kemiskinan 2021–2025',
    subGaris:   'Rupiah per kapita per bulan.',
    label: ['2021','2022','2023','2024','2025'],
    p0: [7.99, 7.96, 7.61, 7.28, 6.72],
    p1: [1.22, 1.18, 0.91, 0.65, 0.79],
    p2: [0.37, 0.26, 0.17, 0.10, 0.15],
    garis: [569640, 605321, 644570, 682490, 705397]
  },

  /* ---------- Wilayah Kalimantan Timur 2025 ----------
     laki/perempuan dalam ribu jiwa · miskin dalam persen
     row/col = posisi kartogram (perkiraan letak geografis)
  ------------------------------------------------------ */
  wilayah: [
    { nama:'Berau',               kode:'BRU', laki:140.89, perempuan:124.41, miskin:4.44,  row:1, col:2 },
    { nama:'Mahakam Ulu',         kode:'MHU', laki:17.89,  perempuan:16.85,  miskin:10.09, row:2, col:1 },
    { nama:'Kutai Timur',         kode:'KTM', laki:251.46, perempuan:218.94, miskin:8.07,  row:2, col:3 },
    { nama:'Kutai Barat',         kode:'KBR', laki:94.57,  perempuan:85.74,  miskin:8.72,  row:3, col:1 },
    { nama:'Kutai Kartanegara',   kode:'KKR', laki:438.02, perempuan:407.60, miskin:6.72,  row:3, col:2, home:true },
    { nama:'Bontang',             kode:'BTG', laki:97.49,  perempuan:93.22,  miskin:3.21,  row:3, col:3 },
    { nama:'Samarinda',           kode:'SMD', laki:439.04, perempuan:426.27, miskin:3.45,  row:4, col:2 },
    { nama:'Paser',               kode:'PSR', laki:150.12, perempuan:139.63, miskin:8.13,  row:5, col:1 },
    { nama:'Penajam Paser Utara', kode:'PPU', laki:205.10, perempuan:194.93, miskin:5.78,  row:5, col:2 },
    { nama:'Balikpapan',          kode:'BPP', laki:369.83, perempuan:355.61, miskin:1.97,  row:5, col:3 }
  ],

  /* ---------- Rekomendasi kebijakan (Booklet TW II) ---------- */
  rekomendasi: [
    { judul:'Perlindungan Sosial & Pengentasan Kemiskinan Tepat Sasaran', poin:[
      ['Intervensi Prioritas Kelompok Rentan','Penguatan Bantuan Sosial Terpadu dan jaring pengaman sosial pada kelompok rentan miskin agar tidak jatuh ke bawah garis kemiskinan akibat inflasi atau gejolak ekonomi.'],
      ['Pemberdayaan Ekonomi Keluarga Miskin','Pengalokasian program berbasis wirausaha mikro dan pelatihan keterampilan kerja yang menyasar langsung rumah tangga miskin secara presisi.']
    ]},
    { judul:'Diversifikasi Ekonomi & Penguatan Sektor Non-Ekstraktif', poin:[
      ['Akselerasi Sektor Penyediaan Makanan/Minuman & UMKM Kuliner','Menjadikan sektor UMKM olahan pangan, kuliner, dan pariwisata sebagai "motor" baru pertumbuhan ekonomi guna mengurai ketergantungan pada sektor pertambangan/energi.'],
      ['Kemudahan Akses Modal & Pasar','Pemberian insentif usaha, fasilitasi legalitas/halal, serta kemudahan sertifikasi bagi pelaku UMKM ekonomi kreatif.']
    ]},
    { judul:'Penguatan Kesetaraan Gender & Ketahanan Keluarga', poin:[
      ['Pemberdayaan Perempuan di Pasar Kerja','Peningkatan akses perempuan terhadap modal usaha, program pelatihan kepemimpinan, serta perlindungan kesehatan reproduksi di tempat kerja untuk terus menekan angka IKG.'],
      ['Penguatan Layanan Lansia','Persiapan program perlindungan sosial dan fasilitas kesehatan ramah lansia sejak dini.']
    ]},
    { judul:'Peningkatan Kualitas SDM & Pembangunan Pendidikan', poin:[
      ['Program Beasiswa & Kejar Paket C/D3','Buka program afirmasi pendidikan tinggi dan pelatihan keahlian (up-skilling) untuk angkatan kerja dewasa demi menaikkan RLS.'],
      ['Vokasi Bertarget','Dorong integrasi kurikulum SMK dan Pendidikan Vokasi yang disesuaikan dengan kebutuhan pasar kerja lokal dan kawasan pendukung IKN.']
    ]},
    { judul:'Optimalisasi Bonus Demografi & Penyerapan Tenaga Kerja', poin:[
      ['Penciptaan Lapangan Kerja Hijau & Digital','Sediakan ruang inkubasi bisnis digital dan kewirausahaan muda untuk menyerap angkatan kerja Gen Z dan Milenial, terutama di sektor ekonomi hijau.'],
      ['Menjaga Tingkat Partisipasi Kerja','Pertahankan Tingkat Pengangguran Terbuka (TPT) di angka rendah melalui Job Fair berkala dan kemitraan strategis antara industri daerah dengan angkatan kerja lokal.']
    ]}
  ],

  /* ---------- Narasi tematik ---------- */
  narasi: {
    ekonomi: [
      ['PDRB Harga Berlaku — Rp210.653,44 miliar','Menunjukkan nilai total produk dan jasa yang dihasilkan secara nominal sangat besar, mencerminkan besarnya skala **ekonomi daerah Kukar yang disokong oleh sektor-sektor unggulan** (seperti pertambangan/energi).'],
      ['PDRB Harga Konstan — Rp147.909,34 miliar','Nilai riil ekonomi Kukar (tanpa pengaruh inflasi) menunjukkan kapasitas produksi riil daerah yang **kokoh**.'],
      ['Laju Pertumbuhan Ekonomi — 3,43%','Ekonomi Kukar mengalami **pertumbuhan positif secara tahunan**. Meskipun tumbuh positif, lajunya berada di tingkat yang moderat, menandakan diperlukannya diversifikasi ekonomi agar tidak hanya bergantung pada sektor ekstraktif.'],
      ['PDRB Per Kapita — Rp249,11 juta','Rata-rata output ekonomi per penduduk sangat tinggi, mengindikasikan bahwa Kukar adalah daerah **berpendapatan/produksi tinggi per kapita secara makro**.']
    ],
    manusia: [
      ['Umur Harapan Hidup — 74,65 tahun','Tingkat kesehatan masyarakat dan kualitas derajat kesehatan (akses medis, sanitasi, dan gizi) **sudah sangat baik**, tercermin dari harapan hidup yang melampaui 74 tahun.'],
      ['Harapan Lama Sekolah — 13,85 tahun','Anak-anak usia sekolah diperkirakan dapat menempuh pendidikan hingga jenjang Diploma I / semester awal perguruan tinggi. Ini **mencerminkan akses pendidikan dasar-menengah yang sudah terjamin**.'],
      ['Rata-Rata Lama Sekolah — 9,28 tahun','Rata-rata penduduk usia 25 tahun ke atas menamatkan pendidikan setara kelas 9 (SMP). Terdapat gap antara HLS dan RLS, yang **mengindikasikan generasi muda memiliki peluang pendidikan jauh lebih tinggi dibanding generasi sebelumnya**.'],
      ['Pengeluaran Per Kapita — Rp13.365 ribu','Pengeluaran riil per orang per tahun mencapai sekitar Rp13,36 juta, **menggambarkan tingkat daya beli dan standar hidup riil masyarakat yang cukup memadai**.'],
      ['IPM — 77,25','Skor IPM tergolong kategori Tinggi (di atas 70–80). Hal ini mengonfirmasi bahwa **pembangunan manusia di Kukar seimbang dan progresif** dari segi kesehatan, pendidikan, maupun standar hidup layak.']
    ],
    pemerataan: [
      ['Koefisien Gini — 0,285','Angka di bawah 0,33 menunjukkan bahwa ketimpangan pendapatan antarpenduduk di Kukar **tergolong rendah**. Hasil pertumbuhan ekonomi relatif terdistribusi dengan baik di masyarakat.'],
      ['Indeks Ketimpangan Gender — 0,349','Nilai IKG yang relatif rendah (mendekati 0) mengindikasikan bahwa ketimpangan antara laki-laki dan perempuan dalam hal kesehatan reproduksi, pemberdayaan, dan pasar kerja **semakin menipis**.']
    ]
  },

  /* ---------- Sumber ---------- */
  sumber: [
    ['Booklet Indikator Strategis Kabupaten Kutai Kartanegara, Triwulan I 2026 (Volume 1)','BPS Kabupaten Kutai Kartanegara'],
    ['Booklet Indikator Strategis Kabupaten Kutai Kartanegara, Triwulan II 2026 (Volume 2)','BPS Kabupaten Kutai Kartanegara'],
    ['Survei Sosial Ekonomi Nasional (Susenas)','Badan Pusat Statistik'],
    ['Survei Angkatan Kerja Nasional (Sakernas)','Badan Pusat Statistik'],
    ['Hasil Proyeksi Penduduk Kabupaten/Kota Provinsi Kalimantan Timur 2020–2035 (SP2020)','Badan Pusat Statistik'],
    ['Produk Domestik Regional Bruto Kabupaten/Kota','BPS Provinsi Kalimantan Timur']
  ],

  /* ---------- Angka sorotan (kotak berwarna di bawah grafik) ----------
     gaya: '' = oranye, 'amber' = kuning
  ---------------------------------------------------------------------- */
  sorotan: {
    ekonomi: [
      { judul:'Pertumbuhan Ekonomi Triwulan I-2026 (y-on-y)', nilai:'2,20%',  gaya:'',
        ket:'Tumbuh 2,20% dibanding TW I-2025, namun terkontraksi 4,56% dibanding TW IV-2025 (q-to-q).' },
      { judul:'Sektor tumbuh tercepat, TW I-2026',            nilai:'25,97%', gaya:'amber',
        ket:'Sektor Penyediaan Makanan dan Minuman — kandidat motor pertumbuhan non-ekstraktif.' },
      { judul:'Kontribusi terhadap PDRB Kaltim',              nilai:'25,64%', gaya:'',
        ket:'PDRB ADHB Kukar TW I-2026 sebesar Rp54.915 miliar dari total 10 kabupaten/kota di Kaltim.' }
    ],
    kemiskinan: [
      { judul:'Penduduk miskin 2025',   nilai:'6–7 dari 100', gaya:'amber',
        ket:'Sekitar 6 sampai 7 dari 100 penduduk masih mengalami kemiskinan pada tahun 2025.' },
      { judul:'Garis kemiskinan 2025',  nilai:'Rp705.397',    gaya:'',
        ket:'Naik Rp22.907 dibanding 2024. Penduduk berkategori miskin bila pengeluaran per kapita per bulan di bawah angka ini.' },
      { judul:'Penduduk rentan miskin', nilai:'18,29%',       gaya:'amber',
        ket:'Kelompok yang berisiko jatuh ke bawah garis kemiskinan bila terjadi inflasi atau gejolak ekonomi.' }
    ]
  },

  /* ---------- Teks halaman (judul, pengantar, catatan) ----------
     Semua yang memuat angka ditaruh di sini supaya bisa diperbaiki dari
     Ruang Pegawai tanpa menyentuh HTML. **tebal** = huruf tebal.
  ------------------------------------------------------------------ */
  teks: {
    hero: {
      judul: 'Potret **pembangunan daerah** Kutai Kartanegara dalam angka',
      lede:  'Ringkasan indikator strategis yang menggambarkan kondisi demografi, ketenagakerjaan, perekonomian, pembangunan manusia, serta pemerataan dan kemiskinan — disarikan dari Booklet Indikator Strategis Triwulan I dan Triwulan II 2026.',
      mini:  ['penduduk', 'lpe', 'ipm', 'tpt']
    },
    pengantar: {
      ringkasan:   'Indikator strategis digunakan untuk mengukur **capaian pembangunan daerah** di berbagai bidang, meliputi demografi, ekonomi, kesejahteraan masyarakat, dan kesetaraan gender. Cari indikator, saring berdasarkan kategori, atau bandingkan antarperiode.',
      ekonomi:     'Produk Domestik Regional Bruto (PDRB) adalah nilai keseluruhan semua barang dan jasa yang diproduksi pada suatu wilayah dalam jangka waktu tertentu — atas dasar harga berlaku (nominal) dan atas dasar harga konstan (riil).',
      kependudukan:'Kutai Kartanegara menduduki **peringkat kedua** sebagai kabupaten/kota dengan jumlah penduduk tertinggi di Kalimantan Timur, dengan struktur usia yang didominasi kelompok produktif.',
      manusia:     'Indeks Pembangunan Manusia Kutai Kartanegara tahun 2025 mencapai **77,25** — kategori Tinggi, dan meningkat konsisten sejak 2021.',
      kemiskinan:  'Persentase penduduk miskin turun konsisten menjadi **6,72%** pada 2025, namun indeks kedalaman (P1) dan keparahan (P2) justru naik — sinyal bahwa penduduk yang masih miskin berada semakin jauh di bawah garis kemiskinan.',
      rekomendasi: 'Lima arah kebijakan yang dirumuskan dalam Booklet Indikator Strategis Triwulan II 2026. Klik untuk membuka rinciannya.',
      sumber:      'Seluruh angka pada halaman ini disalin apa adanya dari Booklet Indikator Strategis Kabupaten Kutai Kartanegara yang diterbitkan BPS Kabupaten Kutai Kartanegara. Halaman ini adalah penyajian ulang dalam bentuk web, bukan publikasi resmi BPS.'
    },
    peta: {
      judul:   'Peta Sebaran Kabupaten/Kota di Kalimantan Timur, 2025',
      sub:     'Kartogram skematis — posisi kotak mendekati letak geografis. Klik atau arahkan kursor untuk melihat rincian.',
      catatan: 'Kutai Kartanegara termasuk **5 besar** wilayah dengan angka kemiskinan tertinggi di Kalimantan Timur.'
    },
    generasi: {
      judul: 'Komposisi Penduduk Menurut Generasi, 2025',
      sub:   'Gen Z dan Post Gen Z menyumbang lebih dari separuh penduduk — peluang bonus demografi.'
    },
    catatanKependudukan: [
      { judul:'Total Penduduk Kutai Kartanegara 2025', warna:'',
        isi:'**845,62 ribu jiwa** (438,02 ribu laki-laki dan 407,60 ribu perempuan). Jumlah populasi tergolong cukup besar untuk ukuran kabupaten di Kalimantan Timur, yang menjadi modal penting sekaligus beban pembangunan jika tidak dikelola dengan baik.' },
      { judul:'Ketenagakerjaan', warna:'teal',
        isi:'TPAK **65,38%** menunjukkan lebih dari separuh penduduk usia kerja berpartisipasi aktif di pasar kerja. Sisanya **34,62%** tidak tergolong angkatan kerja (pelajar, ibu rumah tangga, atau penerima pendapatan pasif). TPT **4,40%** tergolong relatif rendah dan terkendali.' }
    ],
    penutup: {
      judul: 'Catatan penutup booklet',
      isi:   'Kabupaten Kutai Kartanegara memiliki **fondasi ekonomi makro yang sangat kuat** dengan kualitas pembangunan manusia (IPM) yang tinggi. Tantangan utamanya adalah **menjaga laju pertumbuhan ekonomi** agar tetap stabil melalui diversifikasi sektor, serta terus **mendorong peningkatan Rata-Rata Lama Sekolah (RLS)** ke jenjang pendidikan tinggi.'
    },
    catatanSumber: 'Tanda * menunjukkan angka sementara dan ** angka sangat sementara, sesuai penulisan pada booklet asli. Angka kependudukan kabupaten/kota merupakan hasil proyeksi penduduk 2020–2035 berbasis Sensus Penduduk 2020.',
    footer: {
      deskripsi: 'Penyajian ulang Booklet Indikator Strategis Kabupaten Kutai Kartanegara Triwulan I dan II 2026 dalam bentuk dashboard web interaktif. Bukan produk resmi Badan Pusat Statistik.',
      slogan:    'Bersama data, wujudkan Kutai Kartanegara maju, inklusif, dan berkelanjutan.'
    }
  }
};

/* Dipakai pemuat data (assets/muat.js) sebagai cadangan dan benih. */
window.INDIKATOR_AWAL = DATA;
