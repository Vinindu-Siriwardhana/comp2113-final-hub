/* COMP2113 Final Hub — "practise here" sets for the More practice tab.
   Original questions written in the same style and at the same level as the external sources
   (USC CS103 final practice, USC CS104 recursive linked lists, GeeksforGeeks "what does this function do",
   Liang self-test on pointers). They are not copies of those pages: every answer here is built in,
   and tools/verify.js compiles and runs every trace, every program and every MCQ marked run: true. */
(function () {
const R = String.raw;

const NODE = R`struct Node { int val; Node *next; };`;
const LIST = R`struct Node { int val; Node *next; };
Node *make(int a[], int n) {      // builds a list holding a[0] .. a[n-1]
    if (n == 0) return NULL;
    Node *p = new Node;
    p->val = a[0];
    p->next = make(a + 1, n - 1);
    return p;
}
`;
const HELP = R`
void pushBack(Node *&head, int v) {
    Node *p = new Node; p->val = v; p->next = NULL;
    if (head == NULL) { head = p; return; }
    Node *c = head; while (c->next != NULL) c = c->next; c->next = p;
}
void show(Node *head) { for (Node *p = head; p != NULL; p = p->next) cout << p->val << " "; cout << "| "; }
`;

window.XSETS = [
{
  id: 'x-final', title: 'Final-exam mix', like: 'USC CS103 final practice',
  src: 'https://bytes.usc.edu/cs103/resources/fi/cs103-fa14-practice.html', m: 'm8',
  blurb: 'Pointers, dynamic memory, C-strings, structs, file I/O, recursion and linked lists, as a written final would ask them: predict, fix, write.',
  qs: [
    { id: 'xf1', type: 'mcq', m: 'm8', run: true, q: 'What is printed?', code: R`int a[] = {10, 20, 30, 40};
int *p = a + 1;
*(p + 2) = *p + 5;
cout << a[3];`, opts: ['40', '25', '35', '20'], a: 1,
      why: '<code>p</code> is on a[1] (20). <code>p + 2</code> is a[3], so a[3] = 20 + 5 = 25.' },
    { id: 'xf2', type: 'trace', m: 'm8', code: R`int x = 3, y = 8;
int *p = &x, *q = &y;
*p += *q;
p = q;
*p = 1;
cout << x << " " << y << " " << *q;`, out: '11 1 1',
      why: '<code>*p += *q</code> makes x = 11. Then p is moved to y, so <code>*p = 1</code> changes y, not x. q still points to y.' },
    { id: 'xf3', type: 'trace', m: 'm6', code: R`char s[] = "pointer";
char *p = s + 3;
p[1] = '\0';
cout << s << " " << p << " " << strlen(s + 5);`, out: 'poin n 2',
      why: 'p is on s[3] (\'n\'), so p[1] is s[4]. Putting \'\\0\' there cuts s to "poin" and p to "n". The characters after the \'\\0\' are still in memory: s + 5 is "er", length 2.' },
    { id: 'xf4', type: 'mcq', m: 'm6', run: true, q: 'What is printed?', code: R`char s[10] = "hi";
cout << sizeof(s) << " " << strlen(s);`, opts: ['3 2', '10 2', '10 3', '2 2'], a: 1,
      why: '<code>sizeof</code> gives the size of the whole array (10 chars). <code>strlen</code> counts characters before the \'\\0\'.' },
    { id: 'xf5', type: 'mcq', m: 'm7', run: true, q: 'What is printed?', code: R`struct Point { int x, y; };
Point pts[3] = {{1, 2}, {3, 4}, {5, 6}};
Point *p = pts;
p++;
p->y += pts[2].x;
cout << pts[1].y;`, opts: ['4', '9', '6', '11'], a: 1,
      why: 'After <code>p++</code>, p is on pts[1]. Its y becomes 4 + 5 = 9.' },
    { id: 'xf6', type: 'mcq', m: 'm8', q: 'What is wrong with this code?', code: R`int *p = new int(5);
int *q = p;
p = new int(7);
delete q;
q = p;
delete p;`, opts: ['The 5 is leaked', 'The 7 is leaked', 'Nothing: each block is freed exactly once', 'The 5 is deleted twice'], a: 2,
      why: 'q keeps the address of the 5 when p moves on, so <code>delete q</code> frees it. Then q = p and <code>delete p</code> frees the 7. (q is now dangling, but it is never used.)' },
    { id: 'xf7', type: 'short', m: 'm8', kind: 'Fix the bugs', q: '<code>grow</code> should double the capacity of a dynamic array and keep its values, so that after <code>grow(arr, size)</code> the caller\'s <code>arr</code> is the bigger array and <code>size</code> is doubled. There are <b>three</b> bugs. Give each as "line N: corrected code".',
      code: R`void grow(int *arr, int &size) {      // line 1
    int *bigger = new int[size * 2];  // line 2
    for (int i = 0; i <= size; i++)   // line 3
        bigger[i] = arr[i];           // line 4
    delete arr;                       // line 5
    arr = bigger;                     // line 6
    size = size * 2;                  // line 7
}`, lang: 'text', ans: `line 1: void grow(int *&arr, int &size) {
line 3: for (int i = 0; i < size; i++)
line 5: delete [] arr;`,
      why: 'Without <code>&amp;</code> the function changes its own copy of the pointer, so the caller never sees the new array (and its old array is deleted). <code>&lt;=</code> reads one past the end. Memory from <code>new []</code> must be freed with <code>delete []</code>.' },
    { id: 'xf8', type: 'trace', m: 'm8', code: R`struct Node { int val; Node *next; };
int main() {
    Node *head = NULL;
    for (int i = 1; i <= 4; i++) {
        Node *p = new Node;
        p->val = i * i;
        p->next = head;
        head = p;
    }
    Node *cur = head;
    while (cur != NULL && cur->next != NULL) {
        cout << cur->val - cur->next->val << " ";
        cur = cur->next->next;
    }
}`, out: '7 3',
      why: 'Inserting at the head reverses the order: 16 9 4 1. The loop takes pairs: 16 − 9 = 7, then jumps two nodes to 4: 4 − 1 = 3, then cur becomes NULL.' },
    { id: 'xf9', type: 'trace', m: 'm5', code: R`int f(int n) {
    if (n <= 1) return 1;
    return f(n - 1) + f(n - 2) * 2;
}
int main() { cout << f(5); }`, out: '21',
      why: 'Build up from the bottom: f(0) = f(1) = 1, f(2) = 1 + 2 = 3, f(3) = 3 + 2 = 5, f(4) = 5 + 6 = 11, f(5) = 11 + 10 = 21.' },
    { id: 'xf10', type: 'trace', m: 'm5', code: R`void show(int n) {
    if (n == 0) return;
    cout << n << " ";
    show(n / 2);
    cout << n % 2;
}
int main() { show(6); }`, out: '6 3 1 110',
      why: 'Going down, each call prints n and a space: 6 3 1. Coming back up (1, then 3, then 6) each prints n % 2: 1, 1, 0. That is 6 in binary.' },
    { id: 'xf11', type: 'prog', m: 'm8', marks: 8, title: 'Join two C-strings into new memory',
      q: 'Write <code>char *join(const char *a, const char *b)</code> that returns a new dynamically allocated C-string holding <code>a</code> followed by <code>b</code>. The caller will <code>delete []</code> it. You may use <code>strlen</code> and <code>strcpy</code>.', lang: 'cpp',
      sol: R`char *join(const char *a, const char *b) {
    int la = strlen(a), lb = strlen(b);
    char *s = new char[la + lb + 1];      // +1 for the '\0'
    strcpy(s, a);
    strcpy(s + la, b);                    // copies b's '\0' too
    return s;
}`,
      notes: ['Allocate <code>la + lb + 1</code>: forgetting the +1 is the classic mistake.', 'Copy b to <code>s + la</code>, right on top of a\'s \'\\0\'.', 'Never return the address of a local array: it dies when the function returns.'],
      test: { main: R`char *s = join("COMP", "2113"); cout << s << " " << strlen(s); delete [] s; char *e = join("", "x"); cout << " " << e; delete [] e;`, out: 'COMP2113 8 x' } },
    { id: 'xf12', type: 'prog', m: 'm8', marks: 10, title: 'Remove every node with a value',
      q: 'Write <code>int removeAll(Node *&amp;head, int v)</code> that deletes every node whose value is <code>v</code> and returns how many nodes it deleted.', given: NODE, lang: 'cpp',
      sol: R`int removeAll(Node *&head, int v) {
    int count = 0;
    while (head != NULL && head->val == v) {     // matches at the front
        Node *dead = head;
        head = head->next;
        delete dead;
        count++;
    }
    if (head == NULL) return count;
    Node *cur = head;                             // cur->val is never v here
    while (cur->next != NULL) {
        if (cur->next->val == v) {
            Node *dead = cur->next;
            cur->next = dead->next;
            delete dead;
            count++;
        } else {
            cur = cur->next;
        }
    }
    return count;
}`,
      notes: ['Deal with matches at the head first, in a loop: there may be several.', 'Look one node ahead (<code>cur-&gt;next</code>) so you can relink around the node you delete.', 'Only advance cur when you did not delete, or you skip a node.'],
      test: { pre: HELP, main: R`Node *h = NULL; int a[] = {3, 3, 1, 3, 2, 3}; for (int i = 0; i < 6; i++) pushBack(h, a[i]); int n = removeAll(h, 3); show(h); cout << n << " "; Node *e = NULL; cout << removeAll(e, 1);`, out: '1 2 | 4 0' } },
    { id: 'xf13', type: 'prog', m: 'm5', marks: 6, title: 'Recursive palindrome check',
      q: 'Write a <b>recursive</b> function <code>bool isPal(const char *s, int lo, int hi)</code> that returns true if <code>s[lo..hi]</code> reads the same forwards and backwards. No loops.', lang: 'cpp',
      sol: R`bool isPal(const char *s, int lo, int hi) {
    if (lo >= hi) return true;                 // 0 or 1 characters left
    if (s[lo] != s[hi]) return false;
    return isPal(s, lo + 1, hi - 1);
}`,
      notes: ['Base case: lo has met or passed hi.', 'Put <code>return</code> in front of the recursive call.'],
      test: { main: R`cout << isPal("racecar", 0, 6) << isPal("abca", 0, 3) << isPal("", 0, -1) << isPal("x", 0, 0);`, out: '1011' } },
    { id: 'xf14', type: 'prog', m: 'm7', marks: 10, title: 'File I/O: average and top scorer',
      q: '<code>scores.txt</code> has one student per line: a name (no spaces) and an integer score. Write a complete program that prints <code>Average: </code> and the average with 2 decimal places, then on the next line <code>Top: </code> and the name of the highest scorer. If the file cannot be opened, print <code>Cannot open</code> and exit with code 1. "Given" below is an example file.', lang: 'cpp',
      given: R`amy 70
ben 85
cat 64`,
      sol: R`#include <iostream>
#include <fstream>
#include <iomanip>
#include <string>
#include <cstdlib>
using namespace std;

int main() {
    ifstream fin("scores.txt");
    if (fin.fail()) {
        cout << "Cannot open" << endl;
        exit(1);
    }
    string name, top;
    int score, best = -1, total = 0, n = 0;
    while (fin >> name >> score) {        // stops cleanly at end of file
        total += score;
        n++;
        if (score > best) { best = score; top = name; }
    }
    fin.close();
    cout << fixed << setprecision(2) << "Average: " << (double)total / n << endl;
    cout << "Top: " << top << endl;
    return 0;
}`,
      notes: ['Open, check <code>fail()</code>, loop, close: the four steps markers look for.', 'Loop on <code>while (fin &gt;&gt; name &gt;&gt; score)</code>, not on <code>!fin.eof()</code>.', 'Cast before dividing, or 219 / 3 is integer division.'],
      test: { full: true, files: { 'scores.txt': 'amy 70\nben 85\ncat 64\n' }, out: 'Average: 73.00\nTop: ben' } },
  ],
},
{
  id: 'x-lltrace', title: 'Recursive linked-list traces', like: 'USC CS104 linked lists and recursion',
  src: 'https://bytes.usc.edu/cs104/resources/mt1-info/ll-su21/ques-ll-su21.html', m: 'm8',
  blurb: 'Recursive functions on linked lists to trace by hand. A bit harder than the exam: draw the list, then write down each call as you go in and come back out.',
  qs: [
    { id: 'xl1', type: 'trace', m: 'm8', code: LIST + R`
void f1(Node *p) {
    if (p == NULL) return;
    f1(p->next);
    cout << p->val << " ";
}
int main() {
    int a[] = {1, 2, 3, 4};
    f1(make(a, 4));
}`, out: '4 3 2 1',
      why: 'The print comes <em>after</em> the recursive call, so nothing prints until the call on NULL returns. Then each call prints on the way back out: 4, 3, 2, 1.' },
    { id: 'xl2', type: 'trace', m: 'm8', code: LIST + R`
void f2(Node *p) {
    if (p == NULL) { cout << "| "; return; }
    cout << p->val << " ";
    f2(p->next);
    if (p->val % 2 == 0) cout << p->val << " ";
}
int main() {
    int a[] = {3, 8, 5, 2};
    f2(make(a, 4));
}`, out: '3 8 5 2 | 2 8',
      why: 'On the way in every value prints: 3 8 5 2, then the NULL call prints "| ". On the way out (2, 5, 8, 3) only the even ones print: 2 8.' },
    { id: 'xl3', type: 'trace', m: 'm8', code: LIST + R`
int f3(Node *p) {
    if (p == NULL) return 0;
    if (p->next == NULL) return p->val;
    return p->val - f3(p->next->next);
}
int main() {
    int a[] = {9, 4, 6, 1, 2};
    cout << f3(make(a, 5));
}`, out: '5',
      why: 'Each call skips a node. f3(9) = 9 − f3(6), f3(6) = 6 − f3(2), and f3(2) = 2 because its next is NULL. So 6 − 2 = 4, then 9 − 4 = 5.' },
    { id: 'xl4', type: 'trace', m: 'm8', code: LIST + R`
Node *f4(Node *p) {
    if (p == NULL || p->next == NULL) return p;
    Node *rest = f4(p->next);
    p->next->next = p;
    p->next = NULL;
    return rest;
}
int main() {
    int a[] = {1, 2, 3};
    Node *h = make(a, 3);
    Node *r = f4(h);
    for (Node *c = r; c != NULL; c = c->next) cout << c->val << " ";
    cout << "| " << h->val << " " << (h->next == NULL);
}`, out: '3 2 1 | 1 1',
      why: 'This is recursive reverse. f4(3) returns 3. Back in f4(2): 3->next = 2, 2->next = NULL. Back in f4(1): 2->next = 1, 1->next = NULL. The node 3 is passed all the way back as the new head. h still points to node 1, which is now the last node, so h->next == NULL prints 1 (true).' },
    { id: 'xl5', type: 'trace', m: 'm8', code: LIST + R`
void f5(Node *&p, int k) {
    if (p == NULL) return;
    if (p->val < k) {
        Node *dead = p;
        p = p->next;
        delete dead;
        f5(p, k);
    } else {
        f5(p->next, k + 1);
    }
}
int main() {
    int a[] = {5, 2, 7, 6, 9, 1};
    Node *h = make(a, 6);
    f5(h, 4);
    for (Node *c = h; c != NULL; c = c->next) cout << c->val << " ";
}`, out: '5 7 6 9',
      why: 'k only goes up when a node is kept. 5 &lt; 4? no, keep, k = 5. 2 &lt; 5? yes, delete (k stays 5). 7 &lt; 5? no, k = 6. 6 &lt; 6? no, k = 7. 9 &lt; 7? no, k = 8. 1 &lt; 8? yes, delete. Because p is a reference, <code>p = p-&gt;next</code> relinks the previous node\'s next field directly.' },
    { id: 'xl6', type: 'trace', m: 'm8', code: LIST + R`
Node *f6(Node *a, Node *b) {
    if (a == NULL) return b;
    a->next = f6(b, a->next);
    return a;
}
int main() {
    int x[] = {1, 3, 5}, y[] = {2, 4};
    Node *r = f6(make(x, 3), make(y, 2));
    for (Node *c = r; c != NULL; c = c->next) cout << c->val << " ";
}`, out: '1 2 3 4 5',
      why: 'The two arguments swap places every call: f6(1, 2) → f6(2, 3) → f6(3, 4) → f6(4, 5) → f6(5, NULL) → f6(NULL, NULL) returns NULL. Coming back, each node is linked to the result of the call below it, so the lists are interleaved (zipped): 1 2 3 4 5.' },
    { id: 'xl7', type: 'trace', m: 'm8', code: LIST + R`
int f7(Node *p, int depth) {
    if (p == NULL) return 0;
    int r = f7(p->next, depth + 1);
    if (p->val > depth) {
        cout << p->val << " ";
        return r + 1;
    }
    return r;
}
int main() {
    int a[] = {0, 4, 1, 5, 2};
    int n = f7(make(a, 5), 1);
    cout << "| " << n;
}`, out: '5 4 | 2',
      why: 'Depths are 1, 2, 3, 4, 5 for 0, 4, 1, 5, 2. Printing happens on the way back, from the tail: 2 &gt; 5 no, 5 &gt; 4 yes (print 5), 1 &gt; 3 no, 4 &gt; 2 yes (print 4), 0 &gt; 1 no. Two values passed the test.' },
    { id: 'xl8', type: 'trace', m: 'm8', code: LIST + R`
int f8(Node *p) {
    if (p == NULL) return 0;
    if (p->val % 2 == 0) return p->val + f8(p->next);
    return f8(p->next) - p->val;
}
int main() {
    int a[] = {1, 2, 3, 4};
    cout << f8(make(a, 4));
}`, out: '2',
      why: 'Work from the tail: f8(4) = 4 + 0 = 4, f8(3) = 4 − 3 = 1, f8(2) = 2 + 1 = 3, f8(1) = 3 − 1 = 2.' },
  ],
},
{
  id: 'x-whatdo', title: 'What does this function do?', like: 'GeeksforGeeks linked list and recursion questions',
  src: 'https://www.geeksforgeeks.org/practice-questions-for-linked-list-and-recursion/', m: 'm5',
  blurb: 'Short recursive functions: say what they compute, or what they print for a given input. Try a tiny example on paper before picking an option.',
  qs: [
    { id: 'xw1', type: 'mcq', m: 'm8', q: 'What does <code>f(head)</code> return?', code: NODE + R`
int f(Node *p) {
    if (p == NULL) return 0;
    return (p->val > 0) + f(p->next);
}`, opts: ['The sum of the positive values', 'The number of positive values', 'The number of nodes', '1 if any value is positive, else 0'], a: 1,
      why: '<code>(p-&gt;val &gt; 0)</code> is a bool that becomes 1 or 0 when added, so each node adds 1 only if its value is positive.' },
    { id: 'xw2', type: 'mcq', m: 'm8', run: true, q: 'The list holds 1 2 3 4 5 6. What is printed?', code: LIST + R`
void f(Node *p) {
    if (p == NULL) return;
    if (p->next != NULL) f(p->next->next);
    cout << p->val << " ";
}
int main() {
    int a[] = {1, 2, 3, 4, 5, 6};
    f(make(a, 6));
}`, opts: ['1 3 5', '5 3 1', '6 4 2', '2 4 6'], a: 1,
      why: 'The calls visit 1, 3, 5 (each skips one node). From 5, next is 6, so it calls f(NULL) and returns. The prints happen on the way out: 5, 3, 1.' },
    { id: 'xw3', type: 'mcq', m: 'm8', q: 'What does <code>f(head)</code> tell you about the list?', code: NODE + R`
bool f(Node *p) {
    if (p == NULL || p->next == NULL) return true;
    return p->val <= p->next->val && f(p->next);
}`, opts: ['Whether it is sorted in ascending (non-decreasing) order', 'Whether all values are equal', 'Whether it has an even number of nodes', 'Whether it is sorted in descending order'], a: 0,
      why: 'It checks every neighbouring pair: each value must be &lt;= the next. An empty or one-node list counts as sorted.' },
    { id: 'xw4', type: 'mcq', m: 'm8', q: 'What does <code>f(head)</code> return?', code: NODE + R`
Node *f(Node *p) {
    if (p == NULL || p->next == NULL) return p;
    return f(p->next);
}`, opts: ['The second node', 'A pointer to the last node (NULL for an empty list)', 'Always NULL', 'The head'], a: 1,
      why: 'It keeps moving one node along until the current node has no next. That node is the tail.' },
    { id: 'xw5', type: 'mcq', m: 'm5', run: true, q: 'What does <code>f(9875)</code> print?', code: R`int f(int n) {
    if (n < 10) return n;
    return f(n / 10 + n % 10);
}
int main() { cout << f(9875); }`, opts: ['29', '2', '11', '5'], a: 1,
      why: '987 + 5 = 992, then 99 + 2 = 101, then 10 + 1 = 11, then 1 + 1 = 2, which is below 10.' },
    { id: 'xw6', type: 'mcq', m: 'm5', q: 'What does <code>f(a, 0, n - 1)</code> do to an array of n ints?', code: R`void f(int a[], int lo, int hi) {
    if (lo >= hi) return;
    int t = a[lo];
    a[lo] = a[hi];
    a[hi] = t;
    f(a, lo + 1, hi - 1);
}`, opts: ['Sorts it', 'Reverses it', 'Swaps only the first and last elements', 'Rotates it one place left'], a: 1,
      why: 'It swaps the two ends, then moves both ends inwards and repeats until they meet. That is the recursive version of the reverse-an-array loop.' },
    { id: 'xw7', type: 'mcq', m: 'm6', run: true, q: 'What does <code>f("exam")</code> print?', code: R`void f(const char *s) {
    if (*s == '\0') return;
    f(s + 1);
    cout << *s;
}
int main() { f("exam"); }`, opts: ['exam', 'maxe', 'e', 'xam'], a: 1,
      why: 'Each call first recurses on the rest of the string, then prints its own character, so the characters come out last-first.' },
  ],
},
{
  id: 'x-ptrtest', title: 'Pointer self-test', like: 'Liang C++ self-test, Chapter 11',
  src: 'https://liveexample-ppe.pearsoncmg.com/selftest/selftestcpp3e?chapter=11', m: 'm8',
  blurb: 'Quick "what is printed" questions on pointers, arrays, C-strings and new / delete. Aim for under a minute each.',
  qs: [
    { id: 'xp1', type: 'mcq', m: 'm8', run: true, q: 'What is printed?', code: R`int a[] = {2, 4, 6, 8};
int *p = a;
cout << *p + 1 << " " << *(p + 1);`, opts: ['3 4', '4 4', '3 3', '4 6'], a: 0,
      why: '<code>*p + 1</code> is (value of a[0]) + 1 = 3. <code>*(p + 1)</code> is a[1] = 4. Precedence decides which one moves the pointer.' },
    { id: 'xp2', type: 'mcq', m: 'm8', run: true, q: 'What is printed?', code: R`int x = 5;
int &r = x;
int *p = &r;
*p = 9;
cout << x << r;`, opts: ['55', '59', '99', '95'], a: 2,
      why: 'r is another name for x, so <code>&amp;r</code> is the address of x. Changing <code>*p</code> changes x, and r is x.' },
    { id: 'xp3', type: 'mcq', m: 'm8', run: true, q: 'What is printed?', code: R`int a[5] = {1, 2, 3, 4, 5};
int *p = &a[4];
int *q = a;
cout << p - q;`, opts: ['4', '5', '16', '20'], a: 0,
      why: 'Subtracting two pointers into the same array gives the number of <em>elements</em> between them, not bytes.' },
    { id: 'xp4', type: 'mcq', m: 'm6', run: true, q: 'What is printed?', code: R`char s[] = "Hello";
char *p = s;
p += 2;
cout << *p << p;`, opts: ['lllo', 'llo', 'l llo', 'Hello'], a: 0,
      why: '<code>*p</code> is one char, \'l\'. <code>p</code> on its own is a char pointer, so cout prints the C-string from there: "llo".' },
    { id: 'xp5', type: 'mcq', m: 'm8', run: true, q: 'What is printed?', code: R`int *p = new int[3];
for (int i = 0; i < 3; i++) p[i] = i * 3;
int *q = p + 1;
cout << q[1] << " " << *q - p[0];
delete [] p;`, opts: ['6 3', '3 3', '6 6', '3 0'], a: 0,
      why: 'The array is 0 3 6. q is on p[1], so q[1] is p[2] = 6, and <code>*q - p[0]</code> is 3 − 0 = 3.' },
    { id: 'xp6', type: 'mcq', m: 'm8', run: true, q: 'What is printed?', code: R`void f(int *a, int *b) {
    int *t = a;
    a = b;
    b = t;
    *a = *a + 1;
}
int main() {
    int x = 1, y = 5;
    f(&x, &y);
    cout << x << " " << y;
}`, opts: ['2 5', '6 1', '1 6', '5 1'], a: 2,
      why: 'Swapping the pointers a and b only swaps the function\'s own copies; x and y are not swapped. After the swap a points to y, so y becomes 6.' },
    { id: 'xp7', type: 'mcq', m: 'm8', run: true, q: 'What is printed?', code: R`const char *names[] = {"Ann", "Bob", "Cy"};
const char **p = names + 1;
cout << *p << " " << (*p)[2] << " " << p[1];`, opts: ['Bob b Cy', 'Bob o Cy', 'Ann b Bob', 'Bob b Ann'], a: 0,
      why: 'p is on names[1]. <code>*p</code> is "Bob", <code>(*p)[2]</code> is its third char \'b\', and <code>p[1]</code> is names[2], "Cy".' },
    { id: 'xp8', type: 'mcq', m: 'm6', run: true, q: 'What is printed?', code: R`int m[2][3] = {{1, 2, 3}, {4, 5, 6}};
int *p = &m[0][0];
cout << p[4] << " " << *(m[1] + 2);`, opts: ['5 6', '4 6', '5 3', '2 6'], a: 0,
      why: 'A 2D array is stored row after row: 1 2 3 4 5 6, so p[4] is 5. <code>m[1] + 2</code> points to m[1][2], which is 6.' },
    { id: 'xp9', type: 'mcq', m: 'm8', q: 'After this code runs, which statement is true?', code: R`int *p = new int(4);
int *q = p;
delete p;
p = NULL;`, opts: ['q is NULL too', 'q still holds the old address, but using *q is undefined: q is a dangling pointer', 'The int is leaked', 'delete p also deleted q, so q no longer exists'], a: 1,
      why: '<code>delete</code> frees the memory, and <code>p = NULL</code> changes only p. q is a separate variable that still holds the freed address.' },
    { id: 'xp10', type: 'mcq', m: 'm7', run: true, q: 'What is printed?', code: R`struct Item { int n; double w; };
Item *it = new Item;
it->n = 3;
(*it).w = it->n / 2;
cout << it->w;
delete it;`, opts: ['1.5', '1', '0', 'Compile error'], a: 1,
      why: '<code>it-&gt;n / 2</code> is int / int = 1, which is then stored in the double as 1.0, printed as 1. <code>(*it).w</code> and <code>it-&gt;w</code> are the same thing.' },
  ],
},
];
})();
