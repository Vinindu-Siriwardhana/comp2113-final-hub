/* Lesson drill — Module 7: Structs, file I/O, output formatting and recursion. Row format as in m1.js. */
(function () {
const R = String.raw;
(window.DRILL = window.DRILL || {}).m7 = [
// ---------- structs ----------
['What is a structure?', ['An array of values of the same type', 'A collection of one or more variables, possibly of different types, grouped under a single name', 'A function that returns several values', 'A file format'], 1, 'The variables inside are its member variables (members).'],
['Which is required at the end of a struct definition?', ['Nothing', 'A semicolon after the closing brace', 'The keyword end', 'A return statement'], 1, '<code>struct Point { double x; double y; };</code>'],
['Can two different structs both have a member called <code>x</code>?', ['No, member names must be unique in the program', 'Yes, members of different structures can have the same name', 'Only if they have the same type', 'Only in C'], 1, 'For example Point and Circle both have x and y.'],
['Given <code>struct Point { double x; double y; };</code> what does <code>Point p3 = { 1.0 };</code> give?', ['Compile error', 'x = 1.0, y = 0.0', 'x = 1.0, y = garbage', 'x = 0.0, y = 1.0'], 1, 'With fewer values than members, the remaining members are set to zero. More values than members is a compile error.'],
['In what order must initialiser values for a struct be given?', ['Any order', 'The order in which the members appear in the definition', 'Alphabetical by member name', 'Largest type first'], 1, '<code>Student s1 = { 3035123456, "Sze Ka Ka", \'F\' };</code> matches id, name, sex.'],
['Which operator accesses a member of a struct variable?', ['->', '.', '::', '[]'], 1, 'The dot operator: <code>pt1.x</code>. (<code>-&gt;</code> is used with a pointer to a struct.)'],
['<code>Student s1 = { 3035123456, "Sze Ka Ka", \'F\' };</code> What is <code>s1.name.length()</code>?', ['3', '9', '10', '7'], 1, 's1.name is a string, so string member functions work on it. "Sze Ka Ka" has 9 characters including the two spaces.'],
['Given the type <code>Student</code> and a variable <code>s1</code>, why is <code>Student.GPA</code> invalid?', ['GPA is private', 'Student is a data type, not a variable', 'GPA must be accessed with ->', 'It is valid'], 1, 'Members belong to variables of the type: <code>s1.GPA</code>.'],
['Which operator works on whole struct variables by default?', ['+', '==', '=', '<'], 2, 'Only assignment. Arithmetic, relational, equality and logical operators do not work on structs by default.'],
['What is printed?', ['1 2', '2 1', '2 2', '1 1'], 1, 'p2 becomes {2, 1}, then the whole struct is copied into p1.', R`struct Point { double x; double y; };
int main() {
    Point p1 = {1.0, 2.0}, p2;
    p2.x = p1.y;
    p2.y = p1.x;
    p1 = p2;
    cout << p1.x << ' ' << p1.y;
}`, 'run'],
['What is printed?', ['2 1 2 1', '2 1 1 2', '1 2 2 1', '2 2 1 1'], 0, 'pt2 is a separate copy made before any change. Each is then modified independently.', R`struct Point { double x; double y; };
int main() {
    Point pt1 = { 1.0, 2.0 };
    Point pt2 = pt1;
    pt1.x *= 2.0;  pt1.y /= 2.0;
    pt2.x++;       pt2.y--;
    cout << pt1.x << " " << pt1.y << " " << pt2.x << " " << pt2.y;
}`, 'run'],
['<code>struct Triangle { Point p1, p2, p3; };</code> and <code>Triangle tr1</code>. How is the x of the second point accessed?', ['tr1.p2.x', 'tr1->p2->x', 'tr1.x.p2', 'tr1[1].x'], 0, 'Nested structures chain the dot operator.'],
['What are "parallel arrays", and what do the notes recommend instead?', ['Two arrays of the same size; use a 2D array', 'Separate arrays (name[], year[], mark[]) where index i is one record; use an array of structs', 'Arrays in two files; use one file', 'Arrays of pointers; use vectors'], 1, 'With <code>Student_rec student[MAX];</code> one record is <code>student[i].name</code>, <code>student[i].mark</code> ...'],
['Given <code>Student_rec student[200];</code> what is the type of <code>student[2]</code>?', ['An array', 'Student_rec', 'int', 'A pointer'], 1, '<code>student</code> is the array. <code>student.mark</code> is invalid because an array has no members.'],
['How is one student record copied to another in an array of structs?', ['With a loop over the members', 'student[10] = student[5];', 'copy(student[5], student[10]);', 'It is not possible'], 1, 'Struct assignment copies every member.'],
['How can a struct be passed to a function?', ['By value only', 'By reference only', 'By value or by reference, and it can also be returned', 'Structs cannot be passed'], 2, 'For example <code>double CircleArea(Circle c)</code>, <code>void EnlargeCircle(Circle &amp;c, double r)</code>, and <code>Point input_point()</code> returning a Point.'],
['Why is the parameter a reference in <code>void EnlargeCircle(Circle &amp;c, double radius_to_add)</code>?', ['To save typing', 'Because the function must modify the caller\'s circle', 'References are required for structs', 'To return a value'], 1, 'With pass-by-value only a copy would be enlarged.'],
['Which statement about structs in C and C++ is correct?', ['In C a struct can only contain member variables; in C++ it can also have member functions', 'They are identical', 'C structs can have functions; C++ structs cannot', 'C has no structs'], 0, 'A struct with member variables only is valid in both languages.'],
['A member function <code>double Area()</code> is declared inside <code>struct Circle</code> and defined outside. How is the definition headed?', ['double Area(Circle)', 'double Circle::Area()', 'Circle double Area()', 'double Circle.Area()'], 1, 'The scope resolution operator <code>::</code> says the function belongs to Circle.'],
['Why does the member function <code>Area()</code> of Circle take no parameter?', ['It reads a global variable', 'It can use the member variable r of the circle it is called on', 'It always returns 0', 'Parameters are not allowed in member functions'], 1, 'Called as <code>q.Area()</code>, it uses q\'s own r.'],
['What is the default access of members in a <code>struct</code> and in a <code>class</code>?', ['Public for both', 'struct: public, class: private', 'struct: private, class: public', 'Private for both'], 1, 'Classes are optional in this module, but this difference is stated in the notes.'],
['In a class, what can access the members in the <code>private</code> section?', ['Any code', 'Only member functions of the same class', 'Only main()', 'Only other classes'], 1, 'Public member functions act as the interface. Hiding the implementation is called encapsulation or information hiding.'],
// ---------- file I/O ----------
['Which header provides <code>ifstream</code> and <code>ofstream</code>?', ['<iostream>', '<fstream>', '<sstream>', '<file>'], 1, 'ofstream writes to files, ifstream reads from them.'],
['Which single statement is equivalent to <code>ofstream fout; fout.open("data1.txt");</code>?', ['ofstream fout("data1.txt");', 'ofstream fout = open("data1.txt");', 'fout << "data1.txt";', 'ofstream("data1.txt") fout;'], 0, 'The file name can be given when the stream is declared.'],
['How do you check whether a file failed to open?', ['if (fout == 0)', 'if (fout.fail())', 'if (fout.error)', 'if (!open)'], 1, 'Usually followed by an error message and <code>exit(1);</code>.'],
['What does <code>exit(1);</code> do, and which header does it need?', ['Leaves the current loop; <iostream>', 'Forces the program to terminate immediately; <cstdlib>', 'Closes the file; <fstream>', 'Returns from the function; none'], 1, 'It is typically used when a file cannot be opened or the input is bad.'],
['What are the five steps for writing to a file, in order?', ['Open, declare, write, check, close', 'Declare the stream, open, check for failure, write with <<, close', 'Write, open, close', 'Declare, write, open, close, check'], 1, 'ofstream fout; fout.open(...); if (fout.fail()) ...; fout &lt;&lt; ...; fout.close();'],
['The file name is in a <code>string filename</code>. How do the notes pass it to <code>open()</code>?', ['fout.open(filename.c_str());', 'fout.open(&filename);', 'fout.open(filename[]);', 'fout.open("filename");'], 0, 'open() expects a C-string, and <code>c_str()</code> converts the string object.'],
['An existing file is opened with <code>fout.open("data2.txt");</code>. What happens to its old content?', ['It is kept and new data is appended', 'It is erased', 'The open fails', 'It is copied to a backup'], 1, 'If the file does not exist it is created. If it exists its content is erased.'],
['How do you keep the existing content and add to the end?', ['fout.open("data2.txt", ios::app);', 'fout.open("data2.txt", "a");', 'fout.append("data2.txt");', 'fout.open("data2.txt", ios::keep);'], 0, '<code>ios::app</code> is the second argument to open().'],
['<code>data3.txt</code> contains <code>Peter</code> on line 1 and <code>30 130.5</code> on line 2. What does <code>fin &gt;&gt; name &gt;&gt; age &gt;&gt; weight;</code> read?', ['Only Peter', 'Peter, 30 and 130.5: >> skips whitespace including newlines', 'An error at the newline', 'Peter and 30 only'], 1, 'Extraction works the same as with cin.'],
['Which loop reads values until the end of the file?', ['while (fin >> x) { ... }', 'while (fin.open()) { ... }', 'for (;;) fin >> x;', 'while (x != eof) { ... }'], 0, 'The expression <code>fin &gt;&gt; x</code> is true when a value was read and false when the end of file was reached.'],
['<code>data4.txt</code> contains <code>20.0 40.0 60.0</code>. What is printed?', ['Total = 60', 'Total = 120', 'Total = 3', 'Total = 0'], 1, 'The loop reads and sums every number until the end of file.', R`double x, sum = 0;
while (fin >> x) {
    sum += x;
}
cout << "Total = " << sum;`],
['Which call reads one whole line from the file stream <code>fin</code> into string <code>str</code>?', ['fin >> str;', 'getline(fin, str);', 'fin.getline(str);', 'readline(fin, str);'], 1, 'Its return value can also be used as a loop condition: <code>while (getline(fin, line))</code>.'],
['Which class extracts data from a string as if it were a stream, and which header does it need?', ['stringreader, <string>', 'istringstream, <sstream>', 'ifstream, <fstream>', 'strstream, <cstring>'], 1, '<code>istringstream iss(str);</code> then <code>iss &gt;&gt; age;</code>'],
['What is printed?', ['"apple" "orange" "banana"', '" apple orange banana "', '"apple"', '"" "apple" "orange" "banana"'], 0, 'Extraction skips all the surrounding spaces and yields one word at a time until the string ends.', R`string line = "  apple  orange  banana  ", word;
istringstream line_in(line);
while (line_in >> word)
    cout << "\"" << word << "\" ";`, 'run'],
// ---------- formatting ----------
['By default, how many significant digits does <code>cout</code> show for a double?', ['2', '6', '10', '15'], 1, '1.2345678 is printed as 1.23457. Very large or small numbers switch to scientific notation.'],
['What is printed?', ['12', '12.0', '12.0000', '12.000000'], 0, 'By default no decimal point is shown when the fractional part is zero.', R`double e = 12.0;
cout << e;`, 'run'],
['What is printed?', ['12', '12.0', '12.0000', '12.000000'], 2, 'showpoint displays the decimal point with padding zeros, to 6 significant digits.', R`double e = 12.0;
cout << showpoint << e;`, 'run'],
['What is printed?', ['0.135', '0.135000', '0.14', '1.35e-01'], 1, 'fixed writes fixed decimal notation with 6 decimal places by default.', R`double f = 0.135;
cout << fixed << f;`, 'run'],
['<em>Without</em> fixed or scientific, what does <code>setprecision(2)</code> mean?', ['2 decimal places', 'At most 2 significant digits in total', 'Width of 2', '2 digits before the point'], 1, '1.2345678 is printed as 1.2.'],
['<em>With</em> <code>fixed</code>, what does <code>setprecision(2)</code> mean?', ['2 significant digits', 'Exactly 2 digits after the decimal point', 'Width of 2', 'Round to an integer'], 1, 'The same holds with scientific.'],
['What is printed?', ['1.2', '1.23', '1.235', '1.23457'], 1, 'fixed with setprecision(2) gives exactly two decimal places.', R`double a = 1.2345678;
cout << fixed << setprecision(2) << a;`, 'run'],
['What is printed?', ['1234567.8', '1234567.80', '1.2e+06', '1234568'], 1, 'Two decimal places, padded with a zero.', R`double b = 1234567.8;
cout << fixed << setprecision(2) << b;`, 'run'],
['Which header is needed for <code>setw</code>, <code>setprecision</code> and <code>setfill</code>?', ['<iostream>', '<iomanip>', '<format>', '<cstdio>'], 1, 'Manipulators that take a parameter are in &lt;iomanip&gt;. Those without (fixed, left, right, showpoint, endl) are in &lt;iostream&gt;.'],
['What is printed?', ['12   Hello', '   12   Hello', '12Hello', '   12Hello   '], 1, 'setw gives the number of columns for the next item, right-justified by default.', R`int x = 12;
string a = "Hello";
cout << setw(5) << x << setw(8) << a;`],
['What is printed?', ['***12***Hello', '12***Hello***', '*12*Hello', '12Hello'], 0, 'setfill replaces the padding spaces with the given character.', R`int x = 12;
string a = "Hello";
cout << setfill('*') << setw(5) << x << setw(8) << a;`, 'run'],
['What is printed?', ['12---Hello---', '---12---Hello', '12Hello------', '-12--Hello-'], 0, 'With left, each item is left-justified in its column and the fill goes on the right.', R`int x = 12;
string a = "Hello";
cout << setfill('-') << left << setw(5) << x << setw(8) << a;`, 'run'],
['How many output items does one <code>setw(n)</code> affect?', ['All following items', 'Only the next item', 'The whole line', 'None until endl'], 1, 'fixed, setprecision, setfill, left and right stay in effect. setw must be repeated.'],
// ---------- recursion ----------
['Which properties must a recursive definition have?', ['Only a general case', 'One or more base cases, and a general case that eventually reduces to a base case', 'A loop and a counter', 'At least two parameters'], 1, 'The base case terminates the recursion.'],
['In the recursive definition of factorial, what is the base case?', ['1! = 1', '0! = 1', 'n! = n(n-1)!', '2! = 2'], 1, 'The general case is n! = n × (n-1)! for n &gt; 0.'],
['What is printed?', ['3', '5', '8', '2'], 0, 'fib(4) = fib(3) + fib(2) = 2 + 1.', R`int fib(int num) {
    if (num < 2) return num;
    return fib(num - 1) + fib(num - 2);
}
int main() { cout << fib(4); }`, 'run'],
['What is printed?', ['6', '12', '18', '3'], 0, 'gcd(48, 18) → gcd(18, 12) → gcd(12, 6) → gcd(6, 0) → 6.', R`int gcd(int x, int y) {
    if (y == 0) return x;
    return gcd(y, x % y);
}
int main() { cout << gcd(48, 18); }`, 'run'],
['In the notes\' recursive palindrome check, what is the base case?', ['The string is empty only', 'The string has length less than 2: it is a palindrome', 'The first and last characters differ', 'The string has length 3'], 1, 'Otherwise it is a palindrome if s[0] equals s[n-1] and s[1..n-2] is a palindrome.'],
['How many moves does the Tower of Hanoi need for 3 disks?', ['3', '6', '7', '8'], 2, 'The number of moves for n disks is 2<sup>n</sup> - 1.'],
['What is the recursive idea for moving n disks from A to C?', ['Move one disk at a time from A to C', 'Move n-1 disks A to B, move 1 disk A to C, move n-1 disks B to C', 'Move n-1 disks A to C, then the last disk', 'Swap rods A and C'], 1, 'Each step uses the third rod as the intermediate.'],
['What causes a stack overflow error?', ['Too many global variables', 'An excessively long chain of recursive calls, for example infinite recursion', 'A loop that runs too long', 'Opening too many files'], 1, 'Every function call takes extra memory on the call stack, and that memory is limited.'],
['Compared with an equivalent iterative version, a recursive function usually:', ['Runs faster and uses less memory', 'Runs slower and uses more storage, but can be easier to write and understand', 'Cannot solve the same problems', 'Needs no base case'], 1, 'Any task done with recursion can also be done without it, typically with a loop.'],
['What is printed?', ['15', '10', '5', '120'], 0, '5 + 4 + 3 + 2 + 1.', R`int sum(int n) {
    if (n == 1) return 1;
    return sum(n - 1) + n;
}
int main() { cout << sum(5); }`, 'run'],
];
})();
