/* Lesson drill — Module 8: Pointers, dynamic memory and linked lists. Row format as in m1.js. */
(function () {
const R = String.raw;
const NODE = R`struct Node { int info; Node * next; };
void head_insert(Node * & head, int num) {
    Node * p = new Node;
    p->info = num;
    p->next = head;
    head = p;
}
`;
(window.DRILL = window.DRILL || {}).m8 = [
// ---------- pointers ----------
['What is the "address" of a memory cell?', ['The value stored in it', 'The unique number that locates the cell in main memory', 'The name of the variable', 'Its size in bytes'], 1, 'Main memory is a collection of consecutively numbered cells. An int typically occupies 4 of them.'],
['What does <code>&amp;i</code> give when used in an expression?', ['The value of i', 'The memory address of i', 'A reference parameter', 'A copy of i'], 1, 'In an expression &amp; is the address-of operator.'],
['The <code>&amp;</code> symbol has two meanings in C++. Which pair is correct?', ['In an expression: address-of. In a declaration: reference', 'In an expression: reference. In a declaration: address-of', 'Both mean address-of', 'Both mean logical AND'], 0, '<code>cout &lt;&lt; &amp;i;</code> prints an address. <code>void swap(int &amp;x, int &amp;y);</code> declares reference parameters.'],
['What does <code>int * iPtr = &amp;i;</code> do?', ['Copies the value of i into iPtr', 'Creates a pointer variable that stores the address of i', 'Creates a second integer', 'Multiplies i by iPtr'], 1, 'In diagrams this is drawn as an arrow from iPtr to i.'],
['What happens here?', ['iPtr points to c', 'Compile error: &c is of type char *, not int *', 'Run-time error', 'c is converted to int'], 1, 'Pointers to different types are different types. A pointer of one type cannot be assigned the address of a variable of another type.', R`int * iPtr;
char c;
iPtr = &c;`],
['Which declares <em>three</em> pointers to int?', ['int * a, b, c;', 'int * a, * b, * c;', 'int *(a, b, c);', 'int a, b, c *;'], 1, 'An asterisk is needed in front of each variable. <code>int * a, b, c;</code> makes only a a pointer.'],
['Can pointer variables and regular variables be declared in the same statement?', ['No', 'Yes, for example int i, * iPtr;', 'Only for int', 'Only in C'], 1, 'i is an int and iPtr is a pointer to int.'],
['What is printed?', ['10 10', '20 10', '20 20', '10 20'], 1, 'y takes the old value of x (10) through the pointer, then x is changed to 20 through the pointer.', R`int x = 10, y;
int * ptr = &x;
y = *ptr;
*ptr = 20;
cout << x << ' ' << y;`, 'run'],
['What is printed?', ['20 10', '20 11', '21 10', '21 11'], 1, 'After ptr = &amp;y, (*ptr)++ increments y. The parentheses are needed because ++ has higher precedence than *.', R`int x = 10, y;
int * ptr = &x;
y = *ptr;
*ptr = 20;
ptr = &y;
(*ptr)++;
cout << x << ' ' << y;`, 'run'],
['The <code>*</code> symbol is used in two ways with pointers. Which are they?', ['To declare a pointer, and to dereference a pointer', 'To multiply, and to take an address', 'To declare a reference, and to delete', 'Only to declare'], 0, '<code>*ptr</code> can be viewed as an alias of the variable that ptr points to.'],
['What is printed?', ['10', '20', '0', '30'], 0, '*&amp;x is x itself (&amp; and * are inverses), so y = 20 - 10.', R`int x = 20, y = 20;
int * ptr3 = &y;
*ptr3 = *&x - 10;
cout << *ptr3;`, 'run'],
['<code>Date * dPtr = &amp;today;</code> Which is <em>not</em> a correct way to set the year?', ['today.year = 2015;', '(*dPtr).year = 2015;', 'dPtr->year = 2015;', '*dPtr.year = 2015;'], 3, 'The dot has higher precedence than *, so <code>*dPtr.year</code> means <code>*(dPtr.year)</code>. Use the parentheses or the <code>-&gt;</code> shorthand.'],
['What is printed?', ['good day', 'good', 'day', 'd'], 2, '<code>-&gt;</code> also calls member functions through a pointer. substr(5, 3) is "day".', R`string s = "good day!";
string * sPtr = &s;
cout << sPtr->substr(5, 3);`, 'run'],
['What is a dangling pointer?', ['A pointer that equals 0', 'A pointer that does not point to a valid object', 'A pointer to a pointer', 'A pointer to a constant'], 1, 'For example an uninitialised pointer, or one whose memory has been deleted. Dereferencing it gives unpredictable results.'],
['What does <code>int * ptr = nullptr;</code> mean?', ['ptr points to address 1', 'ptr points to nothing (a null pointer)', 'ptr is uninitialised', 'ptr points to itself'], 1, 'nullptr equals 0. Before C++11 the constant NULL was used.'],
['What happens when a null pointer is dereferenced?', ['It yields 0', 'The program crashes', 'Compile error', 'Nothing'], 1, 'Check first: <code>if (ptr != nullptr)</code>.'],
['What is the name of an array, in pointer terms?', ['A pointer to the last element', 'A (constant) pointer to the first element', 'A copy of the array', 'An integer holding the size'], 1, 'So <code>int * p = x;</code> is allowed, and p can then be used like the array name: <code>p[i]</code>.'],
['<code>int x[10]; int * p = x;</code> Is <code>x = p;</code> valid?', ['Yes', 'No: an array name is a constant pointer and cannot be assigned', 'Only if p is null', 'Only inside a function'], 1, 'A pointer can be assigned an array name, but not the other way round.'],
['What is printed?', ['6', '10', '4', '3'], 1, 'p points at a[2], so p[3] is a[5], which is 2 × 5.', R`int a[10];
for (int i = 0; i < 10; ++i) a[i] = 2 * i;
int * p = &a[2];
cout << p[3];`, 'run'],
['Which call matches <code>void swap(int * x, int * y)</code> for ints a and b?', ['swap(a, b);', 'swap(&a, &b);', 'swap(*a, *b);', 'swap(a*, b*);'], 1, 'The addresses are passed explicitly. With reference parameters <code>void swap(int &amp;x, int &amp;y)</code> the call is <code>swap(a, b)</code>.'],
['What is printed?', ['2 3', '3 2', '2 2', '3 3'], 1, 'The function swaps the values at the two addresses it was given.', R`void swap2(int * x, int * y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}
int main() {
    int a = 2, b = 3;
    swap2(&a, &b);
    cout << a << " " << b;
}`, 'run'],
['Inside <code>void addOne(int *p)</code>, which statement adds 1 to the integer pointed to?', ['p++;', '(*p)++;', '*p++;', '&p++;'], 1, '<code>p++</code> and <code>*p++</code> move the pointer instead of changing the integer.'],
// ---------- dynamic memory ----------
['Which is true of ordinary (static) variables, as described in the notes?', ['Their number can change at run time', 'Their life span is determined by scope, and each has a name', 'They must be deleted', 'They have no names'], 1, 'A variable is created when declared and destroyed when execution leaves its scope.'],
['How are dynamic variables accessed?', ['By name', 'Through pointers, because they have no names', 'Through arrays only', 'They cannot be accessed'], 1, 'They are created at run time with <code>new</code>.'],
['What does <code>int * i = new int (42);</code> do?', ['Creates an array of 42 ints', 'Creates one dynamic int holding 42, with i pointing to it', 'Sets i to 42', 'Creates 42 pointers'], 1, 'Equivalent to <code>int * i = new int; *i = 42;</code>. An array would use square brackets.'],
['What is printed?', ['42 42', '53 53', '42 53', '53 42'], 1, 'p1 and p2 point to the same dynamic variable, so a change through one is seen through the other.', R`int *p1, *p2;
p1 = new int;
*p1 = 42;
p2 = p1;
*p2 = 53;
cout << *p1 << " " << *p2;`, 'run'],
['What is printed?', ['88 88', '88 53', '53 53', '53 88'], 1, 'p1 is given a new dynamic variable. p2 still points to the first one.', R`int *p1, *p2;
p1 = new int;
*p1 = 42;
p2 = p1;
*p2 = 53;
p1 = new int;
*p1 = 88;
cout << *p1 << " " << *p2;`, 'run'],
['Which keyword frees the memory of a dynamic variable?', ['free', 'delete', 'remove', 'release'], 1, '<code>delete p1;</code> The freed space can be reused by the system.'],
['What is the good practice straight after <code>delete p1;</code>?', ['Delete it again', 'Set the pointer to zero: p1 = 0;', 'Call new immediately', 'Nothing'], 1, 'So the pointer is not left dangling.'],
['What is a memory leak?', ['Reading past the end of an array', 'Dynamic memory that is no longer in use but was never freed, so the system cannot reclaim it', 'Using an uninitialised variable', 'A stack overflow'], 1, 'Freeing dynamic variables is the programmer\'s responsibility.'],
['Which mistake does this code show?', ['Memory leak', 'Dereferencing a dangling pointer', 'Dereferencing before initialisation', 'No mistake'], 1, 'p1 and p2 point to the same memory. After delete p1, p2 dangles.', R`int * p1, * p2;
p1 = new int;
p2 = p1;
delete p1;
cout << *p2;`],
['Which mistake does this code show?', ['Memory leak: the int that q pointed to can no longer be reached or freed', 'Dangling pointer', 'Double delete', 'No mistake'], 0, 'After q = p, nothing points to the second dynamic int.', R`int * p, * q;
p = new int;
q = new int;
q = p;`],
['Which mistake does this code show?', ['Memory leak', 'Deleting the same memory twice', 'Null dereference', 'No mistake'], 1, 'Both pointers refer to one dynamic variable. The second delete acts on memory that is no longer valid.', R`int * p1, * p2;
p1 = new int;
p2 = p1;
delete p1;
delete p2;`],
['When is the size of <code>int a[10];</code> determined, and when is the size of <code>new int[n]</code> determined?', ['Both at compile time', 'Compile time for a[10]; run time for new int[n]', 'Both at run time', 'Run time for a[10]; compile time for new'], 1, 'A dynamic array is the way to get an array whose size is only known while the program runs.'],
['How is a dynamic array freed?', ['delete a;', 'delete [] a;', 'delete a[];', 'free(a);'], 1, 'The square brackets tell delete that a points to an array.'],
['What is printed?', ['0 1', '0 4', '1 2', '0 0'], 0, 'p + 1 points to the next element. The unit of pointer addition is the size of the type pointed to.', R`int a[5] = {0, 1, 2, 3, 4};
int * p = a;
cout << *p << ' ' << *(p + 1);`, 'run'],
['An int is 4 bytes and <code>p</code> holds address 10010000. What address is <code>p + 1</code>?', ['10010001', '10010004', '10010008', '10010002'], 1, 'Adding 1 moves by one element, which is 4 bytes for an int.'],
['What is printed?', ['4', '5', '6', '0'], 1, 'q points one past the last element. The loop advances p from a to a + 5, counting 5 steps.', R`int a[5];
int * p = a, * q = a + 5;
int n = 0;
while (p != q) { ++p; ++n; }
cout << n;`, 'run'],
['In the phonebook tutorial, <code>void grow_phonebook(PhoneRec * &amp;pb, int &amp;pb_size, int n)</code>: why is <code>pb</code> a reference to a pointer?', ['To save memory', 'Because the function makes the caller\'s pointer point to a new, larger array', 'Because arrays cannot be passed', 'It is a typo'], 1, 'The new array occupies a new chunk of memory, so the pointer itself must change. pb_size changes too, so it is also a reference.'],
['What are the steps of growing a dynamic array, in order?', ['Delete the old array, create a new one, copy', 'Create a new larger array, copy the records, delete the old array and repoint, update the size', 'Copy, create, delete', 'Resize in place'], 1, 'Deleting first would lose the data. Forgetting to repoint leaves a leak and a dangling pointer in the caller.'],
['What general practice do the notes give for how much to grow a full dynamic array?', ['Add 1 each time', 'Add a constant 3 each time', 'Double the array size', 'Triple it'], 2, 'Too large wastes space. Too small causes frequent growing, and each grow copies the whole array.'],
// ---------- linked lists ----------
['Why is inserting into a sorted <em>array</em> inefficient?', ['Arrays cannot be sorted', 'Items after the insertion point must be shifted', 'Arrays have no index', 'Arrays are stored on disk'], 1, 'Insertion and deletion in an array involve data movement.'],
['What does each node of a linked list store?', ['Only data', 'A piece of data and the address of the next node', 'The addresses of all nodes', 'Its own index'], 1, 'The last node stores a null address.'],
['What is <code>head</code> in a linked list?', ['The first data value', 'A pointer variable that stores the address of the first node', 'The last node', 'The number of nodes'], 1, 'An empty list is <code>Node * head = NULL;</code>'],
['Which kind of access does a linked list give?', ['Random access', 'Sequential access: start at the head and follow the nodes one by one', 'Indexed access', 'Binary access'], 1, 'An array gives random access (direct access by index).'],
['Which statement about linked lists versus arrays is correct?', ['Linked list items are stored contiguously', 'Linked list insertion and deletion need only pointer updates, with no data movement', 'Arrays cannot be searched', 'Linked lists allow direct access to the k-th item'], 1, 'Array items are contiguous. Linked list nodes need not be.'],
['The list is 23 → 38 → 62 → 89. What is <code>head-&gt;next-&gt;info</code>?', ['23', '38', '62', 'An address'], 1, 'head-&gt;info is 23, and head-&gt;next is the address of the second node.'],
['The list is 23 → 38 → 62 → 89. What is <code>head-&gt;next-&gt;next-&gt;next-&gt;next</code>?', ['89', '0 (NULL)', 'An error', '62'], 1, 'It is the next pointer of the last node. Going one step further (<code>-&gt;info</code> on it) is an error.'],
['Which loop is the standard traversal of a linked list?', ['while (head != NULL) { ...; head = head->next; }', 'Node * current = head; while (current != NULL) { ...; current = current->next; }', 'for (int i = 0; i < head; i++)', 'while (current->next) current++;'], 1, 'A separate pointer is advanced so that head is not lost.'],
['Why should you never traverse a list by moving <code>head</code> itself?', ['It is slower', 'The first node, and with it the whole list, would be lost', 'It does not compile', 'head is a constant'], 1, 'Nothing would point to the beginning of the list any more.'],
['In a traversal loop, what happens if you forget <code>current = current-&gt;next;</code>?', ['The loop ends at once', 'An infinite loop (unless the list was empty)', 'A compile error', 'Only the last node is printed'], 1, 'current never becomes NULL.'],
['What are the three steps of inserting a node at the beginning (in order)?', ['head = p; p->next = head; fill info', 'Create and fill the node; p->next = head; head = p', 'p->next = NULL; head = p; fill info', 'Create the node; head->next = p; p = head'], 1, 'The new node must be linked to the old list before head is moved.'],
['The user enters 23 56 14. Each is passed to <code>head_insert</code>. What does the list look like?', ['23 -> 56 -> 14', '14 -> 56 -> 23', '14 -> 23 -> 56', '56 -> 23 -> 14'], 1, 'Building backward (always inserting at the beginning) reverses the input order.'],
['What is printed?', ['1 2 3', '3 2 1', '3', '1'], 1, 'Each new node goes in front of the previous ones.', NODE + R`int main() {
    Node * head = NULL;
    for (int i = 1; i <= 3; i++) head_insert(head, i);
    for (Node * c = head; c != NULL; c = c->next) cout << c->info << " ";
}`, 'run'],
['Why is the parameter written <code>Node * &amp; head</code> in <code>head_insert</code>?', ['To avoid copying the node', 'Because the head pointer itself is updated and the change must reach the caller', 'Because Node is a struct', 'It is optional style'], 1, 'Without the reference only a copy of the pointer would change.'],
['To build a list <em>forward</em> (inserting at the end), which extra pointer do the notes maintain?', ['prev', 'tail, pointing to the last node', 'mid', 'A second head'], 1, 'So that the end does not have to be searched for each time.'],
['In <code>tail_insert</code>, what is done when the list is empty (<code>head == NULL</code>)?', ['Nothing', 'Both head and tail are set to the new node', 'tail->next = p', 'head->next = p'], 1, 'Otherwise: <code>tail-&gt;next = p; tail = p;</code>. The new node\'s next is always NULL.'],
['To insert node <code>p</code> after the node pointed to by <code>after</code>, which order is correct?', ['after->next = p; p->next = after->next;', 'p->next = after->next; after->next = p;', 'p->next = after; after = p;', 'after = p->next; p = after;'], 1, 'If after-&gt;next is overwritten first, the rest of the list is lost (and p would point to itself).'],
['Which code deletes the first node of a non-empty list?', ['delete head; head = head->next;', 'Node * p = head; head = head->next; delete p;', 'head = NULL;', 'delete head->next;'], 1, 'Save the node, move head on, then delete the saved node. The notes also check <code>head != NULL</code> first.'],
['Which code deletes the node <em>after</em> the node pointed to by <code>after</code>?', ['delete after;', 'Node * p = after->next; after->next = p->next; delete p;', 'after->next = NULL;', 'delete after->next->next;'], 1, 'Bypass the node, then free it.'],
['What does the notes\' <code>find(head, num)</code> return when num is not in the list?', ['-1', 'NULL', 'head', 'The last node'], 1, 'If found it returns a pointer to the node.'],
['When building a sorted list, what does <code>find_prev</code> return if the list is empty or the first item is not smaller than num?', ['The head node', 'NULL, meaning the new node must be inserted at the head', 'The tail', '-1'], 1, 'Otherwise it returns the last node that is smaller than num, and the new node is inserted after it.'],
['How do the notes delete an entire list?', ['delete head;', 'Repeatedly delete the head node until head is NULL', 'Set head = NULL', 'delete [] head;'], 1, '<code>delete head;</code> alone frees only the first node and leaks the rest.'],
['Which variations of linked lists are mentioned in the notes?', ['Doubly-linked and circularly-linked lists', 'Binary and ternary lists', 'Static and dynamic lists', 'Sorted and hashed lists'], 0, 'A doubly-linked list also has a pointer to the previous node.'],
['What is printed?', ['1 2 3', '3 2 1', '1', '3'], 0, 'The recursive call comes before the print, so the node values are printed in reverse of the list order 3 2 1.', NODE + R`void rev(Node * head) {
    if (head == NULL) return;
    rev(head->next);
    cout << head->info << " ";
}
int main() {
    Node * head = NULL;
    for (int i = 1; i <= 3; i++) head_insert(head, i);
    rev(head);
}`, 'run'],
['What is printed?', ['3', '4', '2', '0'], 0, 'One node is bypassed and deleted, leaving 3 of the 4 nodes.', NODE + R`int main() {
    Node * head = NULL;
    for (int i = 1; i <= 4; i++) head_insert(head, i);
    Node * p = head->next;
    head->next = p->next;
    delete p;
    int n = 0;
    for (Node * c = head; c != NULL; c = c->next) n++;
    cout << n;
}`, 'run'],
['In a singly linked list, how can you move a pointer <code>current</code> to the <em>previous</em> node?', ['current--', 'current = current->prev', 'You cannot go back directly: start again from head', 'current = &current'], 2, 'Nodes only store the address of the next node.'],
];
})();
