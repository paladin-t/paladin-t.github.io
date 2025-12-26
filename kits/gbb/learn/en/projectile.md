# Projectile

[Prev]() [Next]()

The drawing elements of a projectile consist of hardware sprites and their associated tiles. A projectile instance must be launched (with `start projectile`) from a template (defined with `def projectile`). GB BASIC supports up to 5 projectile templates and instances respectively.

## Making Projectiles

You can create projectile objects in the actor/projectile editor. To make use of projectile resources, instantiate them using code.

### Creating Projectile Assets in Actor/Projectile Editor

Create projectile assets in the actor/projectile editor.

<img src="imgs/editor-actor-as-projectile.png" class="diagram-image diagram-screenshot">

<div class="small-note">Editing as projectile</div>

### Instantiating Projectiles in Code

To instantiate projectiles in code, fill projectiles' tiles with the `fill projectile` statement; then define projectiles' properties with the `def projectile` statement. And launch projectiles with the `start projectile` statements. For example:

```basic
' Prepare.
sprite on
option SPRITE8x16_ENABLED, true

on btnd(A_BTN) start Launch ' Press A to launch a projectile.

' Fill the projectile tiles.
fill projectile(8, 2) = "BulletTiles"

' Define the projectile.
def projectile property(0, FRAMES_PROP            ) = 0, "Bullet"
def projectile property(0, BOUNDS_LEFT_PROP       ) = 0
def projectile property(0, BOUNDS_TOP_PROP        ) = 0
def projectile property(0, BOUNDS_RIGHT_PROP      ) = 8
def projectile property(0, BOUNDS_BOTTOM_PROP     ) = 8
def projectile property(0, BASE_TILE_PROP         ) = 8
def projectile property(0, ANIMATION_INTERVAL_PROP) = 15
def projectile property(0, ANIMATIONS_PROP        ) = data 0,4, 0,0, 0,0, 0,0, 0,0
def projectile property(0, LIFE_TIME_PROP         ) = 60
def projectile property(0, MOVE_SPEED_PROP        ) = 32
def projectile property(0, INITIAL_OFFSET_PROP    ) = 200
def projectile property(0, COLLISION_GROUP_PROP   ) = 0x01

end

Launch:
  ' Launch a projectile.
  start projectile(0, 80, 72)
  end
```
<!-- prg
!edit, run, title="Using projectile in code", style=""
' Initialize the game.
auto update on ' Turn on the auto update mode.

' Prepare.
sprite on
option SPRITE8x16_ENABLED, true

on btnd(A_BTN) start Launch ' Press A to launch a projectile.

' Fill the projectile tiles.
fill projectile(8, 2) = "BulletTiles"

' Define the projectile.
def projectile property(0, FRAMES_PROP            ) = 0, "Bullet"
def projectile property(0, BOUNDS_LEFT_PROP       ) = 0
def projectile property(0, BOUNDS_TOP_PROP        ) = 0
def projectile property(0, BOUNDS_RIGHT_PROP      ) = 8
def projectile property(0, BOUNDS_BOTTOM_PROP     ) = 8
def projectile property(0, BASE_TILE_PROP         ) = 8
def projectile property(0, ANIMATION_INTERVAL_PROP) = 15
def projectile property(0, ANIMATIONS_PROP        ) = data 0,4, 0,0, 0,0, 0,0, 0,0
def projectile property(0, LIFE_TIME_PROP         ) = 60
def projectile property(0, MOVE_SPEED_PROP        ) = 32
def projectile property(0, INITIAL_OFFSET_PROP    ) = 200
def projectile property(0, COLLISION_GROUP_PROP   ) = 0x01

end

Launch:
  ' Launch a projectile.
  start projectile(0, 79, 72)
  end
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="event-binding.html" class="nav-link">Event Binding</a> for more information about projectile event processing.
  </span>
</div>

## API

### Filling Projectile Tiles and Defining Projectiles

* `fill projectile(first, n) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`: fills the projectile area in VRAM; this is equivalent to a `fill sprite` operation
  * `first`: index of the first sprite tile to write to
  * `n`: the tile count
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: tiles page index
    * `#pg:n`: tiles page index and tile index
    * `name`: tiles asset name
<!-- * `def projectile(type, base_tile = 0) = read|data ...|"{builtin}"|#pg|"{name}"` -->
* `def projectile(type, base_tile = 0) = "{builtin}"|#pg|"{name}"`: defines an projectile with the specific data
  * `type`: the specific projectile template to define, with range of values from 0 to 4
  * `base_tile`: the start index for sprite tiles
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: projectile page index
    * `name`: projectile asset name

### Projectile Properties

#### Defining Properties of Projectile Templates

* `def projectile property(type, prop) = val`: sets the specific projectile's definition property
  * `type`: the projectile type, with range of values from 0 to 4
  * `prop`: the property type; can be one of the following "Projectile definition properties" constants
  * `val`: the property value
