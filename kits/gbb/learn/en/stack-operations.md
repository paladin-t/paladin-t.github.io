# Stack Operations

[Prev]() [Next]()

## Reserving Stack Slots

* `reserve`: reserves a slot on the stack of the current thread
* `reserve n`: reserves a number of slots on the stack of the current thread
  * `n` the number of slots to be reserved

## Pushing Values to the Stack

* `push`: pushes a `0` to the stack of the current thread
* `push val`: pushes a value to the stack of the current thread
  * `val`: the value to push

## Popping Values from the Stack

* `=pop`: pops a value from the stack of the current thread
  * returns the popped value
* `=pop n`: pops a number of values from the stack of the current thread
  * `n`: the number of values to be popped
  * returns the last popped value

## Accessing Values on the Stack

* `=top`: gets the top value of the stack of the current thread, does not change the stack frames
  * returns the top value
* `=stack(n)`: gets the `n`th value of the stack in the order of bottom-up or top-down of the current thread, does not change the stack frames
  * `n`: the integer reference constant, if `n` is greater than or equal to `0` then gets the "stack **bottom** + `n`" value, otherwise `n` is less than `0` then gets the "stack **top** + `n`" value
  * returns the value
* `=stack0|stack1|...|stackN`: gets the specific Nth value of the stack relative to its **bottom** of the current thread, does not change the stack frames; not applicable to `for` loop or `select case` statements
  * returns the value
* `stack0|stack1|...|stackN = ...`: sets the specific Nth value of the stack relative to its **bottom** of the current thread, does not change the stack frames

Alghough the `stack(n)` operation doesn't change the stack frames, outer statements such as assignment or printing may reserve stack space. So consider using positive `n` only within an expression.

**Tips:** _Accessing global variables on different concurrent threads is **unsafe**. For instance, if one thread is reading the value of a global variable while another thread is writing to it, the reading thread may not obtain the correct value as intended. To address this issue, thread locks can be used, or the above mentioned stack operations, `stack(n)` or `stackN`, can be employed to manipulate thread's local variables instead of global ones. The specific solution depends on the actual problem._

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="the-memory-model.html" class="nav-link">The Memory Model</a>, and <a href="macro-stack-reference-aliases.html" class="nav-link">Macro Stack Reference Aliases</a>.
  </span>
</div>

<!-- gem -->
