/* ============================================================================
   Kartu angka siap bagikan — PINTAR Kukar
   Menggambar satu indikator menjadi gambar PNG 1080×1080 (pas untuk WhatsApp,
   Instagram, dan paparan), lengkap dengan tanda PINTAR dan sumber BPS.
   Dipakai situs Indikator Strategis (tombol "Bagikan kartu") dan beranda
   ("Angka hari ini"). Tanpa pustaka luar: hanya <canvas>.

   window.KARTU.gambar(opsi)  → Promise<canvas>
   window.KARTU.bagikan(opsi) → Web Share (HP) atau unduh PNG
   window.KARTU.unduh(opsi)   → unduh PNG
   window.KARTU.teksWA(opsi)  → teks siap kirim ke WhatsApp
   opsi: { label, value, dec, unit, abbr, note, accent, tag, seri: {label:[..], nilai:[..]},
           tahun, sumber, tautan, kalimat }
   ========================================================================== */
(function () {
  "use strict";
  var W = 1080, H = 1080;
  var NAVY = "#0F3B6E", NAVY_TUA = "#0B2A50", NAVY_MUDA = "#163F78";
  var FONT = '"Plus Jakarta Sans", "Inter", "Segoe UI", system-ui, -apple-system, sans-serif';

  function fmt(n, dec) {
    if (n == null || isNaN(Number(n))) return "–";
    return Number(n).toLocaleString("id-ID", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
  }
  function tglId(d) { return (d || new Date()).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }); }

  function siapFont() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all([
      document.fonts.load('800 100px "Plus Jakarta Sans"'), document.fonts.load('700 40px "Plus Jakarta Sans"'),
      document.fonts.load('600 30px "Plus Jakarta Sans"'), document.fonts.load('500 30px "Plus Jakarta Sans"')
    ]).catch(function () {}).then(function () { return new Promise(function (r) { setTimeout(r, 30); }); });
  }

  /* pecah teks menjadi baris sesuai lebar */
  function baris(ctx, teks, lebar, maks) {
    var kata = String(teks || "").replace(/\*\*/g, "").split(/\s+/), hasil = [], b = "";
    kata.forEach(function (k) {
      var coba = b ? b + " " + k : k;
      if (ctx.measureText(coba).width > lebar && b) { hasil.push(b); b = k; } else b = coba;
    });
    if (b) hasil.push(b);
    if (maks && hasil.length > maks) { hasil = hasil.slice(0, maks); hasil[maks - 1] = hasil[maks - 1].replace(/[,;:]?$/, "") + "…"; }
    return hasil;
  }
  function kotakBulat(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  /* tanda PINTAR: kotak gradasi + gerbang (geometri sama dengan SVG di pintar.js) */
  function tanda(ctx, x, y, s) {
    var g = ctx.createLinearGradient(x, y, x + s, y + s); g.addColorStop(0, "#F0932B"); g.addColorStop(1, "#2E7BD6");
    ctx.save(); kotakBulat(ctx, x, y, s, s, s * 0.24); ctx.fillStyle = g; ctx.fill();
    ctx.translate(x, y); ctx.scale(s / 100, s / 100);
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 8; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath(); ctx.moveTo(22, 82); ctx.lineTo(22, 46); ctx.arc(50, 46, 28, Math.PI, 0); ctx.lineTo(78, 82); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, 82); ctx.lineTo(40, 60); ctx.arc(50, 60, 10, Math.PI, 0); ctx.lineTo(60, 82); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, 82); ctx.lineTo(86, 82); ctx.stroke();
    ctx.restore();
  }

  function gambar(o) {
    o = o || {};
    return siapFont().then(function () {
      var c = document.createElement("canvas"); c.width = W; c.height = H;
      var ctx = c.getContext("2d");
      /* latar */
      var lg = ctx.createLinearGradient(0, 0, W, H); lg.addColorStop(0, NAVY_TUA); lg.addColorStop(0.55, NAVY); lg.addColorStop(1, NAVY_MUDA);
      ctx.fillStyle = lg; ctx.fillRect(0, 0, W, H);
      var rg = ctx.createRadialGradient(W - 120, 120, 20, W - 120, 120, 620); rg.addColorStop(0, "rgba(255,255,255,.09)"); rg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
      /* aksen kiri */
      var aksen = o.accent || "#F0932B";
      ctx.fillStyle = aksen; kotakBulat(ctx, 0, 0, 18, H, 0); ctx.fill();

      /* kepala */
      tanda(ctx, 72, 64, 84);
      ctx.fillStyle = "#fff"; ctx.font = "800 40px " + FONT; ctx.textBaseline = "alphabetic";
      ctx.fillText("PINTAR Kukar", 176, 106);
      ctx.fillStyle = "rgba(255,255,255,.75)"; ctx.font = "500 24px " + FONT;
      ctx.fillText("BPS Kabupaten Kutai Kartanegara", 176, 140);

      /* label & angka */
      var y = 290;
      ctx.fillStyle = "rgba(255,255,255,.8)"; ctx.font = "600 34px " + FONT;
      baris(ctx, o.label || "", W - 160, 2).forEach(function (l) { ctx.fillText(l, 80, y); y += 44; });
      y += 90;
      var nilai = o.kalimatBesar || fmt(o.value, o.dec);
      ctx.fillStyle = "#fff"; ctx.font = "800 " + (nilai.length > 9 ? 120 : 150) + "px " + FONT;
      ctx.fillText(nilai, 74, y);
      var lebarNilai = ctx.measureText(nilai).width;
      if (o.unit) {
        ctx.fillStyle = aksen; ctx.font = "700 44px " + FONT;
        var unitTeks = String(o.unit);
        if (74 + lebarNilai + 18 + ctx.measureText(unitTeks).width > W - 60) { y += 52; ctx.fillText(unitTeks, 80, y); }
        else ctx.fillText(unitTeks, 74 + lebarNilai + 18, y);
      }
      y += 50;
      if (o.abbr) { ctx.fillStyle = "rgba(255,255,255,.7)"; ctx.font = "500 28px " + FONT; ctx.fillText(String(o.abbr), 80, y); y += 30; }
      if (o.tag) {
        ctx.font = "700 24px " + FONT; var lt = ctx.measureText(o.tag).width + 40;
        y += 14; ctx.fillStyle = "rgba(255,255,255,.14)"; kotakBulat(ctx, 80, y, lt, 46, 23); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.fillText(o.tag, 100, y + 32); y += 46;
      }

      /* catatan */
      y += 38;
      ctx.fillStyle = "rgba(255,255,255,.86)"; ctx.font = "500 30px " + FONT;
      baris(ctx, o.note || "", W - 160, 3).forEach(function (l) { ctx.fillText(l, 80, y); y += 40; });

      /* deret kecil (batang) bila ada */
      if (o.seri && o.seri.label && o.seri.nilai && o.seri.nilai.filter(function (v) { return v != null; }).length >= 2) {
        var lbl = o.seri.label.slice(-6), val = o.seri.nilai.slice(-6);
        var maks = Math.max.apply(null, val.filter(function (v) { return v != null; }).map(Number)), min = Math.min.apply(null, val.filter(function (v) { return v != null; }).map(Number));
        /* ruang grafik: dari bawah catatan sampai di atas kaki (garis kaki di y=944) */
        var atas = y + 30, dasar = 890, tinggi = dasar - atas - 40, lebar = W - 160, n = lbl.length, sela = lebar / n;
        if (tinggi >= 70) {
          var skala = function (v) { var rentang = maks - min || 1; var t = (Number(v) - min) / rentang; return tinggi * (0.25 + 0.75 * t); };
          var besar = maks >= 1000, fontNilai = besar ? 19 : 22;
          ctx.textAlign = "center";
          lbl.forEach(function (l, i) {
            var v = val[i]; if (v == null) return;
            var bw = Math.min(90, sela * 0.55), bx = 80 + sela * i + (sela - bw) / 2, bh = skala(v);
            ctx.fillStyle = i === n - 1 ? aksen : "rgba(255,255,255,.28)";
            kotakBulat(ctx, bx, dasar - bh, bw, bh, 10); ctx.fill();
            ctx.fillStyle = "#fff"; ctx.font = "700 " + fontNilai + "px " + FONT; ctx.fillText(fmt(v, besar ? 0 : o.dec), bx + bw / 2, dasar - bh - 12);
            ctx.fillStyle = "rgba(255,255,255,.7)"; ctx.font = "500 22px " + FONT; ctx.fillText(String(l), bx + bw / 2, dasar + 34);
          });
          ctx.textAlign = "left";
        }
      }

      /* kaki */
      ctx.fillStyle = "rgba(255,255,255,.18)"; ctx.fillRect(80, 944, W - 160, 2);
      ctx.fillStyle = "rgba(255,255,255,.72)"; ctx.font = "500 22px " + FONT;
      baris(ctx, o.sumber || "Sumber: Booklet Indikator Strategis BPS Kabupaten Kutai Kartanegara", W - 160, 1).forEach(function (l) { ctx.fillText(l, 80, 986); });
      ctx.fillStyle = "#fff"; ctx.font = "700 24px " + FONT; ctx.fillText(o.tautan || "bpskukar.github.io", 80, 1026);
      ctx.textAlign = "right"; ctx.fillStyle = "rgba(255,255,255,.55)"; ctx.font = "500 20px " + FONT;
      ctx.fillText("Dibuat " + tglId(), W - 80, 1026); ctx.textAlign = "left";
      return c;
    });
  }

  function namaBerkas(o) {
    return ("kukar-" + String(o.abbr || o.label || "angka").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) + ".png");
  }
  function keBlob(c) { return new Promise(function (r) { c.toBlob(r, "image/png"); }); }
  function unduh(o) {
    return gambar(o).then(keBlob).then(function (blob) {
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = namaBerkas(o);
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
      return true;
    });
  }
  function teksWA(o) {
    var t = (o.kalimat || (o.label + " Kutai Kartanegara: " + fmt(o.value, o.dec) + (o.unit ? " " + o.unit : "") + (o.abbr ? " (" + o.abbr + ")" : "")));
    return t + "\n— PINTAR Kukar, BPS Kabupaten Kutai Kartanegara\n" + (o.tautanPenuh || "https://bpskukar.github.io/indikator-strategis-bpskukar/");
  }
  function bagikan(o) {
    return gambar(o).then(keBlob).then(function (blob) {
      var f = null;
      try { f = new File([blob], namaBerkas(o), { type: "image/png" }); } catch (e) { /* peramban lama */ }
      if (f && navigator.share && navigator.canShare && navigator.canShare({ files: [f] })) {
        return navigator.share({ files: [f], title: o.label + " — PINTAR Kukar", text: teksWA(o) }).then(function () { return "dibagikan"; }, function (e) {
          if (e && e.name === "AbortError") return "batal";
          return unduh(o).then(function () { return "diunduh"; });
        });
      }
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = namaBerkas(o);
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
      return "diunduh";
    });
  }
  window.KARTU = { gambar: gambar, unduh: unduh, bagikan: bagikan, teksWA: teksWA, fmt: fmt };
})();
