/* Compiles and runs every code answer in the hub and compares the real output with the stored one.
   Usage:  node tools/verify.js            (set GXX to your g++ if it is not on PATH) */
const fs = require('fs'), path = require('path'), os = require('os'), vm = require('vm');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const GXX = process.env.GXX || (fs.existsSync('C:/msys64/ucrt64/bin/g++.exe') ? 'C:/msys64/ucrt64/bin/g++.exe' : 'g++');
const env = Object.assign({}, process.env, { PATH: path.dirname(GXX) + path.delimiter + process.env.PATH });

const ctx = { window: {}, console }; ctx.window = ctx;
vm.createContext(ctx);
for (const f of ['topics.js', 'practice.js', 'papers.js', 'plan.js', 'checkpoints.js', 'answerkeys.js', ...fs.readdirSync(path.join(root, 'data', 'drill')).map(f => 'drill/' + f)])
  vm.runInContext(fs.readFileSync(path.join(root, 'data', f), 'utf8'), ctx, { filename: f });
const W = ctx.window;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'c2113-'));
const norm = s => s.replace(/\s+/g, ' ').trim();
const HEAD = '#include <bits/stdc++.h>\nusing namespace std;\n';
let pass = 0, fail = 0;

function run(id, src, expected, opt = {}) {
  const dir = fs.mkdtempSync(path.join(tmp, 'r-'));
  const isC = opt.c;
  const file = path.join(dir, isC ? 'a.c' : 'a.cpp');
  fs.writeFileSync(file, src);
  for (const [n, c] of Object.entries(opt.files || {})) fs.writeFileSync(path.join(dir, n), c);
  const exe = path.join(dir, 'a.exe');
  const args = isC ? ['-x', 'c', '-std=c11', file, '-o', exe] : ['-std=c++11', '-pedantic-errors', '-w', file, '-o', exe];
  const c = spawnSync(GXX, args, { env, encoding: 'utf8' });
  if (c.status !== 0) { fail++; console.log(`FAIL ${id}: compile error\n${(c.stderr || '').split('\n').slice(0, 6).join('\n')}`); return; }
  const r = spawnSync(exe, [], { cwd: dir, env, encoding: 'utf8', input: opt.stdin || '', timeout: 5000 });
  const got = opt.exact ? r.stdout.replace(/\r/g, '').replace(/\n+$/, '') : norm(r.stdout);
  const want = opt.exact ? expected : norm(expected);
  if (r.status !== 0 || got !== want) { fail++; console.log(`FAIL ${id}: expected [${want}] got [${got}] (exit ${r.status})`); }
  else pass++;
}

