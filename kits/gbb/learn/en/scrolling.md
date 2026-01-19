# Scrolling

[Prev]() [Next]()

This section covers scrolling operations that shift the tilemap up or down by entire rows. For parallax scrolling effects across different scanlines, refer to the next section [Special Effects](special-effects.html).

Try the following program.

```basic
image(1, 0, 0, MAP_LAYER) = with map #0

loop:
  if btnd(UP_BTN) then
    scroll(2, 0, 16, 18, MAP_LAYER) with 0, 0, UP_DIR
  else if btnd(DOWN_BTN) then
    scroll(2, 0, 16, 18, MAP_LAYER) with 0, 0, DOWN_DIR
  else if btnd(START_BTN) then
    image(1, 0, 0, MAP_LAYER) = with map #0
  end if
  update
  goto loop
```
<!-- prg
!edit, run, title="Scrolling", style=""
url://prgs/scroll-1.txt
-->

## API

* `scroll(x, y, w, h, layer = WINDOW_LAYER) with t[, attr[, dir]]`: scrolls a rectangle area of VRAM tilemap one row up or down
  * `x`: the x position in tiles to scroll
  * `y`: the y position in tiles to scroll
  * `w`: the width of the area to scroll
  * `h`: the height of the area to scroll
  * `layer`: the layer to scroll; can be either `MAP_LAYER` or `WINDOW_LAYER` of the "Graphics layers" constants
  * `t`: the tile data to fill the bottom part of the area
  * `attr`: the attribute data to fill the bottom part of the area; defaults to 0; for colored device only
  * `dir`: the scroll direction; can be either `UP_DIR` or `DOWN_DIR` of the "Directions" constants; defaults to `UP_DIR`

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="special-effects.html" class="nav-link">Special Effects</a>.
  </span>
</div>

<!-- gem -->