* `def projectile property(type, prop) = read|data ...|"{builtin}"|#pg|"{name}"`: sets the specific projectile's definition property
  * `type`: the projectile type, with range of values from 0 to 4
  * `prop`: the property type; can be one of the following "Projectile definition properties" constants
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: projectile page index
    * `name`: projectile asset name
* `def projectile property(type, prop) = l, r, t, b`: sets the specific projectile's definition property, in particular for `BOUNDS_PROP`
  * `type`: the projectile type, with range of values from 0 to 4
  * `prop`: the property type; must be `FRAMES_PROP` here
  * `l`: the left edge of the bounds
  * `r`: the right edge of the bounds
  * `t`: the top edge of the bounds
  * `b`: the bottom edge of the bounds
* `def projectile property(type, prop) = base, read|data ...|"{builtin}"|#pg|"{name}"`: sets the specific projectile's definition property, in particular for `FRAMES_PROP`
  * `type`: the projectile type, with range of values from 0 to 4
  * `prop`: the property type; must be `FRAMES_PROP` here
  * `base`: the base tile
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: projectile page index
    * `name`: projectile asset name

#### Getting and Setting Properties of Projectile Instances

* `=get projectile property(type, prop)`: gets the specific projectile's definition property
  * `type`: the projectile type, with range of values from 0 to 4
  * `prop`: the property type; can be one of the following "Projectile definition properties" constants
  * returns the property value
* `=get projectile property(id, prop)`: gets the specific projectile's instance property
  * `id`: the projectile ID
  * `prop`: the property type; can be one of the following "Projectile instance properties" constants
  * returns the property value
<!-- * `set projectile property(type, prop) = val`: sets the specific projectile's definition property
  * `type`: the projectile type, with range of values from 0 to 4
  * `prop`: the property type; can be one of the following "Projectile definition properties" constants
  * `val`: the property value -->
* `set projectile property(id, prop) = val`: sets the specific projectile's instance property
  * `id`: the projectile ID
  * `prop`: the property type; can be one of the following "Projectile instance properties" constants
  * `val`: the property value

| Projectile definition properties | Value type                                                       | Note                                                | Access     |
|----------------------------------|------------------------------------------------------------------|-----------------------------------------------------|------------|
| `BOUNDS_PROP`                    | Bounding box (8-bit signed integer for left, right, top, bottom) | The projectile's bounding box                       | Write-only |
| `BOUNDS_LEFT_PROP`               | Integer (8-bit signed)                                           | The left value of the projectile's bounding box     | Read/write |
| `BOUNDS_RIGHT_PROP`              | Integer (8-bit signed)                                           | The right value of the projectile's bounding box    | Read/write |
| `BOUNDS_TOP_PROP`                | Integer (8-bit signed)                                           | The top value of the projectile's bounding box      | Read/write |
| `BOUNDS_BOTTOM_PROP`             | Integer (8-bit signed)                                           | The bottom value of the projectile's bounding box   | Read/write |
| `BASE_TILE_PROP`                 | Integer (8-bit unsigned)                                         | The projectile's base tile index                    | Read/write |
| `FRAMES_PROP`                    | Asset                                                            | The projectile's animation frames                   | Write-only |
| `ANIMATION_INTERVAL_PROP`        | Integer (8-bit unsigned)                                         | The projectile's animation interval; defaults to 15 | Read/write |
| `ANIMATIONS_PROP`                | Asset                                                            | The projectile's animations                         | Write-only |
| `ANIMATION_PROP`                 | Asset                                                            | One animation of the projectile's animations        | Write-only |
| `LIFE_TIME_PROP`                 | Integer (8-bit unsigned)                                         | The projectile's life time                          | Read/write |
| `MOVE_SPEED_PROP`                | Integer (8-bit unsigned)                                         | The projectile's move speed; defaults to 1          | Read/write |
| `INITIAL_OFFSET_PROP`            | Integer (16-bit unsigned)                                        | The projectile's initial offset                     | Read/write |
| `COLLISION_GROUP_PROP`           | Integer (8-bit unsigned)                                         | The projectile's collision group                    | Read/write |

| Projectile instance properties | Value type                                                         | Note                                                                   | Access     |
|--------------------------------|--------------------------------------------------------------------|------------------------------------------------------------------------|------------|
| `ANIMATION_LOOP_PROP`          | Boolean                                                            | Whether to loop the projectile's animation                             | Read/write |
| `STRONG_PROP`                  | Boolean                                                            | Whether the projectile would pass through or be destroyed on collision | Read/write |
| `POSITION_PROP`                | Point (16-bit unsigned integer for x, y)                           | The projectile's position                                              | Write-only |
| `POSITION_X_PROP`              | Integer (16-bit unsigned)                                          | The projectile's position in x-axis                                    | Read/write |
| `POSITION_Y_PROP`              | Integer (16-bit unsigned)                                          | The projectile's position in y-axis                                    | Read/write |
| `FRAME_INDEX_PROP`             | Integer (8-bit unsigned)                                           | The projectile's frame cursor                                          | Read/write |
| `ANIMATION_INDEX_PROP`         | Integer (8-bit unsigned)                                           | The projectile's animation cursor                                      | Read/write |

