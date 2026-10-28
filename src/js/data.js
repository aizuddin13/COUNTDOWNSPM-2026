/* =====================================================
   SPM 2026 Countdown — Exam Data
   Dua set jadual dalam satu laman (toggle):
     • spm — Sijil Pelajaran Malaysia 2026 (Tingkatan 5)
     • t4  — Pentaksiran Semester 2 Tingkatan 4 2026 (MRSM Taiping)

   Semua masa dalam Malaysia Standard Time (UTC+08:00).

   Format setiap entri peperiksaan:
     subject : nama subjek
     paper   : nama kertas (contoh: "Kertas 1", "Kertas 3 — Amali")
     start   : ISO 8601 dengan offset +08:00, masa mula sebenar
     end     : (optional) masa tamat. Default: start + 3 jam.
               Untuk ujian berbilang hari (Bertutur), set tarikh akhir.
     tag     : (optional) label pendek pada kad ("Bertutur", "Amali",
               "Mendengar", "Melukis")

   Setiap dataset juga ada:
     breaks  : (optional) peta tarikh → masa minum pagi, contoh
               { '2026-11-16': '10.00 pagi' }. Tarikh ikut masa MYT.
   ===================================================== */

window.EXAM_DATASETS = {

  /* ===================================================
     SPM 2026 — Tingkatan 5
     Sumber: Jadual Waktu Peperiksaan SPM 2026 (LP/SPM/2026)
     Lembaga Peperiksaan, Kementerian Pendidikan Malaysia
     =================================================== */
  spm: {
    id: 'spm',
    label: 'SPM 2026',
    tagline: 'Tingkatan 5',
    brandMark: 'SPM',
    brandYear: '2026',
    brandSub: 'Hitung Mundur Peperiksaan',
    docTitle: 'SPM 2026 Countdown',
    calName: 'SPM 2026',
    calDesc: 'Jadual peperiksaan Sijil Pelajaran Malaysia 2026',
    icsFile: 'SPM-2026.ics',
    exportLabel: 'Muat turun SPM-2026.ics',
    exportDesc: 'Fail <code>.ics</code> ini boleh ditambah ke Google Calendar, Apple Calendar, Outlook atau mana-mana apl kalendar. Setiap kertas peperiksaan akan muncul sebagai event dengan peringatan 1 hari sebelum.',
    summaryPrefix: 'SPM',
    eventDesc: 'Peperiksaan SPM 2026',
    category: 'SPM 2026',
    footerSource: 'Jadual rasmi Lembaga Peperiksaan, KPM',
    doneText: 'Semua kertas peperiksaan SPM 2026 telah selesai.',

    subjectOrder: [
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
    ],

    exams: [
      // ── Bahasa Melayu ──────────────────────────────
      { subject: 'Bahasa Melayu', paper: 'Kertas 3 — Ujian Bertutur', start: '2026-10-26T08:00:00+08:00', end: '2026-10-29T17:00:00+08:00', tag: 'Bertutur' },
      { subject: 'Bahasa Melayu', paper: 'Kertas 4 — Ujian Mendengar', start: '2026-11-23T09:00:00+08:00', tag: 'Mendengar' },
      { subject: 'Bahasa Melayu', paper: 'Kertas 1', start: '2026-11-23T10:45:00+08:00' },
      { subject: 'Bahasa Melayu', paper: 'Kertas 2', start: '2026-11-23T14:30:00+08:00' },

      // ── Bahasa Inggeris ────────────────────────────
      { subject: 'Bahasa Inggeris', paper: 'Kertas 3 — Ujian Bertutur', start: '2026-11-02T08:00:00+08:00', end: '2026-11-05T17:00:00+08:00', tag: 'Bertutur' },
      { subject: 'Bahasa Inggeris', paper: 'Kertas 4 — Ujian Mendengar', start: '2026-11-24T09:00:00+08:00', tag: 'Mendengar' },
      { subject: 'Bahasa Inggeris', paper: 'Kertas 1', start: '2026-11-24T11:00:00+08:00' },
      { subject: 'Bahasa Inggeris', paper: 'Kertas 2', start: '2026-11-24T14:30:00+08:00' },

      // ── Pendidikan Islam ───────────────────────────
      { subject: 'Pendidikan Islam', paper: 'Kertas 1', start: '2026-11-25T08:15:00+08:00' },

      // ── Matematik ──────────────────────────────────
      { subject: 'Matematik', paper: 'Kertas 1', start: '2026-11-26T08:15:00+08:00' },
      { subject: 'Matematik', paper: 'Kertas 2', start: '2026-11-26T10:45:00+08:00' },

      // ── Sejarah ────────────────────────────────────
      { subject: 'Sejarah', paper: 'Kertas 1', start: '2026-11-30T08:15:00+08:00' },
      { subject: 'Sejarah', paper: 'Kertas 2', start: '2026-11-30T10:30:00+08:00' },

      // ── Fizik ──────────────────────────────────────
      { subject: 'Fizik', paper: 'Kertas 3 — Amali', start: '2026-11-16T08:00:00+08:00', tag: 'Amali' },
      { subject: 'Fizik', paper: 'Kertas 1', start: '2026-12-03T08:15:00+08:00' },
      { subject: 'Fizik', paper: 'Kertas 2', start: '2026-12-03T10:30:00+08:00' },

      // ── Biologi ────────────────────────────────────
      { subject: 'Biologi', paper: 'Kertas 3 — Amali', start: '2026-11-18T08:00:00+08:00', tag: 'Amali' },
      { subject: 'Biologi', paper: 'Kertas 1', start: '2026-12-02T08:15:00+08:00' },
      { subject: 'Biologi', paper: 'Kertas 2', start: '2026-12-02T10:45:00+08:00' },

      // ── Pendidikan Seni Visual ─────────────────────
      { subject: 'Pendidikan Seni Visual', paper: 'Kertas 2 — Ujian Melukis', start: '2026-12-01T08:15:00+08:00', tag: 'Melukis' },
      { subject: 'Pendidikan Seni Visual', paper: 'Kertas 1 — Teori Seni', start: '2026-12-01T12:00:00+08:00' },

      // ── Kimia ──────────────────────────────────────
      { subject: 'Kimia', paper: 'Kertas 3 — Amali', start: '2026-11-17T08:00:00+08:00', tag: 'Amali' },
      { subject: 'Kimia', paper: 'Kertas 1', start: '2026-12-15T08:15:00+08:00' },
      { subject: 'Kimia', paper: 'Kertas 2', start: '2026-12-15T10:45:00+08:00' },

      // ── Prinsip Perakaunan ─────────────────────────
      { subject: 'Prinsip Perakaunan', paper: 'Kertas 1', start: '2026-12-14T08:15:00+08:00' },
      { subject: 'Prinsip Perakaunan', paper: 'Kertas 2', start: '2026-12-14T10:45:00+08:00' },
      { subject: 'Prinsip Perakaunan', paper: 'Kertas 4', start: '2026-12-14T14:30:00+08:00' },

      // ── Matematik Tambahan ─────────────────────────
      { subject: 'Matematik Tambahan', paper: 'Kertas 1', start: '2026-12-17T08:15:00+08:00' },
      { subject: 'Matematik Tambahan', paper: 'Kertas 2', start: '2026-12-17T14:30:00+08:00' }
    ]
  },

  /* ===================================================
     Pentaksiran Semester 2 Tingkatan 4 2026
     Sumber: Jadual Peperiksaan Semester 2 Tingkatan 4 2026
     MRSM TAIPING

     Nota: Komponen Ujian Bertutur (BM/BI/Mandarin), Ujian Amali
     Sains, dan Ujian Tilawah/Hafazan dijalankan "di peringkat
     maktab" tanpa masa tetap — tidak dimasukkan dalam hitung
     mundur ini. Hanya ujian bertulis & mendengar (berjadual
     dengan masa) disenaraikan.
     =================================================== */
  t4: {
    id: 't4',
    label: 'Peperiksaan Akhir T4',
    tagline: 'Tingkatan 4 · Semester 2',
    brandMark: 'T4',
    brandYear: 'SEM 2',
    brandSub: 'Pentaksiran Semester 2',
    docTitle: 'Peperiksaan Akhir Tingkatan 4 2026',
    calName: 'Peperiksaan Akhir T4 2026',
    calDesc: 'Jadual Pentaksiran Semester 2 Tingkatan 4 2026 — MRSM Taiping',
    icsFile: 'Peperiksaan-T4-2026.ics',
    exportLabel: 'Muat turun Peperiksaan-T4-2026.ics',
    exportDesc: 'Fail <code>.ics</code> ini boleh ditambah ke Google Calendar, Apple Calendar, Outlook atau mana-mana apl kalendar. Setiap kertas peperiksaan Tingkatan 4 akan muncul sebagai event dengan peringatan 1 hari sebelum.',
    summaryPrefix: 'T4',
    eventDesc: 'Pentaksiran Semester 2 Tingkatan 4',
    category: 'Peperiksaan T4 2026',
    footerSource: 'Jadual Pentaksiran Semester 2 · MRSM Taiping',
    doneText: 'Semua kertas Pentaksiran Semester 2 Tingkatan 4 telah selesai.',

    subjectOrder: [
      'Bahasa Melayu',
      'Bahasa Inggeris',
      'Bahasa Mandarin',
      'Pendidikan Islam',
      'Matematik',
      'Matematik Tambahan',
      'Sejarah',
      'Fizik',
      'Kimia',
      'Biologi',
      'Prinsip Perakaunan',
      'Pendidikan Seni Visual',
      'Senireka',
      'Sains Komputer',
      'Pendidikan Jasmani dan Pendidikan Kesihatan'
    ],

    // Minum pagi mengikut hari peperiksaan (masa MYT)
    breaks: {
      '2026-11-12': '9.30 pagi',
      '2026-11-16': '10.00 pagi',
      '2026-11-17': '10.00 pagi',
      '2026-11-18': '10.00 pagi',
      '2026-11-19': '10.00 pagi',
      '2026-11-23': '9.30 pagi',
      '2026-11-24': '10.00 pagi',
      '2026-11-26': '9.30 pagi',
      '2026-11-30': '9.30 pagi',
      '2026-12-01': '10.30 pagi',
      '2026-12-02': 'Masa biasa',
      '2026-12-03': 'Masa biasa'
    },

    exams: [
      // ── 12 Nov (Khamis) — Ujian Mendengar ──────────
      { subject: 'Bahasa Mandarin', paper: 'Ujian Mendengar', start: '2026-11-12T08:00:00+08:00', end: '2026-11-12T08:30:00+08:00', tag: 'Mendengar' },
      { subject: 'Bahasa Melayu', paper: 'Kertas 4 — Ujian Mendengar', start: '2026-11-12T10:30:00+08:00', end: '2026-11-12T11:00:00+08:00', tag: 'Mendengar' },
      { subject: 'Bahasa Inggeris', paper: 'Kertas 4 — Ujian Mendengar', start: '2026-11-12T12:00:00+08:00', end: '2026-11-12T12:40:00+08:00', tag: 'Mendengar' },

      // ── 16 Nov (Isnin) — Bahasa Melayu ─────────────
      { subject: 'Bahasa Melayu', paper: 'Kertas 1', start: '2026-11-16T08:00:00+08:00', end: '2026-11-16T10:00:00+08:00' },
      { subject: 'Bahasa Melayu', paper: 'Kertas 2', start: '2026-11-16T11:00:00+08:00', end: '2026-11-16T13:30:00+08:00' },

      // ── 17 Nov (Selasa) — Matematik Tambahan ───────
      { subject: 'Matematik Tambahan', paper: 'Kertas 1', start: '2026-11-17T08:00:00+08:00', end: '2026-11-17T09:00:00+08:00' },
      { subject: 'Matematik Tambahan', paper: 'Kertas 2', start: '2026-11-17T11:00:00+08:00', end: '2026-11-17T12:30:00+08:00' },

      // ── 18 Nov (Rabu) — Bahasa Inggeris ────────────
      { subject: 'Bahasa Inggeris', paper: 'Kertas 1 — Pemahaman', start: '2026-11-18T08:00:00+08:00', end: '2026-11-18T09:30:00+08:00' },
      { subject: 'Bahasa Inggeris', paper: 'Kertas 2 — Penulisan', start: '2026-11-18T11:00:00+08:00', end: '2026-11-18T12:30:00+08:00' },

      // ── 19 Nov (Khamis) — Matematik ────────────────
      { subject: 'Matematik', paper: 'Kertas 1', start: '2026-11-19T08:00:00+08:00', end: '2026-11-19T09:00:00+08:00' },
      { subject: 'Matematik', paper: 'Kertas 2', start: '2026-11-19T11:00:00+08:00', end: '2026-11-19T12:30:00+08:00' },

      // ── 23 Nov (Isnin) — Biologi & Perakaunan ──────
      { subject: 'Biologi', paper: 'Kertas 1', start: '2026-11-23T08:00:00+08:00', end: '2026-11-23T09:15:00+08:00' },
      { subject: 'Prinsip Perakaunan', paper: 'Kertas 1', start: '2026-11-23T08:00:00+08:00', end: '2026-11-23T09:15:00+08:00' },
      { subject: 'Biologi', paper: 'Kertas 2', start: '2026-11-23T10:30:00+08:00', end: '2026-11-23T12:30:00+08:00' },
      { subject: 'Prinsip Perakaunan', paper: 'Kertas 2', start: '2026-11-23T10:30:00+08:00', end: '2026-11-23T13:00:00+08:00' },

      // ── 24 Nov (Selasa) — Sejarah ──────────────────
      { subject: 'Sejarah', paper: 'Kertas 1', start: '2026-11-24T08:00:00+08:00', end: '2026-11-24T09:00:00+08:00' },
      { subject: 'Sejarah', paper: 'Kertas 2', start: '2026-11-24T11:00:00+08:00', end: '2026-11-24T12:30:00+08:00' },

      // ── 25 Nov (Rabu) — Pendidikan Seni Visual ─────
      { subject: 'Pendidikan Seni Visual', paper: 'Kertas 1', start: '2026-11-25T08:00:00+08:00', end: '2026-11-25T09:00:00+08:00' },
      { subject: 'Pendidikan Seni Visual', paper: 'Kertas 2', start: '2026-11-25T10:00:00+08:00', end: '2026-11-25T13:00:00+08:00' },

      // ── 26 Nov (Khamis) — Kimia ────────────────────
      { subject: 'Kimia', paper: 'Kertas 1', start: '2026-11-26T08:00:00+08:00', end: '2026-11-26T09:15:00+08:00' },
      { subject: 'Kimia', paper: 'Kertas 2', start: '2026-11-26T10:30:00+08:00', end: '2026-11-26T13:00:00+08:00' },

      // ── 30 Nov (Isnin) — Fizik ─────────────────────
      { subject: 'Fizik', paper: 'Kertas 1', start: '2026-11-30T08:00:00+08:00', end: '2026-11-30T09:15:00+08:00' },
      { subject: 'Fizik', paper: 'Kertas 2', start: '2026-11-30T10:30:00+08:00', end: '2026-11-30T13:00:00+08:00' },

      // ── 1 Dis (Selasa) — Pendidikan Islam & Mandarin
      { subject: 'Pendidikan Islam', paper: 'Kertas 1', start: '2026-12-01T08:00:00+08:00', end: '2026-12-01T10:30:00+08:00' },
      { subject: 'Bahasa Mandarin', paper: 'Ujian Bertulis', start: '2026-12-01T11:30:00+08:00', end: '2026-12-01T12:30:00+08:00' },

      // ── 2 Dis (Rabu) — Senireka & Sains Komputer ───
      { subject: 'Senireka', paper: 'Ujian Bertulis', start: '2026-12-02T08:00:00+08:00', end: '2026-12-02T08:45:00+08:00' },
      { subject: 'Sains Komputer', paper: 'Ujian Bertulis', start: '2026-12-02T10:30:00+08:00', end: '2026-12-02T12:00:00+08:00' },

      // ── 3 Dis (Khamis) — PJPK ──────────────────────
      { subject: 'Pendidikan Jasmani dan Pendidikan Kesihatan', paper: 'Ujian Bertulis', start: '2026-12-03T08:00:00+08:00', end: '2026-12-03T09:15:00+08:00' }
    ]
  }
};

/* Dataset yang dipaparkan secara default bila mula-mula buka laman */
window.DEFAULT_DATASET = 'spm';
