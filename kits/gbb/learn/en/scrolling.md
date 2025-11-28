# Scrolling

[Prev]() [Next]()

* `scroll(x, y, w, h, layer = WINDOW_LAYER) with t[, attr[, dir]]`: scrolls a rectangle area of VRAM tilemap one row up or down
  * `x`: the x position in tiles to scroll
  * `y`: the y position in tiles to scroll
  * `w`: the width of the area to scroll
  * `h`: the height of the area to scroll
  * `layer`: the layer to scroll; can be either `MAP_LAYER` or `WINDOW_LAYER` of the "Graphics layers" constants
  * `t`: the tile data to fill the bottom part of the area
  * `attr`: the attribute data to fill the bottom part of the area; defaults to 0; for colored device only
  * `dir`: the scroll direction; can be either `UP_DIR` or `DOWN_DIR` of the "Directions" constants; defaults to `UP_DIR`

// TODO

The Game Boy's hardware background layer has only one layer, but by cleverly arranging background tiles and modifying the viewport coordinate registers at the right interrupts, we can achieve a parallax scrolling effect.

// TODO: gif

To achieve this, we create the following asset.

// TODO: asset

And call the special effect statements with designed arguments.

```basic
' TODO
```
<!-- prg
!edit, run, title="TODO", style=""
' TODO
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    It should be noted that this effect is typically only used in platformer games.
  </span>
</div>

<!-- gem -->
