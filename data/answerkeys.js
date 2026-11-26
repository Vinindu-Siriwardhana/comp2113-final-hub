/* COMP2113 Final Hub — full answer keys for every past paper in the folder.
   Keyed by the paper item id built in app.js: <paper id>-<question number without punctuation>.
   answer : the answer as you would write it in the exam
   work   : step-by-step working (HTML)
   wrong  : for MCQs, why each option is right or wrong (same order as the options)
   full   : a complete program that contains the answer; tools/verify.js compiles and runs it
            and checks that its output equals `out` (stdin / files / c / sh as needed)
   points : what a marker looks for */
(function () {
const R = String.raw;

/* The model answer of a paper item (papers.js loads first), so the tested script is the shown one. */
const SCRIPT = id => {
  for (const p of window.PAPERS) for (const s of p.sections) for (const it of s.items)
    if (p.id + '-' + it.n.replace(/\W/g, '') === id) return it.ans;
  throw new Error('No paper item ' + id);
};

const MASK_FULL = (deliverBody, extra, mainBody) => R`#include <iostream>
#include <string>
using namespace std;

struct Mask {
    string type;
    string customer;
    Mask *next;
};

void order(Mask *&head, string type, string customer) {
    cout << "Ordering " << type << " for " << customer << endl;
    Mask *oldHead = head;
    head = new Mask;
    head->type = type;
    head->customer = customer;
    head->next = oldHead;
}

void output(Mask *head) {
    cout << "Outputting order list " << endl;
    for (Mask *p = head; p != NULL; p = p->next)
        cout << " " << p->type << " for " << p->customer << endl;
}
` + deliverBody + extra + R`
int main() {
` + mainBody + R`}
`;

const DELIVER = R`
void deliver(Mask *&head) {
    if (head == NULL)
        return;
    if (head->next == NULL) {
        cout << "Delivering " << head->type;
        cout << " for " << head->customer << endl;
        delete head;
        head = NULL;
        return;
    }
    Mask *cur = head;
    while (cur->next->next != NULL)
        cur = cur->next;
    cout << "Delivering " << cur->next->type;
    cout << " for " << cur->next->customer << endl;
    delete cur->next;
    cur->next = NULL;
}
`;

const REMOVE = R`
void remove(Mask *&head) {
    while (head != NULL && head->type == "3M-N95") {
        Mask *t = head;
        head = head->next;
        delete t;
    }
    if (head == NULL)
        return;
    Mask *cur = head;
    while (cur->next != NULL) {
        if (cur->next->type == "3M-N95") {
            Mask *t = cur->next;
            cur->next = t->next;
            delete t;
        } else {
            cur = cur->next;
        }
    }
}
`;

window.KEYS = {
/* =================== 2019-20 Section A =================== */
'y1920-A1': { answer: 'A. wc', wrong: ['Correct. wc prints lines, words and bytes, in that order.', 'Not a Linux command.', 'Not a Linux command.', 'Wrong, because A works.'] },
'y1920-A2': { answer: 'C. sort', wrong: ['sort -r sorts in <em>reverse</em> order.', 'sh starts a new shell. It does not sort.', 'Correct. Without options sort uses alphabetical order.', 'Wrong, because C works.'] },
'y1920-A3': { answer: 'B. cpio', wrong: ['copy is a Windows command, not Linux.', 'Correct. cpio ("copy in and out") copies files and whole directory structures into and out of archives.', 'cp -p copies files keeping their mode, owner and timestamps. It does not handle archives ("in and out").', 'Wrong, because B works.'], work: ['This command is not in the course notes. Treat it as one fact to memorise: <b>cpio = copy in / copy out</b>.'] },
'y1920-A4': { answer: 'A. cat 1.txt', wrong: ['Correct. cat prints the content of a file.', 'print is not a standard Bash command (the Korn shell has one).', 'echo prints its arguments: the text "1.txt", not the file.', 'Wrong, because A works.'] },
'y1920-A5': { answer: 'B. man more', wrong: ['help describes Bash built-in commands only, and more is not a built-in.', 'Correct. man shows the manual page with all options.', 'Not a command.', 'Wrong, because B works.'] },
'y1920-A6': { answer: 'D. if (!(num - 65))', work: ['<code>num != 65</code> is true exactly when num is not 65.', 'A: num &gt; 65 or num &lt; 65 means num is not 65. Same.', 'B: not (num == 65). Same.', 'C: num − 65 is non-zero (true) exactly when num is not 65. Same.', 'D: !(num − 65) is true only when num − 65 is 0, i.e. num == 65. This is the <b>opposite</b>.'], wrong: ['Equivalent, so it can replace the condition.', 'Equivalent, so it can replace the condition.', 'Equivalent: any non-zero value is true.', 'Correct: this is num == 65, the opposite.'] },
'y1920-A7': { answer: 'A. // This is a comment', wrong: ['Correct.', 'A block comment must be closed with */. As written it never ends.', '# starts a pre-processor directive in C/C++ (and a comment in shell or Python).', 'Triple quotes are Python syntax.'] },
'y1920-A8': { answer: 'A', wrong: ['Correct: a prototype declares; return type double, one int parameter.', 'double is the return type, not the name; and a prototype does not define.', 'x is the parameter name; its type is int. A prototype does not define.', 'Parameter and return types are swapped.'] },
'y1920-A9': { answer: 'D. Calculates the factorial', work: ['mystery(4) = 4 × mystery(3) = 4 × 3 × mystery(2) = 4 × 3 × 2 × mystery(1) = 4 × 3 × 2 × 1 = 24.'], wrong: ['It compiles.', 'The base case number &lt;= 1 stops the recursion.', 'Only mystery(0) and mystery(1) return 1.', 'Correct.'] },
'y1920-A10': { answer: 'B. strlen()', wrong: ['len() is Python.', 'Correct: from string.h.', 'Not a standard function.', 'length() is a member of the C++ string class, which C does not have.'] },
'y1920-A11': { answer: 'D', wrong: ['A pointer never assigned holds a garbage address: dereferencing it can crash.', 'Same problem as A.', 'Dereferencing NULL crashes the program.', 'Correct: dereferencing a non-pointer is rejected by the compiler. It never reaches run time.'] },
'y1920-A12': { answer: 'C. &t[3]', wrong: ['*(tPtr + 3) is the value of element 3.', 'tPtr[3] is the value of element 3.', 'Correct: & takes the address of element 3. (t + 3 and tPtr + 3 are also addresses.)', '*(t + 3) is the value of element 3.'] },
'y1920-A13': { answer: 'A', wrong: ['Correct: the * belongs to x only.', 'Would need string *x, *y;', 'The other way round.', 'Wrong, because A is right.'] },
'y1920-A14': { answer: 'C. Compile time', wrong: ['Includes are gone long before the program runs.', 'Not a real stage.', 'Correct: the pre-processor runs as the first stage of compilation.', 'Not a real stage.'] },
'y1920-A15': { answer: 'C. s2.insert(0, s1, 0, 3);', work: ['insert(pos, str, subpos, sublen) inserts str.substr(subpos, sublen) before position pos.', 'C: s1.substr(0, 3) is "com"; inserting it at position 0 of "promise" gives "compromise".'],
  wrong: ['Inserts all of "promise" at position 4 of "computer": "comppromiseuter".', 'string::npos is not a valid insert position, so this throws out_of_range.', 'Correct.', 'Inserts "com" at position 3 of "promise": "procommise".'],
  full: R`#include <iostream>
#include <string>
using namespace std;

int main() {
    string s1 = "computer", s2 = "promise";
    string a = s1, d = s2, c = s2;
    a.insert(4, s2, 0, string::npos);
    c.insert(0, s1, 0, 3);
    d.insert(3, s1, 0, 3);
    cout << a << " " << c << " " << d << endl;
    return 0;
}`, out: 'comppromiseuter compromise procommise' },

/* =================== 2019-20 Section B =================== */
'y1920-B1': { answer: '9', work: [
  'Start: x = 3, y = 2, z = 1.',
  'z / 3 = 1 / 3 = 0 (integer division), so <code>z / 3 == 0</code> is true.',
  'x % 3 = 0, so <code>x % 3 == 0</code> is true.',
  'y % x = 2 % 3 = 2, so <code>y % x == 1</code> is false. The whole && condition is false and <code>x += 1</code> is skipped.',
  'y += x / 2 → y = 2 + 3 / 2 = 2 + 1 = 3.',
  'x * y * z = 3 × 3 × 1 = <b>9</b>.'],
  points: ['Integer division 1 / 3 = 0 and 3 / 2 = 1.', 'Recognising the if body does not run.'] },
'y1920-B2': { answer: '1 5 4 2 5 1', work: [
  'main: a = 1. Inside the block, the first cout runs <em>before</em> the inner a is declared, so it prints the outer a: <b>1</b>.',
  'Inner a = 2 is declared. f(2): parameter a = 2, then a = a * a = 4.',
  'In f\'s inner block a new a = 4; ++a makes it 5 and prints <b>5</b>. The block ends.',
  'f prints its parameter a: <b>4</b>.',
  'Back in main\'s block, the inner a is still 2 (f got a copy): prints <b>2</b>. The block ends and the inner a disappears.',
  'f(a) with the outer a = 1: parameter becomes 1 × 1 = 1. The inner block prints <b>5</b>, then the parameter prints <b>1</b>.'],
  points: ['Each { } block creates a new scope.', 'Pass by value: f never changes main\'s a.'] },
'y1920-B3': { answer: '3130', work: [
  '<table class="plain"><tr><th>i</th><th>n[i]</th><th>k = n[i] − \'0\'</th><th>j = j × 10 + k + 1</th></tr><tr><td>0</td><td>\'2\'</td><td>2</td><td>0 × 10 + 2 + 1 = 3</td></tr><tr><td>1</td><td>\'0\'</td><td>0</td><td>3 × 10 + 0 + 1 = 31</td></tr><tr><td>2</td><td>\'1\'</td><td>1</td><td>31 × 10 + 1 + 1 = 312</td></tr><tr><td>3</td><td>\'9\'</td><td>9</td><td>312 × 10 + 9 + 1 = 3130</td></tr></table>',
  'n[4] is \'\\0\', so the loop stops. f returns <b>3130</b>.'],
  points: ['Character minus \'0\' gives the digit value.'] },
'y1920-B4': { answer: '6 5 4 7 5 1', work: [
  'main\'s array: a[0..5] = 6 5 4 3 2 1. q = &a[2].',
  'In f: p points at main\'s a[2]. The local <code>a = &amp;p[1]</code> points at main\'s a[3]. So f\'s a[i] is main\'s a[i + 3].',
  'size = 3, so the loop runs i = 1, then i = 0.',
  'i = 1: f\'s a[1] += a[0] → main a[4] += main a[3] → 2 + 3 = <b>5</b>.',
  'i = 0: f\'s a[0] += a[−1] → main a[3] += main a[2] → 3 + 4 = <b>7</b>.',
  'Final array: 6 5 4 7 5 1. (cout prints a space after each, including the last.)'],
  points: ['Mapping each local index to the real array element.', 'Negative index a[−1] is legal here because it is still inside main\'s array.'] },
'y1920-B5': { answer: 'grep "wonderful" day.txt | sort | head -15 | wc -c', work: ['grep keeps the lines containing wonderful.', 'sort orders them alphabetically.', 'head -15 keeps the first fifteen.', 'wc -c counts the characters (bytes), including newlines.'],
  sh: { files: { 'day.txt': 'a wonderful day\nnothing here\nwhat a wonderful world\n' }, cmd: 'grep "wonderful" day.txt | sort | head -15 | wc -c', out: '39' }, shNote: 'Checked on a small day.txt with two matching lines (16 + 23 characters including newlines).' },
'y1920-B6': { answer: 'y = x / 10 % 100;', work: ['Example x = 1234. x / 10 = 123 drops the last digit.', '123 % 100 = 23 keeps the last two digits of what remains.', 'Equivalent: <code>y = x % 1000 / 10;</code> (1234 % 1000 = 234, 234 / 10 = 23).'],
  full: R`#include <iostream>
using namespace std;

int main() {
    int x = 1234, y;
    y = x / 10 % 100;
    cout << y << " ";
    x = 9075;
    y = x / 10 % 100;
    cout << y << endl;
    return 0;
}`, out: '23 7', points: ['A middle pair like 07 prints as 7 because y is an int; that is still correct.'] },
'y1920-B7': { answer: 'line 4:  int *p1, *p2;', work: ['In <code>int* p1, p2;</code> only p1 is a pointer; p2 is an int.', 'So <code>p2 = &amp;n</code> tries to store an address in an int: compile error.', 'Putting * before each name makes both pointers. Then p1 = p2 = &amp;n works and *p1 is 42.'],
  full: R`#include <stdio.h>

int main() {
    int *p1, *p2;
    int n = 42;
    p1 = p2 = &n;
    printf("%d", *p1);
    return 0;
}`, c: true, out: '42' },
'y1920-B8': { answer: 'line 10:  double *index = p + SIZE - 1;', work: ['malloc gives 42 doubles: valid addresses are p + 0 to p + 41.', 'The loop stores 0 to 41, so the last value 41 is at p + 41 = p + SIZE − 1.', 'p + SIZE is one past the end: reading it is undefined behaviour.', 'Good practice: add <code>free(p);</code> before return 0 (not required for the output).'],
  full: R`#include <stdio.h>
#include <stdlib.h>

int main() {
    const int SIZE = 42;
    double *p;
    if ((p = (double*)malloc(sizeof(double)*SIZE)) == NULL)
    { exit(EXIT_FAILURE); }
    for (int i = 0; i < SIZE; i++)
    { *(p + i) = i; }
    double *index = p + SIZE - 1;
    double lastVal = *index;
    printf("%lf\n", lastVal);
    free(p);
    return 0;
}`, c: true, out: '41.000000', outNote: 'printf with %lf shows six decimals, so the program prints 41.000000.' },

/* =================== 2019-20 Section C =================== */
'y1920-C1a': { answer: 'Iterative binary search (below)', work: ['The interval is [l, r], inclusive. Loop while it is not empty: <code>l &lt;= r</code>.', 'mid = l + (r − l) / 2 (the same as (l + r) / 2, but cannot overflow).', 'Found: return mid. Key smaller: keep the lower half, r = mid − 1. Key larger: keep the upper half, l = mid + 1.', 'Loop ends with l &gt; r: return −1.'],
  full: R`#include <stdio.h>

int BinarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == x)
            return mid;
        if (x < arr[mid])
            r = mid - 1;
        else
            l = mid + 1;
    }
    return -1;
}

int main(void) {
    int arr[] = { 2, 3, 4, 10, 40 };
    int n = sizeof(arr) / sizeof(arr[0]);
    int x = 10;
    int index = BinarySearch(arr, 0, n - 1, x);
    if (index == -1)
        printf("Element is not present in array");
    else
        printf("Element is present at index %d", index);
    return 0;
}`, c: true, out: 'Element is present at index 3',
  points: ['Correct loop condition l <= r (not l < r, which misses one-element intervals).', 'mid − 1 and mid + 1 so the interval always shrinks.', 'Returns −1 when not found.', 'Complete function including the header.'] },
'y1920-C1b': { answer: 'Recursive binary search (below)', work: ['Base case 1: empty interval (l &gt; r) → return −1.', 'Base case 2: arr[mid] == x → return mid.', 'Otherwise recurse on one half and <b>return</b> its result.'],
  full: R`#include <stdio.h>

int BinarySearch(int arr[], int l, int r, int x) {
    if (l > r)
        return -1;
    int mid = l + (r - l) / 2;
    if (arr[mid] == x)
        return mid;
    if (x < arr[mid])
        return BinarySearch(arr, l, mid - 1, x);
    return BinarySearch(arr, mid + 1, r, x);
}

int main(void) {
    int arr[] = { 2, 3, 4, 10, 40 };
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("%d %d %d %d", BinarySearch(arr, 0, n - 1, 10), BinarySearch(arr, 0, n - 1, 2),
           BinarySearch(arr, 0, n - 1, 40), BinarySearch(arr, 0, n - 1, 5));
    return 0;
}`, c: true, out: '3 0 4 -1', points: ['Both base cases.', 'return in front of each recursive call.', 'Correct new bounds for each half.'] },
'y1920-C2a': { answer: 'deliver() that removes the tail (below)', work: ['order() inserts at the head, so the head is the newest order and the <b>tail</b> is the oldest.', 'To delete the tail you need the second-last node, whose next must become NULL.', 'Three cases: empty list (do nothing), one node (head changes to NULL), several nodes (walk to the second-last).'],
  full: MASK_FULL(DELIVER, '', R`    Mask *head = NULL;
    order(head, "3M-N95" , "Alice");
    order(head, "OxyAir" , "Bruce");
    order(head, "3M-N95" , "Cindy");
    output(head);
    deliver(head);
    output(head);
`), out: 'Ordering 3M-N95 for Alice\nOrdering OxyAir for Bruce\nOrdering 3M-N95 for Cindy\nOutputting order list \n 3M-N95 for Cindy\n OxyAir for Bruce\n 3M-N95 for Alice\nDelivering 3M-N95 for Alice\nOutputting order list \n 3M-N95 for Cindy\n OxyAir for Bruce',
  outNote: 'This matches the "correct implementation" output printed in the question.',
  points: ['Prints the right customer before deleting.', 'Handles the single-node case by setting head to NULL.', 'Stops at the second-last node.', 'Frees the node with delete.'] },
'y1920-C2b': { answer: 'remove() that deletes every 3M-N95 order (below)', work: ['Phase 1: while the head itself is a 3M-N95 order, delete it and move head on. This may empty the list.', 'Phase 2: look one node ahead with cur->next. If it matches, bypass and delete it, and <b>do not advance</b> (the new next may match too). Otherwise advance.'],
  full: MASK_FULL(DELIVER, REMOVE, R`    Mask *head = NULL;
    order(head, "3M-N95", "A");
    order(head, "OxyAir", "B");
    order(head, "3M-N95", "C");
    order(head, "3M-N95", "D");
    order(head, "Cloth", "E");
    order(head, "3M-N95", "F");
    remove(head);
    output(head);
`), out: 'Ordering 3M-N95 for A\nOrdering OxyAir for B\nOrdering 3M-N95 for C\nOrdering 3M-N95 for D\nOrdering Cloth for E\nOrdering 3M-N95 for F\nOutputting order list \n Cloth for E\n OxyAir for B',
  outNote: 'The test list has matches at the head, two in a row in the middle, and at the tail.',
  points: ['Handles matches at the head (head changes).', 'Handles consecutive matches.', 'Handles a list that becomes empty.', 'Frees every removed node.'] },

/* =================== Sample paper =================== */
'sample-Q1a': { answer: 'for i in {0..100..3}; do echo $i; done', work: ['{start..end..step} generates 0 3 6 ... 99.', 'Alternative with arithmetic: <code>for (( i=0; i&lt;=100; i=i+3 )); do echo $i; done</code>.', 'The question asks for a complete script, so include <code>#!/bin/bash</code>.'],
  full: `#!/bin/bash
for i in {0..100..3}; do echo $i; done`, sh: true, out: '0 3 6 9 12 15 18 21 24 27 30 33 36 39 42 45 48 51 54 57 60 63 66 69 72 75 78 81 84 87 90 93 96 99' },
'sample-Q1b': { answer: 'touch foo.txt then chmod 400 foo.txt', work: ['touch creates the empty file.', '400 = r-- --- ---: the owner may only read; nobody may write.', 'chmod a-w foo.txt or chmod 444 foo.txt are also read-only answers.'],
  full: `#!/bin/bash
touch foo.txt
chmod 400 foo.txt` },
'sample-Q2a': { answer: 'Dependency graph (below)', work: ['Follow every #include: thing.h includes gadget.h, so anything including thing.h also depends on gadget.h.',
  '<pre>widget\n ├─ widget.o ─ widget.c, gadget.h, thing.h\n ├─ thing.o  ─ thing.c, thing.h, gadget.h\n └─ gadget.o ─ gadget.c, gadget.h</pre>'], points: ['Three .o files under widget.', 'thing.o depends on gadget.h through thing.h.'] },
'sample-Q2b': { answer: 'Makefile (below)', full: `widget: widget.o thing.o gadget.o
	gcc -o widget widget.o thing.o gadget.o

widget.o: widget.c gadget.h thing.h
	gcc -c widget.c

thing.o: thing.c thing.h gadget.h
	gcc -c thing.c

gadget.o: gadget.c gadget.h
	gcc -c gadget.c`, lang: 'make', work: ['The executable rule comes first, so plain make builds widget.', 'Each command line starts with a tab.', 'These are .c files, so the official answer uses gcc.'], points: ['One rule per object file with the right headers.', 'Link rule lists all three object files.'] },
'sample-Q3': { answer: 'Make both slopes double, and use == in the return', work: ['Slope1 = (63 − 12) / (69 − 11) = 51 / 58 ≈ 0.879. Stored in an int it becomes 0.', 'Slope2 for P3 = (29 − 12) / (33 − 11) = 17 / 22 ≈ 0.773 → 0 as an int. So both slopes are 0, wrongly "equal".', '<code>return (Slope1 = Slope2);</code> assigns and returns Slope2 (0, false), which is why every answer is 0.', 'Fix: <code>double Slope1</code>, <code>double Slope2</code>, and <code>return (Slope1 == Slope2);</code>. For P4, 25.5 / 29 equals 51 / 58 exactly, so the output is 0 then 1.'],
  full: R`#include <iostream>
using namespace std;

struct Point {
    int X;
    double Y;
};
struct Line {
    Point End1;
    Point End2;
};
bool Online(Point P, Line L) {
    double Slope1 =
        (L.End2.Y - L.End1.Y) / (L.End2.X - L.End1.X);
    double Slope2 = (P.Y - L.End1.Y) / (P.X - L.End1.X);
    return (Slope1 == Slope2);
}
int main() {
    Point P1 = {11, 12};
    Point P2 = {69, 63};
    Point P3 = {33, 29};
    Point P4 = {40, 37.5};
    Line L = {P1, P2};
    cout << Online(P3, L) << endl;
    cout << Online(P4, L) << endl;
    return 0;
}`, out: '0\n1', points: ['Both int slopes changed to double.', '= changed to ==.', 'Line numbers stated (the printed paper\'s numbering is slightly off, so quote the code too).'] },
'sample-Q4a': { answer: 'sort infile.txt', work: ['sort prints the sorted lines to the screen and leaves the file unchanged.'] },
'sample-Q4b': { answer: 'readFile (see the complete program below)', work: ['Open with f.c_str(), check fail(), read whole lines with getline (one entry is "Visual Basic", which contains a space), count them, close, set n.'] },
'sample-Q4c': { answer: 'swap (see the complete program below)', work: ['Both parameters are references, so a temporary is needed: temp = a; a = b; b = temp.'] },
'sample-Q4d': { answer: 'selectionSort (complete program below)', work: ['For each i from 0 to n − 2: find the index of the smallest string in w[i..n−1], then swap it into position i.', 'Strings compare in character-code order, so capitals come first: "PHP" &lt; "Perl" because \'H\' (72) &lt; \'e\' (101).'],
  full: R`#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
using namespace std;

void readFile(string f, string w[], int &n) {
    ifstream fin;
    fin.open(f.c_str());
    if (fin.fail()) {
        cout << "Error opening file" << endl;
        exit(1);
    }
    int count = 0;
    string line;
    while (getline(fin, line)) {
        w[count] = line;
        count++;
    }
    fin.close();
    n = count;
}

void swap(string &a, string &b) {
    string temp;
    temp = a;
    a = b;
    b = temp;
}

void selectionSort(string w[], int n) {
    int i, j, imin;
    for (i = 0; i < n - 1; i++) {
        imin = i;
        for (j = i + 1; j < n; j++)
            if (w[j] < w[imin])
                imin = j;
        swap(w[i], w[imin]);
    }
}

int main() {
    string file_name = "infile.txt";
    string words[100];
    int num_words;
    readFile(file_name, words, num_words);
    selectionSort(words, num_words);
    for (int i = 0; i < num_words; i++)
        cout << words[i] << endl;
    return 0;
}`, files: { 'infile.txt': 'Python\nJava\nJavaScript\nC#\nC\nC++\nPHP\nObjective-C\nSwift\nKotlin\nVisual Basic\nDart\nPerl\n' },
  out: 'C\nC#\nC++\nDart\nJava\nJavaScript\nKotlin\nObjective-C\nPHP\nPerl\nPython\nSwift\nVisual Basic', outNote: 'Run on the infile.txt from the question; the output matches the expected output in the paper. This program also contains the answers to Q4(b) and Q4(c).' },
'sample-Q5': { answer: 'containsDups with two nested loops (below)', work: ['For every node n, compare its value with every node after it.', 'Return true on the first match; if the loops finish, return false.', 'The official answer loops while n->next != NULL, which crashes on an empty list; testing n != NULL is safe.'],
  full: R`#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
};

bool containsDups(ListNode *head) {
    for (ListNode *n = head; n != NULL; n = n->next)
        for (ListNode *p = n->next; p != NULL; p = p->next)
            if (p->val == n->val)
                return true;
    return false;
}

ListNode *build(int a[], int size) {
    ListNode *head = NULL;
    for (int i = size - 1; i >= 0; i--) {
        ListNode *p = new ListNode;
        p->val = a[i];
        p->next = head;
        head = p;
    }
    return head;
}

int main() {
    int a[] = {3, 5, 3, 2, 0};
    int b[] = {3, 0, 2, -1};
    cout << containsDups(build(a, 5)) << endl;
    cout << containsDups(build(b, 4)) << endl;
    return 0;
}`, out: '1\n0', outNote: 'The two lists from the question.' },
'sample-Q6': { answer: 'undup (below)', work: ['Create the result on the heap: <code>new list&lt;string&gt;()</code>.', 'Walk the input with a const_iterator (the parameter is a const reference).', 'push_back an element only if the result is empty or the element differs from the last one added.', 'Return the pointer. The caller must delete it.'],
  full: R`#include <iostream>
#include <string>
#include <list>
using namespace std;

list<string> *undup(const list<string> &lst) {
    list<string> *ans = new list<string>();
    for (list<string>::const_iterator it = lst.begin(); it != lst.end(); ++it)
        if (ans->empty() || *it != ans->back())
            ans->push_back(*it);
    return ans;
}

int main() {
    string a[] = {"apple", "donut", "donut", "banana", "banana", "banana",
                  "cherry", "cherry", "banana", "donut"};
    list<string> in(a, a + 10);
    list<string> *out = undup(in);
    for (list<string>::iterator it = out->begin(); it != out->end(); ++it)
        cout << *it << " ";
    cout << endl;
    delete out;
    return 0;
}`, out: 'apple donut banana cherry banana donut', outNote: 'The input list from the question.', points: ['Heap allocation with new.', 'const_iterator over the const list.', 'Compare with the last element added, not with all previous ones (only adjacent copies merge).'] },
'sample-Q7': { answer: 'reverseArray (below)', work: ['Swap element i with its mirror n − i − 1.', 'Stop at n / 2: going to n would swap every pair back again.', 'For odd n the middle element stays where it is.'],
  full: R`#include <stdio.h>

void reverseArray(int *array, int n) {
    for (int i = 0; i < n / 2; i++) {
        int temp = array[i];
        array[i] = array[n - i - 1];
        array[n - i - 1] = temp;
    }
}

int main() {
    int a[] = {1, 2, 3, 4, 5};
    int b[] = {7, 8};
    reverseArray(a, 5);
    reverseArray(b, 2);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("| %d %d\n", b[0], b[1]);
    return 0;
}`, c: true, out: '5 4 3 2 1 | 8 7' },

/* =================== 2021-22 Section A =================== */
'y2122-A1': { answer: 'A. mv 1.txt 2.txt', wrong: ['Correct. mv source destination renames when both are in the same folder.', 'The wrong way round: this renames 2.txt to 1.txt.', 'rn is not a Linux command.', 'rn is not a Linux command.'] },
'y2122-A2': { answer: 'C. man less', wrong: ['help describes Bash built-ins only, and less is not one.', 'Not a command.', 'Correct. man shows the manual page with every option.', 'Wrong, because C works.'] },
'y2122-A3': { answer: 'A. wc -w', wrong: ['Correct. -w prints the word count only (-l lines, -c bytes).', 'Not a Linux command.', 'Not a Linux command.', 'Plain wc prints lines, words <em>and</em> bytes, not only words.'] },
'y2122-A4': { answer: 'B', work: ['The first cat writes file1 into the pipe.', 'The second cat reads the pipe and writes it out; <code>&gt;&gt; file2</code> sends that output to the end of file2 instead of the screen.'],
  wrong: ['Nothing reaches the screen: the only output is redirected into file2.', 'Correct.', 'file2 keeps whatever it had before, so the two files are only equal if file2 started empty.', 'It is valid: a pipe followed by an append redirection.'],
  sh: { files: { file1: 'line one\n', file2: 'old\n' }, cmd: 'cat file1 | cat >> file2; echo ---; cat file2', out: '--- old line one' }, shNote: 'Run with file1 = "line one" and file2 = "old": nothing is printed before the ---, and file2 ends up with both lines.' },
'y2122-A5': { answer: 'D. None of the above', work: ['Numeric and reverse is <code>sort -n -r</code>, also written <code>sort -nr</code>. None of the options has -n.'],
  wrong: ['Plain sort is alphabetical, so 10 comes before 9.', '-k picks the column (key) to sort on. On its own it also needs a column number.', '-r reverses, but -k does not make the sort numeric.', 'Correct.'] },
'y2122-A6': { answer: 'C. // return (0);', wrong: ['# starts a pre-processor directive in C/C++, so this does not compile.', 'Triple quotes are Python.', 'Correct. // comments out the rest of the line.', 'HTML comment syntax, and it is not even closed properly.'] },
'y2122-A7': { answer: 'B', work: ['A rule like <code>clean: rm -f *.o prog</code> has a target that is not a file. If a file called clean ever appears, make thinks the target is up to date and does nothing.', '<code>.PHONY: clean</code> tells make clean is just a name for commands, so it always runs.'],
  wrong: ['The opposite: phony targets are not files.', 'Correct.', 'make has no "optional target" feature. (Prefixing a command with - ignores its errors, which is a different thing.)', 'Wrong, because B is right.'] },
'y2122-A8': { answer: 'B. strlen()', wrong: ['len() is Python.', 'Correct: from string.h.', 'length() is a member of the C++ string class, which C does not have.', 'Not a standard function.'] },
'y2122-A9': { answer: 'B. 1', work: ['x = 2, y = 4, z = 8.', '&& is done before ||: <code>x != 2 &amp;&amp; y &gt; 2</code> = false &amp;&amp; true = false.', 'The whole condition is <code>y == 2 || false || z &lt; 2</code> = false || false || false = false.', 'So the else runs: y + z % x − 3. % comes before + and −: 8 % 2 = 0, so 4 + 0 − 3 = <b>1</b>.'],
  wrong: ['9 is x + y % z + 3 = 2 + 4 + 3, the if branch, which does not run.', 'Correct.', 'Neither branch gives 3: the if branch gives 9 and the else branch gives 1.', '−1 would need z % x to be −2, but 8 % 2 is 0.'],
  full: R`#include <iostream>
using namespace std;

void f() {
    int x = 2, y = 4, z = 8;
    if (y == 2 || x != 2 && y > 2 || z < 2)
       cout << x + y % z + 3;
    else
       cout << y + z % x - 3;
}

int main() {
    f();
    return 0;
}`, out: '1' },
'y2122-A10': { answer: 'A. (-rand()) % 21 + 10', work: ['[-10, 10] contains 21 integers, so the expression needs % 21 somewhere.', 'rand() is 0 or more, so −rand() is 0 or less. In C++ the result of % takes the sign of the left operand, so <code>(-rand()) % 21</code> is in [−20, 0].', 'Adding 10 shifts that to [−10, 10]. Every value can occur.', 'The usual way to write it is <code>rand() % 21 - 10</code>, which gives the same range.'],
  wrong: ['Correct.', 'rand() * 20 is a huge number (and can overflow). It is not a range trick.', 'rand() % 20 is 0 to 19, so this gives [−10, 9]: 10 is never produced.', 'A huge negative number, not in the range.'],
  full: R`#include <iostream>
#include <cstdlib>
using namespace std;

int main() {
    int lo = 100, hi = -100;
    int r[] = { 0, 1, 20, 21, 22, RAND_MAX };      // some possible rand() values
    for (int i = 0; i < 6; i++) {
        int v = (-r[i]) % 21 + 10;
        if (v < lo) lo = v;
        if (v > hi) hi = v;
    }
    cout << lo << " " << hi << endl;
    return 0;
}`, out: '-10 10', outNote: 'rand() = 0 gives 10 and rand() = 20 gives −10: both ends of the range are reached.' },
'y2122-A11': { answer: 'D. None of above', work: ['The fourth element is a[3].', 'Its address is <code>&amp;a[3]</code>, <code>a + 3</code> or <code>aPtr + 3</code>. None of these is an option.'],
  wrong: ['*(aPtr + 3) is the <em>value</em> of the fourth element.', 'aPtr[3] is also the value of the fourth element.', 'a[3] is an int, and an int cannot be dereferenced: compile error.', 'Correct.'] },
'y2122-A12': { answer: 'C', work: ['In a declaration the * belongs to the name right after it, so only a is a pointer; b is a plain char.', 'c[10] is an array of 10 chars. Its name is used as a pointer to its first char, which is how option C describes it.', 'To make b a pointer too: <code>char *a, *b, c[10];</code>'],
  wrong: ['b is not a pointer.', 'b is not a pointer, and c is not a pointer to a pointer.', 'Correct (the intended answer).', 'C matches; strictly, c is an array of 10 chars rather than a pointer variable, but that is the reading the question intends.'] },
'y2122-A13': { answer: 'C', work: ['A: ++i increments first and gives the new value. True.', 'B: malloc reserves heap memory in C, like new in C++. True.', 'C: swapped. C uses the <b>function</b> <code>free()</code>; C++ uses the <b>operator</b> <code>delete</code>. Not true.', 'D: namespaces are a C++ feature. True.'],
  wrong: ['True, so not the answer.', 'True, so not the answer.', 'Correct: this statement is false.', 'True, so not the answer.'] },
'y2122-A14': { answer: 'B', wrong: ['Compiles. Dereferencing a garbage address fails (or silently reads junk) at run time.', 'Correct: the compiler rejects * on something that is not a pointer.', 'Compiles. Dereferencing NULL crashes at run time.', 'Wrong, because B is a compile-time error.'] },
'y2122-A15': { answer: 'B', work: ['vector: push_back, pop_back. No push_front.', 'list: push_back, push_front, pop_back, pop_front.', 'map: <code>m[key] = value</code> or <code>m.insert(...)</code>. No push functions.'],
  wrong: ['vector has no push_front.', 'Correct.', 'map has neither.', 'Only B is true.'] },

/* =================== 2021-22 Section B =================== */
'y2122-B1': { answer: '264', work: [
  'Start: x = 4, y = 9, z = 4.',
  '<code>z++ / 3</code> uses the old z: 4 / 3 = 1. So <code>z++ / 3 == 0</code> is false, and z becomes 5.',
  '&& stops at the first false, so the other two tests are not evaluated and x += 1 is skipped.',
  'y += x / 2 → y = 9 + 2 = 11.',
  '<code>++z</code> makes z 6 before it is used. x * y * z = 4 × 11 × 6 = <b>264</b>.'],
  points: ['Post-increment: the test uses 4, but z is 5 afterwards.', 'Pre-increment in the cout: 6, not 5.', 'Short-circuit &&.'] },
'y2122-B2': { answer: '36 4 36 25 4 25', work: [
  'f takes <code>int &amp;a</code>: whatever a main passes is changed directly.',
  'main\'s block declares an inner a = 6 and calls f on it. a = 6 × 6 = 36. f\'s block prints <b>36</b>, then declares its own a = 4 and prints <b>4</b>.',
  'Back in main\'s block, the inner a is now 36: prints <b>36</b>. The block ends.',
  'f(a) on the outer a = 5: 25. Prints <b>25</b>, then <b>4</b>.',
  'main prints the outer a, now <b>25</b>.'],
  points: ['Reference parameter changes the caller\'s variable.', 'The cout before <code>int a = 4;</code> still sees the parameter.', 'Inner block variables shadow outer ones.'] },
'y2122-B3': { answer: '100 200 / 100 200 / 200 100 (three lines)', work: [
  'The three statements a = a + b; b = a − b; a = a − b swap a and b without a temporary: with 200 and 100, a = 300, b = 200, a = 100.',
  'g(a, b) takes references, so main\'s a and b really swap: <b>100 200</b>.',
  'f(b, a) takes copies. It swaps its copies and they vanish: <b>100 200</b>.',
  'g(b, a) swaps main\'s b and a back: <b>200 100</b>.'],
  points: ['Three separate lines.', 'Pass by value (f) changes nothing.'] },
'y2122-B4': { answer: 'hello and HKU, on two lines', work: ['$1 and $2 are the first and second command-line arguments.', 'Each echo ends with a newline, so the output is two lines.'],
  sh: { files: { 'run.sh': '#!/bin/bash\n\necho $1\necho $2\n' }, cmd: 'bash run.sh hello HKU', out: 'hello\nHKU' }, points: ['Two separate lines, no $ signs.'] },
'y2122-B5': { answer: 'Computer, Discrete, Introduction, Object-oriented (one per line)', work: [
  'grep "COMP2" keeps COMP2120, COMP2396, COMP2121 and COMP2119.',
  'cut -d \' \' -f 2 splits on spaces and keeps field 2: Computer, Object-oriented, Discrete, Introduction.',
  'sort puts them in alphabetical order.'],
  sh: { files: { 'courses.txt': 'COMP2120 Computer Organization\nCOMP2396 Object-oriented Programming and Java\nCOMP3297 Software Engineering\nCOMP2121 Discrete Mathematics\nCOMP2119 Introduction to Data Structures and Algorithms\nCOMP3230 Principles of Operating Systems\nCOMP3234 Computer and Communication Networks\nCOMP3250 Design and Analysis of Algorithms\nCOMP3278 Introduction to Database Management Systems\n' }, cmd: 'cat courses.txt | grep "COMP2" | cut -d \' \' -f 2 | sort', out: 'Computer\nDiscrete\nIntroduction\nObject-oriented' },
  points: ['Only the second word of each title (field 2 with a space delimiter).', 'Sorted, one per line.'] },
'y2122-B6': { answer: 'false true', work: [
  '<b>reach42(68)</b>: 68 ≥ 42 and ≠ 42. 68 % 5 ≠ 0, skip. 68 % 2 == 0, so try reach42(34): 34 &lt; 42, false.',
  '68 % 4 == 0: one = 8, two = 6, one × two = 48 ≠ 0, so return reach42(68 − 48) = reach42(20) = false.',
  '<b>reach42(52)</b>: 52 % 5 ≠ 0. 52 % 2 == 0: reach42(26) is false.',
  '52 % 4 == 0: one = 2, two = 5, one × two = 10. reach42(52 − 10) = reach42(42) = <b>true</b>.'],
  points: ['Follow each if in order and stop at the first return.', 'Trailing space after "true".'] },
'y2122-B7': { answer: 'line 2:  int currmin = A[0];', work: ['currmin is a local variable with no starting value, so it holds whatever was in memory.', 'If that garbage is smaller than every element (for example a negative number), nothing ever replaces it and it is returned.', 'Start with the first element. (Then the loop could start at i = 1, but it does not have to.)'],
  full: R`#include <iostream>
using namespace std;

int minval(int *A, int n) {
    int currmin = A[0];
    for (int i = 0; i < n; i++)
        if (A[i] < currmin)
            currmin = A[i];
    return currmin;
}

int main() {
    int a[] = { 7, 3, 9, 4 }, b[] = { 5 };
    cout << minval(a, 4) << " " << minval(b, 1) << endl;
    return 0;
}`, out: '3 5', points: ['Names line 2.', 'Initialises currmin to A[0] (or INT_MAX).'] },
'y2122-B8': { answer: 'line 8: use strcmp; lines 19, 21, 23: add break;', work: [
  '<b>Line 8.</b> user is a char array, so <code>user != "alex"</code> compares the array\'s address with the literal\'s address. They are never equal, so every user, even alex, exits. Use <code>strcmp(user, "alex") != 0</code> (string.h is already included).',
  '<b>Lines 19, 21, 23.</b> A case without break falls through into the next one. With 118 the program prints all three messages including Welcome; with 53 it prints Almost there and Welcome. With 42 it prints Welcome and then falls into default and exits with status 1.',
  'Adding <code>break;</code> after each message fixes it. (Also needed to compile as a full program: <code>#include &lt;iostream&gt;</code>, <code>#include &lt;cstdlib&gt;</code> and <code>using namespace std;</code>.)'],
  full: R`#include <iostream>
#include <cstdlib>
#include <string.h>
using namespace std;

int main() {
    cout << "Please input username:\n";
    char user[1024];
    cin >> user;

    if (strcmp(user, "alex") != 0) {
        exit(1);
    }

    cout << "Please input the magic number:\n";
    int magic;
    cin >> magic;

    switch (magic) {
        case 118:
            cout << "Getting close.\n";
            break;
        case 53:
            cout << "Almost there.\n";
            break;
        case 42:
            cout << "Welcome!\n";
            break;
        default:
            exit(1);
    }
    return 0;
}`, stdin: 'alex 42', out: 'Please input username:\nPlease input the magic number:\nWelcome!', outNote: 'Input "alex" then 42.',
  points: ['strcmp instead of != on a C-string.', 'break after each case.', 'Line numbers stated.'] },

/* =================== 2021-22 Section C =================== */
'y2122-C1a': { answer: 'Iterative BinaryNumber (below)', work: ['421 = 210 × 2 + 1, 210 = 105 × 2 + 0, ...: each remainder decimal % 2 is the next binary digit from the right.', 'So put each new digit in <b>front</b> of the string, then divide by 2. Stop when the number reaches 0.', 'Special case: 0 itself, or the loop never runs and you return "".'],
  full: R`#include <iostream>
#include <string>
using namespace std;

string BinaryNumber(int decimal) {
    if (decimal == 0)
        return "0";
    string binary = "";
    while (decimal > 0) {
        binary = (decimal % 2 == 0 ? "0" : "1") + binary;
        decimal = decimal / 2;
    }
    return binary;
}

int main() {
    int decimal;
    cin >> decimal;
    string binary_str = BinaryNumber(decimal);
    cout << binary_str;
    return 0;
}`, stdin: '421', out: '110100101', outNote: 'Input 421, the example in the question.',
  points: ['Complete function with the given header.', 'while loop with % 2 and / 2.', 'Digits added in the right order.', 'Handles 0.'] },
'y2122-C1b': { answer: 'Recursive BinaryNumber (below)', work: ['Binary of n = binary of n / 2, followed by the digit n % 2.', 'Base case: 0 or 1 is a single digit.', 'The recursive call handles the higher digits, so the last digit is added at the <b>end</b>.'],
  full: R`#include <iostream>
#include <string>
using namespace std;

string BinaryNumber(int decimal) {
    if (decimal < 2)
        return decimal == 0 ? "0" : "1";
    return BinaryNumber(decimal / 2) + (decimal % 2 == 0 ? "0" : "1");
}

int main() {
    int decimal;
    cin >> decimal;
    string binary_str = BinaryNumber(decimal);
    cout << binary_str;
    return 0;
}`, stdin: '42', out: '101010', outNote: 'Input 42 (the last row of the table).',
  points: ['A base case that stops the recursion.', 'return in front of the recursive call.', 'Last digit appended after the recursive part.'] },
'y2122-C2a': { answer: 'DeleteMiddleNode (below)', work: [
  'Count the nodes: n.',
  'The node to delete has index k = (n − 1) / 2 (integer division): n = 1 → 0, 2 → 0, 3 → 1, 4 → 1, 5 → 2. That matches every example in the question.',
  'k ≥ 1: walk to the node at index k − 1 and set its next to next->next.',
  'k = 0 is the catch. head is passed <b>by value</b>, so assigning to it inside the function does nothing for the caller. With two nodes, copy the second node\'s value into the first and unlink the second: the list now reads as if the first was deleted. With one node, the only way to empty the list is to clear the global <code>Node *head</code> the question declares, written <code>::head</code> because the parameter has the same name.',
  'In the exam, write a one-line comment explaining this. If you may change the header, <code>Node *&amp;head</code> is the clean fix.'],
  full: R`#include <iostream>
using namespace std;

struct Node {
    int val;
    Node *next;
};

Node *head;

void DeleteMiddleNode(Node *head) {
    if (head == NULL)
        return;
    int n = 0;
    for (Node *p = head; p != NULL; p = p->next)
        n++;
    int k = (n - 1) / 2;
    if (k == 0) {
        if (head->next == NULL) {
            ::head = NULL;
        } else {
            head->val = head->next->val;
            head->next = head->next->next;
        }
        return;
    }
    Node *before = head;
    for (int i = 0; i < k - 1; i++)
        before = before->next;
    before->next = before->next->next;
}

void build(int n) {                       // head -> 1 -> 2 -> ... -> n
    head = NULL;
    for (int i = n; i >= 1; i--) {
        Node *p = new Node;
        p->val = i;
        p->next = head;
        head = p;
    }
}

void print() {
    cout << "[";
    for (Node *p = head; p != NULL; p = p->next)
        cout << p->val << (p->next ? " " : "");
    cout << "]" << endl;
}

int main() {
    for (int n = 0; n <= 5; n++) {
        build(n);
        DeleteMiddleNode(head);
        print();
    }
    return 0;
}`, out: '[]\n[]\n[2]\n[1 3]\n[1 3 4]\n[1 2 4 5]', outNote: 'Lists of 0 to 5 nodes (1 2 3 ...), each after one call.',
  points: ['Empty list does nothing.', 'Correct index for odd and even lengths.', 'Unlinks via the node before.', 'Deals with the first node despite the by-value parameter.'] },
'y2122-C2b': { answer: 'Add Node *prev; to the struct and Node *tail; after head', work: ['Each node needs a link backwards: <code>Node *prev;</code> inside the struct.', 'The list needs direct access to its last node: a global <code>Node *tail;</code> next to <code>Node *head;</code>.'],
  points: ['prev inside the struct.', 'tail outside it.'] },
'y2122-C2c': { answer: 'ReverseDoublyLinkedList (below)', work: [
  'In a reversed list every node\'s next is its old prev and its prev is its old next. So walk the list once and swap the two pointers in each node.',
  'Save <code>cur-&gt;next</code> before overwriting it, then move on to that saved node.',
  'Finally the old head is the new tail and the other way round. head_ptr and tail_ptr are pointers to the caller\'s pointers, so swap <code>*head_ptr</code> and <code>*tail_ptr</code>.',
  'Empty list: the loop does not run and swapping two NULLs is harmless.'],
  full: R`#include <iostream>
using namespace std;

struct Node {
    int val;
    Node *next;
    Node *prev;
};

Node *head;
Node *tail;

void ReverseDoublyLinkedList(Node **head_ptr, Node **tail_ptr) {
    Node *cur = *head_ptr;
    while (cur != NULL) {
        Node *nxt = cur->next;
        cur->next = cur->prev;
        cur->prev = nxt;
        cur = nxt;
    }
    Node *old = *head_ptr;
    *head_ptr = *tail_ptr;
    *tail_ptr = old;
}

void append(int v) {
    Node *p = new Node;
    p->val = v;
    p->next = NULL;
    p->prev = tail;
    if (tail == NULL) head = p;
    else tail->next = p;
    tail = p;
}

int main() {
    for (int i = 1; i <= 4; i++)
        append(i);
    ReverseDoublyLinkedList(&head, &tail);
    for (Node *p = head; p != NULL; p = p->next)       // forwards
        cout << p->val << " ";
    cout << "| ";
    for (Node *p = tail; p != NULL; p = p->prev)       // backwards
        cout << p->val << " ";
    cout << endl;
    return 0;
}`, out: '4 3 2 1 | 1 2 3 4', outNote: 'Walking forwards from head and backwards from tail both give the reversed order, so both links were fixed.',
  points: ['Swaps next and prev in every node.', 'Saves next before overwriting.', 'Updates both *head_ptr and *tail_ptr.'] },

/* =================== 2023 quiz =================== */
'q2023-Q1a': { answer: 'getWords.sh (below)', work: [
  '<code>for w in $(cat "$1")</code>: the unquoted substitution is split on spaces, tabs and newlines, so w takes each word in order.',
  'Keep a list of words already printed, one per line. <code>grep -qx</code> checks whether w is already a whole line in it: -x means the whole line must match (so apple does not match pineapple, the same job as the -w in the hint), -q means print nothing, just set the exit status.',
  'If it is not there, print it and add it to the list.',
  'No argument (<code>$# -lt 1</code>) or no words: nothing is printed.'],
  full: SCRIPT('q2023-Q1a'), lang: 'sh',
  sh: { files: { 'getWords.sh': SCRIPT('q2023-Q1a'), 'wordlist.txt': 'apple pineapple\nAPPLE Orange\t\t\torange\norange Apple\n', 'empty.txt': '' }, cmd: 'bash getWords.sh wordlist.txt; echo ---; bash getWords.sh empty.txt; bash getWords.sh; echo ---', out: 'apple\npineapple\nAPPLE\nOrange\norange\nApple\n---\n---' },
  shNote: 'Tested on the wordlist.txt from the question, then on an empty file and with no argument (both print nothing between the --- lines).',
  points: ['Exact output: one word per line, nothing else.', 'Case sensitive: apple and Apple are different.', 'Whole-word matching.', 'Silent when there is no argument.'] },
'q2023-Q1b': { answer: 'getKeyword.sh (below)', work: [
  'Put one word per line, <code>sort</code>, then <code>uniq -c</code>: each line becomes "count word", in alphabetical order of word.',
  'The highest count: <code>sort -nr | head -n 1</code> gives the top line; <code>echo $max | cut -d \' \' -f 1</code> keeps just the number (unquoted echo removes the leading spaces uniq -c adds).',
  'Read the alphabetical list line by line with <code>while read count word</code> and print every word whose count equals the maximum, as "word count".',
  'The empty check stops the script printing anything (or an error) for a file with no words.'],
  full: SCRIPT('q2023-Q1b'), lang: 'sh',
  sh: { files: { 'getKeyword.sh': SCRIPT('q2023-Q1b'), 'wordlist.txt': 'apple pineapple\nAPPLE Orange\t\t\torange\norange Apple\n', 'ties.txt': 'b a\tc\nb a\n', 'empty.txt': '' }, cmd: 'bash getKeyword.sh wordlist.txt; echo ---; bash getKeyword.sh ties.txt; echo ---; bash getKeyword.sh empty.txt; bash getKeyword.sh; echo ---', out: 'orange 2\n---\na 2\nb 2\n---\n---' },
  shNote: 'Tested on the question\'s wordlist.txt, on a file where a and b tie with 2 each (printed alphabetically), then on an empty file and with no argument.',
  points: ['Word first, then the count, separated by one space.', 'All tied words, alphabetical.', 'Nothing printed for no words or no argument.'] },
'q2023-Q2': { answer: 'reverse() (below)', work: [
  'Standard digit reversal: r = r × 10 + N % 10, then N = N / 10, until N is 0.',
  'Negative input: in C++, % and / keep the sign of N, so −456700 gives digits 0, 0, −7, −6, −5, −4 and r = −7654. Returning −r gives 7654.',
  'Trailing zeros in the input become leading zeros of r, which do not show in a number.'],
  full: R`#include <iostream>

using namespace std;

int reverse(int N) {
    int r = 0;
    while (N != 0) {
        r = r * 10 + N % 10;
        N = N / 10;
    }
    return -r;
}

int main() {

    int N;
    cin >> N;

    cout << reverse(N) << endl;

    return 0;
}`, stdin: '-456700', out: '7654', outNote: 'Test 2 from the question.',
  points: ['Exact output: just the number and a newline.', 'Sign flipped.', 'Trailing zeros dropped.'] },
'q2023-Q3': { answer: 'Antiprime search (below)', work: [
  'S(n): count divisors. Check d from 1 while d × d ≤ n; each divisor d below √n pairs with n / d, so add 2 (add 1 when d × d == n).',
  'Antiprimes are the "record breakers": go through p = 1, 2, 3, ... and keep the largest S so far. p is antiprime exactly when S(p) is bigger than that record.',
  'The first record breaker with p ≥ b is the answer. For b ≤ 1 that is 1.',
  'Speed: for b = 100000 the answer is 110880. Counting divisors up to √n keeps this well under a second; counting up to n would be about 6 billion steps.'],
  full: SCRIPT('q2023-Q3'), stdin: '700', out: '720', outNote: 'Test 4 from the question. The other tests (11 → 12, 12 → 12, −10 → 1, 45678 → 50400) were run too.',
  points: ['A divisor-count function.', 'Record-breaker test, not "more divisors than b".', 'Handles b ≤ 0.', 'Fast enough for the largest test.'] },
};
})();
