/* COMP2113 Final Hub — practice bank.
   MCQ   : Section A style.  a = index of the correct option.
   TRACE : Section B "write down the output". Every `out` is checked by tools/verify.js with g++.
   SHORT : Section B "write a command / statement / fix the bug". Self-marked.
   PROG  : Section C style programming questions with model solutions. */
(function () {
const R = String.raw;

window.MCQ = [
  // ---------- Module 1 ----------
  { id: 'q1', m: 'm1', q: 'Which command prints only the number of lines in <code>notes.txt</code>?',
    opts: ['wc -w notes.txt', 'wc -l notes.txt', 'wc -c notes.txt', 'count notes.txt'], a: 1,
    why: '<code>-l</code> lines, <code>-w</code> words, <code>-c</code> bytes. Plain <code>wc</code> prints all three.' },
  { id: 'q2', m: 'm1', q: 'After <code>chmod 640 data.txt</code>, what does <code>ls -l</code> show for the file?',
    opts: ['-rw-r-----', '-rw-rw----', '-rwxr-----', '-rw-r--r--'], a: 0,
    why: '6 = 4+2 = rw-, 4 = r--, 0 = ---.' },
  { id: 'q3', m: 'm1', q: 'Which command removes the directory <code>lab</code> together with all files inside it?',
    opts: ['rmdir lab', 'rm lab', 'rm -r lab', 'mv lab'], a: 2,
    why: '<code>rmdir</code> only removes empty directories. <code>rm -r</code> removes recursively.' },
  { id: 'q4', m: 'm1', q: 'What does <code>sort data.txt | uniq | wc -l</code> print?',
    opts: ['The number of lines in data.txt', 'The number of distinct lines in data.txt', 'The number of duplicated lines', 'The sorted file'], a: 1,
    why: 'Sorting brings duplicates together, <code>uniq</code> drops adjacent duplicates, <code>wc -l</code> counts what is left.' },
  { id: 'q5', m: 'm1', q: 'A file has lines like <code>5,Apple,3.5</code>. Which command prints only the names (2nd column)?',
    opts: ["cut -f2 file", "cut -d, -f2 file", "cut -t, -k2 file", "sort -t, -k2 file"], a: 1,
    why: '<code>cut</code> uses <code>-d</code> for the delimiter and <code>-f</code> for the field. <code>-t</code> and <code>-k</code> belong to <code>sort</code>.' },
  { id: 'q6', m: 'm1', q: 'Which redirect sends the <em>error messages</em> of g++ to <code>err.txt</code>?',
    opts: ['g++ a.cpp > err.txt', 'g++ a.cpp 2> err.txt', 'g++ a.cpp < err.txt', 'g++ a.cpp >> err.txt'], a: 1,
    why: 'File descriptor 2 is standard error. <code>&gt;</code> alone redirects descriptor 1 (standard output).' },
  { id: 'q7', m: 'm1', q: 'Which lines does <code>grep -E \'^[0-9]+$\' f.txt</code> match?',
    opts: ['Lines containing at least one digit', 'Lines that consist only of digits (at least one)', 'Lines that start with a digit', 'Empty lines'], a: 1,
    why: '<code>^</code> and <code>$</code> anchor both ends, <code>[0-9]+</code> is one or more digits, so the whole line must be digits.' },
  { id: 'q8', m: 'm1', q: 'The output of <code>diff A B</code> contains the line <code>2,3c3</code>. What does it mean?',
    opts: ['Delete lines 2 and 3 of B', 'Change lines 2-3 of A into line 3 of B', 'Add line 3 of A after line 2 of B', 'Lines 2 and 3 are identical'], a: 1,
    why: 'The format is [lines of first file][a/c/d][lines of second file]. <code>c</code> means change.' },
  { id: 'q9', m: 'm1', q: 'Which command finds every file ending in <code>.cpp</code> in the current directory and its sub-directories?',
    opts: ['grep ".cpp" .', 'ls *.cpp', 'find . -name "*.cpp" -type f', 'find *.cpp'], a: 2,
    why: '<code>find [path] -name pattern -type f</code>. <code>ls *.cpp</code> only looks in the current directory.' },
  { id: 'q10', m: 'm1', q: 'What is the difference between <code>&gt;</code> and <code>&gt;&gt;</code>?',
    opts: ['No difference', '> appends, >> overwrites', '> overwrites, >> appends', '> is for input, >> for output'], a: 2,
    why: '<code>&gt;</code> replaces the file content. <code>&gt;&gt;</code> adds to the end.' },

  // ---------- Module 2 ----------
  { id: 'q11', m: 'm2', q: 'Given <code>name="Kit"</code>, what does <code>echo \'Hi $name\'</code> print?',
    opts: ['Hi Kit', 'Hi $name', 'Hi', 'An error'], a: 1,
    why: 'Single quotes prevent variable substitution. Double quotes would print Hi Kit.' },
  { id: 'q12', m: 'm2', q: 'Which line correctly assigns a value in a Bash script?',
    opts: ['count = 5', '$count=5', 'count=5', 'int count=5'], a: 2,
    why: 'No spaces around <code>=</code>, and no <code>$</code> when setting.' },
  { id: 'q13', m: 'm2', q: 'In a Bash script, <code>$#</code> holds:',
    opts: ['The script name', 'The number of command line arguments', 'The first argument', 'The process ID'], a: 1,
    why: '<code>$0</code> is the script name, <code>$1</code> the first argument, <code>$#</code> the count.' },
  { id: 'q14', m: 'm2', q: 'With <code>a="Apple Pie"</code>, what does <code>echo ${a:6:3}</code> print?',
    opts: ['Pie', 'e P', 'Apple', 'le Pie'], a: 0,
    why: 'Substring starting at index 6 (0-based), length 3.' },
  { id: 'q15', m: 'm2', q: 'Which test is true when the number in <code>$a</code> is less than 10?',
    opts: ['[ $a < 10 ]', '[ $a -lt 10 ]', '[$a -lt 10]', '[ $a lt 10 ]'], a: 1,
    why: 'Numbers use <code>-lt</code>. Spaces after <code>[</code> and before <code>]</code> are required. An unescaped <code>&lt;</code> is a redirect.' },
  { id: 'q16', m: 'm2', q: 'Which test checks that <code>hello</code> exists (for example, after compiling)?',
    opts: ['[ -e hello ]', '[ -n hello ]', '[ exists hello ]', '[ hello -eq 1 ]'], a: 0,
    why: '<code>-e</code> exists, <code>-f</code> regular file, <code>-d</code> directory, <code>-x</code> executable.' },
  { id: 'q17', m: 'm2', q: 'What does <code>cp a b 1>/dev/null 2>&1</code> do with the output of cp?',
    opts: ['Shows only errors', 'Saves everything in a file called 1', 'Discards both normal output and errors', 'Shows only normal output'], a: 2,
    why: 'stdout goes to /dev/null, and stderr is sent to the same place as stdout.' },
  { id: 'q18', m: 'm2', q: 'Which Git command records the staged changes into the repository?',
    opts: ['git add', 'git commit -m "msg"', 'git push', 'git status'], a: 1,
    why: '<code>add</code> stages, <code>commit</code> records locally, <code>push</code> uploads to the remote.' },
  { id: 'q19', m: 'm2', q: 'What does <code>git pull</code> do?',
    opts: ['Uploads local commits', 'Fetches remote changes and merges them into the current branch', 'Creates a new branch', 'Discards local changes'], a: 1,
    why: 'pull = fetch + merge.' },

  // ---------- Module 3 ----------
  { id: 'q20', m: 'm3', q: 'What is the value of <code>d</code> after <code>double d = 9 / 2;</code>?',
    opts: ['4.5', '4', '5', '4.0 (the fraction is lost)'], a: 3,
    why: 'Both operands are int, so the division gives 4. It is then converted to 4.0.' },
  { id: 'q21', m: 'm3', q: 'What is printed?', code: R`int x = 5;
if (x = 0) cout << "A";
else cout << "B";
cout << x;`,
    opts: ['A5', 'B5', 'B0', 'A0'], a: 2,
    why: '<code>x = 0</code> is an assignment. Its value is 0 (false), so the else branch runs and x is now 0.' },
  { id: 'q22', m: 'm3', q: 'Which expression is true exactly when <code>n</code> is an even number between 1 and 100 inclusive?',
    opts: ['n % 2 == 0 || n >= 1 && n <= 100', 'n % 2 == 0 && n >= 1 && n <= 100', '1 <= n <= 100 && n % 2 == 0', 'n / 2 == 0 && n >= 1 && n <= 100'], a: 1,
    why: 'All three conditions must hold. <code>1 &lt;= n &lt;= 100</code> compiles but compares (1&lt;=n), which is 0 or 1, with 100.' },
  { id: 'q23', m: 'm3', q: 'How many times is "hi" printed?', code: R`int i = 10;
do {
    cout << "hi";
    i++;
} while (i < 10);`,
    opts: ['0', '1', '10', 'Infinitely many'], a: 1,
    why: 'A do-while body runs once before the condition is checked.' },
  { id: 'q24', m: 'm3', q: 'What is the value of <code>\'D\' - \'A\' + 1</code>?',
    opts: ['"D"', '4', '3', 'A compile error'], a: 1,
    why: 'Characters are integer codes. D is 3 after A, plus 1 is 4.' },
  { id: 'q25', m: 'm3', q: 'What does <code>cout &lt;&lt; fixed &lt;&lt; setprecision(1) &lt;&lt; 2.75;</code> print?',
    opts: ['2.7', '2.8', '2.75', '3'], a: 1,
    why: 'With <code>fixed</code>, setprecision is the number of decimals, and the value is rounded: 2.75 is stored as exactly 2.75 and rounds to 2.8.' },

  // ---------- Module 4 ----------
  { id: 'q26', m: 'm4', q: 'Which g++ option produces an object file without linking?',
    opts: ['-o', '-c', '-g', '-l'], a: 1,
    why: '<code>g++ -c gcd.cpp</code> produces gcd.o. <code>-o</code> names the output, <code>-g</code> adds debug information.' },
  { id: 'q27', m: 'm4', q: 'In the rule <code>prog: a.o b.o</code> with command <code>g++ $^ -o $@</code>, what does <code>$@</code> stand for?',
    opts: ['a.o', 'a.o b.o', 'prog', 'g++'], a: 2,
    why: '<code>$@</code> target, <code>$^</code> all dependencies, <code>$&lt;</code> first dependency.' },
  { id: 'q28', m: 'm4', q: 'main.cpp includes util.h. util.cpp includes util.h. You edit only <code>util.cpp</code> and run <code>make</code>. What is rebuilt?',
    opts: ['Everything', 'util.o only', 'util.o and the executable', 'main.o and the executable'], a: 2,
    why: 'util.o is older than util.cpp so it is recompiled. The executable is then older than util.o, so it is relinked. main.o is untouched.' },
  { id: 'q29', m: 'm4', q: 'Why declare <code>.PHONY: clean</code>?',
    opts: ['To make clean run faster', 'So make clean still runs when a file named clean exists', 'To delete object files automatically', 'It is required for every target'], a: 1,
    why: 'Without it, an existing file called clean is considered up to date and the command is skipped.' },
  { id: 'q30', m: 'm4', q: 'What is the purpose of <code>#ifndef X_H / #define X_H / #endif</code> in a header?',
    opts: ['To speed up linking', 'To stop the header being included more than once in one file', 'To hide the implementation', 'To define the main function'], a: 1,
    why: 'These are include guards.' },
  { id: 'q31', m: 'm4', q: 'Which stage turns <code>.o</code> files into an executable?',
    opts: ['Pre-processing', 'Compilation', 'Assembly', 'Linking'], a: 3,
    why: 'Order: pre-process, compile, assemble, link.' },

  // ---------- Module 5 ----------
  { id: 'q32', m: 'm5', q: 'What is printed?', code: R`void f(int a, int &b) { a++; b++; }
int main() {
    int x = 1, y = 1;
    f(x, y);
    cout << x << y;
}`,
    opts: ['11', '12', '21', '22'], a: 1,
    why: 'a is a copy, so x stays 1. b is a reference to y, so y becomes 2.' },
  { id: 'q33', m: 'm5', q: 'Which call is valid for <code>void update(int &amp;n);</code>?',
    opts: ['update(5);', 'update(x + 1);', 'update(x);  // x is an int variable', 'update(&x);'], a: 2,
    why: 'A non-const reference must bind to a variable, not a literal or temporary. <code>&amp;x</code> is a pointer.' },
  { id: 'q34', m: 'm5', q: 'What does <code>mystery(4)</code> return?', code: R`int mystery(int n) {
    if (n == 0) return 0;
    return n + mystery(n - 1);
}`,
    opts: ['4', '10', '24', 'It never returns'], a: 1,
    why: '4 + 3 + 2 + 1 + 0 = 10.' },
  { id: 'q35', m: 'm5', q: 'What happens when <code>f(3)</code> is called?', code: R`int f(int n) {
    return n * f(n - 1);
}`,
    opts: ['Returns 6', 'Returns 0', 'Compile error', 'Infinite recursion (no base case)'], a: 3,
    why: 'There is no base case, so the calls never stop and the program eventually crashes.' },
  { id: 'q36', m: 'm5', q: 'A variable declared inside a function body is:',
    opts: ['Global', 'Local to that function', 'Shared by all functions', 'Static by default'], a: 1,
    why: 'It exists only from its declaration to the end of its block.' },

  // ---------- Module 6 ----------
  { id: 'q37', m: 'm6', q: 'What does <code>int a[5] = {1, 2};</code> contain?',
    opts: ['1 2 and three garbage values', '1 2 0 0 0', '1 2 1 2 1', 'It does not compile'], a: 1,
    why: 'A partial initialiser fills the rest with zeros.' },
  { id: 'q38', m: 'm6', q: 'How many bytes does <code>char s[] = "exam";</code> occupy?',
    opts: ['4', '5', '8', '1'], a: 1,
    why: 'Four letters plus the terminating <code>\'\\0\'</code>.' },
  { id: 'q39', m: 'm6', q: 'Which correctly tests whether two C-strings <code>a</code> and <code>b</code> hold the same text?',
    opts: ['a == b', 'strcmp(a, b) == 0', 'strcmp(a, b)', 'a.equals(b)'], a: 1,
    why: '<code>strcmp</code> returns 0 for equal strings. <code>a == b</code> compares addresses.' },
  { id: 'q40', m: 'm6', q: 'If <code>string s = "COMP2113";</code>, what is <code>s.substr(4, 2)</code>?',
    opts: ['"21"', '"2113"', '"P2"', '"211"'], a: 0,
    why: 'Start at index 4 (the character 2), take 2 characters.' },
  { id: 'q41', m: 'm6', q: 'What does <code>s.find("xyz")</code> return when "xyz" is not in s?',
    opts: ['-1 as an int', '0', 'string::npos', 'It throws an exception'], a: 2,
    why: 'Compare the result with <code>string::npos</code>.' },
  { id: 'q42', m: 'm6', q: 'Which statement about passing an array to a function is true?',
    opts: ['The whole array is copied', 'The function receives the address of the first element and can change the caller\'s array', 'The function knows the array size automatically', 'Arrays cannot be passed to functions'], a: 1,
    why: 'That is why the size is passed as a separate parameter.' },

  // ---------- Module 7 ----------
  { id: 'q43', m: 'm7', q: 'Given <code>Point *p</code>, which expression accesses member <code>x</code>?',
    opts: ['p.x', '*p.x', 'p->x', '&p.x'], a: 2,
    why: '<code>p-&gt;x</code> is short for <code>(*p).x</code>. <code>*p.x</code> parses as <code>*(p.x)</code>.' },
  { id: 'q44', m: 'm7', q: 'Which opens <code>log.txt</code> so that new output is added to the end?',
    opts: ['ofstream f("log.txt");', 'ifstream f("log.txt");', 'ofstream f("log.txt", ios::app);', 'ofstream f("log.txt", ios::end);'], a: 2,
    why: 'Without <code>ios::app</code> an ofstream erases the existing content.' },
  { id: 'q45', m: 'm7', q: 'Which loop correctly reads every integer from an open <code>ifstream fin</code>?',
    opts: ['while (!fin.eof()) { fin >> x; use(x); }', 'while (fin >> x) { use(x); }', 'for (;;) { fin >> x; use(x); }', 'while (fin.open()) { fin >> x; }'], a: 1,
    why: 'The read itself is the condition, so the loop stops as soon as a read fails.' },
  { id: 'q46', m: 'm7', q: 'What is the default access level of members in a <code>struct</code> and in a <code>class</code>?',
    opts: ['Both public', 'struct public, class private', 'struct private, class public', 'Both private'], a: 1,
    why: 'That is the only language difference between them.' },
  { id: 'q47', m: 'm7', q: 'What does <code>cout &lt;&lt; setw(5) &lt;&lt; setfill(\'*\') &lt;&lt; 42;</code> print?',
    opts: ['42***', '***42', '*42**', '42'], a: 1,
    why: 'Output is right-aligned by default, so the fill goes on the left.' },

  // ---------- Module 8 ----------
  { id: 'q48', m: 'm8', q: 'After <code>int a = 3; int *p = &amp;a; *p = *p + 2;</code> what is <code>a</code>?',
    opts: ['3', '5', 'An address', 'Undefined'], a: 1,
    why: '<code>*p</code> is a itself.' },
  { id: 'q49', m: 'm8', q: 'In <code>int *p, q;</code> what are the types?',
    opts: ['Both int*', 'p is int*, q is int', 'p is int, q is int*', 'Both int'], a: 1,
    why: 'The star attaches to p only.' },
  { id: 'q50', m: 'm8', q: 'Given <code>int a[] = {2, 4, 6, 8}; int *p = a;</code> what is <code>*(p + 2) + 1</code>?',
    opts: ['5', '7', '8', '9'], a: 1,
    why: '<code>*(p + 2)</code> is a[2] = 6, plus 1.' },
  { id: 'q51', m: 'm8', q: 'Which statement correctly releases <code>int *arr = new int[n];</code>?',
    opts: ['delete arr;', 'delete [] arr;', 'free(arr);', 'arr = NULL;'], a: 1,
    why: '<code>new[]</code> pairs with <code>delete []</code>. Setting to NULL without deleting leaks the memory.' },
  { id: 'q52', m: 'm8', q: 'What is the problem here?', code: R`int *make() {
    int x = 5;
    return &x;
}`,
    opts: ['Nothing', 'Memory leak', 'It returns the address of a local variable that no longer exists', 'x must be a pointer'], a: 2,
    why: 'x is destroyed when the function returns, so the caller gets a dangling pointer.' },
  { id: 'q53', m: 'm8', q: 'Why is the head parameter written <code>Node *&amp;head</code> in an insert-at-head function?',
    opts: ['To make the function faster', 'So the function can change which node the caller\'s head points to', 'Because structs cannot be passed by value', 'To avoid using new'], a: 1,
    why: 'With <code>Node *head</code> the function would only change its own copy of the pointer.' },
  { id: 'q54', m: 'm8', q: 'To delete node X from the middle of a singly linked list you must have a pointer to:',
    opts: ['The node after X', 'The node before X', 'The tail', 'Only X'], a: 1,
    why: 'The previous node\'s next pointer has to be redirected around X.' },
  { id: 'q55', m: 'm8', q: 'What does this loop leave in <code>cur</code> for a non-empty list?', code: R`Node *cur = head;
while (cur->next != NULL)
    cur = cur->next;`,
    opts: ['NULL', 'The first node', 'The last node', 'The second-last node'], a: 2,
    why: 'It stops when cur has no successor, which is the last node.' },
  { id: 'q56', m: 'm8', q: 'A memory leak occurs when:',
    opts: ['A pointer is set to NULL after delete', 'Heap memory is no longer reachable but was never deleted', 'A local variable goes out of scope', 'delete is called on NULL'], a: 1,
    why: 'Local variables are released automatically. Heap memory is not.' },

  // ---------- Module 9 ----------
  { id: 'q57', m: 'm9', q: 'Which container supports <code>c[i]</code> random access?',
    opts: ['list only', 'vector only', 'vector and list', 'Neither'], a: 1,
    why: 'A list must be walked with an iterator. (A map supports <code>m[key]</code>, which is a lookup by key.)' },
  { id: 'q58', m: 'm9', q: 'What does <code>v.end()</code> refer to?',
    opts: ['The last element', 'The position one past the last element', 'The first element', 'NULL'], a: 1,
    why: 'So the loop condition is <code>it != v.end()</code> and <code>*v.end()</code> is invalid.' },
  { id: 'q59', m: 'm9', q: 'In what order does iterating a <code>map&lt;string,int&gt;</code> visit its elements?',
    opts: ['Insertion order', 'Sorted by key', 'Sorted by value', 'Random order'], a: 1,
    why: 'A map keeps its keys sorted (it is a balanced binary search tree).' },
  { id: 'q60', m: 'm9', q: 'For a map iterator <code>it</code>, how do you get the value?',
    opts: ['*it', 'it->second', 'it->value', 'it[1]'], a: 1,
    why: 'Each element is a pair: <code>first</code> is the key, <code>second</code> is the value.' },
  { id: 'q61', m: 'm9', q: 'Which is the right way to sort a <code>list&lt;int&gt; L</code>?',
    opts: ['sort(L.begin(), L.end());', 'L.sort();', 'sort(L);', 'L.order();'], a: 1,
    why: 'The generic <code>sort</code> needs random-access iterators, which list does not have.' },
  { id: 'q62', m: 'm9', q: 'What is <code>v.size()</code> after this code?', code: R`vector<int> v(3, 7);
v.push_back(1);
v.pop_back();
v.pop_back();`,
    opts: ['1', '2', '3', '4'], a: 1,
    why: 'Starts with 3 elements, +1, -1, -1 = 2.' },

  // ---------- Module 10 ----------
  { id: 'q63', m: 'm10', q: 'Which reads a double into <code>double d;</code> in C?',
    opts: ['scanf("%d", &d);', 'scanf("%lf", &d);', 'scanf("%lf", d);', 'scanf("%f", d);'], a: 1,
    why: 'scanf needs <code>%lf</code> for double and the address of the variable.' },
  { id: 'q64', m: 'm10', q: 'What does <code>printf("%5.1f|", 3.14159);</code> print?',
    opts: ['3.1|', '  3.1|', '3.14159|', '3.1  |'], a: 1,
    why: 'Width 5, one decimal, right aligned: two spaces then 3.1.' },
  { id: 'q65', m: 'm10', q: 'Which allocates an array of 10 ints in C?',
    opts: ['int *p = new int[10];', 'int *p = malloc(10);', 'int *p = (int *)malloc(sizeof(int) * 10);', 'int *p = alloc(int, 10);'], a: 2,
    why: 'malloc takes a number of bytes. <code>new</code> is C++ only.' },
  { id: 'q66', m: 'm10', q: 'Which of these is <em>not</em> available in C?',
    opts: ['struct', 'Pointers', 'Pass by reference with &', 'Functions'], a: 2,
    why: 'C has no reference parameters. Pass a pointer instead.' },
  { id: 'q67', m: 'm10', q: 'Which GDB command sets a breakpoint at line 12?',
    opts: ['r 12', 'b 12', 'p 12', 'n 12'], a: 1,
    why: '<code>b</code> break, <code>r</code> run, <code>n</code> next line, <code>p</code> print a variable, <code>q</code> quit.' },
  { id: 'q68', m: 'm10', q: 'Which compile option is needed before debugging with GDB?',
    opts: ['-c', '-g', '-o', '-d'], a: 1,
    why: '<code>-g</code> stores line numbers and variable names in the executable.' },
  { id: 'q69', m: 'm10', q: 'What does <code>typedef struct { int x; } Pt;</code> let you write?',
    opts: ['struct Pt p; only', 'Pt p;', 'typedef p;', 'Nothing new'], a: 1,
    why: 'typedef creates the one-word type name Pt.' },
  { id: 'q70', m: 'm10', q: 'After <code>char a[10] = "ab"; strcat(a, "cd");</code> what is <code>strlen(a)</code>?',
    opts: ['2', '4', '5', '10'], a: 1,
    why: 'a is "abcd". strlen does not count the terminator.' },
];

/* Each `code` is compiled as:  #include <bits/stdc++.h> + using namespace std; + code
   (wrapped in int main(){...} when it has no main). */
window.TRACE = [
  { id: 't1', m: 'm3', code: R`int a = 7, b = 2;
double c = a / b;
cout << c << " " << a % b << " " << (double)a / b;`, out: '3 1 3.5',
    why: 'a / b is integer division (3), stored as 3.0 and printed as 3. 7 % 2 is 1. Casting a first gives 3.5.' },
  { id: 't2', m: 'm3', code: R`int i = 5;
int a = i++ + 2;
int b = ++i * 2;
cout << a << " " << b << " " << i;`, out: '7 14 7',
    why: 'i++ uses 5 then i becomes 6. ++i makes i 7 first, then 7 * 2 = 14.' },
  { id: 't3', m: 'm3', code: R`int x = 0, y = 5;
if (x != 0 && y / x > 1) cout << "A";
else cout << "B";
if (x == 0 || ++y > 5) cout << y;`, out: 'B5',
    why: 'First test: x != 0 is false, so the division is never evaluated. Second test: x == 0 is true, so ++y is skipped and y stays 5.' },
  { id: 't4', m: 'm3', code: R`int n = 2;
switch (n) {
    case 1: cout << "one ";
    case 2: cout << "two ";
    case 3: cout << "three "; break;
    default: cout << "other ";
}`, out: 'two three',
    why: 'Execution starts at case 2 and falls through into case 3 because case 2 has no break.' },
  { id: 't5', m: 'm3', code: R`for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;
    if (i > 7) break;
    cout << i << " ";
}`, out: '1 3 5 7',
    why: 'Even numbers are skipped. At i = 9 the loop breaks.' },
  { id: 't6', m: 'm3', code: R`for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++)
        cout << i * j << " ";
    cout << "| ";
}`, out: '1 | 2 4 | 3 6 9 |',
    why: 'The inner loop runs i times for each i.' },
  { id: 't7', m: 'm5', code: R`void f(int a, int &b) {
    a += 10;
    b += a;
}
int main() {
    int x = 1, y = 2;
    f(x, y);
    f(y, x);
    cout << x << " " << y;
}`, out: '24 13',
    why: 'f(x, y): a = 11, y = 2 + 11 = 13, x unchanged. f(y, x): a = 23, x = 1 + 23 = 24.' },
  { id: 't8', m: 'm5', code: R`int x = 10;
void g() {
    x++;
    cout << x << " ";
}
int main() {
    int x = 1;
    {
        int x = 5;
        x++;
        cout << x << " ";
    }
    g();
    cout << x << " ";
    g();
}`, out: '6 11 1 12',
    why: 'g() always uses the global x. main has its own x (1), and the inner block has a third x (5).' },
  { id: 't9', m: 'm5', code: R`void r(int n) {
    if (n == 0) return;
    cout << n << " ";
    r(n - 1);
    cout << n << " ";
}
int main() { r(3); }`, out: '3 2 1 1 2 3',
    why: 'The first print happens on the way down, the second on the way back up.' },
  { id: 't10', m: 'm5', code: R`int f(int n) {
    if (n < 2) return n;
    return f(n - 1) + f(n - 2);
}
int main() { cout << f(6); }`, out: '8',
    why: 'Fibonacci: f(0..6) = 0 1 1 2 3 5 8.' },
  { id: 't11', m: 'm5', code: R`int s(int n) {
    if (n < 10) return n;
    return n % 10 + s(n / 10);
}
int main() { cout << s(2113); }`, out: '7',
    why: 'Sum of digits: 3 + 1 + 1 + 2.' },
  { id: 't12', m: 'm6', code: R`int a[5] = {3, 1, 4};
for (int i = 1; i < 5; i++)
    a[i] += a[i - 1];
for (int i = 0; i < 5; i++)
    cout << a[i] << " ";`, out: '3 4 8 8 8',
    why: 'The array starts as 3 1 4 0 0. Each element becomes the running total.' },
  { id: 't13', m: 'm6', code: R`char s[] = "hello";
int n = 0;
for (int i = 0; s[i] != '\0'; i++) {
    if (s[i] == 'l') s[i] = 'L';
    else n++;
}
cout << s << " " << n << " " << strlen(s);`, out: 'heLLo 3 5',
    why: 'Two l characters are replaced. Three other characters are counted. The length is unchanged.' },
  { id: 't14', m: 'm6', code: R`string s = "programming";
cout << s.substr(3, 4) << " " << s.find("gram") << " "
     << s.rfind("m") << " " << s.length();`, out: 'gram 3 7 11',
    why: 'Index 3 is g. substr takes 4 characters. The last m is at index 7.' },
  { id: 't15', m: 'm6', code: R`string s = "computer";
s.erase(3, 3);
s.insert(3, "pil");
s.replace(0, 3, "re");
cout << s;`, out: 'repiler',
    why: 'erase gives "comer", insert gives "compiler", replacing the first 3 characters with "re" gives "repiler".' },
  { id: 't16', m: 'm7', code: R`struct P { int x; int y; };
void mv(P a, P *b) {
    a.x += 10;
    b->y += 10;
}
int main() {
    P p = {1, 2};
    P q = p;
    q.x = 5;
    mv(p, &q);
    mv(q, &p);
    cout << p.x << p.y << " " << q.x << q.y;
}`, out: '112 512',
    why: 'q is a separate copy of p. The struct passed by value is never changed. Only the y of the struct passed by pointer grows by 10.' },
  { id: 't17', m: 'm7', code: R`cout << fixed << setprecision(2) << 3.14159 << "|"
     << setw(5) << 42 << "|"
     << setfill('*') << setw(6) << 2.5 << "|";`, out: '3.14|   42|**2.50|', exact: true,
    why: 'fixed + setprecision(2) stays in force, so 2.5 prints as 2.50. setw applies to one item. Padding goes on the left.' },
  { id: 't18', m: 'm7', code: R`string line = "3 apples and 12 pears";
istringstream iss(line);
string w;
int total = 0, n;
iss >> n;
total += n;
iss >> w >> w >> n;
total += n;
cout << total << " " << w;`, out: '15 and',
    why: 'w is read twice: first "apples", then "and". n becomes 12.' },
  { id: 't19', m: 'm8', code: R`int a = 5, b = 8;
int *p = &a, *q = &b;
*p = *q + 1;
p = q;
*p += 2;
cout << a << " " << b << " " << *p << " " << *q;`, out: '9 10 10 10',
    why: 'a becomes 9. Then p is redirected to b, and b becomes 10 through p.' },
  { id: 't20', m: 'm8', code: R`int a[] = {10, 20, 30, 40, 50};
int *p = a + 1;
cout << *p << " " << p[2] << " " << *(p + 1) + 1 << " ";
p++;
int x = *p++;
cout << x << " " << *p << " " << p - a;`, out: '20 40 31 30 40 3',
    why: 'p starts at a[1]. p[2] is a[3]. After p++, *p++ reads a[2] (30) then moves p to a[3]. p - a is the index 3.' },
  { id: 't21', m: 'm8', code: R`void s1(int *a, int *b) { int *t = a; a = b; b = t; }
void s2(int *a, int *b) { int t = *a; *a = *b; *b = t; }
int main() {
    int x = 1, y = 2;
    s1(&x, &y);
    cout << x << y << " ";
    s2(&x, &y);
    cout << x << y;
}`, out: '12 21',
    why: 's1 only swaps its own local pointer copies. s2 swaps the values the pointers point to.' },
  { id: 't22', m: 'm8', code: R`struct Node { int v; Node *next; };
int main() {
    Node *head = NULL;
    for (int i = 1; i <= 4; i++) {
        Node *p = new Node;
        p->v = i * i;
        p->next = head;
        head = p;
    }
    Node *t = head->next;
    head->next = t->next;
    delete t;
    for (Node *p = head; p != NULL; p = p->next)
        cout << p->v << " ";
}`, out: '16 4 1',
    why: 'Head insertion builds 16 9 4 1. The second node (9) is bypassed and deleted.' },
  { id: 't23', m: 'm8', code: R`int n = 4;
int *a = new int[n];
for (int i = 0; i < n; i++) a[i] = i * 2;
int *b = a;
b[1] = 9;
*(a + 3) = *b + b[2];
for (int i = 0; i < n; i++) cout << a[i] << " ";
delete [] a;`, out: '0 9 4 4',
    why: 'a and b are the same array. a[3] = a[0] + a[2] = 0 + 4.' },
  { id: 't24', m: 'm9', code: R`vector<int> v;
for (int i = 1; i <= 5; i++) v.push_back(i * 3 % 7);
v.pop_back();
v.insert(v.begin() + 1, 4);
sort(v.begin(), v.end());
v.erase(v.begin());
cout << v.size() << ": ";
for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
    cout << *it << " ";`, out: '4: 3 4 5 6',
    why: 'Pushes 3 6 2 5 1. pop gives 3 6 2 5. insert gives 3 4 6 2 5. sorted 2 3 4 5 6. erase the first.' },
  { id: 't25', m: 'm9', code: R`map<string, int> m;
string w[] = {"pear", "apple", "pear", "fig", "apple", "pear"};
for (int i = 0; i < 6; i++) m[w[i]]++;
for (map<string, int>::iterator it = m.begin(); it != m.end(); it++)
    cout << it->first << it->second << " ";
cout << m.size() << m.count("kiwi");`, out: 'apple2 fig1 pear3 30',
    why: 'Keys come out in sorted order. There are 3 keys, and count("kiwi") is 0 (count does not insert).' },
  { id: 't26', m: 'm9', code: R`list<int> L;
for (int i = 1; i <= 4; i++) {
    if (i % 2) L.push_front(i);
    else L.push_back(i);
}
list<int>::iterator it = L.begin();
it++;
L.insert(it, 9);
L.pop_back();
for (it = L.begin(); it != L.end(); it++)
    cout << *it << " ";`, out: '3 9 1 2',
    why: 'The list grows as [1], [1 2], [3 1 2], [3 1 2 4]. 9 is inserted before the second element, then 4 is popped.' },
  { id: 't27', m: 'm10', code: R`int a = 7;
double d = 2.5;
char s[] = "C";
printf("%d|%3d|%-3d|%.1f|%s%c", a, a, a, d * a, s, s[0] + 1);`, out: '7|  7|7  |17.5|CD', exact: true,
    why: '%3d pads on the left, %-3d pads on the right, %.1f shows one decimal, and \'C\' + 1 printed with %c is D.' },
  { id: 't28', m: 'm10', code: R`char a[20] = "comp";
char b[] = "2113";
strcat(a, b);
int *p = (int *)malloc(sizeof(int) * 3);
for (int i = 0; i < 3; i++) p[i] = (int)strlen(a) - i;
printf("%s %d %d %d", a, p[0] + p[2], strcmp(a, "comp2113"), (int)strlen(b));
free(p);`, out: 'comp2113 14 0 4',
    why: 'a becomes "comp2113" (length 8). p holds 8 7 6. Equal strings compare as 0.' },
];

window.SHORT = [
  { id: 's1', m: 'm1', kind: 'Pipe', q: 'Write one combined command that prints how many <code>.cpp</code> files are in the current directory.',
    lang: 'sh', ans: `ls *.cpp | wc -l`, why: 'ls prints one name per line when piped, and wc -l counts the lines.' },
  { id: 's2', m: 'm1', kind: 'Pipe', q: '<code>marks.txt</code> has lines like <code>Alice,87</code>. Write one combined command that prints the <em>names</em> of the three highest scorers, highest first.',
    lang: 'sh', ans: `sort -t, -k2 -n -r marks.txt | head -3 | cut -d, -f1`,
    why: 'Sort numerically on field 2 in reverse, keep three lines, then cut out the name. Note -t for sort and -d for cut.' },
  { id: 's3', m: 'm1', kind: 'Pipe', q: 'Write one combined command that saves to <code>out.txt</code> every line of <code>access.log</code> that contains <code>404</code> but does not contain <code>admin</code>.',
    lang: 'sh', ans: `grep "404" access.log | grep -v "admin" > out.txt`, why: 'grep -v keeps the lines that do NOT match.' },
  { id: 's4', m: 'm1', kind: 'Command', q: 'Give the single <code>chmod</code> command that sets <code>run.sh</code> to: owner can read, write and execute; group can read and execute; others have no permission.',
    lang: 'sh', ans: `chmod 750 run.sh`, why: 'rwx = 7, r-x = 5, --- = 0. Equivalent: chmod u=rwx,g=rx,o= run.sh' },
  { id: 's5', m: 'm1', kind: 'Regex', q: 'Write a <code>grep</code> command that prints the lines of <code>f.txt</code> that start with a capital letter and end with a full stop.',
    lang: 'sh', ans: `grep -E '^[A-Z].*\\.$' f.txt`, why: '^ start, [A-Z] one capital, .* anything, \\. a literal dot, $ end.' },
  { id: 's6', m: 'm2', kind: 'Script', q: 'Write a complete Bash script that takes a file name as its first argument. If the file exists, print the number of lines in it (the number only). Otherwise print <code>File not found</code> to standard error.',
    lang: 'sh', ans: `#!/bin/bash
if [ -e "$1" ]
then
    n=\`wc -l < "$1"\`
    echo $n
else
    echo "File not found" >&2
fi`, why: 'Feeding the file with &lt; makes wc print the number alone. The notes\' alternative is wc -l file | cut -d" " -f1.' },
  { id: 's7', m: 'm2', kind: 'Script', q: 'Write a complete Bash script that compiles every <code>.cpp</code> file in the current directory into an executable with the same name without the extension (for example <code>a.cpp</code> into <code>a</code>). For each file print either <code>a.cpp: OK</code> or <code>a.cpp: FAILED</code>. Compiler messages must not appear on screen.',
    lang: 'sh', ans: `#!/bin/bash
list="\`ls *.cpp\`"
for f in $list
do
    exe=\${f/.cpp/}
    rm -f $exe
    g++ $f -o $exe 1>/dev/null 2>&1
    if [ -e $exe ]
    then
        echo "$f: OK"
    else
        echo "$f: FAILED"
    fi
done`, why: 'String replacement strips the extension. Removing the old executable first avoids a false OK from a previous build.' },
  { id: 's8', m: 'm2', kind: 'Git', q: 'You are on branch <code>main</code>. Write the Git commands to: create and switch to a branch <code>fix</code>, commit the changed file <code>a.cpp</code> there, then bring that commit into <code>main</code>.',
    lang: 'sh', ans: `git branch fix
git checkout fix
git add a.cpp
git commit -m "Fix bug in a.cpp"
git checkout main
git merge fix`, why: 'git checkout -b fix does the first two steps in one command.' },
  { id: 's9', m: 'm3', kind: 'Statement', q: '<code>x</code> holds a five-digit positive integer. Write a single C++ statement that stores its middle digit in <code>y</code>.',
    lang: 'cpp', ans: R`int y = x / 100 % 10;`, why: 'Dividing by 100 drops the last two digits. % 10 keeps the last digit of what remains.' },
  { id: 's10', m: 'm3', kind: 'Statement', q: 'Write a single C++ statement that sets <code>bool leap</code> to true when <code>year</code> is a leap year (divisible by 4 and not by 100, or divisible by 400).',
    lang: 'cpp', ans: R`bool leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;`, why: '&& binds tighter than ||, so the brackets are optional but make the intent clear.' },
  { id: 's11', m: 'm4', kind: 'Makefile', q: 'A program <code>app</code> is built from <code>main.cpp</code> and <code>util.cpp</code>. Both include <code>util.h</code>. Write a Makefile whose default target builds <code>app</code>, recompiles only what is needed, and has a <code>clean</code> target.',
    lang: 'make', ans: `app: main.o util.o
	g++ main.o util.o -o app

main.o: main.cpp util.h
	g++ -c main.cpp

util.o: util.cpp util.h
	g++ -c util.cpp

clean:
	rm -f app main.o util.o

.PHONY: clean`, why: 'The executable comes first so plain make builds it. Each .o lists its .cpp and the headers it includes.' },
  { id: 's12', m: 'm6', kind: 'Fix the bug', q: 'The program should print <code>same</code> but prints <code>different</code>. Fix it by changing one line.',
    code: R`line 1: char a[] = "exam";
line 2: char b[] = "exam";
line 3: if (a == b)
line 4:     cout << "same";
line 5: else
line 6:     cout << "different";`,
    lang: 'cpp', ans: R`line 3: if (strcmp(a, b) == 0)`, why: 'a == b compares the addresses of two different arrays.' },
  { id: 's13', m: 'm7', kind: 'Fix the bug', q: 'This code should sum all integers in <code>nums.txt</code>, but the last number is added twice. Propose a fix.',
    code: R`line 1: ifstream fin("nums.txt");
line 2: int x, sum = 0;
line 3: while (!fin.eof()) {
line 4:     fin >> x;
line 5:     sum += x;
line 6: }`,
    lang: 'cpp', ans: R`line 3: while (fin >> x) {
line 4: (delete this line)`, why: 'eof() only becomes true after a read has failed, so the loop runs one extra time with the old x.' },
  { id: 's14', m: 'm8', kind: 'Fix the bug', q: 'The function should print every value in the list, but the last value is never printed and the program crashes on an empty list. Fix it.',
    code: R`line 1: void print(Node *head) {
line 2:     Node *p = head;
line 3:     while (p->next != NULL) {
line 4:         cout << p->val << " ";
line 5:         p = p->next;
line 6:     }
line 7: }`,
    lang: 'cpp', ans: R`line 3:     while (p != NULL) {`, why: 'Testing p itself visits the last node and is safe when head is NULL.' },
  { id: 's15', m: 'm8', kind: 'Fix the bug', q: 'The program should print <code>0 1 4 9 16</code>. It has two errors. Specify the lines to change.',
    code: R`line 1: int n = 5;
line 2: int *sq = new int[n];
line 3: for (int i = 0; i <= n; i++)
line 4:     sq[i] = i * i;
line 5: for (int i = 0; i < n; i++)
line 6:     cout << sq[i] << " ";
line 7: delete sq;`,
    lang: 'cpp', ans: R`line 3: for (int i = 0; i < n; i++)
line 7: delete [] sq;`, why: 'i &lt;= n writes one element past the end. Memory from new[] must be released with delete [].' },
  { id: 's16', m: 'm8', kind: 'Fix the bug', q: 'The function should return an array holding <code>1..n</code>, but the caller reads garbage. Propose a fix that changes one line and say what the caller must now do.',
    code: R`line 1: int *range(int n) {
line 2:     int a[100];
line 3:     for (int i = 0; i < n; i++) a[i] = i + 1;
line 4:     return a;
line 5: }`,
    lang: 'cpp', ans: R`line 2:     int *a = new int[n];
// the caller must call  delete [] result;  when finished`, why: 'A local array is destroyed when the function returns. Heap memory survives until it is deleted.' },
  { id: 's17', m: 'm9', kind: 'Fix the bug', q: 'This code should print every element of the list. It does not compile. Fix it.',
    code: R`line 1: list<int> L;
line 2: // ... elements added ...
line 3: for (int i = 0; i < L.size(); i++)
line 4:     cout << L[i] << " ";`,
    lang: 'cpp', ans: R`line 3: for (list<int>::iterator it = L.begin(); it != L.end(); it++)
line 4:     cout << *it << " ";`, why: 'list has no operator[]. It must be traversed with an iterator.' },
  { id: 's18', m: 'm10', kind: 'Fix the bug', q: 'This C program should read an integer and a double, then print them. It crashes or prints garbage. Fix all errors.',
    code: R`line 1: int n;
line 2: double d;
line 3: scanf("%d", n);
line 4: scanf("%f", &d);
line 5: printf("%d %lf\n", n, d);`,
    lang: 'c', ans: R`line 3: scanf("%d", &n);
line 4: scanf("%lf", &d);`, why: 'scanf needs addresses, and a double needs %lf in scanf (%f is for float).' },
  { id: 's19', m: 'm10', kind: 'Command', q: 'Your program <code>list.cpp</code> crashes with a segmentation fault. Write the commands to compile it for debugging, start GDB, run it, and print the value of pointer <code>cur</code> at the crash.',
    lang: 'sh', ans: `g++ -g list.cpp -o list
gdb list
(gdb) r
(gdb) p cur
(gdb) q`, why: 'GDB stops on the faulting line. A value of 0x0 means cur is NULL.' },
  { id: 's20', m: 'm10', kind: 'Statement', q: 'Write C statements that allocate an array of <code>n</code> doubles with <code>malloc</code>, exit if the allocation fails, and later release it.',
    lang: 'c', ans: R`double *p = (double *)malloc(sizeof(double) * n);
if (p == NULL) { exit(EXIT_FAILURE); }
/* ... use p[0] .. p[n-1] ... */
free(p);`, why: 'Multiply by sizeof(double), cast the void pointer, check for NULL, free exactly once.' },
];

const NODE = R`struct Node {
    int val;
    Node *next;
};
`;
const LISTHELP = R`
void pushBack(Node *&head, int v) {
    Node *p = new Node; p->val = v; p->next = NULL;
    if (head == NULL) { head = p; return; }
    Node *c = head; while (c->next != NULL) c = c->next; c->next = p;
}
void show(Node *head) { for (Node *p = head; p != NULL; p = p->next) cout << p->val << " "; cout << "| "; }
`;

window.PROG = [
  { id: 'p1', m: 'm8', marks: 10, title: 'Insert into a sorted linked list',
    q: 'The list is kept in ascending order. Write <code>void insertSorted(Node *&amp;head, int v)</code> that inserts a new node with value <code>v</code> so the list stays sorted.',
    given: NODE, lang: 'cpp',
    sol: R`void insertSorted(Node *&head, int v) {
    Node *p = new Node;
    p->val = v;
    if (head == NULL || v <= head->val) {     // empty list, or new smallest
        p->next = head;
        head = p;
        return;
    }
    Node *cur = head;
    while (cur->next != NULL && cur->next->val < v)
        cur = cur->next;                      // stop at the node BEFORE the gap
    p->next = cur->next;
    cur->next = p;
}`,
    notes: ['Handle the head case first (empty list or value smaller than the head).', 'Look one node ahead with <code>cur-&gt;next</code> so you stop before the insertion point.', 'Link the new node first, then redirect the previous node.'],
    test: { pre: LISTHELP, main: R`Node *h = NULL; int a[] = {5, 1, 9, 3, 5, 0}; for (int i = 0; i < 6; i++) insertSorted(h, a[i]); show(h);`, out: '0 1 3 5 5 9 |' } },
  { id: 'p2', m: 'm8', marks: 10, title: 'Reverse a linked list',
    q: 'Write <code>void reverse(Node *&amp;head)</code> that reverses the list in place, without creating new nodes.',
    given: NODE, lang: 'cpp',
    sol: R`void reverse(Node *&head) {
    Node *prev = NULL;
    Node *cur = head;
    while (cur != NULL) {
        Node *next = cur->next;   // save the rest
        cur->next = prev;         // turn the arrow around
        prev = cur;               // advance both pointers
        cur = next;
    }
    head = prev;
}`,
    notes: ['Three pointers: prev, cur, next.', 'Save <code>cur-&gt;next</code> before overwriting it.', 'At the end prev is the new head.'],
    test: { pre: LISTHELP, main: R`Node *h = NULL; for (int i = 1; i <= 4; i++) pushBack(h, i); reverse(h); show(h); Node *e = NULL; reverse(e); show(e);`, out: '4 3 2 1 | |' } },
  { id: 'p3', m: 'm8', marks: 10, title: 'Merge two sorted lists',
    q: 'Two lists are each sorted in ascending order. Write <code>Node *merge(Node *a, Node *b)</code> that returns the head of one sorted list made by re-linking the existing nodes.',
    given: NODE, lang: 'cpp',
    sol: R`Node *merge(Node *a, Node *b) {
    if (a == NULL) return b;
    if (b == NULL) return a;
    if (a->val <= b->val) {
        a->next = merge(a->next, b);
        return a;
    } else {
        b->next = merge(a, b->next);
        return b;
    }
}`,
    notes: ['Recursive idea: the smaller head is the head of the result, and its next is the merge of what remains.', 'Base cases: when one list is empty, the answer is the other list.'],
    test: { pre: LISTHELP, main: R`Node *a = NULL, *b = NULL; int x[] = {1, 4, 6}, y[] = {2, 3, 7, 9}; for (int i = 0; i < 3; i++) pushBack(a, x[i]); for (int i = 0; i < 4; i++) pushBack(b, y[i]); show(merge(a, b));`, out: '1 2 3 4 6 7 9 |' } },
  { id: 'p4', m: 'm8', marks: 10, title: 'Count, and delete the k-th node',
    q: '(a) Write a <em>recursive</em> function <code>int length(Node *head)</code>. (b) Write <code>bool deleteAt(Node *&amp;head, int k)</code> that deletes the node at position <code>k</code> (the head is position 0) and returns false if there is no such node.',
    given: NODE, lang: 'cpp',
    sol: R`int length(Node *head) {
    if (head == NULL) return 0;
    return 1 + length(head->next);
}

bool deleteAt(Node *&head, int k) {
    if (head == NULL || k < 0) return false;
    if (k == 0) {
        Node *t = head;
        head = head->next;
        delete t;
        return true;
    }
    Node *cur = head;
    for (int i = 0; i < k - 1 && cur->next != NULL; i++)
        cur = cur->next;                  // cur = node at position k-1
    if (cur->next == NULL) return false;  // position k does not exist
    Node *t = cur->next;
    cur->next = t->next;
    delete t;
    return true;
}`,
    notes: ['Position 0 changes head, so it is a separate case.', 'Walk to position k-1, then bypass and delete.'],
    test: { pre: LISTHELP, main: R`Node *h = NULL; for (int i = 1; i <= 5; i++) pushBack(h, i * 10); cout << length(h) << " "; cout << deleteAt(h, 0) << deleteAt(h, 3) << deleteAt(h, 3) << deleteAt(h, 1) << " "; show(h); cout << length(h);`, out: '5 1101 20 40 | 2' } },
  { id: 'p5', m: 'm5', marks: 10, title: 'Recursion: power and palindrome',
    q: '(a) Write a recursive function <code>int power(int b, int e)</code> that returns b<sup>e</sup> for e &ge; 0. (b) Write a recursive function <code>bool isPal(string s)</code> that returns true when <code>s</code> reads the same forwards and backwards.',
    lang: 'cpp',
    sol: R`int power(int b, int e) {
    if (e == 0) return 1;
    return b * power(b, e - 1);
}

bool isPal(string s) {
    if (s.length() <= 1) return true;
    if (s[0] != s[s.length() - 1]) return false;
    return isPal(s.substr(1, s.length() - 2));
}`,
    notes: ['State the base case first.', 'For the palindrome: compare the two ends, then recurse on the middle.'],
    test: { main: R`cout << power(2, 10) << " " << power(7, 0) << " " << isPal("racecar") << isPal("abca") << isPal("") << isPal("aa");`, out: '1024 1 1011' } },
  { id: 'p6', m: 'm7', marks: 10, title: 'File I/O: class average',
    q: '<code>scores.txt</code> contains one student per line: a one-word name followed by an integer score. Write a complete program that prints the name of the top student and the class average to 2 decimal places, in the format shown. If the file cannot be opened, print <code>Error opening file</code> and exit.<pre>Top: Ben 91\nAverage: 78.33</pre>',
    lang: 'cpp',
    sol: R`#include <iostream>
#include <fstream>
#include <iomanip>
#include <string>
#include <cstdlib>
using namespace std;

int main() {
    ifstream fin;
    fin.open("scores.txt");
    if (fin.fail()) {
        cout << "Error opening file" << endl;
        exit(1);
    }
    string name, topName;
    int score, topScore = -1, count = 0;
    double sum = 0;
    while (fin >> name >> score) {
        sum += score;
        count++;
        if (score > topScore) {
            topScore = score;
            topName = name;
        }
    }
    fin.close();
    cout << "Top: " << topName << " " << topScore << endl;
    cout << fixed << setprecision(2);
    cout << "Average: " << sum / count << endl;
    return 0;
}`,
    notes: ['Open, check <code>fail()</code>, loop on the read, close.', 'sum is a double so the division is not integer division.'],
    test: { full: true, files: { 'scores.txt': 'Amy 80\nBen 91\nCat 64\n' }, out: 'Top: Ben 91 Average: 78.33' } },
  { id: 'p7', m: 'm7', marks: 10, title: 'Array of structs and sorting',
    q: 'Given <code>struct Student { string name; int score; };</code> write <code>void sortByScore(Student s[], int n)</code> that sorts the array into <em>descending</em> order of score using selection sort.',
    given: R`struct Student {
    string name;
    int score;
};
`, lang: 'cpp',
    sol: R`void sortByScore(Student s[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int imax = i;
        for (int j = i + 1; j < n; j++)
            if (s[j].score > s[imax].score)
                imax = j;
        Student temp = s[i];      // whole-struct assignment
        s[i] = s[imax];
        s[imax] = temp;
    }
}`,
    notes: ['Selection sort: find the best remaining element, swap it into position i.', 'Structs can be swapped whole with a temp variable.'],
    test: { main: R`Student s[] = {{"A", 50}, {"B", 90}, {"C", 70}, {"D", 95}}; sortByScore(s, 4); for (int i = 0; i < 4; i++) cout << s[i].name << s[i].score << " ";`, out: 'D95 B90 C70 A50' } },
  { id: 'p8', m: 'm9', marks: 10, title: 'STL map: word frequency',
    q: 'Write a complete program that reads words from <code>words.txt</code> (separated by whitespace) and prints each distinct word with the number of times it appears, one per line, in alphabetical order.',
    lang: 'cpp',
    sol: R`#include <iostream>
#include <fstream>
#include <string>
#include <map>
using namespace std;

int main() {
    ifstream fin("words.txt");
    if (fin.fail()) {
        cout << "Error opening file" << endl;
        return 1;
    }
    map<string, int> freq;
    string w;
    while (fin >> w)
        freq[w]++;
    fin.close();

    map<string, int>::iterator it;
    for (it = freq.begin(); it != freq.end(); it++)
        cout << it->first << " " << it->second << endl;
    return 0;
}`,
    notes: ['<code>freq[w]++</code> creates the key with 0 on first use.', 'A map iterates in key order, so no sorting is needed.'],
    test: { full: true, files: { 'words.txt': 'pear apple pear\nfig apple pear\n' }, out: 'apple 2 fig 1 pear 3' } },
  { id: 'p9', m: 'm9', marks: 10, title: 'STL vector: keep the evens',
    q: 'Write <code>vector&lt;int&gt; *evens(const vector&lt;int&gt; &amp;v)</code> that returns a pointer to a new heap-allocated vector containing only the even numbers of <code>v</code>, in ascending order.',
    lang: 'cpp',
    sol: R`vector<int> *evens(const vector<int> &v) {
    vector<int> *ans = new vector<int>();
    for (vector<int>::const_iterator it = v.begin(); it != v.end(); ++it)
        if (*it % 2 == 0)
            ans->push_back(*it);
    sort(ans->begin(), ans->end());
    return ans;
}`,
    notes: ['A const container needs a <code>const_iterator</code>.', 'ans is a pointer, so use <code>-&gt;</code>.', 'The caller owns the result and must <code>delete</code> it.'],
    test: { main: R`int a[] = {9, 4, 7, 2, 8, 4}; vector<int> v(a, a + 6); vector<int> *e = evens(v); for (int i = 0; i < (int)e->size(); i++) cout << (*e)[i] << " "; delete e;`, out: '2 4 4 8' } },
  { id: 'p10', m: 'm8', marks: 10, title: 'Growing a dynamic array',
    q: 'Write <code>void append(int *&amp;arr, int &amp;n, int v)</code>. <code>arr</code> points to a dynamic array of <code>n</code> ints. The function must make the array one element longer, with <code>v</code> at the end, and update <code>n</code>. No memory may be leaked.',
    lang: 'cpp',
    sol: R`void append(int *&arr, int &n, int v) {
    int *bigger = new int[n + 1];
    for (int i = 0; i < n; i++)
        bigger[i] = arr[i];        // copy the old content
    bigger[n] = v;
    delete [] arr;                 // release the old block
    arr = bigger;                  // caller now sees the new block
    n++;
}`,
    notes: ['Allocate, copy, delete the old block, redirect the pointer.', 'Both arr and n are passed by reference because both change.'],
    test: { main: R`int n = 0; int *a = new int[0]; for (int i = 1; i <= 4; i++) append(a, n, i * i); for (int i = 0; i < n; i++) cout << a[i] << " "; cout << n; delete [] a;`, out: '1 4 9 16 4' } },
  { id: 'p11', m: 'm10', marks: 10, title: 'C: reverse and average with malloc',
    q: 'Write a complete <strong>C</strong> program that reads an integer <code>n</code>, then <code>n</code> integers, and prints the integers in reverse order on one line followed by their average to 1 decimal place on the next line. Use <code>malloc</code> for the array.',
    lang: 'c',
    sol: R`#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    scanf("%d", &n);
    int *a = (int *)malloc(sizeof(int) * n);
    if (a == NULL) { exit(EXIT_FAILURE); }

    int sum = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
        sum += a[i];
    }
    for (int i = n - 1; i >= 0; i--)
        printf("%d ", a[i]);
    printf("\n%.1f\n", (double)sum / n);

    free(a);
    return 0;
}`,
    notes: ['<code>&amp;a[i]</code> (or <code>a + i</code>) in scanf.', 'Cast before dividing to avoid integer division.', 'Free what you malloc.'],
    test: { full: true, stdin: '4\n3 8 1 5\n', out: '5 1 8 3 4.2' } },
  { id: 'p12', m: 'm6', marks: 10, title: 'C-strings with pointers',
    q: 'Without using any library function, write (a) <code>int myStrlen(const char *s)</code> and (b) <code>void toUpper(char *s)</code> that converts every lowercase letter in <code>s</code> to uppercase in place.',
    lang: 'cpp',
    sol: R`int myStrlen(const char *s) {
    int n = 0;
    while (s[n] != '\0')
        n++;
    return n;
}

void toUpper(char *s) {
    for (int i = 0; s[i] != '\0'; i++)
        if (s[i] >= 'a' && s[i] <= 'z')
            s[i] = s[i] - 'a' + 'A';
}`,
    notes: ['Loop until the null terminator.', 'Letter arithmetic: subtract <code>\'a\'</code> to get 0..25, add <code>\'A\'</code>.'],
    test: { main: R`char s[] = "Comp2113 exam!"; toUpper(s); cout << s << " " << myStrlen(s) << " " << myStrlen("");`, out: 'COMP2113 EXAM! 14 0', exact: true } },
  { id: 'p13', m: 'm2', marks: 10, title: 'Shell script: grade report',
    q: 'Write a Bash script <code>report.sh</code> that takes a file name as its argument. Each line of the file is <code>UID,name,score</code> (no spaces). For every line print <code>name: PASS</code> if the score is 50 or more, otherwise <code>name: FAIL</code>. Finish with <code>Passed: p of n</code>. If the file does not exist, print <code>No such file</code> to standard error and stop.',
    lang: 'sh',
    sol: `#!/bin/bash
if [ ! -f "$1" ]
then
    echo "No such file" >&2
    exit 1
fi
n=0
p=0
for line in \`cat $1\`
do
    name=\`echo $line | cut -d, -f2\`
    score=\`echo $line | cut -d, -f3\`
    let "n = $n + 1"
    if [ $score -ge 50 ]
    then
        echo "$name: PASS"
        let "p = $p + 1"
    else
        echo "$name: FAIL"
    fi
done
echo "Passed: $p of $n"`,
    notes: ['The lines contain no spaces, so a for loop over the output of cat visits one line at a time.', 'cut -d, -f2 takes the second comma-separated field. Numbers are compared with -ge, not &gt;=.', 'let does arithmetic. &gt;&amp;2 sends the error message to standard error.'],
    sh: { files: { 'marks.txt': '3030111111,Amy,72\n3030222222,Ben,49\n3030333333,Cat,50\n' }, script: 'report.sh', args: 'marks.txt', out: 'Amy: PASS Ben: FAIL Cat: PASS Passed: 2 of 3' } },
  { id: 'p14', m: 'm4', marks: 10, title: 'Makefile from a description',
    q: 'A program <code>library</code> is built from <code>library.cpp</code>, <code>book.cpp</code> and <code>member.cpp</code>. <code>library.cpp</code> includes <code>member.h</code>. <code>member.h</code> includes <code>book.h</code>. <code>book.cpp</code> includes <code>book.h</code>. <code>member.cpp</code> includes <code>member.h</code>. (a) Draw the dependency graph. (b) Which files are rebuilt after editing <code>book.h</code>, and after editing <code>member.cpp</code>? (c) Write the Makefile using a <code>FLAGS</code> variable, the automatic variables, and a phony <code>clean</code> target.',
    lang: 'make',
    sol: `# (a) library   -> library.o, book.o, member.o
#     library.o -> library.cpp, member.h, book.h   (book.h comes in through member.h)
#     book.o    -> book.cpp, book.h
#     member.o  -> member.cpp, member.h, book.h
# (b) book.h: all three .o files are recompiled, then library is relinked.
#     member.cpp: only member.o is recompiled, then library is relinked.

FLAGS = -pedantic-errors -std=c++11

library: library.o book.o member.o
	g++ $(FLAGS) $^ -o $@

library.o: library.cpp member.h book.h
	g++ $(FLAGS) -c $<

book.o: book.cpp book.h
	g++ $(FLAGS) -c $<

member.o: member.cpp member.h book.h
	g++ $(FLAGS) -c $<

clean:
	rm -f library library.o book.o member.o

.PHONY: clean`,
    notes: ['One rule for the executable (first), one per object file.', '<code>$^</code> for linking (all objects), <code>$&lt;</code> for compiling (just the .cpp).'] },
];
})();
