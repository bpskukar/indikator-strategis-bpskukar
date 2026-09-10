/* ============================================================================
   Pemuat isi Indikator Strategis — bagian dari PINTAR Kukar.

   Urutan sumber:
     1. ?pratinjau di alamat → draf yang sedang disunting di Ruang Pegawai
        (localStorage 'pintar.indikator.draf', satu domain dengan katalog).
     2. Server Supabase, tabel indikator_konten (baris 'utama') — bila
        window.KONFIG (dari /katalog-data-bpskukar/assets/config.js) terisi.
     3. Salinan terakhir yang berhasil dimuat (localStorage), bila server
        sedang tidak terjangkau.
     4. Mode demo (config.js kosong): simpanan admin demo 'pstkukar.indikator'.
     5. assets/data.js — isi awal/cadangan.
   Tidak memakai pustaka: cukup fetch ke REST Supabase dengan kunci publik.
   ========================================================================== */
window.INDIKATOR = (function () {
  "use strict";
  var K = window.KONFIG || {};
  var KUNCI_CACHE = "pintar.indikator.cache", KUNCI_DRAF = "pintar.indikator.draf", KUNCI_DEMO = "pstkukar.indikator";
  var TENGGAT_MS = 4500;

  function baca(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function tulis(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* penuh / diblokir */ } }
  function awal() { return window.INDIKATOR_AWAL || null; }
  function sahih(d) { return d && typeof d === "object" && Array.isArray(d.indikator) && d.periode && d.teks; }
  function terhubung() { return !!(K.SUPABASE_URL && K.SUPABASE_ANON_KEY); }

  function dariServer() {
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, TENGGAT_MS) : null;
    var url = K.SUPABASE_URL.replace(/\/$/, "") + "/rest/v1/indikator_konten?id=eq.utama&select=data,versi,diubah_pada";
    return fetch(url, {
      headers: { apikey: K.SUPABASE_ANON_KEY, Authorization: "Bearer " + K.SUPABASE_ANON_KEY, Accept: "application/json" },
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    }).then(function (rows) {
      if (timer) clearTimeout(timer);
      var b = rows && rows[0];
      if (!b || !sahih(b.data)) return null;          // belum diisi → pakai cadangan
      var hasil = { data: b.data, versi: b.versi, diubah_pada: b.diubah_pada, sumber: "server" };
      tulis(KUNCI_CACHE, { data: b.data, versi: b.versi, diubah_pada: b.diubah_pada, disimpan: Date.now() });
      return hasil;
    }).catch(function () { if (timer) clearTimeout(timer); return undefined; }); // undefined = gagal
  }

  function muat() {
    var qs = new URLSearchParams(location.search);
    if (qs.has("pratinjau")) {
      var draf = baca(KUNCI_DRAF);
      if (draf && sahih(draf.data)) return Promise.resolve({ data: draf.data, sumber: "draf", versi: draf.versi, diubah_pada: draf.disimpan });
    }
    if (!terhubung()) {
      var demo = baca(KUNCI_DEMO);
      if (demo && sahih(demo.data)) return Promise.resolve({ data: demo.data, sumber: "demo", versi: demo.versi, diubah_pada: demo.diubah_pada });
      return Promise.resolve({ data: awal(), sumber: "awal" });
    }
    return dariServer().then(function (r) {
      if (r) return r;                                   // dari server
      var cache = baca(KUNCI_CACHE);
      if (r === undefined && cache && sahih(cache.data)) // server gagal → salinan terakhir
        return { data: cache.data, sumber: "cache", versi: cache.versi, diubah_pada: cache.diubah_pada };
      return { data: awal(), sumber: "awal" };
    });
  }

  return { muat: muat, awal: awal, terhubung: terhubung, sahih: sahih, KUNCI_DRAF: KUNCI_DRAF, KUNCI_DEMO: KUNCI_DEMO };
})();
