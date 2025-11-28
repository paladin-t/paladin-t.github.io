# Mouse and Touch Input

[Prev]() [Next]()

_The "touch" API family supports direct interaction with GB BASIC programs on the screen through pointing devices. The introduction of this extended feature stems from a thought of mine: what could we do if we were to reinterpret old handheld consoles from a modern perspective?_

* `=touch()`: gets whether any touch pointer is being pressed
  * returns non-zero for the touch/mouse button type if any touch pointer is being pressed, otherwise `0x00`; can be one of the following "Mouse buttons" constants
* `=touch(x, y)`: gets whether any touch pointer is being pressed
  * `x`: passed by reference; a variable to store the x position in pixels
  * `y`: passed by reference; a variable to store the y position in pixels
  * returns non-zero for the touch/mouse button type if any touch pointer is being pressed, otherwise `0x00`; can be one of the following "Mouse buttons" constants
* `=touchd()`: gets whether any touch pointer has just been pressed
  * returns non-zero for the touch/mouse button type if any touch pointer has just been pressed, otherwise `0x00`; can be one of the following "Mouse buttons" constants
* `=touchd(x, y)`: gets whether any touch pointer has just been pressed
  * `x`: passed by reference; a variable to store the x position in pixels
  * `y`: passed by reference; a variable to store the y position in pixels
  * returns non-zero for the touch/mouse button type if any touch pointer has just been pressed, otherwise `0x00`; can be one of the following "Mouse buttons" constants
* `=touchu()`: gets whether any touch pointer has just been released
  * returns non-zero for the touch/mouse button type if any touch pointer has just been released, otherwise `0x00`; can be one of the following "Mouse buttons" constants
* `=touchu(x, y)`: gets whether any touch pointer has just been released
  * `x`: passed by reference; a variable to store the x position in pixels
  * `y`: passed by reference; a variable to store the y position in pixels
  * returns non-zero for the touch/mouse button type if any touch pointer has just been released, otherwise `0x00`; can be one of the following "Mouse buttons" constants

| Mouse buttons      | Value  | Note                                                |
|--------------------|--------|-----------------------------------------------------|
| `TOUCH_BUTTON_0`   | `0x01` | The first finger touched or LMB (Left Mouse Button) |
| `TOUCH_BUTTON_ANY` | `0x01` | Is identical to `TOUCH_BUTTON_0`                    |
| `MOUSE_BUTTON_0`   | `0x01` | The first finger touched or LMB (Left Mouse Button) |
| `MOUSE_BUTTON_1`   | `0x02` | RMB (Right Mouse Button)                            |
| `MOUSE_BUTTON_ANY` | `0x03` | Any of `MOUSE_BUTTON_0` and/or `MOUSE_BUTTON_1`     |

* `on touch goto|gosub|start lno|lbl|#pg:lno|#pg:lbl`: registers a callback for when the touch pointer is being pressed
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
* `on touchd goto|gosub|start lno|lbl|#pg:lno|#pg:lbl`: registers a callback for when the touch pointer has just been pressed
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
* `on touchu goto|gosub|start lno|lbl|#pg:lno|#pg:lbl`: registers a callback for when the touch pointer has just been released
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
* `off touch`: unregisters a callback for when the touch pointer is being pressed
* `off touchd`: unregisters a callback for when the touch pointer has just been pressed
* `off touchu`: unregisters a callback for when the touch pointer has just been released

A touch callback is a routine that takes three parameters respectively for x, y of the touch position, and a third parameter for the source button type (can be one of the "Mouse buttons" constants) if it's triggered by a mouse. See the following callback signature for detail.

* signature of touch callback `(x, y, b)`
  * `x`: x position in pixels
  * `y`: y position in pixels
  * `b`: source button type (can be one of the "Mouse buttons" constants)

All touch callbacks by `goto`, `gosub` and `start` work with the manual update mode, and only callbacks by `start` work with the auto update mode.

// TODO

// TODO: Extension feature.

<!-- gem -->
