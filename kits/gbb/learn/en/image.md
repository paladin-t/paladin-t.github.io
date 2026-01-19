# Image

[Prev]() [Next]()

This section introduces the `image` statement, which is used to draw an image conveniently. An `image` invoking can use either tiles or map as its source pixel data.

Try the following program.

```basic
image(1, 0, 0, MAP_LAYER) = with map #0 ' Initialize with the map-based image.

loop:
  ' Press A to show the map-based, B to show the tiles-based.
  if btnd(A_BTN) then
    image(1, 0, 0, MAP_LAYER) = with map #0 ' Draw the map-based image.
  else if btnd(B_BTN) then
    restore
    def map(0, 0, 20, 18) = read ' Clear the screen.
    image(1, 3, 2, 4, 4, MAP_LAYER) = with tile #0 ' Draw the tiles-based image.
  end if
  update
  goto loop

...
```
<!-- prg
!edit, run, title="Image", style=""
url://prgs/image-1.txt
-->

## API

* `image(first, x, y, w, h, layer = MAP_LAYER) = with tile read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`: draws an image from tiles data
  * `first`: index of the first image tile to write to
  * `x`: the x position in tiles to put the image
  * `y`: the y position in tiles to put the image
  * `w`: the width of the image in tiles
  * `h`: the height of the image in tiles
  * `layer`: the layer to put the image; can be either `MAP_LAYER` or `WINDOW_LAYER` of the "Graphics layers" constants
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: tiles page index
    * `#pg:n`: tiles page index and tile index
    * `name`: tiles asset name

The `image(...) = with tile ...` function simply draws tiles to the tiles and map area in VRAM.

* `image(first, x, y, layer = MAP_LAYER) = with map #pg|"{name}"`: draws an image from map data and its corresponding tiles
  * `first`: index of the first image tile to write to
  * `x`: the x position in pixels to put the image
  * `y`: the y position in pixels to put the image
  * `layer`: the layer to put the image; can be either `MAP_LAYER` or `WINDOW_LAYER` of the "Graphics layers" constants
  * objectives:
    * `#pg`: map page index
    * `name`: tiles asset name

The `image(...) = with map ...` function draws map and its corresponding tiles to VRAM. It has similar affect with the following code. When a map's "Optimize" option is turned on, the unused tiles are trimmed from the end.

```basic-readonly
map on                             ' Or `window on`, the following map related lines similarly operate either map or window depend on the target layer.

let w = get map width(#pg)
let h = get map height(#pg)
let n = w * h                      ' In final code, `n` depends on the tiles asset itself and the map's "Optimize" option.
fill tile(first, n) = #pg_t        ' `#pg_t` is the map's referenced tiles asset.

map x, y

option VRAM_USAGE, VRAM_ATTRIBUTES ' These two lines only execute when the map's attributes layer is enabled.
def map(0, 0, w, h, first) = #pg:1

option VRAM_USAGE, VRAM_TILES
def map(0, 0, w, h, first) = #pg:0
```

Drawing images will automatically turn on the map or window layer.
