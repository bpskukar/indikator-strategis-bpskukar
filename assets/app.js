/* ==========================================================================
   Indikator Strategis Kabupaten Kutai Kartanegara — logika aplikasi
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------- Util ---------------- */

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** Format angka gaya Indonesia: 1.234,56 */
  const fmt = (n, dec = 0) =>
    n.toLocaleString('id-ID', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const state = {
    periode: 'tw2',
    kategori: 'semua',
    query: '',
    pdrbMode: 'triwulan',
    mapMetric: 'penduduk',
    mapFocus: 'Kutai Kartanegara'
  };

  /* ---------------- Tema (dark mode) ---------------- */

  const THEME_KEY = 'kukar-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* abaikan */ }
    const btn = $('#themeToggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
      btn.innerHTML = theme === 'dark' ? ICON.sun : ICON.moon;
    }
    // Chart perlu digambar ulang agar warna teks/grid ikut berubah
    if (window.__chartsReady) refreshChartTheme();
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* abaikan */ }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  }

  const ICON = {
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    sun:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };

  /** Ambil nilai CSS custom property yang sedang aktif */
  const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  /* ---------------- Render KPI ---------------- */

  function renderKPI() {
    const grid = $('#kpiGrid');
    if (!grid) return;

    grid.innerHTML = DATA.indikator.map((it) => `
      <article class="kpi reveal"
               style="--kpi-accent:${it.accent}"
               data-kat="${it.kat}"
               data-only="${it.hanya || ''}"
               data-text="${(it.label + ' ' + it.abbr + ' ' + it.note).toLowerCase()}">
        <div class="kpi__top">
          <div class="kpi__icon" aria-hidden="true">${it.icon}</div>
          <div>
            <div class="kpi__label">${it.label}</div>
            <div class="kpi__abbr">${it.abbr}</div>
          </div>
        </div>
        <div class="kpi__value">
          <span class="js-count" data-value="${it.value}" data-dec="${it.dec}">0</span>${
            it.unit ? `<span class="kpi__unit">${it.unit}</span>` : ''
          }
        </div>
        <p class="kpi__note">${it.note}</p>
        ${it.tag ? `<span class="kpi__tag ${it.tagType}">${it.tag}</span>` : ''}
      </article>
    `).join('');

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

  const totalPenduduk = (w) => w.laki + w.perempuan;

  function colorFor(w) {
    const arr = DATA.wilayah.map((x) => state.mapMetric === 'penduduk' ? totalPenduduk(x) : x.miskin);
    const min = Math.min(...arr), max = Math.max(...arr);
    const v = state.mapMetric === 'penduduk' ? totalPenduduk(w) : w.miskin;
    const t = max === min ? 0 : (v - min) / (max - min);
    const scale = SCALE[state.mapMetric];
    return scale[Math.min(scale.length - 1, Math.floor(t * scale.length))];
  }

  function renderMap() {
    const el = $('#cartogram');
    if (!el) return;

    el.innerHTML = DATA.wilayah.map((w) => {
      const isPend = state.mapMetric === 'penduduk';
      const val  = isPend ? fmt(totalPenduduk(w), 2) : fmt(w.miskin, 2);
      const unit = isPend ? 'ribu jiwa' : '% miskin';
      const bg   = colorFor(w);
      return `
        <button type="button"
                class="region${w.home ? ' is-home' : ''}${w.nama === state.mapFocus ? ' is-focus' : ''}"
                style="grid-row:${w.row};grid-column:${w.col};background:${bg};color:#3A2113"
                data-nama="${w.nama}"
                aria-label="${w.nama}: ${val} ${unit}">
          <span class="region__name">${w.nama}</span>
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
    const w = DATA.wilayah.find((x) => x.nama === state.mapFocus);
    if (!w) return;

    const urutPenduduk = [...DATA.wilayah].sort((a, b) => totalPenduduk(b) - totalPenduduk(a));
    const urutMiskin   = [...DATA.wilayah].sort((a, b) => b.miskin - a.miskin);
    const rankP = urutPenduduk.findIndex((x) => x.nama === w.nama) + 1;
    const rankM = urutMiskin.findIndex((x) => x.nama === w.nama) + 1;

    $('#regionDetail').innerHTML = `
      <h4>${w.nama}</h4>
      <p class="rank">Peringkat ${rankP} penduduk terbanyak · peringkat ${rankM} angka kemiskinan tertinggi di Kaltim</p>
      <dl>
        <div class="row"><dt>Total penduduk</dt><dd>${fmt(totalPenduduk(w), 2)} ribu</dd></div>
        <div class="row"><dt>Laki-laki</dt><dd>${fmt(w.laki, 2)} ribu</dd></div>
        <div class="row"><dt>Perempuan</dt><dd>${fmt(w.perempuan, 2)} ribu</dd></div>
        <div class="row"><dt>Angka kemiskinan</dt><dd>${fmt(w.miskin, 2)}%</dd></div>
      </dl>`;
  }

  /* ---------------- Chart.js ---------------- */

  const charts = {};

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
    const src = state.pdrbMode === 'triwulan' ? DATA.pdrbTriwulan : DATA.pdrbTahun;
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
        labels: src.label,
        datasets: [
          { type: 'bar', label: 'PDRB ADHB', data: src.adhb, backgroundColor: cssVar('--brand'), borderRadius: 6, maxBarThickness: 42, order: 2 },
          { type: 'bar', label: 'PDRB ADHK', data: src.adhk, backgroundColor: cssVar('--amber'), borderRadius: 6, maxBarThickness: 42, order: 2 },
          { type: 'line', label: 'Laju Pertumbuhan Ekonomi (%)', data: src.lpe, yAxisID: 'y1',
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
    if (!ctx) return;
    const opt = baseOptions();
    opt.plugins.legend.display = false;
    opt.scales.y.suggestedMin = 73;
    opt.scales.y.suggestedMax = 78.5;
    opt.plugins.tooltip.callbacks = { label: (c) => `IPM: ${fmt(c.parsed.y, 2)}` };

    if (charts.ipm) charts.ipm.destroy();
    charts.ipm = new Chart(ctx, {
      type: 'line',
      data: {
        labels: DATA.ipm.label,
        datasets: [{
          label: 'IPM',
          data: DATA.ipm.nilai,
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
    if (!ctx) return;
    const opt = baseOptions();
    delete opt.scales;
    opt.cutout = '58%';
    opt.plugins.legend.position = 'right';
    opt.plugins.tooltip.callbacks = {
      label: (c) => `${c.label}: ${fmt(c.parsed, 2)}%`,
      afterLabel: (c) => DATA.generasi[c.dataIndex].ket
    };

    if (charts.gen) charts.gen.destroy();
    charts.gen = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: DATA.generasi.map((g) => g.nama),
        datasets: [{
          data: DATA.generasi.map((g) => g.nilai),
          backgroundColor: DATA.generasi.map((g) => g.warna),
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
    if (!ctx) return;
    const k = DATA.kemiskinan;
    const opt = baseOptions();
    opt.scales.y1 = {
      position: 'right',
      grid: { display: false },
      border: { display: false },
      suggestedMin: 0, suggestedMax: 9,
      ticks: { color: cssVar('--tick'), callback: (v) => v + '%', font: { size: 11.5 } }
    };
    opt.plugins.tooltip.callbacks = { label: (c) => `${c.dataset.label}: ${fmt(c.parsed.y, 2)}` };

    if (charts.miskin) charts.miskin.destroy();
    charts.miskin = new Chart(ctx, {
      data: {
        labels: k.label,
        datasets: [
          { type: 'bar', label: 'P1 — Indeks Kedalaman Kemiskinan', data: k.p1, backgroundColor: cssVar('--amber'), borderRadius: 5, maxBarThickness: 34, order: 2 },
          { type: 'bar', label: 'P2 — Indeks Keparahan Kemiskinan', data: k.p2, backgroundColor: '#8B5A2B', borderRadius: 5, maxBarThickness: 34, order: 2 },
          { type: 'line', label: 'P0 — Persentase Penduduk Miskin (%)', data: k.p0, yAxisID: 'y1',
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
    if (!ctx) return;
    const opt = baseOptions();
    opt.plugins.legend.display = false;
    opt.scales.y.ticks.callback = (v) => fmt(v / 1000, 0) + 'rb';
    opt.plugins.tooltip.callbacks = { label: (c) => `Garis kemiskinan: Rp${fmt(c.parsed.y, 0)} /kapita/bulan` };

    if (charts.garis) charts.garis.destroy();
    charts.garis = new Chart(ctx, {
      type: 'line',
      data: {
        labels: DATA.kemiskinan.label,
        datasets: [{
          data: DATA.kemiskinan.garis,
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

    el.innerHTML = DATA.rekomendasi.map((r, i) => `
      <div class="acc__item${i === 0 ? ' is-open' : ''} reveal">
        <button class="acc__btn" type="button" aria-expanded="${i === 0}">
          <span class="acc__num">${i + 1}</span>
          <span class="acc__label">${r.judul}</span>
          <svg class="acc__chev" width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
        <div class="acc__panel">
          <ul>${r.poin.map(([j, d]) => `<li><strong>${j}:</strong> ${d}</li>`).join('')}</ul>
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
      el.innerHTML = DATA.narasi[key]
        .map(([h, p]) => `<div class="note"><h4>${h}</h4><p>${p}</p></div>`).join('');
    });
  }

  function renderStat() {
    const el = $('#demografiStat');
    if (!el) return;
    el.innerHTML = DATA.demografiStat.map((s) => `
      <div class="stat"><div class="stat__value">${s.value}</div><div class="stat__label">${s.label}</div></div>
    `).join('');
  }

  function renderKomponenIpm() {
    const el = $('#ipmKomponen');
    if (!el) return;
    el.innerHTML = DATA.ipm.komponen.map((k) => `
      <div class="row">
        <dt>${k.nama}</dt>
        <dd>${k.nilai} <span style="font-weight:600;font-size:11.5px;color:var(--text-mute)">${k.satuan}</span>
          <span class="kpi__tag good" style="margin-left:6px">${k.delta}</span></dd>
      </div>`).join('');
  }

  function renderSumber() {
    const el = $('#tabelSumber');
    if (!el) return;
    el.innerHTML = DATA.sumber
      .map(([judul, lembaga], i) => `<tr><td class="num">${i + 1}</td><td>${judul}</td><td>${lembaga}</td></tr>`)
      .join('');
  }

  /* ---------------- Periode ---------------- */

  function applyPeriode() {
    const p = DATA.periode[state.periode];
    $$('.js-periode-nama').forEach((el) => { el.textContent = p.nama; });
    $$('.js-periode-vol').forEach((el)  => { el.textContent = `${p.volume} · terbit ${p.terbit}`; });

    const cat = $('#periodeCatatan');
    if (cat) {
      cat.textContent = state.periode === 'tw2'
        ? 'Booklet Triwulan II menambahkan indikator kemiskinan: Persentase Penduduk Miskin (P0) dan Penduduk Rentan Miskin.'
        : 'Booklet Triwulan I belum memuat indikator kemiskinan pada halaman indikator strategis; angka lain identik dengan Triwulan II karena bersumber dari rilis tahunan yang sama.';
    }
    filterKPI();
  }

  /* ---------------- Navigasi ---------------- */

  function initNav() {
    const burger = $('#burger');
    const drawer = $('#drawer');

    burger.innerHTML = ICON.menu;
    burger.addEventListener('click', () => drawer.classList.toggle('is-open'));
    $$('#drawer a').forEach((a) => a.addEventListener('click', () => drawer.classList.remove('is-open')));

    // Highlight menu aktif saat menggulir
    const links = $$('.nav__links a');
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
    $$('[data-seg="periode"] button').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.periode = btn.dataset.value;
        $$('[data-seg="periode"] button').forEach((b) =>
          b.classList.toggle('is-active', b.dataset.value === state.periode));
        applyPeriode();
      });
    });

    // Filter kategori
    $$('#chipKategori .chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        state.kategori = chip.dataset.value;
        $$('#chipKategori .chip').forEach((c) => c.classList.toggle('is-active', c === chip));
        filterKPI();
      });
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
        $('#pdrbSub').textContent = state.pdrbMode === 'triwulan'
          ? 'Perbandingan lima triwulan terakhir, TW I-2025 sampai TW I-2026'
          : 'Perkembangan tahunan 2021–2025. *angka sementara  **angka sangat sementara';
        buildPdrbChart();
      });
    });

    // Metrik peta
    $$('[data-seg="map"] button').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.mapMetric = btn.dataset.value;
        $$('[data-seg="map"] button').forEach((b) =>
          b.classList.toggle('is-active', b.dataset.value === state.mapMetric));
        renderMap();
      });
    });

    // Dark mode
    $('#themeToggle').addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------------- Init ---------------- */

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderKPI();
    renderNarasi();
    renderStat();
    renderKomponenIpm();
    renderRekomendasi();
    renderSumber();
    renderMap();
    renderRegionDetail();
    initNav();
    initControls();
    applyPeriode();
    observeReveal();
    observeCounters();

    if (window.Chart) buildAllCharts();

    $('#tahunFooter').textContent = new Date().getFullYear();
  });
})();
