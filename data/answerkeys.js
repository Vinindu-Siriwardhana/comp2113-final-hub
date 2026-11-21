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
};
})();
