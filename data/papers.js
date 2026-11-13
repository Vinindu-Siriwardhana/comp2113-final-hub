/* COMP2113 Final Hub — past papers with worked answers.
   Questions are from the two papers in the "Past Papers" folder.
   The 2019-20 paper has no official solutions in the folder: those answers were worked out
   here and the code answers are compiled and run by tools/verify.js. */
(function () {
const R = String.raw;

const MASK = R`struct Mask {
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
`;

window.PAPERS = [
{
  id: 'y1920', title: '2019-20 Final Exam', meta: 'ENGG1340 / COMP2113 · 18 May 2020 · 2 hours · 100 marks',
  note: 'Format: Section A 15 MCQs (30%), Section B 8 short questions (30%), Section C 2 programming questions (40%). One double-sided A4 sheet of notes was permitted. No calculator.',
  sections: [
  { name: 'Section A · Multiple choice (2 marks each)', items: [
    { n: 'A1', m: 'm1', q: 'What command is used to count the total number of lines, words, and characters contained in a file?', opts: ['wc', 'countw', 'wcount', 'None of the above'], a: 0, why: '<code>wc file</code> prints lines, words and bytes.' },
    { n: 'A2', m: 'm1', q: 'What command is used to sort the lines of data in a file in alphanumerical order?', opts: ['sort -r', 'sh', 'sort', 'None of the above'], a: 2, why: '<code>sort -r</code> would be reverse order.' },
    { n: 'A3', m: 'm1', q: 'What command is used to copy directory structures in and out?', opts: ['copy', 'cpio', 'cp -p', 'None of the above'], a: 1, why: '<code>cpio</code> ("copy in, copy out") copies files and directory structures into and out of archives. <code>cp -p</code> only preserves timestamps and permissions. This one is outside the module notes: learn it as a fact.' },
    { n: 'A4', m: 'm1', q: 'How to print the content of file "1.txt"?', opts: ['cat 1.txt', 'print 1.txt', 'echo 1.txt', 'None of the above'], a: 0, why: '<code>echo 1.txt</code> prints the text "1.txt".' },
    { n: 'A5', m: 'm1', q: 'If you don\'t know the options of command "more", what command will show you its options and descriptions?', opts: ['help more', 'man more', 'google more', 'None of the above'], a: 1, why: '<code>man</code> opens the manual page.' },
    { n: 'A6', m: 'm3', q: 'The expression <code>if (num != 65)</code> cannot be replaced by:', opts: ['if (num > 65 || num < 65)', 'if (!(num == 65))', 'if (num - 65)', 'if (!(num - 65))'], a: 3, why: '<code>num - 65</code> is non-zero (true) exactly when num != 65. Negating it gives num == 65, the opposite.' },
    { n: 'A7', m: 'm3', q: 'Which one is the correct way to insert comments in C/C++ code?', opts: ['// This is a comment', '/* This is a comment', '# This is a comment', '""" This is a comment """'], a: 0, why: 'Option B never closes the comment with <code>*/</code>.' },
    { n: 'A8', m: 'm5', q: 'The function prototype <code>double mySqrt(int x);</code>', opts: ['Declares a function called mySqrt which takes an integer as an argument and returns a double.', 'Defines a function called double which calculates square roots.', 'Defines a function called mySqrt which takes an argument of type x and returns a double.', 'Declares a function called mySqrt which takes a double as an argument and returns an integer.'], a: 0, why: 'A prototype declares. Return type first, parameter type inside the brackets.' },
    { n: 'A9', m: 'm5', q: 'What does the function mystery do?', code: R`int mystery (int number)
{
   if (number <= 1) {
     return 1;
   }
   else {
     return number * mystery(number - 1);
   }
}`, opts: ['Contains syntax error and does not compile', 'Goes into infinite computations without return', 'Always returns 1 regardless of the input', 'Calculates the factorial of the input number'], a: 3, why: 'n * (n-1) * ... * 1 with base case 1.' },
    { n: 'A10', m: 'm10', q: 'In C, which method can be used to find the length of a string?', opts: ['len()', 'strlen()', 'getSize()', 'length()'], a: 1, why: '<code>strlen</code> from string.h. <code>length()</code> belongs to the C++ string class.' },
    { n: 'A11', m: 'm8', q: 'All of the following can cause a fatal run-time error except:', opts: ['Dereferencing a pointer that has not been assigned to point to a specific address.', 'Dereferencing a pointer that has not been initialized properly.', 'Dereferencing a null pointer.', 'Dereferencing a variable that is not a pointer.'], a: 3, why: 'Dereferencing a non-pointer is rejected by the compiler, so it is a compile-time error, not a run-time error.' },
    { n: 'A12', m: 'm8', q: 'Assuming that t is an array and tPtr is a pointer to that array, which expression refers to the address of element 3 of the array?', opts: ['*(tPtr + 3)', 'tPtr[3]', '&t[3]', '*(t + 3)'], a: 2, why: 'A, B and D are all the <em>value</em> of element 3. Only <code>&amp;t[3]</code> is an address.' },
    { n: 'A13', m: 'm8', q: 'Consider the statement: <code>string* x, y;</code>', opts: ['x is a pointer to a string, y is a string', 'both x and y are pointer to string types', 'y is a pointer to a string, x is a string', 'none of above'], a: 0, why: 'The star applies to x only.' },
    { n: 'A14', m: 'm4', q: 'In C/C++ program, the #include directives are expanded during?', opts: ['Run time', 'Debug time', 'Compile time', 'Coding time'], a: 2, why: 'The pre-processor is the first stage of compilation.' },
    { n: 'A15', m: 'm6', q: 'If string s1 has the value "computer" and string s2 has the value "promise", which call to insert will produce the string "compromise"?', opts: ['s1.insert(4, s2, 0, string::npos);', 's1.insert(string::npos, s2, 0, 4);', 's2.insert(0, s1, 0, 3);', 's2.insert(3, s1, 0, 3);'], a: 2, why: '"compromise" = "com" + "promise". Insert 3 characters of s1 starting at index 0 into s2 at position 0.' },
  ]},
  { name: 'Section B · Short questions', items: [
    { n: 'B1', marks: 3, m: 'm3', q: 'Write down the output of the following code segment.', code: R`int x = 3;
int y = 2;
int z = 1;
if (z / 3 == 0 && x % 3 == 0 && y % x == 1) {
   x+=1;
}
y += x / 2;
cout << x * y * z;`, out: '9', why: 'z / 3 is 0 (true). x % 3 is 0 (true). y % x is 2 % 3 = 2, not 1, so the if body is skipped. y = 2 + 3 / 2 = 3. Output 3 * 3 * 1 = 9.' },
    { n: 'B2', marks: 3, m: 'm5', q: 'Write down the output of the following code segment.', code: R`void f(int a) {
   a = a*a;
   {
      int a = 4;
      cout << ++a << " ";
   }
   cout << a << " ";
}

int main() {
   int a = 1;
   {
      cout << a << " ";
      int a = 2;
      f(a);
      cout << a << " ";
   }
   f(a);
   return 0;
}`, out: '1 5 4 2 5 1', why: 'main prints the outer a (1) before the inner a is declared. f(2): a = 4, the inner block prints 5, then the parameter prints 4. Back in main the inner a is still 2. f(1): a = 1, prints 5 then 1.' },
    { n: 'B3', marks: 4, m: 'm6', q: 'Write down the output of the following code segment.', code: R`int f(char n[]) {
   int j = 0;
   for (int i = 0; n[i] != '\0'; ++i){
      int k = n[i] - '0';
      j = j * 10 + k + 1;
   }
   return j;
}
int main() {
   char n[] = "2019";
   cout << f(n);
   return 0;
}`, out: '3130', why: 'j goes 0 → 3 → 31 → 312 → 3130. Each step: j * 10 + digit + 1.' },
    { n: 'B4', marks: 4, m: 'm8', q: 'Write down the output of the following code segment.', code: R`void f(int p[], int size)
{
   int *a = &p[1];
   for (int i = size-2; i >= 0; --i)
      a[i] += a[i-1];
}
int main()
{
   int a[] = {6, 5, 4, 3, 2, 1};
   int * q = &a[2];
   f(q, 3);
   for (int i = 0; i < 6; ++i)
      cout << a[i] << ' ';
   return 0;
}`, out: '6 5 4 7 5 1', why: 'q points at main\'s a[2]. Inside f, the local a points at p[1], which is main\'s a[3]. i = 1: a[4] += a[3] gives 2 + 3 = 5. i = 0: a[3] += a[2] gives 3 + 4 = 7.' },
    { n: 'B5', marks: 4, m: 'm1', q: 'Finish this task using a combined command (piping) using four individual commands. Task: find all lines containing the keyword "wonderful" from file "day.txt" and sort the lines alphabetically. Pick the first fifteen of the sorted lines and count how many characters there are in the fifteen lines.', lang: 'sh', ans: `grep "wonderful" day.txt | sort | head -15 | wc -c`, why: 'One command per step: search, sort, take the first fifteen, count characters. <code>head -n 15</code> is the same thing.' },
    { n: 'B6', marks: 4, m: 'm3', q: 'Suppose you have an integer variable x that holds a four-digit positive integer. Write a single C++ statement to store the middle two digits of x in integer variable y.', lang: 'cpp', ans: R`y = x / 10 % 100;`, why: 'x / 10 drops the last digit (1234 → 123). % 100 keeps the last two digits of that (23). <code>y = x % 1000 / 10;</code> also works.', test: { main: R`int x = 1234, y; y = x / 10 % 100; cout << y << " "; x = 9075; y = x / 10 % 100; cout << y;`, out: '23 7' } },
    { n: 'B7', marks: 4, m: 'm8', q: 'The expected output of the code segment is 42, but the code cannot compile. Propose a fix which involves changes in line 3 and/or line 4 only.', code: R`line 1:  int main()           //You cannot change this line
line 2:  {                    //You cannot change this line
line 3:
line 4:   int* p1, p2;
line 5:   int n = 42;
line 6:   p1 = p2 = &n;
line 7:   printf("%d", *p1);
         }`, lang: 'cpp', ans: R`line 4:   int *p1, *p2;`, why: 'In the original, p2 is a plain int, so <code>p2 = &amp;n</code> assigns an address to an int and does not compile. Both must be pointers.' },
    { n: 'B8', marks: 4, m: 'm10', q: 'The expected output of the code segment is 41, but the code does not run correctly. Propose a fix. Specify clearly the line(s) for the change.', code: R`line 1:   int main()
line 2:   {
line 3:
line 4:    const int SIZE = 42;
line 5:    double *p;
line 6:    if ((p = (double*)malloc(sizeof(double)*SIZE)) == NULL)
line 7:    { exit(EXIT_FAILURE); }
line 8:    for (int i = 0; i < SIZE; i++)
line 9:    { *(p + i) = i; }
line 10:   double *index = p + SIZE;
line 11:   double lastVal = *index; //You cannot change this line
line 12:   printf("%lf\n", lastVal); //You cannot change this line
line 13:   return 0;
          }`, lang: 'c', ans: R`line 10:   double *index = p + SIZE - 1;`, why: 'Valid elements are p + 0 to p + SIZE - 1. <code>p + SIZE</code> is one past the end. (Adding <code>free(p);</code> before the return is good practice.)' },
  ]},
  { name: 'Section C · Programming questions', items: [
    { n: 'C1(a)', marks: 10, m: 'm5', q: 'Binary search on a sorted array. <code>l</code> and <code>r</code> are the leftmost and rightmost indexes (inclusive) of the interval, <code>x</code> is the key. Return the index of x, or -1 if it is not found. Write the <strong>iterative</strong> version using a while loop.', lang: 'cpp', ans: R`int BinarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == x)
            return mid;
        if (x < arr[mid])
            r = mid - 1;        // keep the lower half
        else
            l = mid + 1;        // keep the upper half
    }
    return -1;                  // interval is empty
}`, why: 'Loop while the interval is non-empty (<code>l &lt;= r</code>). Shrink with mid - 1 and mid + 1 so the interval always gets smaller.',
      test: { main: R`int arr[] = {2, 3, 4, 10, 40}; cout << BinarySearch(arr, 0, 4, 10) << BinarySearch(arr, 0, 4, 2) << BinarySearch(arr, 0, 4, 40) << " " << BinarySearch(arr, 0, 4, 5);`, out: '304 -1' } },
    { n: 'C1(b)', marks: 10, m: 'm5', q: 'Write the <strong>recursive</strong> version of <code>BinarySearch</code>.', lang: 'cpp', ans: R`int BinarySearch(int arr[], int l, int r, int x) {
    if (l > r)
        return -1;                                  // base case: empty interval
    int mid = l + (r - l) / 2;
    if (arr[mid] == x)
        return mid;                                 // base case: found
    if (x < arr[mid])
        return BinarySearch(arr, l, mid - 1, x);
    return BinarySearch(arr, mid + 1, r, x);
}`, why: 'Same logic. The loop condition becomes the base case and each half becomes a recursive call. Do not forget the <code>return</code> in front of the calls.',
      test: { main: R`int arr[] = {2, 3, 4, 10, 40}; cout << BinarySearch(arr, 0, 4, 10) << BinarySearch(arr, 0, 4, 2) << BinarySearch(arr, 0, 4, 40) << " " << BinarySearch(arr, 0, 4, 5);`, out: '304 -1' } },
    { n: 'C2(a)', marks: 10, m: 'm8', q: 'A mask reservation system stores orders in a linked list. <code>order</code> inserts at the head, so the head is the newest order. The given <code>deliver</code> removes the newest order. Rewrite <code>deliver</code> so it removes the <strong>oldest</strong> order (the tail) and prints <code>Delivering TYPE for CUSTOMER</code>.', code: MASK, lang: 'cpp', ans: R`void deliver(Mask *&head) {
    if (head == NULL)
        return;                                   // nothing to deliver
    if (head->next == NULL) {                     // only one order
        cout << "Delivering " << head->type;
        cout << " for " << head->customer << endl;
        delete head;
        head = NULL;
        return;
    }
    Mask *cur = head;
    while (cur->next->next != NULL)               // stop at the second-last node
        cur = cur->next;
    cout << "Delivering " << cur->next->type;
    cout << " for " << cur->next->customer << endl;
    delete cur->next;
    cur->next = NULL;
}`, why: 'Deleting the tail needs the second-last node. Three cases: empty, one node (head changes), many nodes.',
      test: { pre: MASK, main: R`Mask *head = NULL; order(head, "3M-N95", "Alice"); order(head, "OxyAir", "Bruce"); order(head, "3M-N95", "Cindy"); deliver(head); output(head); deliver(head); deliver(head); deliver(head); output(head);`, out: 'Ordering 3M-N95 for Alice Ordering OxyAir for Bruce Ordering 3M-N95 for Cindy Delivering 3M-N95 for Alice Outputting order list 3M-N95 for Cindy OxyAir for Bruce Delivering OxyAir for Bruce Delivering 3M-N95 for Cindy Outputting order list' } },
    { n: 'C2(b)', marks: 10, m: 'm8', q: 'Write <code>void remove(Mask *&amp;head)</code>, which removes all orders in the list for which the type is "3M-N95".', lang: 'cpp', ans: R`void remove(Mask *&head) {
    while (head != NULL && head->type == "3M-N95") {   // matches at the front
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
            cur->next = t->next;                       // bypass the node
            delete t;                                  // stay on cur
        } else {
            cur = cur->next;
        }
    }
}`, why: 'First strip matching nodes off the head (head changes). Then look one node ahead. After a deletion do not advance, because the new next node may also match.',
      test: { pre: MASK, main: R`Mask *head = NULL; order(head, "3M-N95", "A"); order(head, "OxyAir", "B"); order(head, "3M-N95", "C"); order(head, "3M-N95", "D"); order(head, "Cloth", "E"); order(head, "3M-N95", "F"); remove(head); output(head); Mask *h2 = NULL; order(h2, "3M-N95", "Z"); remove(h2); output(h2);`, out: 'Ordering 3M-N95 for A Ordering OxyAir for B Ordering 3M-N95 for C Ordering 3M-N95 for D Ordering Cloth for E Ordering 3M-N95 for F Outputting order list Cloth for E OxyAir for B Ordering 3M-N95 for Z Outputting order list' } },
  ]},
  ]
},
{
  id: 'sample', title: 'Sample Final (Long Questions)', meta: 'COMP2113 sample paper with suggested solutions',
  note: 'Seven long questions, one per topic area. Answers below follow the official suggested solutions. Where the official answer has a slip, the note says so.',
  sections: [
  { name: 'Long questions', items: [
    { n: 'Q1(a)', m: 'm2', q: 'Write a script which will print numbers from 0 to 100 and display every third (0 3 6 9 ...).', lang: 'sh', ans: `#!/bin/bash
for i in {0..100..3}; do echo $i; done

# or
for (( i=0; i<=100; i=i+3 )); do echo $i; done`, why: 'Complete scripts start with the <code>#!/bin/bash</code> line. <code>{start..end..step}</code> generates the list.' },
    { n: 'Q1(b)', m: 'm1', q: 'Create an empty, read-only file called "foo.txt" in current directory.', lang: 'sh', ans: `#!/bin/bash
touch foo.txt
chmod 400 foo.txt`, why: 'touch creates the empty file. 400 = r-- --- ---.' },
    { n: 'Q2(a)', m: 'm4', q: 'Files: <code>thing.h</code> includes <code>gadget.h</code>. <code>thing.c</code> includes <code>thing.h</code>. <code>gadget.c</code> includes <code>gadget.h</code>. <code>widget.c</code> includes <code>gadget.h</code> and <code>thing.h</code> and has <code>main</code>. Draw the dependency graph for the executable <code>widget</code>.', lang: 'text', ans: `widget
 ├── widget.o ── widget.c, gadget.h, thing.h
 ├── thing.o  ── thing.c,  thing.h,  gadget.h
 └── gadget.o ── gadget.c, gadget.h`, why: 'thing.o depends on gadget.h because thing.h includes it. Follow the includes all the way down.' },
    { n: 'Q2(b)', m: 'm4', q: 'Write the contents of a Makefile whose default target builds the program widget, and which only recompiles individual files as needed.', lang: 'make', ans: `widget: widget.o thing.o gadget.o
	gcc -o widget widget.o thing.o gadget.o

widget.o: widget.c gadget.h thing.h
	gcc -c widget.c

thing.o: thing.c thing.h gadget.h
	gcc -c thing.c

gadget.o: gadget.c gadget.h
	gcc -c gadget.c`, why: 'These are .c files, so the compiler is gcc. The executable rule is first so that plain <code>make</code> builds it.' },
    { n: 'Q3', m: 'm3', q: 'The program should print 0 then 1 (P3 is not on line L, P4 is), but prints 0 and 0. Fix all the errors. Specify clearly the line(s) to be changed.', code: R`struct Point {
      int X;
      double Y;
};
struct Line {
      Point End1;
      Point End2;
};
line 12:  bool Online(Point P, Line L) {
line 13:        int Slope1 =
                   (L.End2.Y - L.End1.Y) / (L.End2.X - L.End1.X);
line 14:        int Slope2 = (P.Y - L.End1.Y) / (P.X - L.End1.X);
line 15:        return (Slope1 = Slope2);
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
}`, lang: 'cpp', ans: R`double Slope1 =
      (L.End2.Y - L.End1.Y) / (L.End2.X - L.End1.X);
double Slope2 = (P.Y - L.End1.Y) / (P.X - L.End1.X);
return (Slope1 == Slope2);`, why: 'Two kinds of error: storing a fractional slope in an int truncates it, and <code>=</code> assigns instead of comparing. (The line numbers in the printed paper are slightly offset. In the exam, quote the code you are changing.)' },
    { n: 'Q4(a)', m: 'm1', q: 'Write down the Linux command to sort the words in "infile.txt" and print them onto the screen.', lang: 'sh', ans: `sort infile.txt`, why: 'sort prints to the screen and does not change the file.' },
    { n: 'Q4(b)', m: 'm7', q: 'Implement <code>void readFile(string f, string w[], int &amp;n)</code>. f is the input file name. w[] and n are output parameters for the words (one per line) and the number of words.', lang: 'cpp', ans: R`void readFile(string f, string w[], int &n) {
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
}`, why: 'getline is needed because one "word" is "Visual Basic". n is a reference so the caller receives the count.' },
    { n: 'Q4(c)', m: 'm5', q: 'Implement <code>void swap(string &amp;a, string &amp;b)</code> which swaps the contents of its two reference parameters.', lang: 'cpp', ans: R`void swap(string &a, string &b) {
    string temp;
    temp = a;
    a = b;
    b = temp;
}`, why: 'Both parameters must be references or nothing changes for the caller.' },
    { n: 'Q4(d)', m: 'm6', q: 'Implement <code>void selectionSort(string w[], int n)</code> which sorts the strings into alphabetical order.', lang: 'cpp', ans: R`void selectionSort(string w[], int n) {
    int i, j, imin;
    for (i = 0; i < n - 1; i++) {
        imin = i;
        for (j = i + 1; j < n; j++)
            if (w[j] < w[imin])
                imin = j;
        swap(w[i], w[imin]);
    }
}`, why: 'For each position i, find the smallest remaining string and swap it in. Strings compare with <code>&lt;</code>. Capitals sort before lowercase, which is why "PHP" comes before "Perl".',
      test: { pre: R`void swap2(string &a, string &b) { string t = a; a = b; b = t; }
#define swap swap2
`, main: R`string w[] = {"Python", "Java", "C#", "C", "C++", "PHP", "Perl"}; selectionSort(w, 7); for (int i = 0; i < 7; i++) cout << w[i] << " ";`, out: 'C C# C++ Java PHP Perl Python' } },
    { n: 'Q5', m: 'm8', q: 'Given <code>struct ListNode { int val; ListNode *next; };</code> write <code>containsDups</code>, which returns true if the list contains any duplicate values, and false otherwise.', lang: 'cpp', ans: R`bool containsDups(ListNode *head) {
    for (ListNode *n = head; n != NULL; n = n->next) {
        for (ListNode *p = n->next; p != NULL; p = p->next)
            if (p->val == n->val)
                return true;
    }
    return false;
}`, why: 'For each node, compare it with every node after it. The official solution loops while <code>n-&gt;next != NULL</code>, which crashes on an empty list. Testing <code>n != NULL</code> is safe and gives the same answers.',
      test: { pre: R`struct ListNode { int val; ListNode *next; };
ListNode *mk(int a[], int n) { ListNode *h = NULL; for (int i = n - 1; i >= 0; i--) { ListNode *p = new ListNode; p->val = a[i]; p->next = h; h = p; } return h; }
`, main: R`int a[] = {3, 5, 3, 2, 0}, b[] = {3, 0, 2, -1}; cout << containsDups(mk(a, 5)) << containsDups(mk(b, 4)) << containsDups(NULL);`, out: '100' } },
    { n: 'Q6', m: 'm9', q: 'Implement <code>list&lt;string&gt; *undup(const list&lt;string&gt; &amp;lst)</code>. Return a pointer to a new heap-allocated list that is a copy of lst, except that runs of adjacent equal strings are replaced by a single copy.', lang: 'cpp', ans: R`list<string> *undup(const list<string> &lst) {
    list<string> *ans = new list<string>();
    for (list<string>::const_iterator it = lst.begin(); it != lst.end(); ++it) {
        if (ans->empty() || *it != ans->back())
            ans->push_back(*it);
    }
    return ans;
}`, why: 'Add a string only when it differs from the last one added. The official solution uses a <code>prev</code> string and a plain <code>iterator</code>. Because lst is const, <code>const_iterator</code> is the type that compiles.',
      test: { main: R`string a[] = {"apple", "donut", "donut", "banana", "banana", "banana", "cherry", "cherry", "banana", "donut"}; list<string> in(a, a + 10); list<string> *o = undup(in); for (list<string>::iterator it = o->begin(); it != o->end(); ++it) cout << *it << " "; delete o;`, out: 'apple donut banana cherry banana donut' } },
    { n: 'Q7', m: 'm10', q: 'Write the function <code>reverseArray</code> which takes an array of ints and the number of items in it, and reverses the contents of the array in place.', lang: 'c', ans: R`void reverseArray(int *array, int n) {
    for (int i = 0; i < n / 2; i++) {
        int temp = array[i];
        array[i] = array[n - i - 1];
        array[n - i - 1] = temp;
    }
}`, why: 'Swap element i with its mirror n - i - 1, and stop at the middle. Going all the way to n would swap everything back.',
      test: { main: R`int a[] = {1, 2, 3, 4, 5}; reverseArray(a, 5); for (int i = 0; i < 5; i++) cout << a[i]; int b[] = {7, 8}; reverseArray(b, 2); cout << " " << b[0] << b[1];`, out: '54321 87' } },
  ]},
  ]
},
];

/* What each paper tested, by module — used for the "where the marks are" chart. */
window.WEIGHTS = [
  { m: 'm1', marks: 14, where: 'A1-A5, B5' },
  { m: 'm2', marks: 0, where: 'Sample Q1 (long question)' },
  { m: 'm3', marks: 11, where: 'A6, A7, B1, B6' },
  { m: 'm4', marks: 2, where: 'A14 · Sample Q2 (long question)' },
  { m: 'm5', marks: 27, where: 'A8, A9, B2, C1' },
  { m: 'm6', marks: 6, where: 'A15, B3' },
  { m: 'm7', marks: 0, where: 'Sample Q3, Q4 (long questions)' },
  { m: 'm8', marks: 34, where: 'A11-A13, B4, B7, C2' },
  { m: 'm9', marks: 0, where: 'Sample Q6 (long question)' },
  { m: 'm10', marks: 6, where: 'A10, B8' },
];
})();
