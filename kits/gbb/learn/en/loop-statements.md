# Loop Statements

[Prev]() [Next]()

* `for/to[/step]/next`: repeats a section of code a number of times with a control variable which has a differing value each time through the loop

`for` loop example:

```basic
for i = 0 to 4 step 1
  print "i=%d", i
next
```
<!-- prg
!edit, run, title="<code>for</code> loop", style=""
for i = 0 to 4 step 1
  print "i=%d", i
next
-->

* `while/end while`: repeats a section of code while a control condition results `true`

`while` loop example:

```basic
let a = 0
while a < 5
  print "a=%d", a
  a = a + 1
end while
```
<!-- prg
!edit, run, title="<code>while</code> loop", style=""
let a = 0
while a < 5
  print "a=%d", a
  a = a + 1
end while
-->

`While` statements support both modern and retro syntax.

| Modern syntax | Retro syntax |
|---------------|--------------|
| `end while`   | `wend`       |

* `repeat/until`: repeats a section of code until a control condition results `true`

`Repeat` loop example:

```basic
let a = 0
repeat
  print "a=%d", a
  a = a + 1
until a = 5
```
<!-- prg
!edit, run, title="<code>repeat</code> loop", style=""
let a = 0
repeat
  print "a=%d", a
  a = a + 1
until a = 5
-->

* `exit`: exits the current loop structure, and continues to execute its following code
