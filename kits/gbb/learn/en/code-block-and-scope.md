# Code Block and Scope

[Prev]() [Next]()

Code blocks can be defined using `begin do/end do` statements. These statements don't produce any actual effects, their purpose is only to organize code to make it more readable, similar to `begin ... end` in Pascal, `{ ... }` in C, `[ ... ]` in Smalltalk, or "indentation" in Haskell.

The `begin def/end def` statements can be used to define macro scopes. This allows macro definitions such as stack reference aliases to be available only within that scope. Note that variable and array declarations are not affected by this, their scope is always global.

## Code Block

* `begin do/end do`: marks the beginning and end of a code block

These statements don't execute any specific instructions at runtime, they simply help organize code.

Code block example:

```basic
begin do
  ' Do something.
end do

' Do something else.
```
<!-- prg
!edit, run, title="Code block", style=""
begin do
  ' Do something.
end do

' Do something else.
-->

`begin do/end do` statements support both modern and retro syntax.

| Modern syntax | Retro syntax |
|---------------|--------------|
| `begin do`    | `begindo`    |
| `end do`      | `enddo`      |

## Code Scope

### Scope of Variables and Arrays

Variables and arrays are always defined in the global scope, which means they can be referenced anywhere in the program.

### Scope of Macros

By default, macros are defined in the global scope, which means they can be referenced anywhere in the program. By using <a href="macro-scope.html"><code style="color: #f052a1; text-decoration: underline;">begin def/end def</code></a> statements to declare the start and end of a scope, macro definitions within the code block can be made available only within that scope. Macro scopes support nesting, and references to macros will search from the innermost scope outward to the top-level scope.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    <strong>See also</strong>: <a href="macro-scope.html" class="nav-link">Macro Scope</a>.
  </span>
</div>
