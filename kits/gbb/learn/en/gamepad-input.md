# Gamepad Input

[Prev]() [Next]()

Gamepad is the most widely used and most compatible player input method in GB BASIC. This section introduces gamepad input with primitive statements and callbacks.

Try the following programs.

```basic
loop:
  if btnd(UP_BTN) then print "Up"
  if btnd(DOWN_BTN) then print "Down"
  if btnd(LEFT_BTN) then print "Left"
  if btnd(RIGHT_BTN) then print "Right"
  if btnd(A_BTN) then print "A"
  if btnd(B_BTN) then print "B"
  if btnd(SELECT_BTN) then print "Select"
  if btnd(START_BTN) then print "Start"
  update
  goto loop
```
<!-- prg
!edit, run, title="Gamepad primitives", style=""
print "Press any key..."
loop:
  if btnd(UP_BTN) then print "Up"
  if btnd(DOWN_BTN) then print "Down"
  if btnd(LEFT_BTN) then print "Left"
  if btnd(RIGHT_BTN) then print "Right"
  if btnd(A_BTN) then print "A"
  if btnd(B_BTN) then print "B"
  if btnd(SELECT_BTN) then print "Select"
  if btnd(START_BTN) then print "Start"
  update
  goto loop
-->

```basic
on btnd(UP_BTN) gosub up_
on btnd(DOWN_BTN) gosub down_
on btnd(LEFT_BTN) gosub left_
on btnd(RIGHT_BTN) gosub right_
on btnd(A_BTN) gosub a_
on btnd(B_BTN) gosub b_
on btnd(SELECT_BTN) gosub select_
on btnd(START_BTN) gosub start_

loop:
  update
  goto loop

up_:
  print "Up"
  return
...
```
<!-- prg
!edit, run, title="Gamepad callback", style=""
print "Press any key..."
on btnd(UP_BTN) gosub up_
on btnd(DOWN_BTN) gosub down_
on btnd(LEFT_BTN) gosub left_
on btnd(RIGHT_BTN) gosub right_
on btnd(A_BTN) gosub a_
on btnd(B_BTN) gosub b_
on btnd(SELECT_BTN) gosub select_
on btnd(START_BTN) gosub start_

loop:
  update
  goto loop

up_:
  print "Up"
  return
down_:
  print "Down"
  return
left_:
  print "Left"
  return
right_:
  print "Right"
  return
a_:
  print "A"
  return
b_:
  print "B"
  return
select_:
  print "Select"
  return
start_:
  print "Start"
  return
-->

## API

* `=btn()`: gets whether any key is being pressed
  * returns `true` if any key is being pressed, otherwise `false`
* `=btn(key)`: gets whether the specific key is being pressed
  * `key`: the key code; can be one of the following "Gamepad buttons" constants
  * returns `true` if the key is being pressed, otherwise `false`
* `=btnd()`: gets whether any key has just been pressed
  * returns `true` if any key has just been pressed, otherwise `false`
* `=btnd(key)`: gets whether the specific key has just been pressed
  * `key`: the key code; can be one of the following "Gamepad buttons" constants
  * returns `true` if the specific key has just been pressed, otherwise `false`
* `=btnu()`: gets whether any key has just been released
  * returns `true` if any key has just been released, otherwise `false`
* `=btnu(key)`: gets whether the specific key has just been released
  * `key`: the key code; can be one of the following "Gamepad buttons" constants
  * returns `true` if the specific key has just been released, otherwise `false`

| Gamepad buttons | Value  | Note   |
|-----------------|--------|--------|
| `UP_BTN`        | `0x04` | Up     |
| `DOWN_BTN`      | `0x08` | Down   |
| `LEFT_BTN`      | `0x02` | Left   |
| `RIGHT_BTN`     | `0x01` | Right  |
| `A_BTN`         | `0x10` | A      |
| `B_BTN`         | `0x20` | B      |
| `SELECT_BTN`    | `0x40` | Select |
| `START_BTN`     | `0x80` | Start  |

* `on btn(key) goto|gosub|start lno|lbl|#pg:lno|#pg:lbl`: registers a callback for when the specific key is being pressed
  * `key`: the key code; can be one of the "Gamepad buttons" constants
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
* `on btnd(key) goto|gosub|start lno|lbl|#pg:lno|#pg:lbl`: registers a callback for when the specific key has just been pressed
  * `key`: the key code; can be one of the "Gamepad buttons" constants
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
* `on btnu(key) goto|gosub|start lno|lbl|#pg:lno|#pg:lbl`: registers a callback for when the specific key has just been released
  * `key`: the key code; can be one of the "Gamepad buttons" constants
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
* `off btn(key)`: unregisters a callback for when the specific key is being pressed
  * `key`: the key code; can be one of the "Gamepad buttons" constants
* `off btnd(key)`: unregisters a callback for when the specific key has just been pressed
  * `key`: the key code; can be one of the "Gamepad buttons" constants
* `off btnu(key)`: unregisters a callback for when the specific key has just been released
  * `key`: the key code; can be one of the "Gamepad buttons" constants

A gamepad callback is a routine that takes zero parameter.

All button callbacks by `goto`, `gosub` and `start` work with the manual update mode, and only callbacks by `start` work with the auto update mode.
