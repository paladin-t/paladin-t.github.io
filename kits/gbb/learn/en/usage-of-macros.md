# Usage of Macros

[Prev]() [Next]()

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    If you already have this knowledge from the <a href="https://paladin-t.github.io/kits/gbb/manual.html" target="_blank" class="nav-link">reference manual</a>, you can skip this chapter, but be sure not to miss the sections on <a href="macro-stack-reference-aliases.html" class="nav-link">Macro Stack Reference Aliases</a>, and <a href="macro-scope.html" class="nav-link">Macro Scope</a>.
  </span>
</div>

In programming, a macro is a preprocessor directive or metaprogramming tool that allows for simple text substitution or code expansion before compilation. By defining macros, developers can create code templates, abstract repetitive patterns into concise identifiers, or create aliases to improve readability. Macros in GB BASIC are no exception.

Currently, GB BASIC supports six types of macros: macro functions, macro expressions, macro constants, macro variable aliases, macro strings, and macro stack reference aliases. The following sections will detail each of these six macro types, and finally introduce an important concept for later chapters: macro scope.

In addition to user-defined macro constants and strings, the system also provides several builtin macros that reflect cartridge and project properties.

| Macro names              | Description                                       | Value             |
|--------------------------|---------------------------------------------------|-------------------|
| `IS_COLORED_CARTRIDGE`   | Whether the cartridge supports color              | `true` or `false` |
| `IS_EXTENSION_CARTRIDGE` | Whether the cartridge supports extension features | `true` or `false` |
| `CARTRIDGE_HAS_SRAM`     | Whether the cartridge has SRAM                    | `true` or `false` |
| `CARTRIDGE_HAS_RTC`      | Whether the cartridge has Real-Time Clock         | `true` or `false` |
| `PROJECT_TITLE`          | The project title                                 | String            |
| `PROJECT_DESCRIPTION`    | The project description                           | String            |
| `PROJECT_AUTHOR`         | The project author                                | String            |
| `PROJECT_GENRE`          | The project genre                                 | String            |
| `PROJECT_VERSION`        | The project version                               | String            |
| `PROJECT_URL`            | The project URL                                   | String            |

These predefined macros are automatically determined at compile time and can be used like regular macro constants. Their values are resolved during compilation and remain fixed throughout the program.
