/* =====================================================
   SPM 2026 Countdown — Application Logic
   Depends on data.js (EXAM_DATASETS, DEFAULT_DATASET)

   Dua set jadual (SPM Tingkatan 5 / Peperiksaan Akhir T4)
   boleh ditukar melalui toggle. Semua paparan — hero,
   statistik, kad subjek, timeline, minum pagi, dan fail
   .ics — mengikut dataset yang aktif.
   ===================================================== */

(function () {
  'use strict';

  const DATASETS = window.EXAM_DATASETS || {};
  const STORAGE_KEY = 'spm-dataset';

  // Tentukan dataset permulaan (localStorage → default → pertama ada)
  function resolveInitialKey() {
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage blocked */ }
    if (stored && DATASETS[stored]) return stored;
    if (window.DEFAULT_DATASET && DATASETS[window.DEFAULT_DATASET]) return window.DEFAULT_DATASET;
    return Object.keys(DATASETS)[0];
  }

  let activeKey = resolveInitialKey();

  // State aktif (diset semula setiap kali tukar dataset)
  let EXAMS = [];
  let SUBJECT_ORDER = [];
  let BREAKS = {};
  let META = {};

  function loadDataset(key) {
    const ds = DATASETS[key];
    if (!ds) return;
    activeKey = key;
    META = ds;
    SUBJECT_ORDER = ds.subjectOrder || [];
    BREAKS = ds.breaks || {};
    // Salin + normalkan (startMs/endMs dikira sekali)
    EXAMS = (ds.exams || []).map(e => {
      const startMs = new Date(e.start).getTime();
      return Object.assign({}, e, {
        startMs,
        endMs: e.end ? new Date(e.end).getTime() : startMs + 3 * 60 * 60 * 1000
      });
    });
  }

  // ── Malay date formatting ────────────────────────────
  const DAYS_MY = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
  const MONTHS_MY = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
  const MONTHS_SHORT_MY = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'];

  /** Returns a Date whose UTC getters give MYT (UTC+8) wall-clock time. */
  function dateInMYT(ms) {
    return new Date(ms + 8 * 60 * 60 * 1000);
  }

  function dayKey(ms) {
    const d = dateInMYT(ms);
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  }

  function formatFullDate(ms) {
    const d = dateInMYT(ms);
    return `${DAYS_MY[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS_MY[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  }

  function formatShortDate(ms) {
    const d = dateInMYT(ms);
    return `${d.getUTCDate()} ${MONTHS_SHORT_MY[d.getUTCMonth()]}`;
  }

  function formatDayName(ms) {
    return DAYS_MY[dateInMYT(ms).getUTCDay()];
  }

  function formatTime(ms) {
    const d = dateInMYT(ms);
    const h24 = d.getUTCHours();
    const m = d.getUTCMinutes();
    const period = h24 < 12 ? 'pagi' : h24 < 15 ? 'tengah hari' : h24 < 19 ? 'petang' : 'malam';
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;
    return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
  }

  function formatDateRange(startMs, endMs) {
    const s = dateInMYT(startMs);
    const e = dateInMYT(endMs);
    if (s.getUTCFullYear() === e.getUTCFullYear() && s.getUTCMonth() === e.getUTCMonth()) {
      return `${s.getUTCDate()}–${e.getUTCDate()} ${MONTHS_MY[s.getUTCMonth()]} ${s.getUTCFullYear()}`;
    }
    return `${formatShortDate(startMs)}–${formatShortDate(endMs)}`;
  }

  // ── Countdown math ───────────────────────────────────
  function splitDuration(ms) {
    if (ms < 0) ms = 0;
    const totalSeconds = Math.floor(ms / 1000);
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
      totalMs: ms
    };
  }

  function daysUntil(targetMs, nowMs) {
    return Math.ceil((targetMs - nowMs) / 86400000);
  }

  function pad(n) {
    return n.toString().padStart(2, '0');
  }

  // ── iCalendar (.ics) export ──────────────────────────
  function icsLocalTime(ms) {
    const d = dateInMYT(ms);
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`;
  }

  function icsUtcTime(ms) {
    const d = new Date(ms);
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
  }

  function icsDate(ms) {
    const d = dateInMYT(ms);
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
  }

  /** Escape text per RFC 5545 §3.3.11: backslash, semicolon, comma, newline. */
  function icsEscape(text) {
    return String(text)
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\r?\n/g, '\\n');
  }

  /**
   * Build an iCalendar document from the active dataset.
   * Multi-day exams (end spans more than 24 hours) become all-day events
   * because the actual slot is per-candidate.
   */
  function buildICS(now) {
    const dtstamp = icsUtcTime(now);
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SPM 2026 Countdown//MY',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${icsEscape(META.calName || 'Peperiksaan')}`,
      'X-WR-TIMEZONE:Asia/Kuala_Lumpur',
      `X-WR-CALDESC:${icsEscape(META.calDesc || '')}`,
      // Minimal VTIMEZONE (Malaysia has no DST)
      'BEGIN:VTIMEZONE',
      'TZID:Asia/Kuala_Lumpur',
      'BEGIN:STANDARD',
      'DTSTART:19700101T000000',
      'TZOFFSETFROM:+0800',
      'TZOFFSETTO:+0800',
      'TZNAME:MYT',
      'END:STANDARD',
      'END:VTIMEZONE'
    ];

    const prefix = META.summaryPrefix || 'Exam';
    const baseDesc = META.eventDesc || 'Peperiksaan';
    const category = META.category || 'Peperiksaan';

    EXAMS.forEach(exam => {
      const slug = (activeKey + '-' + exam.subject + '-' + exam.paper + '-' + exam.startMs)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const uid = `${slug}@aizuddin13.github.io`;
      const summary = `${prefix}: ${exam.subject} — ${exam.paper}`;
      const description = exam.tag ? `${baseDesc} (${exam.tag})` : baseDesc;

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${dtstamp}`);

      const durationMs = exam.endMs - exam.startMs;
      if (durationMs > 86400000) {
        // All-day event (sessions assigned per candidate)
        const endPlusOne = exam.endMs + 86400000;
        lines.push(`DTSTART;VALUE=DATE:${icsDate(exam.startMs)}`);
        lines.push(`DTEND;VALUE=DATE:${icsDate(endPlusOne)}`);
      } else {
        lines.push(`DTSTART;TZID=Asia/Kuala_Lumpur:${icsLocalTime(exam.startMs)}`);
        lines.push(`DTEND;TZID=Asia/Kuala_Lumpur:${icsLocalTime(exam.endMs)}`);
      }

      lines.push(`SUMMARY:${icsEscape(summary)}`);
      lines.push(`DESCRIPTION:${icsEscape(description)}`);
      lines.push(`CATEGORIES:${icsEscape(category)}`);
      lines.push('STATUS:CONFIRMED');
      lines.push('TRANSP:OPAQUE');

      // Reminder: 1 day before (not for all-day sessions)
      if (durationMs <= 86400000) {
        lines.push('BEGIN:VALARM');
        lines.push('ACTION:DISPLAY');
        lines.push(`DESCRIPTION:${icsEscape(summary)}`);
        lines.push('TRIGGER:-P1D');
        lines.push('END:VALARM');
      }

      lines.push('END:VEVENT');
    });

    lines.push('END:VCALENDAR');
    // RFC 5545 requires CRLF line endings
    return lines.join('\r\n') + '\r\n';
  }

  /** Trigger a download of the .ics file for the active dataset. */
  function downloadICS() {
    const ics = buildICS(Date.now());
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = META.icsFile || 'peperiksaan.ics';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // ── Grouping ─────────────────────────────────────────
  function groupBySubject() {
    const map = new Map();
    SUBJECT_ORDER.forEach(s => map.set(s, []));
    EXAMS.forEach(e => {
      if (!map.has(e.subject)) map.set(e.subject, []);
      map.get(e.subject).push(e);
    });
    for (const [, arr] of map) arr.sort((a, b) => a.startMs - b.startMs);
    return map;
  }

  function groupByDay() {
    const map = new Map();
    EXAMS.forEach(e => {
      const key = dayKey(e.startMs);
      if (!map.has(key)) {
        map.set(key, { key, startMs: e.startMs, endMs: e.endMs, items: [] });
      }
      const bucket = map.get(key);
      bucket.items.push(e);
      bucket.startMs = Math.min(bucket.startMs, e.startMs);
      bucket.endMs = Math.max(bucket.endMs, e.endMs);
    });
    const arr = Array.from(map.values()).sort((a, b) => a.startMs - b.startMs);
    arr.forEach(d => d.items.sort((a, b) => a.startMs - b.startMs));
    return arr;
  }

  // ── Static rendering ─────────────────────────────────
  function renderSubjects() {
    const grid = document.getElementById('subjectGrid');
    const grouped = groupBySubject();
    grid.innerHTML = '';
    let subjectCount = 0;

    for (const [subject, papers] of grouped) {
      if (!papers.length) continue;
      subjectCount++;

      const first = papers[0];
      const last = papers[papers.length - 1];
      const metaText = papers.length === 1
        ? formatShortDate(first.startMs)
        : `${formatShortDate(first.startMs)} – ${formatShortDate(last.startMs)}`;

      const card = document.createElement('article');
      card.className = 'subject-card';
      card.dataset.subject = subject;
      card.innerHTML = `
        <header class="subject-head">
          <h3 class="subject-name">${subject}</h3>
          <div class="subject-meta">${metaText}</div>
        </header>
        <ul class="paper-list">
          ${papers.map(p => `
            <li class="paper" data-start="${p.startMs}" data-end="${p.endMs}">
              <div class="paper-name">${p.paper}${p.tag ? `<span class="paper-tag">${p.tag}</span>` : ''}</div>
              <div class="paper-date">${formatShortDate(p.startMs)} · ${formatTime(p.startMs)}</div>
              <div class="paper-count"><span class="pc-value">—</span></div>
            </li>
          `).join('')}
        </ul>
      `;
      grid.appendChild(card);
    }

    document.getElementById('subjectCount').textContent = `${subjectCount} subjek · ${EXAMS.length} kertas`;
  }

  function renderTimeline() {
    const container = document.getElementById('timelineList');
    const days = groupByDay();
    container.innerHTML = '';

    days.forEach(day => {
      const rangeItem = day.items.find(e => e.end && (new Date(e.end).getTime() - new Date(e.start).getTime()) > 86400000);
      const dateMainText = rangeItem
        ? formatDateRange(rangeItem.startMs, rangeItem.endMs)
        : formatShortDate(day.startMs);
      const dayNameText = rangeItem ? 'Minggu peperiksaan' : formatDayName(day.startMs);

      const breakTime = BREAKS[day.key];
      const breakHTML = breakTime
        ? `<div class="tl-break" title="Masa minum pagi">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
               <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
               <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
               <line x1="6" y1="1" x2="6" y2="4"></line>
               <line x1="10" y1="1" x2="10" y2="4"></line>
               <line x1="14" y1="1" x2="14" y2="4"></line>
             </svg>
             <span>Minum pagi · ${breakTime}</span>
           </div>`
        : '';

      const row = document.createElement('div');
      row.className = 'tl-day';
      row.dataset.start = day.startMs;
      row.dataset.end = day.endMs;
      row.innerHTML = `
        <div class="tl-date">
          <div class="tl-date-main">${dateMainText}</div>
          <div class="tl-date-day">${dayNameText}</div>
        </div>
        <div class="tl-papers">
          ${day.items.map(e => `
            <div class="tl-paper-row">
              <span class="tl-subj">${e.subject}</span>
              <span class="tl-pname">${e.paper}</span>
              <span class="tl-time">${formatTime(e.startMs)}</span>
            </div>
          `).join('')}
          ${breakHTML}
        </div>
        <div class="tl-count"><span class="tc-value">—</span></div>
      `;
      container.appendChild(row);
    });

    document.getElementById('timelineCount').textContent = `${days.length} hari`;
  }

  // ── Dataset-specific chrome (brand, footer, labels) ──
  function renderChrome() {
    setText('brandMark', META.brandMark);
    setText('brandYear', META.brandYear);
    setText('brandSub', META.brandSub);
    setText('footerSource', META.footerSource);
    setText('exportLabel', META.exportLabel);
    setHTML('exportDesc', META.exportDesc);
    if (META.docTitle) document.title = META.docTitle;

    // Label statistik kertas terakhir: ikut tarikh kertas akhir
    const lastExam = EXAMS.reduce((max, e) => e.endMs > max.endMs ? e : max, EXAMS[0]);
    const statLastLabel = document.getElementById('statLastLabel');
    if (statLastLabel && lastExam) {
      statLastLabel.textContent = `ke kertas terakhir (${formatShortDate(lastExam.endMs)})`;
    }

    // Keadaan butang toggle
    document.querySelectorAll('.mode-btn').forEach(btn => {
      const on = btn.dataset.mode === activeKey;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value != null) el.textContent = value;
  }

  function setHTML(id, value) {
    const el = document.getElementById(id);
    if (el && value != null) el.innerHTML = value;
  }

  // ── Hero ─────────────────────────────────────────────
  function findNextExam(nowMs) {
    const upcoming = EXAMS.filter(e => e.endMs > nowMs).sort((a, b) => a.startMs - b.startMs);
    return upcoming[0] || null;
  }

  function renderHeroStatic(exam) {
    const subjectEl = document.getElementById('heroSubject');
    const paperEl = document.getElementById('heroPaper');
    const dateEl = document.getElementById('heroDateText');
    const labelEl = document.getElementById('heroLabel');
    const hero = document.getElementById('hero');

    if (!exam) {
      hero.classList.add('done');
      labelEl.textContent = 'Semua Peperiksaan Selesai';
      subjectEl.textContent = 'Tahniah!';
      paperEl.textContent = META.doneText || 'Semua kertas peperiksaan telah selesai.';
      dateEl.textContent = 'Semoga keputusan menyebelahi anda.';
      document.getElementById('heroCountdown').hidden = true;
      return;
    }

    hero.classList.remove('done');
    document.getElementById('heroCountdown').hidden = false;
    subjectEl.textContent = exam.subject;
    paperEl.textContent = exam.paper;
    dateEl.textContent = exam.end && (exam.endMs - exam.startMs) > 86400000
      ? formatDateRange(exam.startMs, exam.endMs)
      : `${formatFullDate(exam.startMs)} · ${formatTime(exam.startMs)}`;
  }

  // ── Live tick ────────────────────────────────────────
  let currentHeroKey = null;

  function examKey(e) {
    return e ? `${activeKey}|${e.subject}|${e.paper}|${e.startMs}` : null;
  }

  function updateNow(nowMs) {
    const d = dateInMYT(nowMs);
    const timeEl = document.getElementById('nowTime');
    const dateEl = document.getElementById('nowDate');
    if (timeEl) {
      timeEl.textContent = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
    }
    if (dateEl) {
      dateEl.textContent = `${DAYS_MY[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS_SHORT_MY[d.getUTCMonth()]}`;
    }
  }

  function tick() {
    const nowMs = Date.now();
    updateNow(nowMs);

    if (!EXAMS.length) return;

    const nextExam = findNextExam(nowMs);
    const nextKey = examKey(nextExam);

    if (nextKey !== currentHeroKey) {
      currentHeroKey = nextKey;
      renderHeroStatic(nextExam);
    }

    // Hero countdown
    if (nextExam) {
      const label = document.getElementById('heroLabel');
      label.textContent = (nowMs >= nextExam.startMs && nowMs < nextExam.endMs)
        ? 'Peperiksaan Sedang Berjalan'
        : 'Peperiksaan Seterusnya';

      const targetMs = nowMs < nextExam.startMs ? nextExam.startMs : nextExam.endMs;
      const d = splitDuration(targetMs - nowMs);
      const cd = document.getElementById('heroCountdown');
      cd.querySelector('[data-unit="days"]').textContent = pad(d.days);
      cd.querySelector('[data-unit="hours"]').textContent = pad(d.hours);
      cd.querySelector('[data-unit="minutes"]').textContent = pad(d.minutes);
      cd.querySelector('[data-unit="seconds"]').textContent = pad(d.seconds);
    }

    // Stats
    const firstExam = EXAMS.reduce((min, e) => e.startMs < min.startMs ? e : min, EXAMS[0]);
    const lastExam = EXAMS.reduce((max, e) => e.endMs > max.endMs ? e : max, EXAMS[0]);
    const remaining = EXAMS.filter(e => e.endMs > nowMs).length;

    const statFirst = document.getElementById('statFirst');
    const statLast = document.getElementById('statLast');
    const statRemaining = document.getElementById('statRemaining');

    statFirst.innerHTML = nowMs >= firstExam.startMs
      ? `<span style="color:var(--calm)">Bermula</span>`
      : `${daysUntil(firstExam.startMs, nowMs)}<span class="stat-suffix">hari</span>`;

    statLast.innerHTML = nowMs >= lastExam.endMs
      ? `<span style="color:var(--calm)">Selesai</span>`
      : `${daysUntil(lastExam.endMs, nowMs)}<span class="stat-suffix">hari</span>`;

    statRemaining.innerHTML = `${remaining}<span class="stat-suffix">/ <span id="statTotal">${EXAMS.length}</span></span>`;

    // Paper rows in subject cards
    document.querySelectorAll('.paper').forEach(row => {
      const startMs = Number(row.dataset.start);
      const endMs = Number(row.dataset.end);
      const countEl = row.querySelector('.paper-count');
      row.classList.remove('urgent', 'soon', 'done', 'active');

      if (nowMs >= endMs) {
        row.classList.add('done');
        countEl.innerHTML = `✓ Selesai`;
      } else if (nowMs >= startMs && nowMs < endMs) {
        row.classList.add('active');
        countEl.innerHTML = `Sedang berlangsung`;
      } else {
        const d = splitDuration(startMs - nowMs);
        if (d.days < 3) row.classList.add('urgent');
        else if (d.days < 14) row.classList.add('soon');

        if (d.days > 0) {
          countEl.innerHTML = `${d.days}<span class="pc-unit">hari</span>`;
        } else if (d.hours > 0) {
          countEl.innerHTML = `${d.hours}<span class="pc-unit">jam</span> ${pad(d.minutes)}<span class="pc-unit">min</span>`;
        } else {
          countEl.innerHTML = `${d.minutes}<span class="pc-unit">min</span> ${pad(d.seconds)}<span class="pc-unit">saat</span>`;
        }
      }
    });

    // Highlight subject card containing the next exam
    document.querySelectorAll('.subject-card').forEach(card => {
      card.classList.toggle('next', nextExam && card.dataset.subject === nextExam.subject);
    });

    // Timeline rows
    document.querySelectorAll('.tl-day').forEach(row => {
      const startMs = Number(row.dataset.start);
      const endMs = Number(row.dataset.end);
      const countEl = row.querySelector('.tl-count');
      row.classList.remove('urgent', 'soon', 'done', 'active');

      if (nowMs >= endMs) {
        row.classList.add('done');
        countEl.innerHTML = `✓ Selesai`;
      } else if (nowMs >= startMs && nowMs < endMs) {
        row.classList.add('active');
        countEl.innerHTML = `Hari ini`;
      } else {
        const d = splitDuration(startMs - nowMs);
        if (d.days < 3) row.classList.add('urgent');
        else if (d.days < 14) row.classList.add('soon');

        if (d.days > 0) {
          countEl.innerHTML = `${d.days}<span class="tc-unit">hari</span>`;
        } else if (d.hours > 0) {
          countEl.innerHTML = `${d.hours}<span class="tc-unit">jam</span> ${pad(d.minutes)}<span class="tc-unit">min</span>`;
        } else {
          countEl.innerHTML = `${d.minutes}<span class="tc-unit">min</span> ${pad(d.seconds)}<span class="tc-unit">saat</span>`;
        }
      }
    });
  }

  // ── Mode toggle ──────────────────────────────────────
  function switchDataset(key) {
    if (!DATASETS[key] || key === activeKey) return;
    loadDataset(key);
    try { localStorage.setItem(STORAGE_KEY, key); } catch (e) { /* storage blocked */ }
    currentHeroKey = null;
    renderAll();
  }

  function initModeToggle() {
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => switchDataset(btn.dataset.mode));
    });
  }

  function renderAll() {
    renderChrome();
    renderSubjects();
    renderTimeline();
    tick();
  }

  // ── Theme toggle ─────────────────────────────────────
  function initTheme() {
    const btn = document.getElementById('themeToggle');
    const label = document.getElementById('themeLabel');
    const icon = document.getElementById('themeIcon');

    let stored = null;
    try { stored = localStorage.getItem('spm-theme'); } catch (e) { /* storage blocked */ }
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
    updateThemeIcon();

    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      let next;
      if (current === 'dark') next = 'light';
      else if (current === 'light') next = 'dark';
      else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        next = prefersDark ? 'light' : 'dark';
      }
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('spm-theme', next); } catch (e) { /* storage blocked */ }
      updateThemeIcon();
    });

    function updateThemeIcon() {
      const current = document.documentElement.getAttribute('data-theme');
      const effectiveDark = current === 'dark' ||
        (current == null && window.matchMedia('(prefers-color-scheme: dark)').matches);

      if (effectiveDark) {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
        label.textContent = 'Gelap';
      } else {
        icon.innerHTML = '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>';
        label.textContent = 'Cerah';
      }
    }
  }

  // ── Calendar export button ───────────────────────────
  function initCalendarExport() {
    const btn = document.getElementById('exportIcs');
    if (!btn) return;
    btn.addEventListener('click', () => {
      try {
        downloadICS();
        const label = btn.querySelector('.export-label');
        if (label) {
          const original = label.textContent;
          label.textContent = '✓ Dimuat turun';
          btn.classList.add('export-done');
          setTimeout(() => {
            label.textContent = original;
            btn.classList.remove('export-done');
          }, 2500);
        }
      } catch (err) {
        console.error('Export .ics gagal:', err);
        alert('Maaf, muat turun gagal. Cuba refresh dan ulang.');
      }
    });
  }

  // ── Boot ─────────────────────────────────────────────
  function init() {
    if (!Object.keys(DATASETS).length) {
      console.error('EXAM_DATASETS tidak dimuatkan. Pastikan src/js/data.js dimuatkan dahulu.');
      return;
    }
    loadDataset(activeKey);
    initModeToggle();
    initTheme();
    initCalendarExport();
    renderAll();
    setInterval(tick, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
