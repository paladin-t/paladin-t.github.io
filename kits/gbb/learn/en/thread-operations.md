# Thread Operations

[Prev]() [Next]()

## Basic Thread Operations

* `=start lno|lbl|#pg:lno|#pg:lbl[, ...]`: starts a thread from the specific location
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
  * `...`: optional variadic arguments; numeric values separated by comma
  * returns the started thread ID (non-zero), or `nothing` (zero) if fails
* `join id`: joins the specific thread; will return when the thread is finished
  * `id`: the thread ID
* `kill id`: terminates the specific thread
  * `id`: the thread ID
* `kill`: terminates all the other threads except for the current one
* `wait n`: waits for `n` frames on the current thread
  * `n`: the specific frame count to wait
* `lock`: retains and locks exclusive dispatching permission to the current thread, until it is unlocked or terminated
* `unlock`: releases and unlocks exclusive dispatching permission obtained by the current thread

<div class="content-warn" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    A thread ID can only be assigned to a variable as handle reference. Arrays or stack references are not accepted.
  </span>
</div>

**Tips:** _Accessing global variables on different concurrent threads is **unsafe**, consider stack references instead. See [Stack Operations](stack-operations.html) for details._

Thread example:

```basic
let id = start lbl, 22, 7              ' Start a thread from label `lbl`, with two arguments.
update
join id
print "!!!"
end

lbl:
  print "Args: %d, %d", stack1, stack0 ' Get stack parameters (as local variables).
  for i = 0 to 4
    print "i=%d", i
    wait 10
  next
  print "End"
```
<!-- prg
!edit, run, title="Threading", style=""
let id = start lbl, 22, 7              ' Start a thread from label `lbl`, with two arguments.
update
join id
print "!!!"
end

lbl:
  print "Args: %d, %d", stack1, stack0 ' Get stack parameters (as local variables).
  for i = 0 to 4
    print "i=%d", i
    wait 10
  next
  print "End"
-->

**See also:** _[Lookup Priority of Labeled Destination](https://paladin-t.github.io/kits/gbb/manual.html#lookup-priority-of-labeled-destination)._

## Thread Lifecycle

It's helpful to review the previous thread model diagram, as it will help understand the content of this section.

<img src="imgs/gbbvm-kernel-memory-layout.png" class="diagram-image"></img>

### Thread Creation

Threads can be started through the following means.

* User `start`
* Input callbacks like `btn`, `touch`, etc.
* `actor` behaviour and collision callbacks
* `trigger` event callbacks
* `menu` event callbacks

### Thread Termination

Threads can be terminated through the following means.

* User `kill`
* Normal completion, i.e., encountering an `end` statement
* Program shutdown

## Cautions

### Avoiding Unexpected Thread Termination

<div class="content-warn" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    The `kill` statement can terminate all other threads except the current one. However, there is a scenario, for example: when thread A starts thread B, and thread B calls `kill`, all threads except thread B (including thread A) will be terminated. This outcome is sometimes not desired.
  </span>
</div>

The following program demonstrates a possible case of unexpected termination.

```basic
start A
end

A:
  print "Begin A"
  start B
  wait 10
  print "End A" ' Will not be printed, this thread would be terminated earlier.
  end

B:
  print "Begin B"
  kill          ' Try to terminate all other threads, including A.
  wait 10
  print "End B"
  end
```
<!-- prg
!edit, run, title="Unexpected termination", style=""
start A
end

A:
  print "Begin A"
  start B
  wait 10
  print "End A" ' Will not be printed, this thread would be terminated earlier.
  end

B:
  print "Begin B"
  kill          ' Try to terminate all other threads, including A.
  wait 10
  print "End B"
  end
-->

If you encounter a similar situation, you can try using the `kill id` statement to terminate a specific thread, or reconsider the relationships between threads. In practice, `kill` is generally useful for terminating all unfinished actor behaviours and event callbacks in main thread for scene transitions. Typically, you might consider calling `kill` in the main thread, along with other cleanup tasks, before performing a scene switch.

### Avoiding Unexpected Concurrent State Access

<div class="content-warn" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    Threads execute concurrently, so accessing shared resources requires special care. For example: suppose there are two threads, A and B, both attempting to modify the global variable `i`. This can lead to unpredictable results. If a third thread tries to read the variable `i`, its behaviour will also be unpredictable.
  </span>
</div>

The following program demonstrates a possible case of unintended concurrent access.

```basic
start A
start B
end

A:
  begin do
    let i
    wait rnd(30)
    i = 1
    wait rnd(30)
    print "End A, i=%d", i
    i = 1
    end
  end do

B:
  begin do
    wait rnd(30)
    i = 2
    wait rnd(30)
    print "End B, i=%d", i
    i = 2
    end
  end do
```
<!-- prg
!edit, run, title="Unexpected concurrent state access", style=""
print "Press any key..."
wait_for_input:
  if not btnu then ' Wait for user input.
    update
    goto wait_for_input
  end if
  randomize        ' Initialize the random number generator.

start A
start B
end

A:
  begin do
    let i
    wait rnd(30)
    i = 1
    wait rnd(30)
    print "End A, i=%d", i
    i = 1
    end
  end do

B:
  begin do
    wait rnd(30)
    i = 2
    wait rnd(30)
    print "End B, i=%d", i
    i = 2
    end
  end do
-->

If you encounter a similar situation, there are two approaches to handle it.

1. Use `lock` to apply a thread lock to a segment of code logic, granting this thread exclusive execution priority. Other threads will not be invoked until `unlock` is called on that thread to release the lock.
2. Use thread's local stack references to avoid accessing shared resources. Refer to [Macro Stack Reference Aliases](macro-stack-reference-aliases.html).

For example, the above program can be modified into the version below.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    We still simulate two threads with unknown execution order and timing, but by using thread's local stack references, accesses to `i` within each thread only affect that specific thread and do not interfere with others.
  </span>
</div>

```basic
start A
start B
end

A:
  begin def
    reserve 1
    def i = stack0
    wait rnd(30)
    i = 1
    wait rnd(30)
    print "End A, i=%d", i
    i = 1
    end
  end def

B:
  begin def
    reserve 1
    def i = stack0
    wait rnd(30)
    i = 2
    wait rnd(30)
    print "End B, i=%d", i
    i = 2
    end
  end def
```
<!-- prg
!edit, run, title="Using thread's local stack references", style=""
print "Press any key..."
wait_for_input:
  if not btnu then ' Wait for user input.
    update
    goto wait_for_input
  end if
  randomize        ' Initialize the random number generator.

start A
start B
end

A:
  begin def
    reserve 1
    def i = stack0
    wait rnd(30)
    i = 1
    wait rnd(30)
    print "End A, i=%d", i
    i = 1
    end
  end def

B:
  begin def
    reserve 1
    def i = stack0
    wait rnd(30)
    i = 2
    wait rnd(30)
    print "End B, i=%d", i
    i = 2
    end
  end def
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    <strong>See also</strong>: <a href="stack-operations.html" class="nav-link">Stack Operations</a>, <a href="the-memory-model.html" class="nav-link">The Memory Model</a>, <a href="the-thread-model.html" class="nav-link">The Thread Model</a>, and <a href="macro-stack-reference-aliases.html" class="nav-link">Macro Stack Reference Aliases</a>.
  </span>
</div>
