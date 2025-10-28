# Palette

[Prev]() [Next]()

## Editing Palettes

A project's tiles and actors etc. share a same set of default palettes. The initial values for this data can be specified via the palette editor.

<img src="imgs/editor-palette.png" class="diagram-image diagram-screenshot">

<div class="small-note">Palette editor</div>

These palettes are linked into ROMs as runtime defaults and are also referenced for preview when editing graphical resources.

## Assigning Palette Color in Editor

GB BASIC supports assigning palette color in the map/scene and actor editors.

### Assigning Palette Color to Map and Scene Assets

In the map editor, you can switch to the attributes layer and assign a palette to each tile individually. The scene editor operates similarly and shares the same set of attributes with their map references.

<img src="imgs/editor-map-layer-attributes.png" class="diagram-image diagram-screenshot">

<div class="small-note">Attributes layer in map assets</div>

<img src="imgs/editor-scene-layer-attributes.png" class="diagram-image diagram-screenshot">

<div class="small-note">Attributes layer in scene assets</div>

Note that the attributes layer must be set to enabled.

<img src="imgs/editor-map-attributes-bits.png" class="diagram-image diagram-screenshot">

<div class="small-note">Attribute bits</div>

<details open>
<summary><b>Example</b></summary>
<div class="details-text">
Let's look at an example to illustrate how to use the attribute bits to set the map palette. First, draw 8x16 map tiles on the map to display all background layer palettes.

<img src="imgs/editor-map-without-palette.png" class="diagram-image diagram-screenshot">

<div class="small-note">Plain map tiles</div>

Then switch to the attributes layer and set the bits.

<img src="imgs/editor-map-palette-bits.png" class="diagram-image diagram-screenshot">

<div class="small-note">With palette bits</div>

Finally, we will achieve the following result.

<img src="imgs/editor-map-with-palette.png" class="diagram-image diagram-screenshot">

<div class="small-note">Colored map tiles</div>

</div>
</details>

Try the following program for how to set map palette in the map and scene editor.

![edit, run, style="width: 640px;"](imgs/editor-map-using-palette.png)
<!-- prg
!edit, run, index="MAP:0", title="Setting map palette", style=""
url://prgs/map-palette-1.txt
-->

### Assigning Palette Color to Actor Assets

In the actor editor, click the button to edit props.

<img src="imgs/editor-actor-props-editor.png" class="diagram-image diagram-screenshot">

<div class="small-note">Edit props.</div>

Edit the specific bits in the props. dialog that appears to specify palette color.

<img src="imgs/editor-actor-edit-props.png" class="diagram-image diagram-screenshot">

<div class="small-note">Props. editor for actors</div>

<details open>
<summary><b>Example</b></summary>
<div class="details-text">
Let's look at an example to illustrate how to use the props. bits to set the actor (sprite) palette. First, draw 4x8 map tiles on the map to display all sprite layer palettes.

<img src="imgs/editor-actor-without-palette.png" class="diagram-image diagram-screenshot">

<div class="small-note">Plain actor tiles</div>

Then open the props. editor and set the bits.

<img src="imgs/editor-actor-palette-bits.png" class="diagram-image diagram-screenshot">

<div class="small-note">With palette bits</div>

Finally, we will achieve the following result.

<img src="imgs/editor-actor-using-palette.png" class="diagram-image diagram-screenshot">

<div class="small-note">Colored actor (sprite) tiles</div>

</div>
</details>

Try the following program for how to set sprite palette in the actor editor.

![edit, run, style="width: 640px;"](imgs/editor-actor-with-palette.png)
<!-- prg
!edit, run, index="ACTOR:0", title="Setting actor palette", style=""
url://prgs/actor-palette-1.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    The first color index of each sprite palette is always transparent.
  </span>
</div>

## Changing Palette Color in Code

GB BASIC supports changing palette color in code by using the `palette` statement mentioned in this section.

<details open>
<summary><b>Example</b></summary>
<div class="details-text">
Now we place the map layer and actor layer in the same program and add some code to dynamically change gray-scales and colors using the `palette` statement.

<img src="imgs/editor-scene-dynamic-palette.png" class="diagram-image diagram-screenshot">

