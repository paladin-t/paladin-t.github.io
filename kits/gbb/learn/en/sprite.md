# Sprite

[Prev]() [Next]()

* `sprite on`: turns on the sprite layer
* `sprite off`: turns off the sprite layer

* `sprite id, x, y`: draws the sprite in VRAM to the screen at the specific position
  * `id`: the sprite ID
  * `x`: the x position in pixels
  * `y`: the y position in pixels

The position should be calculated as follows for plain sprites:

* x = Object's horizontal position on the screen + 8
* y = Object's vertical position on the screen + 16

For example, `sprite id, 8, 16` puts a sprite at the top-left corner of the screen, and `sprite id, 160, 152` puts a sprite at the bottom-right corner of the screen.

* `fill sprite(first, n) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`: fills the sprite area in VRAM
  * `first`: index of the first sprite tile to write to
  * `n`: the tile count
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: tiles page index
    * `#pg:n`: tiles page index and tile index
    * `name`: tiles asset name
* `def sprite(id) = t`: defines a sprite in VRAM
  * `id`: the sprite ID
  * `t`: the tile index

* `=get sprite(id)`: gets the tile value of the specific sprite
  * `id`: the sprite ID
  * returns the tile value
* `set sprite(id) = val`: sets the tile value of the specific sprite
  * `id`: the sprite ID
  * `val`: the tile value

* `=get sprite property(id, prop)`: gets the specific sprite's property
  * `id`: the sprite ID
  * `prop`: the property type; can be one of the following "Sprite properties" constants
  * returns the property value
* `set sprite property(id, prop) = val`: sets the specific sprite's property
  * `id`: the sprite ID
  * `prop`: the property type; can be one of the following "Sprite properties" constants
  * `val`: the property value

| Sprite properties | Value type | Default value     | Note                                                                  | Access     |
|-------------------|------------|-------------------|-----------------------------------------------------------------------|------------|
| `PALETTE_PROP`    | Integer    | `0`               | The palette color index used for this sprite; for colored device only | Read/write |
| `BANK_PROP`       | Integer    | `0`               | The VRAM bank used for this sprite; for colored device only           | Read/write |
| `OBJPAL_PROP`     | Integer    | `0` (OBJ0PAL)     | Whether to use colors come from OBJ0PAL or OBJ1PAL                    | Read/write |
| `HFLIP_PROP`      | Boolean    | `false`           | Whether to flip horizontally                                          | Read/write |
| `VFLIP_PROP`      | Boolean    | `false`           | Whether to flip vertically                                            | Read/write |
| `PRIORITY_PROP`   | Boolean    | `false`           | Whether to draw the sprite below the background and window            | Read/write |
| `HIDDEN_PROP`     | Boolean    | `false`           | Whether the sprite is hidden or visible                               | Read/write |

There is no dedicated builtin editor for producing sprite assets. Since sprite data is actually just tile slices, it accepts all kinds of tiles data as its content, and indices this data for appearance.

// TODO

// TODO: Explain flip, direction, rotate.
