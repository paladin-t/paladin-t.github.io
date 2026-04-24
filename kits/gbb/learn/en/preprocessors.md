# Preprocessors

[Prev]() [Next]()

## Conditional Compilation

All macros are expanded and evaluated as necessary at compile time. By introducing macro check directives, conditional compilation can be achieved, for selectively compiling a block of code or ignoring another based on the value of a macro expression. Macro definitions may appear in the source code, be configured in project properties, or be passed via the build command line.

* `#if ...`/`#else if ...`/`#else ...`/`#end if`: checks whether the value of a macro expression is not `false`, such as non-zero, `true`, any string, etc; the conditional body is compiled only if the condition is satisfied

`#If` directive supports both separated and concatenated syntax.

| Modern syntax | Retro syntax |
|---------------|--------------|
| `#else if`    | `#elseif`    |
| `#end if`     | `#endif`     |

## Compile-Time Diagnostics

The following diagnostic directives are used to provide custom compile-time feedbacks. When the preprocessor encounters these directives, it reports the specified message.

* `#message "msg"`: outputs the specific diagnostic message
  * `msg`: the diagnostic message
* `#warn "msg"`: outputs the specific diagnostic message as warning
  * `msg`: the diagnostic message
* `#error "msg"`: forces the compiler to stop and outputs the specific diagnostic message
  * `msg`: the diagnostic message

An `#error` directive immediately terminates the compilation process. This is primarily used as a safety mechanism to prevent compilation under invalid configurations.
