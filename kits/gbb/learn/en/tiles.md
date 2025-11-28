# Tiles

[Prev]() [Next]()

* `fill tile(first, n) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`: fills the tiles area in VRAM
  * `first`: index of the first tile to write to
  * `n`: the tile count
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: tiles page index
    * `#pg:n`: tiles page index and tile index
    * `name`: tiles asset name

* `=get tile len(#pg)`: gets the tile count of the specific asset page
  * objectives:
    * `#pg`: tiles page index
  * returns the tile count

The tiles editor can produce tiles assets, press **Ctrl+2/Cmd+2** in edit mode to switch to the tiles tab. GB BASIC allows importing external images and other formats as tiles, besides creating from scratch.

Tiles data for a `fill tile` operation can also come from inline code. This data is arranged one tile after another, line by line; each line has 8 pixels, since each pixel in GB BASIC is 2bpp, a line is encoded by 2 bytes, where a bit from the first byte encodes the lower bit of a pixel, and the corresponding bit from the second byte encodes the higher part.

// TODO

// TODO: Tiles layout in VRAM.
// TODO: How to reduce VRAM usage?
