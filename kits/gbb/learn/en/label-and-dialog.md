# Label and Dialog

[Prev]() [Next]()

## Adding a <code>label</code> Widget

The `label` is the most basic GUI widget. It displays a piece of text and supports features like paging and custom background tiles.

```basic
map on
def label(0, 0, 7, 2, 65) = MAP_LAYER, 2, 0, 0    ' Define a label which takes tile indices from 65 to 78.
label #0, "Label Test"

window on
window 7, 111
def label(0, 0, 16, 4, 1) = WINDOW_LAYER, 2, 0, 0 ' Define a label which takes tile indices from 1 to 64.
label #0, "Hello World"
```
<!-- prg
!edit, run, title="Adding a <code>label</code> widget", style=""
url://prgs/label-1.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    The <code>def label</code> operation clears the target label area, while the <code>label</code> operation overlays the output text onto the existing content in VRAM.
  </span>
</div>

## Adding a Dialog with <code>label</code> Widget

GB BASIC does not have a dedicated dialog statement. Instead, this functionality is achieved by skillfully using the `label`'s paging, background, and typewriter input effect. Additionally, `label` will interrupt drawing and wait for player input when its tile area is full-filled, or when a page break is encountered, before continuing with subsequent text output. This feature enables the implementation of multi-page dialogs.

```basic
map on
def label(0, 0, 7, 2, 65) = MAP_LAYER, 2, 0, 0     ' Takes tile indices from 65 to 78.
label #0, "Dialog Test"

window on
window 7, 111
def label(2, 0, 16, 4, 1) = WINDOW_LAYER, 2, 2, 10 ' Takes tile indices from 1 to 64.
fill tile(1, 64) = #0                              ' Fill the background of the label area with dialog border.

label #0, "Hello World"                            ' Show some text.
label #0, "This is a dialog test, implemented with label."
label #0, "It supports escapes like %d,", 42
label #0, "and paging...\f"
for i = 111 to 144                                 ' Move down the window layer to hide the dialog.
  window 7, i
next
label #0, "\r";                                    ' Carriage return.
for i = 144 to 111 step -1                         ' Move up the window layer to show the dialog.
  window 7, i
next
label #0, "That's it :)"
```
<!-- prg
!edit, run, title="Adding a dialog with <code>label</code> widget", style=""
url://prgs/dialog-1.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="output.html" class="nav-link">Output</a> escapes.
  </span>
</div>

## API

* `def label(x, y, w, h, base_tile = 0) = layer, margin_x = 0, margin_y = 0, blit_interval = 10, x_offset = 0`: defines the label area in VRAM and enables blit context, this operation also clears the target area
  * `x`: the offset in x-axis in tiles
  * `y`: the offset in y-axis in tiles
  * `w`: the width of the label area in tiles
  * `h`: the height of the label area in tiles
  * `base_tile`: the start index to load tiles for the label
  * `layer`: the layer to put the label; can be either `MAP_LAYER` or `WINDOW_LAYER` of the "Graphics layers" constants
  * `margin_x`: the margin in x-axis in pixels, with range of values from 0 to 15
  * `margin_y`: the margin in y-axis in pixels, with range of values from 0 to 15
  * `blit_interval`: the interval frame count for character blit
  * `x_offset`: the x offset of the blit cursor in tiles, with range of values from 0 to 15
* `label #pg|"{name}", ...`: outputs numeric values to the screen as a GUI label's content
  * objectives:
    * `#pg`: font page index for the current label
    * `name`: font asset name
  * `...`: variadic data; numeric values separated by comma
* `label #pg|"{name}", fmt[, ...]`: outputs text and numeric values to the screen as a label's content
  * objectives:
    * `#pg`: font page index for the current label
    * `name`: font asset name
  * `fmt`: the format string, accepts the `print` "Escapes" for value interpretation
  * `...`: optional variadic data; numeric values separated by comma

Every `label` outputs a newline by default after all contents have been transferred, to let the next `label` starts from the same line instead of a new line, put a semicolon (`;`) at the end of the `label`.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="fonts-and-unicode.html" class="nav-link">Fonts and Unicode</a>.
  </span>
</div>

<!-- gem -->
