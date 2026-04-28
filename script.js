/* ============================================================
   CLEARED FOR APPROACH — Pilot Prep Tracker
   app.js
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */

const PILLARS = [
  {
    id: 'discipline',
    emoji: '💪',
    name: 'Discipline & Fitness',
    sub: 'Physical readiness, routine consistency, mental resilience. Airlines test under stress — your body is part of the package.',
    color: '#00d4ff',
    taskGroup: 'discipline',
  },
  {
    id: 'knowledge',
    emoji: '🧠',
    name: 'Technical Knowledge',
    sub: 'ATPL theory kept sharp. System knowledge. Weather. Performance. Navigation. IFR procedures.',
    color: '#7dff5a',
    taskGroup: 'knowledge',
  },
  {
    id: 'crm',
    emoji: '🤝',
    name: 'CRM & Soft Skills',
    sub: 'Communication, leadership, assertiveness. Airlines care as much about crew resource management as flying skill.',
    color: '#ff5c1a',
    taskGroup: 'crm',
  },
  {
    id: 'research',
    emoji: '✈️',
    name: 'Airline Research',
    sub: 'Know Wizz Air (and others) deeply: fleet, routes, culture, news, business model. Recruiters love prepared candidates.',
    color: '#ffbe00',
    taskGroup: 'research',
  },
  {
    id: 'interview',
    emoji: '🎤',
    name: 'Interview Preparation',
    sub: 'STAR stories, HR questions, motivational answers. Your lack of hours must be offset by exceptional preparation.',
    color: '#c084fc',
    taskGroup: 'interview',
  },
  {
    id: 'network',
    emoji: '🌐',
    name: 'Network & Exposure',
    sub: 'LinkedIn, aviation forums, simulator sessions, air shows, events. Build your aviation identity early.',
    color: '#f472b6',
    taskGroup: 'network',
  },
];

const TASK_GROUPS = [
  {
    id: 'discipline',
    icon: '💪',
    title: 'Fitness & Discipline',
    tasks: [
      { id: 't1', text: 'Morning gym / training session completed', tag: 'daily' },
      { id: 't2', text: 'Sleep 7–9 hours (track if needed)', tag: 'daily' },
      { id: 't3', text: 'No alcohol / substances (EASA Class 1 medical standard)', tag: 'daily' },
      { id: 't4', text: 'Healthy nutrition — avoid heavy processed food', tag: 'daily' },
    ],
  },
  {
    id: 'knowledge',
    icon: '🧠',
    title: 'Technical Knowledge',
    tasks: [
      { id: 't5', text: 'Complete at least 20 ATPL practice questions', tag: 'daily' },
      { id: 't6', text: 'Review one aircraft system in depth (hydraulics, electrics, MEL…)', tag: 'daily' },
      { id: 't7', text: 'Study one IFR procedure or plate (SID / STAR / IAP)', tag: 'daily' },
      { id: 't8', text: 'Review one meteorology topic (METAR, TAF, icing, CB…)', tag: 'weekly' },
      { id: 't9', text: 'Read one AAIB / NTSB accident report & extract lessons', tag: 'weekly' },
    ],
  },
  {
    id: 'crm',
    icon: '🤝',
    title: 'CRM & Soft Skills',
    tasks: [
      { id: 't10', text: 'Read or watch something on CRM / human factors', tag: 'weekly' },
      { id: 't11', text: 'Practice one STAR-format answer out loud (record yourself)', tag: 'weekly' },
      { id: 't12', text: "Reflect on a team interaction — what went well, what didn't?", tag: 'weekly' },
      { id: 't13', text: 'Review the Dirty Dozen human factors in aviation', tag: 'ongoing' },
    ],
  },
  {
    id: 'research',
    icon: '✈️',
    title: 'Airline Research',
    tasks: [
      { id: 't14', text: 'Read Wizz Air news / press release / investor update', tag: 'weekly' },
      { id: 't15', text: 'Research one specific route or fleet expansion news', tag: 'weekly' },
      { id: 't16', text: 'Study A320 family overview (Wizz operates A320 / A321)', tag: 'ongoing' },
      { id: 't17', text: 'Compare Wizz vs Ryanair vs easyJet culture & model', tag: 'prep' },
    ],
  },
  {
    id: 'interview',
    icon: '🎤',
    title: 'Interview Preparation',
    tasks: [
      { id: 't18', text: 'Prepare or refine one new STAR story from real experience', tag: 'weekly' },
      { id: 't19', text: 'Practice "Why do you want to be a pilot?" out loud', tag: 'weekly' },
      { id: 't20', text: '"Why Wizz Air?" — research-backed answer, not generic', tag: 'prep' },
      { id: 't21', text: 'Review COMPASS / airline aptitude test prep (numerical / verbal)', tag: 'weekly' },
      { id: 't22', text: 'Mock interview with a friend or voice-record yourself', tag: 'weekly' },
    ],
  },
  {
    id: 'network',
    icon: '🌐',
    title: 'Network & Exposure',
    tasks: [
      { id: 't23', text: 'Post or engage on LinkedIn about your aviation journey', tag: 'weekly' },
      { id: 't24', text: 'Message one pilot or aviation professional on LinkedIn', tag: 'weekly' },
      { id: 't25', text: 'Read PPRuNe / aviation forums for insider knowledge', tag: 'weekly' },
      { id: 't26', text: 'Log any sim session, briefing, or aviation event attended', tag: 'ongoing' },
    ],
  },
];

