# Data Types and Memory Stack

[Prev]() [Next]()

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    If you already have this knowledge from the <a href="https://paladin-t.github.io/kits/gbb/manual.html" target="_blank" class="nav-link">reference manual</a>, you can skip this chapter, but be sure not to miss the sections on <a href="stack-operations.html" class="nav-link">Stack Operations</a>.
  </span>
</div>

There are two fundamental data types in GB BASIC, String and Integer. Besides, it also supports Byte, Boolean, ID and Nothing, which are just type aliases of Integer, the purpose of these aliases is that they indicate different semantic meanings.

* String
  * is used by `print`, `text`, `label`, etc. for literal text or formatting
* Integer (16-bit signed)
  * denotes most of the numeric data in GB BASIC
* Byte (8-bit signed/unsigned)
  * is used by `data` statements to denote inline data sequences
* Boolean
  * has two values, `false` and `true`
* ID
  * denotes particular object instance
* Nothing
  * has one value, `nothing`, representing "no available object", etc.
