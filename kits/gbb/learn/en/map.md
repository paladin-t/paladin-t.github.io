# Map

[Prev]() [Next]()

* `map on`: turns on the map layer
* `map off`: turns off the map layer

* `map x, y`: puts the map in VRAM on the screen at the specific position
  * `x`: the x position in pixels
  * `y`: the y position in pixels

* `fill map(first, n) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`: fills the map area in VRAM; this is equivalent to a `fill tile` operation
  * `first`: index of the first map tile to write to
  * `n`: the tile count
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: tiles page index
    * `#pg:n`: tiles page index and tile index
    * `name`: tiles asset name
* `def map(x, y, w, h, base_tile = 0[, pitch][, offset]) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`: defines the map area in VRAM
  * `x`: the x position in tiles in both the source tile map and hardware background map tile coordinates, with range of values from 0 to 255
  * `y`: the y position in tiles in both the source tile map and hardware background map tile coordinates, with range of values from 0 to 255
  * `w`: the width of area to set in tiles, with range of values from 1 to 255
  * `h`: the height of area to set in tiles, with range of values from 1 to 255
  * `base_tile`: the start index for map tiles
  * `pitch`: the number of tiles in a row of the map, omit to use the source width
  * `offset`: the offset value in bytes to be added to the source data address, omit to let the compiler determine
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: map page index
    * `#pg:n`: map page index and map layer
    * `name`: tiles asset name

In order to transfer map data in a way where the coordinates are not aligned, an offset from the source data address can be passed in `-(x + y * pitch)`; i.e. to draw source tiles start from (0, 0) to the destination area starts from (8, 7), then offset the source address with `-(8 + 7 * map_width)`.

* `=get map width(#pg|"{name}")`: gets the width in tiles of the specific map asset page
  * objectives:
    * `#pg`: map page index
    * `name`: map asset name
  * returns the width in tiles
* `=get map height(#pg|"{name}")`: gets the height in tiles of the specific map asset page
  * objectives:
    * `#pg`: map page index
    * `name`: map asset name
  * returns the height in tiles

* `=get map(x, y)`: gets the tile value of the current map at the specific position
  * `x`: the x position in tiles
  * `y`: the y position in tiles
  * returns the tile value
* `set map(x, y) = val`: sets the tile value of the current map at the specific position
  * `x`: the x position in tiles
  * `y`: the y position in tiles
  * `val`: the tile value

The map editor can produce map assets, press **Ctrl+3/Cmd+3** in edit mode to switch to the map tab. GB BASIC allows importing external formats as map, besides creating from scratch.

The hardware VRAM's map area is limited to 32x32 tiles. Although a map asset can be defined larger than this size in the asset editor, using the aforementioned map statements to fill the map will cause data to exceed this area. For complex scenes, consider using the [Scene](#scene) feature to support large maps, map scrolling, scene property definitions, object definitions, and more.

Map data for a `def map` operation can also come from inline code. This data is arranged one tile after another, from left to right and top to down.

// TODO
