# Progress Bar

[Prev]() [Next]()

## Adding a <code>progressbar</code> Widget

A progress bar occupies several horizontal map tiles. It fills from left to right to represent a state from empty to full.

The progress bar resource requires five tiles. As shown below, they represent the left border, full state, half-full state, empty state, and right border respectively.

<img src="imgs/debugger-vram-progressbar-tiles.png" class="diagram-image diagram-schematic">

In the map area of VRAM, some of these five tiles are reused and assembled to form a complete progress bar.

<img src="imgs/debugger-vram-progressbar-indexed.png" class="diagram-image diagram-schematic">

Try the following example.

```basic
map on
def label(0, 0, 11, 2, 6) = MAP_LAYER, 2, 0, 0 ' Takes tile indices from 6 to 28.
label #0, "ProgressBar Test"

def progressbar(0, 2, 8, 1) = MAP_LAYER, 1, 1  ' Takes tile indices from 1 to 5.
let p = 0
let d = 1
start prog
end

prog:
  p = p + d                                    ' Update the progress value.
  if p < 0 then
    p = 1
    d = 1
  else if p > 128 then
    p = 127
    d = -1
  end if
  progressbar p                                ' Refresh the progress bar.
  wait 1
  goto prog
```
<!-- prg
!edit, run, title="Using <code>progressbar</code> widget", style=""
url://prgs/progressbar-1.txt
-->

## API

* `def progressbar(x, y, w, base_tile = 0) = layer, margin_x = 0, margin_y = 0, palette_b = BLACK, palette_c = GRAY`: defines the progress bar area in VRAM and enables blit context, this operation also clears the target area
  * `x`: the offset in x-axis in tiles
  * `y`: the offset in y-axis in tiles
  * `w`: the width of the progress bar area in tiles
  * `base_tile`: the start index to define tiles for the progress bar
  * `layer`: the layer to put the progress bar; can be either `MAP_LAYER` or `WINDOW_LAYER` of the "Graphics layers" constants
  * `margin_x`: the margin in x-axis in pixels, with range of values from 0 to 15
  * `margin_y`: the margin in y-axis in pixels, with range of values from 0 to 15
  * `palette_b`: the border palette
  * `palette_c`: the content palette
* `progressbar val`: outputs the percent value to the screen as a progress bar's content
  * `val`: the percent value, with range of values from 0 to 128 for empty till full
* `progressbar val, x, y, w, base_tile, layer, margin_x, margin_y, palette_b = BLACK, palette_c = GRAY`: redefines some of the widget states, then outputs the percent value to the screen as a progress bar's content
  * `val`: the percent value, with range of values from 0 to 128 for empty till full
  * `x`: the offset in x-axis in tiles
  * `y`: the offset in y-axis in tiles
  * `w`: the width of the progress bar area in tiles
  * `base_tile`: the start index to define tiles for the progress bar
  * `layer`: the layer to put the progress bar; can be either `MAP_LAYER` or `WINDOW_LAYER` of the "Graphics layers" constants
  * `margin_x`: the margin in x-axis in pixels, with range of values from 0 to 15
  * `margin_y`: the margin in y-axis in pixels, with range of values from 0 to 15
  * `palette_b`: the border palette
  * `palette_c`: the content palette

Redefining is not required if a `progressbar val` were following up a `def progressbar(...) = ...`.
