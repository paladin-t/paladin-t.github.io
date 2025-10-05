# Video Module

[Prev]() [Next]()

This section explains the basic concepts of the video module.

## Palette Layout

On Game Boy, the smallest unit on the screen is a pixel, and each pixel is represented by a 2-bit value, meaning we can say each pixel has a color depth of 4.

| Value | Color      |
|-------|------------|
| 0     | White      |
| 1     | Light gray |
| 2     | Dark gray  |
| 3     | Black      |

<img src="imgs/pipeline-palettes.png" class="diagram-image"></img>

On the DMG model, this means we can use 4 shades of gray. On the CGB, we can select a palette for a specific tile, with the pixel value determining which color to use.

**See also**: <a class="nav-link" href="https://gbdev.io/pandocs/Palettes.html" target="_blank">Palettes <i class="fa-solid fa-up-right-from-square"></i></a>.

## Tile Layout

Unlike modern computer systems, the GB's PPU is not well-suited for drawing each frame of the game screen pixel by pixel. Although you can do this, like other machines of that era, the GB's graphical primitives are optimized with tiles. Each tile consists of 8x8 pixels. Maps, sprites, scenes, actors, projectiles, etc. are all composed of tiles as patterns.

We've already learned that each pixel on the GB is represented by 2 bits. Each tile (i.e. 8x8 pixels) is divided into 8 rows, with each row's 8 pixels represented by 8 bits * 2 = 16 bits = 2 bytes. This means each row is represented by 2 bytes, with each bit of these two bytes representing the high and low bit depth values of a pixel respectively. Eight such pairs of bytes, i.e. 16 bytes, form one tile.

As shown in the image below, the first row of the tile is represented by the binary values `0b11111111` and `0b00000001`, which is `0xff`, `0x01`. The entire tile follows this rule.

<img src="imgs/pipeline-tile-processing.png" class="diagram-image"></img>

**See also**: <a class="nav-link" href="https://gbdev.io/pandocs/Tile_Data.html" target="_blank">VRAM Tile Data <i class="fa-solid fa-up-right-from-square"></i></a>

## Map Layout

The map is a contiguous area in VRAM where each element is an index reference to a tile, and references to tiles are arranged in order from left to right and top to bottom.

In VRAM, each bank has 256 tile graphic units indexed from 0 to 255 as source tiles for map data, with the latter 128 elements shared by maps and sprites.

In advanced graphical objects such as scenes, the viewport scrolls over these tile units, recycling them to display a scene much larger than the screen. These tiles are dynamically loaded as the viewport moves.

**See also**: <a class="nav-link" href="https://gbdev.io/pandocs/Tile_Maps.html" target="_blank">VRAM Tile Maps <i class="fa-solid fa-up-right-from-square"></i></a>.

## Sprite Layout

The Game Boy can display up to 40 movable objects (or sprites), each 8×8 or 8×16 pixels. And up to 10 per scanline. Sprites are rendered based on their index references to tiles.

In VRAM, each bank has 256 tile graphic units indexed from 0 to 255 as source tiles for sprite data, with the latter 128 elements shared by maps and sprites.

In advanced graphical objects such as actors, multiple animation frames and each frame itself can be composed of multiple underlying sprites. These 40 hardware sprite units are automatically and dynamically allocated to different actor frames.

**See also**: <a class="nav-link" href="https://gbdev.io/pandocs/OAM.html" target="_blank">Object Attribute Memory (OAM) <i class="fa-solid fa-up-right-from-square"></i></a>.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    <strong>See also</strong>: <a href="memory-map.html#vram-memory-map" class="nav-link">VRAM Memory Map</a>; <a href="page-not-found.html" class="nav-link">Tiles</a>, <a href="page-not-found.html" class="nav-link">Maps</a>, and <a href="page-not-found.html" class="nav-link">Sprites</a>.
  </span>
</div>
