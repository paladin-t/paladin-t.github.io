# Output

[Prev]() [Next]()

* `print ...`: outputs numeric values to the screen as plain text
  * `...`: variadic data; numeric values separated by comma
* `print fmt[, ...]`: outputs text and numeric values to the screen as plain text
  * `fmt`: the format string, accepts the following "Escapes" for value interpretation
  * `...`: optional variadic data; numeric values separated by comma

Every `print` outputs a newline by default after all contents have been printed, to let the next `print` starts from the same line instead of a new line, put a semicolon (`;`) at the end of the `print`.

| Escapes  | Can be applied to                         | Note                                            |
|----------|-------------------------------------------|-------------------------------------------------|
| `%d`     | `print`, `text`, `label`, `menu`, `shell` | Integer (DEC)                                   |
| `%x`     | `print`, `text`, `label`, `menu`, `shell` | Integer (HEX)                                   |
| `%c`     | `print`, `text`, `label`, `menu`, `shell` | Character                                       |
| `%%`     | `print`, `text`, `label`, `menu`, `shell` | Percent sign                                    |
| `\uXXXX` | `text`, `label`, `menu`                   | Embedded character code, `XXXX` is in HEX       |
| `\#`     | `print`, `text`, `label`, `menu`, `shell` | The current stack pointer of the current thread |
| `\\`     | `print`, `text`, `label`, `menu`, `shell` | Backslash                                       |
| `\r`     | `label`                                   | Carriage return                                 |
| `\n`     | `label`                                   | New line                                        |
| `\f`     | `label`                                   | New page                                        |

The "Escapes" rules apply to one or more of the following: `print fmt[, ...]`, `text fmt[, ...]`, `label #pg|"{name}", fmt[, ...]`, `menu #pg|"{name}", fmt0[, fmt1, ..., fmtN][, ...]`, and `shell ">fmt"[, ...]`.

* `locate x, y`: puts the cursor to the specific location on the screen for text output
  * `x`: the x location in pixels
  * `y`: the y location in pixels

The following statement clears all text on screen and locate the cursor to (0, 0) for text output.

* `cls`: clears the screen

These statements run under the `TEXT_MODE` (will be explained in later chapters).

```basic
print "o_O"
cls
locate 7, 8
print "22/7=%d", 22 / 7
```
<!-- prg
!edit, run, title="Text-mode statements", style=""
print "o_O"
cls
locate 7, 8
print "22/7=%d", 22 / 7
-->
