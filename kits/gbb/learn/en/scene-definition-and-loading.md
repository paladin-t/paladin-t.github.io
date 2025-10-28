# Scene Definition and Loading

[Prev]() [Next]()

A `def scene` operation can only fill map, attribute and property data to scene; a `load scene` does it further to fill tiles, actors, triggers, and definitions from an asset page. They are similar but `load scene` should be preferred for most cases.

The scene editor can produce scene assets, press **Ctrl+4/Cmd+4** in edit mode to switch to the scene tab. GB BASIC allows importing external formats as scene, besides creating from scratch.

Scene data for a `def scene` operation can also come from inline code. This data is arranged with a header byte for layers mask (with range of values of the following "Scene layers" constants), then one layer after another according to the order of map, attributes and properties.

<!--
| Scene layers     | Value  |
|------------------|--------|
| Map layer        | `0x00` |
| Attribute layer  | `0x01` |
| Property layer   | `0x02` |
| Actor layer      | `0x04` |
| Definition layer | `0x08` |
| All layers       | `0x0F` |
-->
| Scene layers    | Value  |
|-----------------|--------|
| Map layer       | `0x00` |
| Attribute layer | `0x01` |
| Property layer  | `0x02` |

## Defining a Scene

* `def scene(w, h, base_tile = 0) = read|data ...|"{builtin}"|#pg|"{name}"`: defines a scene with map, attribute and property layers
  * `w`: the width of the scene in tiles
  * `h`: the height of the scene in tiles
  * `base_tile`: the start index for map tiles
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: scene page index
    * `name`: scene asset name
* `def scene() = nothing`: undefines a scene; this operation only resets the scene status, but does not resets graphics elements and objects

This operation only fills map, attribute and property data to scene. It doesn't load tiles, objects and definitions from an asset page.

## Loading a Scene

* `load scene(map_base_tile = 0, sprite_base_tile = 0, clear_objects = true) = #pg|"{name}"`: loads a scene with map, attribute, property, actor and definition layers from the specific asset page; it also resets all effects
  * `map_base_tile`: the start index for map tiles
  * `sprite_base_tile`: the start index for sprite tiles
  * `clear_objects`: whether to clear all objects including actors, triggers, projectiles and widgets before loading
  * objectives:
    * `#pg`: scene page index
    * `name`: scene asset name
* `load scene() = nothing`: unloads a scene; this operation resets the scene status, and deletes all objects including actors, triggers, projectiles and widgets; it also resets all effects

This operation fills everything including tiles, layers, objects and definitions from an asset page.

### Tile Allocation for Scenes

When a `load scene` statement is executed, the relevant scene tiles referenced by the map layer and actors are dynamically allocated into VRAM. This allocation typically starts from tile number 0 and increases sequentially.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <span>An example of tile allocation for scenes.</span>
    <br>
    <br>
    <img src="imgs/debugger-vram-scene-tile-allocation.png" class="diagram-image diagram-screenshot">
  </span>
</div>

<div class="content-warn" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    Note that excessively large maps or actors in a scene may occupy too many tiles, resulting in VRAM overflow and failure to render correctly.
  </span>
</div>

## Resetting a Scene

You can call `load scene() = nothing` to unload the current scene and clear the related objects. However, in actual projects, you would often need to reset more content, such as `kill` all other threads, reset the VRAM, `restore` the data sequence cursor, `randomize` the random seed, etc. The following snippet demonstrates a general-purpose scene reset subroutine. It is recommended that you add this to your codebase for your new-created projects.

```basic
ResetScene:
  ' Reset game scene.
  kill                      ' Recommended. Kill the other threads.
  memset(0x8000, 0, 0x2000) ' Recommended. Reset the VRAM.
  option VRAM_BANK, VRAM_BANK1
  memset(0x8000, 0, 0x2000)
  option VRAM_BANK, VRAM_BANK0
  load scene() = nothing    ' Recommended. Clear the scene and objects.
  restore                   ' Optional. Reset the data sequence cursor.
  randomize                 ' Optional. Initialize the random seed.
  return
```
<!-- prg
!edit, run, index="", title="Reusable snippet to reset a scene", style=""
ResetScene:
  ' Reset game scene.
  kill                      ' Recommended. Kill the other threads.
  memset(0x8000, 0, 0x2000) ' Recommended. Reset the VRAM.
  option VRAM_BANK, VRAM_BANK1
  memset(0x8000, 0, 0x2000)
  option VRAM_BANK, VRAM_BANK0
  load scene() = nothing    ' Recommended. Clear the scene and objects.
  restore                   ' Optional. Reset the data sequence cursor.
  randomize                 ' Optional. Initialize the random seed.
  return
-->
