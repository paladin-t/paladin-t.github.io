# Arrays

[Prev]() [Next]()

GB BASIC supports array of number with up to 4 dimensions. The index is 0-based in each dimension, making its array access behaviour similar to most modern programming languages.

* `dim bar[N[, ...]]`: defines an array with up to 4 dimensions

Each array element takes one word (two bytes) of allocated space in memory. The memory of the array is set to 0 immediately after declaration.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    Note that GB BASIC array indices are 0-based, consistent with most modern programming languages.
  </span>
</div>

The following code demonstrates how to define a 2x2 array in two dimensions and read/write its elements.

```basic
dim m[2, 2]
m[0, 0] = 1
m[1, 0] = 2
m[0, 1] = 3
m[1, 1] = 4
for j = 0 to 1
  for i = 0 to 1
    print "[%d,%d]=%d", i, j, m[i, j]
  next
next
```
<!-- prg
!edit, run, title="Array is <code>0</code>-based", style=""
dim m[2, 2]
m[0, 0] = 1
m[1, 0] = 2
m[0, 1] = 3
m[1, 1] = 4
for j = 0 to 1
  for i = 0 to 1
    print "[%d,%d]=%d", i, j, m[i, j]
  next
next
-->

<div class="content-warn" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    Both variables and arrays are arranged in the order they are declared. GB BASIC does not perform bounds checking on array access, so caution is required during programming.
  </span>
</div>

The following code demonstrates a case of array out-of-bounds access.

```basic
dim m[3]                ' In physical memory, the memory regions represented by identifiers are contiguous.
let n = 42              ' `n` is allocated immediately after `m` in memory.
gosub show_array
print "m[3]=%d?!", m[3] ' The array has 3 elements, but we are reading the 4th (where `n` is stored).
print "n=%d", n
print ""

for i = 0 to 3          ' The array has 3 elements, but we iterate 4 times.
  m[i] = i + 1          ' So the last iteration accidentally accesses the memory of `n`!
next
gosub show_array
print "n=%d?!", n

end

show_array:
  for i = 0 to 2
    print "m[%d]=%d", i, m[i]
  next
  return
```
<!-- prg
!edit, run, title="Array accessing overflow", style=""
dim m[3]                ' In physical memory, the memory regions represented by identifiers are contiguous.
let n = 42              ' `n` is allocated immediately after `m` in memory.
gosub show_array
print "m[3]=%d?!", m[3] ' The array has 3 elements, but we are reading the 4th (where `n` is stored).
print "n=%d", n
print ""

for i = 0 to 3          ' The array has 3 elements, but we iterate 4 times.
  m[i] = i + 1          ' So the last iteration accidentally accesses the memory of `n`!
next
gosub show_array
print "n=%d?!", n

end

show_array:
  for i = 0 to 2
    print "m[%d]=%d", i, m[i]
  next
  return
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    <strong>See also</strong>: <a href="memory-management.html" class="nav-link">Memory Management</a>.
  </span>
</div>
