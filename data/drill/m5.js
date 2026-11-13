/* Lesson drill — Module 5: Functions and recursion. Row format as in m1.js. */
(function () {
const R = String.raw;
(window.DRILL = window.DRILL || {}).m5 = [
['Compared with a Python <code>def</code>, what must a C++ function header state?', ['Nothing extra', 'The return type and the type of every parameter', 'Only the parameter names', 'The keyword function'], 1, 'C++ is explicitly typed: <code>int add(int x, int y)</code>.'],
['What marks the body of a C++ function?', ['Indentation', 'Braces { }', 'begin / end', 'A colon'], 1, 'Indentation is for humans only.'],
['Which return type is used for a function that returns no value?', ['None', 'null', 'void', 'empty'], 2, 'A Python function without return gives None. In C++ you declare the function <code>void</code>.'],
['What is a function <em>prototype</em> (declaration)?', ['The function body', 'A line giving the name, parameter types and return type, ending with a semicolon', 'A call to the function', 'A comment describing the function'], 1, 'For example <code>double larger(double x, double y);</code>. It tells the compiler the function exists and will be defined later.'],
['<code>main</code> calls <code>larger()</code>, which is defined <em>below</em> main with no prototype above. What happens?', ['It works', 'Compile error: larger was not declared before use', 'Run-time error', 'It returns 0'], 1, 'Either put a prototype above main, or define the function before main.'],
['Where does a C++ program start executing?', ['At the top of the file', 'At main()', 'At the first function defined', 'At the first prototype'], 1, 'Python runs top-level code. C++ always starts at main.'],
['Which header provides <code>sqrt()</code> and <code>pow()</code>?', ['<math>', '<cmath>', '<iostream>', '<cstdlib>'], 1, '<code>#include</code> copies the content of the header into the current file.'],
['What is printed?', ['10', '100', '0', '20'], 0, 'Pass-by-value is the default: x is a copy, so changing it does not change a.', R`void square(int x) {
    x = x * x;
}
int main() {
    int a = 10;
    square(a);
    cout << a;
}`, 'run'],
['What is printed?', ['10', '100', '0', '20'], 1, '<code>int &amp;x</code> makes x refer to the original variable, so a is changed.', R`void square(int &x) {
    x = x * x;
}
int main() {
    int a = 10;
    square(a);
    cout << a;
}`, 'run'],
['Which symbol in a parameter list indicates pass-by-reference?', ['*', '&', '@', 'ref'], 1, '<code>void f(int x);</code> is by value, <code>void f(int &amp;x);</code> is by reference.'],
['How many values can a C++ function return directly with <code>return</code>?', ['As many as needed', 'One', 'Two', 'None'], 1, 'To give back more, use reference parameters.'],
['What is printed?', ['3 1', '3.33 1', '1 3', '0 0'], 0, 'q and r are reference parameters, so the function writes straight into the caller\'s variables.', R`void divide(int a, int b, int &q, int &r) {
    q = a / b;
    r = a % b;
}
int main() {
    int q, r;
    divide(10, 3, q, r);
    cout << q << " " << r;
}`, 'run'],
['What happens when this is compiled?', ['Prints 10', 'Compile error: x is not declared in that scope', 'Prints 0', 'Run-time error'], 1, 'In C++ any pair of braces creates a scope. x disappears at the closing brace of the if block.', R`if (true) {
    int x = 10;
}
cout << x;`],
['What does this function return for <code>larger(2.5, 5.0)</code>?', ['2.5', '5', 'true', '7.5'], 1, 'The conditional operator returns x if x &gt;= y, otherwise y.', R`double larger(double x, double y) {
    return (x >= y) ? x : y;
}
int main() { cout << larger(2.5, 5.0); }`, 'run'],
['Which call is correct for <code>void print_msg(int x);</code>?', ['int r = print_msg(5);', 'print_msg(5);', 'cout << print_msg(5);', 'print_msg = 5;'], 1, 'A void function returns nothing, so it cannot be used as a value.'],
['A variable declared inside a function is:', ['Global', 'Local to that function', 'Visible in main', 'Shared between calls of all functions'], 1, 'Parameters are local too.'],
['What is printed?', ['5 5', '5 6', '6 6', '6 5'], 1, 'Each call gets a fresh copy for the value parameter, but the reference parameter keeps accumulating.', R`void f(int a, int &b) {
    a++;
    b++;
}
int main() {
    int x = 5, y = 5;
    f(x, y);
    cout << x << " " << y;
}`, 'run'],
['Can a literal be passed to a non-const reference parameter, as in <code>square(5)</code> for <code>void square(int &amp;x)</code>?', ['Yes', 'No, a reference parameter needs a variable', 'Only if 5 is cast', 'Only in C++11'], 1, 'There is no variable for the reference to refer to.'],
['What is printed?', ['2 1', '1 2', '1 1', '2 2'], 0, 'A swap works only when both parameters are references.', R`void swap2(int &a, int &b) {
    int t = a;
    a = b;
    b = t;
}
int main() {
    int x = 1, y = 2;
    swap2(x, y);
    cout << x << " " << y;
}`, 'run'],
['What is printed?', ['2 1', '1 2', '1 1', '2 2'], 1, 'The parameters are copies, so the swap happens only inside the function.', R`void swap2(int a, int b) {
    int t = a;
    a = b;
    b = t;
}
int main() {
    int x = 1, y = 2;
    swap2(x, y);
    cout << x << " " << y;
}`, 'run'],
['What is printed?', ['1 2 1', '1 2 2', '2 2 1', '1 1 1'], 0, 'The inner block declares a new x that hides the outer one until the closing brace.', R`int x = 1;
cout << x << " ";
{
    int x = 2;
    cout << x << " ";
}
cout << x;`, 'run'],
['What is printed?', ['7', '12', '5', 'Compile error'], 0, 'The argument expression is evaluated first (3 + 4 = 7) and its value is copied into n.', R`int twice(int n) { return n; }
int main() {
    int a = 3;
    cout << twice(a + 4);
}`, 'run'],
['What is a recursive function?', ['A function with a loop', 'A function that calls itself', 'A function with no parameters', 'A function defined inside another'], 1, 'It solves a problem by reducing it to a smaller version of the same problem.'],
['What must every recursive function have to stop?', ['A loop', 'A base case that returns without another recursive call', 'A global variable', 'A void return type'], 1, 'Without it the recursion never ends and the program crashes.'],
['What is printed?', ['24', '10', '120', '4'], 0, '4 × 3 × 2 × 1.', R`int fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}
int main() { cout << fact(4); }`, 'run'],
['What is printed?', ['3 2 1', '1 2 3', '3 2 1 0', '0 1 2 3'], 1, 'The print comes after the recursive call, so it happens on the way back up.', R`void show(int n) {
    if (n == 0) return;
    show(n - 1);
    cout << n << " ";
}
int main() { show(3); }`, 'run'],
['What is printed?', ['3 2 1', '1 2 3', '3 2 1 0', '0 1 2 3'], 0, 'The print comes before the recursive call, so it happens on the way down.', R`void show(int n) {
    if (n == 0) return;
    cout << n << " ";
    show(n - 1);
}
int main() { show(3); }`, 'run'],
['What is printed?', ['8', '6', '9', '16'], 0, '2 × 2 × 2. Each call multiplies by b and reduces e by 1 until e is 0.', R`int power(int b, int e) {
    if (e == 0) return 1;
    return b * power(b, e - 1);
}
int main() { cout << power(2, 3); }`, 'run'],
['What is printed?', ['5', '8', '13', '21'], 0, 'fib(5) = fib(4) + fib(3) = 3 + 2.', R`int fib(int n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}
int main() { cout << fib(5); }`, 'run'],
['What is printed?', ['6', '4', '3', '12'], 0, 'gcd(18, 12) → gcd(12, 6) → gcd(6, 0) → 6.', R`int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}
int main() { cout << gcd(18, 12); }`, 'run'],
['In a recursive binary search with interval [l, r], which is the correct base case for "not found"?', ['l == r', 'l > r', 'l == 0', 'r == 0'], 1, 'When l passes r the interval is empty. l == r still has one element to check.'],
['What is wrong with this recursive function?', ['Nothing', 'The result of the recursive call is not returned', 'The base case is wrong', 'n should be a reference'], 1, 'It must be <code>return n + sum(n - 1);</code>. Without return the value is lost.', R`int sum(int n) {
    if (n == 0) return 0;
    n + sum(n - 1);
}`],
['Binary search looks at the middle element and the key is smaller. Which half is kept?', ['The upper half: l = mid + 1', 'The lower half: r = mid - 1', 'Both halves', 'Neither: the search ends'], 1, 'The array is sorted in increasing order, so the key can only be on the left.'],
];
})();
