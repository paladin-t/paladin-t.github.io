# Scene Layers

[Prev]() [Next]()

## Scene Data Composition

The table below outlines the data composition of a scene.

| Layers and Definition | Referencing to assets | Defined in scene | Layout | Allocated in        | Required |
|-----------------------|-----------------------|------------------|--------|---------------------|----------|
| Map layer             | Map                   |                  | Matrix | VRAM                | Yes      |
| Attributes layer      | Map                   |                  | Matrix | VRAM (colored only) |          |
| Properties layer      |                       | Yes              | Matrix | RAM                 |          |
| Triggers layer        |                       | Yes              | List   | RAM                 |          |
| Actors layer          | Actors                |                  | List   | RAM + VRAM          |          |
| Scene definition      |                       | Yes              | Fields | RAM                 | Yes      |

Additionally, dynamic objects such as projectiles and emotes are not included in the scene but are created by code.

All these objects and data will be explained in detail in subsequent sections.

You can create scene assets in the scene editor. To make use of scene resources, load them using code.

## Creating Scene Assets

A scene asset is based on a map asset. To create a scene asset, you need to create a map asset first. You can directly create a scene that references a map asset page from the map editor itself.

<img src="imgs/editor-map-create-scene.png" class="diagram-image diagram-screenshot">

<div class="small-note">Creating scene from map</div>

Alternatively, click "New" in the scene tab and select the source of the referenced map from the dialog box.

<img src="imgs/editor-scene-creating.png" class="diagram-image diagram-screenshot">

<div class="small-note">Creating scene from map</div>

Once a scene asset is created, you can view or resolve its map reference in the editor.

<img src="imgs/editor-scene-resolving-ref.png" class="diagram-image diagram-screenshot">

<div class="small-note">Scenes reference to maps</div>

## Scene Layers

Switch to the "Actors" layer in the scene editor to put and organize actors within the scene. This layer is optional and can be disabled.

<img src="imgs/editor-scene-layer-actors.png" class="diagram-image diagram-screenshot">

<div class="small-note">Actors layer</div>

Switch to the "Triggers" layer in the scene editor to put and organize triggers within the scene. This layer is optional and can be disabled.

<img src="imgs/editor-scene-layer-triggers.png" class="diagram-image diagram-screenshot">

<div class="small-note">Triggers layer</div>

Switch to the "Properties" layer to paint the properties of the map. This layer allows you to define the following properties per tile. This layer is optional and can be disabled.

* Blocking in left, right, up, and down directions
* Ladder mark (whether this tile is climbable for a corresponding actor, i.e. a platformer-controlled one)

<img src="imgs/editor-scene-layer-properties.png" class="diagram-image diagram-screenshot">

<div class="small-note">Properties layer</div>

Switch to the "Attributes" layer to paint the attribute layer of the map. This layer shares the same data with the map asset that the scene references. This layer is optional and can be disabled.

<img src="imgs/editor-scene-layer-attributes.png" class="diagram-image diagram-screenshot">

<div class="small-note">Attributes layer</div>

Switch to the "Graphics" layer in the map editor to paint the display layer of the map. This layer shares the same data with the map asset that the scene references. This layer is required.

<img src="imgs/editor-scene-layer-map.png" class="diagram-image diagram-screenshot">

<div class="small-note">Map layer</div>

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="page-not-found.html" class="nav-link">Map</a> for layers defined in map assets; <a href="display-and-screen-modes.html" class="nav-link">Display and Screen Modes</a> for layers in the hardware context; and <a href="page-not-found.html" class="nav-link">SGB Features</a> for extended border supported by SGB models.
  </span>
</div>
