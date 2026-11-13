/* Lesson drill — Module 3: C++ Basics. Row format as in m1.js. */
(function () {
const R = String.raw;
(window.DRILL = window.DRILL || {}).m3 = [
['Which command compiles <code>hello.cpp</code> the way the course requires?', ['g++ hello.cpp', 'g++ -pedantic-errors -std=c++11 hello.cpp -o hello', 'gcc -run hello.cpp', 'make hello.cpp -std=c++11'], 1, '<code>-std=c++11</code> forces the C++11 standard and <code>-pedantic-errors</code> makes sure the code conforms to the ISO standard. <code>-o hello</code> names the executable.'],
['Your program has several compile errors. What do the notes advise?', ['Fix the last error first', 'Fix the first error, recompile, and repeat', 'Fix them all at once from the list', 'Ignore warnings and errors after line 10'], 1, 'Messages after the first one are more likely to be wrong. The reported line number can also be wrong: the real mistake may be earlier.'],
['What does a line beginning with <code>//</code> do?', ['It is a pre-processor directive', 'It is a comment: the rest of the line is ignored by the compiler', 'It divides two numbers', 'It ends the program'], 1, 'Everything after // up to the end of the line is ignored.'],
['What is <code>#include &lt;iostream&gt;</code> for?', ['It defines the main function', 'It tells the compiler where to find declarations of routines such as cout and cin', 'It links the math library', 'It starts the program'], 1, 'iostream is the library that handles keyboard input and screen output.'],
['If <code>using namespace std;</code> is removed, how must <code>cout</code> and <code>endl</code> be written?', ['cout and endl still work', 'std::cout and std::endl', 'std.cout and std.endl', 'iostream::cout'], 1, 'cout and endl live in the namespace std. Without the using line the compiler says they were not declared in this scope.'],
['Where does execution of every C++ program start?', ['At the first line of the file', 'At the first #include', 'At the first statement of the main function', 'At the first function defined'], 2, 'Statements in main are then executed one by one in order.'],
['What does <code>return 0;</code> at the end of <code>main</code> indicate?', ['The program printed nothing', 'To the operating system, that the program ended successfully', 'That main has no parameters', 'A compile error if omitted'], 1, 'C++ compilers add it for you if you leave it out.'],
['Which is a valid C++ identifier?', ['2008', 'year1-student', '_oOOo_', 'an integer'], 2, 'An identifier starts with a letter or underscore, then letters, digits or underscores. No hyphens, spaces, dots or % signs, and it cannot start with a digit.'],
['Which of these <em>cannot</em> be used as a variable name?', ['cout', 'string', 'cos', 'const'], 3, '<code>const</code>, <code>friend</code> and <code>delete</code> are reserved keywords. <code>cout</code>, <code>cin</code>, <code>string</code> and <code>cos</code> are library names, not keywords, so redefining them is allowed (but confusing).'],
['Are <code>radius</code>, <code>Radius</code> and <code>RADIUS</code> the same variable?', ['Yes', 'No, C++ is case-sensitive', 'Only the first two', 'Only inside main'], 1, 'They are three different identifiers.'],
['On the typical system in the notes, how many bytes does each type use: <code>char</code>, <code>bool</code>, <code>int</code>, <code>double</code>?', ['1, 1, 4, 8', '1, 1, 2, 4', '2, 1, 4, 8', '1, 4, 4, 8'], 0, 'char 1 byte, bool 1 byte, int 4 bytes, double 8 bytes (about 15 significant digits). Sizes depend on the system.'],
['What does a local variable contain if it is declared but never given a value?', ['0', 'A garbage value', 'An empty string', 'It does not compile'], 1, 'It is uninitialised. Using it in a computation gives unpredictable results.'],
['What value does <code>1.5e3</code> represent?', ['1.5', '4.5', '1500', '0.0015'], 2, 'Scientific notation: 1.5 × 10<sup>3</sup>.'],
['How is a character constant written, and how is a string constant written?', ['Both in double quotes', "Character in single quotes ('A'), string in double quotes (\"A\")", 'Both in single quotes', 'Character in double quotes, string in single quotes'], 1, 'A char holds one character. A string is a sequence of characters.'],
['Which header should be included to use the <code>string</code> type?', ['<iostream> only', '<string>', '<cstring>', '<text>'], 1, 'Sometimes it compiles without it because another header pulled it in, but that depends on the implementation, so always include it.'],
['What happens here?', ['PI becomes 3.14159', 'Compile error: PI is a constant', 'Run-time error', 'PI becomes 0'], 1, 'The <code>const</code> modifier makes the compiler reject any attempt to change the variable.', R`const double PI = 3.14159265359;
PI = 3.14159;`],
['Which of these is the character constant for a newline?', ["'/n'", "'\\n'", '"nl"', "'\\l'"], 1, 'Other escapes: <code>\\t</code> tab, <code>\\\\</code> backslash, <code>\\\'</code> single quote, <code>\\"</code> double quote.'],
['What is the value of <code>13 % 3</code>?', ['4', '1', '3', '0.33'], 1, '13 = 3 × 4 + 1, so the remainder is 1.'],
['What is printed?', ['1 2', '1.5 2.66667', '2 3', '1 3'], 0, 'Both operands are integers, so <code>/</code> is integer division and the fraction is truncated.', R`int a = 3, b = 2;
int c = a / b, d = 8 / 3;
cout << c << " " << d;`, 'run'],
['To which type can the <code>%</code> operator <em>not</em> be applied?', ['int', 'char', 'double', 'long'], 2, 'Modulus works on integer types only.'],
['What happens when an <code>int</code> is divided by zero?', ['Compile error', 'The result is 0', 'A division-by-zero error at run time (no compile error)', 'The result is infinity'], 2, 'The compiler does not catch it.'],
['What is the value of <code>12 - 11 % 3</code>?', ['1', '10', '0', '2'], 1, '% has higher precedence than -, so it is 12 - (11 % 3) = 12 - 2.'],
['Which group of operators is evaluated <em>right to left</em>?', ['* / %', '+ -', 'Assignment operators (=, +=, -= ...)', '&& and ||'], 2, 'Binary arithmetic, relational and logical operators associate left to right.'],
['What is printed?', ['1: y  2: z', '1: Y  2: Z', '1: 121  2: 122', '1: y  2: y'], 0, 'Adding <code>\'a\' - \'A\'</code> converts an upper-case letter to lower case. Adding 1 moves to the next character.', R`char c = 'Y';
c = c + ('a' - 'A');
cout << "1: " << c << "  ";
c = c + 1;
cout << "2: " << c;`, 'run'],
['With <code>int a = 1, b = 2;</code> what does <code>cout &lt;&lt; (a &lt; b);</code> print?', ['true', '1', 'a < b', 'yes'], 1, 'A relational or logical expression has the numeric value 1 when true and 0 when false.'],
['What is printed?', ['0', '1', '-1', '-2'], 2, 'The brackets force (i &lt; lim) first, which is 1. Then 1 - 2 = -1. Without the brackets, lim - 2 would be evaluated first.', R`int i = 1, lim = 2;
cout << ((i < lim) - 2);`, 'run'],
['What is the order of precedence of the logical operators, highest first?', ['&&, ||, !', '!, &&, ||', '||, &&, !', 'All equal'], 1, 'NOT, then AND, then OR.'],
['What are the values of <code>(3 &amp;&amp; 0)</code> and <code>(-5 || 0)</code>?', ['false and true', 'true and false', 'both true', 'both false'], 0, 'Any non-zero value counts as true, including negative numbers. Zero is false.'],
['What is the value of <code>!3</code>?', ['-3', '0', '1', '3'], 1, 'NOT turns a non-zero operand into 0 and a zero operand into 1.'],
['If <code>gals</code> is 0, what happens in <code>(gals != 0) &amp;&amp; ((gifts / gals) &gt;= 2)</code>?', ['Division by zero at run time', 'The expression is false and the division is never evaluated', 'Compile error', 'The expression is true'], 1, 'Short-circuit evaluation: the left side is false, so the result is known and the right side is skipped.'],
['After <code>int c = 0, i = 0; c = i++;</code> what are c and i?', ['c = 0, i = 1', 'c = 1, i = 1', 'c = 1, i = 0', 'c = 0, i = 0'], 0, 'Postfix: the value is used first, then i is incremented. With <code>c = ++i;</code> both would be 1.'],
['<code>x *= y + 1;</code> is equivalent to:', ['x = x * y + 1;', 'x = x * (y + 1);', 'x = (x * y) + 1;', 'x = y + 1;'], 1, 'The whole right-hand side is evaluated first.'],
['What is the value of <code>3.0 / 2</code>?', ['1', '1.5', '2', '1.0'], 1, 'The int 2 is promoted to 2.0 (the "lower" type is promoted to the "higher" type), so this is floating-point division.'],
['After <code>int x = 2.8;</code> what does x hold?', ['2', '3', '2.8', 'It does not compile'], 0, 'Converting a double to an int truncates the fractional part. The compiler may warn. <code>(int)2.8</code> does the same without a warning.'],
['What happens with <code>int n = "hello";</code>?', ['n becomes 5', 'n becomes 0', 'Compile error: the conversion makes no sense', 'n becomes the ASCII code of h'], 2, 'Conversions that do not make sense are not allowed.'],
['Which operator inserts data into <code>cout</code>, and which extracts from <code>cin</code>?', ['<< for cout, >> for cin', '>> for cout, << for cin', '<< for both', '= for both'], 0, 'The arrows point in the direction the data flows.'],
['What is printed?', ['1 1', '11', '2', '1a'], 1, 'Nothing is inserted between items automatically: no space and no newline.', R`int a = 1;
cout << 1 << a;`, 'run'],
['When does <code>cin</code> process what the user typed?', ['After each key press', 'Once the RETURN key has been pressed', 'After a space', 'After 80 characters'], 1, 'The type of the variable decides what kind of data is extracted.'],
['How can you feed the contents of <code>info.txt</code> to your program as if it were typed on the keyboard?', ['./prog info.txt', './prog < info.txt', './prog > info.txt', 'cat ./prog info.txt'], 1, 'File redirection of standard input saves retyping the input during testing.'],
['Which statement about <code>if (x &gt; 5) cout &lt;&lt; "big";</code> is true?', ['The condition must be a bool variable', 'The statement runs only when the condition evaluates to true (non-zero)', 'It needs an else', 'It needs braces'], 1, 'A condition is any expression. <code>if (3 - 2)</code> is true because the value is non-zero.'],
['How do you make an <code>if</code> control more than one statement?', ['Indent them', 'Enclose them in { } to form a compound statement', 'Separate them with commas', 'Put them on one line'], 1, 'Unlike Python, indentation means nothing to the C++ compiler.'],
['With x = 7 and y = 3, what is printed?', ['x and y are > 5', 'x is <= 5', 'Nothing', 'Both messages'], 1, 'Dangling else: an <code>else</code> pairs with the nearest unpaired <code>if</code>, here <code>if (y &gt; 5)</code>, whatever the indentation suggests. Use braces to control the pairing.', R`int x = 7, y = 3;
if (x > 5)
    if (y > 5)
        cout << "x and y are > 5";
else
    cout << "x is <= 5";`, 'run'],
['Why is a multi-way <code>if ... else if ... else</code> preferred over a series of separate <code>if</code> statements with the same outcome?', ['It is the only one that compiles', 'It is faster: remaining tests are skipped once one condition is true', 'It uses less memory', 'It allows strings'], 1, 'A series of ifs tests every condition even though only one can be true.'],
['What type may the controlling expression of a <code>switch</code> be?', ['Any type, including double and string', 'Boolean, integer or character', 'Integer only', 'String only'], 1, 'The case labels are constants of those types.'],
['The input mark is 75. What is printed?', ['C', 'CBA', 'CBA?', 'C?'], 2, 'There are no <code>break</code> statements, so execution starts at case 7 and falls through every following case, including default.', R`int mark = 75;
switch (mark / 10) {
    case 6: cout << "D";
    case 7: cout << "C";
    case 8: cout << "B";
    case 9: case 10: cout << "A";
    default: cout << "?";
}`, 'run'],
['When is the <code>default</code> part of a switch executed (assuming every case ends with break)?', ['Always', 'When none of the case constants matches', 'Never', 'Only for negative values'], 1, 'It is optional.'],
['<code>if (a = 10)</code>, <code>if (a != 0 &amp; b &gt; 0)</code> and <code>if (a &lt; b &lt; c)</code> are common mistakes. What does the compiler say about them?', ['Syntax error for all three', 'Nothing: they are all legal expressions', 'Warning that stops compilation', 'Only the first is an error'], 1, 'That is what makes them dangerous. They should be <code>==</code>, <code>&amp;&amp;</code>, and <code>a &lt; b &amp;&amp; b &lt; c</code>.'],
['What is printed?', ['passed', 'failed', '1', 'Nothing'], 1, '<code>condition ? expr1 : expr2</code> is an operator that produces a value: expr1 if the condition is true, otherwise expr2.', R`int mark = 45;
cout << ((mark >= 60) ? "passed" : "failed");`, 'run'],
['What is each repetition of a loop body called?', ['A cycle', 'An iteration', 'A recursion', 'A branch'], 1, 'The statement being repeated is the loop body.'],
['A <code>while</code> loop\'s condition is false the first time it is tested. How many times does the body run?', ['Once', 'Zero times', 'Until it becomes true', 'It is a compile error'], 1, 'The condition is checked before every iteration, including the first.'],
['A loop that reads numbers until the user types a negative number is called:', ['Counter-controlled', 'Sentinel-controlled', 'Flag-controlled', 'Infinite'], 1, 'A sentinel is a special value that marks the end. A counter-controlled loop counts iterations. A flag-controlled loop uses a bool variable.'],
['What is wrong with <code>while (i &lt; n);</code> followed by the intended loop body?', ['Nothing', 'The semicolon is an empty loop body, so i never changes and the loop never ends', 'It is a syntax error', 'The body runs once'], 1, 'Never put a semicolon straight after the parenthesis of a while or for.'],
['In <code>for (i = 1; i &lt;= 20; ++i)</code>, when does <code>++i</code> run?', ['Before the first iteration', 'After each iteration of the loop body', 'Only once', 'Before each test, including the first'], 1, 'Initialisation runs once, the condition is tested before each iteration, and the update runs after each iteration.'],
['What is printed?', ['0 1 2 3 4', '0 1 2', '0 1 2 3', '3 4'], 1, '<code>break</code> leaves the loop immediately when i is 3.', R`for (int i = 0; i < 5; i++) {
    if (i == 3) break;
    cout << i << " ";
}`, 'run'],
['What is printed?', ['0 1 2 3 4', '0 1 2', '0 1 3 4', '2'], 2, '<code>continue</code> skips the rest of the body for that iteration and goes on to the next one.', R`for (int i = 0; i < 5; i++) {
    if (i == 2) continue;
    cout << i << " ";
}`, 'run'],
['What is printed?', ['6', '10', '15', '5'], 1, 'The loop adds 1 + 2 + 3 + 4. It stops when i reaches 5.', R`int sum = 0;
for (int i = 1; i < 5; i++)
    sum += i;
cout << sum;`, 'run'],
['How many stars are printed?', ['6', '9', '3', '12'], 0, 'The inner loop runs 1, 2, then 3 times.', R`for (int i = 1; i <= 3; i++)
    for (int j = 1; j <= i; j++)
        cout << "*";`],
];
})();
