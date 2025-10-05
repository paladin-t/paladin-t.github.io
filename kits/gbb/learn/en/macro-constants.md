# Macro Constants

[Prev]() [Next]()

* `def c = N`: defines a macro constant, i.e. `def meaningful = 42`
  * `c`: the macro name
  * `N`: numeric constant

Unlike variable or array declaration, the macro constant definition doesn't allocate any memory space.

By default, macro constants defined by `def ... = ...`, like other symbols, are defined in the global scope. Additionally, GB BASIC supports defining local lexical scopes using `begin def/end def`, where a `def ... = ...` macro is only valid within that specific scope. See the [Macro Scope](macro-scope.html) section for detail.

In addition to user-defined macro constants, the system also provides several builtin macros that reflect cartridge properties.

| Macro names              | Description                                       | Value             |
|--------------------------|---------------------------------------------------|-------------------|
| `IS_COLORED_CARTRIDGE`   | Whether the cartridge supports color              | `true` or `false` |
| `IS_EXTENSION_CARTRIDGE` | Whether the cartridge supports extension features | `true` or `false` |
| `CARTRIDGE_HAS_SRAM`     | Whether the cartridge has SRAM                    | `true` or `false` |
| `CARTRIDGE_HAS_RTC`      | Whether the cartridge has Real-Time Clock         | `true` or `false` |

These predefined macros are automatically determined at compile time and can be used like regular macro constants. Their values are resolved during compilation and remain fixed throughout the program.
