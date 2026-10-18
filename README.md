# SPM 2026 Countdown

Website hitung mundur untuk peperiksaan Sijil Pelajaran Malaysia (SPM) 2026.
Static site, hosted di GitHub Pages, dibina secara kolaboratif antara ChatGPT (grafik & reka bentuk visual) dan Claude (logik, data, teknikal).

**Tarikh peperiksaan:** 26 Oktober – 17 Disember 2026
**Jumlah kertas:** 29 kertas merentasi 11 subjek
**Tech stack:** HTML + CSS + Vanilla JS (zero dependencies)

---

## Live demo

Repo: https://github.com/aizuddin13/COUNTDOWNSPM-2026
Live (selepas Pages diaktifkan): https://aizuddin13.github.io/COUNTDOWNSPM-2026/

Buat masa ini, buka `index.html` dalam browser secara terus pun berfungsi.

---

## Struktur projek

```
spm-countdown/
├── index.html              # Entry point (GitHub Pages serves this)
├── src/
│   ├── css/style.css       # Semua styling, tokens, responsive rules
│   ├── js/data.js          # Data peperiksaan (29 kertas) — stable, jarang berubah
│   ├── js/app.js           # Logik countdown, rendering, theme toggle
│   └── assets/             # Images, icons, fonts yang di-bundle sendiri
├── design/                 # Workspace ChatGPT — kerja grafik di sini
│   ├── mockups/            # Figma exports, screenshot proposals
│   ├── icons/              # Icon set (SVG preferred)
│   └── palette/            # Color system, moodboard
├── docs/
│   ├── AI-HANDOFF.md       # Macam mana Claude <-> ChatGPT bekerjasama
│   └── TODO.md             # Status semasa, apa yang berikutnya
└── .github/workflows/      # Auto-deploy ke GitHub Pages
```

---

## Pembahagian kerja

| AI       | Tanggungjawab                                                    | Fail yang disentuh                    |
|----------|------------------------------------------------------------------|---------------------------------------|
| ChatGPT  | Reka bentuk visual, illustration, icon set, mockup, moodboard    | `design/**`, `src/assets/**`          |
| Claude   | Logik, struktur data, countdown math, deployment, performance    | `index.html`, `src/css/**`, `src/js/**`, `.github/**` |

Bila ChatGPT siap sesuatu di `design/`, Claude akan integrate masuk `src/`.
Bila Claude ubah struktur HTML, dia update `docs/AI-HANDOFF.md` supaya ChatGPT tahu di mana nak letak visual.

Baca `docs/AI-HANDOFF.md` untuk butiran penuh.

---

## Setup

### Setup pertama kali

```bash
# Clone repo
git clone https://github.com/aizuddin13/COUNTDOWNSPM-2026.git
cd COUNTDOWNSPM-2026

# Buka terus dalam browser (tak perlu build step)
open index.html
# atau Linux:
xdg-open index.html
```

Nak preview dengan live reload:

```bash
# Guna Python simple server
python3 -m http.server 8000
# Pergi http://localhost:8000

# Atau guna npx (kalau ada Node.js)
npx serve
```

### Deploy ke GitHub Pages

1. Push repo ke GitHub
2. Settings → Pages → Source: **GitHub Actions**
3. Workflow dalam `.github/workflows/pages.yml` akan auto-deploy setiap push ke `main`

---

## Mengubah data peperiksaan

Semua data dalam `src/js/data.js`. Format:

```js
{
  subject: 'Matematik',
  paper: 'Kertas 1',
  start: '2026-11-26T08:15:00+08:00',   // ISO dengan offset MYT
  end:   '2026-11-26T09:45:00+08:00',   // optional — default 3 jam
  tag:   'Amali'                         // optional — label pada kad
}
```

Timezone sentiasa `+08:00` (Malaysia Standard Time).

---

## Lesen

Projek peribadi untuk kegunaan sendiri. Jadual peperiksaan rasmi dari Lembaga Peperiksaan, Kementerian Pendidikan Malaysia (dokumen `LP/SPM/2026`).
