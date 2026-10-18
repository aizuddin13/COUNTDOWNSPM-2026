/* =====================================================
   SPM 2026 — Exam Data
   Sumber: Jadual Waktu Peperiksaan SPM 2026 (LP/SPM/2026)
   Lembaga Peperiksaan, Kementerian Pendidikan Malaysia

   Semua masa dalam Malaysia Standard Time (UTC+08:00).

   Format setiap entri:
     subject : nama subjek
     paper   : nama kertas (contoh: "Kertas 1", "Kertas 3 — Amali")
     start   : ISO 8601 dengan offset +08:00, masa mula sebenar peperiksaan
     end     : (optional) masa tamat. Default: start + 3 jam.
               Untuk ujian berbilang hari (Bertutur), set tarikh akhir.
     tag     : (optional) label pendek pada kad ("Bertutur", "Amali", "Mendengar")
   ===================================================== */

window.SPM_EXAMS = [
  // ── Bahasa Melayu ─────────────────────────────────
  {
    subject: 'Bahasa Melayu',
    paper: 'Kertas 3 — Ujian Bertutur',
    start: '2026-10-26T08:00:00+08:00',
    end:   '2026-10-29T17:00:00+08:00',
    tag:   'Bertutur'
  },
  {
    subject: 'Bahasa Melayu',
    paper: 'Kertas 4 — Ujian Mendengar',
    start: '2026-11-23T09:00:00+08:00',
    tag:   'Mendengar'
  },
  {
    subject: 'Bahasa Melayu',
    paper: 'Kertas 1',
    start: '2026-11-23T10:45:00+08:00'
  },
  {
    subject: 'Bahasa Melayu',
    paper: 'Kertas 2',
    start: '2026-11-23T14:30:00+08:00'
  },

  // ── Bahasa Inggeris ───────────────────────────────
  {
    subject: 'Bahasa Inggeris',
    paper: 'Kertas 3 — Ujian Bertutur',
    start: '2026-11-02T08:00:00+08:00',
    end:   '2026-11-05T17:00:00+08:00',
    tag:   'Bertutur'
  },
  {
    subject: 'Bahasa Inggeris',
    paper: 'Kertas 4 — Ujian Mendengar',
    start: '2026-11-24T09:00:00+08:00',
    tag:   'Mendengar'
  },
  {
    subject: 'Bahasa Inggeris',
    paper: 'Kertas 1',
    start: '2026-11-24T11:00:00+08:00'
  },
  {
    subject: 'Bahasa Inggeris',
    paper: 'Kertas 2',
    start: '2026-11-24T14:30:00+08:00'
  },

  // ── Pendidikan Islam ──────────────────────────────
  {
    subject: 'Pendidikan Islam',
    paper: 'Kertas 1',
    start: '2026-11-25T08:15:00+08:00'
  },

  // ── Matematik ─────────────────────────────────────
  {
    subject: 'Matematik',
    paper: 'Kertas 1',
    start: '2026-11-26T08:15:00+08:00'
  },
  {
    subject: 'Matematik',
    paper: 'Kertas 2',
    start: '2026-11-26T10:45:00+08:00'
  },

  // ── Sejarah ───────────────────────────────────────
  {
    subject: 'Sejarah',
    paper: 'Kertas 1',
    start: '2026-11-30T08:15:00+08:00'
  },
  {
    subject: 'Sejarah',
    paper: 'Kertas 2',
    start: '2026-11-30T10:30:00+08:00'
  },

  // ── Fizik ─────────────────────────────────────────
  {
    subject: 'Fizik',
    paper: 'Kertas 3 — Amali',
    start: '2026-11-16T08:00:00+08:00',
    tag:   'Amali'
  },
  {
    subject: 'Fizik',
    paper: 'Kertas 1',
    start: '2026-12-03T08:15:00+08:00'
  },
  {
    subject: 'Fizik',
    paper: 'Kertas 2',
    start: '2026-12-03T10:30:00+08:00'
  },

  // ── Biologi ───────────────────────────────────────
  {
    subject: 'Biologi',
    paper: 'Kertas 3 — Amali',
    start: '2026-11-18T08:00:00+08:00',
    tag:   'Amali'
  },
  {
    subject: 'Biologi',
    paper: 'Kertas 1',
    start: '2026-12-02T08:15:00+08:00'
  },
  {
    subject: 'Biologi',
    paper: 'Kertas 2',
    start: '2026-12-02T10:45:00+08:00'
  },

  // ── Pendidikan Seni Visual ────────────────────────
  {
    subject: 'Pendidikan Seni Visual',
    paper: 'Kertas 2 — Ujian Melukis',
    start: '2026-12-01T08:15:00+08:00',
    tag:   'Melukis'
  },
  {
    subject: 'Pendidikan Seni Visual',
    paper: 'Kertas 1 — Teori Seni',
    start: '2026-12-01T12:00:00+08:00'
  },

  // ── Kimia ─────────────────────────────────────────
  {
    subject: 'Kimia',
    paper: 'Kertas 3 — Amali',
    start: '2026-11-17T08:00:00+08:00',
    tag:   'Amali'
  },
  {
    subject: 'Kimia',
    paper: 'Kertas 1',
    start: '2026-12-15T08:15:00+08:00'
  },
  {
    subject: 'Kimia',
    paper: 'Kertas 2',
    start: '2026-12-15T10:45:00+08:00'
  },

  // ── Prinsip Perakaunan ────────────────────────────
  {
    subject: 'Prinsip Perakaunan',
    paper: 'Kertas 1',
    start: '2026-12-14T08:15:00+08:00'
  },
  {
    subject: 'Prinsip Perakaunan',
    paper: 'Kertas 2',
    start: '2026-12-14T10:45:00+08:00'
  },
  {
    subject: 'Prinsip Perakaunan',
    paper: 'Kertas 4',
    start: '2026-12-14T14:30:00+08:00'
  },

  // ── Matematik Tambahan ────────────────────────────
  {
    subject: 'Matematik Tambahan',
    paper: 'Kertas 1',
    start: '2026-12-17T08:15:00+08:00'
  },
  {
    subject: 'Matematik Tambahan',
    paper: 'Kertas 2',
    start: '2026-12-17T14:30:00+08:00'
  }
];

/* Susunan paparan subjek (atas → bawah dalam grid) */
window.SPM_SUBJECT_ORDER = [
  'Bahasa Melayu',
  'Bahasa Inggeris',
  'Pendidikan Islam',
  'Matematik',
  'Sejarah',
  'Fizik',
  'Biologi',
  'Pendidikan Seni Visual',
  'Kimia',
  'Prinsip Perakaunan',
  'Matematik Tambahan'
];
