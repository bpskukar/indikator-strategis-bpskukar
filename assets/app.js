/* ==========================================================================
   Indikator Strategis Kabupaten Kutai Kartanegara — logika aplikasi
   Bagian dari PINTAR Kukar (Pusat Informasi & Layanan Statistik Terpadu).

   Isi (angka, narasi, teks) tidak lagi ditulis di HTML: semuanya datang dari
   satu objek data yang dimuat assets/muat.js — dari server Supabase bila ada,
   atau assets/data.js sebagai cadangan. Ubah isinya lewat Ruang Pegawai di
   situs katalog (tab "Indikator").
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------- Util ---------------- */

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** Format angka gaya Indonesia: 1.234,56 */
  const fmt = (n, dec = 0) =>
    Number(n || 0).toLocaleString('id-ID', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  /** Teks apa adanya → HTML aman */
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /** Teks dengan **tebal** dan baris baru → HTML aman */
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

  /** Warna dari data hanya boleh berbentuk #rgb / #rrggbb */
  const warna = (c, def) => (/^#[0-9a-fA-F]{3,8}$/.test(String(c || '')) ? c : def);

  const angka = (v, def = 0) => { const n = parseFloat(v); return isNaN(n) ? def : n; };

  /* Tautan ke layanan PST (situs katalog, satu domain) */
  const T = (window.PINTAR && window.PINTAR.TAUTAN) || {
    pintu: '/', katalog: '/katalog-data-bpskukar/', konsultasi: '/katalog-data-bpskukar/konsultasi.html',
    sahabat: '/katalog-data-bpskukar/sahabat.html', pegawai: '/katalog-data-bpskukar/admin.html'
  };

  let D = window.INDIKATOR_AWAL || {};   // diganti isi server saat init
  let INFO = { sumber: 'awal' };

  const state = {
    periode: 'tw2',
    kategori: 'semua',
    query: '',
    pdrbMode: 'triwulan',
    mapMetric: 'penduduk',
    mapFocus: 'Kutai Kartanegara'
  };

  /* ---------------- Tema (dark mode) ----------------
     Tombolnya ada di bilah PINTAR (assets/pintar.js). Di sini cukup
     menggambar ulang grafik saat tema berganti. Bila pintar.js tidak
     termuat, tema tetap diambil dari simpanan yang sama. */

  const THEME_KEY = 'kukar-theme';

  function initTheme() {
    if (window.PINTAR) return;
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* abaikan */ }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));
  }
  window.addEventListener('pintar:tema', () => { if (window.__chartsReady) refreshChartTheme(); });

  const ICON = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    luar: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>'
  };

  /** Ambil nilai CSS custom property yang sedang aktif */
  const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  /* ---------------- Teks halaman ---------------- */

  function renderTeks() {
    const t = D.teks || {};
    const isi = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

    if (t.hero) {
      isi('heroJudul', md(t.hero.judul).replace(/<strong>(.*?)<\/strong>/g, '<em>$1</em>'));
      isi('heroLede', md(t.hero.lede));
      const mini = (t.hero.mini || []).map((id) => (D.indikator || []).find((x) => x.id === id)).filter(Boolean);
      isi('heroMini', mini.map((it) => `
        <div class="mini">
          <div class="mini__label">${esc(it.label)}</div>
          <div class="mini__value"><span class="js-count" data-value="${angka(it.value)}" data-dec="${angka(it.dec)}">0</span>${
            it.unit === '%' ? '<small>%</small>' : ''}</div>
        </div>`).join(''));
    }
    Object.entries(t.pengantar || {}).forEach(([k, v]) => isi('pengantar-' + k, md(v)));
    if (t.peta) { isi('petaJudul', esc(t.peta.judul)); isi('petaSub', esc(t.peta.sub)); isi('petaCatatan', md(t.peta.catatan)); }
    if (t.generasi) { isi('generasiJudul', esc(t.generasi.judul)); isi('generasiSub', esc(t.generasi.sub)); }
    isi('catatanKependudukan', (t.catatanKependudukan || []).map((c) =>
      `<div class="note"${/^[a-z-]{2,20}$/.test(c.warna || '') ? ` style="border-left-color:var(--${c.warna})"` : ''}><h4>${esc(c.judul)}</h4><p>${md(c.isi)}</p></div>`).join(''));
    if (t.penutup) { isi('penutupJudul', esc(t.penutup.judul)); isi('penutupIsi', md(t.penutup.isi)); }
    isi('catatanSumber', '<strong>Catatan angka PDRB tahunan:</strong> ' + md(t.catatanSumber || ''));
    if (t.footer) { isi('footerDeskripsi', md(t.footer.deskripsi)); isi('footerSlogan', md(t.footer.slogan)); }

    const ipm = D.ipm || {}, km = D.kemiskinan || {};
    isi('ipmJudul', esc(ipm.judul)); isi('ipmSub', esc(ipm.sub));
    isi('ipmJudulKomponen', esc(ipm.judulKomponen)); isi('ipmSubKomponen', esc(ipm.subKomponen));
    isi('kemiskinanJudul', esc(km.judul)); isi('kemiskinanSub', esc(km.sub));
    isi('garisJudul', esc(km.judulGaris)); isi('garisSub', esc(km.subGaris));
  }

  function renderSorotan() {
    const s = D.sorotan || {};
    const kotak = (arr) => (arr || []).map((b) => `
      <div class="banner__item${b.gaya === 'amber' ? ' amber' : ''}">
        <h4>${esc(b.judul)}</h4>
        <div class="big">${esc(b.nilai)}</div>
        <p>${md(b.ket)}</p>
      </div>`).join('');
    const e = $('#sorotanEkonomi'); if (e) e.innerHTML = kotak(s.ekonomi);
    const k = $('#sorotanKemiskinan'); if (k) k.innerHTML = kotak(s.kemiskinan);
  }

  /* ---------------- Render KPI ---------------- */

  function renderKPI() {
    const grid = $('#kpiGrid');
    if (!grid) return;

    grid.innerHTML = (D.indikator || []).map((it) => {
      const q = encodeURIComponent(it.label);
      const tanya = encodeURIComponent('berapa ' + it.label + ' Kukar?');
      return `
      <article class="kpi reveal"
               style="--kpi-accent:${warna(it.accent, '#ED7014')}"
               data-kat="${esc(it.kat)}"
               data-only="${esc(it.hanya || '')}"
               data-text="${esc((it.label + ' ' + it.abbr + ' ' + it.note + ' ' + it.id).toLowerCase())}">
        <div class="kpi__top">
          <div class="kpi__icon" aria-hidden="true">${esc(it.icon)}</div>
          <div>
            <div class="kpi__label">${esc(it.label)}</div>
            <div class="kpi__abbr">${esc(it.abbr)}</div>
          </div>
        </div>
        <div class="kpi__value">
          <span class="js-count" data-value="${angka(it.value)}" data-dec="${angka(it.dec)}">0</span>${
            it.unit ? `<span class="kpi__unit">${esc(it.unit)}</span>` : ''
          }
        </div>
        <p class="kpi__note">${md(it.note)}</p>
        ${it.tag ? `<span class="kpi__tag ${it.tagType === 'good' || it.tagType === 'warn' ? it.tagType : ''}">${esc(it.tag)}</span>` : ''}
        <div class="kpi__aksi">
          <a href="${T.katalog}?q=${q}" title="Cari data lengkapnya di Katalog Data PST">Minta data lengkap ${ICON.luar}</a>
          <a href="${T.katalog}?tanya=${tanya}" title="Tanyakan ke asisten PST">Tanya PST</a>
        </div>
      </article>`;
    }).join('');

    filterKPI();
    observeReveal(grid);
    observeCounters(grid);
  }

  function filterKPI() {
    const cards = $$('#kpiGrid .kpi');
    let visible = 0;

    cards.forEach((card) => {
      const only  = card.dataset.only;
      const okPer = !only || only === state.periode;
      const okKat = state.kategori === 'semua' || card.dataset.kat === state.kategori;
      const okQ   = !state.query || card.dataset.text.includes(state.query);
      const show  = okPer && okKat && okQ;

      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });

    $('#kpiEmpty').hidden = visible > 0;
    $('#kpiCount').textContent = visible;
  }

  function renderKategori() {
    const el = $('#chipKategori');
    if (!el) return;
    el.innerHTML = (D.kategori || []).map((k) =>
      `<button class="chip${k.id === state.kategori ? ' is-active' : ''}" data-value="${esc(k.id)}">${esc(k.label)}</button>`).join('');
  }

  /* ---------------- Count-up ---------------- */

  function countUp(el) {
    const target = parseFloat(el.dataset.value);
    const dec    = parseInt(el.dataset.dec, 10) || 0;
    const dur    = 1100;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) { el.textContent = fmt(target, dec); return; }

    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased, dec);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target, dec);
    };
    requestAnimationFrame(step);
  }

  function observeCounters(root = document) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !e.target.dataset.done) {
          e.target.dataset.done = '1';
          countUp(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: .4 });

    $$('.js-count', root).forEach((el) => io.observe(el));
  }

  /* ---------------- Reveal on scroll ---------------- */

  function observeReveal(root = document) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('is-in'), Math.min(i * 45, 260));
          io.unobserve(e.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px' });

    $$('.reveal', root).forEach((el) => io.observe(el));
  }

  /* ---------------- Kartogram Kalimantan Timur ---------------- */

  const SCALE = {
    penduduk: ['#FFF1DF', '#FFD8A8', '#FBB35E', '#F08C2E', '#D45D06'],
    miskin:   ['#FDE7E4', '#F8C4BE', '#F09A92', '#E06B62', '#C2413A']
  };

  const totalPenduduk = (w) => angka(w.laki) + angka(w.perempuan);

  function colorFor(w) {
    const arr = D.wilayah.map((x) => state.mapMetric === 'penduduk' ? totalPenduduk(x) : angka(x.miskin));
    const min = Math.min(...arr), max = Math.max(...arr);
    const v = state.mapMetric === 'penduduk' ? totalPenduduk(w) : angka(w.miskin);
    const t = max === min ? 0 : (v - min) / (max - min);
    const scale = SCALE[state.mapMetric];
    return scale[Math.min(scale.length - 1, Math.floor(t * scale.length))];
  }

  function renderMap() {
    const el = $('#cartogram');
    if (!el || !D.wilayah) return;

    el.innerHTML = D.wilayah.map((w) => {
      const isPend = state.mapMetric === 'penduduk';
      const val  = isPend ? fmt(totalPenduduk(w), 2) : fmt(angka(w.miskin), 2);
      const unit = isPend ? 'ribu jiwa' : '% miskin';
      const bg   = colorFor(w);
      return `
        <button type="button"
                class="region${w.home ? ' is-home' : ''}${w.nama === state.mapFocus ? ' is-focus' : ''}"
                style="grid-row:${parseInt(w.row, 10) || 1};grid-column:${parseInt(w.col, 10) || 1};background:${bg};color:#3A2113"
                data-nama="${esc(w.nama)}"
                aria-label="${esc(w.nama)}: ${val} ${unit}">
          <span class="region__name">${esc(w.nama)}</span>
          <span class="region__val">${val}</span>
          <span class="region__unit">${unit}</span>
        </button>`;
    }).join('');

    $$('.region', el).forEach((btn) => {
      const pick = () => { state.mapFocus = btn.dataset.nama; renderMap(); renderRegionDetail(); };
      btn.addEventListener('click', pick);
      btn.addEventListener('mouseenter', pick);
    });

    const scale = SCALE[state.mapMetric];
    $('#legendBar').style.background = `linear-gradient(90deg, ${scale.join(',')})`;
    $('#legendLo').textContent = state.mapMetric === 'penduduk' ? 'Sedikit' : 'Rendah';
    $('#legendHi').textContent = state.mapMetric === 'penduduk' ? 'Banyak' : 'Tinggi';
  }

  function renderRegionDetail() {
    const w = (D.wilayah || []).find((x) => x.nama === state.mapFocus) || (D.wilayah || [])[0];
    if (!w) return;
    state.mapFocus = w.nama;

    const urutPenduduk = [...D.wilayah].sort((a, b) => totalPenduduk(b) - totalPenduduk(a));
    const urutMiskin   = [...D.wilayah].sort((a, b) => angka(b.miskin) - angka(a.miskin));
    const rankP = urutPenduduk.findIndex((x) => x.nama === w.nama) + 1;
    const rankM = urutMiskin.findIndex((x) => x.nama === w.nama) + 1;

    $('#regionDetail').innerHTML = `
      <h4>${esc(w.nama)}</h4>
      <p class="rank">Peringkat ${rankP} penduduk terbanyak · peringkat ${rankM} angka kemiskinan tertinggi di Kaltim</p>
      <dl>
        <div class="row"><dt>Total penduduk</dt><dd>${fmt(totalPenduduk(w), 2)} ribu</dd></div>
        <div class="row"><dt>Laki-laki</dt><dd>${fmt(angka(w.laki), 2)} ribu</dd></div>
        <div class="row"><dt>Perempuan</dt><dd>${fmt(angka(w.perempuan), 2)} ribu</dd></div>
        <div class="row"><dt>Angka kemiskinan</dt><dd>${fmt(angka(w.miskin), 2)}%</dd></div>
      </dl>`;
  }

  /* ---------------- Chart.js ---------------- */

  const charts = {};
  const deret = (arr) => (arr || []).map((v) => angka(v));

  function baseOptions() {
    const tick = cssVar('--tick');
    const grid = cssVar('--grid-line');
    const surface = cssVar('--surface');
    const text = cssVar('--text');
    const border = cssVar('--border-strong');

    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: tick, usePointStyle: true, pointStyle: 'circle',
            boxWidth: 8, padding: 16,
            font: { family: 'Plus Jakarta Sans, sans-serif', size: 12, weight: '600' }
          }
        },
        tooltip: {
          backgroundColor: surface,
          titleColor: text,
          bodyColor: text,
          borderColor: border,
          borderWidth: 1,
          padding: 12,
          cornerRadius: 10,
          displayColors: true,
          usePointStyle: true,
          titleFont: { family: 'Plus Jakarta Sans, sans-serif', size: 13, weight: '800' },
          bodyFont:  { family: 'Plus Jakarta Sans, sans-serif', size: 12.5 }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: tick, font: { family: 'Plus Jakarta Sans, sans-serif', size: 11.5, weight: '600' } } },
        y: { grid: { color: grid, drawTicks: false }, border: { display: false }, ticks: { color: tick, font: { family: 'Plus Jakarta Sans, sans-serif', size: 11.5 }, padding: 8 } }
      }
    };
  }

  function buildPdrbChart() {
    const ctx = $('#chartPdrb');
    if (!ctx) return;
    const src = state.pdrbMode === 'triwulan' ? D.pdrbTriwulan : D.pdrbTahun;
    if (!src) return;
    const opt = baseOptions();

    opt.scales.y.title = { display: true, text: 'Miliar Rupiah', color: cssVar('--tick'), font: { size: 11, weight: '700' } };
    opt.scales.y1 = {
      position: 'right',
      grid: { display: false },
      border: { display: false },
      ticks: { color: cssVar('--tick'), callback: (v) => v + '%', font: { size: 11.5 } },
      suggestedMin: 0,
      suggestedMax: 7
    };
    opt.plugins.tooltip.callbacks = {
      label: (c) => c.dataset.yAxisID === 'y1'
        ? `${c.dataset.label}: ${fmt(c.parsed.y, 2)}%`
        : `${c.dataset.label}: Rp${fmt(c.parsed.y, 2)} miliar`
    };

    if (charts.pdrb) charts.pdrb.destroy();
    charts.pdrb = new Chart(ctx, {
      data: {
        labels: (src.label || []).map(String),
        datasets: [
          { type: 'bar', label: 'PDRB ADHB', data: deret(src.adhb), backgroundColor: cssVar('--brand'), borderRadius: 6, maxBarThickness: 42, order: 2 },
          { type: 'bar', label: 'PDRB ADHK', data: deret(src.adhk), backgroundColor: cssVar('--amber'), borderRadius: 6, maxBarThickness: 42, order: 2 },
          { type: 'line', label: 'Laju Pertumbuhan Ekonomi (%)', data: deret(src.lpe), yAxisID: 'y1',
            borderColor: cssVar('--text-soft'), backgroundColor: cssVar('--text-soft'),
            borderWidth: 2.5, tension: .35, pointRadius: 5, pointHoverRadius: 7,
            pointBackgroundColor: cssVar('--surface'), pointBorderWidth: 2.5, order: 1 }
        ]
      },
      options: opt
    });
  }

  function buildIpmChart() {
    const ctx = $('#chartIpm');
    if (!ctx || !D.ipm) return;
    const opt = baseOptions();
    const nilai = deret(D.ipm.nilai);
    opt.plugins.legend.display = false;
    opt.scales.y.suggestedMin = Math.floor(Math.min(...nilai) - 1.5);
    opt.scales.y.suggestedMax = Math.ceil(Math.max(...nilai) + 1);
    opt.plugins.tooltip.callbacks = { label: (c) => `IPM: ${fmt(c.parsed.y, 2)}` };

    if (charts.ipm) charts.ipm.destroy();
    charts.ipm = new Chart(ctx, {
      type: 'line',
      data: {
        labels: (D.ipm.label || []).map(String),
        datasets: [{
          label: 'IPM',
          data: nilai,
          borderColor: cssVar('--brand'),
          backgroundColor: (c) => {
            const { ctx: cc, chartArea } = c.chart;
            if (!chartArea) return 'rgba(237,112,20,.16)';
            const g = cc.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            g.addColorStop(0, 'rgba(237,112,20,.34)');
            g.addColorStop(1, 'rgba(237,112,20,.02)');
            return g;
          },
          fill: true,
          borderWidth: 3,
          tension: .38,
          pointRadius: 6,
          pointHoverRadius: 9,
          pointBackgroundColor: cssVar('--surface'),
          pointBorderColor: cssVar('--brand'),
          pointBorderWidth: 3
        }]
      },
      options: opt
    });
  }

  function buildGenerasiChart() {
    const ctx = $('#chartGenerasi');
    if (!ctx || !D.generasi) return;
    const opt = baseOptions();
    delete opt.scales;
    opt.cutout = '58%';
    opt.plugins.legend.position = 'right';
    opt.plugins.tooltip.callbacks = {
      label: (c) => `${c.label}: ${fmt(c.parsed, 2)}%`,
      afterLabel: (c) => (D.generasi[c.dataIndex] || {}).ket || ''
    };

    if (charts.gen) charts.gen.destroy();
    charts.gen = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: D.generasi.map((g) => String(g.nama)),
        datasets: [{
          data: D.generasi.map((g) => angka(g.nilai)),
          backgroundColor: D.generasi.map((g) => warna(g.warna, '#ED7014')),
          borderColor: cssVar('--surface'),
          borderWidth: 3,
          hoverOffset: 12
        }]
      },
      options: opt
    });
  }

  function buildKemiskinanChart() {
    const ctx = $('#chartKemiskinan');
    if (!ctx || !D.kemiskinan) return;
    const k = D.kemiskinan;
    const opt = baseOptions();
    opt.scales.y1 = {
      position: 'right',
      grid: { display: false },
      border: { display: false },
      suggestedMin: 0, suggestedMax: Math.ceil(Math.max(...deret(k.p0)) + 2),
      ticks: { color: cssVar('--tick'), callback: (v) => v + '%', font: { size: 11.5 } }
    };
    opt.plugins.tooltip.callbacks = { label: (c) => `${c.dataset.label}: ${fmt(c.parsed.y, 2)}` };

    if (charts.miskin) charts.miskin.destroy();
    charts.miskin = new Chart(ctx, {
      data: {
        labels: (k.label || []).map(String),
        datasets: [
          { type: 'bar', label: 'P1 — Indeks Kedalaman Kemiskinan', data: deret(k.p1), backgroundColor: cssVar('--amber'), borderRadius: 5, maxBarThickness: 34, order: 2 },
          { type: 'bar', label: 'P2 — Indeks Keparahan Kemiskinan', data: deret(k.p2), backgroundColor: '#8B5A2B', borderRadius: 5, maxBarThickness: 34, order: 2 },
          { type: 'line', label: 'P0 — Persentase Penduduk Miskin (%)', data: deret(k.p0), yAxisID: 'y1',
            borderColor: cssVar('--teal'), backgroundColor: cssVar('--teal'),
            borderWidth: 3, tension: .3, pointRadius: 5, pointHoverRadius: 8,
            pointBackgroundColor: cssVar('--surface'), pointBorderWidth: 3, order: 1 }
        ]
      },
      options: opt
    });
  }

  function buildGarisChart() {
    const ctx = $('#chartGaris');
    if (!ctx || !D.kemiskinan) return;
    const opt = baseOptions();
    opt.plugins.legend.display = false;
    opt.scales.y.ticks.callback = (v) => fmt(v / 1000, 0) + 'rb';
    opt.plugins.tooltip.callbacks = { label: (c) => `Garis kemiskinan: Rp${fmt(c.parsed.y, 0)} /kapita/bulan` };

    if (charts.garis) charts.garis.destroy();
    charts.garis = new Chart(ctx, {
      type: 'line',
      data: {
        labels: (D.kemiskinan.label || []).map(String),
        datasets: [{
          data: deret(D.kemiskinan.garis),
          borderColor: cssVar('--teal'),
          backgroundColor: 'rgba(44,143,139,.14)',
          fill: true,
          borderWidth: 3,
          tension: .35,
          pointRadius: 6,
          pointHoverRadius: 9,
          pointBackgroundColor: cssVar('--surface'),
          pointBorderColor: cssVar('--teal'),
          pointBorderWidth: 3
        }]
      },
      options: opt
    });
  }

  function buildAllCharts() {
    if (!window.Chart) return;
    buildPdrbChart();
    buildIpmChart();
    buildGenerasiChart();
    buildKemiskinanChart();
    buildGarisChart();
    window.__chartsReady = true;
  }

  function refreshChartTheme() {
    // Bangun ulang agar seluruh warna mengikuti tema aktif
    buildAllCharts();
  }

  /* ---------------- Rekomendasi (accordion) ---------------- */

  function renderRekomendasi() {
    const el = $('#accRekom');
    if (!el) return;

    el.innerHTML = (D.rekomendasi || []).map((r, i) => `
      <div class="acc__item${i === 0 ? ' is-open' : ''} reveal">
        <button class="acc__btn" type="button" aria-expanded="${i === 0}">
          <span class="acc__num">${i + 1}</span>
          <span class="acc__label">${esc(r.judul)}</span>
          <svg class="acc__chev" width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
        <div class="acc__panel">
          <ul>${(r.poin || []).map(([j, d]) => `<li><strong>${esc(j)}:</strong> ${md(d)}</li>`).join('')}</ul>
        </div>
      </div>`).join('');

    $$('.acc__btn', el).forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.acc__item');
        const open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });

    observeReveal(el);
  }

  /* ---------------- Narasi & tabel ---------------- */

  function renderNarasi() {
    const map = { narEkonomi: 'ekonomi', narManusia: 'manusia', narPemerataan: 'pemerataan' };
    Object.entries(map).forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = ((D.narasi || {})[key] || [])
        .map(([h, p]) => `<div class="note"><h4>${esc(h)}</h4><p>${md(p)}</p></div>`).join('');
    });
  }

  function renderStat() {
    const el = $('#demografiStat');
    if (!el) return;
    el.innerHTML = (D.demografiStat || []).map((s) => `
      <div class="stat"><div class="stat__value">${esc(s.value)}</div><div class="stat__label">${esc(s.label)}</div></div>
    `).join('');
  }

  function renderKomponenIpm() {
    const el = $('#ipmKomponen');
    if (!el || !D.ipm) return;
    el.innerHTML = (D.ipm.komponen || []).map((k) => `
      <div class="row">
        <dt>${esc(k.nama)}</dt>
        <dd>${esc(k.nilai)} <span style="font-weight:600;font-size:11.5px;color:var(--text-mute)">${esc(k.satuan)}</span>
          ${k.delta ? `<span class="kpi__tag good" style="margin-left:6px">${esc(k.delta)}</span>` : ''}</dd>
      </div>`).join('');
  }

  function renderSumber() {
    const el = $('#tabelSumber');
    if (!el) return;
    el.innerHTML = (D.sumber || [])
      .map(([judul, lembaga], i) => `<tr><td class="num">${i + 1}</td><td>${esc(judul)}</td><td>${esc(lembaga)}</td></tr>`)
      .join('');
  }

  /* ---------------- Periode ---------------- */

  function renderPeriodeTombol() {
    const per = D.periode || {};
    $$('[data-seg="periode"]').forEach((seg) => {
      const pendek = seg.closest('.hero__panel');
      seg.innerHTML = Object.keys(per).map((k) =>
        `<button type="button" data-value="${esc(k)}"${k === state.periode ? ' class="is-active"' : ''}>${
          esc(pendek ? String(per[k].nama).replace(/\s*\d{4}$/, '') : per[k].nama)}</button>`).join('');
    });
  }

  function applyPeriode() {
    const p = (D.periode || {})[state.periode] || {};
    $$('.js-periode-nama').forEach((el) => { el.textContent = p.nama || ''; });
    $$('.js-periode-vol').forEach((el)  => { el.textContent = p.volume ? `${p.volume} · terbit ${p.terbit}` : ''; });

    const cat = $('#periodeCatatan');
    if (cat) cat.textContent = p.catatan || '';
    filterKPI();
  }

  /* ---------------- Sumber data & versi ---------------- */

  function renderVersi() {
    const el = $('#infoVersi');
    if (!el) return;
    const tgl = (iso) => {
      if (!iso) return '';
      const d = new Date(iso);
      return isNaN(d) ? '' : d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };
    const ket = {
      server: `Isi versi ${INFO.versi || '-'}${INFO.diubah_pada ? ', diperbarui ' + tgl(INFO.diubah_pada) : ''} — dikelola lewat Ruang Pegawai PST.`,
      cache:  `Server tidak terjangkau; menampilkan salinan terakhir (versi ${INFO.versi || '-'}).`,
      draf:   'PRATINJAU DRAF — belum diterbitkan.',
      demo:   `Mode demo: isi dari simpanan peramban (versi ${INFO.versi || '-'}).`,
      awal:   'Isi dari berkas awal (assets/data.js).'
    };
    el.textContent = ket[INFO.sumber] || '';
    const spanduk = $('#spandukPratinjau');
    if (spanduk) spanduk.hidden = INFO.sumber !== 'draf';
  }

  /* ---------------- Navigasi ---------------- */

  function initNav() {
    const burger = $('#burger');
    const drawer = $('#drawer');

    burger.innerHTML = ICON.menu;
    burger.addEventListener('click', () => drawer.classList.toggle('is-open'));
    $$('#drawer a').forEach((a) => a.addEventListener('click', () => drawer.classList.remove('is-open')));

    // Tautan ke situs saudara (satu domain)
    $$('a[data-pintar]').forEach((a) => { if (T[a.dataset.pintar]) a.href = T[a.dataset.pintar]; });

    // Highlight menu aktif saat menggulir
    const links = $$('.nav__links a[href^="#"]');
    const secs  = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    secs.forEach((s) => io.observe(s));

    // Tombol ke atas
    const top = $('#toTop');
    window.addEventListener('scroll', () => {
      top.classList.toggle('is-show', window.scrollY > 600);
    }, { passive: true });
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------------- Kontrol ---------------- */

  function initControls() {
    // Toggle periode (bisa ada beberapa di halaman)
    $$('[data-seg="periode"]').forEach((seg) => {
      seg.addEventListener('click', (e) => {
        const btn = e.target.closest('button'); if (!btn) return;
        state.periode = btn.dataset.value;
        $$('[data-seg="periode"] button').forEach((b) =>
          b.classList.toggle('is-active', b.dataset.value === state.periode));
        applyPeriode();
      });
    });

    // Filter kategori
    $('#chipKategori').addEventListener('click', (e) => {
      const chip = e.target.closest('.chip'); if (!chip) return;
      state.kategori = chip.dataset.value;
      $$('#chipKategori .chip').forEach((c) => c.classList.toggle('is-active', c === chip));
      filterKPI();
    });

    // Pencarian
    const input = $('#searchInput');
    input.addEventListener('input', () => {
      state.query = input.value.trim().toLowerCase();
      filterKPI();
    });

    // Mode PDRB
    $$('[data-seg="pdrb"] button').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.pdrbMode = btn.dataset.value;
        $$('[data-seg="pdrb"] button').forEach((b) =>
          b.classList.toggle('is-active', b.dataset.value === state.pdrbMode));
        $('#pdrbSub').textContent = ((state.pdrbMode === 'triwulan' ? D.pdrbTriwulan : D.pdrbTahun) || {}).sub || '';
        buildPdrbChart();
      });
    });
    $('#pdrbSub').textContent = (D.pdrbTriwulan || {}).sub || '';

    // Metrik peta
    $$('[data-seg="map"] button').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.mapMetric = btn.dataset.value;
        $$('[data-seg="map"] button').forEach((b) =>
          b.classList.toggle('is-active', b.dataset.value === state.mapMetric));
        renderMap();
      });
    });
  }

  /* ---------------- Init ---------------- */

  function gambar() {
    renderTeks();
    renderSorotan();
    renderKategori();
    renderKPI();
    renderNarasi();
    renderStat();
    renderKomponenIpm();
    renderRekomendasi();
    renderSumber();
    renderMap();
    renderRegionDetail();
    renderPeriodeTombol();
    renderVersi();
  }

  function gambarSemua() {
    gambar();
    applyPeriode();
    observeReveal();
    observeCounters();
    buildAllCharts();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    initControls();
    $('#tahunFooter').textContent = new Date().getFullYear();

    /* Tunggu server sebentar (≤ 900 ms) supaya angka langsung yang terbaru.
       Bila lebih lama, gambar dulu dari cadangan, lalu perbarui saat tiba. */
    const muat = (window.INDIKATOR ? window.INDIKATOR.muat() : Promise.resolve(null)).catch(() => null);
    const jeda = new Promise((ok) => setTimeout(() => ok('jeda'), 900));
    let sudahDigambar = false;

    const terima = (r) => {
      if (!r || !r.data) return;
      const beda = JSON.stringify(r.data) !== JSON.stringify(D);
      INFO = r;
      if (!sudahDigambar) { D = r.data; gambarSemua(); sudahDigambar = true; }
      else if (beda) { D = r.data; gambarSemua(); }
      else renderVersi();
    };

    Promise.race([muat, jeda]).then((r) => {
      if (r === 'jeda' || !r) {
        if (!sudahDigambar) { gambarSemua(); sudahDigambar = true; }
        muat.then(terima);
      } else terima(r);
      document.documentElement.classList.add('siap');
    });
  });
})();
