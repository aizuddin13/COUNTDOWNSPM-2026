# AI Handoff — Panduan Kolaborasi

Dokumen ini untuk kedua-dua AI (Claude & ChatGPT) yang bekerjasama dalam projek ini.
Baca ini **dahulu** sebelum mula kerja dalam sesi baru.

---

## Konteks projek

Mohamad Khairul Aizuddin (Padang Serai, Kedah) bakal menduduki SPM 2026.
Dia mahu website hitung mundur peribadi untuk 11 subjek yang diambilnya (29 kertas, 26 Okt – 17 Dis 2026).

**Tech stack:** Static HTML + CSS + Vanilla JS. Zero build step. Zero npm dependencies.
**Deploy target:** GitHub Pages (free, auto-deploy via GitHub Actions).
**Browser support:** Modern Chromium, Firefox, Safari (termasuk iOS Safari).

---

## Pembahagian tugas

| Domain              | Owner    | Fail yang disentuh                     |
|---------------------|----------|-----------------------------------------|
| Reka bentuk visual  | ChatGPT  | `design/**`                             |
| Illustrations/icons | ChatGPT  | `design/icons/**`, `src/assets/**`      |
| Palette/moodboard   | ChatGPT  | `design/palette/**`                     |
| HTML markup         | Claude   | `index.html`                            |
| CSS/styling tokens  | Claude   | `src/css/style.css`                     |
| Data peperiksaan    | Claude   | `src/js/data.js`                        |
| Logik countdown     | Claude   | `src/js/app.js`                         |
| Deployment/CI       | Claude   | `.github/workflows/**`                  |
| README/docs         | Claude   | `README.md`, `docs/**`                  |

**Rule of thumb:**
- Kalau ia pixel yang kelihatan → ChatGPT first
- Kalau ia logik yang berjalan → Claude first
- Kalau tak pasti → tanya Khairul

---

## Workflow handoff

### ChatGPT siap sesuatu di `design/`:

1. ChatGPT commit kerja ke `design/` dengan filename yang jelas (contoh: `design/mockups/hero-v2.png`)
2. Khairul buka sesi dengan Claude, bagi link GitHub repo + sebut "ChatGPT dah update design/mockups/hero-v2.png, integrate masuk"
3. Claude baca file tersebut, apply ke `src/css/style.css` atau `src/assets/`
4. Claude commit perubahan ke `src/`

### Claude ubah struktur HTML atau komponen baru:

1. Claude kemas kini `index.html` dan `src/css/style.css`
2. Claude update bahagian "Current HTML structure" dalam dokumen ini (lihat bawah)
3. Khairul bawa link GitHub repo + dokumen ini ke ChatGPT
4. ChatGPT boleh buat design berdasarkan struktur yang sebenar

### Khairul minta feature baru:

1. Khairul tulis dalam `docs/TODO.md` apa yang dia nak
2. AI yang relevan ambil task tersebut, mark `[x]` bila siap

---

## Current HTML structure (snapshot)

Elemen utama dalam `index.html` yang design mesti ambil kira:

```
.wrap                        → container utama, max-width 1120px
  .mast                      → header bar (brand + theme toggle)
    .brand                   → "SPM 2026" lockup
    .theme-toggle            → butang tukar tema
  .hero                      → kad countdown utama
    .hero-label              → "Peperiksaan Seterusnya" (ada dot animasi)
    .hero-subject            → nama subjek (h1, display font)
    .hero-paper              → nama kertas
    .hero-date               → tarikh + masa (pill style)
    .hero-countdown          → 4 kotak: hari / jam / minit / saat
  .stats                     → 3 stat tiles
  .section-title             → tajuk seksyen (ada divider line)
  .subject-grid              → grid kad subjek
    .subject-card            → satu subjek
      .subject-head          → nama + tarikh julat
      .paper-list > .paper   → setiap kertas
  .timeline-list             → senarai jadual penuh
    .tl-day                  → satu hari (atau julat)
  .footer                    → footer bawah
```

**Design tokens yang ada:**
Lihat `src/css/style.css` di bahagian `:root` dan `[data-theme]`.
Mentioned secara ringkas dalam `design/palette/README.md`.

**Last structure change:** 2026-10-18 (initial)

---

## Panduan untuk ChatGPT

Bila buat visual/mockup:

1. **Baca dulu `design/palette/README.md`** — ada tokens warna semasa
2. **Keep dark mode first** — reka untuk tema gelap dulu, kemudian derive light
3. **Minimum width target: 380px** (phone portrait)
4. **Max width target: 1120px** (desktop)
5. **Tipografi:** Fraunces (serif display) + DM Sans (body) + JetBrains Mono (digits)
6. **Mood:** fokus belajar, serius tapi tidak menakutkan, warm amber accent
7. **Export format:** SVG untuk icon, PNG untuk mockup, Figma link untuk prototype

Bila cadangkan perubahan struktur HTML, tulis dalam `docs/TODO.md` — Claude akan handle.

---

## Panduan untuk Claude

Bila integrate kerja ChatGPT:

1. **Baca `design/palette/README.md`** untuk tahu tokens terkini
2. **Letak image dalam `src/assets/`** (bukan `design/` — `design/` untuk source files)
3. **Optimize images** sebelum commit (e.g., SVGO untuk SVG, PNG minification)
4. **Update token values dalam `src/css/style.css`** mengikut palette baru
5. **Test light + dark + mobile + desktop** sebelum push
6. **Jangan ubah struktur `data.js`** tanpa update dokumen ini

Bila cadangkan perubahan visual, tulis dalam `docs/TODO.md` — ChatGPT akan handle.

---

## Memulakan sesi baru dengan AI

Templat prompt untuk Khairul copy-paste:

> Projek: SPM 2026 Countdown website
> Repo: https://github.com/aizuddin13/COUNTDOWNSPM-2026
> Baca `README.md` dan `docs/AI-HANDOFF.md` dalam repo untuk konteks penuh.
> Tugas saya sekarang: [DESCRIBE]

Dua-dua AI akan baca dokumen ini, faham role masing-masing, dan tak akan terlanggar kerja yang satu lagi.
