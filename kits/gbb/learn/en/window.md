# Window

[Prev]() [Next]()

The drawing elements of window layer consist of hardware map and its associated tiles. It is similar to the map layer, but often used for other purposes like GUI, etc.

* `window on`: turns on the window layer
* `window off`: turns off the window layer

* `window x, y`: puts the window in VRAM on the screen at the specific position; (7, 0) is the top left corner of the screen in window coordinates
  * `x`: the x position in pixels, actual displayed location will be `x - 7`
  * `y`: the y position in pixels

* `fill window(first, n) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`: fills the window area in VRAM; this is equivalent to a `fill tile` operation
  * `first`: index of the first map tile to write to
  * `n`: the tile count
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: tiles page index
    * `#pg:n`: tiles page index and tile index
    * `name`: tiles asset name
* `def window(x, y, w, h, base_tile = 0[, pitch][, offset]) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`: defines the window area in VRAM
  * `x`: the x position in tiles in both the source tile map and hardware background window tile coordinates, with range of values from 0 to 255
  * `y`: the y position in tiles in both the source tile map and hardware background window tile coordinates, with range of values from 0 to 255
  * `w`: the width of area to set in tiles, with range of values from 1 to 255
  * `h`: the height of area to set in tiles, with range of values from 1 to 255
  * `base_tile`: the start index for window (map) tiles
  * `pitch`: the number of tiles in a row of the window (map), omit to use the source width
  * `offset`: the offset value in bytes to be added to the source data address, omit to let the compiler determine; see `def map` for more about this parameter
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: window (map) page index
    * `#pg:n`: window (map) page index and tile index
    * `name`: tiles asset name

* `=get window width(#pg|"{name}")`: gets the width in tiles of the specific window (map) asset page
  * objectives:
    * `#pg`: window (map) page index
    * `name`: window (map) asset name
  * returns the width in tiles
* `=get window height(#pg|"{name}")`: gets the height in tiles of the specific window (map) asset page
  * objectives:
    * `#pg`: window (map) page index
    * `name`: window (map) asset name
  * returns the height in tiles

* `=get window(x, y)`: gets the tile value of the current window at the specific position
  * `x`: the x position in tiles
  * `y`: the y position in tiles
  * returns the tile value
* `set window(x, y) = val`: sets the tile value of the current window at the specific position
  * `x`: the x position in tiles
  * `y`: the y position in tiles
  * `val`: the tile value

Window data for a `def window` operation can also come from inline code. This data is arranged one tile after another, from left to right and top to down.

// TODO
