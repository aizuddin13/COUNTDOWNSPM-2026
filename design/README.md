# Design workspace

Folder untuk kerja grafik oleh ChatGPT. Claude tidak akan ubah apa-apa di sini (kecuali diminta).

## Struktur

```
design/
├── README.md               # Fail ini
├── mockups/                # Figma exports, screenshot proposals, draft layouts
├── icons/                  # Icon set (SVG preferred)
└── palette/                # Color system, tokens, moodboard
    └── README.md           # Current palette (shared truth antara dua AI)
```

## Workflow untuk ChatGPT

1. Baca `docs/AI-HANDOFF.md` untuk konteks keseluruhan projek
2. Baca `palette/README.md` untuk tokens warna semasa
3. Tengok `index.html` dan `src/css/style.css` untuk struktur HTML & styling semasa
4. Buat kerja dalam folder yang sesuai:
   - Mockup/concept → `mockups/`
   - Icon final (SVG) → `icons/`
   - Palette update → `palette/README.md`
5. Export file final ke `src/assets/` kalau nak digunakan terus oleh website
6. Update `docs/TODO.md` → mark task `[x]`
7. Commit dengan message yang jelas (contoh: "design: add hero illustration v2")

## Format fail yang dicadangkan

| Jenis               | Format     | Lokasi                  |
|---------------------|------------|-------------------------|
| Icon                | `.svg`     | `design/icons/*.svg`    |
| Mockup draft        | `.png`     | `design/mockups/*.png`  |
| Logo/brand          | `.svg`     | `src/assets/logo.svg`   |
| Favicon             | `.svg`     | `src/assets/favicon.svg`|
| Open Graph image    | `.png`     | `src/assets/og-image.png` (1200×630) |
| Pattern/background  | `.svg`     | `src/assets/*.svg`      |

## Rules

- **Dark mode first.** Reka untuk tema gelap, derive variant untuk tema cerah.
- **Accessible contrast.** Minimum WCAG AA (4.5:1 untuk body text).
- **No raster logos.** SVG untuk apa-apa yang perlu scale.
- **Reduce file size.** SVGO untuk SVG, pngquant untuk PNG.
- **No copyrighted assets.** Fonts dari Google Fonts, illustrations original.
