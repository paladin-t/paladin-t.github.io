# Gamepad Input

[Prev]() [Next]()

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

// TODO
