# Graphics Primitives

[Prev]() [Next]()

This section introduces some graphics primitives that could be used under the <code>GRAPHICS_MODE</code> mode.

Try the following program.

```basic
randomize
loop:
  color rnd(0, 3), rnd(0, 3), rnd(0, 3)
  line rnd(0, 159), rnd(0, 143), rnd(0, 159), rnd(0, 143)
  if rnd(1) = 0 then
    rect rnd(0, 159), rnd(0, 143), rnd(0, 159), rnd(0, 143)
  else
    rectfill rnd(0, 159), rnd(0, 143), rnd(0, 159), rnd(0, 143)
  end if
  plot rnd(0, 159), rnd(0, 143)
  text rnd(0, 19), rnd(0, 17), "Hello"
  goto loop
```
<!-- prg
!edit, run, title="Graphics primitives", style=""
print "Press any key..."
wait_for_input:
  if not btnu then
    update
    goto wait_for_input
  end if

randomize
loop:
  color rnd(0, 3), rnd(0, 3), rnd(0, 3)
  line rnd(0, 159), rnd(0, 143), rnd(0, 159), rnd(0, 143)
  if rnd(1) = 0 then
    rect rnd(0, 159), rnd(0, 143), rnd(0, 159), rnd(0, 143)
  else
    rectfill rnd(0, 159), rnd(0, 143), rnd(0, 159), rnd(0, 143)
  end if
  plot rnd(0, 159), rnd(0, 143)
  text rnd(0, 19), rnd(0, 17), "Hello"
  goto loop
-->

## API

* `color fore_col, back_col, mode`: sets the color mode for graphics primitives
  * `fore_col`: the foreground color; can be one of the following "2bpp colors" constants
  * `back_col`: the background color; can be one of the following "2bpp colors" constants
  * `mode`: the color mode; can be one of the following "Paint modes" constants

| 2bpp colors | Value | Note               |
|-------------|-------|--------------------|
| `WHITE`     | `0`   | The lightest color |
| `SILVER`    | `1`   | -                  |
| `GRAY`      | `2`   | -                  |
| `BLACK`     | `3`   | The dimmest color  |

| Paint modes  | Note                           |
|--------------|--------------------------------|
| `SOLID_MODE` | Overwrites the existing pixels |
| `OR_MODE`    | Performs a logical OR          |
| `XOR_MODE`   | Performs a logical XOR         |
| `AND_MODE`   | Performs a logical AND         |

* `=point(x, y)`: reads the pixel value on the screen at the specific position
  * `x`: the x position in pixels
  * `y`: the y position in pixels
  * returns the pixel value on the screen
* `plot x, y`: plots a pixel at the specific position
  * `x`: the x position in pixels
  * `y`: the y position in pixels
* `line x0, y0, x1, y1`: draws a line according to the specific points
  * `x0`: the x position in pixels of the first point
  * `y0`: the y position in pixels of the first point
  * `x1`: the x position in pixels of the second point
  * `y1`: the y position in pixels of the second point
* `rect x0, y0, x1, y1`: draws a rectangle according to the specific points
  * `x0`: the x position in pixels of the first point
  * `y0`: the y position in pixels of the first point
  * `x1`: the x position in pixels of the second point
  * `y1`: the y position in pixels of the second point
* `rectfill x0, y0, x1, y1`: fills a rectangle according to the specific points
  * `x0`: the x position in pixels of the first point
  * `y0`: the y position in pixels of the first point
  * `x1`: the x position in pixels of the second point
  * `y1`: the y position in pixels of the second point
* `text x, y, ...`: outputs numeric values to the screen as graphical text
  * `x`: the x position in tiles
  * `y`: the y position in tiles
  * `...`: variadic data; numeric values separated by comma
* `text x, y, fmt[, ...]`: outputs text and numeric values to the screen as graphical text
  * `x`: the x position in tiles
  * `y`: the y position in tiles
  * `fmt`: the format string, accepts the `print` "Escapes" for value interpretation
  * `...`: optional variadic data; numeric values separated by comma

| Graphics layers | Note               |
|-----------------|--------------------|
| `MAP_LAYER`     | For background     |
| `WINDOW_LAYER`  | For overlay        |
| `SPRITE_LAYER`  | For active objects |

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="display-and-screen-modes.html#screen-modes" class="nav-link">Screen Modes</a>.
  </span>
</div>

<!-- gem -->
