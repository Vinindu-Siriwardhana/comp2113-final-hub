/* COMP2113 Final Hub — rendering and interaction. No dependencies. */
(function () {
'use strict';
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const norm = s => String(s).replace(/\s+/g, ' ').trim();
const MOD = Object.fromEntries(TOPICS.map(t => [t.id, t]));
const modTag = m => `<span class="tag">M${MOD[m].n} ${esc(MOD[m].title.split(/,| and /)[0])}</span>`;

/* ---------- saved state ---------- */
const KEY = 'c2113';
const EXAM = '2026-12-14';
let S = { m: {}, q: {}, plan: {}, ext: {}, date: EXAM, theme: '', mocks: [] };
try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

/* ---------- question registry ---------- */
const Q = {};
MCQ.forEach(q => Q[q.id] = Object.assign({ type: 'mcq' }, q));
TRACE.forEach(q => Q[q.id] = Object.assign({ type: 'trace', q: 'Write down the output of the following code segment.' }, q));
SHORT.forEach(q => Q[q.id] = Object.assign({ type: 'short' }, q));
PROG.forEach(q => Q[q.id] = Object.assign({ type: 'prog' }, q));
PAPERS.forEach(p => p.sections.forEach(s => s.items.forEach(it => {
  it.id = p.id + '-' + it.n.replace(/\W/g, '');
  Q[it.id] = Object.assign({ type: it.opts ? 'mcq' : it.out ? 'trace' : 'short', label: it.n, paper: true }, it);
})));
const DQ = {};
Object.entries(window.DRILL || {}).forEach(([m, rows]) => {
  DQ[m] = rows.map((r, i) => {
    const id = 'd-' + m + '-' + i;
    const clang = r[5] && r[5] !== 'run' ? r[5] : 'cpp';
    return Q[id] = { type: 'mcq', id, m, q: r[0], opts: r[1], a: r[2], why: r[3], code: r[4], clang };
  });
});
(window.CHECKPOINTS || []).forEach(cp => cp.twins.forEach(t => { Q[t.id] = Object.assign({ label: 'Twin' }, t); }));
const XSET = Object.fromEntries((window.XSETS || []).map(s => [s.id, s]));
(window.XSETS || []).forEach(s => s.qs.forEach(q => {
  Q[q.id] = Object.assign(q.type === 'trace' ? { q: 'Write down the exact output of this program.' } : {}, q);
}));

/* ---------- exam scope: Git, GDB and C++ classes are not examined in 2026 ---------- */
const OUT = new Map(Object.entries(window.OUT_OF_SCOPE || {}).flatMap(([why, ids]) => ids.map(id => [id, why])));
const OUT_NAME = { git: 'Git', gdb: 'GDB', class: 'C++ classes' };
const live = x => S.showOut || !OUT.has(x.id);
const hiddenNote = arr => {
  const n = arr.filter(x => OUT.has(x.id)).length;
  if (!n) return '';
  return `<p class="small muted scope-note">${S.showOut ? `Showing ${n} not-examined item${n > 1 ? 's' : ''} (marked "Not examined").`
    : `${n} item${n > 1 ? 's' : ''} on ${[...new Set(arr.filter(x => OUT.has(x.id)).map(x => OUT_NAME[OUT.get(x.id)]))].join(', ')} hidden: not examined this year.`}
    <button class="btn sm" data-act="scope">${S.showOut ? 'Hide them' : 'Show them'}</button></p>`;
};
const ui = {};                                   // transient per-question state
const U = id => ui[id] || (ui[id] = {});

/* ---------- syntax highlighting ---------- */
const KW = {
  cpp: 'int|double|float|char|bool|void|string|const|if|else|for|while|do|return|struct|class|public|private|new|delete|NULL|true|false|switch|case|break|continue|default|using|namespace|typedef|sizeof|long|unsigned',
  sh: 'if|then|else|elif|fi|for|in|do|done|echo|read|let|exit'
};
function hl(code, lang) {
  if (lang === 'text') return esc(code);
  const sh = lang === 'sh' || lang === 'make';
  const re = sh
    ? new RegExp(`((?:^|(?<=\\s))#[^\\n]*)|("(?:\\\\.|[^"\\\\\\n])*"|'[^'\\n]*')|\\b(${lang === 'sh' ? KW.sh : 'PHONY'})\\b|()`, 'gm')
    : new RegExp(`(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)|("(?:\\\\.|[^"\\\\\\n])*"|'(?:\\\\.|[^'\\\\\\n])*')|\\b(${KW.cpp})\\b|\\b(\\d+(?:\\.\\d+)?)\\b`, 'g');
  let out = '', last = 0, m;
  while ((m = re.exec(code))) {
    if (m[0] === '') { re.lastIndex++; continue; }
    out += esc(code.slice(last, m.index));
    const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : 'n';
    out += `<span class="${cls}">${esc(m[0])}</span>`;
    last = re.lastIndex;
  }
  return out + esc(code.slice(last));
}
const pre = (code, lang) => `<pre><code style="all:unset">${hl(code, lang || 'cpp')}</code></pre>`;

/* ---------- routing ---------- */
const TABS = ['plan', 'types', 'topics', 'cheats', 'practice', 'drill', 'checkpoints', 'papers', 'answers', 'mock', 'external', 'sheet'];
let route = { tab: 'plan', args: [] };
function parseHash() {
  const p = decodeURIComponent(location.hash.slice(1)).split(':');
  route = TABS.includes(p[0]) ? { tab: p[0], args: p.slice(1) } : { tab: 'plan', args: [] };
}
const go = target => { location.hash = target; };

/* ---------- progress ---------- */
const count = (arr, ok) => arr.filter(ok).length;
function progress() {
  const cards = TOPICS.flatMap(t => t.cards).filter(live);
  const tasks = PLAN.flatMap(s => s.tasks);
  const mcq = MCQ.filter(live), trace = TRACE.filter(live), written = [...SHORT, ...PROG].filter(live);
  const qs = [...mcq, ...trace, ...written];
  return {
    cards: [count(cards, c => S.m[c.id]), cards.length],
    tasks: [count(tasks, t => S.plan[t.id]), tasks.length],
    mcq: [count(mcq, q => S.q[q.id] === 'ok'), mcq.length],
    trace: [count(trace, q => S.q[q.id] === 'ok'), trace.length],
    written: [count(written, q => S.q[q.id] === 'ok'), written.length],
    all: [count(cards, c => S.m[c.id]) + count(qs, q => S.q[q.id] === 'ok'), cards.length + qs.length],
  };
}
const pct = ([a, b]) => b ? Math.round(a / b * 100) : 0;
const dayMs = 86400000;
const today0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
function daysLeft() {
  if (!S.date) return null;
  const d = new Date(S.date + 'T00:00:00');
  return isNaN(d) ? null : Math.round((d - today0()) / dayMs);
}
function header() {
  const p = progress(), d = daysLeft();
  $('#overallBar').style.width = pct(p.all) + '%';
  $('#overallTxt').textContent = `${pct(p.all)}% of notes and questions mastered`;
  $('#count').innerHTML = d === null ? 'Set your exam date<small>and the plan will be scheduled for you</small>'
    : d > 1 ? `${d} days to go<small>until the COMP2113 final</small>`
    : d === 1 ? 'Exam is tomorrow<small>light review, then sleep</small>'
    : d === 0 ? 'Exam day<small>read every question twice</small>' : 'Exam date has passed<small>set a new date to reschedule</small>';
  $('#examDate').value = S.date || '';
  document.querySelectorAll('#tabs [data-tab]').forEach(b => b.classList.toggle('on', b.dataset.tab === route.tab));
}

/* ---------- question rendering ---------- */
const statusTag = id => S.q[id] === 'ok' ? '<span class="tag ok">Correct</span>' : S.q[id] === 'bad' ? '<span class="tag bad">Review</span>' : '';
const isCodey = s => /[;{}|$=]|^\w+ -|^(wc|sort|cat|git|chmod|rm|rmdir|ls|find|grep|cut|sh|cpio|copy|print|echo|help|man|len|strlen|getSize|length|delete|free)\b|\(\)|^-/.test(s);

function qHead(q, num) {
  const label = num || q.label || '';
  const kind = (q.kind ? `<span class="tag exam">${esc(q.kind)}</span>` : '') + (OUT.has(q.id) ? '<span class="tag bad">Not examined</span>' : '');
  return `<div class="q-top">${label ? `<span class="num">${esc(label)}</span>` : ''}${modTag(q.m)}${kind}${statusTag(q.id)}
    ${q.marks ? `<span class="marks">${q.marks} marks</span>` : ''}</div>
    ${q.title ? `<h3 style="font-size:1.02rem;margin-bottom:4px">${esc(q.title)}</h3>` : ''}
    <div class="q-text">${q.q}</div>`;
}
function renderQ(id, num) {
  const q = Q[id], u = U(id);
  let body = '';
  if (q.type === 'mcq') {
    const done = u.picked != null;
    body = (q.code ? pre(q.code, q.clang) : '') + '<div class="opts">' + q.opts.map((o, i) => {
      const cls = done ? (i === q.a ? ' right' : i === u.picked ? ' wrong' : '') : '';
      return `<button class="opt${isCodey(o) ? ' mono' : ''}${cls}" data-act="pick" data-i="${i}" ${done ? 'disabled' : ''}><b>${'ABCD'[i]}</b><span>${esc(o)}</span></button>`;
    }).join('') + '</div>';
    if (done) body += `<div class="explain ${u.picked === q.a ? 'ok' : 'bad'}"><b>${u.picked === q.a ? 'Correct.' : 'Answer: ' + 'ABCD'[q.a] + '.'}</b> ${q.why}
      <button class="btn sm" data-act="retry" style="margin-left:8px">Try again</button></div>`;
  } else if (q.type === 'trace') {
    body = pre(q.code, q.codeLang) + `<div class="row"><input class="ans-in" data-in="${id}" placeholder="Type the exact output" value="${esc(u.typed || '')}" autocomplete="off" spellcheck="false">
      <button class="btn pri" data-act="check">Check</button><button class="btn" data-act="reveal">Show answer</button></div>`;
    if (u.result) body += `<div class="explain ${u.result}"><b>${u.result === 'ok' ? 'Correct.' : 'Not quite.'}</b> ${u.result === 'ok' || u.revealed ? '' : 'Trace it again line by line, or show the answer.'}</div>`;
    if (u.revealed || u.result === 'ok') body += `<div class="explain"><b>Output:</b> <code>${esc(q.out)}</code><br>${q.why}</div>`;
  } else {
    body = (q.code ? pre(q.code, q.codeLang || (q.lang === 'sh' ? 'cpp' : q.lang)) : '') + (q.given ? `<p class="small muted" style="margin-top:8px">Given:</p>${pre(q.given)}` : '');
    if (!u.revealed) body += `<div class="row" style="margin-top:10px"><button class="btn pri" data-act="reveal">Reveal answer</button><span class="small muted">Write yours on paper first.</span></div>`;
    else body += `<p class="small muted" style="margin-top:10px">Model answer:</p>${pre(q.ans || q.sol, q.lang)}
      ${q.why ? `<div class="explain">${q.why}</div>` : ''}${q.notes ? `<ul class="notes">${q.notes.map(n => `<li>${n}</li>`).join('')}</ul>` : ''}
      <div class="row" style="margin-top:10px"><span class="small muted">Mark yourself honestly:</span>
      <button class="btn sm" data-act="self" data-v="ok">I got it right</button><button class="btn sm" data-act="self" data-v="bad">I missed something</button>
      <button class="btn sm" data-act="hide">Hide</button></div>`;
  }
  return `<article class="card q" id="q-${id}" data-q="${id}">${qHead(q, num)}${body}</article>`;
}
function rerenderQ(id) {
  const el = document.getElementById('q-' + id);
  if (!el) return;
  const num = el.dataset.num || '';
  el.outerHTML = renderQ(id, num);
  if (num) document.getElementById('q-' + id).dataset.num = num;
  header();
}

/* ---------- tab: study plan ---------- */
function schedule() {
  const d = daysLeft(), open = PLAN.filter(s => !s.tasks.every(t => S.plan[t.id]));
  const map = {};
  if (d === null || d < 1) return map;
  open.forEach((s, i) => { map[s.id] = Math.floor(i * d / open.length); });
  return map;
}
const fmtDay = off => off === 0 ? 'Today' : off === 1 ? 'Tomorrow'
  : new Date(+today0() + off * dayMs).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
function viewPlan() {
  const p = progress(), d = daysLeft(), sch = schedule();
  const hoursLeft = PLAN.filter(s => !s.tasks.every(t => S.plan[t.id])).reduce((n, s) => n + s.hours, 0);
  const best = S.mocks.length ? Math.max(...S.mocks.map(m => m.score)) : null;
  const stat = (label, v, okBar) => `<div class="stat"><b>${v[0]} / ${v[1]}</b><span>${label}</span><div class="bar${okBar ? ' ok' : ''}"><i style="width:${pct(v)}%"></i></div></div>`;
  let pace = `${PLAN.length} sessions, about ${PLAN.reduce((n, s) => n + s.hours, 0)} hours in total. Set your exam date above and each session gets a day.`;
  if (d !== null && d >= 1) pace = hoursLeft ? `${hoursLeft} hours of sessions left over ${d} day${d > 1 ? 's' : ''}: about ${(hoursLeft / d).toFixed(1)} hours a day.` : 'Every session is done. Keep sitting mock exams until the day.';
  let h = `<div class="sec-head"><h2>Your plan to the exam</h2><span class="meta">${p.tasks[0]} of ${p.tasks[1]} tasks done</span></div>
    <p class="lead">${pace} The order is fixed on purpose: diagnose first, then one module per session, then timed papers. Hand-write every answer before you check it, because the exam is on paper.</p>
    <div class="stats">${stat('Topic cards mastered', p.cards, true)}${stat('MCQs correct', p.mcq)}${stat('Outputs traced correctly', p.trace)}${stat('Written answers right', p.written)}
      <div class="stat"><b>${best === null ? 'None yet' : best + ' / 100'}</b><span>Best mock exam</span><div class="bar ok"><i style="width:${best || 0}%"></i></div></div></div>`;
  let phase = '', nextMarked = false;
  PLAN.forEach((s, i) => {
    if (s.phase !== phase) { phase = s.phase; h += `<div class="phase">${esc(phase)}</div>`; }
    const done = s.tasks.every(t => S.plan[t.id]);
    const isNext = !done && !nextMarked; if (isNext) nextMarked = true;
    const when = done ? '<span class="tag ok">Done</span>' : (s.id in sch ? esc(fmtDay(sch[s.id])) + ' · ' : '') + `about ${s.hours} h`;
    h += `<section class="card${isNext ? ' today' : ''}" style="margin-bottom:12px">
      <div class="sess-top"><span class="tag">Session ${i + 1}</span><h3>${esc(s.title)}</h3>${isNext ? '<span class="tag exam">Next up</span>' : ''}<span class="when">${when}</span></div>
      <p class="why">${esc(s.why)}</p><ul class="tasks">${s.tasks.map(t => `<li class="${S.plan[t.id] ? 'done' : ''}">
        <input type="checkbox" id="pt-${t.id}" data-task="${t.id}" ${S.plan[t.id] ? 'checked' : ''}><label for="pt-${t.id}">${esc(t.t)}</label>
        ${t.go ? `<button class="go" data-go="${t.go}">Open</button>` : ''}</li>`).join('')}</ul></section>`;
  });
  return h;
}

/* ---------- tab: exam format ---------- */
function viewTypes() {
  const max = Math.max(...WEIGHTS.flatMap(w => [w.marks, w.marks22]));
  const types = [
    ['Multiple choice (Section A)', 'practice:mcq', ['Cover the options and answer in your head first.', 'For "which cannot / except" questions, test each option with a concrete value.', 'Linux questions are recall: flag letters matter (-l, -n, -r, -d, -f). Put the flags on your A4 sheet.', 'About 1.5 minutes each. A wrong answer costs 1 mark: leave it blank unless you can rule out two options.']],
    ['Write down the output', 'practice:trace', ['Make a table: one column per variable, one row per line executed.', 'Draw boxes and arrows for every pointer. Label which array element each pointer is on.', 'A new { } block or a function call means a new set of variables. Mark them separately.', 'Copy spaces exactly: <code>cout &lt;&lt; a &lt;&lt; " "</code> leaves a trailing space.']],
    ['One command or pipe', 'practice:short:m1', ['Split the task sentence into steps. Each step is one command.', 'Join with <code>|</code>. Only the first command names the input file.', 'Check the delimiter flag: <code>cut -d</code>, <code>sort -t</code>.']],
    ['Single C++ statement', 'practice:short:m3', ['Try it on a small example on scratch paper (x = 1234).', 'Use <code>/ 10</code> to drop digits and <code>% 10</code> to keep them.', 'End with a semicolon. Declare the type only if the question has not.']],
    ['Fix the bug', 'practice:short:m8', ['Compare actual output with expected output: that tells you which line is wrong.', 'Usual suspects: <code>=</code> for <code>==</code>, int for double, off-by-one, missing <code>&amp;</code> or <code>*</code>, <code>delete</code> for <code>delete []</code>, <code>!eof()</code> loops.', 'Answer in the form "line N: corrected code". Change only what you were allowed to.']],
    ['Write a function or program (Section C)', 'practice:prog', ['Copy the function header exactly as given.', 'List the cases before coding: empty, one element, general.', 'Write the loop skeleton first, then fill in the body.', 'Dry-run your answer on the example in the question before moving on.']],
    ['Makefile', 'practice:prog:m4', ['Draw the dependency graph from the #include lines.', 'One rule for the executable (first), one per .o file.', 'Each .o depends on its source file and every header that source includes, directly or through another header.', 'Mark the tab clearly.']],
    ['Shell script', 'practice:prog:m2', ['Start with <code>#!/bin/bash</code>.', 'Spaces: none around <code>=</code>, always inside <code>[ ]</code>.', 'Close every <code>if</code> with <code>fi</code> and every <code>do</code> with <code>done</code>.', 'Quote variables in tests: <code>[ "$a" == "x" ]</code>.']],
  ];
  return `<div class="sec-head"><h2>How the exam works</h2><span class="meta">from Dr Chim's announcement for the 2026 final</span></div>
  <div class="grid2">
    <section class="card"><table class="plain"><tr><th>Section</th><th>What</th><th>Marks</th><th>Time budget</th></tr>
      <tr><td>A</td><td>15 multiple choice: <b>+2 right, −1 wrong</b>, 0 blank</td><td>30</td><td>25 min</td></tr>
      <tr><td>B</td><td>8 short questions: trace C++ / C / shell scripts, write Linux commands</td><td>30</td><td>35 min</td></tr>
      <tr><td>C</td><td>3 long questions, 10 to 20 marks each: trace C++, implement short C++ functions, separate compilation</td><td>40</td><td>50 min</td></tr>
      <tr><td></td><td>Checking</td><td></td><td>10 min</td></tr></table>
      <p class="small muted" style="margin-top:10px">2 hours for 100 marks is 1.2 minutes per mark. Section C has 3 questions this year (both past finals had 2), so do not spend more than about 20 minutes on any one of them.</p></section>
    <section class="card"><h3 style="font-size:1.02rem;margin-bottom:6px">The rules this year</h3>
      <ul class="steps"><li><b>Mon 14 Dec 2026, 09:30 to 11:30</b>, written exam in the Main Building: Loke Yew Hall, MB103, MB167 or MB201. Check your seat number for which room.</li>
      <li><b>One A4 sheet of notes, both sides</b>, printed or written, and a <b>calculator</b> are allowed. Use the A4 sheet tab to build your sheet.</li>
      <li><b>Scope: Modules 1 to 10, except Git commands, C++ classes and the GDB debugger.</b> Questions on those are hidden across the hub; structs (including struct member functions) are still examined.</li>
      <li><b>Modules 9 (STL) and 10 (C) are only 12 marks in total, all in Sections A and B.</b> Learn to read and trace them; Section C will not ask you to write STL or C.</li>
      <li>Dr Chim posted the "Revision Questions" set for this final: it is the paper called Revision Questions in the Past papers tab.</li>
      <li>Questions come back: 2021-22 reused 2019-20 A5, A10, A11 and A13 almost word for word, B1 and B2 have the same shape with new numbers, and both C1s ask for an iterative and a recursive version of the same function.</li></ul></section>
  </div>
  <div class="sec-head"><h2>Section A: when to guess</h2><span class="meta">a wrong answer costs 1 mark</span></div>
  <section class="card"><table class="plain"><tr><th>Options you can rule out</th><th>Chance a guess is right</th><th>Average marks from guessing</th><th>What to do</th></tr>
    <tr><td>None (4 left)</td><td>1 in 4</td><td>−0.25</td><td><b>Leave it blank</b></td></tr>
    <tr><td>One (3 left)</td><td>1 in 3</td><td>0</td><td>Break-even: answer only if you lean towards one</td></tr>
    <tr><td>Two (2 left)</td><td>1 in 2</td><td>+0.5</td><td><b>Answer it</b></td></tr></table>
    <p class="small muted" style="margin-top:10px">Average marks = 2 × (chance right) − 1 × (chance wrong). The mock exam marks Section A the same way.</p></section>
  <div class="sec-head"><h2>Where the marks were</h2><span class="meta">marks per module out of 100</span></div>
  <section class="card"><div class="wlegend small muted"><span><i class="k1"></i>2019-20</span><span><i class="k2"></i>2021-22</span></div>
    ${WEIGHTS.map(w => `<div class="wbar"><span>M${MOD[w.m].n} ${esc(MOD[w.m].title.split(/,| and /)[0])}</span>
      <div class="bars"><div class="bar"><i style="width:${w.marks / max * 100}%"></i></div><div class="bar b2"><i style="width:${w.marks22 / max * 100}%"></i></div></div>
      <span class="v">${w.marks}<br>${w.marks22}</span><small>${esc(w.where)}</small></div>`).join('')}
    <p class="small muted" style="margin-top:10px">Functions and recursion plus pointers and linked lists carried 61 marks in 2019-20 and 57 in 2021-22, and every Section C question so far comes from those two modules. Linux commands were a steady 14 marks both years. This year Section C also names separate compilation (Module 4), which past finals gave only 2 marks, so expect a long Makefile / header question. File I/O scored zero both years but has a full question in the revision set. STL and C are capped at 12 marks together this year.</p></section>
  <div class="sec-head"><h2>Question types and how to attack them</h2></div>
  <div class="grid2">${types.map(([t, g, steps]) => `<section class="card"><div class="row"><h3 style="font-size:1.02rem;flex:1">${t}</h3><button class="go" data-go="${g}">Practise</button></div>
    <ol class="steps">${steps.map(s => `<li>${s}</li>`).join('')}</ol></section>`).join('')}</div>
  <div class="sec-head"><h2>Where full marks are usually lost</h2></div>
  <section class="card"><ul class="steps">
    <li>A linked-list function that works for the general case but crashes on an empty list or a single node.</li>
    <li>Missing <code>return</code> in front of a recursive call, or no base case.</li>
    <li>Integer division where a fraction was needed.</li>
    <li>Forgetting <code>&amp;</code> on a parameter that must change, or on a <code>scanf</code> argument.</li>
    <li>Output with the wrong spacing or a missing newline in tracing questions.</li>
    <li>Shell tests without spaces, or <code>=</code> with spaces.</li>
    <li>Running out of time on Section C. Start it with at least 50 minutes left.</li></ul></section>`;
}

/* ---------- tab: topics ---------- */
function viewTopics() {
  const [mod = 'all', flag = ''] = route.args;
  const term = (U('search').v || '').toLowerCase();
  let h = `<div class="sec-head"><h2>Topic notes</h2><span class="meta">${progress().cards[0]} of ${progress().cards[1]} cards mastered</span></div>
    <div class="chips"><button class="chip${mod === 'all' ? ' on' : ''}" data-go="topics:all:${flag}">All</button>
    ${TOPICS.map(t => `<button class="chip${mod === t.id ? ' on' : ''}" data-go="topics:${t.id}:${flag}">M${t.n}<span class="n">${count(t.cards, c => S.m[c.id])}/${t.cards.length}</span></button>`).join('')}</div>
    <div class="row" style="margin-bottom:6px"><button class="chip${flag === 'pp' ? ' on' : ''}" data-go="topics:${mod}:${flag === 'pp' ? '' : 'pp'}">Past-paper hits</button>
    <button class="chip${flag === 'todo' ? ' on' : ''}" data-go="topics:${mod}:${flag === 'todo' ? '' : 'todo'}">Not mastered</button>
    <input class="search" id="search" type="search" placeholder="Search notes, e.g. strcmp" value="${esc(U('search').v || '')}"></div>`;
  h += hiddenNote(TOPICS.filter(t => term || mod === 'all' || t.id === mod).flatMap(t => t.cards));
  let shown = 0;
  TOPICS.filter(t => term || mod === 'all' || t.id === mod).forEach(t => {
    const cards = t.cards.filter(c => live(c) && (flag !== 'pp' || c.pp) && (flag !== 'todo' || !S.m[c.id])
      && (!term || (c.t + ' ' + c.code + ' ' + c.pts.join(' ') + ' ' + c.trap).toLowerCase().includes(term)));
    if (!cards.length) return;
    shown += cards.length;
    h += `<div class="mod-head"><span class="num">${t.n}</span><div><h2>${esc(t.title)}</h2><p class="small muted">${esc(t.blurb)}</p></div>
      <button class="go" style="margin-left:auto" data-go="practice:mcq:${t.id}">Practise</button></div><div class="stack">` +
      cards.map(c => `<article class="card tcard" id="c-${c.id}"><h3>${esc(c.t)}${c.pp ? `<span class="tag exam">${esc(c.pp)}</span>` : ''}${OUT.has(c.id) ? '<span class="tag bad">Not examined</span>' : ''}
        <button class="master${S.m[c.id] ? ' on' : ''}" data-master="${c.id}">${S.m[c.id] ? 'Mastered' : 'Mark mastered'}</button></h3>
        ${pre(c.code, c.lang)}<ul>${c.pts.map(p => `<li>${p}</li>`).join('')}</ul><div class="trap"><b>Exam trap.</b> ${c.trap}</div></article>`).join('') + '</div>';
  });
  if (!shown) h += '<p class="lead" style="margin-top:20px">No cards match these filters.</p>';
  return h;
}

/* ---------- tab: practice ---------- */
const KINDS = { mcq: ['Multiple choice', MCQ], trace: ['Write the output', TRACE], short: ['Short answers', SHORT], prog: ['Programming', PROG] };
function viewPractice() {
  const [kind = 'mcq', mod = 'all', flag = ''] = route.args;
  const k = KINDS[kind] ? kind : 'mcq', all = KINDS[k][1], list = all.filter(live);
  const items = list.filter(q => (mod === 'all' || q.m === mod) && (flag !== 'todo' || S.q[q.id] !== 'ok'));
  const mods = TOPICS.filter(t => list.some(q => q.m === t.id));
  return `<div class="sec-head"><h2>Practice</h2><span class="meta">${[...MCQ, ...TRACE, ...SHORT, ...PROG].filter(live).length} questions in the style of Sections A, B and C</span></div>
    <div class="chips">${Object.entries(KINDS).map(([id, [name, arr]]) => `<button class="chip${k === id ? ' on' : ''}" data-go="practice:${id}:all:${flag}">${name}<span class="n">${count(arr.filter(live), q => S.q[q.id] === 'ok')}/${arr.filter(live).length}</span></button>`).join('')}</div>
    ${hiddenNote(all.filter(q => mod === 'all' || q.m === mod))}
    <div class="chips"><button class="chip${mod === 'all' ? ' on' : ''}" data-go="practice:${k}:all:${flag}">All modules</button>
      ${mods.map(t => `<button class="chip${mod === t.id ? ' on' : ''}" data-go="practice:${k}:${t.id}:${flag}">M${t.n}</button>`).join('')}
      <button class="chip${flag === 'todo' ? ' on' : ''}" data-go="practice:${k}:${mod}:${flag === 'todo' ? '' : 'todo'}">Wrong or not done</button></div>
    <p class="lead">${{ mcq: 'Pick an option to see the answer and the reason.', trace: 'Work the output out on paper, type it, then check. Every expected output here was produced by compiling and running the code.',
      short: 'Write your answer on paper, reveal the model answer, then mark yourself.', prog: 'Section C style, 10 marks each. Give yourself 12 minutes per question, hand-written.' }[k]}</p>
    <div class="stack">${items.length ? items.map((q, i) => renderQ(q.id, String(i + 1))).join('') : '<p class="lead">Nothing left here. Clear the filter to see everything.</p>'}</div>`;
}

/* ---------- tab: lesson drills ---------- */
function viewDrill() {
  const mods = TOPICS.filter(t => DQ[t.id]);
  const [mod = mods[0].id, flag = ''] = route.args;
  const full = DQ[mod] || DQ[mods[0].id], list = full.filter(live);
  const done = count(list, q => S.q[q.id] === 'ok');
  const items = list.filter(q => flag !== 'todo' || S.q[q.id] !== 'ok');
  const total = mods.reduce((n, t) => n + DQ[t.id].filter(live).length, 0);
  return `<div class="sec-head"><h2>Lesson drills</h2><span class="meta">${total} detail questions written from the lecture notes</span></div>
    <p class="lead">One long quiz per lesson, covering the notes line by line, including the small facts. Work through a lesson until every question is correct, then use "Wrong or not done" to repeat the ones you missed.</p>
    <div class="chips">${mods.map(t => `<button class="chip${mod === t.id ? ' on' : ''}" data-go="drill:${t.id}:${flag}">M${t.n}<span class="n">${count(DQ[t.id].filter(live), q => S.q[q.id] === 'ok')}/${DQ[t.id].filter(live).length}</span></button>`).join('')}
      <button class="chip${flag === 'todo' ? ' on' : ''}" data-go="drill:${mod}:${flag === 'todo' ? '' : 'todo'}">Wrong or not done</button></div>
    <div class="mod-head"><span class="num">${MOD[mod].n}</span><div><h2>${esc(MOD[mod].title)}</h2><p class="small muted">${done} of ${list.length} correct</p></div></div>
    ${hiddenNote(full)}
    <div class="bar ok" style="margin-bottom:14px"><i style="width:${pct([done, list.length])}%"></i></div>
    <div class="stack">${items.length ? items.map((q, i) => renderQ(q.id, String(i + 1))).join('') : '<p class="lead">All correct in this lesson. Clear the filter to see every question.</p>'}</div>`;
}

/* ---------- tab: checkpoints ---------- */
function viewCheckpoints() {
  const list = window.CHECKPOINTS || [];
  const cp = list.find(c => c.m === route.args[0]) || list[0];
  const twinsDone = c => count(c.twins.filter(live), t => S.q[t.id] === 'ok');
  const rows = cp.items.map(it => `<tr><td><b>${esc(it.n)}</b></td><td>${it.task}</td><td>${it.skill}</td>
    <td><details><summary>Show hint</summary>${it.hint}</details></td></tr>`).join('');
  return `<div class="sec-head"><h2>Checkpoint exercises</h2><span class="meta">every checkpoint from Modules 0 to 10</span></div>
    <p class="lead">The checkpoints are graded coursework (due 30 November), so this page does not give their answers. For each one it says what it asks, which exam skill it trains, and a hint. Underneath, <b>twin questions</b> test the same skills with new code and data, and those have full worked answers. Every twin program and output was compiled and run.</p>
    <div class="chips">${list.map(c => `<button class="chip${c === cp ? ' on' : ''}" data-go="checkpoints:${c.m}">M${MOD[c.m].n}<span class="n">${twinsDone(c)}/${c.twins.filter(live).length}</span></button>`).join('')}</div>
    <div class="mod-head"><span class="num">${MOD[cp.m].n}</span><div><h2>${esc(cp.title)}</h2>
      <p class="small muted">${cp.items.length} checkpoint${cp.items.length > 1 ? 's' : ''} · ${cp.twins.filter(live).length} twin questions</p></div>
      <button class="go" style="margin-left:auto" data-go="drill:${cp.m}">Lesson drill</button></div>
    <section class="card cp-table"><table class="plain"><tr><th>Checkpoint</th><th>What it asks</th><th>Exam skill</th><th>Hint</th></tr>${rows}</table></section>
    <div class="sec-head"><h2 style="font-size:1.1rem">Twin questions</h2><span class="meta">same skills, full answers</span></div>
    ${hiddenNote(cp.twins)}<div class="stack">${cp.twins.filter(live).map((t, i) => renderQ(t.id, String(i + 1))).join('')}</div>`;
}

/* ---------- tab: full answer keys ---------- */
function viewAnswers() {
  const p = PAPERS.find(x => x.id === route.args[0]) || PAPERS[0];
  const K = window.KEYS || {};
  const block = (title, html) => html ? `<div class="key-block"><h4>${title}</h4>${html}</div>` : '';
  const item = it => {
    const k = K[it.id] || {};
    let h = `<div class="q-top"><span class="num">${esc(it.n)}</span>${modTag(it.m)}${it.marks ? `<span class="marks">${it.marks} marks</span>` : ''}</div><div class="q-text">${it.q}</div>`;
    if (it.code) h += pre(it.code, it.codeLang || (it.lang === 'sh' ? 'cpp' : (it.lang || 'cpp')));
    if (it.opts) h += '<div class="opts">' + it.opts.map((o, i) =>
      `<div class="opt${i === it.a ? ' right' : ''}${isCodey(o) ? ' mono' : ''}"><b>${'ABCD'[i]}</b><span>${esc(o)}${k.wrong ? `<small class="why-opt">${k.wrong[i]}</small>` : ''}</span></div>`).join('') + '</div>';
    h += `<div class="key-ans"><span>Answer</span><b>${esc(k.answer || '')}</b></div>`;
    if (it.out) h += `<div class="key-ans"><span>Exact output</span><code>${esc(it.out)}</code></div>`;
    if (it.ans && !k.full) h += pre(it.ans, it.lang);
    if (k.work) h += block('Working', '<ol class="steps">' + k.work.map(w => '<li>' + w + '</li>').join('') + '</ol>');
    else if (it.why && !k.wrong) h += block('Why', '<p>' + it.why + '</p>');
    if (k.full) {
      const files = k.files ? Object.entries(k.files).map(([n, c]) => `<p class="small muted">Contents of ${esc(n)}:</p>${pre(c, 'text')}`).join('') : '';
      const out = k.out !== undefined ? `<p class="small muted">Output when run${k.outNote ? ': ' + k.outNote : ''}</p>${pre(k.out, 'text')}` : '';
      h += block(k.out !== undefined ? 'Complete program (compiled and run)' : 'Complete answer', pre(k.full, k.lang || (k.sh || /^#!/.test(k.full) ? 'sh' : 'cpp')) + files + out);
    }
    if (k.sh && k.sh !== true) h += block('Checked by running it in Bash', (k.shNote ? `<p class="small muted">${esc(k.shNote)}</p>` : '') +
      pre(k.sh.cmd.split('; ').map(c => '$ ' + c).join('\n'), 'text') + `<p class="small muted">Output</p>` + pre(k.sh.out, 'text'));
    if (k.points) h += block('What the marker looks for', '<ul class="notes">' + k.points.map(x => '<li>' + x + '</li>').join('') + '</ul>');
    return `<article class="card q key">${h}</article>`;
  };
  return `<div class="sec-head"><h2>Full answers</h2><span class="meta">every question, fully answered</span></div>
    <div class="chips no-print">${PAPERS.map(x => `<button class="chip${x.id === p.id ? ' on' : ''}" data-go="answers:${x.id}">${esc(x.title)}</button>`).join('')}
      <button class="btn sm" data-act="print" style="margin-left:auto">Print or save as PDF</button></div>
    <section class="card" style="margin-bottom:14px"><b>${esc(p.title)}</b> · <span class="muted">${esc(p.meta)}</span>
      <p class="small muted" style="margin-top:4px">Nothing is hidden on this page: every answer, the working, why each wrong option is wrong, and a complete program for every code question. Each complete program was compiled with g++ and run, and the output shown is its real output. To practise without seeing the answers, use the Past papers tab.</p></section>
    ${p.sections.map(s => `<div class="sec-head"><h2 style="font-size:1.1rem">${esc(s.name)}</h2></div><div class="stack">${s.items.map(item).join('')}</div>`).join('')}`;
}

/* ---------- tab: past papers ---------- */
function viewPapers() {
  const id = route.args[0] || PAPERS[0].id, p = PAPERS.find(x => x.id === id) || PAPERS[0];
  return `<div class="sec-head"><h2>Past papers, fully worked</h2></div>
    <div class="chips">${PAPERS.map(x => `<button class="chip${x.id === p.id ? ' on' : ''}" data-go="papers:${x.id}">${esc(x.title)}</button>`).join('')}</div>
    <section class="card" style="margin-bottom:14px"><b>${esc(p.meta)}</b><p class="small muted" style="margin-top:4px">${esc(p.note)}</p>
      <p class="small muted" style="margin-top:4px">Sit it on paper from the PDF in your Past Papers folder first. Use this page to mark.</p></section>
    ${p.sections.map(s => `<div class="sec-head"><h2 style="font-size:1.1rem">${esc(s.name)}</h2></div><div class="stack">${s.items.map(it => renderQ(it.id)).join('')}</div>`).join('')}`;
}

/* ---------- tab: mock exam ---------- */
let M = null, tick = null;
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
/* Built to the 2026 format: never uses not-examined items; Modules 9 and 10 only in A and B
   (about 12 marks together); Section C = 3 long questions (C1 two parts, C2 separate compilation, C3 C++). */
const STL_C = q => q.m === 'm9' || q.m === 'm10';
function buildMock() {
  const ok = q => q && !OUT.has(q.id);
  const quota = { m1: 3, m2: 1, m3: 1, m4: 1, m5: 1, m6: 1, m7: 1, m8: 2, m9: 2, m10: 2 };
  const a = shuffle(Object.entries(quota).flatMap(([m, n]) => shuffle([...MCQ, ...(DQ[m] || [])].filter(q => q.m === m && ok(q))).slice(0, n)));
  const tr = shuffle(TRACE.filter(ok)), cpp = tr.filter(q => !STL_C(q));
  const tPick = [...cpp.filter(q => q.m === 'm8').slice(0, 2), ...cpp.filter(q => q.m !== 'm8').slice(0, 2), tr.find(STL_C)];
  const sh = shuffle(SHORT.filter(q => ok(q) && !STL_C(q)));
  const sPick = [sh.find(q => q.m === 'm1'), sh.find(q => q.m === 'm2'), sh.find(q => !['m1', 'm2'].includes(q.m))];
  const pr = shuffle(PROG.filter(q => ok(q) && !STL_C(q) && q.m !== 'm2' && q.m !== 'm4'));
  const c1 = pr.filter(q => q.m === 'm8').slice(0, 2);
  const c2 = shuffle([...PROG.filter(q => q.m === 'm4'), Q['sample-Q2b']].filter(ok))[0];
  const c3 = pr.find(q => !c1.includes(q));
  const bMarks = [3, 3, 4, 4, 4, 4, 4, 4];
  const qs = [];
  a.forEach((q, i) => qs.push({ id: q.id, sec: 'A', label: 'A' + (i + 1), marks: 2 }));
  shuffle([...tPick, ...sPick].filter(Boolean)).forEach((q, i) => qs.push({ id: q.id, sec: 'B', label: 'B' + (i + 1), marks: bMarks[i] }));
  [[c1[0], 'C1(a)'], [c1[1], 'C1(b)'], [c2, 'C2'], [c3, 'C3']].forEach(([q, label]) => q && qs.push({ id: q.id, sec: 'C', label, marks: 10 }));
  M = { qs, ans: {}, self: {}, end: Date.now() + 120 * 60000, submitted: false, saved: false };
}
const mcqMarks = x => M.ans[x.id] == null ? 0 : M.ans[x.id] === Q[x.id].a ? x.marks : -1;   // +2 right, −1 wrong, 0 blank
function mockScore() {
  let auto = 0, self = 0, selfMax = 0;
  M.qs.forEach(x => {
    const q = Q[x.id];
    if (q.type === 'mcq') auto += mcqMarks(x);
    else if (q.type === 'trace') auto += norm(M.ans[x.id] || '') === norm(q.out) ? x.marks : 0;
    else { self += Math.min(x.marks, Math.max(0, +M.self[x.id] || 0)); selfMax += x.marks; }
  });
  return { auto, self, selfMax, total: auto + self };
}
function mockQ(x) {
  const q = Q[x.id], sub = M.submitted, a = M.ans[x.id];
  let body = `<div class="q-top"><span class="num">${x.label}</span>${sub ? modTag(q.m) : ''}<span class="marks">${x.marks} marks</span></div>
    ${q.title ? `<h3 style="font-size:1.02rem;margin-bottom:4px">${esc(q.title)}</h3>` : ''}<div class="q-text">${q.q}</div>`;
  if (q.type === 'mcq') {
    body += (q.code ? pre(q.code) : '') + '<div class="opts">' + q.opts.map((o, i) => {
      const cls = sub ? (i === q.a ? ' right' : i === a ? ' wrong' : '') : (i === a ? ' sel' : '');
      return `<button class="opt${isCodey(o) ? ' mono' : ''}${cls}" data-mpick="${x.id}" data-i="${i}" ${sub ? 'disabled' : ''}><b>${'ABCD'[i]}</b><span>${esc(o)}</span></button>`;
    }).join('') + '</div>';
    if (sub) body += `<div class="explain ${a === q.a ? 'ok' : 'bad'}"><b>${a === q.a ? 'Correct, +2.' : a == null ? 'Left blank, 0. Answer: ' + 'ABCD'[q.a] + '.' : 'Wrong, −1. Answer: ' + 'ABCD'[q.a] + '.'}</b> ${q.why}</div>`;
  } else if (q.type === 'trace') {
    body += pre(q.code) + `<input class="ans-in" style="width:100%" data-min="${x.id}" placeholder="Output" value="${esc(a || '')}" ${sub ? 'disabled' : ''} autocomplete="off" spellcheck="false">`;
    if (sub) { const ok = norm(a || '') === norm(q.out); body += `<div class="explain ${ok ? 'ok' : 'bad'}"><b>${ok ? 'Correct.' : 'Expected:'}</b> ${ok ? '' : `<code>${esc(q.out)}</code><br>`}${q.why}</div>`; }
  } else {
    body += (q.code ? pre(q.code) : '') + (q.given ? pre(q.given) : '') +
      `<textarea class="ans-in" data-min="${x.id}" placeholder="Write on paper, or type here" ${sub ? 'disabled' : ''} spellcheck="false">${esc(a || '')}</textarea>`;
    if (sub) body += `<p class="small muted" style="margin-top:10px">Model answer:</p>${pre(q.ans || q.sol, q.lang)}${q.why ? `<div class="explain">${q.why}</div>` : ''}
      <div class="self"><label for="sf-${x.id}">Marks you earned</label><input id="sf-${x.id}" type="number" min="0" max="${x.marks}" data-self="${x.id}" value="${M.self[x.id] ?? ''}"> <span class="muted">out of ${x.marks}</span></div>`;
  }
  return `<article class="card q">${body}</article>`;
}
function viewMock() {
  if (!M) {
    return `<div class="sec-head"><h2>Mock exam</h2><span class="meta">2 hours · 100 marks</span></div>
      <p class="lead">A fresh paper in this year's format each time: 15 multiple choice (30), 8 short questions (30) and 3 long questions (40: C1 in two parts, C2 on separate compilation, C3 a C++ function), drawn from the practice bank. Git, GDB and C++ class questions never appear, and STL and C appear only in Sections A and B. Multiple choice is marked +2 right, −1 wrong, 0 blank, like the real paper. Output questions are marked automatically. You mark the written answers against the model answers.</p>
      <section class="card"><ul class="steps"><li>Clear your desk. Only your A4 sheet, a calculator, pens and paper.</li><li>Hand-write Sections B and C, as in the real exam.</li><li>Do not pause the clock.</li></ul>
        <div class="row" style="margin-top:12px"><button class="btn pri" data-act="mock-start">Start the 2-hour mock</button></div></section>
      ${S.mocks.length ? `<div class="sec-head"><h2 style="font-size:1.1rem">Your results</h2></div><section class="card"><table class="plain"><tr><th>Date</th><th>Score</th><th>A</th><th>B + C</th></tr>
        ${S.mocks.slice().reverse().map(m => `<tr><td>${esc(m.d)}</td><td><b>${m.score}</b> / 100</td><td>${m.a} / 30</td><td>${m.score - m.a} / 70</td></tr>`).join('')}</table></section>` : ''}`;
  }
  const sec = s => M.qs.filter(x => x.sec === s).map(mockQ).join('');
  let top;
  if (!M.submitted) top = `<div class="timer"><span><b>Time left</b></span><span class="t" id="timerT"></span><button class="btn pri" data-act="mock-submit">Submit</button></div>`;
  else {
    const sc = mockScore();
    top = `<section class="card" style="margin-bottom:14px"><div class="row"><div style="flex:1"><div class="score" id="mockTotal">${sc.total} / 100</div>
      <p class="small muted" id="mockSplit">Auto-marked ${sc.auto}. Self-marked ${sc.self} of ${sc.selfMax}: enter your marks under each written answer.</p></div>
      <button class="btn pri" data-act="mock-save">${M.saved ? 'Saved' : 'Save result'}</button><button class="btn" data-act="mock-new">New mock</button></div></section>`;
  }
  return `<div class="sec-head"><h2>Mock exam</h2><span class="meta">${M.submitted ? 'Marking' : 'In progress'}</span></div>${top}
    <div class="sec-head"><h2 style="font-size:1.1rem">Section A · Multiple choice (30%)</h2></div><div class="stack">${sec('A')}</div>
    <div class="sec-head"><h2 style="font-size:1.1rem">Section B · Short questions (30%)</h2></div><div class="stack">${sec('B')}</div>
    <div class="sec-head"><h2 style="font-size:1.1rem">Section C · Long questions (40%)</h2></div><div class="stack">${sec('C')}</div>
    ${M.submitted ? '' : '<div class="row" style="margin-top:16px"><button class="btn pri" data-act="mock-submit">Submit and mark</button></div>'}`;
}
function submitMock() {
  M.submitted = true;
  M.qs.forEach(x => {
    const q = Q[x.id];
    if (q.type === 'mcq') S.q[x.id] = M.ans[x.id] === q.a ? 'ok' : 'bad';
    else if (q.type === 'trace') S.q[x.id] = norm(M.ans[x.id] || '') === norm(q.out) ? 'ok' : 'bad';
  });
  save(); render(); window.scrollTo(0, 0);
}
function timer() {
  clearInterval(tick);
  if (!M || M.submitted) return;
  const paint = () => {
    const el = $('#timerT'), left = Math.max(0, M.end - Date.now());
    if (el) {
      const s = Math.round(left / 1000);
      el.textContent = `${String(Math.floor(s / 3600))}:${String(Math.floor(s % 3600 / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
      el.classList.toggle('low', s < 600);
    }
    if (left <= 0) { clearInterval(tick); if (route.tab !== 'mock') go('mock'); submitMock(); }
  };
  paint(); tick = setInterval(paint, 1000);
}

/* ---------- tab: external ---------- */
const XS = window.XSETS || [];
const xDone = s => count(s.qs, q => S.q[q.id] === 'ok');
function viewXSet(s) {
  const flag = route.args[1] || '';
  const done = xDone(s), items = s.qs.filter(q => flag !== 'todo' || S.q[q.id] !== 'ok');
  return `<div class="row" style="margin-top:6px"><button class="btn sm" data-go="external">← Back to More practice</button></div>
    <div class="sec-head"><h2>${esc(s.title)}</h2><span class="meta">${done} of ${s.qs.length} correct</span></div>
    <p class="lead">${esc(s.blurb)} Written in the style of <a href="${esc(s.src)}" target="_blank" rel="noopener">${esc(s.like)}</a>, but with the answers built in: pick an option, check your output, or reveal the model answer. Every output and program here was compiled and run with g++.</p>
    <div class="chips">${XS.map(x => `<button class="chip${x === s ? ' on' : ''}" data-go="external:${x.id}:${flag}">${esc(x.title)}<span class="n">${xDone(x)}/${x.qs.length}</span></button>`).join('')}
      <button class="chip${flag === 'todo' ? ' on' : ''}" data-go="external:${s.id}:${flag === 'todo' ? '' : 'todo'}">Wrong or not done</button></div>
    <div class="bar ok" style="margin-bottom:14px"><i style="width:${pct([done, s.qs.length])}%"></i></div>
    <div class="stack">${items.length ? items.map((q, i) => renderQ(q.id, String(i + 1))).join('') : '<p class="lead">All correct in this set. Clear the filter to see every question.</p>'}</div>`;
}
function viewExternal() {
  const set = XSET[route.args[0]];
  if (set) return viewXSet(set);
  const nX = XS.reduce((n, s) => n + s.qs.length, 0);
  return `<div class="sec-head"><h2>More practice from other sites</h2><span class="meta">${count(EXTERNAL.flatMap(g => g.items), i => S.ext[i.id])} of ${EXTERNAL.flatMap(g => g.items).length} done</span></div>
    <p class="lead">Start with real HKU papers, then written-exam questions from other universities, then the coding sites. LeetCode and HackerRank check your code by running it, which is good for correctness, but the exam is hand-written and stays close to the course notes, so write each solution on paper first. The lists are limited to what COMP2113 actually tests.</p>
    ${XS.length ? `<div class="sec-head"><h2 style="font-size:1.1rem">Practise here, with answers</h2><span class="meta">${nX} questions</span></div>
    <p class="small muted" style="margin:0 0 10px">The USC, GeeksforGeeks and Liang pages hide their answers or keep them in a separate PDF. These sets are new questions in the same style and at the same level, with every answer one click away.</p>
    <div class="grid2 cheats" style="margin-bottom:18px">${XS.map(s => `<a class="card cheat" href="#external:${s.id}"><span class="tag">${s.qs.length} questions</span><h3>${esc(s.title)}</h3>
      <p class="why">${esc(s.blurb)}</p><small>${xDone(s)} of ${s.qs.length} correct · style of ${esc(s.like)}</small></a>`).join('')}</div>` : ''}
    <div class="stack ext">${EXTERNAL.map(g => `<section class="card"><div class="row"><h3 style="font-size:1.05rem;flex:1">${esc(g.title)}</h3>${modTag(g.m)}</div>
      <p class="why">${esc(g.why)}</p><ul>${g.items.map(i => `<li><input type="checkbox" id="e-${i.id}" data-ext="${i.id}" ${S.ext[i.id] ? 'checked' : ''} aria-label="Done: ${esc(i.t)}">
        <div><a href="${esc(i.u)}" target="_blank" rel="noopener">${esc(i.t)}</a><small>${esc(i.n)}</small></div>
        ${i.set && XSET[i.set] ? `<button class="go" data-go="external:${i.set}">Practise here</button>` : '<span></span>'}</li>`).join('')}</ul></section>`).join('')}</div>`;
}

/* ---------- tab: visual cheat sheets ---------- */
const CHEATS = [
  { f: 'm1-2', m: 'M1–2', t: 'Linux, Shell Script & Git', d: 'Commands, paths, ls -l anatomy, redirection and pipes, grep regex, Bash variables, quoting, if/for. (The Git part is not examined this year.)', x: 'chmod toggler · grep -E tester' },
  { f: 'm3', m: 'M3', t: 'C++ Basics', d: 'Python vs C++, types and sizes, precedence ladder, ++ prefix/postfix, integer division, conversions, switch, dangling else, loop flow.', x: '12 predict-the-output cards' },
  { f: 'm4', m: 'M4', t: 'Makefile & Separate Compilation', d: 'Header files and guards, the four compilation stages, rule anatomy, how make decides, $@ $^ $<, .PHONY, the exam recipe.', x: 'clickable "what gets rebuilt?" graph' },
  { f: 'm5', m: 'M5', t: 'Functions', d: 'Function anatomy, prototypes, library functions, pass by value vs reference (diagram), returning two values, block scope and shadowing.', x: 'predict-the-output cards' },
  { f: 'm6', m: 'M6', t: 'Arrays & Strings', d: 'Array memory, passing arrays, linear search, selection sort pass by pass, 2D grids, cctype, C-strings and the string class.', x: 'string-method lab' },
  { f: 'm7', m: 'M7', t: 'Structs, File I/O & Recursion', d: 'Structs (classes are not examined this year), the open/check/loop/close skeleton, istringstream, iomanip with visible spaces, factorial stack and fib call tree.', x: 'predict-the-output cards' },
  { f: 'm8', m: 'M8', t: 'Pointers, Dynamic Memory & Linked Lists', d: 'Address diagrams, & and *, pointer arithmetic, stack vs heap, leaks and dangling pointers, growing arrays, every linked-list operation.', x: 'linked-list playground' },
  { f: 'm9', m: 'M9', t: 'Standard Template Library', d: 'vector, list and map side by side, cost table, begin()/end(), iterator kinds, map pairs, sort() and operator<.', x: 'predict-the-output cards' },
  { f: 'm10', m: 'M10', t: 'C Programming & GDB', d: 'C vs C++ table, printf/scanf specifiers and widths, string.h, pointer swaps, malloc/free, typedef. (The GDB part is not examined this year.)', x: 'predict-the-output cards' },
];
function viewCheats() {
  return `<div class="sec-head"><h2>Visual cheat sheets</h2><span class="meta">one page per module</span></div>
    <p class="lead">Each module's notes boiled down to tables, diagrams and small interactive tools, with a "predict the output" set at the end. Use them for a fast first pass or the night before; use the Topics and Practice tabs to drill.</p>
    <div class="grid2 cheats">${CHEATS.map(c => `<a class="card cheat" href="cheatsheets/${c.f}.html">
      <span class="tag">${esc(c.m)}</span><h3>${esc(c.t)}</h3><p class="why">${esc(c.d)}</p><small>Interactive: ${esc(c.x)}</small></a>`).join('')}</div>`;
}

/* ---------- tab: A4 sheet ---------- */
function viewSheet() {
  return `<div class="no-print"><div class="sec-head"><h2>Your A4 note sheet</h2><span class="meta">prints on one sheet, both sides</span></div>
    <p class="lead">Confirmed for this year: one A4 sheet of notes, printed or written on both sides. This is a starting draft covering every examined topic (Git and GDB are left out because they are not examined). A sheet you write yourself from your own mistakes works better, so treat this as the base and add to it.</p>
    <div class="row" style="margin-bottom:14px"><button class="btn pri" data-act="print">Print or save as PDF</button><span class="small muted">In the print dialog choose A4, both sides, and margins "Default" or "Minimum".</span></div></div>
    <div class="sheet">${SHEET}</div>`;
}

/* ---------- render ---------- */
const VIEWS = { plan: viewPlan, types: viewTypes, topics: viewTopics, cheats: viewCheats, practice: viewPractice, drill: viewDrill, checkpoints: viewCheckpoints, papers: viewPapers, answers: viewAnswers, mock: viewMock, external: viewExternal, sheet: viewSheet };
function render() {
  $('#view').innerHTML = VIEWS[route.tab]();
  document.querySelectorAll('#view .q[data-q]').forEach((el, i) => { if (route.tab === 'practice' || route.tab === 'drill' || route.tab === 'external') el.dataset.num = String(i + 1); });
  header(); timer();
}

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('button, a'); if (!t) return;
  if (t.dataset.tab) return go(t.dataset.tab);
  if (t.dataset.go) return go(t.dataset.go);
  if (t.dataset.master) { const id = t.dataset.master; S.m[id] ? delete S.m[id] : S.m[id] = 1; save(); t.classList.toggle('on', !!S.m[id]); t.textContent = S.m[id] ? 'Mastered' : 'Mark mastered'; return header(); }
  if (t.dataset.mpick) { M.ans[t.dataset.mpick] = +t.dataset.i; t.parentElement.querySelectorAll('.opt').forEach(o => o.classList.toggle('sel', o === t)); return; }
  if (t.id === 'themeBtn') {
    const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    S.theme = document.documentElement.dataset.theme = dark ? 'light' : 'dark'; return save();
  }
  if (t.id === 'resetBtn') { if (confirm('Erase all saved progress on this browser?')) { const th = S.theme; S = { m: {}, q: {}, plan: {}, ext: {}, date: EXAM, theme: th, mocks: [] }; save(); render(); } return; }
  const act = t.dataset.act; if (!act) return;
  if (act === 'print') return window.print();
  if (act === 'scope') { S.showOut = !S.showOut; save(); const y = window.scrollY; render(); return window.scrollTo(0, y); }
  if (act === 'mock-start') { buildMock(); render(); return window.scrollTo(0, 0); }
  if (act === 'mock-submit') { if (confirm('Submit and see your marks?')) submitMock(); return; }
  if (act === 'mock-new') { M = null; return render(); }
  if (act === 'mock-save') { if (M.saved) return; const sc = mockScore(); const a = M.qs.filter(x => x.sec === 'A').reduce((n, x) => n + mcqMarks(x), 0);
    S.mocks.push({ d: new Date().toLocaleDateString(), score: sc.total, a }); M.saved = true; save(); t.textContent = 'Saved'; return; }
  const card = t.closest('.q[data-q]'); if (!card) return;
  const id = card.dataset.q, q = Q[id], u = U(id);
  if (act === 'pick') { u.picked = +t.dataset.i; S.q[id] = u.picked === q.a ? 'ok' : 'bad'; }
  if (act === 'retry') { delete u.picked; }
  if (act === 'check') { u.typed = $('[data-in]', card).value; u.result = norm(u.typed) === norm(q.out) ? 'ok' : 'bad'; S.q[id] = u.result === 'ok' ? 'ok' : (S.q[id] === 'ok' ? 'ok' : 'bad'); }
  if (act === 'reveal') { u.revealed = true; if (q.type === 'trace') { const i = $('[data-in]', card); if (i) u.typed = i.value; if (S.q[id] !== 'ok') S.q[id] = 'bad'; } }
  if (act === 'hide') { u.revealed = false; }
  if (act === 'self') { S.q[id] = t.dataset.v; }
  save(); rerenderQ(id);
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.task) { t.checked ? S.plan[t.dataset.task] = 1 : delete S.plan[t.dataset.task]; save(); const y = window.scrollY; render(); window.scrollTo(0, y); }
  if (t.dataset.ext) { t.checked ? S.ext[t.dataset.ext] = 1 : delete S.ext[t.dataset.ext]; save(); }
  if (t.id === 'examDate') { S.date = t.value; save(); render(); }
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.min) M.ans[t.dataset.min] = t.value;
  if (t.dataset.self) { M.self[t.dataset.self] = t.value; const sc = mockScore(); $('#mockTotal').textContent = sc.total + ' / 100';
    $('#mockSplit').textContent = `Auto-marked ${sc.auto}. Self-marked ${sc.self} of ${sc.selfMax}.`; }
  if (t.id === 'search') { U('search').v = t.value; const pos = t.selectionStart; render(); const n = $('#search'); n.focus(); n.setSelectionRange(pos, pos); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.dataset.in) { const b = e.target.closest('.q').querySelector('[data-act="check"]'); if (b) b.click(); }
});
window.addEventListener('beforeunload', e => { if (M && !M.submitted) { e.preventDefault(); e.returnValue = ''; } });
window.addEventListener('hashchange', () => { parseHash(); render(); window.scrollTo(0, 0); });

parseHash(); render();
})();