const wrap = code => /\bmain\s*\(/.test(code) ? HEAD + code : HEAD + 'int main() {\n' + code + '\nreturn 0;\n}\n';

for (const t of W.TRACE) run(t.id, wrap(t.code), t.out, { exact: t.exact });

function progTest(id, item, sol) {
  const t = item.test;
  if (!t) return;
  if (t.full) return run(id, sol, t.out, { files: t.files, stdin: t.stdin, c: item.lang === 'c', exact: t.exact });
  const given = t.pre && item.given && t.pre.includes(item.given) ? '' : (item.given || '');
  run(id, HEAD + given + (t.pre || '') + sol + '\nint main() {\n' + t.main + '\nreturn 0;\n}\n', t.out, { exact: t.exact });
}
for (const p of W.PROG) progTest(p.id, p, p.sol);
for (const paper of W.PAPERS) for (const s of paper.sections) for (const it of s.items) {
  const id = paper.id + ' ' + it.n;
  if (it.out && it.code) run(id, wrap(it.code), it.out);
  if (it.test) progTest(id, it, it.test.main && !it.test.full && /^\s*y = /.test(it.ans) ? '' : it.ans);
}

// ---- shell answers (run with bash in a temp folder) ----
const BASH = process.env.BASH_EXE || 'bash';
function runSh(id, t, script) {
  const dir = fs.mkdtempSync(path.join(tmp, 's-'));
  for (const [n, c] of Object.entries(t.files || {})) fs.writeFileSync(path.join(dir, n), c);
  let cmd = t.cmd;
  if (t.script) { fs.writeFileSync(path.join(dir, t.script), script.split(String.fromCharCode(13)).join('') + String.fromCharCode(10)); cmd = 'bash ' + t.script + ' ' + (t.args || ''); }
  if (!cmd) { fs.writeFileSync(path.join(dir, 'script.sh'), script.split(String.fromCharCode(13)).join('') + String.fromCharCode(10)); cmd = 'bash script.sh'; }
  const r = spawnSync(BASH, ['-c', cmd], { cwd: dir, env, encoding: 'utf8', timeout: 10000 });
  const got = norm(r.stdout || ''), want = norm(t.out);
  if (got !== want) { fail++; console.log(`FAIL ${id}: expected [${want}] got [${got}] ${(r.stderr || '').slice(0, 200)}`); } else pass++;
}
for (const p of W.PROG) if (p.sh) runSh(p.id, p.sh, p.sol);

// ---- checkpoint twins ----
let twinN = 0;
for (const cp of W.CHECKPOINTS || []) for (const t of cp.twins) {
  twinN++;
  const id = 'checkpoint ' + t.id;
  if (!t.m || !t.id) { fail++; console.log('BAD twin ' + id); continue; }
  if (t.type === 'mcq' && !(t.a >= 0 && t.a < t.opts.length)) { fail++; console.log('BAD answer index ' + id); }
  if (t.type === 'trace') run(id, wrap(t.code), t.out, { stdin: t.stdin });
  if (t.type === 'prog') progTest(id, t, t.sol);
  if (t.sh) runSh(id, t.sh, t.ans);
}

// ---- full answer keys ----
let keyN = 0, keyRun = 0;
const itemIds = new Set();
for (const p of W.PAPERS) for (const s of p.sections) for (const it of s.items) itemIds.add(p.id + '-' + it.n.replace(/\W/g, ''));
for (const id of itemIds) if (!(W.KEYS || {})[id]) { fail++; console.log('NO KEY for ' + id); }
for (const [id, k] of Object.entries(W.KEYS || {})) {
  keyN++;
  if (!itemIds.has(id)) { fail++; console.log('KEY for unknown item ' + id); }
  if (k.full && k.out !== undefined) {
    keyRun++;
    if (k.sh === true) runSh('key ' + id, { out: k.out }, k.full);
    else run('key ' + id, k.full, k.out, { c: k.c, files: k.files, stdin: k.stdin });
  }
  if (k.sh && k.sh !== true) runSh('key ' + id, k.sh, '');
}

// ---- lesson drills ----
let drillN = 0;
const okTag = new RegExp('^<[/]?(code|em|b|strong|sup|br)([ >]|$)');
for (const [m, rows] of Object.entries(W.DRILL || {})) rows.forEach((r, i) => {
  const id = 'drill ' + m + ' #' + (i + 1); drillN++;
  const [q, o, a, w, code, flag] = r;
  if (!(Array.isArray(o) && o.length === 4 && a >= 0 && a < 4 && q && w)) { fail++; console.log('BAD row ' + id); return; }
  if (new Set(o).size !== 4) { fail++; console.log('DUPLICATE options ' + id); }
  for (const t of (q + ' ' + w).match(/<[^>]{0,25}/g) || []) if (!okTag.test(t)) { fail++; console.log('STRAY HTML ' + id + ' ' + JSON.stringify(t)); }
  if (flag === 'run') run(id, wrap(code), o[a]);
});

// ---- structural checks ----
const ids = new Set();
const all = [...W.MCQ, ...W.TRACE, ...W.SHORT, ...W.PROG, ...W.TOPICS.flatMap(t => t.cards)];
for (const x of all) { if (ids.has(x.id)) { fail++; console.log('DUPLICATE id ' + x.id); } ids.add(x.id); }
const mods = new Set(W.TOPICS.map(t => t.id));
for (const x of [...W.MCQ, ...W.TRACE, ...W.SHORT, ...W.PROG]) if (!mods.has(x.m)) { fail++; console.log('BAD module on ' + x.id); }
for (const q of W.MCQ) if (!(q.a >= 0 && q.a < q.opts.length)) { fail++; console.log('BAD answer index ' + q.id); }
for (const s of (W.PLAN || [])) for (const t of s.tasks) if (t.go && !/^(topics|types|practice|papers|mock|external|sheet)(:|$)/.test(t.go)) { fail++; console.log('BAD plan link ' + t.go); }

console.log(`\n${pass} passed, ${fail} failed  (answer keys ${keyN} with ${keyRun} full programs, checkpoint twins ${twinN}, drill ${drillN}, MCQ ${W.MCQ.length}, trace ${W.TRACE.length}, short ${W.SHORT.length}, prog ${W.PROG.length}, topic cards ${W.TOPICS.reduce((n, t) => n + t.cards.length, 0)})`);
fs.rmSync(tmp, { recursive: true, force: true });
process.exit(fail ? 1 : 0);
