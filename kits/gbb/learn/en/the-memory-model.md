# The Memory Model

[Prev]() [Next]()

## Thread Allocation

The OS kernel of GB BASIC is based on the <a class="nav-link" href="https://github.com/untoxa/gbvm" target="_blank">GBVM <i class="fa-solid fa-up-right-from-square"></i></a> project. The following diagram gives a complete overview of the thread model.

<img src="imgs/gbbvm-kernel-memory-layout.png" class="diagram-image diagram-schematic">

* Compiled instructions can be stored in different ROM banks if necessary
* The kernel supports up to 16 threads with concurrent contexts
  * Threads share the same physical memory
* Every thread has its own registers (not accessible from code) and stacks (accessible from code)
* All threads share a same area of RAM for globals (accessible from code)

## Stack Model

The following diagram gives a detailed overview of the kernel RAM layout.

<img src="imgs/gbbvm-thread-local-memory-layout.png" class="diagram-image diagram-schematic">

* Each thread context has its own stack for:
  * thread parameters (optional),
  * thread locals, stack entries,
  * evaluation intermediates,
  * function parameters, return points, etc.
* The basic growth and accessible unit from code is 16-bit

<details open>
<summary><b>Details</b></summary>
<div class="details-text">
A push operation will cause the stack to grow from lower addresses towards higher addresses. Correspondingly, a pop operation will cause the stack to shrink from higher addresses to lower addresses. Changes to the stack are typically caused by the following operations.

* Stack initialization
  * Thread initialization (including the main entry thread)
* Stack reset or invalidation
  * Thread termination or exit
* Pushing
  * Expression evaluation
  * `gosub` to a subroutine
  * Parameter passing and returning of a system call
  * User `push` or `reserve`
  * Parameter passing before calling an event handler
* Popping
  * Partial or complete completion of expression evaluation
  * `return` from a subroutine
  * System call return and completion
  * User `pop`
</div>
</details>

### Stack Views

The stack grows from lower addresses to higher addresses. The base address and direction differ for various statements.

#### View for Stack Operations

For most regular stack operations like `reserve`, `push`, and `pop`, the base address is the **stack top**, which is the address currently pointed to by the stack pointer. For example: `push` pushes data onto the stack and increases the stack register by 1, while `pop` pops data from the stack top and decreases the stack register by 1.

#### View for Stack References

For stack references, such as `stack0|stack1|...|stackN` or `stack(0)|stack(1)|...|stack(n)`, the base address is the **stack bottom**. This means `stack0`/`stack(0)` corresponds to the lowest address of the current stack.

This design choice is made because these stack references themselves, or the evaluation of their outer expressions, can affect the current stack top. If stack references were based on the stack top, their behaviour would become unpredictable. In practice, simply keep in mind: `stackN` corresponds to the first callback parameter, and `stack0` corresponds to the last callback parameter or the earliest `push`ed value.

```basic
push 22              ' Stack view: [BOTTOM, 22 (TOP)].
push 7               ' Stack view: [BOTTOM, 22, 7 (TOP)].
print stack0, stack1 ' `stack0` references BOTTOM+0, `stack1` references BOTTOM+1, outputs 22, 7.
let a = pop          ' Stack view: [BOTTOM, 22 (TOP)].
let b = pop          ' Stack view: [BOTTOM (TOP)].
print a, b           ' `a` is 7, `b` is 22.
```
<!-- prg
push 22              ' Stack view: [BOTTOM, 22 (TOP)].
push 7               ' Stack view: [BOTTOM, 22, 7 (TOP)].
print stack0, stack1 ' `stack0` references BOTTOM+0, `stack1` references BOTTOM+1, outputs 22, 7.
let a = pop          ' Stack view: [BOTTOM, 22 (TOP)].
let b = pop          ' Stack view: [BOTTOM (TOP)].
print a, b           ' `a` is 7, `b` is 22.
-->

### Principles of Stack Operation Matching

Generally, for every `push` operation performed by the developer, a corresponding `pop` is required to ensure proper stack operation matching.

In expressions, stack growth caused by intermediate calculation results is automatically popped after the expression evaluation completes, requiring no developer intervention.

For event callbacks, in the vast majority of cases, developers also do not need to concern themselves with popping parameters from the stack.

However, in situations where developers use `reserve`, they must determine on their own whether a `pop` is necessary. A common approach is to omit the `pop` within a thread, allowing the stack space to be released collectively upon thread termination. In contrast, within a subroutine entered via `gosub`, the developer may need to perform a `pop` manually to ensure the subroutine remains reentrant.

<div class="content-warn" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    The stack space for threads is limited (typically 64 16-bit words per thread). If the stack space is insufficient, it will lead to a stack overflow error. During development, care must be taken to avoid overly complex expressions, deeply nested structures, recursive calls, etc.
  </span>
</div>

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="stack-operations.html" class="nav-link">Stack Operations</a>, and <a href="macro-stack-reference-aliases.html" class="nav-link">Macro Stack Reference Aliases</a>.
  </span>
</div>

<!-- gem -->
