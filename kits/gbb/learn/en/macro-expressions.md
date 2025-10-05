# Macro Expressions

[Prev]() [Next]()

* `def e = ...`: defins an alias of expression, i.e. `def meaningful = foo * (bar + (22 / 7)) mod baz`
  * `e`: the macro name
  * `...`: the expression

A macro expression has higher priority than arithmetical operators. For example, the follows code results in `9`, rather than `7`:

```basic
def e = 2 + 1
print 3 * e ' Expands into `3 * (2 + 1)`.
```
<!-- prg
!edit, run, title="Macro expression", style=""
def e = 2 + 1
print 3 * e ' Expands into `3 * (2 + 1)`.
-->

By default, expression alias defined by macro `def ... = ...`, like other symbols, are defined in the global scope. Additionally, GB BASIC supports defining local lexical scopes using `begin def/end def`, where a `def ... = ...` macro is only valid within that specific scope. See the [Macro Scope](macro-scope.html) section for detail.