const KNOWLEDGE_AREAS = [
  { id: 'k1',  label: 'Air Law & ATC Procedures',            color: '#00d4ff' },
  { id: 'k2',  label: 'Aircraft Systems (A320 family)',       color: '#7dff5a' },
  { id: 'k3',  label: 'IFR Procedures & Charts',             color: '#ff5c1a' },
  { id: 'k4',  label: 'Meteorology (practical)',              color: '#ffbe00' },
  { id: 'k5',  label: 'Performance & Mass & Balance',         color: '#c084fc' },
  { id: 'k6',  label: 'Navigation & Radio Nav',               color: '#f472b6' },
  { id: 'k7',  label: 'Human Performance & Limitations',      color: '#00d4ff' },
  { id: 'k8',  label: 'Flight Planning & Fuel',               color: '#7dff5a' },
  { id: 'k9',  label: 'CRM Theory',                          color: '#ff5c1a' },
  { id: 'k10', label: 'Airline Interview HR Topics',          color: '#ffbe00' },
  { id: 'k11', label: 'Wizz Air Company Knowledge',           color: '#c084fc' },
  { id: 'k12', label: 'Aptitude Test Skills (numerical/spatial)', color: '#f472b6' },
];

const INTERVIEW_QUESTIONS = [
  { q: 'Why do you want to be a commercial pilot?',                              cat: 'Motivation'      },
  { q: 'Why Wizz Air specifically — not another airline?',                       cat: 'Airline Research' },
  { q: 'Tell me about yourself in 2 minutes.',                                   cat: 'HR Classic'      },
  { q: 'Describe a time you made an error. How did you handle it?',              cat: 'STAR'            },
  { q: 'What does CRM mean to you in practice?',                                 cat: 'CRM'             },
  { q: 'How do you handle pressure and stress?',                                 cat: 'Resilience'      },
  { q: 'Tell me about a time you disagreed with someone in a team.',             cat: 'STAR'            },
  { q: 'What is your greatest weakness?',                                        cat: 'Self-Awareness'  },
  { q: 'Why should we hire you over candidates with more hours?',                cat: 'Key Question'    },
  { q: 'Where do you see yourself in 5–10 years?',                               cat: 'Career'          },
  { q: 'What non-aviation achievement are you most proud of?',                   cat: 'Character'       },
  { q: 'How do you stay current with aviation developments?',                    cat: 'Initiative'      },
];

const ROADMAP_PHASES = [
  {
    phase: 'Phase 1 — NOW',
    title: 'IFR Training + Foundation Building',
    desc: 'Complete IFR flight training. Simultaneously: daily ATPL revision, establish gym habit, start LinkedIn presence, begin airline research journal.',
    status: 'active',
  },
  {
    phase: 'Phase 2 — CPL & Instrument Rating',
    title: 'Obtain CPL/IR + Start Mock Interviews',
    desc: 'Pass CPL skills test. Begin structured mock interview practice. Record yourself on video answering HR questions. Research Wizz Air cadet pathways.',
    status: 'upcoming',
  },
  {
    phase: 'Phase 3 — Type Rating Prep',
    title: 'MCC / JOC + A320 Self-Study',
    desc: 'Complete Multi-Crew Cooperation course. Begin deep-dive into A320 systems. Build familiarity with FMS, ECAM, and automation philosophy.',
    status: 'upcoming',
  },
  {
    phase: 'Phase 4 — Application Ready',
    title: 'Polish CV, Logbook & Online Presence',
    desc: 'Professional aviation CV, clean EASA logbook, active LinkedIn. Three strong STAR stories prepared. Can confidently answer every question in the knowledge bank.',
    status: 'upcoming',
  },
  {
    phase: 'Phase 5 — Selection Process',
    title: 'Apply + COMPASS / ADAPT Aptitude Tests',
    desc: 'Submit applications. Prepare for online aptitude tests (numerical reasoning, spatial awareness, multi-tasking). Know what to expect at assessment day.',
    status: 'upcoming',
  },
  {
    phase: 'Phase 6 — Assessment Day',
    title: 'Interview, Sim Check & Medical',
    desc: 'HR interview + technical knowledge test + simulator assessment. Your preparation from Phase 1–5 pays off here. Stay calm, structured, and genuine.',
    status: 'upcoming',
  },
];

