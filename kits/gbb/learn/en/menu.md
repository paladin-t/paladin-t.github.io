# Menu

[Prev]() [Next]()

## Adding a <code>menu</code> Widget

The menu widget is an area that can hold multiple lines of text, where each line represents a menu item. The player can select a menu item and confirm the interaction. The menu triggers `ENTER`, `LEAVE`, `CHANGE`, and `CONFIRM` events and calls a user callback.

Try the following example.

```basic
window on
window 7, 111
def menu(2, 0, 16, 4, 1) = WINDOW_LAYER, 2, 2 ' Menu background.
fill tile(1, 64) = #0                         ' Fill the menu background with border.

sprite on
fill sprite(0, 1) = #1
def sprite(0) = 0                             ' The cursor.
sprite 0, 14, 133

fill tile(65, 2) = #2
set map(1, 0) = 65                            ' The cursor position.

gosub LoadMainMenu

auto update on                                ' Turn on the auto update mode,
end                                           ' and let the runtime take over.

LoadMainMenu:
  menu nothing
  menu #0, "To sub menu 1", "To sub menu 2"
  on menu() start OnMainMenu
  return

LoadMenu1:
  menu nothing
  menu #0, "To sub menu 2", "To main menu"
  on menu() start OnMenu1
  return

LoadMenu2:
  ...

OnMainMenu:
  begin def
    def index = stack1                        ' These lines of stack references are allocated by the kernel for this type of callback.
    def event = stack0

    if event = ENTER then
      shell "^Hand"
    else if event = LEAVE then
      shell "^Pointer"
    end if
    set map(1, 0) = 65 + index
    let y = index * 13 + 133
    sprite 0, 14, y
    if event = CONFIRM then
      if index = 0 then
        gosub LoadMenu1
      else ' if index = 1 then
        gosub LoadMenu2
      end if
    end if
    end
  end def

OnMenu1:
  ...

OnMenu2:
  ...
```
<!-- prg
!edit, run, title="Using <code>menu</code> widget", style=""
url://prgs/menu-1.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    The <code>def menu</code> operation clears the target menu area, while the <code>menu</code> operation overlays the output text onto the existing content in VRAM.
  </span>
</div>

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="output.html" class="nav-link">Output</a> escapes.
  </span>
</div>

## API

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

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="fonts-and-unicode.html" class="nav-link">Fonts and Unicode</a>.
  </span>
</div>
