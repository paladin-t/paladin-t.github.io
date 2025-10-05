# Macro Functions

[Prev]() [Next]()

* `def fn f(...) = ...`: defines a user function
  * `f`: the user defined function name
  * `...`: the function expression
* `=f(...)`: call a user defined function, where `f` is the user defined function name
  * `...`: arguments passed to the function

Function example:

```basic
def fn f(x, y) = sqr(x) + abs(y)
let a = f(1 + abs(-2), f(1, -3))
print a
```
<!-- prg
!edit, run, title="Macro <code>fn</code>", style=""
def fn f(x, y) = sqr(x) + abs(y)
let a = f(1 + abs(-2), f(1, -3))
print a
-->

By default, `fn` functions, like other symbols, are defined in the global scope. Additionally, GB BASIC supports defining local lexical scopes using `begin def/end def`, where an `fn` function is only valid within that specific scope. See the [Macro Scope](macro-scope.html) section for detail.
