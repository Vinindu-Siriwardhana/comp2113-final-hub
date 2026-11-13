/* Lesson drill — Module 9: Standard Template Library. Row format as in m1.js. */
(function () {
const R = String.raw;
(window.DRILL = window.DRILL || {}).m9 = [
// ---------- overview ----------
['What are the three categories (components) of the STL?', ['Classes, structs, functions', 'Containers, iterators, algorithms', 'Vectors, lists, maps', 'Input, output, files'], 1, 'Containers store data, iterators access items in containers, algorithms are common operations such as sorting and searching.'],
['According to the notes, what is the better way to reuse other people\'s code?', ['Copy and paste it', 'Use the corresponding libraries', 'Rewrite it from scratch', 'Translate it to C'], 1, 'The STL gives efficient, robust implementations, so it is recommended over re-implementing the same functionality.'],
['Which three containers does this course cover?', ['array, stack, queue', 'vector, list, map', 'set, deque, map', 'vector, set, string'], 1, 'vector is a dynamic array, list is a doubly linked list, map is a balanced binary search tree.'],
['What does "template class" mean for <code>vector</code>?', ['It can only store one fixed type', 'The class can store items of different types, chosen by a template parameter', 'It must be copied before use', 'It is defined in a .h file only'], 1, 'In <code>vector&lt;string&gt;</code> the template parameter is <code>&lt;string&gt;</code>.'],
// ---------- vector ----------
['Which header is needed to use <code>vector</code>?', ['<array>', '<vector>', '<stl>', '<list>'], 1, 'Each container has its own header: &lt;vector&gt;, &lt;list&gt;, &lt;map&gt;.'],
['What is the size of a newly created <code>vector&lt;int&gt; v;</code>?', ['0', '1', '10', 'Undefined'], 0, 'It contains nothing initially.'],
['A vector already holds 3 strings. Where does <code>names.push_back(name)</code> put the new one?', ['At the front', 'At the end, as the 4th string', 'In sorted position', 'It replaces the 3rd'], 1, 'push_back adds to the end and increases the size by 1.'],
['Which four main functions of vector do the notes list?', ['push_back, size, [ ], pop_back', 'push_front, pop_front, size, find', 'insert, erase, count, sort', 'add, remove, get, length'], 0, 'pop_back removes the last item and decreases the size by 1.'],
['What is printed?', ['3 5', '2 4', '3 4', '2 5'], 1, 'Three items are pushed, one is popped, so the size is 2 and the last item is 4.', R`vector<int> v;
v.push_back(3);
v.push_back(4);
v.push_back(5);
v.pop_back();
cout << v.size() << " " << v[v.size() - 1];`, 'run'],
['How is a vector of user-defined <code>Record</code> objects declared?', ['vector Record book;', 'vector<Record> book;', 'Record vector book;', 'vector(Record) book;'], 1, 'Then <code>book.push_back(r)</code> and <code>book[i].name</code> work as for int or string.'],
['What is printed?', ['Amy', 'Bob', 'AmyBob', 'Nothing'], 0, 'push_back stores a <em>copy</em> of r. Changing r afterwards does not affect the record inside the vector.', R`struct Record { string name; int number; };
int main() {
    vector<Record> book;
    Record r;
    r.name = "Amy"; r.number = 1;
    book.push_back(r);
    r.name = "Bob";
    cout << book[0].name;
}`, 'run'],
['What does <code>v1 = v2;</code> do for two vectors?', ['Makes v1 an alias of v2', 'Sets v1 to the same size and copies every item of v2', 'Compile error', 'Swaps them'], 1, 'Assignment works for whole containers, unlike plain arrays.'],
['Which container is the best choice when random access by index matters?', ['list', 'vector', 'map', 'None'], 1, 'The notes: vector is more efficient for random access, map for searching.'],
// ---------- list ----------
['In what format does the STL <code>list</code> store its items?', ['A dynamic array', 'A doubly linked list', 'A binary tree', 'A hash table'], 1, 'So it is efficient at both ends.'],
['Which of these does <code>list</code> have that <code>vector</code> (as taught) does not?', ['push_back', 'size', 'push_front and pop_front', 'pop_back'], 2, 'list supports insertion and removal at the front as well as the back.'],
['Which operation is <em>missing</em> from <code>list</code>?', ['front()', 'back()', 'operator [ ]', 'size()'], 2, 'To reach the i-th item you must traverse from the first item.'],
['What is printed?', ['1 3', '2 3', '2 1', '3 1'], 1, 'After the pushes the list is 2 1 3. front() is 2 and back() is 3.', R`list<int> L;
L.push_back(1);
L.push_front(2);
L.push_back(3);
cout << L.front() << " " << L.back();`, 'run'],
['What is printed?', ['1 2 3', '2 3 1', '3 1 2', '1 3 2'], 1, 'The first item is moved to the back, which is how the notes scan a list without [ ].', R`list<int> L;
L.push_back(1); L.push_back(2); L.push_back(3);
L.push_back(L.front());
L.pop_front();
for (list<int>::iterator it = L.begin(); it != L.end(); it++) cout << *it << " ";`, 'run'],
['In the notes\' list phone book, how is a name searched without <code>[ ]</code>?', ['By sorting the list', 'Compare with front(); if no match, move the front item to the back; repeat size() times', 'By using find()', 'By converting to a vector'], 1, 'After size() rotations every item has been at the front once.'],
// ---------- map ----------
['What does a <code>map</code> store?', ['Single values in insertion order', 'A set of <key, value> pairs', 'Only integers', 'Pointers to nodes'], 1, '<code>map&lt;string, int&gt; m;</code> has string keys and int values.'],
['Which underlying structure gives map its fast searching?', ['A linked list', 'A balanced binary search tree', 'A plain array', 'A stack'], 1, 'The course uses it without teaching how it works: keys on the left subtree are smaller than keys on the right.'],
['What does <code>book[name] = number;</code> do if <code>name</code> is not yet in the map?', ['Compile error', 'Run-time error', 'Creates a pair with that key and stores the value', 'Nothing'], 2, 'The same syntax is used to insert a pair and to access its value.'],
['What happens when you <em>read</em> <code>m["Alan"]</code> and no pair has that key?', ['An exception is thrown', 'A pair with key "Alan" and a default value is created', 'It returns -1', 'The program will not compile'], 1, 'That is why the notes check with count() before printing.'],
['What does <code>m.count(key)</code> return?', ['The value stored for key', '1 if the key exists, 0 otherwise', 'The number of pairs in the map', 'The position of the key'], 1, 'Usually used as <code>if (book.count(name) &gt; 0)</code> before accessing <code>book[name]</code>.'],
['What is printed?', ['2 0', '2 1', '3 0', '3 1'], 0, 'Two keys were inserted. count() does not create the missing key, so the size stays 2.', R`map<string, int> book;
book["Amy"] = 1;
book["Bob"] = 2;
book["Amy"] = 5;
cout << book.size() << " " << book.count("Cat");`, 'run'],
['What is printed?', ['2', '3', '1', '0'], 1, 'Reading book["Cat"] creates the key, so the map now has 3 pairs.', R`map<string, int> book;
book["Amy"] = 1;
book["Bob"] = 2;
int x = book["Cat"];
cout << book.size();`, 'run'],
['Why does <code>map&lt;Record, int&gt; book;</code> with a user-defined Record give a compile error when used?', ['Maps cannot hold classes', 'The less-than operator < is not defined for Record, and map keeps keys in order', 'Record is too large', 'Keys must be strings'], 1, 'A map stores pairs in ascending order of key, so the keys need a total order.'],
['Which function fixes that error?', ['bool operator<(const Record& a, const Record& b) { return a.name < b.name; }', 'int compare(Record a, Record b)', 'void sort(Record& a)', 'bool Record(const a, const b)'], 0, 'Operator overloading, written before main(). It has two parameters because &lt; is a binary operator, and returns bool.'],
['In that operator, why are the parameters <code>const Record&amp;</code>?', ['Required syntax', 'Passed by reference for efficiency, and const because they are not altered', 'So they can be modified', 'To make them global'], 1, 'Pass by constant reference avoids copying and protects the arguments.'],
['In what order are the pairs of a map stored and printed?', ['Insertion order', 'Ascending order of the keys', 'Ascending order of the values', 'Random order'], 1, 'So a map can be used to sort a set of items indirectly.'],
['What is printed?', ['0 3 4 2 1', '0 1 2 3 4', '4 3 2 1 0', '0 2 4 1 3'], 1, 'Keys are inserted as 0, 3, 4, 2, 1 but come out sorted.', R`map<int, double> input;
for (int i = 0; i < 5; i++) input[i * 3 % 5] = i + 0.1;
map<int, double>::iterator itr;
for (itr = input.begin(); itr != input.end(); itr++) cout << (*itr).first << " ";`, 'run'],
// ---------- iterators ----------
['What is an iterator used for?', ['Sorting a container', 'Accessing (indexing) the items in a container', 'Allocating memory', 'Reading files'], 1, 'Iterators are classes defined by the STL.'],
['Which declares an iterator for a vector of strings?', ['iterator<vector<string>> itr;', 'vector<string>::iterator itr;', 'vector::iterator<string> itr;', 'string::vector::iterator itr;'], 1, 'Container type, then the scope resolution operator ::, then the word iterator.'],
['Can a <code>list&lt;int&gt;::iterator</code> be used to index a <code>vector&lt;int&gt;</code>, or a <code>list&lt;string&gt;</code>?', ['Yes to both', 'No to both: the iterator type must match the container type and item type', 'Only the vector', 'Only the list of string'], 1, 'Each container type has its own iterator type.'],
['What does <code>c.begin()</code> return?', ['The first item', 'An iterator pointing to the first item', 'The index 0', 'A pointer to the container'], 1, 'Use <code>*itr</code> to get the item itself.'],
['What is printed?', ['3', '100', '4', '5'], 1, 'Dereferencing an iterator gives access to the item, so it can be changed.', R`vector<int> v;
v.push_back(3); v.push_back(4); v.push_back(5);
vector<int>::iterator itrOfV = v.begin();
*itrOfV = 100;
cout << *itrOfV;`, 'run'],
['What does <code>itr++</code> do?', ['Adds 1 to the item', 'Moves the iterator to the next item in the container', 'Deletes the item', 'Moves to the previous item'], 1, 'To change the item you dereference first: <code>(*itr)++</code>.'],
['What does <code>c.end()</code> point to?', ['The last item', 'The position after the last item: not a real item', 'The first item', 'NULL'], 1, 'It is only used to test whether the iterator has gone through the whole container.'],
['Which is the standard loop to visit every item of container <code>v</code>?', ['for (itr = v.begin(); itr != v.end(); itr++)', 'for (itr = v.begin(); itr <= v.end(); itr++)', 'for (itr = 0; itr < v.size(); itr++)', 'while (itr) itr++;'], 0, '<code>!=</code> works for every container. <code>&lt;</code> only exists for random access iterators.'],
['For a map iterator <code>itr</code>, how are the key and the value accessed?', ['(*itr).key and (*itr).value', '(*itr).first and (*itr).second', 'itr[0] and itr[1]', '*itr and **itr'], 1, 'Items in a map are pairs. <code>itr-&gt;first</code> and <code>itr-&gt;second</code> are the same thing.'],
['In the notes\' student analogy, what is an iterator like?', ['A student', 'A student number that identifies a student', 'A classroom', 'A class list'], 1, 'Changing the iterator points at another student. Dereferencing and changing alters the student but not the number.'],
['Which operation does a <em>bidirectional</em> iterator add to a forward iterator?', ['a + 5', 'a--', 'a[5]', 'a < b'], 1, 'Forward iterators support assignment, ++, dereference and equality tests.'],
['Which operations are only available on <em>random access</em> iterators?', ['++ and *', 'Arithmetic (a + 5, a - b), <, +=, and a[5]', '== and !=', '-- only'], 1, 'For example <code>v.end() - v.begin()</code> equals <code>v.size()</code>.'],
['Which type of iterator does each container give?', ['vector: random access; list and map: bidirectional', 'All random access', 'vector: bidirectional; list: forward; map: random access', 'All bidirectional'], 0, 'This is why <code>sort()</code> works on a vector but not on a list or a map.'],
['How does an iterator differ from a pointer?', ['It does not differ', 'A pointer is a memory address; an iterator is an object, and ++ moves it to the next item wherever that is stored', 'Iterators cannot be dereferenced', 'Pointers cannot be incremented'], 1, 'Both are dereferenced with *. Iterators are designed to avoid low-level memory manipulation.'],
// ---------- algorithms ----------
['Which header provides <code>sort()</code>?', ['<sort>', '<algorithm>', '<vector>', '<cstdlib>'], 1, 'The STL has about 70 algorithms. They are template functions that work on items of different types.'],
['<code>sort(first, last)</code> sorts which range, in which order?', ['[first, last] inclusive, descending', '[first, last): last itself is not included, ascending', '(first, last), ascending', 'The whole container always'], 1, 'So <code>sort(v.begin(), v.end())</code> sorts everything, because end() is one past the last item.'],
['What is printed?', ['apple boy cat', 'cat boy apple', 'boy apple cat', 'cat apple boy'], 0, 'Strings are sorted into ascending (dictionary) order.', R`vector<string> input;
input.push_back("cat"); input.push_back("boy"); input.push_back("apple");
sort(input.begin(), input.end());
for (vector<string>::iterator itr = input.begin(); itr != input.end(); itr++) cout << *itr << " ";`, 'run'],
['What is printed?', ['1 2 5 8 9', '9 2 5 8 1', '9 8 5 2 1', '2 5 8 9 1'], 1, 'Only the items from the second position to the second last are sorted. The first and last stay put.', R`int a[] = {9, 8, 5, 2, 1};
vector<int> v(a, a + 5);
sort(v.begin() + 1, v.end() - 1);
for (int i = 0; i < 5; i++) cout << v[i] << " ";`, 'run'],
['How is a plain array <code>int input[10];</code> sorted with the STL?', ['sort(input);', 'sort(input, input + 10);', 'sort(input[0], input[9]);', 'input.sort();'], 1, 'The array name points to the first item and input + 10 is one position after the last. Pointers act as random access iterators.'],
['Why can <code>sort()</code> not be used on a list or a map?', ['They are already sorted', 'Their iterators are bidirectional, and sort needs random access iterators', 'They hold too many items', 'They have no begin()'], 1, 'A map is kept sorted by key automatically.'],
['<code>sort(v.begin(), v.end());</code> on a <code>vector&lt;Email&gt;</code> of a user-defined class fails to compile. Why?', ['Vectors of classes cannot be sorted', 'The compiler does not know what "ascending order" means for Email until operator< is defined', 'Email needs a constructor', 'sort needs a third argument'], 1, 'Overload the less-than operator before main(). sort then arranges the objects according to it.'],
['Is the Big-O notation used in the STL notes examinable?', ['Yes, memorise every entry', 'No: the notes say it will not be tested at all', 'Only for vector', 'Only O(1)'], 1, 'It is included for completeness only.'],
];
})();
