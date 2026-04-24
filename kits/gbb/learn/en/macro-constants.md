# Macro Constants

[Prev]() [Next]()

* `def c = N`: defines a macro constant, i.e. `def meaningful = 42`
  * `c`: the macro name
  * `N`: numeric constant

Unlike variable or array declaration, the macro constant definition doesn't allocate any memory space.

By default, macro constants defined by `def ... = ...`, like other symbols, are defined in the global scope. Additionally, GB BASIC supports defining local lexical scopes using `begin def/end def`, where a `def ... = ...` macro is only valid within that specific scope. See the [Macro Scope](macro-scope.html) section for detail.