<div class="small-note">Colored background and actor tiles</div>

</div>
</details>

Try running the programs below and see the effect. Note that to observe the gray-scale effect, set the cartridge type to "classic"; to observe color changes, set the cartridge type to "colored". Some code of the same pattern has been omitted.

```basic
' Setup the program.
auto update on        ' Turn on the auto update mode.
load scene(0, 0) = #0 ' Load the scene.

' Setup the input handlers.
on btnu(A_BTN) start RandomizeMapPalette
on btnu(B_BTN) start RandomizeActorPalette
on btnu(UP_BTN) start FadeIn
on btnu(DOWN_BTN) start FadeOut

end

RandomizeMapPalette:
  ' Randomize the map palette.
  lock
    palette MAP_LAYER, 0, 0, rgb(rnd(255), rnd(255), rnd(255))
    palette MAP_LAYER, 0, 1, rgb(rnd(255), rnd(255), rnd(255))
    palette MAP_LAYER, 0, 2, rgb(rnd(255), rnd(255), rnd(255))
    palette MAP_LAYER, 0, 3, rgb(rnd(255), rnd(255), rnd(255))
    ...
  unlock
  end

RandomizeActorPalette:
  ' Randomize the actor palette.
  lock
    palette SPRITE_LAYER, 0, 0, rgb(rnd(255), rnd(255), rnd(255))
    palette SPRITE_LAYER, 0, 1, rgb(rnd(255), rnd(255), rnd(255))
    palette SPRITE_LAYER, 0, 2, rgb(rnd(255), rnd(255), rnd(255))
    palette SPRITE_LAYER, 0, 3, rgb(rnd(255), rnd(255), rnd(255))
    ...
  unlock
  end

FadeIn:
  ' Fade in.
  lock
    gosub Fade1
    wait 2
    gosub Fade2
    wait 2
    gosub Fade3
  unlock
  end

FadeOut:
  ' Fade out.
  lock
    gosub Fade2
    wait 2
    gosub Fade1
    wait 2
    gosub Fade0
  unlock
  end

FadeGrades:
  ' The four fade grades for map and sprite layers.
  Fade0:
    palette MAP_LAYER, 0b00000000
      palette MAP_LAYER, 0, 0, "BG0:0"
      palette MAP_LAYER, 0, 1, "BG0:0"
      palette MAP_LAYER, 0, 2, "BG0:0"
      palette MAP_LAYER, 0, 3, "BG0:0"
      ...
    palette SPRITE_LAYER, 0b00000000
      palette SPRITE_LAYER, 0, 0, "OBJ0:0"
      palette SPRITE_LAYER, 0, 1, "OBJ0:0"
      palette SPRITE_LAYER, 0, 2, "OBJ0:0"
      palette SPRITE_LAYER, 0, 3, "OBJ0:0"
      ...
    return
  Fade1:
    ...
  Fade2:
    ...
  Fade3:
    ...
```
<!-- prg
!edit, run, index="CODE:0", title="Dynamic palette", style=""
url://prgs/dynamic-palette-1.txt
-->

Alternatively, you can try the following program that has been pre-set with the cartridge property as "classic". Press Up to fade in on classic devices, Down to fade out.

![edit, run, style="width: 640px;"](imgs/running-palette-gray-scales.gif)
<!-- prg
!edit, run, index="SCENE:0", title="Changing gray-scales", style=""
url://prgs/dynamic-palette-2.txt
-->

And the following program that has been pre-set with the cartridge property as "colored". Press A to randomize the map palette on colored devices, B to randomize the actor palette.

![edit, run, style="width: 640px;"](imgs/running-palette-colors.gif)
<!-- prg
!edit, run, index="SCENE:0", title="Changing colors", style=""
url://prgs/dynamic-palette-1.txt
-->

## Changing Palette Indices in Code

To dynamically change which palette indices are used by maps in code, you can use `option VRAM_USAGE, VRAM_ATTRIBUTES` to switch to the attributes mode. Then call `set map(x, y) = val` to set the map's palette bits to achieve the change.

Similarly, to dynamically change which palette indices are used by sprites in code, you can use `set sprite property(id, PALETTE_PROP) = val` to set the sprite's palette property to achieve the change.

