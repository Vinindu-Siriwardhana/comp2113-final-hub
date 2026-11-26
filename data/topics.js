/* COMP2113 Final Hub — topic notes, built from the course module notes.
   R = String.raw so C/C++ backslashes survive. Shell snippets that need a
   backquote or ${...} use ordinary template literals with escapes. */
const R = String.raw;

window.TOPICS = [
{
  id: 'm1', n: '1', title: 'Linux Environment',
  blurb: 'Section A opens with Linux command MCQs, and Section B asks you to build a pipe. Free marks if you know the flags.',
  cards: [
    { id: 'm1-nav', t: 'Files and directories', lang: 'sh', pp: '2019-20 A3, A4, A5 · 2021-22 A1, A2',
      code: `pwd                 # print working directory
ls -l -a            # long listing, include hidden files
cd ..   cd ~        # parent directory / home directory
mkdir lab           # make a directory
rmdir lab           # remove an EMPTY directory
rm -r lab           # remove a directory and everything in it
cp a.txt b.txt      # copy        (cp -r for directories)
mv a.txt docs/      # move, or rename: mv old new
cat a.txt           # print a file's content
touch a.txt         # create an empty file
man wc              # manual page of a command`,
      pts: ['<code>.</code> is the current directory, <code>..</code> the parent, <code>~</code> your home.',
            '<code>echo 1.txt</code> prints the text "1.txt", not the file. <code>cat</code> prints the file.',
            '<code>man cmd</code> shows a command\'s options.'],
      trap: '<code>rmdir</code> fails on a non-empty directory. You need <code>rm -r</code>.' },
    { id: 'm1-perm', t: 'File permissions and chmod', lang: 'sh', pp: 'Sample Q1(b)',
      code: `-rwxr-x--x  1 kit ra  50 Jul 30 17:07 run.sh
#  type | user | group | other
#   -   | rwx  | r-x   | --x        (d = directory)

chmod u+x run.sh      # add execute for the user (owner)
chmod o-w file        # take write away from others
chmod a=r file        # everyone: read only
chmod go+rx file      # several at once
chmod 754 file        # rwx r-x r--   (r=4, w=2, x=1)
chmod 400 foo.txt     # r-- --- ---   read-only for the owner`,
      pts: ['Format: <code>chmod [who][operator][permission] file</code>. who = u, g, o, a. operator = +, -, =.',
            'Numeric form: add r=4, w=2, x=1 for each of user, group, other.',
            'A script needs <code>x</code> before <code>./script.sh</code> will run.'],
      trap: 'The indicator is 10 characters: 1 type character, then 3 + 3 + 3. Count positions carefully in grep questions.' },
    { id: 'm1-text', t: 'Text tools: grep, wc, sort, cut, uniq, diff', lang: 'sh', pp: '2019-20 A1, A2, B5 · 2021-22 A3, A5, B5',
      code: `grep 'abc' file          # lines containing abc (case sensitive)
wc file                  # lines  words  bytes
wc -l file   wc -w file   wc -c file
sort file                # alphabetical
sort -n file             # numeric          sort -r : reverse
sort -t, -k3 -n file     # comma-separated, sort by 3rd field
cut -d' ' -f1,3 file     # columns 1 and 3, space delimiter
cut -d, -f2-4 file       # columns 2 to 4, comma delimiter
uniq file                # drop ADJACENT duplicate lines
diff fileA fileB         # how to turn fileA into fileB
head -15 file   tail -3 file`,
      pts: ['Field numbers in <code>cut -f</code> and <code>sort -k</code> start at 1.',
            '<code>sort</code> uses <code>-t</code> for the separator, <code>cut</code> uses <code>-d</code>. Do not mix them up.',
            'diff codes: <code>0a1</code> add, <code>2,3c3</code> change, <code>1d0</code> delete. <code>&lt;</code> lines come from the first file, <code>&gt;</code> from the second.'],
      trap: '<code>uniq</code> only removes adjacent duplicates, so the usual idiom is <code>sort file | uniq</code>. Plain <code>sort</code> puts "10" before "2"; use <code>-n</code>.' },
    { id: 'm1-redir', t: 'Redirection and pipes', lang: 'sh', pp: '2019-20 B5 · 2021-22 A4, B5',
      code: `ls -l > files.txt          # stdout to a file (overwrite)
wc data.txt >> result.txt  # append
g++ a.cpp -o a 2> err.txt  # stderr to a file
cmd > out.txt 2>&1         # stdout and stderr to the same file
cmd 1>/dev/null 2>&1       # throw all output away
./add < input.txt > output.txt

# pipe: output of the left command is the input of the right one
grep "wonderful" day.txt | sort | head -15 | wc -c
sort -k3 -n data.txt | cut -d' ' -f2,3 > result.txt`,
      pts: ['File descriptors: 0 = stdin, 1 = stdout, 2 = stderr.',
            'A pipe needs no temporary file. Read it left to right, one transformation per stage.'],
      trap: '<code>&gt;</code> wipes the file first. <code>&gt;&gt;</code> appends. <code>2&gt;&amp;1</code> must come after the stdout redirect.' },
    { id: 'm1-find', t: 'find and grep -E regular expressions', lang: 'sh',
      code: `find . -name "hello.*" -type f     # files, from current dir down
find . -name "lab" -type d         # directories only

grep -E '.ell' f      # .  any single character
grep -E '^The' f      # ^  start of line        $  end of line
grep -E 'colou?r' f   # ?  zero or one   +  one or more   *  zero or more
grep -E '[0-9]+' f    # [] any one character from the set / range
grep -E '(ab){3}' f   # {n} exactly n   {n,} at least n   {n,m} between
grep -E '3\.5' f      # \. a literal dot
ls -l | grep -E '^...x..x..x'   # executable by user, group and other`,
      pts: ['Use <code>-E</code> for extended regular expressions.',
            '<code>grep -v</code> inverts the match, <code>-i</code> ignores case, <code>-c</code> counts matching lines.'],
      trap: '<code>*</code> in grep means "zero or more of the previous character". In the shell (<code>ls *.cpp</code>) it means "any string". Different tools, different meaning.' },
  ]
},
{
  id: 'm2', n: '2', title: 'Shell Script and Git',
  blurb: 'The sample paper asks for complete, runnable scripts. Spacing rules cost marks more often than logic does.',
  cards: [
    { id: 'm2-var', t: 'Variables, read, quoting', lang: 'sh',
      code: `#!/bin/bash
pet="dog"              # NO spaces around =
echo $pet              # $ to read the value
read name              # no $ when setting
echo "Hello $name"     # double quotes: $ is substituted
echo 'Hello $name'     # single quotes: printed literally
echo "\\$name = $name"  # \\ escapes the special meaning
echo -n "no newline"`,
      pts: ['Every script starts with <code>#!/bin/bash</code> and needs <code>chmod u+x</code> before <code>./script.sh</code>.',
            'Shell has only one variable type: string.',
            'Unquoted values only work for a single word: <code>a=Apple pie</code> tries to run a command called pie.'],
      trap: '<code>pet = "dog"</code> is an error (shell looks for a command named pet). Single quotes never substitute.' },
    { id: 'm2-sub', t: 'Command substitution and string operations', lang: 'sh', pp: '2023 quiz Q1',
      code: `a="\`cat file.txt\`"                       # output of a command
n="\`wc -l file.txt | cut -d\\" \\" -f1\`"    # just the number of lines

s="Apple Pie"
echo \${#s}           # 9      length
echo \${s:6:3}        # Pie    substring from index 6, length 3
echo \${s/Pie/juice}  # Apple juice   replace FIRST occurrence

a=10
let "b = $a + 9"     # arithmetic: + - * / %
echo $b              # 19`,
      pts: ['Backquotes run the command and substitute its output.',
            'String index starts at 0 in <code>${s:pos:len}</code>.',
            'Inside a double-quoted backquote expression, inner double quotes must be escaped as <code>\\"</code>.'],
      trap: '<code>wc -l file</code> prints "3 file.txt". You must <code>cut</code> the first field to get just 3.' },
    { id: 'm2-args', t: 'Command line arguments', lang: 'sh', pp: '2021-22 B4, 2023 quiz Q1',
      code: `#!/bin/bash
echo "There are $# arguments"
echo "$0"     # the script name
echo "$1"     # first argument
echo "\${10}"  # tenth argument needs braces`,
      pts: ['<code>$#</code> is the number of arguments, <code>$0</code> the script name, <code>$1</code>..<code>$9</code> the arguments.'],
      trap: '<code>$10</code> is read as <code>$1</code> followed by the character 0.' },
    { id: 'm2-if', t: 'if / elif / else and conditions', lang: 'sh',
      code: `if [ "$ans" == "Y" ]        # spaces inside [ ] are required
then
    echo "yes"
elif [ $a -lt 10 ]
then
    echo "small"
else
    echo "other"
fi

# strings:  ==  !=  \\>  \\<      [ "$s" ] true if non-empty
# numbers:  -eq -ne -lt -le -gt -ge
# files:    -e exists   -f is a file   -d is a directory
#           -s size > 0   -r readable   -w writable   -x executable`,
      pts: ['Quote string variables in tests so spaces inside the value do not break the test.',
            'Use <code>-eq</code> family for numbers: with <code>==</code>, "05" and "5" are different strings.',
            'Compilation check: run g++ then test <code>[ -e program ]</code>.'],
      trap: '<code>[$a -eq 1]</code> without spaces is a syntax error. <code>&gt;</code> inside <code>[ ]</code> must be escaped, or it becomes a redirect.' },
    { id: 'm2-for', t: 'for loops and the marking-script pattern', lang: 'sh', pp: 'Sample Q1(a)',
      code: `for i in 1 2 3 4 5
do
    echo "This is iteration $i"
done

list="\`ls *.cpp\`"
for f in $list
do
    cp $f "$f.backup"
done

for i in {0..100..3}; do echo $i; done     # 0 3 6 ... 99

g++ hello.cpp -o hello 2> error.txt
if [ -e hello ]; then ./hello; else cat error.txt; fi
cp a b 1>/dev/null 2>&1                    # hide output
echo "$0: failed" >&2                      # write to stderr`,
      pts: ['The loop variable takes each space-separated item of the list.',
            'Loop body sits between <code>do</code> and <code>done</code>.',
            'while loops and shell functions are out of syllabus in the course notes.'],
      trap: 'If you write <code>then</code> or <code>do</code> on the same line as the condition, you need a <code>;</code> before it.' },
    { id: 'm2-git', t: 'Git version control', lang: 'sh',
      code: `git init                    # make a repository here
git clone <url>             # copy a remote repository
git status                  # what changed, what is staged
git add file.cpp            # stage
git commit -m "message"     # record the staged snapshot
git log                     # history
git diff                    # unstaged changes
git branch feature          # create a branch
git checkout feature        # switch to it
git merge feature           # merge feature into the current branch
git remote add origin <url>
git push origin main        # upload commits
git pull                    # fetch and merge remote changes`,
      pts: ['Three areas: working directory, staging area (after <code>add</code>), repository (after <code>commit</code>).',
            '<code>pull</code> = fetch + merge. <code>clone</code> is for the first copy only.'],
      trap: '<code>git commit</code> only records what was staged with <code>git add</code>.' },
  ]
},
{
  id: 'm3', n: '3', title: 'C++ Basics',
  blurb: 'Integer division, operator precedence and short-circuiting drive most "write the output" questions.',
  cards: [
    { id: 'm3-types', t: 'Types, integer division and casting', lang: 'cpp', pp: '2019-20 B1, B6, Sample Q3',
      code: R`int a = 7 / 2;          // 3      integer division truncates
double b = 7 / 2;       // 3.0    still integer division first
double c = 7 / 2.0;     // 3.5
int r = 7 % 3;          // 1      remainder (ints only)
int d = (int)3.99;      // 3      truncation, not rounding
char ch = 'A' + 1;      // 'B'    chars are small integers
int digit = '7' - '0';  // 7
const int SIZE = 10;    // cannot be changed later

int x = 1234;
int mid = x / 10 % 100; // 23  (drop last digit, keep two)`,
      pts: ['If both operands are int, the result is int. One double operand makes it double.',
            '<code>x % 10</code> is the last digit. <code>x / 10</code> removes the last digit.',
            'An uninitialised local variable holds garbage, not 0.'],
      trap: '<code>int slope = dy / dx;</code> silently throws the fraction away. This is the bug in Sample Q3.' },
    { id: 'm3-ops', t: 'Operators: ++, compound assignment, logic', lang: 'cpp', pp: '2019-20 A6, B1, B2 · 2021-22 A9, B1',
      code: R`int i = 5;
int a = i++;     // a = 5, i = 6   (use, then increment)
int b = ++i;     // b = 7, i = 7   (increment, then use)
i += 3;          // i = i + 3

// && and || short-circuit, left to right
if (n != 0 && 10 / n > 1) { }   // safe: second part skipped when n == 0

// any non-zero value is true
if (num - 65)    // same as  if (num != 65)
if (!(num - 65)) // same as  if (num == 65)

x = 5;   // assignment          x == 5  // comparison`,
      pts: ['Precedence: <code>!</code>, then <code>* / %</code>, then <code>+ -</code>, then <code>&lt; &gt;</code>, then <code>== !=</code>, then <code>&amp;&amp;</code>, then <code>||</code>.',
            '<code>&amp;&amp;</code> stops at the first false, <code>||</code> at the first true.'],
      trap: '<code>if (x = 5)</code> assigns and is always true. <code>return (a = b);</code> returns b, not a comparison.' },
    { id: 'm3-flow', t: 'if, switch, loops', lang: 'cpp', pp: '2021-22 B8',
      code: R`if (x > 0) { } else if (x == 0) { } else { }

switch (grade) {
  case 'A': cout << "top"; break;   // without break, execution falls through
  case 'B': cout << "good"; break;
  default:  cout << "other";
}

for (int i = 0; i < n; i++) { }
while (cond) { }
do { } while (cond);     // body runs at least once

break;      // leave the nearest loop / switch
continue;   // jump to the next iteration`,
      pts: ['<code>do...while</code> ends with a semicolon and always runs once.',
            'Without braces, only the next single statement belongs to the if or loop.'],
      trap: 'A stray <code>;</code> after <code>for (...)</code> or <code>if (...)</code> makes the body empty. Missing <code>break</code> in switch falls into the next case.' },
    { id: 'm3-io', t: 'cin, cout and output formatting', lang: 'cpp',
      code: R`#include <iostream>
#include <iomanip>
using namespace std;

int a; double d; string s;
cin >> a >> d >> s;          // skips whitespace, stops at whitespace
cout << a << " " << d << endl;

cout << fixed << setprecision(2) << 3.14159;   // 3.14
cout << setw(6) << 42;                         //     42  (right aligned)
cout << left << setw(6) << 42 << "|";          // 42    |
cout << setfill('0') << setw(5) << 42;         // 00042`,
      pts: ['<code>setw</code> applies to the next item only. <code>fixed</code>, <code>setprecision</code>, <code>setfill</code>, <code>left</code> stay on.',
            'With <code>fixed</code>, <code>setprecision(n)</code> is the number of decimal places.'],
      trap: '<code>cin &gt;&gt; s</code> reads one word. Use <code>getline(cin, s)</code> for a whole line.' },
  ]
},
{
  id: 'm4', n: '4', title: 'Makefile and Separate Compilation',
  blurb: 'Sample Q2 asks for a dependency graph and a complete Makefile. It is a template question: learn the pattern once.',
  cards: [
    { id: 'm4-comp', t: 'Compilation stages and separate compilation', lang: 'sh', pp: '2019-20 A14',
      code: `# 1 pre-process  (#include, #define expanded)   .cpp -> .i
# 2 compile      (to assembly)                  .i   -> .s
# 3 assemble     (to object code)               .s   -> .o
# 4 link         (objects + libraries)          .o   -> executable

g++ -c gcd.cpp                 # produces gcd.o   (stages 1 to 3)
g++ -c gcd_main.cpp            # produces gcd_main.o
g++ gcd.o gcd_main.o -o gcd    # link
g++ -pedantic-errors -std=c++11 main.cpp -o main`,
      pts: ['Separate compilation: change one source file, recompile only that file, then relink.',
            '<code>#include "gcd.h"</code> searches your folder first. <code>&lt;iostream&gt;</code> searches the system library.',
            'Header files hold declarations. They are never compiled on their own.'],
      trap: '<code>#include</code> is expanded by the pre-processor at compile time, not at run time.' },
    { id: 'm4-guard', t: 'Header files and include guards', lang: 'cpp',
      code: R`// gcd.h
#ifndef GCD_H
#define GCD_H

int gcd(int a, int b);     // declaration only

#endif

// gcd.cpp
#include "gcd.h"
int gcd(int a, int b) {    // definition
    while (a != b) { if (a > b) a -= b; else b -= a; }
    return a;
}`,
      pts: ['The guard stops the same header being pasted twice into one file.',
            'Any .cpp that includes a header depends on that header in the Makefile.'],
      trap: 'Dependencies follow includes transitively: if thing.h includes gadget.h, then thing.o depends on gadget.h too.' },
    { id: 'm4-make', t: 'Makefile rules', lang: 'make', pp: 'Sample Q2',
      code: `# target: dependencies
# <TAB>command

gcd_main: gcd.o gcd_main.o
	g++ gcd.o gcd_main.o -o gcd_main

gcd.o: gcd.cpp gcd.h
	g++ -c gcd.cpp

gcd_main.o: gcd_main.cpp gcd.h
	g++ -c gcd_main.cpp`,
      pts: ['<code>make</code> with no argument builds the first target, so put the executable first.',
            'A target is rebuilt when it does not exist or is older than any dependency.',
            'One rule per .o file: the .o depends on its .cpp plus every header that .cpp includes.'],
      trap: 'The command line must start with a TAB, not spaces. In the exam, write "&lt;tab&gt;" or indent clearly.' },
    { id: 'm4-vars', t: 'Variables, $@ $^ $<, phony targets', lang: 'make', pp: '2021-22 A7',
      code: `FLAGS = -pedantic-errors -std=c++11
OBJECTS = gcd.o gcd_main.o

gcd_main: $(OBJECTS)
	g++ $(FLAGS) $^ -o $@

gcd.o: gcd.cpp gcd.h
	g++ $(FLAGS) -c $<

clean:
	rm -f gcd_main $(OBJECTS)

.PHONY: clean`,
      pts: ['<code>$@</code> the target. <code>$^</code> the whole dependency list. <code>$&lt;</code> the first dependency.',
            'Read a variable with <code>$(NAME)</code>.',
            '<code>.PHONY</code> makes <code>make clean</code> run even if a file called clean exists.'],
      trap: 'In a compile rule use <code>$&lt;</code> (just the .cpp). <code>$^</code> would pass the .h files to g++ as well.' },
  ]
},
{
  id: 'm5', n: '5', title: 'Functions and Recursion',
  blurb: 'Scope and pass-by-value versus pass-by-reference appear in almost every tracing question.',
  cards: [
    { id: 'm5-def', t: 'Declaration, definition, call', lang: 'cpp', pp: '2019-20 A8',
      code: R`double mySqrt(int x);          // prototype: declares, ends with ;

int main() {
    double r = mySqrt(16);     // call
}

double mySqrt(int x) {         // definition
    return sqrt(x);
}

void greet() { cout << "hi"; } // void: returns nothing`,
      pts: ['A function must be declared before it is called.',
            'Return type comes first, then the name, then the parameter list.'],
      trap: 'A prototype <em>declares</em>. It does not define.' },
    { id: 'm5-pass', t: 'Pass by value vs pass by reference', lang: 'cpp', pp: 'Sample Q4(c) · 2021-22 B2, B3',
      code: R`void byVal(int a)  { a = 99; }     // works on a copy
void byRef(int &a) { a = 99; }     // works on the caller's variable

int x = 1;
byVal(x);   // x is still 1
byRef(x);   // x is now 99

void swap(string &a, string &b) {
    string temp = a;
    a = b;
    b = temp;
}

void fill(int arr[], int n);       // arrays: the function can modify them`,
      pts: ['Use <code>&amp;</code> for output parameters and for swap.',
            'Arrays are always passed as the address of the first element.',
            'A linked-list head that the function may change is passed as <code>Node *&amp;head</code>.'],
      trap: 'Changing a value parameter never changes the caller\'s variable. Trace the copy separately.' },
    { id: 'm5-scope', t: 'Scope and shadowing', lang: 'cpp', pp: '2019-20 B2 · 2021-22 B2',
      code: R`int a = 1;                // main's a
{
    cout << a;            // 1  (inner a not declared yet)
    int a = 2;            // new variable, hides the outer one
    cout << a;            // 2
}
cout << a;                // 1  (inner a is gone)`,
      pts: ['A variable lives from its declaration to the closing brace of its block.',
            'An inner declaration with the same name hides the outer one inside that block only.',
            'Parameters are local variables of the function.'],
      trap: 'In 2019-20 B2 the first <code>cout &lt;&lt; a</code> inside the block still prints the outer a, because the inner declaration comes on the next line.' },
    { id: 'm5-rec', t: 'Recursion', lang: 'cpp', pp: '2019-20 A9, C1(b) · 2021-22 B6, C1',
      code: R`int fact(int n) {
    if (n <= 1) return 1;            // base case
    return n * fact(n - 1);          // smaller problem
}

int BinarySearch(int arr[], int l, int r, int x) {
    if (l > r) return -1;            // empty interval
    int mid = l + (r - l) / 2;
    if (arr[mid] == x) return mid;
    if (x < arr[mid]) return BinarySearch(arr, l, mid - 1, x);
    return BinarySearch(arr, mid + 1, r, x);
}`,
      pts: ['Every recursive function needs a base case and a step that moves toward it.',
            'To trace: write each call on its own line, then fill in return values from the bottom up.',
            'Code after the recursive call runs on the way back, in reverse order.'],
      trap: 'Forgetting <code>return</code> in front of the recursive call loses the result.' },
  ]
},
{
  id: 'm6', n: '6', title: 'Arrays and Strings',
  blurb: 'C-strings and the C++ string class both get tested. Know which functions belong to which.',
  cards: [
    { id: 'm6-arr', t: 'Arrays', lang: 'cpp', pp: 'Sample Q7 · 2021-22 B7',
      code: R`int a[5] = {6, 5, 4};          // rest are 0: {6,5,4,0,0}
int b[] = {1, 2, 3};           // size 3 from the initialiser
int n = sizeof(b) / sizeof(b[0]);   // 3 (only where b was declared)
int grid[2][3] = {{1,2,3},{4,5,6}}; // grid[row][col]

void reverseArray(int *array, int n) {
    for (int i = 0; i < n / 2; i++) {
        int temp = array[i];
        array[i] = array[n - i - 1];
        array[n - i - 1] = temp;
    }
}`,
      pts: ['Valid indexes are 0 to size-1. C++ does not check bounds.',
            'A 2D array parameter must give the column size: <code>void f(int g[][3], int rows)</code>.',
            'Arrays cannot be assigned or compared with <code>=</code> / <code>==</code> as a whole.'],
      trap: 'Inside a function, <code>sizeof(arr)</code> gives the pointer size, not the array size. Pass n as a parameter.' },
    { id: 'm6-cstr', t: 'C-strings (char arrays)', lang: 'cpp', pp: '2019-20 A10, B3 · 2021-22 B8',
      code: R`#include <cstring>
char s[] = "2019";          // 5 chars: '2','0','1','9','\0'
char t[20];

strlen(s);                  // 4   (does not count '\0')
strcpy(t, s);               // t = s
strcat(t, "!");             // append
strcmp(s, t);               // 0 if equal, <0 if s before t, >0 if after

for (int i = 0; s[i] != '\0'; i++)   // the standard loop
    cout << s[i] - '0';              // digit value`,
      pts: ['A C-string ends with the null character <code>\'\\0\'</code>.',
            'The array needs room for length + 1 characters.'],
      trap: 'Do not use <code>==</code> or <code>=</code> on C-strings. <code>==</code> compares addresses. Use <code>strcmp</code> and <code>strcpy</code>.' },
    { id: 'm6-str', t: 'The C++ string class', lang: 'cpp', pp: '2019-20 A15',
      code: R`#include <string>
string s = "computer";
s.length();              // 8      (same as s.size())
s[0];                    // 'c'
s + "s";                 // concatenation
s.substr(3, 4);          // "pute"   (start index, length)
s.find("put");           // 3        index of first match
s.find("xyz");           // string::npos when not found
s.rfind("e");            // 6        last match
s.insert(3, "XX");       // "comXXputer"
s.erase(0, 3);           // remove 3 chars from index 0
s.replace(0, 3, "dis");  // replace 3 chars from index 0
s1 == s2;  s1 < s2;      // comparison works (dictionary order)

string a = "promise", b = "computer";
a.insert(0, b, 0, 3);    // "compromise": insert b[0..2] at index 0
getline(cin, s);         // read a whole line`,
      pts: ['<code>substr(pos, len)</code>: second argument is a length, not an end index.',
            'Comparison is by character code: all capitals come before lowercase ("PHP" &lt; "Perl").',
            '<code>s.c_str()</code> converts to a C-string, for example for <code>fin.open()</code>.'],
      trap: 'Mixing <code>cin &gt;&gt; x</code> then <code>getline</code> reads an empty line. Call <code>cin.ignore()</code> in between.' },
  ]
},
{
  id: 'm7', n: '7', title: 'Structs, File I/O and Formatting',
  blurb: 'Sample Q4 is a full file-reading function. The open / check / loop / close skeleton is worth memorising.',
  cards: [
    { id: 'm7-struct', t: 'struct', lang: 'cpp', pp: 'Sample Q3',
      code: R`struct Point {
    int x;
    double y;
};                              // semicolon required

Point p = {11, 12.5};           // initialise in member order
p.x = 3;                        // dot for a struct variable
Point *q = &p;
q->x = 4;                       // arrow for a pointer: same as (*q).x

struct Line { Point end1; Point end2; };
Line L = {p, {69, 63}};
L.end2.y;                       // nested access

Point pts[10];  pts[0].x = 1;   // array of structs
Point r = p;                    // whole-struct assignment copies members`,
      pts: ['Structs can be passed to and returned from functions (by value unless you use &amp;).',
            'A struct may contain member functions too. A class is the same idea with members private by default.'],
      trap: 'Forgetting the <code>;</code> after the closing brace of a struct is a compile error.' },
    { id: 'm7-file', t: 'File input and output', lang: 'cpp', pp: 'Sample Q4(b)',
      code: R`#include <fstream>
ifstream fin;
fin.open("infile.txt");            // or: ifstream fin("infile.txt");
if (fin.fail()) {
    cout << "Error opening file" << endl;
    exit(1);
}
string line;  int count = 0;
while (getline(fin, line)) {       // line by line
    w[count] = line;
    count++;
}
fin.close();

int x;
while (fin >> x) { }               // token by token

ofstream fout("out.txt");          // overwrite
ofstream app("log.txt", ios::app); // append
fout << "total " << 42 << endl;
fout.close();`,
      pts: ['Skeleton: open, check <code>fail()</code>, loop on the read itself, close.',
            '<code>exit(1)</code> needs <code>&lt;cstdlib&gt;</code>.',
            'Loop on <code>while (fin &gt;&gt; x)</code> or <code>while (getline(fin, s))</code>, not on <code>!fin.eof()</code>.'],
      trap: '<code>while (!fin.eof())</code> usually processes the last item twice.' },
    { id: 'm7-ss', t: 'istringstream: split a line into words', lang: 'cpp',
      code: R`#include <sstream>
string line = "Alice 90 85.5";
istringstream iss(line);
string name; int a; double b;
iss >> name >> a >> b;        // works like cin, but on the string

string word;
while (iss >> word) { }       // every space-separated word`,
      pts: ['Typical pattern: <code>getline</code> a whole line, then pull fields out with an <code>istringstream</code>.'],
      trap: 'Create a new istringstream for each line. Reusing one that has hit the end reads nothing.' },
    { id: 'm7-class', t: 'Classes in one glance', lang: 'cpp',
      code: R`class Account {
public:
    Account(double b) { balance = b; }    // constructor
    void deposit(double x) { balance += x; }
    double get() const { return balance; }
private:
    double balance;                       // only members can touch it
};

Account acc(100);
acc.deposit(50);
cout << acc.get();        // 150`,
      pts: ['<code>struct</code> members are public by default, <code>class</code> members are private by default.',
            'A constructor has the class name and no return type.'],
      trap: 'Accessing a private member from outside the class (<code>acc.balance</code>) does not compile.' },
  ]
},
{
  id: 'm8', n: '8', title: 'Pointers, Dynamic Memory and Linked Lists',
  blurb: 'The heaviest topic. 2019-20 gave it four MCQs, three short questions and a 20-mark programming question.',
  cards: [
    { id: 'm8-ptr', t: 'Pointer basics', lang: 'cpp', pp: '2019-20 A11, A13, B7 · 2021-22 A12, A14',
      code: R`int n = 42;
int *p = &n;       // & address-of:  p holds the address of n
cout << *p;        // * dereference: 42
*p = 7;            // n is now 7
int *q = NULL;     // points nowhere; *q crashes

int* p1, p2;       // p1 is int*, p2 is a plain int
int *p3, *p4;      // both are pointers

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }
swap(&x, &y);`,
      pts: ['In a declaration <code>*</code> means "is a pointer". In an expression it means "the thing pointed to".',
            'Dereferencing NULL or an uninitialised pointer is a run-time error. Dereferencing a non-pointer is a compile error.'],
      trap: 'The <code>*</code> belongs to the variable name, not the type: <code>string* x, y;</code> makes only x a pointer.' },
    { id: 'm8-arith', t: 'Pointers and arrays', lang: 'cpp', pp: '2019-20 A12, B4, B8 · 2021-22 A11',
      code: R`int t[] = {6, 5, 4, 3, 2, 1};
int *tPtr = t;         // array name = address of element 0

t[3]   *(t + 3)   tPtr[3]   *(tPtr + 3)    // all the VALUE 3
&t[3]    t + 3    tPtr + 3                 // all the ADDRESS of element 3

int *q = &t[2];        // q[0] is t[2], q[1] is t[3], q[-1] is t[1]
tPtr++;                // now points at t[1]
*tPtr++;               // value of *tPtr, then pointer moves on
(*tPtr)++;             // increments the value pointed to`,
      pts: ['<code>p[i]</code> is exactly <code>*(p + i)</code>.',
            'A pointer into the middle of an array acts as an array that starts there.',
            'The last valid element of an array of SIZE is at <code>p + SIZE - 1</code>.'],
      trap: '<code>p + SIZE</code> is one past the end. Reading it is the bug in 2019-20 B8.' },
    { id: 'm8-dyn', t: 'Dynamic memory: new and delete', lang: 'cpp',
      code: R`int *p = new int;          // one int on the heap
*p = 5;
delete p;                  // give it back
p = NULL;                  // avoid a dangling pointer

int n;  cin >> n;
int *arr = new int[n];     // size chosen at run time
for (int i = 0; i < n; i++) arr[i] = i;
delete [] arr;             // arrays need delete []

Node *node = new Node;     // a struct on the heap
node->val = 3;`,
      pts: ['Every <code>new</code> needs exactly one <code>delete</code>. Every <code>new[]</code> needs <code>delete []</code>.',
            'Memory leak: losing the last pointer to heap memory without deleting it.',
            'Dangling pointer: using a pointer after its memory was deleted.'],
      trap: 'Returning the address of a local variable gives a dangling pointer. Return heap memory instead.' },
    { id: 'm8-ll1', t: 'Linked list: node, traverse, insert at head', lang: 'cpp', pp: '2019-20 C2, Sample Q5 · 2021-22 C2',
      code: R`struct Node {
    int val;
    Node *next;
};

Node *head = NULL;                       // empty list

void insertHead(Node *&head, int v) {
    Node *p = new Node;
    p->val = v;
    p->next = head;                      // link first
    head = p;                            // then move head
}

void print(Node *head) {
    for (Node *p = head; p != NULL; p = p->next)
        cout << p->val << " ";
}`,
      pts: ['<code>Node *&amp;head</code> lets the function change the caller\'s head.',
            'Insert at head reverses the order: the newest node is first.',
            'Traversal uses a copy pointer so head is not lost.'],
      trap: 'Order matters: set <code>p-&gt;next = head</code> before <code>head = p</code>, or the old list is lost.' },
    { id: 'm8-ll2', t: 'Linked list: insert at tail, delete, free', lang: 'cpp', pp: '2019-20 C2(a), C2(b) · 2021-22 C2(a)',
      code: R`void insertTail(Node *&head, int v) {
    Node *p = new Node;  p->val = v;  p->next = NULL;
    if (head == NULL) { head = p; return; }
    Node *cur = head;
    while (cur->next != NULL) cur = cur->next;   // stop AT the last node
    cur->next = p;
}

void deleteTail(Node *&head) {
    if (head == NULL) return;
    if (head->next == NULL) { delete head; head = NULL; return; }
    Node *cur = head;
    while (cur->next->next != NULL) cur = cur->next;  // second last
    delete cur->next;
    cur->next = NULL;
}

void deleteAll(Node *&head) {
    while (head != NULL) {
        Node *t = head;
        head = head->next;
        delete t;
    }
}`,
      pts: ['Always handle three cases: empty list, one node, many nodes.',
            'To delete a node you need the node <em>before</em> it.',
            'Save the next pointer before you delete a node.'],
      trap: '<code>while (cur != NULL)</code> runs off the end and leaves cur NULL. To stop at the last node, test <code>cur-&gt;next != NULL</code>.' },
    { id: 'm8-ll3', t: 'Linked list: remove every node matching a value', lang: 'cpp', pp: '2019-20 C2(b)',
      code: R`void removeAll(Node *&head, int v) {
    while (head != NULL && head->val == v) {     // matches at the front
        Node *t = head;
        head = head->next;
        delete t;
    }
    if (head == NULL) return;
    Node *cur = head;
    while (cur->next != NULL) {
        if (cur->next->val == v) {
            Node *t = cur->next;
            cur->next = t->next;                 // bypass
            delete t;                            // do NOT advance cur
        } else {
            cur = cur->next;
        }
    }
}`,
      pts: ['Two phases: strip matches from the head, then look one node ahead.',
            'After bypassing a node, stay where you are: the new next may match too.'],
      trap: 'Advancing <code>cur</code> after a deletion skips consecutive matches.' },
  ]
},
{
  id: 'm9', n: '9', title: 'Standard Template Library',
  blurb: 'Three containers and the iterator loop. Sample Q6 is a list<string> question.',
  cards: [
    { id: 'm9-vec', t: 'vector', lang: 'cpp',
      code: R`#include <vector>
#include <algorithm>
vector<int> v;                 // empty
vector<int> w(5, 0);           // five zeros
v.push_back(3);                // add at the end
v.pop_back();                  // remove the last
v.size();   v.empty();
v[0];       v.front();  v.back();
v.insert(v.begin() + 1, 9);    // insert before index 1
v.erase(v.begin());            // remove the first element
v.clear();
sort(v.begin(), v.end());      // ascending`,
      pts: ['A vector is a dynamic array: fast <code>[]</code> access, fast add/remove at the end.',
            '<code>size()</code> is how many elements it holds now.'],
      trap: '<code>v[i]</code> on an index that does not exist is undefined. <code>vector&lt;int&gt; v; v[0] = 1;</code> is wrong: use <code>push_back</code>.' },
    { id: 'm9-it', t: 'Iterators', lang: 'cpp', pp: 'Sample Q6',
      code: R`vector<int>::iterator it;
for (it = v.begin(); it != v.end(); it++)
    cout << *it << " ";              // * gives the element

list<string>::const_iterator ci;     // needed when the container is const
for (ci = lst.begin(); ci != lst.end(); ++ci)
    cout << *ci << endl;

map<string,int>::iterator mi;
for (mi = m.begin(); mi != m.end(); mi++)
    cout << mi->first << " " << mi->second << endl;`,
      pts: ['<code>begin()</code> points at the first element. <code>end()</code> points one past the last.',
            'An iterator behaves like a pointer: <code>*it</code>, <code>it-&gt;member</code>, <code>it++</code>.',
            'Use <code>!=</code> in the loop condition. <code>&lt;</code> only works for vector iterators.'],
      trap: 'Dereferencing <code>end()</code> is an error. A <code>const</code> container needs <code>const_iterator</code>.' },
    { id: 'm9-list', t: 'list', lang: 'cpp', pp: 'Sample Q6 · 2021-22 A15',
      code: R`#include <list>
list<string> L;
L.push_back("b");   L.push_front("a");
L.pop_back();       L.pop_front();
L.front();  L.back();  L.size();
L.sort();                    // member function
L.remove("a");               // remove all elements equal to "a"

list<string>::iterator it = L.begin();
it++;                        // only ++ and --, no  it + 3
L.insert(it, "x");           // insert before it
it = L.erase(it);            // returns the next valid iterator`,
      pts: ['A list is a doubly linked list: fast insert/erase anywhere, no <code>[]</code> access.',
            '<code>new list&lt;string&gt;()</code> gives a pointer: use <code>ans-&gt;push_back(x)</code>.'],
      trap: 'No <code>L[2]</code>. No <code>sort(L.begin(), L.end())</code>: lists use <code>L.sort()</code>.' },
    { id: 'm9-map', t: 'map', lang: 'cpp',
      code: R`#include <map>
map<string, int> m;
m["apple"] = 3;              // insert or overwrite
m["pear"]++;                 // missing key starts at 0
m.count("kiwi");             // 1 if the key exists, else 0
m.find("kiwi") == m.end();   // true when not found
m.erase("apple");
m.size();

for (map<string,int>::iterator it = m.begin(); it != m.end(); it++)
    cout << it->first << ": " << it->second << endl;   // sorted by key`,
      pts: ['Keys are unique and kept in sorted order.',
            'Each element is a <code>pair</code>: <code>first</code> is the key, <code>second</code> the value.',
            'Word counting is one line: <code>m[word]++</code>.'],
      trap: 'Reading <code>m[key]</code> for a missing key <em>creates</em> it with value 0. Use <code>count</code> or <code>find</code> to test.' },
  ]
},
{
  id: 'm10', n: '10', title: 'C Programming and GDB',
  blurb: 'Same logic as C++, different library. Expect printf / scanf / malloc in the short questions.',
  cards: [
    { id: 'm10-io', t: 'printf and scanf', lang: 'c', pp: '2019-20 B7, B8, C1',
      code: R`#include <stdio.h>
int a; double d; char c; char s[20];

scanf("%d", &a);          // & needed
scanf("%lf", &d);         // double: %lf in scanf
scanf("%c", &c);
scanf("%s", s);           // no & for an array; reads one word

printf("%d\n", a);
printf("%f %.2f\n", d, d);     // 3.140000 3.14
printf("%5d|%-5d|\n", 42, 42); //    42|42   |
printf("%c %s\n", c, s);
printf("%d%%\n", 50);          // 50%`,
      pts: ['<code>%d</code> int, <code>%f</code> / <code>%lf</code> double, <code>%c</code> char, <code>%s</code> string.',
            '<code>%f</code> prints 6 decimal places by default.',
            'C has no <code>cin</code>, <code>cout</code>, <code>string</code>, <code>new</code>, references or <code>bool</code> (without stdbool.h).'],
      trap: 'Forgetting <code>&amp;</code> in <code>scanf("%d", a)</code> crashes. <code>scanf("%s", &amp;s)</code> does not need the &amp;.' },
    { id: 'm10-str', t: 'C strings and string.h', lang: 'c', pp: '2019-20 A10 · 2021-22 A8',
      code: R`#include <string.h>
char a[20] = "comp";
char b[] = "2113";

strlen(a);          // 4
strcat(a, b);       // a is now "comp2113"
strcpy(a, "hi");    // a is now "hi"
strcmp(a, b);       // 0 when equal

fgets(a, 20, stdin);     // read a line (keeps the '\n')`,
      pts: ['Strings are char arrays ending in <code>\'\\0\'</code>.',
            'The destination of <code>strcpy</code> / <code>strcat</code> must be big enough.'],
      trap: '<code>if (a == b)</code> compares addresses. <code>a = "hi";</code> does not compile for an array.' },
    { id: 'm10-mem', t: 'malloc and free', lang: 'c', pp: '2019-20 B8 · 2021-22 A13',
      code: R`#include <stdlib.h>
int n = 42;
double *p = (double *)malloc(sizeof(double) * n);
if (p == NULL) { exit(EXIT_FAILURE); }

for (int i = 0; i < n; i++)
    *(p + i) = i;              // same as p[i] = i

double last = *(p + n - 1);    // last element
free(p);                       // exactly once`,
      pts: ['<code>malloc(bytes)</code> returns <code>void *</code>: cast it and multiply by <code>sizeof(type)</code>.',
            'C++ <code>new</code> / <code>delete</code> become <code>malloc</code> / <code>free</code>.',
            'Always check the result against NULL.'],
      trap: '<code>malloc(n)</code> without <code>sizeof</code> allocates n bytes, not n elements.' },
    { id: 'm10-struct', t: 'C structs and typedef', lang: 'c',
      code: R`struct Point { int x; int y; };
struct Point p1;               // C needs the word struct

typedef struct {
    int x;
    int y;
} Point2;
Point2 p2;                     // typedef gives a one-word name

typedef struct node {
    int val;
    struct node *next;         // tag needed for self-reference
} Node;

Node *n = (Node *)malloc(sizeof(Node));
n->val = 1;  n->next = NULL;`,
      pts: ['<code>typedef old new;</code> creates an alias for a type.',
            'Compile C with <code>gcc file.c -o prog</code>.'],
      trap: 'Inside the struct the typedef name does not exist yet, so the next pointer must be <code>struct node *</code>.' },
    { id: 'm10-gdb', t: 'GDB debugger', lang: 'sh',
      code: `g++ -g hello.cpp -o hello     # -g adds debugging information
gdb hello

(gdb) r          # run
(gdb) b 8        # breakpoint at line 8
(gdb) n          # execute the next line
(gdb) p i        # print the value of variable i
(gdb) l          # list the source code
(gdb) clear      # clear a breakpoint
(gdb) q          # quit`,
      pts: ['Breakpoint: execution pauses there so you can step and inspect variables.',
            'On a segmentation fault gdb stops at the faulting line. Print the pointers on that line: one is usually <code>0x0</code> (NULL).'],
      trap: 'Without <code>-g</code>, gdb cannot show line numbers or variable names.' },
  ]
},
];
