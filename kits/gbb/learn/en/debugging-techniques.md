# Debugging Techniques

[Prev]() [Next]()

## Game State Debugging

### Debugging via the <code>print</code> Statement

The simplest debugging method is using the `print` statement to output game variables or states. However, `print` itself affects the tiles and map data in the current VRAM, so this method is suitable for specific scenarios. For most cases, please consider using the `shell` method below.

* `print ...`: outputs numeric values to the screen as plain text
  * `...`: variadic data; numeric values separated by comma
* `print fmt[, ...]`: outputs text and numeric values to the screen as plain text
  * `fmt`: the format string, accepts the following "Escapes" for value interpretation
  * `...`: optional variadic data; numeric values separated by comma

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="output.html" class="nav-link">Output</a>.
  </span>
</div>

### Debugging via the <code>shell</code> Statement

By calling the `shell` statement from [Extension feature](extension-features.html) with specific parameters, we can output debug information to a dedicated onscreen debug layer without affecting RAM and VRAM.

* `shell ">fmt"[, ...]`

<img src="imgs/debugger-onscreen-layer.png" class="diagram-image diagram-screenshot">

<div class="small-note">Onscreen debug layer</div>

```basic
let n = 0
loop:
  ' Simple debug output with the `shell` statement.
  if btnd(A_BTN) then
    shell ">debug %d", n
    n = n + 1
  end if
  update
  goto loop
```
<!-- prg
!edit, run, title="Onscreen debugging", style=""
if not query IS_GBB then
  print "Invalid device"
  end
end if

print "Press A..."

let n = 0
loop:
  ' Simple debug output with the `shell` statement.
  if btnd(A_BTN) then
    shell ">debug %d", n
    n = n + 1
  end if
  update
  goto loop
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="extension-features.html" class="nav-link">Extension Features</a>.
  </span>
</div>

### Kernel Thread Stack Debugging

In GB BASIC's threading model, maintaining proper stack operation is crucial. Using the `dbginfo` statement below allows debugging of the current threads' stack pointers to inspect abnormal stack operations.

* `dbginfo(full = true)`: outputs the thread context(s) to the debug layer via shell (extension feature); each element shows the offset of a stack pointer, number for offset, "-" for not active
  * `full`: `true` to debug all threads, `false` for the current thread

<img src="imgs/debugger-dbginfo.png" class="diagram-image diagram-screenshot">

<div class="small-note">Debugging stack pointers</div>

```basic
let id = start lbl, 22, 7              ' Start a thread with two arguments.
join id
print "!!!"
end

lbl:
  print "Args: %d, %d", stack1, stack0 ' Get the arguments.
  for i = 0 to 4
    print "i=%d", i
    wait 10
  next
  print "End"
  dbginfo()                            ' Output the stack information of the threads.
  end ' End this thread.
```
<!-- prg
!edit, run, title="Stack debugging", style=""
if not query IS_GBB then
  print "Invalid device"
  end
end if

let id = start lbl, 22, 7              ' Start a thread with two arguments.
join id
print "!!!"
end

lbl:
  print "Args: %d, %d", stack1, stack0 ' Get the arguments.
  for i = 0 to 4
    print "i=%d", i
    wait 10
  next
  print "End"
  dbginfo()                            ' Output the stack information of the threads.
  end ' End this thread.
-->

The program above outputs `"S:0,2,_,_,_,_,_,_,_,_,_,_,_,_,_,_"`, indicating there are two active threads, the first stack pointer (top relative to base) is 0, and the second is 2 (two elements on the stack).

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="the-memory-model.html" class="nav-link">The Memory Model</a>, <a href="the-thread-model.html" class="nav-link">The Thread Model</a>, and <a href="thread-operations.html" class="nav-link">Thread Operations</a>.
  </span>
</div>

### VRAM Debugging

GB BASIC includes a built-in VRAM debugger for viewing and debugging tile layouts, resolving potential overflows, and analyzing VRAM usage patterns in other games. Consider keeping an eye on it during development.

<img src="imgs/debugger-vram-debugger.png" class="diagram-image diagram-screenshot">

<div class="small-note">VRAM debugger</div>

Click the view icon in the bottom-right corner to toggle the VRAM debugger. It appears on the right side of the emulator interface, featuring the following sections from top to bottom: "Tiles" (current tile allocation), "BG/WIN map" (BG or WIN map views), "OAM" (sprite or actor allocation), "Palettes" (grayscale or color palettes), and "Status (readonly)" (partial LCD status). Hover over an element to view its details and highlight valid references in other sections or in game.

<!-- gem -->