**See also**: <a class="nav-link" href="https://gbdev.io/pandocs/Palettes.html" target="_blank">Palettes <i class="fa-solid fa-up-right-from-square"></i></a>.

## API

### Color Constructors

On colored devices, colors are structured in BGR-555 bits. The following constructors facilitate color representation in code.

* `=rgb(r, g, b)`: creates an RGB color value from red, green and blue components
  * `r`: 8-bit unsigned integer; the red component, with range of values from 0 to 255
  * `g`: 8-bit unsigned integer; the green component, with range of values from 0 to 255
  * `b`: 8-bit unsigned integer; the blue component, with range of values from 0 to 255
  * returns the RGB color value; the format is bitpacked BGR-555 in a 16-bit unsigned integer
* `=rgb("{hex}")`: creates an RGB color value from a hexadecimal color string
  * `hex`: string representing a color in web hexadecimal format; supports `#RGB`, `#RRGGBB`, `#RGBA`, and `#RRGGBBAA` formats (the alpha channel is ignored)
  * returns the RGB color value; the format is bitpacked BGR-555 in a 16-bit unsigned integer
* `=hsv(h, s, v)`: creates an RGB color value from Hue, Saturation and Value components
  * `h`: the hue constant, with range of values from 0 to 360 for 0°~360°
  * `s`: the saturation constant, with range of values from 0 to 100 for 0%~100%
  * `v`: the value constant, with range of values from 0 to 100 for 0%~100%
  * returns the RGB color value; the format is bitpacked BGR-555 in a 16-bit unsigned integer

### Palette Functions

The following functions are used to assign grayscale values corresponding to 2 bits on classic devices.

* `palette layer, val`: sets the palette with four colors packed in one value
  * `layer`: the layer to operate; can be one of the "Graphics layers" constants, map and window layers are identical for this statement
  * `val`: the four colors that each one takes 2 bits and, can be one of the "2bpp colors" constants; the bit order is `(C3 LSHIFT 6) BOR (C2 LSHIFT 4) BOR (C1 LSHIFT 2) BOR (C0)`
* `palette layer, val, idx`: sets the palette with a color value for the specific index; the third `idx` parameter is only effective when the `layer` is `SPRITE_LAYER`
  * `layer`: the layer to operate; this version can only be `SPRITE_LAYER`
  * `val`: the four colors that each one takes 2 bits and, can be one of the "2bpp colors" constants; the bit order is `(C3 LSHIFT 6) BOR (C2 LSHIFT 4) BOR (C1 LSHIFT 2) BOR (C0)`
  * `idx`: the sprite palette index, 0 for OBJ0PAL, 1 for OBJ1PAL

The following functions are used to assign colors corresponding to entries in a specific palette on colored devices.

* `palette layer, plt, entry, val`: sets the palette with an RGB value for the specific slot; for colored device only
  * `layer`: the layer to operate; can be one of the "Graphics layers" constants, map and window layers are identical for this statement
  * `plt`: the palette index to modify, with range of value from 0 to 7
  * `entry`: the color index to modify, with range of value from 0 to 3
  * `val`: the RGB color value; the format is bitpacked BGR-555 in a 16-bit unsigned integer
* `palette layer, plt, entry, #pg:n|"{name:n}"`: sets the palette with an RGB value for the specific slot; for colored device only
  * `layer`: the layer to operate; can be one of the "Graphics layers" constants, map and window layers are identical for this statement
  * `plt`: the palette index to modify, with range of value from 0 to 7
  * `entry`: the color index to modify, with range of value from 0 to 3
  * objectives:
    * `#pg`: palette asset index, with range of value from `#0` to `#7` for "BG0" to "BG7", and `#8` to `#15` for "OBJ0" to "OBJ7"
      * `n`: color index, with range of value from 0 to 3
    * `name`: palette asset name, with range of value from "BG0" to "BG7", and "OBJ0" to "OBJ7"
      * `n`: color index, with range of value from 0 to 3

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="video-module.html" class="nav-link">Video Module</a>, and <a href="gray-scales-and-colors.html" class="nav-link">Gray-Scales and Colors</a>.
  </span>
</div>
