# Sprite

[Prev]() [Next]()

## Making Sprites

There is no dedicated builtin editor for producing sprite assets. Since sprite data is actually just tile slices, it accepts all kinds of tiles data as its content, and indices this data for appearance.

## Using Sprites

The Game Boy hardware supports limited vertical or horizontal flipping for sprites. It does not support free rotation. If you need to express rotation, consider pre-making several assets (such as two-way or four-way) that have been rotated. The sprite itself does not have an orientation property; advanced properties including direction are provided by the [Actor](actor.html) module.

Try the following program.

```basic
sprite on
let x = 55
let y = 75
fill sprite(0, 1) = read
def sprite(0) = 0
sprite 0, x, y

loop:
  ' Press D-Pad to move the sprite.
  if btn(LEFT_BTN) then
    x = x - 1
    sprite 0, x, y
  else if btn(RIGHT_BTN) then
    x = x + 1
    sprite 0, x, y
  end if
  if btn(UP_BTN) then
    y = y - 1
    sprite 0, x, y
  else if btn(DOWN_BTN) then
    y = y + 1
    sprite 0, x, y
  end if
  ' Press A to show the sprite, B to hide it.
  if btnu(A_BTN) then
    sprite 0, x, y
  else if btnu(B_BTN) then
    set sprite property(0, HIDDEN_PROP) = true
  end if
  update
  goto loop

...
```
<!-- prg
!edit, run, title="Sprite", style=""
' Use arrow keys to move the sprite.
' Press A to show the sprite, B to hide it.

sprite on
let x = 55
let y = 75
fill sprite(0, 1) = read
def sprite(0) = 0
sprite 0, x, y

loop:
  ' Press D-Pad to move the sprite.
  if btn(LEFT_BTN) then
    x = x - 1
    sprite 0, x, y
  else if btn(RIGHT_BTN) then
    x = x + 1
    sprite 0, x, y
  end if
  if btn(UP_BTN) then
    y = y - 1
    sprite 0, x, y
  else if btn(DOWN_BTN) then
    y = y + 1
    sprite 0, x, y
  end if
  ' Press A to show the sprite, B to hide it.
  if btnu(A_BTN) then
    sprite 0, x, y
  else if btnu(B_BTN) then
    set sprite property(0, HIDDEN_PROP) = true
  end if
  update
  goto loop

data 0x5a, 0x3c, 0xe3, 0x42, 0x7c, 0x99, 0xeb, 0xa5
data 0xfb, 0xa5, 0x66, 0x99, 0xe7, 0x42, 0x5a, 0x3c
-->

## API

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

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="video-module.html" class="nav-link">Video Module</a>, and <a href="actor.html" class="nav-link">Actor</a>.
  </span>
</div>
