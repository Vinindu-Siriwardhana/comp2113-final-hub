/* COMP2113 Final Hub — past papers with worked answers.
   Questions are from the papers in the "Past Papers" folder (and "Past Papers/Tanya":
   the May 2022 final and the March 2023 quiz).
   Only the sample paper has official solutions in the folder: the other answers were worked
   out here and the code answers are compiled and run by tools/verify.js. */
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

const NODE = R`struct Node {
    int val;
    Node *next;
};
Node *head;
`;
const DNODE = R`struct Node {
    int val;
    Node *next;
    Node *prev;
};
Node *head;
Node *tail;
`;

window.PAPERS = [
{
  id: 'y2122', title: '2021-22 Final Exam', meta: 'COMP2113 / ENGG1340 · 11 May 2022 · 2 hours · 100 marks',
  note: 'Format: Section A 15 MCQs (30%), Section B 8 short questions (30%), Section C 2 programming questions (40%). One double-sided A4 sheet of notes was permitted, and approved calculators. It was sat online: hand-written, scanned and uploaded to OLEX. PDF: Past Papers/Tanya/ENGG1340_2022May.pdf.',
  sections: [
  { name: 'Section A · Multiple choice (2 marks each)', items: [
    { n: 'A1', m: 'm1', q: 'How to rename a file from "1.txt" to "2.txt"?', opts: ['mv 1.txt 2.txt', 'mv 2.txt 1.txt', 'rn 1.txt 2.txt', 'rn 2.txt 1.txt'], a: 0, why: '<code>mv old new</code>. Linux has no <code>rn</code> command.' },
    { n: 'A2', m: 'm1', q: 'If you want to know more about the command "less", which command can show you its descriptions and options?', opts: ['help less', 'search less', 'man less', 'None of the above'], a: 2, why: '<code>man</code> opens the manual page. Same question as 2019-20 A5 with a different command.' },
    { n: 'A3', m: 'm1', q: 'Which command only shows the count of words contained in a file?', opts: ['wc -w', 'countw -w', 'countw', 'wc'], a: 0, why: '<code>-w</code> = words only. Plain <code>wc</code> prints lines, words and bytes.' },
    { n: 'A4', m: 'm1', q: 'Consider the command: <code>cat file1 | cat &gt;&gt; file2</code>. Which of the following is correct?', opts: ['file1\'s content will be printed to the screen and appended to file2', 'file1\'s content will be appended to file2', 'file1 and file2 will have the same content for sure', 'syntax error'], a: 1, why: 'The second cat reads file1 through the pipe and its output is redirected with <code>&gt;&gt;</code> (append) into file2. Nothing reaches the screen, and file2 keeps its old content.' },
    { n: 'A5', m: 'm1', q: 'Which command is used to sort the lines in a file in both numeric and reversing order?', opts: ['sort', 'sort -k', 'sort -k -r', 'None of the above'], a: 3, why: 'Numeric and reverse is <code>sort -n -r</code> (or <code>sort -nr</code>). <code>-k</code> picks a column; it does not make the sort numeric.' },
    { n: 'A6', m: 'm3', q: 'Which one is the correct way to temporarily hide a part of code from compiler in C/C++ programming:', opts: ['# return(0);', '\'\'\' return(0); \'\'\'', '// return (0);', '<!-- return (0); >'], a: 2, why: '<code>//</code> comments out the rest of the line. # is a pre-processor directive, triple quotes are Python, <code>&lt;!-- --&gt;</code> is HTML.' },
    { n: 'A7', m: 'm4', q: 'What is the purpose of <code>.PHONY</code> in a Makefile?', opts: ['To create a target that is a file', 'To mark a target that does not represent a physical file and run some commands', 'To declare a target as optional and can be ignored if failed', 'None of the above'], a: 1, why: 'A phony target such as <code>clean</code> is a name for some commands, not a file. Declaring it means make runs it even if a file called clean exists.' },
    { n: 'A8', m: 'm10', q: 'Which function is used in C to get the length of a string?', opts: ['len()', 'strlen()', 'length()', 'strLength()'], a: 1, why: 'Same as 2019-20 A10. <code>strlen</code> is in string.h.' },
    { n: 'A9', m: 'm3', q: 'The precedence of the following operators, in descending order, is: <code>&gt; &lt;</code>, then <code>== !=</code>, then <code>&amp;&amp;</code>, then <code>||</code>. What is the output when function f() below is called?', code: R`void f() {
    int x = 2, y = 4, z = 8;
    if (y == 2 || x != 2 && y > 2 || z < 2)
       cout << x + y % z + 3;
    else
       cout << y + z % x - 3;
}`, opts: ['9', '1', '3', '-1'], a: 1, why: '&& binds first: <code>x != 2 &amp;&amp; y &gt; 2</code> is false &amp;&amp; true = false. y == 2 and z &lt; 2 are false too, so the else runs: 4 + 8 % 2 − 3 = 4 + 0 − 3 = 1.' },
    { n: 'A10', m: 'm6', q: 'Which of the following statement generates a random number in the inclusive range from -10 to 10, i.e., [-10, 10]?', opts: ['(-rand()) % 21 + 10', 'int(rand() * 20) - 10', 'rand() % 20 - 10', '(-int(rand() * 20)) - 10'], a: 0, why: '[-10, 10] has 21 values. <code>-rand()</code> is zero or negative, so <code>(-rand()) % 21</code> is in [-20, 0]; adding 10 gives [-10, 10]. C gives only [-10, 9]. B and D multiply rand() instead of using %.' },
    { n: 'A11', m: 'm8', q: 'With a as an array and aPtr as a pointer to a, which expression refers to the address of the fourth element of a?', opts: ['*(aPtr + 3)', 'aPtr[3]', '*a[3]', 'None of above'], a: 3, why: 'The fourth element is index 3. A and B are its <em>value</em>; C does not compile (a[3] is an int). The address would be <code>aPtr + 3</code> or <code>&amp;a[3]</code>, which are not listed.' },
    { n: 'A12', m: 'm8', q: 'Consider the statement: <code>char* a, b, c[10];</code> Which of the following is correct?', opts: ['a and b are pointers to a char, c is a pointer to a char array', 'a and b are pointers to a char, c is a pointer pointing to a pointer of a char array', 'a is a pointer to a char, b is a char, c is a pointer to a char array', 'None of above'], a: 2, why: 'The * belongs to a only, so b is a plain char (same trap as 2019-20 A13). c is an array of 10 chars, and its name acts as a pointer to the first char, which is what option C means.' },
    { n: 'A13', m: 'm10', q: 'Which of the statements below is NOT true?', opts: ['++i means "add 1 to i and then return the incremented value"', 'malloc() in C serves the same purpose as the new operator in C++', 'delete() in C serves the same purpose as the free operator in C++', 'C programming has no namespace'], a: 2, why: 'C is the wrong way round: <code>free()</code> is the C function and <code>delete</code> is the C++ operator.' },
    { n: 'A14', m: 'm8', q: 'Which of the following causes the compile-time error?', opts: ['Dereferencing a pointer that has not been assigned to point to a specific address', 'Dereferencing a variable that is not a pointer', 'Dereferencing a null pointer', 'None of above'], a: 1, why: 'The reverse of 2019-20 A11. A and C compile and then fail at run time; dereferencing a non-pointer is rejected by the compiler.' },
    { n: 'A15', m: 'm9', q: 'Which of the following statements about STL container functions is true?', opts: ['<vector> has .push_back and .push_front', '<list> has .push_back and .push_front', '<map> has .push_back and .push_front', 'All of above'], a: 1, why: 'vector has push_back only (adding at the front would shift everything). map has neither: you insert with <code>m[key] = value</code> or insert().' },
  ]},
  { name: 'Section B · Short questions', items: [
    { n: 'B1', marks: 3, m: 'm3', q: 'Write down the output of the following code segment.', code: R`int x = 4;
int y = 9;
int z = 4;
if (z++ / 3 == 0 && x % 4 == 0 && y % x == 1) {
    x+=1;
}
y += x / 2;
cout << x * y * ++z;`, out: '264', why: 'z++ / 3 uses the old z: 4 / 3 = 1, so the first test is false and && stops there. z is now 5. y = 9 + 4 / 2 = 11. ++z makes z 6. 4 × 11 × 6 = 264.' },
    { n: 'B2', marks: 4, m: 'm5', q: 'Write down the output of the following code segment.', code: R`void f(int &a) {
    a = a * a;
    {
     cout << a << " ";
     int a = 4;
     cout << a << " ";
    }
}

int main() {
    int a = 5;
    {
     int a = 6;
     f(a);
     cout << a << " ";
    }
    f(a);
    cout << a << " ";
    return 0;
}`, out: '36 4 36 25 4 25', why: 'f takes a reference, so it squares main\'s variable. f(inner a = 6) prints 36, then the block\'s own a prints 4, then main prints the inner a, now 36. f(outer a = 5) prints 25 and 4, then main prints 25.' },
    { n: 'B3', marks: 3, m: 'm5', q: 'Write down the output of the following code segment.', code: R`void g(int &a, int &b) {
    a = a + b;
    b = a - b;
    a = a - b;
}

void f(int a, int b) {
    a = a + b;
    b = a - b;
    a = a - b;
}

int main() {
    int a = 200, b = 100;
    g(a, b);
    cout << a << ' ' << b << '\n';
    f(b, a);
    cout << a << ' ' << b << '\n';
    g(b, a);
    cout << a << ' ' << b << '\n';
    return 0;
}`, out: '100 200\n100 200\n200 100', why: 'The three lines swap two values without a temporary. g takes references, so it really swaps: 100 200. f takes copies, so nothing changes: 100 200. g again swaps back: 200 100.' },
    { n: 'B4', marks: 4, m: 'm2', q: 'The content of the Bash script run.sh is shown below. Write down the output when running the command: <code>run.sh hello HKU</code>.', code: `#!/bin/bash

echo $1
echo $2`, codeLang: 'sh', out: 'hello\nHKU', why: '$1 is the first argument and $2 the second. Each echo prints its own line.' },
    { n: 'B5', marks: 4, m: 'm1', q: 'Suppose that the file courses.txt contains the lines below. Write down the output when running the command: <code>cat courses.txt | grep "COMP2" | cut -d \' \' -f 2 | sort</code>.', code: `COMP2120 Computer Organization
COMP2396 Object-oriented Programming and Java
COMP3297 Software Engineering
COMP2121 Discrete Mathematics
COMP2119 Introduction to Data Structures and Algorithms
COMP3230 Principles of Operating Systems
COMP3234 Computer and Communication Networks
COMP3250 Design and Analysis of Algorithms
COMP3278 Introduction to Database Management Systems`, codeLang: 'text', out: 'Computer\nDiscrete\nIntroduction\nObject-oriented', why: 'grep keeps the four COMP2xxx lines. cut with a space delimiter keeps field 2, the first word of the title. sort puts them in alphabetical order. One word per line.' },
    { n: 'B6', marks: 4, m: 'm5', q: 'Write down the output of the following code segment.', code: R`bool reach42(int n) {
    if (n < 42)
       return false;
    if (n == 42)
       return true;
    if ((n % 5 == 0) && reach42(n - 42))
       return true;
    if ((n % 2 == 0) && reach42(n / 2))
       return true;
    if (n % 4 == 0|| n % 3 == 0) {
       int one = n % 10;
       int two = (n % 100) / 10;
       return one * two != 0 && reach42(n - one * two);
    }
    return false;
}

int main() {
    if (reach42(68))
       cout << "true ";
    else
       cout << "false ";
    if (reach42(52))
       cout << "true ";
    else
       cout << "false ";
    return 0;
}`, out: 'false true', why: '68: not a multiple of 5; 68 / 2 = 34 &lt; 42 is false; 68 % 4 == 0 so subtract 8 × 6 = 48, giving 20, false. 52: 52 / 2 = 26 is false; 52 % 4 == 0 so subtract 2 × 5 = 10, giving 42: true.' },
    { n: 'B7', marks: 4, m: 'm6', q: 'minval should return the minimum number in an array of n positive integers, but the code has a bug. Write the line number of the faulty line and the correct code.', code: R`line 1:  int minval(int *A, int n) {
line 2:   int currmin;
line 3:   for (int i = 0; i < n; i++)
line 4:     if (A[i] < currmin)
line 5:       currmin = A[i];
line 6:   return currmin;
line 7:  }`, lang: 'cpp', ans: R`line 2:   int currmin = A[0];`, why: 'currmin is never initialised, so the first comparison uses a garbage value. If the garbage happens to be small (or negative), it is returned. Starting from A[0] fixes it. <code>INT_MAX</code> from climits also works.' },
    { n: 'B8', marks: 4, m: 'm3', q: 'The program should print the welcome message ("Welcome") only when the user is "alex" and the magic number is 42, but it does not run correctly. Fix the code. Specify clearly the line(s) for the change.', code: R`line 1:   #include<string.h>
line 2:
line 3:   int main() {
line 4:            cout << "Please input username:\n";
line 5:            char user[1024];
line 6:            cin >> user;
line 7:
line 8:            if (user != "alex") {
line 9:                      exit(1);
line 10:
line 11:           }
line 12:
line 13:           cout << "Please input the magic number:\n";
line 14:           int magic;
line 15:           cin >> magic;
line 16:
line 17:           switch (magic) {
line 18:                     case 118:
line 19:                               cout << "Getting close.\n";
line 20:                     case 53:
line 21:                               cout << "Almost there.\n";
line 22:                     case 42:
line 23:                               cout << "Welcome!\n";
line 24:                     default:
line 25:                               exit(1);
line 26:
line 27:           }
                   return 0;
          }`, lang: 'cpp', ans: R`line 8:   if (strcmp(user, "alex") != 0) {
line 19:  cout << "Getting close.\n";  break;
line 21:  cout << "Almost there.\n";   break;
line 23:  cout << "Welcome!\n";        break;`, why: 'Two bugs. <code>user != "alex"</code> compares two addresses, which are always different, so every user exits; C-strings are compared with <code>strcmp</code>. And without <code>break</code> each case falls through: 118 and 53 would also print Welcome, and 42 would fall into <code>exit(1)</code>.' },
  ]},
  { name: 'Section C · Programming questions', items: [
    { n: 'C1(a)', marks: 10, m: 'm5', q: 'Write <code>string BinaryNumber(int decimal)</code>, which returns the binary form of a non-negative decimal number as a string (421 → "110100101", 0 → "0"). Divide by 2 repeatedly: the remainders, read from bottom to top, are the binary digits. Write the <strong>iterative</strong> version using a while loop.', lang: 'cpp', ans: R`string BinaryNumber(int decimal) {
    if (decimal == 0)
        return "0";
    string binary = "";
    while (decimal > 0) {
        binary = (decimal % 2 == 0 ? "0" : "1") + binary;   // new digit goes in front
        decimal = decimal / 2;
    }
    return binary;
}`, why: 'Each remainder is the next digit from the right, so add it to the <em>front</em> of the string. 0 needs its own case because the loop would not run and you would return "".',
      test: { main: R`cout << BinaryNumber(0) << " " << BinaryNumber(1) << " " << BinaryNumber(2) << " " << BinaryNumber(8) << " " << BinaryNumber(42) << " " << BinaryNumber(421);`, out: '0 1 10 1000 101010 110100101' } },
    { n: 'C1(b)', marks: 10, m: 'm5', q: 'Write the <strong>recursive</strong> version of <code>BinaryNumber</code>.', lang: 'cpp', ans: R`string BinaryNumber(int decimal) {
    if (decimal < 2)                                   // base case: 0 or 1
        return decimal == 0 ? "0" : "1";
    return BinaryNumber(decimal / 2) + (decimal % 2 == 0 ? "0" : "1");
}`, why: 'The binary form of n is the binary form of n / 2 followed by the last digit n % 2. Stop at 0 or 1, which are single digits.',
      test: { main: R`cout << BinaryNumber(0) << " " << BinaryNumber(1) << " " << BinaryNumber(2) << " " << BinaryNumber(8) << " " << BinaryNumber(42) << " " << BinaryNumber(421);`, out: '0 1 10 1000 101010 110100101' } },
    { n: 'C2(a)', marks: 12, m: 'm8', q: 'Given the linked list below, write <code>void DeleteMiddleNode(Node *head)</code>. It deletes the middle node if the list has an odd number of nodes, or the node before the middle if it has an even number (1 or 2 nodes: delete the first; 3 or 4 nodes: delete the second; and so on). An empty list is left alone. You only unlink the node; freeing it is not needed.', code: NODE, lang: 'cpp', ans: R`void DeleteMiddleNode(Node *head) {
    if (head == NULL)
        return;                              // empty list: nothing to delete
    int n = 0;
    for (Node *p = head; p != NULL; p = p->next)
        n++;
    int k = (n - 1) / 2;                     // index of the node to delete (0-based)
    if (k == 0) {                            // the first node goes (n is 1 or 2)
        if (head->next == NULL) {
            ::head = NULL;                   // one node: the global list becomes empty
        } else {
            head->val = head->next->val;     // two nodes: copy the 2nd into the 1st
            head->next = head->next->next;   // and unlink the 2nd
        }
        return;
    }
    Node *before = head;
    for (int i = 0; i < k - 1; i++)          // stop at the node before index k
        before = before->next;
    before->next = before->next->next;       // bypass it
}`, why: 'Count the nodes, then the node to delete is index (n − 1) / 2: 1→0, 2→0, 3→1, 4→1, 5→2. Unlink it from the node before it. The catch: <code>head</code> is passed by value, so the function cannot point the caller\'s head elsewhere. When the first node must go, copy the second node\'s value into it and unlink the second; for a one-node list, clear the global <code>head</code> from the question (<code>::head</code>). Say this in your answer.',
      test: { pre: NODE + R`void build(int n) { head = NULL; for (int i = n; i >= 1; i--) { Node *p = new Node; p->val = i; p->next = head; head = p; } }
void show() { cout << "["; for (Node *p = head; p; p = p->next) cout << p->val << (p->next ? " " : ""); cout << "] "; }
`, main: R`for (int n = 0; n <= 6; n++) { build(n); DeleteMiddleNode(head); show(); }`, out: '[] [] [2] [1 3] [1 3 4] [1 2 4 5] [1 2 4 5 6]' } },
    { n: 'C2(b)', marks: 2, m: 'm8', q: 'A doubly linked list has pointers to both the next and the previous node, plus head and tail pointers. Implement it by adding two lines to the code above. Copy the five given lines and insert yours in place.', lang: 'cpp', ans: DNODE, why: 'One line inside the struct (<code>Node *prev;</code>) and one global <code>Node *tail;</code> next to head.' },
    { n: 'C2(c)', marks: 6, m: 'm8', q: 'Using your doubly linked list, write <code>void ReverseDoublyLinkedList(Node **head_ptr, Node **tail_ptr)</code>, which reverses the list (the head becomes the tail and the other way round) and updates <code>*head_ptr</code> and <code>*tail_ptr</code>.', lang: 'cpp', ans: R`void ReverseDoublyLinkedList(Node **head_ptr, Node **tail_ptr) {
    Node *cur = *head_ptr;
    while (cur != NULL) {
        Node *nxt = cur->next;      // remember the way forward
        cur->next = cur->prev;      // swap the two links
        cur->prev = nxt;
        cur = nxt;
    }
    Node *old = *head_ptr;          // swap head and tail
    *head_ptr = *tail_ptr;
    *tail_ptr = old;
}`, why: 'Reversing a doubly linked list is just swapping next and prev in every node, then swapping head and tail. Save next before you overwrite it. <code>**</code> parameters are pointers to the caller\'s head and tail, so assign through <code>*head_ptr</code>.',
      test: { pre: DNODE + R`void build(int n) { head = tail = NULL; for (int i = 1; i <= n; i++) { Node *p = new Node; p->val = i; p->next = NULL; p->prev = tail; if (tail) tail->next = p; else head = p; tail = p; } }
void show() { cout << "["; for (Node *p = head; p; p = p->next) cout << p->val << (p->next ? " " : ""); cout << "]<"; for (Node *p = tail; p; p = p->prev) cout << p->val << (p->prev ? " " : ""); cout << "> "; }
`, main: R`for (int n = 0; n <= 4; n++) { build(n); ReverseDoublyLinkedList(&head, &tail); show(); }`, out: '[]<> [1]<1> [2 1]<1 2> [3 2 1]<1 2 3> [4 3 2 1]<1 2 3 4>' } },
  ]},
  ]
},
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
  id: 'sample', title: 'Revision Questions (2026)', meta: 'Posted by Dr Chim for the 2026 final, with suggested solutions',
  note: 'The "Revision Questions" set from the Final Exam section of Moodle (Revision Questions.pdf in your COMP2113 folder; the same questions as the older sample final). Seven long questions, one per topic area. Answers below follow the official suggested solutions. Where the official answer has a slip, the note says so. Q6 (STL) and Q7 (C) are Module 9 and 10 topics, which this year appear only in Sections A and B, so treat them as reading and tracing practice.',
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
{
  id: 'q2023', title: '2023 Quiz (Shell and C++)', meta: 'COMP2113 / ENGG1340 quiz · 27 Mar 2023 · 110 minutes · 15 marks',
  note: 'A Moodle (VPL) coding quiz, not a final: programs are marked by exact output match, so spacing and newlines must be right. Good practice for Module 2 scripts and short C++ programs. PDF: Past Papers/Tanya/2023_quiz-v4.pdf.',
  sections: [
  { name: 'Q1 · Shell scripts (7 marks)', items: [
    { n: 'Q1(a)', marks: 3, m: 'm2', q: 'Write <code>getWords.sh</code>. It takes one argument, a file name, and prints every word in the file once, one per line, in the order they first appear (case sensitive). Words are separated by spaces, tabs or newlines. Print nothing if the file has no words or no argument is given. Hint: <code>grep -w</code> matches whole words only. For the file below the output is <code>apple pineapple APPLE Orange orange Apple</code>, one per line.', code: `apple pineapple
APPLE Orange            orange
orange Apple`, codeLang: 'text', lang: 'sh', ans: `#!/bin/bash
if [ $# -lt 1 ]; then
    exit 0
fi
seen=""
for w in $(cat "$1"); do
    if ! echo "$seen" | grep -qx -- "$w"; then   # not printed yet?
        echo "$w"
        seen="$seen
$w"                                               # remember it, one per line
    fi
done`, why: '<code>$(cat "$1")</code> unquoted splits on spaces, tabs and newlines, so the loop gets one word at a time. Keep the words already printed, one per line, and print a word only if <code>grep -x</code> (whole line) does not find it. <code>-q</code> keeps grep quiet so only its exit status is used.' },
    { n: 'Q1(b)', marks: 4, m: 'm2', q: 'Write <code>getKeyword.sh</code>. It takes one argument, a file name, and prints the most frequent word(s) and their count, one "word count" per line. If several words share the highest count, print them all in alphabetical order. Print nothing if there are no words or no argument. For the same file the output is <code>orange 2</code>. Hints: <code>sort</code>, <code>uniq -c</code>, <code>sort -nr</code>, <code>head -n 1</code>.', lang: 'sh', ans: `#!/bin/bash
if [ $# -lt 1 ]; then
    exit 0
fi
# one word per line -> sort -> count each word ("   2 orange")
counts=$(for w in $(cat "$1"); do echo "$w"; done | sort | uniq -c)
if [ -z "$counts" ]; then
    exit 0
fi
max=$(echo "$counts" | sort -nr | head -n 1)   # line with the highest count
max=$(echo $max | cut -d ' ' -f 1)            # keep just the number
echo "$counts" | while read count word; do      # still in alphabetical order
    if [ "$count" -eq "$max" ]; then
        echo "$word $count"
    fi
done`, why: 'uniq only merges <em>adjacent</em> equal lines, so sort first. The counts list is already alphabetical, so find the highest count separately and then print every word with that count. <code>echo $max</code> without quotes drops the leading spaces uniq -c adds, so cut can take field 1.' },
  ]},
  { name: 'Q2-Q3 · C++ programs (8 marks)', items: [
    { n: 'Q2', marks: 4, m: 'm3', q: 'Complete <code>int reverse(int N)</code>: it reverses the digits of N and its sign. Trailing zeros disappear. Tests: 123 → -321, -456700 → 7654, 9876543 → -3456789. The given main reads N and prints <code>reverse(N)</code>.', lang: 'cpp', ans: R`int reverse(int N) {
    int r = 0;
    while (N != 0) {
        r = r * 10 + N % 10;     // take the last digit
        N = N / 10;              // drop it
    }
    return -r;                   // flip the sign
}`, why: 'The usual digit-reversing loop. It works for negative N too, because in C++ <code>-456700 % 10</code> is 0 and <code>-7 % 10</code> is -7, so r comes out as -7654 and -r is 7654. Trailing zeros vanish on their own: 0 × 10 + 0 is still 0.',
      test: { main: R`cout << reverse(123) << " " << reverse(-456700) << " " << reverse(9876543) << " " << reverse(0) << " " << reverse(-5);`, out: '-321 7654 -3456789 0 5' } },
    { n: 'Q3', marks: 4, m: 'm5', q: 'S(n) is the number of divisors of n (S(1) = 1, S(4) = 3, S(6) = 4). A positive integer p is <em>antiprime</em> if it has more divisors than every smaller positive integer; 1 is the smallest. Read an integer b (negative, zero or positive, b ≤ 100000) and print the smallest antiprime ≥ b. Tests: 11 → 12, 12 → 12, -10 → 1, 700 → 720, 45678 → 50400.', lang: 'cpp', ans: R`#include <iostream>
using namespace std;

int S(int n) {                        // number of divisors of n
    int count = 0;
    for (int d = 1; d * d <= n; d++)
        if (n % d == 0)
            count += (d * d == n) ? 1 : 2;   // d and n / d
    return count;
}

int main() {
    int b;
    cin >> b;
    int best = 0;                     // most divisors seen so far
    for (int p = 1; ; p++) {
        int s = S(p);
        if (s > best) {               // p beats every smaller number: antiprime
            best = s;
            if (p >= b) {
                cout << p << endl;
                return 0;
            }
        }
    }
}`, why: 'Walk p = 1, 2, 3, ... keeping the largest divisor count so far. p is antiprime exactly when S(p) beats that record. Print the first record-breaker that is ≥ b. Counting divisors only up to √n (each d gives the pair d and n / d) keeps it fast enough for b = 100000 (answer 110880).',
      test: { full: true, stdin: '45678', out: '50400' } },
  ]},
  ]
},
];

