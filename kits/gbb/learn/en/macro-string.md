# Macro String

[Prev]() [Next]()

* `def f = "..."`: defines a string, i.e. `def meaningful = "hello"`
  * `f`: the macro name
  * `...`: the string literal

The macro string definition doesn't allocate any memory space, but the string itself takes ROM space.

By default, macro strings defined by `def ... = ...`, like other symbols, are defined in the global scope. Additionally, GB BASIC supports defining local lexical scopes using `begin def/end def`, where a `def ... = ...` macro is only valid within that specific scope. See the [Macro Scope](macro-scope.html) section for detail.