const INSIGHTS = [
  {
    title: 'The Age Narrative',
    desc: "At 18, your story IS your asset. You started early because you're serious. Frame it: 'I chose to invest in my foundations while building discipline and knowledge others develop later.'",
    color: '#00d4ff',
  },
  {
    title: 'CRM Over Hours',
    desc: 'Low-cost carriers like Wizz prioritize crew integration and automation management. A cadet who understands CRM deeply often outperforms a high-hour pilot in their assessment.',
    color: '#ff5c1a',
  },
  {
    title: 'Airline-Specific Prep',
    desc: "Generic 'I want to fly' answers fail. Know Wizz Air's fleet (A320ceo/neo/A321XLR), route network, ULCC model, and recent news. Specific knowledge = serious candidate.",
    color: '#ffbe00',
  },
  {
    title: 'The Gym Is Not Optional',
    desc: 'Airlines run medicals and long-haul rosters. Physical fitness signals self-management, discipline, and stress resilience — all qualities they screen for.',
    color: '#7dff5a',
  },
  {
    title: 'Build Your Story Bank',
    desc: 'Every flight lesson, every mistake, every team project is potential STAR interview material. Journal now so you\'re not fabricating under pressure in the interview room.',
    color: '#c084fc',
  },
  {
    title: 'Study the Accident Reports',
    desc: 'Knowing Tenerife, AF447, or Lion Air 610 in depth shows aviation maturity far beyond your age and hours. Recruiters are genuinely impressed by cadets who study failure.',
    color: '#f472b6',
  },
];

/* ══════════════════════════════════════════════════════════
   STATE — localStorage persistence
══════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'pilot_prep_v2';

let state = loadState();

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Could not load saved state:', e);
  }
  return {
    tasks:     {},
    scores:    {},
    journal:   [],
    streak:    {},
    roadmap:   {},
    startDate: new Date().toISOString(),
  };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save state:', e);
  }
}

/* ══════════════════════════════════════════════════════════
   RENDER — PILLARS
══════════════════════════════════════════════════════════ */

function renderPillars() {
  const grid = document.getElementById('pillar-grid');
  grid.innerHTML = PILLARS.map(pillar => {
    const group = TASK_GROUPS.find(g => g.id === pillar.taskGroup);
    const total = group ? group.tasks.length : 1;
    const done  = group ? group.tasks.filter(t => state.tasks[t.id]).length : 0;
    const pct   = Math.round((done / total) * 100);

    return `
      <div class="pillar-card"
           style="--card-color:${pillar.color}; --progress:${pct / 100}"
           onclick="showTab('tasks')">
        <div class="pillar-top">
          <div class="pillar-emoji">${pillar.emoji}</div>
          <div class="pillar-pct" style="background:${pillar.color}18; color:${pillar.color}">${pct}%</div>
        </div>
        <div class="pillar-name">${pillar.name}</div>
        <div class="pillar-sub">${pillar.sub}</div>
        <div class="pillar-bar">
          <div class="pillar-bar-fill" style="width:${pct}%; background:${pillar.color}"></div>
        </div>
      </div>`;
  }).join('');
}

/* ══════════════════════════════════════════════════════════
   RENDER — INSIGHTS
══════════════════════════════════════════════════════════ */

function renderInsights() {
  document.getElementById('insight-grid').innerHTML = INSIGHTS.map(i => `
    <div class="insight-card" style="--card-color:${i.color}">
      <h4>${i.title}</h4>
      <p>${i.desc}</p>
    </div>`
  ).join('');
}