/* What each final tested, by module — used for the "where the marks are" chart.
   marks = 2019-20, marks22 = 2021-22 (both out of 100). */
window.WEIGHTS = [
  { m: 'm1', marks: 14, marks22: 14, where: '2019-20 A1-A5, B5 · 2021-22 A1-A5, B5' },
  { m: 'm2', marks: 0, marks22: 4, where: '2021-22 B4 · Sample Q1 · 2023 quiz Q1' },
  { m: 'm3', marks: 11, marks22: 11, where: '2019-20 A6, A7, B1, B6 · 2021-22 A6, A9, B1, B8' },
  { m: 'm4', marks: 2, marks22: 2, where: '2019-20 A14 · 2021-22 A7 · Sample Q2' },
  { m: 'm5', marks: 27, marks22: 31, where: '2019-20 A8, A9, B2, C1 · 2021-22 B2, B3, B6, C1' },
  { m: 'm6', marks: 6, marks22: 6, where: '2019-20 A15, B3 · 2021-22 A10, B7' },
  { m: 'm7', marks: 0, marks22: 0, where: 'Sample Q3, Q4 (long questions)' },
  { m: 'm8', marks: 34, marks22: 26, where: '2019-20 A11-A13, B4, B7, C2 · 2021-22 A11, A12, A14, C2' },
  { m: 'm9', marks: 0, marks22: 2, where: '2021-22 A15 · Sample Q6' },
  { m: 'm10', marks: 6, marks22: 4, where: '2019-20 A10, B8 · 2021-22 A8, A13' },
];
})();
