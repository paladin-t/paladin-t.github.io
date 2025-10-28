# Gray-Scales and Colors

[Prev]() [Next]()

## Monochrome Gray-Scales

As mentioned earlier in [Palette Layout](video-module.html#palette-layout), each pixel on the Game Boy is represented by 2 bits, allowing for 4 shades of gray. On the DMG model, this directly corresponds to different gray-scales on the monochrome screen. On the CGB model, these 4 gray-scales from classic cartridges are replaced by 4 different colors.

## CGB Colors

To support more colors on the CGB model while maintaining compatibility with the DMG model, the CGB introduced a technique known as palettes. In this display method, each pixel is still defined by 2 bits, but each tile can reference a color palette. Each palette contains four 15-bit colors. Thus, a single tile can display up to 4 distinct colors. There are 8 separate palettes available for both the background and sprites, totaling 16 palettes. DMG hardware ignores these palettes and continues to determine the gray-scales using the 2 bits per pixel.

For [VRAM Memory Map](memory-map.html#vram-memory-map) on DMG devices, there is only bank 0 for VRAM. On CGB devices, it is divided into two banks - bank 0 and bank 1. By writing specific values to the attributes area in CGB VRAM bank 1, you can specify the palette, banking, flip, priority, etc. for the tile map, enabling the use of [CGB Features](memory-map.html#cgb-features) such as banking and colors for the background and sprites.

**See also**: <a class="nav-link" href="https://gbdev.io/pandocs/Palettes.html" target="_blank">Palettes <i class="fa-solid fa-up-right-from-square"></i></a>.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="palette.html" class="nav-link">Palette</a>.
  </span>
</div>

<!-- gem -->
