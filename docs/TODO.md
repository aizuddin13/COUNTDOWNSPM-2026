# TODO — SPM 2026 Countdown

Status semasa dan task yang perlu dibuat. AI yang handle task akan mark `[x]` bila siap.

Format: `[ ]` belum, `[~]` sedang buat, `[x]` siap. Tag `@claude` atau `@chatgpt` untuk owner.

---

## ✅ Siap

- [x] @claude Scaffold struktur projek
- [x] @claude Setup HTML/CSS/JS split dari single-file prototype
- [x] @claude Logik countdown (live tick setiap saat)
- [x] @claude Data 29 kertas, 11 subjek dengan timezone MYT
- [x] @claude Tema gelap/cerah dengan toggle + persist localStorage
- [x] @claude Responsive 380px → 1120px
- [x] @claude GitHub Pages workflow
- [x] @claude Jam & tarikh live dalam header (MYT, update per saat)
- [x] @claude Export jadual ke .ics (iCalendar) untuk calendar app
- [x] @chatgpt Reka favicon (SVG adaptive + light/dark variant + PNG fallback)
- [x] @claude Tambah `<link rel="icon">` dalam `index.html` + apple-touch-icon

---

## 🚧 Sedang dibuat

_(Takde)_

---

## 📋 Perlu dibuat

### Reka bentuk visual (@chatgpt)

- [ ] @chatgpt Open Graph image (1200×630) untuk social share — `src/assets/og-image.png`
- [ ] @chatgpt Illustration/pattern untuk hero background (optional, subtle)
- [ ] @chatgpt Icon set untuk subject tags (Amali, Bertutur, Mendengar, Melukis)
- [ ] @chatgpt Review current palette dalam `design/palette/README.md`, cadangkan penambahbaikan

### Teknikal (@claude)

- [ ] @claude Tambah Open Graph meta tags bila og-image dah ada
- [ ] @claude Service worker untuk offline support (nice-to-have)
- [ ] @claude Study tracker: tandakan subjek yang dah habis belajar (localStorage)
- [ ] @claude Lighthouse audit → fix performance/accessibility issues

### Idea masa depan (parkir dulu)

- [ ] Study timer / Pomodoro built-in
- [ ] Analytics ringan (Plausible atau self-hosted Umami) untuk track penggunaan sendiri
- [ ] Nota per subjek (markdown) yang disimpan dalam localStorage
- [ ] Mode "exam day" — bila hari exam, besarkan jam & countdown ke next session

---

## 🐛 Bug / isu

_(Takde)_

---

## 📝 Catatan

- Timezone **sentiasa** MYT (+08:00). Jangan guna `new Date(string)` tanpa offset.
- Dark mode adalah default. Light mode derived.
- Tak ada tracking analytics setakat ini — pure static site.
