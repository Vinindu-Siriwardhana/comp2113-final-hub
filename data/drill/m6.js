/* Lesson drill — Module 6: Arrays and strings. Row format as in m1.js. */
(function () {
const R = String.raw;
(window.DRILL = window.DRILL || {}).m6 = [
// ---------- arrays ----------
['How do C++ arrays differ from Python lists?', ['Arrays can grow automatically', 'All elements of an array must be of the same data type', 'Arrays start at index 1', 'Arrays cannot be passed to functions'], 1, 'An array is a consecutive group of memory locations that share one type.'],
['An array is declared <code>int c[6];</code>. What are its valid indexes?', ['1 to 6', '0 to 5', '0 to 6', '1 to 5'], 1, 'Indexes start at zero and end at size - 1.'],
['What does the compiler do when you write <code>score[5] = 0;</code> for <code>int score[5];</code>?', ['Reports an error', 'Nothing: no error is reported, and memory belonging to something else may be overwritten', 'Grows the array', 'Ignores the statement'], 1, 'This is the array index out of bound error. C++ does not check array bounds.'],
['Can the size of an array be changed while the program runs?', ['Yes, with resize()', 'No, arrays are static entities with a fixed size', 'Yes, by assigning more values', 'Only for char arrays'], 1, 'The size is fixed at declaration.'],
['What is the size of the array in <code>int score[] = { 80, 100, 52 };</code>?', ['0', '3', '4', 'It does not compile'], 1, 'With an initialiser list the size may be omitted. The array gets the minimum size needed.'],
['What does <code>int score[5] = {80, 100, 63, 84, 52, 96};</code> do?', ['Ignores the sixth value', 'Compile error: too many initialisers', 'Makes the array size 6', 'Run-time error'], 1, 'Too many values is an error. Too few is allowed.'],
['What is printed?', ['80 100 0 0 0', '80 100 80 100 80', '80 100 followed by garbage', '0 0 0 0 0'], 0, 'With fewer values than elements, the remaining elements are initialised to zero.', R`int score[5] = {80, 100};
for (int i = 0; i < 5; i++) cout << score[i] << " ";`, 'run'],
['What does <code>int frequency[7] = {};</code> do?', ['Leaves garbage in all elements', 'Initialises all 7 elements to 0', 'Compile error', 'Creates an empty array'], 1, 'The notes use this in the dice-rolling example.'],
['After <code>int score[5];</code> which statement is valid?', ['score = { 80, 100, 63, 84, 52 };', 'score[] = { 80, 100, 63, 84, 52 };', 'score[0] = 80;', 'score[5] = { 80, 100, 63, 84, 52 };'], 2, 'A whole array cannot be assigned with = after its declaration. Elements are assigned one at a time.'],
['Which header provides <code>setw()</code>?', ['<iostream>', '<iomanip>', '<cstdlib>', '<string>'], 1, 'setw sets the width for the next item printed.'],
['Why declare <code>const int arraySize = 10;</code> and use it for the array size and loops?', ['It is faster', 'Only one value needs changing to make the program work for another size', 'Arrays require const sizes at run time', 'It uses less memory'], 1, 'The notes call this making the program scalable.'],
['Which expression simulates rolling a die (a random number from 1 to 6)?', ['rand() % 6', 'rand() % 6 + 1', 'rand(6)', 'rand() / 6'], 1, '<code>rand() % 6</code> gives 0 to 5. The generator is seeded with <code>srand(time(0))</code>, using &lt;cstdlib&gt; and &lt;ctime&gt;.'],
['To count how often each die face 1 to 6 appears using <code>frequency[face]</code>, what array size do the notes use?', ['5', '6', '7', '10'], 2, 'Size 7, ignoring element 0, so the face value can be used directly as the index.'],
['What is printed?', ['0 1 2 3', '0 1 4 9', '0 2 4 6', '1 4 9 16'], 0, 'The element is passed by value and the returned square is thrown away, so the array is unchanged.', R`int square(int x) { return x * x; }
int main() {
    int a[4] = {0, 1, 2, 3};
    for (int i = 0; i < 4; ++i) square(a[i]);
    for (int i = 0; i < 4; ++i) cout << a[i] << " ";
}`, 'run'],
['How is an array parameter written in a function header?', ['void f(int b, int n)', 'void f(int b[], int n)', 'void f(int [b], int n)', 'void f(array b, int n)'], 1, 'A pair of square brackets after the identifier. In a prototype the name can be omitted: <code>void f(int [], int);</code>'],
['Given <code>int a[10];</code> which is the correct call of <code>void modifyArray(int b[], int n)</code>?', ['modifyArray(a[], 10);', 'modifyArray(a[10], 10);', 'modifyArray(a, 10);', 'modifyArray(&a[], 10);'], 2, 'In the call only the array name is given, with no brackets.'],
['What is printed?', ['0 1 2', '0 2 4', '0 1 4', '2 4 6'], 1, 'An array parameter behaves like pass-by-reference: the function changes the caller\'s array.', R`void modifyArray(int b[], int n) {
    for (int k = 0; k < n; ++k) b[k] *= 2;
}
int main() {
    int a[3] = {0, 1, 2};
    modifyArray(a, 3);
    for (int j = 0; j < 3; ++j) cout << a[j] << " ";
}`, 'run'],
['Why is a size parameter passed together with an array?', ['It is required syntax', 'The array argument carries no information about its size', 'To make the array const', 'To speed up access'], 1, 'C++ does no bound checking, so an array of any size can be passed.'],
['What does <code>const</code> mean in <code>int linearSearch(const int array[], int n, int key)</code>?', ['The array size is constant', 'The function must not change the contents of the array', 'The function returns a constant', 'key cannot change'], 1, 'It protects the caller\'s data from accidental modification.'],
['What does linear search return when the key is not in the array (as in the notes)?', ['0', '-1', 'The array size', 'false'], 1, 'If found it returns the index of the first occurrence.'],
['In a linear search of N elements, how many are examined in the worst case?', ['1', 'N / 2', 'The entire array (N)', 'log N'], 2, 'On average about half of the array.'],
['In selection sort (ascending), what happens at iteration i?', ['a[i] is swapped with its neighbour', 'a[i] is exchanged with the smallest item among a[i] .. a[N-1]', 'The largest item moves to a[0]', 'The array is split in half'], 1, 'After iteration i, the elements a[0] .. a[i] are sorted.'],
['The array is <code>-2 7 0 23 2048 -46</code>. What is it after iteration 0 of selection sort (ascending)?', ['-46 7 0 23 2048 -2', '-46 -2 0 7 23 2048', '-2 0 7 23 2048 -46', '-2 7 0 23 -46 2048'], 0, 'The smallest element (-46) is swapped with a[0].'],
['<code>int a[3][4];</code> declares an array with:', ['4 rows and 3 columns', '3 rows and 4 columns', '12 rows', '7 elements'], 1, 'Access is <code>a[row][column]</code>.'],
['What is printed?', ['4 5 0', '5 0 0', '4 5 6', '3 4 5'], 0, 'Values fill the first row first, then the second. The missing value becomes 0.', R`int b[2][3] = { 1, 2, 3, 4, 5 };
cout << b[1][0] << " " << b[1][1] << " " << b[1][2];`, 'run'],
['Which is a valid header for a function taking a 2D int array with 5 columns?', ['void p(int a[][], int rows)', 'void p(int a[][5], int rows)', 'void p(int a[5][], int rows)', 'void p(int a, int rows)'], 1, 'The size of the first dimension is omitted, but the remaining dimension must be given.'],
// ---------- char ----------
['How many bytes does a <code>char</code> take, and which range does ASCII use?', ['1 byte, 0 to 127', '2 bytes, 0 to 255', '1 byte, 1 to 100', '4 bytes, 0 to 127'], 0, 'ASCII = American Standard Code for Information Interchange.'],
['What is printed?', ['65', 'A', 'a', 'Error'], 1, 'Assigning an integer to a char is treated as assigning an ASCII code. 65 is A.', R`char c = 65;
cout << c;`, 'run'],
['What is printed?', ['A', '65', '66', 'a'], 1, 'An int variable stores the ASCII code of the char.', R`char letter = 'A';
int val = letter;
cout << val;`, 'run'],
['What is printed?', ['2', '50', '49', '11'], 1, 'The ASCII value of \'1\' is 49, so 49 + 1 = 50.', R`char c = '1';
int num = c + 1;
cout << num;`, 'run'],
['What is printed?', ['25', 'z', '26', 'y'], 0, 'Arithmetic on chars works on their ASCII values, and the result is an int.', R`cout << 'z' - 'a';`, 'run'],
['Which expression converts the lowercase letter in <code>from</code> to uppercase?', ["from + ('a' - 'A')", "from - ('a' - 'A')", "from - 'a'", "from + 'A'"], 1, '<code>\'a\' - \'A\'</code> is the distance between a lowercase letter and its capital.'],
['Which condition tests that <code>letter</code> is a lowercase letter?', ["letter >= 'a' && letter <= 'z'", "letter >= 'a' || letter <= 'z'", "letter == 'a-z'", "letter > 'A'"], 0, 'ASCII codes of the letters are in order, so relational operators work on chars.'],
['Which header contains <code>isdigit</code>, <code>isalpha</code>, <code>islower</code>, <code>toupper</code>?', ['<cstring>', '<cctype>', '<string>', '<cmath>'], 1, 'Character handling functions.'],
['What does <code>isalnum(c)</code> test?', ['c is a digit', 'c is a letter', 'c is a digit or a letter', 'c is lowercase'], 2, 'isdigit: digit. isalpha: letter. islower / isupper: case. They return non-zero for true and 0 for false.'],
['What does <code>tolower(\'7\')</code> return?', ['An error', "The argument unchanged ('7')", "'0'", "A space"], 1, 'If the argument is not an uppercase letter it is returned unchanged.'],
// ---------- C-strings ----------
['What ends a C-string in memory?', ["A newline '\\n'", "The null character '\\0'", 'A space', 'Nothing'], 1, 'That is why it is called a null-terminated string.'],
['What is the minimum array size needed to hold a string of N characters?', ['N', 'N + 1', 'N - 1', '2N'], 1, 'One extra element for the null character. "Hello World!" needs 13.'],
["What is the difference between <code>'A'</code> and <code>\"A\"</code>?", ['None', "'A' is one byte; \"A\" is two bytes: 'A' and '\\0'", "\"A\" is one byte; 'A' is two", 'They differ only in output'], 1, 'Single quotes make a char. Double quotes make a string with a terminator.'],
["What is the difference between <code>'0'</code> and <code>'\\0'</code>?", ['None', "'0' has byte value 48 (the digit); '\\0' has byte value 0 (the null character)", "'0' is 0 and '\\0' is 48", "'\\0' is a newline"], 1, 'Mixing them up breaks string loops.'],
['What are the array sizes of <code>char name[16] = "John";</code> and <code>char name[] = "John";</code>?', ['16 and 4', '16 and 5', '5 and 5', '4 and 4'], 1, 'With no size given, the compiler uses 4 letters plus the null character.'],
['After <code>char name[16];</code> which statement is valid?', ['name = "John";', 'name[] = "John";', "name[0] = 'J';", 'name = { \'J\', \'o\' };'], 2, 'Like any array, a char array cannot be assigned as a whole after its declaration.'],
['What is printed?', ['Steve', 'Stove', 'Stoeve', 'So'], 1, 'Individual characters are accessed with the subscript operator.', R`char name[] = "Steve";
name[2] = 'o';
cout << name;`, 'run'],
['<code>char name[] = "Steve";</code> then <code>name[5] = \'n\';</code> then <code>cout &lt;&lt; name;</code>. What happens?', ['Prints Steven', 'Prints Steve', 'Prints Steven followed by garbage: the null character was overwritten', 'Compile error'], 2, 'name[5] held the terminator. Without it, output continues into whatever bytes follow the array.'],
['Which header provides <code>strcpy</code>, <code>strcmp</code> and <code>strlen</code>?', ['<string>', '<cstring>', '<cctype>', '<iostream>'], 1, '&lt;string&gt; is the C++ string class. &lt;cstring&gt; is the C-string function library.'],
// ---------- C++ strings ----------
['Which is <em>not</em> a valid way to initialise a C++ <code>string</code>?', ['string s = "World";', 'string s = a;  (a is a C-string)', 'string s = other;  (other is a string)', 'string s = 5;'], 3, 'A string can be initialised from a string literal, a C-string, or another string object.'],
['Unlike a C-string, a <code>string</code> object can be:', ['Indexed with []', 'Changed with an assignment statement after declaration', 'Printed with cout', 'Read with cin'], 1, '<code>msg = "World";</code> is fine for a string object.'],
['What is printed?', ['Hello World!', 'Hello World?', 'Hello Worl?!', 'Error'], 1, 'Index 11 is the exclamation mark.', R`string msg = "Hello World!";
msg[11] = '?';
cout << msg;`, 'run'],
['Why does <code>string msg = "I love " + "dinosaurs";</code> not compile?', ['Strings cannot be joined', 'At least one operand of + must be a string object; both are string literals here', 'A semicolon is missing', 'The literals are too long'], 1, '<code>msg1 + "dogs"</code> and <code>"I hate " + msg2</code> are fine.'],
['With <code>msg1 = "Apple"</code> and <code>msg2 = "apple"</code>, what is <code>msg1 &lt; msg2</code>?', ['true', 'false', 'Compile error', 'Depends on length'], 0, 'Comparison is character by character using ASCII. Capital A (65) comes before lowercase a (97).'],
['With <code>msg2 = "apple"</code> and <code>msg3 = "apples"</code>, what is <code>msg2 &lt; msg3</code>?', ['true', 'false', 'Compile error', 'They are equal'], 0, 'When one string is a prefix of the other, the shorter one comes first.'],
['The user types <code>I love dogs</code>. What does <code>cin &gt;&gt; msg;</code> store in the string?', ['I love dogs', 'I', 'dogs', 'An empty string'], 1, '<code>&gt;&gt;</code> skips leading whitespace and stops at the next whitespace.'],
['Which statement reads a whole line, including spaces, into string <code>s</code>?', ['cin >> s;', 'getline(cin, s);', 'cin.read(s);', 's = cin.line();'], 1, 'The default delimiter is the newline character.'],
['The input is <code>Stay hungry, stay foolish</code>. What does <code>getline(cin, s, \',\');</code> store?', ['Stay', 'Stay hungry', 'Stay hungry,', 'The whole line'], 1, 'The third argument is the delimiter. Reading stops there and the delimiter is not stored.'],
['What is printed?', ['24', '25', '26', '4'], 1, 'Every character counts, including spaces and the comma.', R`string s = "Stay hungry, stay foolish";
cout << s.length();`, 'run'],
['What is <code>s.empty()</code> for <code>string s = " ";</code>?', ['true', 'false', 'Error', '1'], 1, 'A string holding one space has length 1, so it is not empty.'],
['What is printed?', ['C++ program.', 'C++ programmi', 'C++ programg.', 'programming.'], 0, 'erase(pos, n) removes n characters starting at pos. Here it removes "ming".', R`string s = "C++ programming.";
s.erase(11, 4);
cout << s;`, 'run'],
['What is printed?', ['cloudy', 'is clo', 'cloud', 'loudy '], 0, 'substr(pos, n): start at index 6, take 6 characters.', R`string s = "It is cloudy and warm.";
cout << s.substr(6, 6);`, 'run'],
['What does <code>text.substr(18)</code> return (second argument omitted)?', ['The first 18 characters', 'The substring from index 18 to the end', 'One character', 'An empty string'], 1, 'Without the length it extracts up to the end of the string.'],
['What is printed?', ['3 12', '12 3', '3 3', '4 13'], 0, 'find gives the first occurrence (the s in "Outside" at index 3). rfind gives the last one (the s in "is" at index 12).', R`string s = "Outside it is cloudy and warm.";
cout << s.find('s') << " " << s.rfind('s');`, 'run'],
['What does <code>s.find(\'i\', 6)</code> do?', ['Finds the 6th i', 'Searches for i only at or after position 6', 'Searches the first 6 characters', 'Finds i exactly at position 6'], 1, 'For rfind, the position limits the search to at or before that position.'],
['What does <code>find</code> return when the text does not occur?', ['0', 'string::npos', 'An empty string', 'The length'], 1, 'The notes also compare with -1, which is the same value.'],
['Is <code>s.find("Cloudy")</code> the same as <code>s.find("cloudy")</code>?', ['Yes', 'No, the search is case-sensitive', 'Only at index 0', 'Only for rfind'], 1, 'Upper and lower case are different characters.'],
['What is printed?', ['Stay very hungry', 'Stayvery  hungry', 'very Stay hungry', 'Stay hungry very'], 0, 'insert(pos, str) inserts str so that it starts at index pos.', R`string text = "Stay hungry";
text.insert(5, "very ");
cout << text;`, 'run'],
['What is printed?', ['Stay funny', 'Stay funnry', 'funn hungry', 'Stay funnhungry'], 0, 'replace(pos, n, str) replaces n characters starting at pos with str.', R`string text = "Stay hungry";
text.replace(5, 5, "funn");
cout << text;`, 'run'],
['Do <code>erase</code>, <code>insert</code> and <code>replace</code> change the string they are called on?', ['No, they return a new string only', 'Yes, the string is modified', 'Only erase does', 'Only if assigned back'], 1, '<code>substr</code>, <code>find</code> and <code>length</code> do not modify the string.'],
];
})();
