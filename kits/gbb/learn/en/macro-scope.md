# Macro Scope

[Prev]() [Next]()

* `begin def/end def`: marks the beginning and end of a local lexical scope for macro definitions like function `def fn f(...) = ...`, expression `def e = (a + b) * (22 / 7)`, constant `def c = 42`, alias `def a = b` and stack reference `def s = stackN`

Scoping example:

```basic
def fn f() = 1
print "f()=%d", f()   ' Call the global function.

begin def
  def fn f() = 2
  print "f()=%d", f() ' Call the local function.
end def

print "f()=%d", f()   ' Call the global function.
```
<!-- prg
!edit, run, title="For functions", style=""
def fn f() = 1
print "f()=%d", f()   ' Call the global function.

begin def
  def fn f() = 2
  print "f()=%d", f() ' Call the local function.
end def

print "f()=%d", f()   ' Call the global function.
-->

```basic
def e = 3 - 2
print "e=%d", e   ' Evaluate the global expression.

begin def
  def e = 4 / 2
  print "e=%d", e ' Evaluate the local expression.
end def

print "e=%d", e   ' Evaluate the global expression.
```
<!-- prg
!edit, run, title="For expressions", style=""
def e = 3 - 2
print "e=%d", e   ' Evaluate the global expression.

begin def
  def e = 4 / 2
  print "e=%d", e ' Evaluate the local expression.
end def

print "e=%d", e   ' Evaluate the global expression.
-->

```basic
def c = 1
print "c=%d", c   ' Get the global macro.

begin def
  def c = 2
  print "c=%d", c ' Get the local macro.
end def

print "c=%d", c   ' Get the global macro.
```
<!-- prg
!edit, run, title="For constants", style=""
def c = 1
print "c=%d", c   ' Get the global macro.

begin def
  def c = 2
  print "c=%d", c ' Get the local macro.
end def

print "c=%d", c   ' Get the global macro.
-->

```basic
let x = 1
let y = 2
def z = x
print "z=%d", z   ' Get the global variable.

begin def
  def z = y
  print "z=%d", z ' Get the local variable.
end def

print "z=%d", z   ' Get the global variable.
```
<!-- prg
!edit, run, title="For identifier aliases", style=""
let x = 1
let y = 2
def z = x
print "z=%d", z   ' Get the global variable.

begin def
  def z = y
  print "z=%d", z ' Get the local variable.
end def

print "z=%d", z   ' Get the global variable.
-->

```basic
let foo = 1
let bar = 2
print "foo=%d,bar=%d", foo, bar     ' Get the global variables.
let id = start lbl, 22, 7           ' Start the thread.
update
join id
print "foo=%d,bar=%d", foo, bar     ' Get the global variables.
end

lbl:
  begin def
    def foo = stack0
    def bar = stack1
    print "foo=%d,bar=%d", foo, bar ' Get the stack variables.
  end def
  end
```
<!-- prg
!edit, run, title="For stack references", style=""
let foo = 1
let bar = 2
print "foo=%d,bar=%d", foo, bar     ' Get the global variables.
let id = start lbl, 22, 7           ' Start the thread.
update
join id
print "foo=%d,bar=%d", foo, bar     ' Get the global variables.
end

lbl:
  begin def
    def foo = stack0
    def bar = stack1
    print "foo=%d,bar=%d", foo, bar ' Get the stack variables.
  end def
  end
-->

`begin def/end def` statements support both modern and retro syntax.

| Modern syntax | Retro syntax |
|---------------|--------------|
| `begin def`   | `begindef`   |
| `end def`     | `enddef`     |

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="code-block-and-scope.html" class="nav-link">Code Block and Scope</a>.
  </span>
</div>
