# Progress Bar

[Prev]() [Next]()

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

// TODO