/* ══════════════════════════════════════════════════════════
   RENDER — TASKS
══════════════════════════════════════════════════════════ */

function renderTasks() {
  document.getElementById('task-list-container').innerHTML = TASK_GROUPS.map(group => `
    <div class="task-section">
      <div class="task-section-header">
        <span>${group.icon}</span>
        <span>${group.title}</span>
      </div>
      ${group.tasks.map(task => {
        const done = !!state.tasks[task.id];
        return `
          <div class="task-item ${done ? 'done' : ''}" onclick="toggleTask('${task.id}')">
            <div class="task-check">${done ? '✓' : ''}</div>
            <div class="task-text">${task.text}</div>
            <div class="task-tag tag-${task.tag}">${task.tag}</div>
          </div>`;
      }).join('')}
    </div>`
  ).join('');
}

function toggleTask(id) {
  state.tasks[id] = !state.tasks[id];
  renderTasks();
  renderPillars();
  updateStats();
  saveState();
}

function saveTasks() {
  saveState();
  toast('Progress saved ✓');
}

function resetTasks() {
  if (!confirm('Reset all task checkboxes? Your journal and scores will stay.')) return;
  state.tasks = {};
  renderTasks();
  renderPillars();
  updateStats();
  saveState();
  toast('Tasks reset');
}

/* ══════════════════════════════════════════════════════════
   RENDER — KNOWLEDGE
══════════════════════════════════════════════════════════ */

function renderKnowledge() {
  // Confidence sliders
  document.getElementById('knowledge-scores').innerHTML = KNOWLEDGE_AREAS.map(area => {
    const val = state.scores[area.id] || 0;
    return `
      <div class="score-row">
        <div class="score-label">${area.label}</div>
        <input class="score-input" type="number" min="0" max="100" value="${val}"
               oninput="updateScore('${area.id}', this.value)">
        <div class="score-bar">
          <div class="score-fill" id="bar-${area.id}"
               style="width:${val}%; background:${area.color}"></div>
        </div>
      </div>`;
  }).join('');

  // Question bank
  const tagMap = { 'Key Question': 'prep', 'STAR': 'weekly' };
  document.getElementById('qbank').innerHTML =
    `<div class="task-section">` +
    INTERVIEW_QUESTIONS.map(q => {
      const tagClass = tagMap[q.cat] || 'daily';
      return `
        <div class="task-item" style="cursor:default">
          <div class="task-tag tag-${tagClass}" style="min-width:110px; text-align:center">${q.cat}</div>
          <div class="task-text">${q.q}</div>
        </div>`;
    }).join('') +
    `</div>`;
}

function updateScore(id, raw) {
  const val = Math.max(0, Math.min(100, parseInt(raw) || 0));
  state.scores[id] = val;
  const bar = document.getElementById('bar-' + id);
  if (bar) bar.style.width = val + '%';
}

function saveScores() {
  saveState();
  toast('Scores saved ✓');
}

/* ══════════════════════════════════════════════════════════
   RENDER — ROADMAP
══════════════════════════════════════════════════════════ */

function renderRoadmap() {
  document.getElementById('roadmap-items').innerHTML = ROADMAP_PHASES.map((phase, i) => {
    const done = !!state.roadmap['phase_' + i];
    const cls  = done ? 'done' : phase.status === 'active' ? 'active' : '';
    return `
      <div class="road-item ${cls}" onclick="togglePhase(${i})">
        <div class="road-dot"></div>
        <div class="road-phase">${phase.phase}</div>
        <div class="road-title">${phase.title}${done ? ' ✓' : ''}</div>
        <div class="road-desc">${phase.desc}</div>
      </div>`;
  }).join('');
}

function togglePhase(i) {
  state.roadmap['phase_' + i] = !state.roadmap['phase_' + i];
  renderRoadmap();
  saveState();
  toast(state.roadmap['phase_' + i] ? 'Phase marked complete 🎉' : 'Phase unmarked');
}

/* ══════════════════════════════════════════════════════════
   RENDER — JOURNAL
══════════════════════════════════════════════════════════ */

function renderJournal() {
  const el = document.getElementById('journal-entries');
  if (!state.journal.length) {
    el.innerHTML = '<div class="empty">No entries yet. Your stories are your interview gold — start logging.</div>';
    return;
  }
  el.innerHTML = state.journal
    .slice()
    .reverse()
    .map(entry => `
      <div class="log-entry">
        <div class="log-date">${entry.type.toUpperCase()} · ${entry.date}</div>
        ${entry.text}
      </div>`)
    .join('');
}

