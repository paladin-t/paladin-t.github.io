# Declaring Graphical Resources

[Prev]() [Next]()

In this chapter, we will temporarily use inline data sequences to declare graphical resources for rapid prototyping. This approach allows us to complete our minimal game framework using code alone. In later chapters, we will introduce how to use the more comprehensive resources made in the editors.

## Tiles Data

We use the following image as tile-elements to construct our map later.

<img src="imgs/asset-tiles-simple-map.png" class="diagram-image"></img>

Following the tile pixel conversion rules introduced in the previous section, we convert the above pixel image into tile data as follows.

```basic
data 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
data 0xff, 0x01, 0x81, 0x7f, 0xbd, 0x7f, 0xa5, 0x7b, 0xa5, 0x7b, 0xbd, 0x63, 0x81, 0x7f, 0xff, 0xff
data 0x04, 0x04, 0x04, 0x04, 0x0a, 0x0a, 0x12, 0x12, 0x66, 0x00, 0x99, 0x77, 0x99, 0x77, 0x66, 0x66
```
<!-- prg
!edit, run, title="Tiles data", style=""
data 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
data 0xff, 0x01, 0x81, 0x7f, 0xbd, 0x7f, 0xa5, 0x7b, 0xa5, 0x7b, 0xbd, 0x63, 0x81, 0x7f, 0xff, 0xff
data 0x04, 0x04, 0x04, 0x04, 0x0a, 0x0a, 0x12, 0x12, 0x66, 0x00, 0x99, 0x77, 0x99, 0x77, 0x66, 0x66
-->

## Map Data

The above tile data consists of 3 tiles, with indices 0, 1, and 2 respectively. The Game Boy's 160x144 screen can be composed of 20x18 tiles, and references to tiles are arranged in order from left to right and top to bottom. The map design is as follows.

<img src="imgs/asset-map-simple-map.png" class="diagram-image"></img>

According to the rules, we list the map data as follows.

```basic
data 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1
data 1, 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 2, 2, 0, 0, 1
data 1, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1
data 1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 1
data 1, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
```
<!-- prg
!edit, run, title="Map data", style=""
data 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1
data 1, 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 2, 2, 0, 0, 1
data 1, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1
data 1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 1
data 1, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
-->

## Sprite Data

In 8-bit era game consoles and computers, sprites are commonly used to represent player characters, enemies, items, etc. Similarly, on the Game Boy, sprites consist of 8x8 or 8x16 pixel tiles.

Here we use an 8x8 pixel sprite tile for our game framework.

<img src="imgs/asset-tiles-simple-sprite.png" class="diagram-image"></img>

Its data is as follows.

```basic
data 0x5a, 0x3c, 0xe3, 0x42, 0x7c, 0x99, 0xeb, 0xa5, 0xfb, 0xa5, 0x66, 0x99, 0xe7, 0x42, 0x5a, 0x3c
```
<!-- prg
!edit, run, title="Sprite data", style=""
data 0x5a, 0x3c, 0xe3, 0x42, 0x7c, 0x99, 0xeb, 0xa5, 0xfb, 0xa5, 0x66, 0x99, 0xe7, 0x42, 0x5a, 0x3c
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    <strong>See also</strong>: <a href="video-module.html#palette-layout" class="nav-link">Palette Layout</a>, <a href="video-module.html#tile-layout" class="nav-link">Tile Layout</a>, <a href="video-module.html#map-layout" class="nav-link">Map Layout</a>, and <a href="video-module.html#sprite-layout" class="nav-link">Sprite Layout</a>.
  </span>
</div>
