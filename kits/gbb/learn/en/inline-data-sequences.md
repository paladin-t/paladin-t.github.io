# Inline Data Sequences

[Prev]() [Next]()

## Declaring Inline Data Sequence

* `data val[, ...]`: declares a number of byte values as inline data sequence
  * `val`: the 8-bit byte value
  * `...`: variadic data; byte values separated by comma
* `data int val[, ...]`: declares a number of 16-bit integer values for inline data sequence in little-endian, i.e. `data int 0x1234`
  * `val`: the 16-bit integer value
  * `...`: variadic data; integer values separated by comma
* `data repeat val, num`: declares a number of identical numeric values as inline data sequence
  * `val`: the identical value
  * `num`: the data count to repeat

## Reading Data to Variable or Array

* `read var[, ...]`: reads a number of byte values from declared inline data sequence from the current reading position, moves the reading position one step forward for each read operation
  * `var`: the variable
  * `...`: variadic variables separated by comma
* `read int var[, ...]`: reads a number of 16-bit integer values from inline data sequence in little-endian, i.e. `read int foo`
  * `var`: the variable
  * `...`: variadic variables separated by comma
* `read array`: reads a number of bytes from declared inline data sequence from the current reading position, stores the bytes into the specified array, moves the reading position according to the array size
  * `array`: the array to store the bytes, where each element is an `int` that takes two bytes
* `read n`: skips a number of bytes in the declared inline data sequence from the current reading position, moves the reading position according to the number of bytes to skip
  * `n`: the constant number of bytes to skip

## Restoring Reading Cursor

* `restore "{builtin}"|lno|lbl|#pg:lno|#pg:lbl`: restores the reading position of inline data sequence to the specific location
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
* `restore array`: restores the reading position of inline data sequence to the start address of the specific array
  * `array`: the source data array, where each element is an `int` that takes two bytes

GB BASIC also supports to declare 16-bit integer values other than 8-bit ones with the `int` statement, this statement is only used with in a `data` or `read` to declare or read two bytes as one word.

The values following all `data` statements are arranged in increasing order from code page 0 to the following pages, and from the first line to the following lines. Regardless of whether the `data` statement is inside a conditional or loop statement, the sequence of values is processed once and only once. The maximum supported size for the `data` sequence declared in code is 16,380 bytes or approximately 15.996KB.

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    Inline data does not occupy RAM space but is solidified in ROM.
  </span>
</div>

The following code demonstrates how to manipulate a data sequence.

```basic
let d = 0
lbl:
  data 1, 2, 3
  for i = 0 to 5
    read d
    print "read %d", d
  next
  data 4, 5, 6

read d ' The behaviour is undefined when reading location is out of bounds.
print "read %d", d

restore lbl ' Restores the reading location to "lbl".
read d
print "read %d", d
```
<!-- prg
!edit, run, title="Inline data sequence", style=""
let d = 0
lbl:
  data 1, 2, 3
  for i = 0 to 5
    read d
    print "read %d", d
  next
  data 4, 5, 6

read d ' The behaviour is undefined when reading location is out of bounds.
print "read %d", d

restore lbl ' Restores the reading location to "lbl".
read d
print "read %d", d
-->
