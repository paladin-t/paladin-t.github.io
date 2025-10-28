# Referencing to Map

[Prev]() [Next]()

## Map Data Composition

The table below outlines the data composition of a map.

| Layers           | Referencing to assets | Layout | Allocated in        | Required |
|------------------|-----------------------|--------|---------------------|----------|
| Map layer        | Tiles                 | Matrix | VRAM                | Yes      |
| Attributes layer |                       | Matrix | VRAM (colored only) |          |

## Creating Map Assets

The map layer is composed of assembled tiles. You can directly create a map that references a tiles asset page from the tiles editor itself.

<img src="imgs/editor-tiles-create-map.png" class="diagram-image diagram-screenshot">

<div class="small-note">Creating map from tiles</div>

Alternatively, click "New" in the map tab and select the source of the referenced tiles from the dialog box.

<img src="imgs/editor-map-creating.png" class="diagram-image diagram-screenshot">

<div class="small-note">Creating map from tiles or image</div>

Once a map asset is created, you can view or resolve its tiles reference in the editor.

<img src="imgs/editor-map-resolving-ref.png" class="diagram-image diagram-screenshot">

<div class="small-note">Maps reference to tiles</div>

## Map Layers

Switch to the "Graphics" layer in the map editor to paint the display layer of the map. This layer is required.

<img src="imgs/editor-map-layer-graphics.png" class="diagram-image diagram-screenshot">

<div class="small-note">Graphics layer</div>

Switch to the "Attributes" layer to paint the attribute layer of the map. This layer allows you to define the following attributes per tile. Note that these attributes are for colored devices only. This layer is optional and can be disabled.

* Palette index
* VRAM bank index
* Horizontal and vertical flip
* Drawing priority (whether it's beneath or above sprites)

<img src="imgs/editor-map-layer-attributes.png" class="diagram-image diagram-screenshot">

<div class="small-note">Attributes layer</div>
