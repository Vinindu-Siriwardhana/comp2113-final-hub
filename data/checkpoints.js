/* COMP2113 Final Hub — checkpoint guide.
   For each checkpoint: what it asks, the exam skill behind it, and a hint (no answers: the checkpoints
   are graded coursework). Each module then has "twin" questions that test the same skill with new
   code and data, with full worked answers. Twin code is compiled / run by tools/verify.js.
   Twin test formats:  test: { main | pre }  (C++ wrapped like PROG),  test: { full, stdin, files, c }  (whole program),
                       sh: { files, cmd, out }  (bash, run in a temp folder). */
(function () {
const R = String.raw;

window.CHECKPOINTS = [
{
  m: 'm1', title: 'Modules 0 and 1 · Linux',
  items: [
    { n: '0', task: 'Get a CS account, then log in to the academy server with SSH and SFTP.', skill: 'Not examined directly, but you need it to test scripts on the real server.', hint: 'From outside the CS network connect to HKUVPN first. On campus Wi-Fi go through gatekeeper.cs.hku.hk first.' },
    { n: '1.1', task: 'Explain several commands from their man pages (ls -t, pwd, rm, mv, touch, tar) and write a tar command.', skill: 'Section A recall MCQs: 2019-20 A1 to A5 were all of this type.', hint: 'Run man on each command and read the NAME and the flag you are asked about. For tar, look up the c and f flags.' },
    { n: '1.2a', task: 'Create a directory, create a sub-directory whose name contains a space, then remove the whole tree.', skill: 'mkdir, cd, quoting names with spaces, removing non-empty directories.', hint: 'A name with a space must be quoted or it becomes two arguments. rmdir only removes empty directories.' },
    { n: '1.2b', task: 'chmod in absolute (number) mode: explain 666 and 700, write a number for a given permission, and explain why 777 is dangerous.', skill: 'The same r=4, w=2, x=1 arithmetic the sample paper Q1(b) needed.', hint: 'Work one triplet at a time: user, then group, then other. Add 4 for r, 2 for w, 1 for x.' },
    { n: '1.3', task: 'Predict the output of diff in both directions for two short files.', skill: 'Reading diff codes: a (add), c (change), d (delete), with < and > lines.', hint: 'The left numbers always refer to the first file and the right numbers to the second. Check your prediction by running diff on the server.' },
    { n: '1.4', task: 'Run gen4 with input and output redirection, then build a chain: sort, uniq, spell, diff and grep.', skill: 'Section B pipe questions (2019-20 B5).', hint: 'One stage per task in the question. uniq needs sorted input. A grep on the diff output can keep only the lines that start with one of the diff markers.' },
    { n: '1.5', task: 'grep a comma-separated student file: a name, UIDs starting with 2012, then UID 2012 plus a name starting with J or S.', skill: 'grep -E with ^, [ ], * and ranges.', hint: 'Test every pattern on the server and compare with the expected output in the question. Look carefully at every character inside your quotes: one stray character makes a pattern match nothing.' },
  ],
  twins: [
    { id: 'cp1a', type: 'mcq', m: 'm1', q: 'Which command lists the files inside <code>backup.tar</code> without extracting them?', opts: ['tar -cf backup.tar', 'tar -tf backup.tar', 'tar -xf backup.tar', 'ls backup.tar'], a: 1, why: '<code>-c</code> creates, <code>-x</code> extracts, <code>-t</code> lists the contents. <code>-f</code> names the archive file.' },
    { id: 'cp1b', type: 'mcq', m: 'm1', q: '<code>notes.txt</code> already exists. What does <code>touch notes.txt</code> do?', opts: ['Erases its content', 'Creates a second copy', 'Updates its last-modified time; the content is unchanged', 'Gives an error'], a: 2, why: 'touch creates an empty file only when the file does not exist. This is also how you force make to rebuild something.' },
    { id: 'cp1c', type: 'short', m: 'm1', kind: 'Commands', q: 'You are in <code>~</code>. Create a directory <code>comp2113</code>, inside it a directory called <code>lab 2</code> (one name with a space), then rename <code>lab 2</code> to <code>lab2</code>, and finally delete <code>comp2113</code> and everything in it.', lang: 'sh',
      ans: `mkdir comp2113
cd comp2113
mkdir "lab 2"
mv "lab 2" lab2
cd ..
rm -r comp2113`, why: 'Quotes keep "lab 2" as one argument. mv renames when both arguments are the same kind. rm -r is needed because comp2113 is not empty.',
      sh: { cmd: `mkdir comp2113 && cd comp2113 && mkdir "lab 2" && mv "lab 2" lab2 && ls && cd .. && rm -r comp2113 && ls`, out: 'lab2' } },
    { id: 'cp1d', type: 'mcq', m: 'm1', q: 'What permissions does <code>chmod 751 run.sh</code> give?', opts: ['rwxr-x--x', 'rwxrw---x', 'rw-r-x--x', 'rwxr--r-x'], a: 0, why: '7 = 4+2+1 = rwx, 5 = 4+1 = r-x, 1 = --x.' },
    { id: 'cp1e', type: 'mcq', m: 'm1', q: 'Which number gives <code>rw-r--r--</code> (owner reads and writes, everyone else only reads)?', opts: ['622', '644', '755', '466'], a: 1, why: 'rw- = 6, r-- = 4, r-- = 4. This is the usual setting for a web page or a text file.' },
    { id: 'cp1f', type: 'short', m: 'm1', kind: 'Predict diff', q: '<code>fileA</code> contains the lines <code>one two three four</code> (one per line). <code>fileB</code> contains <code>one three four five</code>. Write the output of <code>diff fileA fileB</code>.', lang: 'text',
      ans: `2d1
< two
4a4
> five`, why: '"two" (line 2 of fileA) is deleted, and the files are then in sync at line 1 of fileB. After line 4 of fileA, line 4 of fileB ("five") is added.',
      sh: { files: { fileA: 'one\ntwo\nthree\nfour\n', fileB: 'one\nthree\nfour\nfive\n' }, cmd: 'diff fileA fileB', out: '2d1 < two 4a4 > five' } },
    { id: 'cp1g', type: 'short', m: 'm1', kind: 'Pipe', q: '<code>words.txt</code> has one word per line, with repeats in random order. Give ONE command that prints how many <em>different</em> words it contains.', lang: 'sh',
      ans: `sort words.txt | uniq | wc -l`, why: 'uniq only removes adjacent duplicates, so sort first. wc -l counts the remaining lines.',
      sh: { files: { 'words.txt': 'pear\napple\npear\nfig\napple\nkiwi\n' }, cmd: 'sort words.txt | uniq | wc -l', out: '4' } },
    { id: 'cp1h', type: 'short', m: 'm1', kind: 'Regex', q: '<code>products.csv</code> has lines like <code>P1002,Bread,Bakery,12</code> (ID, name, category, price). Give a grep command for each: (a) products whose ID starts with P1 or P3, (b) Bakery products whose price has exactly two digits.', lang: 'sh',
      ans: `grep -E '^P[13]' products.csv
grep -E 'Bakery,[0-9]{2}$' products.csv`, why: '[13] matches one character, 1 or 3. {2} means exactly two digits, and $ makes sure nothing follows them.',
      sh: { files: { 'products.csv': 'P1001,Apple,Fruit,5\nP1002,Bread,Bakery,12\nP2001,Banana,Fruit,3\nP2002,Cake,Bakery,30\nP3001,Bagel,Bakery,8\nP3002,Tart,Bakery,150\n' }, cmd: "grep -E '^P[13]' products.csv; grep -E 'Bakery,[0-9]{2}$' products.csv", out: 'P1001,Apple,Fruit,5 P1002,Bread,Bakery,12 P3001,Bagel,Bakery,8 P3002,Tart,Bakery,150 P1002,Bread,Bakery,12 P2002,Cake,Bakery,30' } },
  ]
},
{
  m: 'm2', title: 'Module 2 · Shell script and Git',
  items: [
    { n: '2.1', task: 'Predict the output of a script that compares 100 and 99 twice: once with \\> and once with -gt.', skill: 'String comparison versus number comparison in [ ].', hint: 'One test compares character by character, the other compares values. Decide which is which.' },
    { n: '2.2', task: 'Fill in five blanks (Q1 to Q5) of a script that marks every student folder: list entries, check for a directory, check for assign.cpp, check that compiling worked, check the diff result.', skill: 'The full shell-script pattern of the sample paper and the course notes.', hint: 'Every blank except Q1 is a [ ] test from the file-checking or string tables in the notes. Q1 is command substitution with back quotes. Spacing inside [ ] matters.' },
    { n: '2.3', task: 'Write getProductAccess.sh: from a tab-separated web log, print each IP with the /products/ pages it visited, sorted, without duplicates.', skill: 'cut, grep, sort and uniq in one pipe, with $1 as the file name.', hint: 'Keep only the lines you need, keep only the two fields you need, then sort and remove duplicates. cut uses tab as its default delimiter.' },
    { n: '2.4', task: 'Apply for GitHub Education. Nothing to submit.', skill: 'Not examined. Git commands are examined: see the Module 2 drill.', hint: 'None needed.' },
  ],
  twins: [
    { id: 'cp2a', type: 'short', m: 'm2', kind: 'Predict output', q: 'What does this script print?', lang: 'text', codeLang: 'sh', code: `#!/bin/bash
a=9
b=10
if [ "$a" \\< "$b" ]
then
    echo "string: $a first"
else
    echo "string: $b first"
fi
if [ $a -lt $b ]
then
    echo "number: $a smaller"
else
    echo "number: $b smaller"
fi`,
      ans: `string: 10 first
number: 9 smaller`, why: 'As strings, "10" sorts before "9" because the character 1 comes before 9. As numbers, 9 is smaller than 10.',
      sh: { cmd: `a=9; b=10; if [ "$a" \\< "$b" ]; then echo "string: $a first"; else echo "string: $b first"; fi; if [ $a -lt $b ]; then echo "number: $a smaller"; else echo "number: $b smaller"; fi`, out: 'string: 10 first number: 9 smaller' } },
    { id: 'cp2b', type: 'short', m: 'm2', kind: 'Script', q: 'Write <code>visitors.sh</code>. It takes a log file name as its argument. Each line is <code>ip&lt;TAB&gt;date&lt;TAB&gt;time&lt;TAB&gt;page</code>. Print, once each and sorted, every IP address that visited <code>/index.html</code>.', lang: 'sh',
      ans: `#!/bin/bash
grep "/index.html" $1 | cut -f1 | sort | uniq`, why: 'grep keeps the matching lines, cut -f1 keeps the first tab-separated field, then sort | uniq removes duplicates.',
      sh: { files: { 'log.txt': '10.0.0.7\t2026-11-01\t10:00:00\t/index.html\n10.0.0.2\t2026-11-01\t10:01:00\t/about.html\n10.0.0.2\t2026-11-01\t10:02:00\t/index.html\n10.0.0.7\t2026-11-01\t10:03:00\t/index.html\n' }, cmd: 'grep "/index.html" log.txt | cut -f1 | sort | uniq', out: '10.0.0.2 10.0.0.7' } },
    { id: 'cp2c', type: 'short', m: 'm2', kind: 'Script', q: 'A folder holds a program <code>prog.cpp</code> and test files <code>t1.in t1.out t2.in t2.out ...</code>. Write a script that compiles prog.cpp (printing <code>Compile error</code> and stopping if it fails), then runs every <code>.in</code> file and prints <code>t1: PASS</code> or <code>t1: FAIL</code> by comparing with the matching <code>.out</code> file.', lang: 'sh',
      ans: `#!/bin/bash
rm -f prog
g++ prog.cpp -o prog 2> /dev/null
if [ ! -e prog ]
then
    echo "Compile error"
    exit 1
fi
for f in \`ls *.in\`
do
    name=\${f/.in/}
    ./prog < $f > result.txt
    d=\`diff result.txt $name.out\`
    if [ -z "$d" ]
    then
        echo "$name: PASS"
    else
        echo "$name: FAIL"
    fi
done`, why: 'Compile check by testing that the executable exists. ${f/.in/} strips the extension. diff prints nothing when the files match, so [ -z "$d" ] means PASS.' },
  ]
},
{
  m: 'm3', title: 'Module 3 · C++ basics',
  items: [
    { n: '3.1', task: 'Write the screen output of several cout statements, including a comment line and an assignment.', skill: 'Section B "write the output" basics: strings versus variables, statements that print nothing.', hint: 'Text in double quotes is printed as it is. A commented-out line and an assignment print nothing.' },
    { n: '3.2', task: 'Choose which C++ statements correctly compute y = ax³ − 12.', skill: 'Precedence and brackets.', hint: 'Expand each option by hand and compare with a·x·x·x − 12. Check where each bracket closes.' },
    { n: '3.3', task: 'Evaluate two integer expressions with + − * / %.', skill: 'Precedence and integer division (2019-20 B1, B6).', hint: '* / % first, left to right, then + and −. Every division here is integer division.' },
    { n: '3.4', task: 'Evaluate three % expressions, or state why one is impossible.', skill: 'The % operator and its restrictions.', hint: 'Do the brackets first. Remember which types % can and cannot work on.' },
    { n: '3.5', task: 'Trace a program with const values, cin input and a double assigned to an int.', skill: 'Whole-program tracing with type conversion.', hint: 'Write a table with a, b, p and grade. Watch what happens when a double result is stored in an int.' },
    { n: '3.6 to 3.9', task: 'VPL programs: BMI, read numbers until −1, split a five-digit integer, odd or even.', skill: 'cin / cout, loops with a sentinel, / and % on digits.', hint: 'Match the sample output exactly, including spaces and newlines. The VPL test cases check every character.' },
  ],
  twins: [
    { id: 'cp3a', type: 'trace', m: 'm3', q: 'With <code>x = 3</code> and <code>y = 7</code>, what does this print?', code: R`int x = 3, y = 7, p;
cout << y - x;
cout << " | " << "x";
cout << " | x + y = " << x + y;
p = y * x;
// cout << p;
cout << " | " << y / x << " " << y % x;`, out: '4 | x | x + y = 10 | 2 1', why: 'The quoted "x" is text. The assignment and the comment print nothing. 7 / 3 is 2 and 7 % 3 is 1.' },
    { id: 'cp3b', type: 'mcq', m: 'm3', q: 'Which statement correctly computes <code>y = 2x² + 3x</code>?', opts: ['y = 2 * x * x + 3 * x;', 'y = 2 * x * (x + 3) * x;', 'y = (2 * x) * (x + 3 * x);', 'y = 2 * x ^ 2 + 3 * x;'], a: 0, why: 'B and C put brackets in the wrong place. In C++ ^ is not a power operator (it is bitwise XOR).' },
    { id: 'cp3c', type: 'trace', m: 'm3', q: 'What does this print?', code: R`int x;
x = 8 + 4 * 6 / 3 - 1;
cout << x << " ";
x = 7 % 4 + 2 * 3 / 2;
cout << x;`, out: '15 6', why: '4 * 6 = 24, 24 / 3 = 8, 8 + 8 - 1 = 15. Then 7 % 4 = 3, 2 * 3 / 2 = 3, 3 + 3 = 6.' },
    { id: 'cp3d', type: 'mcq', m: 'm3', q: 'With <code>int x = 4, y = 7, z = 9;</code> and <code>double d = 2.5;</code>, which expression does <em>not</em> compile?', opts: ['(x + z) % y', '(x % y) % z', 'd % x', '(x * z) % y'], a: 2, why: 'The others are 13 % 7 = 6, 4 % 9 = 4 and 36 % 7 = 1. % needs integer operands, so d % x is a compile error.' },
    { id: 'cp3e', type: 'trace', m: 'm3', q: 'The input is <code>6 4</code>. What does this print?', code: R`const int N = 5;
const double Y = 1.5;
int main() {
    int a, b;
    double p;
    cin >> a >> b;
    p = Y * a - b;
    cout << "p = " << p << endl;
    a = N + p;
    cout << "a = " << a << endl;
    cout << "a / b = " << a / b << endl;
}`, out: 'p = 5 a = 10 a / b = 2', stdin: '6 4', why: 'p = 1.5 × 6 − 4 = 5.0, printed as 5. a = 5 + 5.0 = 10. 10 / 4 is integer division, so 2.' },
    { id: 'cp3f', type: 'prog', m: 'm3', marks: 5, title: 'Read until 0', q: 'Read integers until 0 is entered. Print <code>Count = c, Max = m</code> for the numbers before the 0. Assume at least one number comes before the 0.', lang: 'cpp',
      sol: R`#include <iostream>
using namespace std;

int main() {
    int n, count = 0, mx = 0;
    cin >> n;
    while (n != 0) {
        if (count == 0 || n > mx)
            mx = n;
        count++;
        cin >> n;
    }
    cout << "Count = " << count << ", Max = " << mx << endl;
    return 0;
}`, notes: ['Read once before the loop and again at the end of the body, so the sentinel is never processed.', 'Start mx from the first value, not from 0, or an all-negative input gives the wrong maximum.'],
      test: { full: true, stdin: '4 -9 7 2 0', out: 'Count = 4, Max = 7' } },
    { id: 'cp3g', type: 'prog', m: 'm3', marks: 5, title: 'Digits in reverse', q: 'Read a positive integer and print its digits in reverse order separated by single spaces, using only <code>/</code> and <code>%</code> (no strings). Input <code>2113</code> gives <code>3 1 1 2</code>.', lang: 'cpp',
      sol: R`#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    cout << n % 10;          // last digit first
    n /= 10;
    while (n > 0) {
        cout << " " << n % 10;
        n /= 10;
    }
    cout << endl;
    return 0;
}`, notes: ['% 10 gives the last digit, / 10 removes it.', 'Printing the first digit before the loop avoids a trailing space.'],
      test: { full: true, stdin: '2113', out: '3 1 1 2' } },
  ]
},
{
  m: 'm4', title: 'Module 4 · Makefile',
  items: [
    { n: '4.1', task: 'Separate compilation of the GCD example (gcd.h, gcd.cpp, gcd_main.cpp).', skill: 'g++ -c and linking object files.', hint: 'Compile each .cpp with -c, then link the .o files with -o.' },
    { n: '4.2', task: 'Write a Makefile for calc built from calc.cpp, gcd.cpp and lcm.cpp, with a clean target.', skill: 'Sample paper Q2: the dependency graph and a Makefile that rebuilds only what changed.', hint: 'Open each .cpp and list exactly which headers it #includes. Each .o depends on its own .cpp plus those headers. Then test: touch one header, run make, and check that only the right files are recompiled.' },
  ],
  twins: [
    { id: 'cp4a', type: 'short', m: 'm4', kind: 'Makefile', q: 'A game is built from <code>game.cpp</code>, <code>board.cpp</code> and <code>player.cpp</code>. <code>game.cpp</code> includes <code>player.h</code>. <code>player.h</code> itself includes <code>board.h</code>. <code>board.cpp</code> includes <code>board.h</code>. <code>player.cpp</code> includes <code>player.h</code>. Write a Makefile whose default target builds <code>game</code>, using <code>$@ $^ $&lt;</code>, plus a phony <code>clean</code>.', lang: 'make',
      ans: `game: game.o board.o player.o
	g++ $^ -o $@

game.o: game.cpp player.h board.h
	g++ -c $<

board.o: board.cpp board.h
	g++ -c $<

player.o: player.cpp player.h board.h
	g++ -c $<

clean:
	rm -f game game.o board.o player.o

.PHONY: clean`, why: 'Includes are followed all the way down: player.h pulls in board.h, so every object file that includes player.h also depends on board.h.' },
    { id: 'cp4b', type: 'mcq', m: 'm4', q: 'With the game Makefile above already built, you edit <code>board.h</code> and run <code>make</code>. Which files are recompiled?', opts: ['Only board.o', 'board.o and player.o', 'game.o, board.o and player.o, then game is relinked', 'Nothing'], a: 2, why: 'All three object files depend on board.h (two of them through player.h).' },
  ]
},
{
  m: 'm5', title: 'Module 5 · Functions',
  items: [
    { n: '5.1', task: 'Find and fix the errors in two short programs (undeclared names, wrong types, functions inside functions).', skill: 'Section B "fix the bug".', hint: 'Check every name used is declared in that scope, every return type matches what is returned, and that every function body is closed before the next one starts.' },
    { n: '5.2', task: 'Fix a program that calls g() before it is declared, then write the output. g() has a static variable and a reference parameter.', skill: 'Declarations before use, static locals, pass by reference.', hint: 'A static local keeps its value between calls and is initialised only once. The reference parameter changes x or y in main, so later calls see the new values.' },
    { n: '5.3', task: 'State the scope of a global variable, a parameter and a for-loop variable.', skill: 'Scope (2019-20 B2).', hint: 'Say exactly where each name can be used: from where to where.' },
    { n: '5.4', task: 'Trace a function with two reference and two value parameters, then again with all four as references.', skill: 'Pass by value versus by reference.', hint: 'Copy the four values into the parameters, run the body line by line, and only copy back the ones that are references.' },
    { n: '5.5 and later', task: 'VPL programs: birthday (reference), mean and standard deviation, perfect numbers, prime numbers, vowels.', skill: 'Writing small functions: bool tests, loops over divisors, character tests.', hint: 'Test each function on a value you can check by hand (6 is perfect, 7 is prime, "Apple" has 2 vowels).' },
  ],
  twins: [
    { id: 'cp5a', type: 'trace', m: 'm5', q: 'What does this print?', code: R`void tick(int &k) {
    static int calls = 0;
    calls++;
    k += calls;
    cout << calls << ":" << k << " ";
}
int main() {
    int a = 10, b = 20;
    tick(a);
    tick(b);
    tick(a);
}`, out: '1:11 2:22 3:14', why: 'calls is static, so it counts 1, 2, 3 across all calls. a becomes 11, b becomes 22, then a becomes 11 + 3 = 14.' },
    { id: 'cp5b', type: 'trace', m: 'm5', q: 'What does this print?', code: R`void f(int &p, int q, int &r) {
    int w = p;
    p = q * 2;
    q = r;
    r = w + q;
}
int main() {
    int a = 1, b = 2, c = 3;
    f(a, b, c);
    cout << a << " " << b << " " << c;
}`, out: '4 2 4', why: 'p and r refer to a and c. a = 2 × 2 = 4. q (a copy of b) becomes 3, so c = 1 + 3 = 4. b is unchanged.' },
    { id: 'cp5c', type: 'short', m: 'm5', kind: 'Fix the bug', q: 'This program should print <code>7.5</code>. Find every error and give the fix.', code: R`line 1: #include <iostream>
line 2: using namespace std;
line 3: int main() {
line 4:     cout << average(5, 10);
line 5: }
line 6: int average(int a, int b) {
line 7:     return (a + b) / 2;
line 8: }`, lang: 'cpp',
      ans: R`Move the function above main (or add the prototype  double average(int a, int b);  above main), and
line 6: double average(int a, int b) {
line 7:     return (a + b) / 2.0;`, why: 'Three problems: average is used before it is declared; the return type int would cut 7.5 to 7; and (a + b) / 2 is integer division.' },
    { id: 'cp5d', type: 'mcq', m: 'm5', q: 'In this program, where can <code>total</code>, <code>n</code> and <code>i</code> each be used?', code: R`int total = 0;
void add(int n) { total += n; }
int main() {
    for (int i = 1; i <= 3; i++) add(i);
    cout << total;
}`, opts: ['All three anywhere', 'total: anywhere after its declaration; n: only inside add; i: only inside the for loop', 'total: only in main; n and i: anywhere', 'total and n: only in add; i: in main'], a: 1, why: 'total is global. A parameter belongs to its function. A variable declared in the for header lives only in that loop.' },
    { id: 'cp5e', type: 'prog', m: 'm5', marks: 5, title: 'Armstrong numbers', q: 'Write <code>bool isArmstrong(int n)</code> for three-digit n: true when the sum of the cubes of its digits equals n. Then print every Armstrong number from 100 to 999 on one line.', lang: 'cpp',
      sol: R`#include <iostream>
using namespace std;

bool isArmstrong(int n) {
    int sum = 0, t = n;
    while (t > 0) {
        int d = t % 10;
        sum += d * d * d;
        t /= 10;
    }
    return sum == n;
}

int main() {
    for (int i = 100; i <= 999; i++)
        if (isArmstrong(i))
            cout << i << " ";
    cout << endl;
    return 0;
}`, notes: ['Work on a copy (t) so n is still available for the final comparison.'], test: { full: true, out: '153 370 371 407' } },
    { id: 'cp5f', type: 'prog', m: 'm5', marks: 5, title: 'Three outputs through references', q: 'Write <code>void stats(int a, int b, int c, int &amp;mn, int &amp;mx, double &amp;avg)</code>, then read three integers and print <code>min max avg</code>.', lang: 'cpp',
      sol: R`#include <iostream>
using namespace std;

void stats(int a, int b, int c, int &mn, int &mx, double &avg) {
    mn = a; mx = a;
    if (b < mn) mn = b;
    if (c < mn) mn = c;
    if (b > mx) mx = b;
    if (c > mx) mx = c;
    avg = (a + b + c) / 3.0;
}

int main() {
    int a, b, c, mn, mx;
    double avg;
    cin >> a >> b >> c;
    stats(a, b, c, mn, mx, avg);
    cout << mn << " " << mx << " " << avg << endl;
    return 0;
}`, notes: ['A function returns one value; reference parameters give back more.', 'Divide by 3.0, not 3.'], test: { full: true, stdin: '4 9 2', out: '2 9 5' } },
  ]
},
{
  m: 'm6', title: 'Module 6 · Arrays and strings',
  items: [
    { n: '6.1', task: 'Correct three array declarations (a 2D initialiser, a partial initialiser, a char array).', skill: 'Array sizes and initialiser lists.', hint: 'Count rows and columns in the declaration and compare with the braces. Too few values is legal; too many is not.' },
    { n: '6.2', task: 'Trace a program that passes arrays to a function, then predict what happens with a larger size argument.', skill: 'Array parameters and out-of-bound access.', hint: 'Check every index the loop touches against the real array sizes. Going past the end is not a compile error.' },
    { n: '6.3', task: 'Find the maximum and minimum of a 2×2×3 double array.', skill: 'Nested loops over multi-dimensional arrays.', hint: 'Start both max and min from the first element, not from 0. One loop per dimension.' },
    { n: '6.4 to 6.7', task: 'VPL programs: array manipulation, variance, replace every occurrence of a word, palindrome ignoring case and punctuation.', skill: 'string::find, replace, length; char tests.', hint: 'When replacing, continue searching after the text you just inserted, or a replacement that contains the search word loops forever.' },
  ],
  twins: [
    { id: 'cp6a', type: 'mcq', m: 'm6', q: 'Which declaration is correct as written?', opts: ['int a[2][3] = {{1, 2, 3, 4}};', 'char s[5] = "hello";', 'int b[2][2] = {{1}, {2, 3}};', 'double c[] = {};'], a: 2, why: 'A: a row has only 3 columns. B: "hello" needs 6 chars including the terminator. D: an array cannot have size 0, so an empty list with no size is an error. In C, missing values become 0: b is {{1, 0}, {2, 3}}.' },
    { id: 'cp6b', type: 'trace', m: 'm6', q: 'What does this print?', code: R`int x[2][3][2] = { { {1, 2}, {3, 4}, {5, 6} },
                   { {-1, 0}, {7, 8}, {2, 2} } };
for (int i = 0; i < 2; i++) {
    int sum = 0;
    for (int j = 0; j < 3; j++)
        for (int k = 0; k < 2; k++)
            sum += x[i][j][k];
    cout << "Layer " << i << ": " << sum << endl;
}`, out: 'Layer 0: 21 Layer 1: 18', why: 'Layer 0: 1+2+3+4+5+6 = 21. Layer 1: −1+0+7+8+2+2 = 18.' },
    { id: 'cp6c', type: 'prog', m: 'm6', marks: 5, title: 'Count a word', q: 'Read a line, then a word on the next line. Print how many times the word appears in the line (non-overlapping), using <code>string::find</code>.', lang: 'cpp',
      sol: R`#include <iostream>
#include <string>
using namespace std;

int main() {
    string line, word;
    getline(cin, line);
    cin >> word;
    int count = 0;
    size_t pos = line.find(word);
    while (pos != string::npos) {
        count++;
        pos = line.find(word, pos + word.length());   // continue after this match
    }
    cout << count << endl;
    return 0;
}`, notes: ['find(word, pos) starts searching at pos.', 'Moving on by word.length() makes the matches non-overlapping.'], test: { full: true, stdin: 'the cat and the hat sat by the theatre\nthe\n', out: '4' } },
    { id: 'cp6d', type: 'prog', m: 'm6', marks: 5, title: 'Anagrams', q: 'Read two words. Print <code>yes</code> if they are anagrams of each other ignoring capital letters (Listen / Silent), otherwise <code>no</code>.', lang: 'cpp',
      sol: R`#include <iostream>
#include <string>
#include <algorithm>
#include <cctype>
using namespace std;

string key(string s) {
    for (int i = 0; i < (int)s.length(); i++)
        s[i] = tolower(s[i]);
    sort(s.begin(), s.end());
    return s;
}

int main() {
    string a, b;
    cin >> a >> b;
    cout << (key(a) == key(b) ? "yes" : "no") << endl;
    return 0;
}`, notes: ['Two words are anagrams when their sorted, lower-case letters are equal.', 's is passed by value, so the caller\'s word is not changed.'], test: { full: true, stdin: 'Listen Silent', out: 'yes' } },
  ]
},
{
  m: 'm7', title: 'Module 7 · Structs, file I/O, recursion',
  items: [
    { n: '7.1', task: 'Correct a file-opening statement that passes several mode flags.', skill: 'open() syntax: the file name is a string, and modes are combined into one argument.', hint: 'Look at how many arguments open() takes and how two ios flags are combined into one value.' },
    { n: '7.2', task: 'Register on LeetCode and solve Problem 1, Two Sum, with a screenshot.', skill: 'vector practice.', hint: 'Two nested loops over the vector are enough to pass.' },
    { n: '7.3 and later', task: 'VPL programs: report temperatures from a file, reverse a string recursively, a struct-based course command program.', skill: 'getline + istringstream, fixed + setprecision, recursion on substr, arrays of structs.', hint: 'For the recursive reverse: the reverse of s is the reverse of everything after the first character, followed by the first character.' },
  ],
  twins: [
    { id: 'cp7a', type: 'mcq', m: 'm7', q: 'Which line correctly opens <code>log.txt</code> for output, appending to what is already there?', opts: ['f.open(log.txt, ios::app);', 'f.open("log.txt", ios::out, ios::app);', 'f.open("log.txt", ios::out | ios::app);', 'f.open("log.txt" | ios::app);'], a: 2, why: 'The name is a string literal. Several modes are combined with | into a single second argument.' },
    { id: 'cp7b', type: 'prog', m: 'm7', marks: 10, title: 'Average per line', q: '<code>scores.txt</code> has one student per line: a name followed by any number of integer scores. Print each name with the average score to 1 decimal place, e.g. <code>Amy 80.0</code>.', lang: 'cpp',
      sol: R`#include <iostream>
#include <fstream>
#include <sstream>
#include <iomanip>
#include <string>
#include <cstdlib>
using namespace std;

int main() {
    ifstream fin("scores.txt");
    if (fin.fail()) {
        cout << "Error opening file" << endl;
        exit(1);
    }
    string line, name;
    cout << fixed << setprecision(1);
    while (getline(fin, line)) {
        istringstream iss(line);
        iss >> name;
        int x, sum = 0, n = 0;
        while (iss >> x) {
            sum += x;
            n++;
        }
        cout << name << " " << (double)sum / n << endl;
    }
    fin.close();
    return 0;
}`, notes: ['getline gives one whole line; a fresh istringstream per line splits it.', 'The number of scores varies, so loop on iss >> x.'], test: { full: true, files: { 'scores.txt': 'Amy 70 80 90\nBen 55 64\nCat 100\n' }, out: 'Amy 80.0 Ben 59.5 Cat 100.0' } },
    { id: 'cp7c', type: 'prog', m: 'm7', marks: 5, title: 'Recursive character count', q: 'Write a recursive function <code>int countChar(string s, char c)</code> that returns how many times c occurs in s. No loops.', lang: 'cpp',
      sol: R`int countChar(string s, char c) {
    if (s.length() == 0)
        return 0;                                    // base case
    int rest = countChar(s.substr(1), c);           // smaller problem
    return rest + (s[0] == c ? 1 : 0);
}`, notes: ['Base case: the empty string contains no c.', 'substr(1) is everything after the first character.'], test: { main: R`cout << countChar("mississippi", 's') << countChar("", 'a') << countChar("aaa", 'a');`, out: '403' } },
    { id: 'cp7d', type: 'prog', m: 'm7', marks: 10, title: 'Struct commands', q: 'Store up to 10 items as <code>struct Item { string name; int qty; };</code>. Read commands until <code>quit</code>: <code>add NAME QTY</code> stores an item; <code>show NAME</code> prints <code>NAME: QTY</code> or <code>NAME not found</code>.', lang: 'cpp',
      sol: R`#include <iostream>
#include <string>
using namespace std;

struct Item {
    string name;
    int qty;
};

int main() {
    Item items[10];
    int n = 0;
    string cmd, name;
    while (cin >> cmd && cmd != "quit") {
        if (cmd == "add") {
            cin >> items[n].name >> items[n].qty;
            n++;
        } else if (cmd == "show") {
            cin >> name;
            bool found = false;
            for (int i = 0; i < n; i++)
                if (items[i].name == name) {
                    cout << name << ": " << items[i].qty << endl;
                    found = true;
                }
            if (!found)
                cout << name << " not found" << endl;
        }
    }
    return 0;
}`, notes: ['Read the command word first, then the arguments that command needs.', 'An array of structs keeps each name and quantity together.'], test: { full: true, stdin: 'add pen 3\nadd cup 7\nshow cup\nshow ink\nquit\n', out: 'cup: 7 ink not found' } },
  ]
},
{
  m: 'm8', title: 'Module 8 · Pointers and linked lists',
  items: [
    { n: '8.x mode', task: 'Read n numbers into a dynamic array and find the mode (most frequent value).', skill: 'new int[n], loops over a dynamic array, delete [].', hint: 'Count how often each element occurs; keep the best count and its value. Think about which value wins a tie, as the sample output decides.' },
    { n: '8.x train', task: 'A train of cars as a linked list: append cars at the end and print the train.', skill: 'Tail insertion and traversal (2019-20 C2).', hint: 'Appending must handle the empty train separately: then the new car becomes the head.' },
  ],
  twins: [
    { id: 'cp8a', type: 'prog', m: 'm8', marks: 5, title: 'Above average', q: 'Read n, then n integers into a dynamic array. Print the values that are greater than the average, in input order, then free the array.', lang: 'cpp',
      sol: R`#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int *a = new int[n];
    double sum = 0;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        sum += a[i];
    }
    double avg = sum / n;
    for (int i = 0; i < n; i++)
        if (a[i] > avg)
            cout << a[i] << " ";
    cout << endl;
    delete [] a;
    return 0;
}`, notes: ['Two passes: one to sum, one to compare.', 'new[] pairs with delete [].'], test: { full: true, stdin: '5\n3 9 4 10 1\n', out: '9 10' } },
    { id: 'cp8b', type: 'prog', m: 'm8', marks: 10, title: 'Train operations', q: 'With <code>struct Car { string id; Car *next; };</code> write <code>void addFront(Car *&amp;head, string id)</code>, <code>void removeLast(Car *&amp;head)</code> and <code>int length(Car *head)</code>.', lang: 'cpp',
      given: R`struct Car {
    string id;
    Car *next;
};
`,
      sol: R`void addFront(Car *&head, string id) {
    Car *c = new Car;
    c->id = id;
    c->next = head;
    head = c;
}

void removeLast(Car *&head) {
    if (head == NULL) return;
    if (head->next == NULL) {          // only one car
        delete head;
        head = NULL;
        return;
    }
    Car *cur = head;
    while (cur->next->next != NULL)    // stop at the second-last car
        cur = cur->next;
    delete cur->next;
    cur->next = NULL;
}

int length(Car *head) {
    int n = 0;
    for (Car *p = head; p != NULL; p = p->next)
        n++;
    return n;
}`, notes: ['removeLast needs three cases: empty, one car, several cars.', 'length uses its own pointer, so head is not lost.'],
      test: { pre: R`void show(Car *h) { for (Car *p = h; p != NULL; p = p->next) cout << p->id << " "; cout << "| "; }
`, main: R`Car *t = NULL; addFront(t, "C3"); addFront(t, "C2"); addFront(t, "C1"); show(t); removeLast(t); show(t); cout << length(t) << " "; removeLast(t); removeLast(t); removeLast(t); cout << length(t);`, out: 'C1 C2 C3 | C1 C2 | 2 0' } },
  ]
},
{
  m: 'm10', title: 'Module 10 · C and GDB',
  items: [
    { n: '10.1', task: 'Rewrite the C++ election program (automatic seats and remainders) in C.', skill: 'cin/cout to scanf/printf.', hint: 'Every cin >> x becomes scanf with the right specifier and &x. Every cout chain becomes one printf with \\n at the end. Compare your output with the sample character by character.' },
    { n: '10.2a', task: 'Finish sincos.c: read a degree, write GetSinCos() with two output parameters, print the results.', skill: 'Pass by reference in C with pointers.', hint: 'The two outputs must be pointers in the function and addresses in the call. Compile with -lm.' },
    { n: '10.2b', task: 'Finish string2.c: convert every capital letter in a word to lower case.', skill: 'C-strings, strlen, character arithmetic.', hint: 'An array name is already an address, so neither scanf nor the function call needs &.' },
    { n: '10.3', task: 'Employee system in C: struct + typedef, malloc an array, set fields through a pointer, print, free.', skill: 'malloc / free, typedef, -> versus ., strcpy.', hint: 'Inside a function that receives a pointer use ->; with a struct passed by value use the dot. Strings are copied with strcpy, never with =.' },
    { n: '10.4', task: 'GDB questions: two ways to debug, why GDB shows no line numbers, breakpoints, values at a breakpoint, resuming, and fixing a scanf/printf bug.', skill: 'GDB commands and the most common C I/O mistakes.', hint: 'Execution stops before the breakpoint line runs. Look up the GDB command that continues to the next breakpoint. Check which printf and scanf arguments need & and which must not have it.' },
  ],
  twins: [
    { id: 'cp10a', type: 'prog', m: 'm10', marks: 10, title: 'C: pass or fail', q: 'Write a <strong>C</strong> program that reads n, then n integer marks, prints <code>Mark i: m PASS</code> or <code>FAIL</code> for each (pass is 50 or more), and finally <code>Passed: p/n</code>.', lang: 'c',
      sol: R`#include <stdio.h>

int main() {
    int n, mark, passed = 0;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        scanf("%d", &mark);
        if (mark >= 50) {
            printf("Mark %d: %d PASS\n", i, mark);
            passed++;
        } else {
            printf("Mark %d: %d FAIL\n", i, mark);
        }
    }
    printf("Passed: %d/%d\n", passed, n);
    return 0;
}`, notes: ['scanf needs &; printf does not.'], test: { full: true, stdin: '3\n72 49 50\n', out: 'Mark 1: 72 PASS Mark 2: 49 FAIL Mark 3: 50 PASS Passed: 2/3' } },
    { id: 'cp10b', type: 'prog', m: 'm10', marks: 5, title: 'C: min and max through pointers', q: 'Write the C function <code>void minmax(int a[], int n, int *mn, int *mx)</code> and show how main calls it for an array <code>v</code> of 5 ints.', lang: 'c',
      sol: R`#include <stdio.h>

void minmax(int a[], int n, int *mn, int *mx) {
    *mn = a[0];
    *mx = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] < *mn) *mn = a[i];
        if (a[i] > *mx) *mx = a[i];
    }
}

int main() {
    int v[5] = {4, -2, 9, 0, 3};
    int lo, hi;
    minmax(v, 5, &lo, &hi);      /* array: no &; outputs: & */
    printf("%d %d\n", lo, hi);
    return 0;
}`, notes: ['C has no reference parameters: pass addresses and dereference inside.'], test: { full: true, out: '-2 9' } },
    { id: 'cp10c', type: 'prog', m: 'm10', marks: 10, title: 'C: book records', q: 'In <strong>C</strong>: define <code>struct Book { char title[50]; int pages; };</code> with a typedef <code>Book</code>. Read n, malloc an array of n Books, read each title (one word) and page count through a function <code>void setBook(char t[], int p, Book *b)</code>, print <code>title (pages pages)</code> for each with a function taking a Book by value, then free the array.', lang: 'c',
      sol: R`#include <stdio.h>
#include <string.h>
#include <stdlib.h>

struct Book {
    char title[50];
    int pages;
};
typedef struct Book Book;

void setBook(char t[], int p, Book *b) {
    strcpy(b->title, t);
    b->pages = p;
}

void showBook(Book b) {
    printf("%s (%d pages)\n", b.title, b.pages);
}

int main() {
    int n;
    scanf("%d", &n);
    Book *books = (Book *)malloc(sizeof(Book) * n);
    char t[50];
    int p;
    for (int i = 0; i < n; i++) {
        scanf("%s%d", t, &p);
        setBook(t, p, &books[i]);       /* or books + i */
    }
    for (int i = 0; i < n; i++)
        showBook(books[i]);
    free(books);
    return 0;
}`, notes: ['strcpy for the title, -> through the pointer, . on the copy.', 'sizeof(Book) * n bytes for n books.'], test: { full: true, stdin: '2\nDune 412\nEmma 320\n', out: 'Dune (412 pages) Emma (320 pages)' } },
    { id: 'cp10d', type: 'mcq', m: 'm10', q: 'A breakpoint is set on line 6 and the program is run. What are <code>i</code> and <code>sum</code> at the <em>first</em> pause, and after the command <code>c</code>?', code: R`line 3: int main() {
line 4:     int sum = 0;
line 5:     for (int i = 1; i <= 5; i++) {
line 6:         sum += i * i;
line 7:     }
line 8:     printf("%d\n", sum);`, opts: ['i = 1, sum = 1; then i = 2, sum = 5', 'i = 1, sum = 0; then i = 2, sum = 1', 'i = 0, sum = 0; then i = 1, sum = 1', 'i = 5, sum = 55; then the program ends'], a: 1, why: 'GDB pauses before line 6 runs, so sum is still 0. c (continue) runs until the breakpoint is hit again: line 6 has run once (sum = 1) and i is now 2.' },
    { id: 'cp10e', type: 'short', m: 'm10', kind: 'Fix the bug', q: 'This C program should read two numbers and print their average to 2 decimal places. Fix every error.', code: R`line 1: #include <stdio.h>
line 2: int main() {
line 3:     double a, b;
line 4:     scanf("%f %f", a, b);
line 5:     printf("Average = %.2f\n", &(a + b) / 2);
line 6:     return 0;
line 7: }`, lang: 'c',
      ans: R`line 4:     scanf("%lf %lf", &a, &b);
line 5:     printf("Average = %.2f\n", (a + b) / 2);`, why: 'scanf needs %lf for double and the addresses of a and b. printf needs the value, not an address.' },
  ]
},
];
})();