function addJournalEntry() {
  const text = document.getElementById('journal-text').value.trim();
  const type = document.getElementById('entry-type').value;
  if (!text) return;

  state.journal.push({
    text,
    type,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  });

  document.getElementById('journal-text').value = '';
  renderJournal();
  saveState();
  toast('Entry logged ✓');
}

/* ══════════════════════════════════════════════════════════
   RENDER — STREAK CALENDAR  (May → December 2026)
══════════════════════════════════════════════════════════ */

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function renderStreak() {
  const el      = document.getElementById('streak-calendar');
  const today   = new Date();
  const YEAR    = 2026;
  const MONTHS  = [4, 5, 6, 7, 8, 9, 10, 11]; // May–December

  el.innerHTML = MONTHS.map(mo => {
    const daysInMonth    = new Date(YEAR, mo + 1, 0).getDate();
    const isCurrentMonth = today.getFullYear() === YEAR && today.getMonth() === mo;
    const todayDay       = today.getDate();

    const cells = Array.from({ length: daysInMonth }, (_, i) => {
      const day  = i + 1;
      const key  = `${YEAR}-${mo}-${day}`;
      const val  = state.streak[key] || 0;

      const isFuture =
        YEAR > today.getFullYear() ||
        (YEAR === today.getFullYear() && mo > today.getMonth()) ||
        (isCurrentMonth && day > todayDay);

      const isToday = isCurrentMonth && day === todayDay;

      const classes = [
        'streak-day',
        val === 2 ? 'filled'   : '',
        val === 1 ? 'partial'  : '',
        isFuture  ? 'future'   : '',
        isToday   ? 'today-dot': '',
      ].filter(Boolean).join(' ');

      const clickAttr = isFuture ? '' : `onclick="cycleStreak('${key}')"`;

      return `<div class="${classes}" ${clickAttr} title="${MONTH_NAMES[mo]} ${day}"></div>`;
    }).join('');

    const labelStyle = isCurrentMonth ? 'color:var(--accent); font-weight:600' : '';

    return `
      <div class="streak-row">
        <span class="streak-month" style="${labelStyle}">${MONTH_NAMES[mo]}</span>
        <div class="streak-days">${cells}</div>
      </div>`;
  }).join('');
}

function cycleStreak(key) {
  state.streak[key] = ((state.streak[key] || 0) + 1) % 3;
  renderStreak();
  updateStats();
  saveState();
}

/* ══════════════════════════════════════════════════════════
   STATS BAR
══════════════════════════════════════════════════════════ */

function updateStats() {
  const allTasks  = TASK_GROUPS.flatMap(g => g.tasks);
  const doneCount = allTasks.filter(t => state.tasks[t.id]).length;

  const avgScore  = KNOWLEDGE_AREAS.reduce((sum, k) => sum + (state.scores[k.id] || 0), 0)
                    / KNOWLEDGE_AREAS.length;
  const taskPct   = (doneCount / allTasks.length) * 100;
  const overall   = Math.round((avgScore + taskPct) / 2);

  const streakDays = Object.values(state.streak).filter(v => v === 2).length;

  const startDate  = new Date(state.startDate);
  const weeksActive = Math.max(1, Math.floor((Date.now() - startDate) / (7 * 24 * 3600 * 1000)));

  document.getElementById('stat-days').textContent    = streakDays;
  document.getElementById('stat-tasks').textContent   = doneCount;
  document.getElementById('stat-overall').textContent = overall + '%';
  document.getElementById('stat-weeks').textContent   = weeksActive;
}

/* ══════════════════════════════════════════════════════════
   TABS
══════════════════════════════════════════════════════════ */

const TAB_IDS = ['overview', 'tasks', 'knowledge', 'roadmap', 'journal', 'streak'];

function showTab(id) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById('tab-' + id)?.classList.add('active');

  const idx = TAB_IDS.indexOf(id);
  document.querySelectorAll('.tab-btn')[idx]?.classList.add('active');
}

/* ══════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════ */

let toastTimer = null;

function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

/* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */

(function init() {
  renderPillars();
  renderInsights();
  renderTasks();
  renderKnowledge();
  renderRoadmap();
  renderJournal();
  renderStreak();
  updateStats();
})();
