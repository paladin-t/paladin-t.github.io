# Macro Variable Aliases

[Prev]() [Next]()

* `def a = b`: defins an identifier alias of variable or array, i.e. `def meaningful = foo`
  * `a`: the macro name
  * `b`: the variable or array name

Unlike variable or array declaration, the macro definition of identifier alias doesn't allocate any memory space.

By default, identifner alias defined by macro `def ... = ...`, like other symbols, are defined in the global scope. Additionally, GB BASIC supports defining local lexical scopes using `begin def/end def`, where a `def ... = ...` macro is only valid within that specific scope. See the [Macro Scope](macro-scope.html) section for detail.
