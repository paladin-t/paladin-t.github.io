# Basic Syntax and Program Structure

[Prev]() [Next]()

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    If you already have this knowledge from the <a href="https://paladin-t.github.io/kits/gbb/manual.html" target="_blank" class="nav-link">reference manual</a>, you can skip this chapter.
  </span>
</div>

Projects are programmed in a BASIC dialect.

## Basic Rules

The language implements a classic style syntax that supports code lines either with or without line numbers. Let's try another version of the previous "Hello, World!" program that does the same thing but without line numbers.

```basic
loop:
  print "Hello"
  goto loop
```
<!-- prg
!edit, run, title="Hello world", style=""
loop:
  print "Hello"
  goto loop
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    In actual projects, you can choose whether to use line numbers based on your preference.
  </span>
</div>

A long line can be separated into several short ones, and connected with underscores (`_`).

```basic
loop:
  print _
    "Hello"
  goto _
    loop
```
<!-- prg
!edit, run, title="Separated code lines", style=""
loop:
  print _
    "Hello"
  goto _
    loop
-->

Keywords and identifiers are case-insensitive by default, i.e. `foo`, `Foo` and `FOO` all mean the same, but it could be changed to case-sensitive in project's property.

```basic
' GB BASIC is case-insensitive.
let foo = 0
Foo = 42
print FOO
```
<!-- prg
!edit, run, title="Case-insensitive", style=""
' GB BASIC is case-insensitive.
let foo = 0
Foo = 42
print FOO
-->

The target running system of GB BASIC has quite restricted resources, so to satisfy such restrictions, the syntax is designed to be very compact, so that code and assets can be straightforward compiled and processed into the target format very fast and efficient.

## Start and End Points

GB BASIC programs do not have a designated entry point; they begin execution from the first executable statement on the initial code page and proceed linearly. When the end of a code page is reached, the program concludes as if an `end` statement were present at the page's termination. Control can migrate between code pages, allowing for non-linear execution.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    A game program typically consists of an initialization sequence where one-time setup instructions are executed. Following this, the program enters a persistent loop, often referred to as the update routine. Within this loop, the program cycles through a series of operations, including capturing user input, advancing the game's state, and rendering objects.
  </span>
</div>

## Notational Conventions

This tutorial series uses elements such as identifiers, delimiters, and symbols to represent code. Additionally, it uses some symbols that do not appear in practical code to denote additional rules, for example:

* `=`: used in prefix form to denote a function call with a return value, i.e. `=foo()`
* `=?`: used in parameter list to denote a default value when it's omitted, i.e. `foo(a, b=1, c=2)`
* `[]`: denotes optional parameters, i.e. `foo(a[, b[, c]])`
* `...`: indicates a variable number of arguments, i.e. `foo(a, b, ...)`
* `|`: represents "or", i.e. `foo|bar`
* `/`: represents structured syntax that code elements should match, i.e. `foo/end foo`
* `*`: represents a repetition of a code element, i.e. `foo*`
* `#pg`: represents a code page or asset page
* `#pg:n`: represents a code page or asset page with a specific sub index
* `"{builtin}"`: represents name of a builtin entry
* `"{name}"`: represents asset name
