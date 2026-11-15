/* COMP2113 visual cheat sheets — shared module bar and pager. */
(function () {
  var MODS = [
    ['m1-2.html', 'M1–2', 'Linux, Shell & Git'],
    ['m3.html', 'M3', 'C++ Basics'],
    ['m4.html', 'M4', 'Makefile'],
    ['m5.html', 'M5', 'Functions'],
    ['m6.html', 'M6', 'Arrays & Strings'],
    ['m7.html', 'M7', 'Structs, File I/O, Recursion'],
    ['m8.html', 'M8', 'Pointers & Linked Lists'],
    ['m9.html', 'M9', 'STL'],
    ['m10.html', 'M10', 'C & GDB']
  ];
  var here = location.pathname.split('/').pop() || 'index.html';
  var bar = document.getElementById('modbar');
  if (bar) {
    var h = '<a class="home" href="../#cheats">← Final Hub</a>';
    MODS.forEach(function (m) {
      h += '<a href="' + m[0] + '"' + (m[0] === here ? ' class="on" aria-current="page"' : '') + ' title="' + m[2] + '">' + m[1] + '</a>';
    });
    bar.innerHTML = h;
    var on = bar.querySelector('.on');
    if (on && on.scrollIntoView) { try { bar.scrollLeft = on.offsetLeft - 80; } catch (e) {} }
  }
  var pg = document.getElementById('pager');
  if (pg) {
    var i = MODS.findIndex(function (m) { return m[0] === here; });
    var prev = MODS[i - 1], next = MODS[i + 1];
    pg.innerHTML = (prev ? '<a href="' + prev[0] + '">← ' + prev[1] + ' ' + prev[2] + '</a>' : '<span></span>') +
                   (next ? '<a href="' + next[0] + '">' + next[1] + ' ' + next[2] + ' →</a>' : '<a href="../#cheats">Back to the hub →</a>');
  }
})();
