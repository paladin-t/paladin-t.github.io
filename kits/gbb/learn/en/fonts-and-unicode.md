# Fonts and Unicode

[Prev]() [Next]()

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    This chapter covers topics related to fonts and Unicode. The content here will be helpful when you want to customize GUI fonts or develop multilingual games.
  </span>
</div>

<details open>
<summary><b>Details</b></summary>
<div class="details-text">

## Filling Principles

This section briefly introduces the font filling algorithm, how strings reference glyphs, and placeholder handling in GB BASIC. This information does not affect using GB BASIC; you can read this part selectively or skip it.

### Mapping from Glyphs to Tiles

#### Screen Map Area Referencing Tiles

The Game Boy's video hardware is specifically optimized for tile-based graphics, not bitmaps. From the player's perspective, the text they see occupies a two-dimensional pixel space on the screen. This two-dimensional area needs to allocate tiles in the VRAM and establish references to those tiles in the map data area.

<img src="imgs/font-map-area-referencing-tiles.png" class="diagram-image diagram-schematic">

#### Glyph Pixel Encoding

Each Game Boy tile is an 8x8 2bpp pixel block. Depending on the font, size, etc. a glyph can be represented as a 2bpp or 1bpp pixel block ranging from 1x1 pixels to 16x16 pixels, and the size of each glyph can vary. For a single glyph, it will be packed into a series of bytes from left to right, top to bottom, as shown in the diagram below. The final byte size varies for different fonts, parameter settings, and characters.

<img src="imgs/font-glyph-pixel-encoding.png" class="diagram-image diagram-schematic">

#### Populating the Tile Area with Glyphs from Different Fonts

The process of filling glyph pixel information into underlying 8x8 tiles is similar to other tile-based filling on the Game Boy, with the added step of aligning non-fixed-size pixel mappings to 8x8 tiles during filling. When one character is finished filling, subsequent characters continue this process to its right, handling line breaks and other situations.

<img src="imgs/font-populating-glyph-to-tiles.png" class="diagram-image diagram-schematic">

### Mapping from Unicode Strings to Glyph Indices

#### Creating a Glyph List and Establishing References

TTF font files can contain thousands of characters for different languages. Baking all these glyphs into the final ROM is neither practical nor necessary. GB BASIC collects all characters in use at compile time, as well as characters that may be dynamically filled into placeholders at runtime, and bakes only these necessary characters as glyph pixel data stored in the final ROM.

<img src="imgs/font-glyph-list.png" class="diagram-image diagram-schematic">

#### Encoding a String into Glyph Indices

Each character in a string is encoded as the following structure.

```c-readonly
typedef struct glyph_t {
    UINT8 bank;
    UINT8 * ptr;
    UINT8 size;
} glyph_t;
```

A string is encoded as a sequence of these structures. And each element in the sequence references a specific glyph pixel area.

<img src="imgs/font-encoded-string.png" class="diagram-image diagram-schematic">

#### Placeholder Handling

GB BASIC supports replacing placeholders like `"%d"` and `"%x"` with corresponding characters at runtime. By default, the range of characters to be filled is extended ASCII (0-255).

You can also modify the set of supported replacement characters for the current project in the font's arbitrary dialog.

<img src="imgs/editor-font-arbitrary.png" class="diagram-image diagram-screenshot">

<div class="small-note">Font arbitrary</div>

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="video-module.html" class="nav-link">Video Module</a>.
  </span>
</div>

</div>
</details>

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    Some GUI widgets, such as <code>label</code> and <code>menu</code>, are closely related to font and text. Therefore, it is <strong>strongly recommended to read</strong> this chapter together with the previous one - <a href="gui.html" class="nav-link">GUI</a>.
  </span>
</div>
