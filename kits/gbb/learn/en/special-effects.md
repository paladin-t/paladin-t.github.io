# Special Effects

[Prev]() [Next]()

This section describes special graphical effects in GB BASIC. The Pulse effect is used to periodically switch the pixels of a specific tile in the tilemap to another set of pixels, achieving tile animation. The Game Boy's hardware background layer has only one layer, but by cleverly arranging background tiles and modifying the viewport coordinate registers at the right interrupts, we can achieve a parallax scrolling effect. Similar to the parallax effect, the wobble effect also distorts the screen by adjusting the viewport coordinate registers on specific scanlines.

Try the following program.

```basic
' Usage:
'   Up: pulse effect
'   A: wobble effect
'   B: parallax effect
'   Start: reset

on btnd(UP_BTN) gosub up_
on btnd(A_BTN) gosub a_
on btnd(B_BTN) gosub b_
on btnd(START_BTN) gosub start_

map on
fill map(0, 0x51) = #0
def map(0, 0, 32, 18) = #0
map 0, 0

let x = 0
loop:
  x = x - 1
  map x, 0
  update
  goto loop

up_: ' Press Up to apply pulse effect.
  fx PULSE_EFFECT, 30, _
    0, 1, #0:0, #0:78, _
    1, 1, #0:1, #0:78, _
    2, 1, #0:2, #0:78, _
    3, 1, #0:3, #0:78, _
    4, 1, #0:4, #0:78, _
    5, 1, #0:5, #0:78, _
    6, 1, #0:6, #0:78
  return
a_: ' Press A to apply wobble effect.
  fx WOBBLE_EFFECT, 0x01
  return
b_: ' Press B to apply parallax effect.
  fx PARALLAX_EFFECT, _
     9, 12, 2, _
    12, 15, 1, _
    15,  0, 0
  return
start_: ' Press Start to reset.
  reset
```
<!-- prg
!edit, run, title="Special effects", style=""
url://prgs/effects-1.txt
-->

## API

| Effect types      | Note                                                   |
|-------------------|--------------------------------------------------------|
| `PULSE_EFFECT`    | Performs tile animation                                |
| `PARALLAX_EFFECT` | Performs parallax scrolling                            |
| `WOBBLE_EFFECT`   | Performs wobbling through scanlines (**experimental**) |

* `fx PULSE_EFFECT, interval, t0, n0, #pg_0a|#pg:n_0a, #pg_0b|#pg:n_0b[, ...]`: enables the pulse effect
  * `interval`: the flip interval
  * `t0`: the start tile index to modify
  * `n0`: the tile count to modify
  * objectives (a):
    * `#pg_0a`: tiles page index for the first state
    * `#pg:n_0a`: tiles page index and tile index for the first state
    * `#pg_0b`: tiles page index for the second state
    * `#pg:n_0b`: tiles page index and tile index for the second state
  * `...`: optional variadic arguments; for the second and more groups of values
* `fx PULSE_EFFECT`: disables the pulse effect
* `fx PARALLAX_EFFECT, lo0, hi0, sft0[, ...]`: enables the parallax effect (and stops any wobble effect); takes up to three sections of data
  * `lo0`: the start y tile index of the parallax section
  * `hi0`: the end y tile index of the parallax section
  * `sft0`: the shift value
  * `...`: optional variadic arguments; for the second and third groups of values
* `fx PARALLAX_EFFECT`: disables the parallax effect
* `fx WOBBLE_EFFECT, val`: **experimental**, enables the wobble effect (and stops any parallax effect); for colored device only
  * `val`: the wobble value, with range of value from 0 to 15
* `fx WOBBLE_EFFECT`: **experimental**, disables the wobble effect

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="scrolling.html" class="nav-link">Scrolling</a>.
  </span>
</div>
