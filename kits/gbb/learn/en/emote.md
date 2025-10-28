# Emote

[Prev]() [Next]()

The drawing elements of an emote consist of hardware sprites and their associated tiles. The emote module raises small icons represented by 2x2 tiles, these icons are often used to express highlights and other emotions of characters.

A normal emotion icon takes four 8x8 sprites or two 8x16 sprites according to runtime state. When the mirrored flag is specified, the right half can be mirrored from the left, and it takes two 8x8 sprites or one 8x16 sprite. All 8x16 sprites are aligned to 2 tiles when referencing to them, meaning the starting tile index for each 8x16 emote should be an even number.

## Making Emotes

You can create emote assets in the tiles editor. To make use of emote resources, instantiate them using code. For example:

### Creating Emote Assets in Tiles Editor

Create emote assets in the tiles editor.

<img src="imgs/editor-tiles-making-emote.png" class="diagram-image diagram-screenshot">

<div class="small-note">Editing as emote</div>

Note that the order of tiles are different from how an emote looks like. The following diagram shows this relation. The order of tiles on the left is the editing sequence in the asset, while the right side shows the actual drawing result.

<img src="imgs/asset-emote.png" class="diagram-image diagram-schematic">

### Instantiating Emotes in Code

To instantiate emotes in code, use the `emote` statements.

```basic
' Prepare.
sprite on

on btnd(A_BTN) start RaiseEmote ' Press A to raise an emote.

end

RaiseEmote:
  ' Raise an emote.
  lock
    emote(79, 72, 1) = data _
      0x00,0x3f,0x00,0x40,0x01,0x80,0x01,0x80,0x01,0x80,0x01,0x80,0x01,0x80,0x01,0x80, _
      0x01,0x80,0x00,0x80,0x01,0x80,0x01,0x80,0x00,0x40,0x00,0x3f,0x00,0x03,0x00,0x01, _
      0x00,0xfc,0x00,0x02,0x80,0x01,0x80,0x01,0x80,0x01,0x80,0x01,0x80,0x01,0x80,0x01, _
      0x80,0x01,0x00,0x01,0x80,0x01,0x80,0x01,0x00,0x02,0x00,0xfc,0x00,0xc0,0x00,0x80
  unlock
  end
```
<!-- prg
!edit, run, title="Using emote in code", style=""
' Initialize the game.
auto update on ' Turn on the auto update mode,

' Prepare.
sprite on

on btnd(A_BTN) start RaiseEmote ' Press A to raise an emote.

end

RaiseEmote:
  ' Raise an emote.
  lock
    emote(79, 72, 0) = data _
      0x00,0x3f,0x00,0x40,0x01,0x80,0x01,0x80,0x01,0x80,0x01,0x80,0x01,0x80,0x01,0x80, _
      0x01,0x80,0x00,0x80,0x01,0x80,0x01,0x80,0x00,0x40,0x00,0x3f,0x00,0x03,0x00,0x01, _
      0x00,0xfc,0x00,0x02,0x80,0x01,0x80,0x01,0x80,0x01,0x80,0x01,0x80,0x01,0x80,0x01, _
      0x80,0x01,0x00,0x01,0x80,0x01,0x80,0x01,0x00,0x02,0x00,0xfc,0x00,0xc0,0x00,0x80
  unlock
  end
-->

## API

### Raising Emotes

* `emote(x, y, base_tile = 0, mirrored = false[, pal]) = read|data ...|"{builtin}"|#pg|"{name}"`: emotes with the specific tiles data
  * `x`: the x position to emote
  * `y`: the y position to emote
  * `base_tile`: the start index for sprite tiles
  * `mirrored`: whether the tiles data is mirrored
  * `pal`: the palette index to use, with range of values from 0 to 7; defaults to 0; for colored device only
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: tiles page index
    * `name`: tiles asset name
* `emote(dx = 0, dy = 0, base_tile = 0, mirrored = false[, pal]) with actor(id) = read|data ...|"{builtin}"|#pg|"{name}"`: emotes with the specific tiles data with the specific actor's relevant states (position)
  * `dx`: the offset x position to emote
  * `dy`: the offset y position to emote
  * `base_tile`: the start index for sprite tiles
  * `mirrored`: whether the tiles data is mirrored
  * `pal`: the palette index to use, with range of values from 0 to 7; defaults to 0; for colored device only
  * `id`: the actor ID to start with
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: tiles page index
    * `name`: tiles asset name

Try the following project, which demonstrates how to popup an emote.

![edit, run, style="width: 640px;"](imgs/running-emote.png)
<!-- prg
!edit, run, title="Playing with emote", style=""
url://prgs/emote-1.txt
-->
