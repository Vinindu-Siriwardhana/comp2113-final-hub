/* COMP2113 Final Hub — what the 2026 final does NOT examine.
   From Dr Chim's announcement: "Scope: Module 1 to Module 10 (except Git commands, C++ class and GDB Debugger)".
   Items listed here are hidden from drills, practice, topics, checkpoint twins and mocks unless
   "Show not-examined items" is switched on. Structs (including struct member functions) stay in scope. */
(function () {
const range = (m, a, b) => Array.from({ length: b - a + 1 }, (_, i) => `d-${m}-${a + i}`);
window.OUT_OF_SCOPE = {
  git: [...range('m2', 37, 61), 'q18', 'q19', 's8', 'm2-git'],
  gdb: [...range('m10', 57, 64), 'q67', 'q68', 's19', 'm10-gdb', 'cp10d'],
  class: ['d-m7-20', 'd-m7-21', 'q46', 'm7-class'],
};
})();
