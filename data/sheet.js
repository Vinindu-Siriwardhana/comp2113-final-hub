/* COMP2113 Final Hub — condensed A4 note sheet (prints double-sided on one sheet). */
(function () {
const R = String.raw;
const e = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const SECTIONS = [
['Linux commands', `ls -l -a | cd .. ~ | pwd | mkdir | rmdir (empty) | rm -r
cp a b | mv a b | cat f | touch f | man cmd
chmod u+x f | chmod go-w f | chmod 754 f   r=4 w=2 x=1
-rwxr-x--x = type | user | group | other
wc -l lines  -w words  -c bytes
sort -n numeric  -r reverse  -t, -k3 (sep, field)
cut -d, -f2 | cut -d' ' -f1,3   (fields from 1)
uniq = drop ADJACENT dups  ->  sort f | uniq
head -15 f | tail -3 f | diff A B (a add, c change, d del)
find . -name "*.cpp" -type f     (-type d dirs)
grep 'abc' f   -v invert  -i nocase  -c count  -E regex
regex: . any  ^ start  $ end  ? 0/1  + 1+  * 0+
       [a-z0-9] set  {n} {n,} {n,m}  \\. literal dot`],
['Redirection and pipes', `> overwrite  >> append  < input  2> stderr
cmd > out 2>&1     cmd 1>/dev/null 2>&1
echo "msg" >&2     (to stderr)    0 in, 1 out, 2 err
grep "x" f | sort | head -15 | wc -c`],
['Shell script', `#!/bin/bash            chmod u+x s.sh ; ./s.sh
a="dog"   (no spaces)   echo $a    read name
"$a" substitutes   '$a' literal   \\$ escape
n=\`wc -l < f\`    list="\`ls *.cpp\`"
\${#s} length  \${s:pos:len} substr  \${s/from/to}
let "b = $a + 9"      $# count  $0 script  $1.. \${10}
if [ "$s" == "Y" ]; then ... elif [ $a -lt 3 ]; then
... else ... fi        (spaces inside [ ] required)
num: -eq -ne -lt -le -gt -ge   str: == != \\> \\<
file: -e exists -f file -d dir -s size>0 -r -w -x
for f in $list; do ... done    for i in {0..100..3}
g++ a.cpp -o a 2> err.txt ; if [ -e a ] ...`],
['Separate compilation', `f.h = declarations + guard; f.cpp = definitions
#include "f.h" in f.cpp AND in every file that calls it
header changed -> rebuild every .o whose .cpp includes it
  (directly or through another .h), then relink`],
['Makefile', `prog: main.o util.o
<TAB>g++ $^ -o $@
main.o: main.cpp util.h
<TAB>g++ $(FLAGS) -c $<
clean:
<TAB>rm -f prog *.o
.PHONY: clean
$@ target  $^ all deps  $< first dep  $(VAR)
.o depends on its .cpp + every header it includes
stages: preprocess -> compile -> assemble -> link
g++ -c f.cpp (object only)   -o name
#ifndef X_H / #define X_H / ... / #endif`],
['C++ basics', R`7/2 = 3   7/2.0 = 3.5   7%3 = 1   (int)3.9 = 3
x/10 drops last digit   x%10 keeps last digit
i++ use then add   ++i add then use
&& || short-circuit   = assigns, == compares
'7'-'0' = 7   'A'+1 = 'B'   non-zero is true
switch: no break -> falls through   do{}while(c);
cout << fixed << setprecision(2) << x;
setw(5) next item only   setfill('0')   left / right
cin >> x (one word)   getline(cin, s) (whole line)
cin >> n; cin.ignore(); getline(cin, s);  (eat the '\n')
ASCII: '0'=48  'A'=65  'a'=97   'a'-'A'=32   ' '=32
sizeof: char 1  int 4  double 8  pointer 8 (64-bit)`],
['Functions and recursion', R`void f(int a)  copy     void f(int &a) changes caller
arrays: always modifiable; pass size too
inner { int a; } hides outer a until the }
int fact(int n){ if(n<=1) return 1; return n*fact(n-1); }
int bs(int a[],int l,int r,int x){
  if(l>r) return -1; int m=l+(r-l)/2;
  if(a[m]==x) return m;
  if(x<a[m]) return bs(a,l,m-1,x);
  return bs(a,m+1,r,x); }
iterative: while(l<=r){ ... r=m-1 / l=m+1 }
rand()%(hi-lo+1)+lo -> [lo,hi]   srand(time(0)) once`],
['Arrays and strings', R`int a[5]={1,2}; -> 1 2 0 0 0    sizeof(a)/sizeof(a[0])
2D: int m[3][4];  void f(int m[][4], int rows)
  (every size but the first is required) m[r][c]
char s[]="hi"; 3 bytes, ends '\0'
<cstring> strlen strcpy(d,s) strcat(d,s) strcmp==0
for(i=0; s[i]!='\0'; i++)
string: s.length() s.substr(pos,len) s.find(x)
 s.rfind(x) string::npos s.insert(pos,str)
 s.erase(pos,n) s.replace(pos,n,str) s.c_str()
 == < + work; capitals sort before lowercase
swap: t=a[i]; a[i]=a[j]; a[j]=t;
reverse: for(i=0;i<n/2;i++) swap a[i], a[n-1-i]
selection sort: for i<n-1 { m=i; for j=i+1..n
  if(a[j]<a[m]) m=j;  swap(a[i],a[m]); }`],
['Structs and file I/O', R`struct P { int x; double y; };   P p={1,2.5};
p.x    P *q=&p;  q->x  ==  (*q).x
ifstream fin; fin.open("f.txt");
if (fin.fail()) { cout << "Error"; exit(1); }
while (getline(fin, line)) { ... }   // or fin >> x
fin.close();
ofstream fout("o.txt");  ofstream f("o.txt", ios::app);
istringstream iss(line); iss >> a >> b;
never: while(!fin.eof())
struct param by value = copy; by & = changes caller`],
['Pointers and memory', R`int *p=&n;  *p value   &n address   int *a,*b;
p[i] == *(p+i)   &t[3] == t+3   last = p+SIZE-1
*p++ value then move   (*p)++ add to value
int *a = new int[n];  ...  delete [] a;
Node *x = new Node;   ...  delete x;
never return &local; NULL deref = runtime error`],
['Linked list', R`struct Node { int val; Node *next; };
head insert: p=new Node; p->val=v; p->next=head; head=p;
traverse: for(Node *p=head; p!=NULL; p=p->next)
tail: if(!head){head=p;return;} c=head;
  while(c->next!=NULL) c=c->next;  c->next=p;
delete tail: 0 nodes return; 1 node delete head,
  head=NULL; else while(c->next->next!=NULL)
  c=c->next; delete c->next; c->next=NULL;
remove all v: while(head && head->val==v){t=head;
  head=head->next; delete t;}  c=head;
  while(c && c->next){ if(c->next->val==v){
  t=c->next; c->next=t->next; delete t;}
  else c=c->next; }
free: while(head){t=head; head=head->next; delete t;}
changing head -> parameter Node *&head`],
['STL', R`vector<int> v; push_back pop_back size() v[i]
 front() back() insert(v.begin()+i,x) erase(it)
 sort(v.begin(), v.end());        <algorithm>
list<T> L; push_front push_back pop_* L.sort()
 L.remove(x)  no L[i]  it++ only
map<string,int> m; m[k]++  m.count(k)  m.erase(k)
 it->first key  it->second value  sorted by key
for (vector<int>::iterator it=v.begin();
     it!=v.end(); it++) cout << *it;
const container -> const_iterator
new list<string>() -> ans->push_back(x)`],
['C', R`#include <stdio.h> <stdlib.h> <string.h>
scanf("%d",&a); scanf("%lf",&d); scanf("%s",s);
printf("%d %.2f %c %s\n", a, d, c, s);  %5d  %-5d
int *p=(int*)malloc(sizeof(int)*n);
if(p==NULL) exit(EXIT_FAILURE);   free(p);
typedef struct node{int v; struct node *next;} Node;
no cin/cout/string/new/&refs in C;  gcc f.c -o f
char s[20]; scanf("%s", s);  (no & for arrays)`],
['Before handing in', `MCQ: +2 / -1 / blank 0 -> guess only if 2 ruled out
empty list? one node? base case? return on every path?
& on changed params and scanf?  ; after struct }
int division?  = vs ==?  i < n not i <= n?
exact spaces in output?  delete [] for arrays?`],
];
window.SHEET = SECTIONS.map(([h, body]) => `<section><h4>${e(h)}</h4><pre>${e(body)}</pre></section>`).join('');
})();
