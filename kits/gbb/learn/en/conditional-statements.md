# Conditional Statements

[Prev]() [Next]()

Single-line conditional syntax as follows:

* `if/then`: one-line conditional statement with one branch
* `if/then/else`: one-line conditional statement with two branches

```basic
if true then print "Ok"
if false then print "Oops" else print "Ok"
```
<!-- prg
!edit, run, title="One-line <code>if</code>", style=""
if true then print "Ok"
if false then print "Oops" else print "Ok"
-->

* `if/then N[/else]`: is short for `if/then goto N[/else]`
* `if/goto N[/else]`: is short for `if/then goto N[/else]`

```basic
first:
  if true then goto a
second:
  if true then b
third:
  if true goto c

a:
  print "Ok"
  goto second
b:
  print "Ok"
  goto third
c:
  print "Ok"
```
<!-- prg
!edit, run, title="Shortcuts of <code>if</code>", style=""
first:
  if true then goto a
second:
  if true then b
third:
  if true goto c

a:
  print "Ok"
  goto second
b:
  print "Ok"
  goto third
c:
  print "Ok"
-->

Multiline conditional syntax as follows:

* `if/then/end if`: multiline conditional statement with one branch
* `if/then/else/end if`: multiline conditional statement with two branches
* `if/then/else if*/else/end if`: multiline conditional statement with multiple branches

```basic
if false then
  print "Oops"
else if true then
  if true then
    print "Ok"
  end if
else
  print "Oops"
end if
```
<!-- prg
!edit, run, title="Multiline <code>if</code>", style=""
if false then
  print "Oops"
else if true then
  if true then
    print "Ok"
  end if
else
  print "Oops"
end if
-->

Multi-case selection syntax as follows:

* `select case*/end select`: multi-case selection statement
* `select case*/else/end select`: multi-case selection statement

```basic
select case foo
  case 1
    print "Value"
  case 2, 3
    print "Values"
  case 4 to 5
    print "Range"
  case >= 6
    print "Comparison"
  else
    print "Others"
end select
```
<!-- prg
!edit, run, title="Multi-case <code>select</code>", style=""
select case foo
  case 1
    print "Value"
  case 2, 3
    print "Values"
  case 4 to 5
    print "Range"
  case >= 6
    print "Comparison"
  else
    print "Others"
end select
-->

A `select case` statement conditionally executes sections of code depending on the value of a variable. A case condition can be a single value, a number of values, a range of values or a comparison. When the case is determined by a range of values, the smaller number must come before the larger one; when the case is determined by a comparison, it supports `=`, `<`, `<=`, `>`, `>=` and `<>` operators. The condition variable to be determined cannot be a macro costant or stack reference macro.

`If` and `select case` statements support both modern and retro syntax.

| Modern syntax | Retro syntax |
|---------------|--------------|
| `else if`     | `elseif`     |
| `end if`      | `endif`      |
| `end select`  | `endselect`  |

Ternary conditional operator syntax as follows:

* `=iif(cond, a, b)`: gets one of the two specific values according to the condition
  * `cond`: the condition expression
  * `a`: the expression that results the first value
  * `b`: the expression that results the second value
  * returns the first value if the condition results `true`, otherwise returns the second one

```basic
let foo = iif(true, 1, 0)
if foo then print "Ok"
```
<!-- prg
!edit, run, title="Ternary conditional operator", style=""
let foo = iif(true, 1, 0)
if foo then print "Ok"
-->

Branched jump syntax as follows:

* `on cond goto|gosub lno|lbl|#pg:lno|#pg:lbl[, ...]`: performs a branched jump according to the condition
  * `cond`: the condition expression; jumps to the first (No. 0) branch if the condition results `0`, to the second (No. 1) branch if it results `1`, and so on...
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
  * `...`: optional variadic labels; locations separated by comma

A branch chunk is a routine that takes zero parameter.

```basic
let a = 0
on a goto lbl0, lbl1, lbl2
goto lblElse
lbl0:
  print "0"
  end
lbl1:
  print "1"
  end
lbl2:
  print "2"
  end
lblElse:
  print "Else"
```
<!-- prg
!edit, run, title="Branched jump with <code>on</code>", style=""
let a = 0
on a goto lbl0, lbl1, lbl2
goto lblElse
lbl0:
  print "0"
  end
lbl1:
  print "1"
  end
lbl2:
  print "2"
  end
lblElse:
  print "Else"
-->
