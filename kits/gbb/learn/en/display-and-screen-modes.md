# Display and Screen Modes

[Prev]() [Next]()

## Basic Specification

The resolution of the screen is 160x144 pixels. With each pixel, you can work with 2 bits, which means that you can use 4 gray-scales or colors.

The following statements turn the screen on and off.

* `screen on`: turns on the screen
* `screen off`: turns off the screen

## Graphics Layers

A game frame is consisted of at most three layers.

* Map layer: for scene background
* Window layer: for HUD, GUI, and dialog boxes
* Sprite layer: for movable characters, projectiles, etc.

<div class="stacked-image-container">
  <div class="stacked-image-set">
    <div class="stacked-image">
      <img src="imgs/graphics-layer-map.png">
    </div>
    <div class="stacked-image">
      <img src="imgs/graphics-layer-window.png">
    </div>
    <div class="stacked-image">
      <img src="imgs/graphics-layer-sprite.png">
    </div>
  </div>
</div>

**See also**: <a class="nav-link" href="https://gbdev.io/pandocs/Rendering.html" target="_blank">Rendering overview <i class="fa-solid fa-up-right-from-square"></i></a>.

## Screen Modes

The following statement sets the screen mode.

* `screen mode`: sets the screen mode
  * `mode`: the screen mode; can be one of the following "Screen modes" constants

| Screen modes    | Note                                                                                                                                                                                                                                                                                                                                                                                                               |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `TEXT_MODE`     | For [print](https://paladin-t.github.io/kits/gbb/manual.html#output)                                                                                                                                                                                                                                                                                                                                               |
| `GRAPHICS_MODE` | For [graphics primitives](https://paladin-t.github.io/kits/gbb/manual.html#graphics)                                                                                                                                                                                                                                                                                                                               |
| `OBJECTS_MODE`  | For [map](https://paladin-t.github.io/kits/gbb/manual.html#map), [sprite](https://paladin-t.github.io/kits/gbb/manual.html#sprite), [scene](https://paladin-t.github.io/kits/gbb/manual.html#scene), [actor](https://paladin-t.github.io/kits/gbb/manual.html#actor), [projectile](https://paladin-t.github.io/kits/gbb/manual.html#projectile), [GUI](https://paladin-t.github.io/kits/gbb/manual.html#gui), etc. |