The base value for movement speed controlled by the `MOVE_SPEED_PROP` property is 16, that is, dividing the property value by 16 gives the speed multiplier. As shown in the table below.

| Property value | Multiplier | Editor display value |
|----------------|------------|----------------------|
| 0              | 0.0        | x0                   |
| 1              | 0.0625     | x0.06                |
| 2              | 0.125      | x0.13                |
| ...            | ...        | ...                  |
| 15             | 0.9375     | x0.94                |
| 16             | 1.0        | x1                   |
| 17             | 1.0625     | x1.06                |
| ...            | ...        | ...                  |
| 254            | 15.875     | x15.88               |
| 255            | 15.9375    | x15.94               |

<!-- Extra kernels can provide more projectile properties. -->

#### Getting Information of Projectile Assets

* `=len projectile(#pg|"{name}")`: gets the total frame count of the specific projectile
  * objectives:
    * `#pg`: actor/projectile page index
    * `name`: actor/projectile asset name
  * returns the projectile's frame count
* `=get projectile width(#pg|"{name}")`: gets the width in pixels of the specific projectile
  * objectives:
    * `#pg`: actor/projectile page index
    * `name`: actor/projectile asset name
  * returns the width in pixels
* `=get projectile height(#pg|"{name}")`: gets the height in pixels of the specific projectile
  * objectives:
    * `#pg`: actor/projectile page index
    * `name`: actor/projectile asset name
  * returns the height in pixels

### Launching Projectiles

* `=start projectile(type, x, y, angle = 0, flags = PROJECTILE_NONE_FLAG)`: launches a projectile instance from the specific template
  * `type`: the projectile template type, with range of values from 0 to 4
  * `x`: the x position to launch the projectile
  * `y`: the y position to launch the projectile
  * `angle`: the angle to launch the projectile
  * `flags`: the launching flags, can be a combination of the following "Projectile flags" constants
  * returns the projectile ID
* `=start projectile(type, dx = 0, dy = 0, da = 0, flags = PROJECTILE_NONE_FLAG) with actor(id)`: launches a projectile instance from the specific template with the specific actor's relevant states (position, angle)
  * `type`: the projectile template type, with range of values from 0 to 4
  * `dx`: the offset x position to launch the projectile
  * `dy`: the offset y position to launch the projectile
  * `da`: the offset angle to launch the projectile
  * `flags`: the launching flags, can be a combination of the following "Projectile flags" constants
  * `id`: the actor ID to start with
  * returns the projectile ID
* `=start projectile(type, dx = 0, dy = 0, angle = 0, flags = PROJECTILE_NONE_FLAG) on actor(id)`: launches a projectile instance from the specific template at the specific actor's relevant position, but with the projectile's own angle
  * `type`: the projectile template type, with range of values from 0 to 4
  * `dx`: the offset x position to launch the projectile
  * `dy`: the offset y position to launch the projectile
  * `angle`: the angle to launch the projectile
  * `flags`: the launching flags, can be a combination of the following "Projectile flags" constants
  * `id`: the actor ID to start with
  * returns the projectile ID

| Projectile flags                    | Note                                                                   |
|-------------------------------------|------------------------------------------------------------------------|
| `PROJECTILE_NONE_FLAG`              | No flag                                                                |
| `PROJECTILE_ANIMATION_NO_LOOP_FLAG` | Whether to loop the projectile's animation                             |
| `PROJECTILE_STRONG_FLAG`            | Whether the projectile would pass through or be destroyed on collision |

**Tips:** _A projectile only collides with actors that share overlapping collision bits. And if a projectile's collision group property is equivalent to its launcher actor's, they may trigger an unexpected hit callback instantly on launching._

The actor editor can produce projectile assets, press **Ctrl+5/Cmd+5** in edit mode to switch to the actor/projectile tab. GB BASIC allows importing external formats as actor/projectile, besides creating from scratch.

Projectile data (frame, animations, etc.) can also come from inline code. These data is arranged as following respectively. For frame data: it comes one sprite unit after another; in every unit, it is arranged as y offset from previous unit, x offset from previous unit, tile index, properties; it comes with an end mark (-128) at the end of the current frame. For animations data: it starts with a base index and frame count to fill in; then it comes one frame after another; in every frame, it is arranged as begin frame index plus end frame index.

Try the following project, which demonstrates how to launch projectiles and interact with them.

![edit, run, style="width: 640px;"](imgs/running-projectile.png)
<!-- prg
!edit, run, title="Playing with projectile", style=""
url://prgs/projectile-1.txt
-->
