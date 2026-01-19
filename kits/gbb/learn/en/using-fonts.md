# Using Fonts

[Prev]() [Next]()

Let's review the three screen modes of GB BASIC.

* `TEXT_MODE`: Supports outputting text in a terminal-like style using the `print` statement, with limited font customization
* `GRAPHICS_MODE`: Supports outputting text in bitmap mode using the `text` statement; does not support font customization
* `OBJECTS_MODE`: Supports outputting text using GUI widget statements like `label` and `menu`, with full font customization

This section explains how to use fonts in text mode and objects mode, font production, and some general font APIs.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="display-and-screen-modes.html#screen-modes" class="nav-link">Screen Modes</a>.
  </span>
</div>

## Font for Text Mode

Text mode supports custom tiles-based fonts. The character range supports extended ASCII (0-255), where each character is a fixed size of 8x8 pixels, for a total of 256 tiles.

<img src="imgs/editor-tiles-based-font.png" class="diagram-image diagram-screenshot">

<div class="small-note">Tiles-based font for text mode</div>

Use the regular `file tile` statement to load the font tiles into VRAM, noting that the starting tile index is `0`. Subsequently, any `print` call will use this font. Try the following example.

```basic
' Set the screen mode to text mode, it also fills the VRAM with the default font tiles.
option SCREEN_MODE, TEXT_MODE
' Fill with the custom font, it is a color reversed font in this program.
fill tile(0, 256) = #0
' Output with the new font tiles.
print "Hello World!"
```
<!-- prg
!edit, run, index="TILES:0", title="Customizing font for text mode", style=""
url://prgs/font-1.txt
-->

## Font for Objects Mode

Object mode fonts support TTF-based and bitmap-based types. The former supports the full UTF-8 encoded character set, while the latter supports the extended ASCII range (0-255). In addition, TTF-based fonts support variable width.

Try the following example.

```basic
map on
def label(0, 0, 12, 5, 1) = MAP_LAYER, 0, 0, 0
label #0, "The Quick Brown Fox\n"; ' With the built-in TTF font.
label #1, "Jumps Over"             ' With the custom TTF font.
label #2, "The Lazy Dog."          ' With the custom bitmap font.
```
<!-- prg
!edit, run, index="FONT:0", title="Customizing font for objects mode", style=""
url://prgs/font-2.txt
-->

## Font Production

<img src="imgs/editor-font-production.png" class="diagram-image diagram-screenshot">

<div class="small-note">Font production</div>

The font editor can produce and configure assets for `label`, and `menu`'s text drawing, press **Ctrl+6/Cmd+6** in edit mode 

| Font types   | Supported characters   | Variable width |
|--------------|------------------------|----------------|
| TTF          | UTF-8                  | Yes            |
| Bitmap-based | Extended ASCII (0-255) | No             |

## API

### Text Measurement

* `=width #pg|"{name}", txt`: measures the width of the specified text in pixels
  * objectives:
    * `#pg`: font page index
    * `name`: font asset name
  * `txt`: the text to measure; an escape with placeholder, stack, carriage return, new line or new page is not supported
  * returns the width in pixels
* `=height #pg|"{name}", txt`: measures the height of the specified text in pixels
  * objectives:
    * `#pg`: font page index
    * `name`: font asset name
  * `txt`: the text to measure; an escape with placeholder, stack, carriage return, new line or new page is not supported
  * returns the height in pixels

These functions are useful for determining the dimensions of text before drawing it on the screen, allowing for precise placement and alignment of GUI elements.

<!-- gem -->
