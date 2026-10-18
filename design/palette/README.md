# Color Palette & Design Tokens

Shared truth untuk warna & tipografi. Dua-dua AI mesti sync dengan dokumen ini.

**Last updated:** 2026-10-18 (v1 — initial)
**Owner:** @chatgpt (buat perubahan di sini), @claude (sync ke `src/css/style.css`)

---

## Konsep

**Focused study aesthetic** — deep midnight (tema gelap) atau warm paper (tema cerah),
dengan accent amber yang panas tapi tidak melaram. Serif display untuk gravitas,
humanist sans untuk badan teks, mono untuk digit countdown.

Mood references:
- Lampu meja belajar waktu malam
- Buku jurnal berkulit
- Jam detik mekanikal

---

## Tema Gelap (default)

| Token              | Hex                  | Guna untuk                              |
|--------------------|----------------------|------------------------------------------|
| `--bg`             | `#0b0f16`            | Latar belakang halaman                  |
| `--surface`        | `#141a26`            | Kad, panel                              |
| `--surface-2`      | `#1b2130`            | Elemen dalam kad (cd-unit, hero-date)   |
| `--surface-3`      | `#242b3b`            | Tag, chip                               |
| `--border`         | `#2a3246`            | Border kad hover, hero                  |
| `--border-soft`    | `#1f2535`            | Border divider, dalam-kad               |
| `--fg`             | `#ece6d2`            | Teks utama (hampir putih, tone warm)    |
| `--fg-soft`        | `#c6c0ab`            | Teks sekunder                           |
| `--muted`          | `#7a8290`            | Teks tersier, labels                    |
| `--muted-strong`   | `#9ba3b2`            | Caption, metadata                       |
| `--accent`         | `#f4b942`            | Amber utama — logo, CTA, hero digit     |
| `--accent-strong`  | `#ffc957`            | Amber bright — hover, emphasis          |
| `--accent-dim`     | `rgba(244,185,66,.14)` | Fill latar accent samar               |
| `--accent-glow`    | `rgba(244,185,66,.30)` | Radial glow di hero                   |
| `--danger`         | `#ef7360`            | Countdown < 3 hari (urgent)             |
| `--calm`           | `#7eb892`            | "Selesai", "Bermula"                    |

**Contrast ratios (WCAG):**
- `--fg` on `--bg`: 13.6:1 ✓ AAA
- `--fg-soft` on `--surface`: 8.9:1 ✓ AAA
- `--accent` on `--bg`: 9.1:1 ✓ AAA

---

## Tema Cerah

| Token              | Hex                  |
|--------------------|----------------------|
| `--bg`             | `#f6f1e3`            |
| `--surface`        | `#fcf8ec`            |
| `--surface-2`      | `#f0eadb`            |
| `--surface-3`      | `#e5decb`            |
| `--border`         | `#d4ccb6`            |
| `--border-soft`    | `#e6dfca`            |
| `--fg`             | `#1c2130`            |
| `--fg-soft`        | `#3b4258`            |
| `--muted`          | `#6b7280`            |
| `--muted-strong`   | `#4b5261`            |
| `--accent`         | `#b07c0d`            |
| `--accent-strong`  | `#935d04`            |
| `--danger`         | `#b3372a`            |
| `--calm`           | `#3f7c54`            |

---

## Tipografi

| Role      | Font                      | Fallback                           | Guna untuk                                |
|-----------|---------------------------|-------------------------------------|-------------------------------------------|
| Display   | **Fraunces** (variable)   | Georgia, Times New Roman, serif    | Headings, stat values, hero subject       |
| Body      | **DM Sans**               | system-ui, -apple-system, sans-serif | Teks normal, UI labels                  |
| Mono      | **JetBrains Mono**        | ui-monospace, SF Mono, Menlo        | Digit countdown, tarikh                   |

Source: Google Fonts (satu-satunya host CSS yang dibenarkan oleh CSP Artifact).

**Fraunces settings:**
- `opsz`: 36 untuk UI, 72 untuk hero
- Weight: 400 (regular), 500 (headings), 600 (emphasis)
- `letter-spacing: -0.02em` untuk headings

**DM Sans:**
- Weight: 400, 500, 600, 700
- `letter-spacing: 0` default; `0.08em+` untuk uppercase labels

---

## Type scale

| Role                | Size          | Weight | Font      |
|---------------------|---------------|--------|-----------|
| Hero subject (h1)   | 32–52px fluid | 500    | Display   |
| Section title       | 22–26px       | 500    | Display   |
| Subject name        | 20px          | 500    | Display   |
| Stat value          | 32–36px       | 500    | Display   |
| Hero digit          | 32–64px fluid | 600    | Mono      |
| Body                | 15px          | 400    | Body      |
| Caption             | 11–12.5px     | 500    | Body/Mono |
| Micro label (upper) | 10–11px       | 600    | Body      |

---

## Spacing scale

Base: 4px. Guna kelipatan 4.

- `2px`, `4px`, `6px`, `8px`, `10px`, `12px`, `14px`, `16px`, `20px`, `24px`, `28px`, `32px`, `36px`, `40px`, `48px`, `56px`, `72px`

Side gutter minimum: `16px` (phone) → `20px` (dalam `.wrap`).

---

## Radii

- `3–4px`: Tag, small chip
- `8–10px`: cd-unit, stat tile
- `12–14px`: Kad besar (hero, subject card, timeline)
- `999px`: Pill (theme toggle, hero-date)

---

## Motion

- `0.15s`: hover transitions (border-color, color)
- `2.2s ease-in-out infinite`: pulse dot pada hero-label
- Semua animasi: respect `prefers-reduced-motion: reduce`

---

## Rules untuk ChatGPT bila cadangkan perubahan palette

1. Update table di atas dengan hex baru
2. Pastikan contrast ratio minimum AA (4.5:1 body, 3:1 UI)
3. Dua-dua tema mesti kerja
4. Tulis dalam `docs/TODO.md`: "palette v2 ready, Claude sync ke style.css"
5. Claude akan ambil dari sini dan apply ke `src/css/style.css` block `:root`
