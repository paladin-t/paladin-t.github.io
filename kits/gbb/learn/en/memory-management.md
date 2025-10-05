# Memory Management

[Prev]() [Next]()

There is no heap allocation in GB BASIC. The addresses of variables, arrays, strings and resources are all determined at compile-time.

GB BASIC represents all **numeric** data as integers, specifically **16-bit signed** integers.

In **arrays**, each element occupies **2 bytes** (16 bits) of memory.

**Variables** and **arrays** declared in BASIC code have **fixed locations** in memory that cannot be changed. The size of **arrays** also **cannot be dynamically altered**. Both variables and arrays are **arranged in the order they are declared**.

**Macros** themselves **occupy zero memory space**.

**Strings** are not stored in RAM but are solidified **in ROM**. Escape characters and placeholder formatting are supported.

The vast majority of **resources** do not need to be loaded into RAM; instead, the data **in ROM** is accessed directly.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    <span>You can hover over the code analysis icon in the code editor to view the memory allocation of your program.</span>
    <br>
    <br>
    <img src="imgs/editor-memory-allocations.png" class="diagram-image" style="margin: auto;"></img>
  </span>
</div>
