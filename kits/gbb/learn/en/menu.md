# Menu

[Prev]() [Next]()

* `def menu(x, y, w, h, base_tile = 0) = layer, margin_x = 0, margin_y = 0`: defines the menu area in VRAM and enables blit context, this operation also clears the target area
  * `x`: the offset in x-axis in tiles
  * `y`: the offset in y-axis in tiles
  * `w`: the width of the menu area in tiles
  * `h`: the height of the menu area in tiles
  * `base_tile`: the start index to load tiles for the menu
  * `layer`: the layer to put the menu; can be either `MAP_LAYER` or `WINDOW_LAYER` of the "Graphics layers" constants
  * `margin_x`: the margin in x-axis in pixels, with range of values from 0 to 15
  * `margin_y`: the margin in y-axis in pixels, with range of values from 0 to 15
* `menu #pg|"{name}", fmt0[, fmt1, ..., fmtN][, ...]`: outputs text and numeric values to the screen as a menu's content
  * objectives:
    * `#pg`: font page index for the current menu
    * `name`: font asset name
  * `fmt0`: the first line of the format string, accepts the `print` "Escapes" for value interpretation
  * `fmt1`: the second line of the format string, accepts the `print` "Escapes" for value interpretation
  * `fmtN`: the N+1th line of the format string, accepts the `print` "Escapes" for value interpretation
  * `...`: optional variadic data; numeric values separated by comma
* `menu nothing`: clears the content of the current menu

* `on menu() start lno|lbl|#pg:lno|#pg:lbl`: registers a callback for when user interacts with the current menu
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
* `off menu()`: unregisters a callback for when user interacts with the current menu

A menu callback is a routine that takes two parameters for the current menu item index and the event type; the event type can be one or more of the following "Events" constants. See the following callback signature for detail.

* signature of menu callback `(idx, evt)`
  * `idx`: the index of the current menu item
  * `evt`: the event type, can be one or more of the following "Events" constants

| Events    | Note                                                |
|-----------|-----------------------------------------------------|
| `ENTER`   | Occurs when a touch pointer enters a menu widget    |
| `LEAVE`   | Occurs when a touch pointer leaves a menu widget    |
| `CHANGE`  | Occurs when the active menu item has been changed   |
| `CONFIRM` | Occurs when the active menu item has been confirmed |

// TODO
