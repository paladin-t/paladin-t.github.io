# Label and Dialog

[Prev]() [Next]()

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

// TODO

<!-- gem -->
