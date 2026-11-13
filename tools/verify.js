/* Compiles and runs every code answer in the hub and compares the real output with the stored one.
   Usage:  node tools/verify.js            (set GXX to your g++ if it is not on PATH) */
const fs = require('fs'), path = require('path'), os = require('os'), vm = require('vm');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const GXX = process.env.GXX || (fs.existsSync('C:/msys64/ucrt64/bin/g++.exe') ? 'C:/msys64/ucrt64/bin/g++.exe' : 'g++');
const env = Object.assign({}, process.env, { PATH: path.dirname(GXX) + path.delimiter + process.env.PATH });

const ctx = { window: {}, console };
vm.createContext(ctx);
for (const f of ['topics.js', 'practice.js', 'papers.js', 'plan.js'])
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

// ---- structural checks ----
const ids = new Set();
const all = [...W.MCQ, ...W.TRACE, ...W.SHORT, ...W.PROG, ...W.TOPICS.flatMap(t => t.cards)];
for (const x of all) { if (ids.has(x.id)) { fail++; console.log('DUPLICATE id ' + x.id); } ids.add(x.id); }
const mods = new Set(W.TOPICS.map(t => t.id));
for (const x of [...W.MCQ, ...W.TRACE, ...W.SHORT, ...W.PROG]) if (!mods.has(x.m)) { fail++; console.log('BAD module on ' + x.id); }
for (const q of W.MCQ) if (!(q.a >= 0 && q.a < q.opts.length)) { fail++; console.log('BAD answer index ' + q.id); }
for (const s of (W.PLAN || [])) for (const t of s.tasks) if (t.go && !/^(topics|types|practice|papers|mock|external|sheet)(:|$)/.test(t.go)) { fail++; console.log('BAD plan link ' + t.go); }

console.log(`\n${pass} passed, ${fail} failed  (MCQ ${W.MCQ.length}, trace ${W.TRACE.length}, short ${W.SHORT.length}, prog ${W.PROG.length}, topic cards ${W.TOPICS.reduce((n, t) => n + t.cards.length, 0)})`);
fs.rmSync(tmp, { recursive: true, force: true });
process.exit(fail ? 1 : 0);
