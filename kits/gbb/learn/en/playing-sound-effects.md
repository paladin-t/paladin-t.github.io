# Playing Sound Effects

[Prev]() [Next]()

* `sound #pg|"{name}"|"{builtin}"[, priority]`: plays SFX of the specific asset page or builtin asset
  * objectives:
    * `#pg`: SFX page index
    * `name`: sound asset name
    * `"{builtin}"`: the name of a builtin entry
  * `priority`: the sound priority; can be one of the following "Sound priorities" constants
<!-- * `sound bank, addr[, priority]` -->
* `sound ...[, priority]`: plays SFX of the specific inline data
  * `...`: variadic SFX data; numeric values separated by comma
  * `priority`: the sound priority; can be one of the following "Sound priorities" constants

| Sound priorities   | Value |
|--------------------|-------|
| `MINIMAL_PRIORITY` | `1`   |
| `NORMAL_PRIORITY`  | `4`   |
| `HIGH_PRIORITY`    | `8`   |

* `beep`: plays a simple beep sound

Try the following example.

```basic
sound on
print "A to play"

loop:
  if btnu(A_BTN) then
    sound #0
  end if
  update
  goto loop
```
<!-- prg
!edit, run, title="Playing SFX", style=""
url://prgs/sfx-1.txt
-->

<!-- gem -->
