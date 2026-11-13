/* Lesson drill — Module 10: C programming and the GDB debugger. Row format as in m1.js. */
(function () {
const R = String.raw;
(window.DRILL = window.DRILL || {}).m10 = [
// ---------- C background, printf, scanf ----------
['Which two reasons do the notes give for learning C?', ['It has classes and the STL', 'It is lower level (programs are usually faster), and systems such as Linux and many OS / networking libraries use it', 'It replaces C++', 'It needs no compiler'], 1, 'C has less built-in functionality: no classes, no STL.'],
['Who designed the C language, and where?', ['Bjarne Stroustrup at AT&T', 'Dennis Ritchie at Bell Laboratories', 'Linus Torvalds at Helsinki', 'Guido van Rossum at CWI'], 1, 'In the early 1970s. It was standardised by ANSI in 1989 (ANSI C / C89), then updated in C95 and C99.'],
['Which statement about C and C++ is the one given in the notes?', ['A valid C++ program is also a valid C program', 'A valid C program is also a valid C++ program, but not the reverse', 'They share no syntax', 'C is an extension of C++'], 1, 'C++ extends C. That is why a C file can also be compiled with g++.'],
['Which command compiles a C program the way the course recommends?', ['g++ -std=c++11 prog.c', 'gcc -pedantic-errors -std=c11 prog.c -o prog', 'cc -c11 prog', 'make prog.c -std=c11'], 1, 'C source files use the extension .c and the course uses the C11 standard.'],
['Which header gives <code>printf()</code> and <code>scanf()</code>?', ['<iostream>', '<stdio.h>', '<stdlib.h>', '<string.h>'], 1, 'stdio stands for standard I/O. &lt;iostream&gt; is not present in C.'],
['Which of these is <em>not</em> available in C?', ['// and /* */ comments', 'printf', 'namespace std, cout, cin and endl', 'for loops'], 2, 'There is no namespace in C, and no iostream objects.'],
['How is a newline printed in C?', ['printf("Hello" << endl);', 'printf("Hello\\n");', 'printf("Hello", endl);', 'println("Hello");'], 1, 'There is no endl, so the escape character \\n is used.'],
['Which conversion specifier prints an <code>int</code>?', ['%i only', '%d', '%f', '%s'], 1, '%d int, %f float and double, %c char, %s string.'],
['Which conversion specifier removes trailing zeros when printing a float or double?', ['%f', '%g', '%d', '%z'], 1, '-10.5 printed with %f is -10.500000 and with %g is -10.5.'],
['What is printed?', ['1 2 -10.5', '1 2 -10.500000', '1 2 -10', '12-10.500000'], 1, '%f prints 6 digits after the decimal point.', R`int a = 1, b = 2;
double c = -10.5;
printf("%d %d %f", a, b, c);`, 'run'],
['What is printed?', ['Their sum = -7.500000', 'Their sum = -7.5', 'Their sum = -7', 'Their sum = -8'], 1, 'int + int + double is a double, and %g drops the trailing zeros.', R`int a = 1, b = 2;
double c = -10.5;
printf("Their sum = %g", a + b + c);`, 'run'],
['A <code>double</code> is printed with <code>%d</code>. What happens?', ['Compile error always', 'It is rounded correctly', 'A wrong value is displayed: the specifier must match the data type', 'It prints with 6 decimals'], 2, 'The notes\' example printed 0 instead of -10.5. The specifier does not change the variable, only how it is displayed.'],
['Can an expression such as <code>a + b + c</code> be given as a printf argument?', ['No, only variables', 'Yes, as long as the specifier matches the type of the result', 'Only with %g', 'Only integers'], 1, 'Several specifiers can appear in one string, and they are filled in order.'],
['How is a string represented in C?', ['With the string class', 'As an array of char ending in the null character', 'As a struct', 'As an int array'], 1, 'C has no string class.'],
['What is printed?', ['Alan is 20', 'A is 20', 'name is age', 'Alan is 20.000000'], 0, '%s prints the char array up to the null character. %d prints the int.', R`char name[] = "Alan";
int age = 20;
printf("%s is %d", name, age);`, 'run'],
['What is printed?', ['    Alan|', 'Alan    |', 'Alan|', '   Alan |'], 0, 'A number inside the specifier sets the width. If it is larger than the value, the value is right-justified.', R`printf("%8s|", "Alan");`, 'run'],
['Which specifiers print a name, an int age and a double weight in three right-justified columns of width 8?', ['"%8s %8d %8f"', '"%s8 %d8 %f8"', '"%8 %8 %8"', '"%-8s %-8d %-8f"'], 0, 'The width goes between the % and the letter.'],
['Which call correctly reads an int and a float?', ['scanf("%d%f", a, b);', 'scanf("%d%f", &a, &b);', 'scanf(&a, &b);', 'scanf("%d %f", *a, *b);'], 1, 'scanf needs the conversion specifiers and the <em>addresses</em> of the variables, in matching order.'],
['Why does scanf need <code>&amp;a</code> instead of <code>a</code>?', ['To print the address', 'Passing the address is C-style pass by reference, so scanf can update the variable', 'It is optional', 'Because a is a float'], 1, 'C has no reference parameters, so the address is passed explicitly.'],
['<code>char name[100];</code> Which call reads a word into it?', ['scanf("%s", &name);', 'scanf("%s", name);', 'scanf("%c", name);', 'scanf(name);'], 1, 'An array name is already the address of its first slot, so no &amp; is used. scanf appends the null character.'],
['When does <code>scanf("%s", name)</code> stop reading?', ['At the end of the line', 'At a space or newline', 'After 100 characters', 'Never'], 1, 'Like cin. To read a line that includes spaces the notes point to getline() or fgets().'],
// ---------- C basics ----------
['Which statement about control flow in C is correct?', ['C has no while loop', 'if-else, for and while have the same syntax as in C++', 'C uses indentation', 'C has no for loop'], 1, 'The basic types int, double and char are also the same.'],
['In old C (C89), where could variables be declared?', ['Anywhere', 'Only just after an opening brace', 'Only in main', 'Only globally'], 1, 'Declaring <code>int i</code> inside a for loop header needs C99 or later (<code>-std=c99</code>).'],
['Which swap function works in C++ but does <em>not</em> compile in C?', ['void swap1(double a, double b)', 'void swap2(double & a, double & b)', 'void swap3(double *a, double *b)', 'All compile in C'], 1, 'Reference parameters are a C++ feature. swap1 compiles but does not swap, because it works on copies.'],
['How is the pointer version <code>void swap3(double *a, double *b)</code> called?', ['swap3(a, b);', 'swap3(&a, &b);', 'swap3(*a, *b);', 'swap3(a&, b&);'], 1, 'The addresses are passed in, and the function dereferences them with *.'],
['Which header and which link flag do the notes use for <code>sin()</code> and <code>cos()</code> in C?', ['<math.h> and -lm', '<cmath> and -math', '<stdlib.h> and -l', '<trig.h> and -lt'], 0, '<code>gcc sincos.c -o sincos -lm</code>. The flag is needed even though math.h is included.'],
['<code>sin()</code> expects radians. How is a degree value <code>d</code> converted?', ['d * 180 / PI', 'd * PI / 180', 'd / PI', 'd * PI'], 1, 'The notes define PI with <code>#define PI 3.14159265</code>.'],
['In <code>void GetSinCos(int d, double *dSin, double *dCos)</code>, how is the sine stored?', ['dSin = sin(d*PI/180);', '*dSin = sin(d*PI/180);', '&dSin = sin(d*PI/180);', 'dSin-> = sin(d*PI/180);'], 1, 'dSin is a pointer, so it is dereferenced to reach the caller\'s double. The call is <code>GetSinCos(degree, &amp;dSin, &amp;dCos)</code>.'],
['An int array <code>salary</code> is passed to <code>salary_increase()</code>. Which call is correct?', ['salary_increase(&salary);', 'salary_increase(salary);', 'salary_increase(salary[]);', 'salary_increase(*salary);'], 1, 'The array name is passed without the address-of operator. Changes in the function affect the caller\'s array.'],
['Which parameter declaration is equivalent to <code>int sal[]</code>?', ['int sal', 'int *sal', 'int &sal', 'int sal()'], 1, 'What is passed is the address of the first slot. That is why arrays behave like pass by reference.'],
['What is printed?', ['2 3 4', '1 2 3', '2 2 3', '1 3 4'], 0, 'Each step changes the element pointed to, then sal++ moves to the next slot.', R`void inc(int *sal) {
    for (int i = 0; i < 3; i++) {
        (*sal) = (*sal) + 1;
        sal++;
    }
}
int main() {
    int a[3] = {1, 2, 3};
    inc(a);
    printf("%d %d %d", a[0], a[1], a[2]);
}`, 'run'],
// ---------- C-strings ----------
['Which header gives <code>strcpy</code>, <code>strcat</code>, <code>strcmp</code> and <code>strlen</code> in C?', ['<string>', '<string.h>', '<stdio.h>', '<ctype.h>'], 1, 'In C++ the same functions are in &lt;cstring&gt;.'],
['What does <code>strcpy(s1, s2)</code> do?', ['Copies s1 into s2', 'Copies char array s2 into s1; s2 is not changed', 'Compares them', 'Appends s1 to s2'], 1, 'The destination is the first parameter.'],
['What does <code>strcat(s1, s2)</code> do?', ['Appends s1 after s2', 'Appends s2 after the end of s1; the first character of s2 overwrites the null character of s1', 'Copies s2 over s1', 'Returns a new string'], 1, 's2 is not changed.'],
['What does <code>strcmp(s1, s2)</code> return?', ['1 if equal, 0 otherwise', 'Negative if s1 < s2, 0 if equal, positive if s1 > s2', 'The length difference', 'true or false'], 1, 'So equality is tested with <code>strcmp(a, b) == 0</code>.'],
['What is printed?', ['same 8', 'different 8', 'same 3', 'different 5'], 0, 'strcmp returns 0 for identical strings. After copying and appending, a is "KitDavid" (8 characters).', R`char a[100] = "Kit", b[100] = "Kit";
printf("%s ", strcmp(a, b) == 0 ? "same" : "different");
strcpy(b, "David");
strcat(a, b);
printf("%d", (int)strlen(a));`, 'run'],
['<code>char a[] = "Kit"; char b[] = "Kit";</code> then <code>strcpy(b, "David");</code>. What is the problem?', ['None', 'b has only 4 slots, so "David" (6 chars with the null) does not fit: array access out of bound', 'strcpy cannot take literals', 'b is constant'], 1, 'The programmer must ensure the first parameter has enough space. The fix is to declare the arrays large enough, for example 100 slots.'],
['You build a string character by character in a char array. What must you add at the end?', ["A newline '\\n'", "The null character '\\0'", 'A space', 'Nothing'], 1, 'Otherwise everything up to the next null byte in memory is treated as part of the string.'],
['Which loop header scans every character of a C-string <code>a</code>, as in the notes\' toLower()?', ['for (int i = 0; i < strlen(a); i++)', 'for (int i = 0; i < a.length(); i++)', 'for (int i = 1; i <= sizeof(a); i++)', 'for (char c : a)'], 0, 'strlen gives the number of characters before the null character.'],
['What is printed?', ['abcDEF', 'abcdef', 'ABCDEF', 'ABCdef'], 1, 'Each capital letter has \'a\' - \'A\' added to it.', R`char a[] = "ABCdef";
for (int i = 0; i < (int)strlen(a); i++)
    if (a[i] >= 'A' && a[i] <= 'Z') a[i] = a[i] + 'a' - 'A';
printf("%s", a);`, 'run'],
// ---------- malloc, struct, typedef ----------
['What replaces the C++ <code>new</code> operator in C?', ['alloc()', 'malloc()', 'create()', 'new() function'], 1, 'C does not provide new. Memory is released with free().'],
['What does the parameter of <code>malloc()</code> specify?', ['The number of elements', 'The number of bytes of memory required', 'The data type', 'The address wanted'], 1, 'So for n ints you ask for <code>n * sizeof(int)</code> bytes.'],
['What does <code>malloc()</code> return?', ['An int', 'A void * pointer to the allocated space, or NULL if allocation fails', 'A char array', 'Nothing'], 1, 'The void pointer is cast to the needed type, for example <code>(int*)</code>.'],
['Which header gives <code>malloc()</code>, <code>free()</code> and <code>NULL</code>?', ['<stdio.h>', '<stdlib.h>', '<memory.h>', '<string.h>'], 1, 'The notes call it the stdlib library.'],
['Which statement allocates an array of <code>size</code> ints?', ['int *a = malloc(size);', 'int *a = (int*) malloc(size * sizeof(int));', 'int a = new int[size];', 'int *a = (int) malloc(sizeof(size));'], 1, 'The notes call this the standard format. It is the same for double, char and structs.'],
['What happens if <code>free()</code> is given a pointer that did not come from malloc?', ['Nothing', 'A run-time error', 'A compile error', 'The memory is allocated'], 1, 'The value passed to free must be the value returned by malloc.'],
['Which statement about C structs is <em>false</em>?', ['All members are public', 'They cannot have member functions', 'They have no constructor or destructor', 'They support private members'], 3, 'There is no access control in C structs. A struct is simply a group of data.'],
['Given <code>struct student { ... };</code> in C, how is a variable declared?', ['student a;', 'struct student a;', 'new student a;', 'student struct a;'], 1, 'C requires the keyword struct to be repeated, unless a typedef is defined.'],
['What does <code>typedef struct student Student;</code> do?', ['Creates a new struct', 'Defines Student as an alias for struct student', 'Creates a variable named Student', 'Deletes struct student'], 1, 'typedef is shorthand for programmers. <code>Student a;</code> then equals <code>struct student a;</code>. The alias may even have the same name as the struct.'],
['C structs cannot have member functions. How do the notes set the fields of an Employee?', ['With a constructor', 'With a general function that takes a pointer: void setEmployee(char n[], char p[], int sal, Employee *e)', 'With cin', 'It cannot be done'], 1, 'Inside, <code>strcpy(e-&gt;Name, n);</code> and <code>e-&gt;Salary = sal;</code>'],
['<code>Employee *e</code> points to an array from malloc. Which two expressions both give the address of slot i?', ['e[i] and *e+i', '&e[i] and e + i', 'e.i and e->i', '*e[i] and &e'], 1, 'Either can be passed to a function expecting an <code>Employee *</code>.'],
['<code>void showInfo(Employee e)</code> receives a struct by value. How is the name printed?', ['printf("%s", e->Name);', 'printf("%s", e.Name);', 'printf("%c", e.Name);', 'printf(e.Name);'], 1, 'e is not a pointer here, so the dot operator is used. Name is a char array, so the specifier is %s.'],
['Which call reads two words and an int into <code>char n[100], p[100]; int sal;</code>?', ['scanf("%s%s%d", &n, &p, &sal);', 'scanf("%s%s%d", n, p, &sal);', 'scanf("%s%s%d", n, p, sal);', 'scanf("%c%c%d", n, p, &sal);'], 1, 'Arrays need no &amp;. The plain int does.'],
['Struct constructors are a feature of which language?', ['C only', 'C++ only (not C)', 'Both', 'Neither'], 1, 'A constructor has the same name as the struct and no return type.'],
['With a suitable constructor, what does <code>Student* s = new Student("Tim", "3035123456", 20);</code> do?', ['Creates a local struct', 'Creates a new Student on the heap, runs the constructor on it, and gives a pointer to it', 'Copies an existing Student', 'Fails to compile in C++'], 1, 'Having several constructors with different parameter lists is called overloading.'],
// ---------- GDB ----------
['What are the two steps of "debugging", as defined in the notes?', ['Compile and run', 'Find the problems (bugs) in a program, then remove them', 'Write and test', 'Print and delete'], 1, 'The two methods covered are adding print statements and using a debugger.'],
['Which is a shortcoming of debugging with print statements?', ['They cannot show variables', 'Too many make the output hard to read, and you may forget to remove them', 'They need a special compiler', 'They only work in C'], 1, 'They also do not let you follow the program efficiently.'],
['What is a breakpoint?', ['A syntax error', 'A place where execution pauses so you can then step line by line', 'The end of the program', 'A crash'], 1, 'A program can have more than one breakpoint.'],
['Which g++ option must be used before debugging with GDB?', ['-c', '-g', '-o', '-debug'], 1, 'For example <code>g++ -pedantic-errors -std=c++11 -g hello.cpp -o hello</code>, then <code>gdb hello</code>.'],
['Which GDB command starts the program?', ['s', 'r', 'go', 'b'], 1, 'r or run. q quits GDB.'],
['Which GDB command prints the current value of variable <code>i</code>?', ['show i', 'p i', 'v i', 'cout i'], 1, 'p or print.'],
['Which GDB command executes the next line of code?', ['n', 'l', 'c', 'r'], 0, 'n or next. <code>l</code> (lowercase L) displays the code, and <code>clear</code> clears a breakpoint.'],
['Which GDB command sets a breakpoint at line 8?', ['p 8', 'b 8', 'n 8', 'r 8'], 1, 'b or break.'],
['In the notes\' example GDB reports SIGSEGV at <code>current-&gt;next = _newNode;</code> and <code>p current</code> shows <code>(Node *) 0x0</code>. What is the bug?', ['_newNode is not allocated', 'current is a NULL pointer, so current->next is an invalid operation', 'The loop runs too long', 'Node has no next member'], 1, '0x0 is the null address. Dereferencing it causes the segmentation fault.'],
['At a breakpoint on <code>Node *current = NULL;</code> the command <code>p current</code> shows a garbage address. Why?', ['GDB is broken', 'The program has paused before that line executed, so current is not initialised yet', 'NULL is not zero', 'The variable is out of scope'], 1, 'Execution stops <em>at</em> the breakpoint line, before running it. After <code>n</code> the value is 0x0. A variable declared later (i) gives "No symbol in current context".'],
];
})();
