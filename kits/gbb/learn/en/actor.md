# Actor

[Prev]() [Next]()

The drawing elements of an actor consist of hardware sprites and their associated tiles.

## Making Actors

You can create actor objects in the actor editor. To make use of actor resources, instantiate them in the scene editor as well or using code.

### Creating Actor Assets in Actor Editor

Create actor assets in the actor editor.

<img src="imgs/editor-actor-new.png" class="diagram-image diagram-screenshot">

<div class="small-note">Creating actor assets</div>

<img src="imgs/editor-actor-painting.png" class="diagram-image diagram-screenshot">

<div class="small-note">Painting actor assets</div>

Each actor can be set to use either 8x8 or 8x16 sprites. But note that all sprites/actors in the scene must use either the 8x8 or 8x16 pixel size; these two sizes cannot be mixed at any given time. All 8x16 sprites are aligned to 2 tiles when referencing to them, meaning the starting tile index for each 8x16 sprite should be an even number.

<img src="imgs/editor-actor-8x16.png" class="diagram-image diagram-screenshot">

<div class="small-note">8x8 or 8x16</div>

### Setting Actor Properties

Each actor has its own set of properties.

<img src="imgs/editor-actor-definition.png" class="diagram-image diagram-screenshot">

<div class="small-note">Actor properties</div>

Below are common settings for key actor properties.

* **Hidden**: This property is typically turned off; enable it only for specific needs, such as an actor that starts invisible
* **Pinned**: This property is typically turned off; enable it only for specific needs, such as an actor fixed to a specific screen position
* **Persistent**: This property is typically turned off; enable it only for specific needs, such as an actor that does not deactivate when the scene scrolls
* **Following**: Enable this property for the player actor to allow camera following; keep it off for other actor types
* **Bounds**: Defines the actor's collision area and can be adjusted manually
* **Animations**: Defines the actor's animations for different behaviours, related to [Actor Behaviours](actor-behaviours.html)
* **Behaviour**: Defines the actor's behaviour, refer to [Actor Behaviours](actor-behaviours.html)
* **Collision group**: Defines the actor's collision group, refer to [Collision Detection and Response](collision-detection-and-response.html) and is related to [Actor Behaviours](actor-behaviours.html)

### Instantiating Actors in Scene Editor

Switch to and enable the actors layer in the scene editor to instantiate actors.

<img src="imgs/editor-scene-instantiating-actors.png" class="diagram-image diagram-screenshot">

<div class="small-note">Instantiating actors in scene editor</div>

### Instantiating Actors in Code

To instantiate actors in code, use the `new actor()` function; then set actors' properties using the `set actor property` statement. And use other statements to play animations, move actors, and so on.

```basic
' Prepare.
sprite on
option SPRITE8x16_ENABLED, true

' Fill the tiles for the actor.
fill sprite(0, 56) = "ElephantTiles"

' Create an actor.
let a = new actor()

' Set frames.
set actor property(a, FRAMES_PROP) = 0, "Elephant"
' Set position.
set actor property(a, POSITION_PROP) = 80, 72
' Manipulate animation.
set actor property(a, ANIMATION_PAUSED_PROP) = false
set actor property(a, ANIMATIONS_PROP) = data 0, 8, _ ' Set animations.
                                              0,4, 0,4, 0,4, 0,4, _
                                              0,4, 0,4, 0,4, 0,4
play actor a, 0 ' Play animation.
' Set the hit event handler.
on actor(a) hits start OnHits ' Does nothing in this program, this line only shows the syntax.
```
<!-- prg
!edit, run, title="Using actor in code", style=""
' Initialize the game.
auto update on ' Turn on the auto update mode.

' Prepare.
sprite on
option SPRITE8x16_ENABLED, true

' Fill the tiles for the actor.
fill sprite(0, 56) = "ElephantTiles"

' Create an actor.
let a = new actor()

' Set frames.
set actor property(a, FRAMES_PROP) = 0, "Elephant"
' Set position.
set actor property(a, POSITION_PROP) = 80, 72
' Manipulate animation.
set actor property(a, ANIMATION_PAUSED_PROP) = false
set actor property(a, ANIMATIONS_PROP) = data 0, 8, _ ' Set animations.
                                              0,4, 0,4, 0,4, 0,4, _
                                              0,4, 0,4, 0,4, 0,4
play actor a, 0 ' Play animation.
' Set the hit event handler.
on actor(a) hits start OnHits ' Does nothing in this program, this line only shows the syntax.

end

OnHits:
  ' Do something.
  end
-->

### Sprite Allocation for Actors

An actor's tiles are automatically compacted with tile reuse whenever possible to save VRAM space.

<img src="imgs/editor-actor-compacting.png" class="diagram-image diagram-screenshot">

<div class="small-note">Auto compacted sprites</div>

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <span>The compacted tiles for all actors are dynamically allocated into VRAM at runtime during loading.</span>
    <br>
    <br>
    <img src="imgs/debugger-vram-dynamic-sprite-allocation.png" class="diagram-image diagram-screenshot">
  </span>
</div>

## Looking up Actors

The `find actor` statement looks up actors by their name as defined in the asset editor. Additionally, it supports looking up actors by asset using methods like `#n`, etc. For example:

```basic
let a = find actor("Player")
...
```
<!-- prg
!edit, run, title="Finding an actor by its name", style=""
url://prgs/actor-lookup-1.txt
-->

The `find actor` statement also supports looking up actors by their controller. For example:

```basic
let a = find actor(TOPDOWN_PLAYER_BEHAVIOUR)
...
```
<!-- prg
!edit, run, title="Finding an actor by its controller", style=""
url://prgs/actor-lookup-2.txt
-->

By providing an optional second argument to `find actor` as the starting offset for the search, you can iterate through all actors.

```basic
let a = nothing
while true
  a = find actor("Slime", a)
  if a = nothing then
    exit
  end if
  ...
end while
```
<!-- prg
!edit, run, title="Iterating actors", style=""
url://prgs/actor-iteration-1.txt
-->

## Actor Routines

The `start actor` statement starts a dedicated thread for an actor instance. This thread can be used to initialize the actor and subsequently serve as its update routine, etc. GB BASIC reserves a stack space unit on this thread's stack as a parameter representing the owner actor of this thread.

```basic
let a = find actor("Npc1")
start actor a, BehaveNpc1
...
```
<!-- prg
!edit, run, title="Starting a thread on an actor", style=""
url://prgs/actor-threading-1.txt
-->

The [Event Binding](event-binding.html) section will provide a detailed introduction to actor behaviour events and collision events. This includes how to bind code both in the editor and in code, as well as a detailed explanation of thread parameters, etc.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="event-binding.html" class="nav-link">Event Binding</a> for more information about actor event callbacks.
  </span>
</div>

## API

### Allocating and Destroying Actors

* `=new actor()`: creates a new actor object
  * returns the created actor ID, or `nothing` if fails
* `del actor(id)`: deletes the specific actor object
  * `id`: the actor ID
* `del actor()`: deletes all the active actor objects

### Filling Actor Tiles and Defining Actors

* `fill actor(first, n) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`: fills the actor area in VRAM; this is equivalent to a `fill sprite` operation
  * `first`: index of the first sprite tile to write to
  * `n`: the tile count
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: tiles page index
    * `#pg:n`: tiles page index and tile index
    * `name`: tiles asset name
<!-- * `def actor(id, x, y, base_tile = 0) = read|data ...|"{builtin}"|#pg|"{name}"` -->
* `def actor(id, x, y, base_tile = 0) = "{builtin}"|#pg|"{name}"`: defines an actor with the specific (definition) data
  * `id`: the specific actor ID to define
  * `x`: the x position in pixels
  * `y`: the y position in pixels
  * `base_tile`: the start index for sprite tiles
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: actor page index
    * `name`: actor asset name

### Actor Properties

* `=get actor property(id, prop)`: gets the specific actor's property
  * `id`: the actor ID
  * `prop`: the property type; can be one of the following "Actor properties" constants
  * returns the property value
* `set actor property(id, prop) = val`: sets the specific actor's property
  * `id`: the actor ID
  * `prop`: the property type; can be one of the following "Actor properties" constants
  * `val`: the property value
* `set actor property(id, prop) = read|data ...|"{builtin}"|#pg|"{name}"`: sets the specific actor's property
  * `id`: the actor ID
  * `prop`: the property type; can be one of the following "Actor properties" constants
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: actor page index
    * `name`: actor asset name
* `set actor property(id, prop) = l, r, t, b`: sets the specific actor's property, in particular for `BOUNDS_PROP`
  * `id`: the actor ID
  * `prop`: the property type; can be one of the following "Actor properties" constants
  * `l`: the left edge of the bounds
  * `r`: the right edge of the bounds
  * `t`: the top edge of the bounds
  * `b`: the bottom edge of the bounds
* `set actor property(id, prop) = base, read|data ...|"{builtin}"|#pg|"{name}"`: sets the specific actor's property, in particular for `FRAMES_PROP`
  * `id`: the actor ID
  * `prop`: the property type; must be `FRAMES_PROP` here
  * `base`: the base tile
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
    * `#pg`: actor page index
    * `name`: actor asset name

| Actor properties              | Value type                                                       | Note                                                           | Access     |
|-------------------------------|------------------------------------------------------------------|----------------------------------------------------------------|------------|
| `ACTIVE_PROP`                 | Boolean                                                          | Whether the actor is active                                    | Read-only  |
| `ENABLED_PROP`                | Boolean                                                          | Whether the actor is enabled for refreshing when scene scrolls | Read/write |
| `HIDDEN_PROP`                 | Boolean                                                          | Whether the actor is hidden or visible                         | Read/write |
| `PINNED_PROP`                 | Boolean                                                          | Whether the actor is pinned on screen                          | Read/write |
| `PERSISTENT_PROP`             | Boolean                                                          | Whether the actor is persistent in scene                       | Read/write |
| `FOLLOWING_PROP`              | Boolean                                                          | Whether the actor is being followed by scene camera            | Read/write |
| `ANIMATION_LOOP_PROP`         | Boolean                                                          | Whether to loop the actor's animation                          | Read/write |
| `ANIMATION_PAUSED_PROP`       | Boolean                                                          | Whether the actor's animation is paused                        | Read/write |
| `MOVEMENT_INTERRUPT_PROP`     | Boolean                                                          | Whether to interrupt the actor's movement                      | Read/write |
| `POSITION_PROP`               | Point (16-bit unsigned integer for x, y)                         | The actor's position                                           | Write-only |
| `POSITION_X_PROP`             | Integer (16-bit unsigned)                                        | The actor's position in x-axis                                 | Read/write |
| `POSITION_Y_PROP`             | Integer (16-bit unsigned)                                        | The actor's position in y-axis                                 | Read/write |
| `DIRECTION_PROP`              | "Directions" (8-bit unsigned integer)                            | The actor's direction                                          | Read/write |
| `ANGLE_PROP`                  | Integer (8-bit unsigned)                                         | The actor's facing angle                                       | Read-only  |
| `BOUNDS_PROP`                 | Bounding box (8-bit signed integer for left, right, top, bottom) | The actor's bounding box                                       | Write-only |
| `BOUNDS_LEFT_PROP`            | Integer (8-bit signed)                                           | The left value of the actor's bounding box                     | Read/write |
| `BOUNDS_RIGHT_PROP`           | Integer (8-bit signed)                                           | The right value of the actor's bounding box                    | Read/write |
| `BOUNDS_TOP_PROP`             | Integer (8-bit signed)                                           | The top value of the actor's bounding box                      | Read/write |
| `BOUNDS_BOTTOM_PROP`          | Integer (8-bit signed)                                           | The bottom value of the actor's bounding box                   | Read/write |
| `BASE_TILE_PROP`              | Integer (8-bit unsigned)                                         | The actor's base tile index                                    | Read/write |
| `FRAMES_PROP`                 | Asset                                                            | The actor's animation frames                                   | Write-only |
| `FRAME_INDEX_PROP`            | Integer (8-bit unsigned)                                         | The actor's current frame index                                | Read/write |
| `ANIMATION_INTERVAL_PROP`     | Integer (8-bit unsigned)                                         | The actor's animation interval; defaults to 15                 | Read/write |
| `ANIMATIONS_PROP`             | Asset                                                            | The actor's animations                                         | Write-only |
| `ANIMATION_PROP`              | Asset                                                            | One animation of the actor's animations                        | Write-only |
| `ANIMATION_INDEX_PROP`        | Integer (8-bit unsigned)                                         | The actor's current animation index                            | Read/write |
| `MOVE_SPEED_PROP`             | Integer (8-bit unsigned)                                         | The actor's move speed; defaults to 1                          | Read/write |
| `BEHAVIOUR_PROP`              | "Actor behaviours"                                               | The actor's behaviour/controller                               | Read/write |
| `COLLISION_GROUP_PROP`        | Integer (8-bit unsigned)                                         | The actor's collision group                                    | Read/write |

| Directions  | Note                |
|-------------|---------------------|
| `DOWN_DIR`  | Downward direction  |
| `RIGHT_DIR` | Rightward direction |
| `UP_DIR`    | Upward direction    |
| `LEFT_DIR`  | Leftward direction  |
| `NONE_DIR`  | None direction      |

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

<!-- Extra kernels can provide more actor properties. -->

* `=len actor(#pg|"{name}")`: gets the total frame count of the specific actor
  * objectives:
    * `#pg`: actor page index
    * `name`: actor asset name
  * returns the actor's frame count
* `=get actor width(#pg|"{name}")`: gets the width in pixels of the specific actor
  * objectives:
    * `#pg`: actor page index
    * `name`: actor asset name
  * returns the width in pixels
* `=get actor height(#pg|"{name}")`: gets the height in pixels of the specific actor
  * objectives:
    * `#pg`: actor page index
    * `name`: actor asset name
  * returns the height in pixels

### Enumerating Actors

* `=find actor(template|#pg|"{name}"[, offset])`: finds any actor that matches the specific condition
  * objectives:
    * `template`: the template type, it equals to a valid actor page index or a wildcard in the following "Actor template" constants
    * `#pg`: actor page index
    * `name`: actor asset name
  * `offset`: the start actor ID; this is used to implement iteration over actors
  * returns the first matched actor ID, or `nothing` for not found
* `=find actor(bhvr[, offset])`: finds any actor that matches the specific condition
  * `bhvr`: the behaviour type; can be one of the "Actor behaviours" constants in the [Actor Controllers](actor-controllers.html) section
  * `offset`: the start actor ID; this is used to implement iteration over actors
  * returns the first matched actor ID, or `nothing` for not found

| Actor template | Note                                                      |
|----------------|-----------------------------------------------------------|
| `ANY_TEMPLATE` | Used with the `find` statement to select any active actor |

### Moving Actors

* `move actor(id, n = 0) with dx, dy, flags = MOVABLE_FOR_NONE_FLAG`: moves the actor with the relative offset
  * `id`: the actor ID
  * `n`: the specific frame count to wait for this moving
  * `dx`: the x offset in pixels
  * `dy`: the y offset in pixels
  * `flags`: whether to check collision during moving, see the following "Movement checking flags" constants
* `move actor(id, wait = true) to x, y, flags = MOVABLE_FOR_NONE_FLAG`: moves the actor to the specific position
  * `id`: the actor ID
  * `wait`: whether to wait for the current movement to finish before completing this moving
  * `x`: the x position in pixels
  * `y`: the y position in pixels
  * `flags`: whether to check collision during moving, see the following "Movement checking flags" constants
* `move actor(id)`: stops the specific actor from moving; is same to `stop actor(id)`
  * `id`: the actor ID, the only argument
* `move actor()`: stops all the actors from moving; is same to `stop actor()`
* `stop actor(id)`: stops the specific actor from moving; is same to `move actor(id)`
  * `id`: the actor ID
* `stop actor()`: stops all the actors from moving; is same to `move actor()`

| Movement checking flags       | Note                                                     |
|-------------------------------|----------------------------------------------------------|
| `MOVABLE_FOR_NONE_FLAG`       | Check for nothing                                        |
| `MOVABLE_FOR_COLLISIONS_FLAG` | Check for possible collisions only                       |
| `MOVABLE_FOR_FULL_FLAG`       | Check for possible collisions and gravity (if appliable) |

### Controlling Actors

* `control actor id, bhvr`: applies the specific actor controller to the actor
  * `id`: the actor ID
  * `bhvr`: the behaviour type; can be one of the "Actor behaviours" constants in the [Actor Controllers](actor-controllers.html) section

### Animating Actors

* `play actor id, anim`: plays the specific animation of the actor
  * `id`: the actor ID
  * `anim`: the animation index, with range of values from 0 to 7; the meaning of the values depends on the actor's controller, see the following "Actor animations" constants

| Actor animations | Platformer controller                     | Top-down controller                       | Point&Click controller | Scroll Shooting controller                |
|------------------|-------------------------------------------|-------------------------------------------|------------------------|-------------------------------------------|
| 0                | Downward idle                             | Downward idle                             | Normal                 | Downward idle                             |
| 1                | Rightward idle                            | Rightward idle                            | Hovering               | Rightward idle                            |
| 2                | Upward idle                               | Upward idle                               |                        | Upward idle                               |
| 3                | Leftward idle                             | Leftward idle                             |                        | Leftward idle                             |
| 4                | Move down                                 | Move down                                 |                        | Move down                                 |
| 5                | Move right                                | Move right                                |                        | Move right                                |
| 6                | Move up                                   | Move up                                   |                        | Move up                                   |
| 7                | Move left                                 | Move left                                 |                        | Move left                                 |
| 16               | Turn to idle without changing direction   | Turn to idle without changing direction   |                        | Turn to idle without changing direction   |
| 17               | Turn to moving without changing direction | Turn to moving without changing direction |                        | Turn to moving without changing direction |

### Threading of Actors

* `=start actor id, lno|lbl|#pg:lno|#pg:lbl`: starts a thread from the specific location, and assigns it to the specific actor as a `behave` routine
  * `id`: the actor ID
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
* `join actor id`: joins the specific thread assigned to the specific actor; will return when the thread is finished
  * `id`: the actor ID
* `kill actor id`: terminates the specific thread assigned to the specific actor
  * `id`: the actor ID
* `wait actor id`: lets the current thread assigned to the specific actor idle and wait for one dispatching cycle
  * `id`: the actor ID

### Actor Callbacks

* `on actor(id) hits start lno|lbl|#pg:lno|#pg:lbl`: registers a callback for when the specific actor hits another one or a projectile
  * `id`: the actor ID
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
  * **see also:** _[Cheat Sheet of Collision Rules](https://paladin-t.github.io/kits/gbb/manual.html#cheat-sheet-of-collision-rules)._
* `off actor(id) hits`: unregisters a callback for when the specific actor hits another one or a projectile
  * `id`: the actor ID

**Tips:** _All threads associated with an actor will be terminated after the actor is destroyed. For instance, using `del actor(...)` to delete the associated actor in one of the actor's threads will result in the subsequent code in this thread no longer being executed._

An actor's behaving (`start`) routine is a routine that takes one parameter for the actor itself. See the following routine signature for detail.

* signature of behaving routine `(a)`
  * `a`: the actor ID

An actor's `hits` callback is a routine that takes two parameters for the first and second objects respectively that collide with each other by default; it can also accept two extra parameters for target's collision group and hit direction, when the `ACTOR_HIT_WITH_DETAILS_ENABLED` feature is enabled, the direction value represents the direction from the first object toward the second object. When an actor collides with another, the first two parameters are both actors, when an actor collides with a projectile, the former is the actor and the latter is the projectile. An actor only collides with projectiles that share overlapping collision bits. See the following callback signature for detail.

* signature of `hits` callback `(obj0, obj1[, group, dir])`
  * `obj0`: the first object, either actor or projectile
  * `obj1`: the second object, either actor or projectile
  * `group`: the collision group of the second object; this is only available when the `ACTOR_HIT_WITH_DETAILS_ENABLED` feature is enabled
  * `dir`: the hit direction; this is only available when the `ACTOR_HIT_WITH_DETAILS_ENABLED` feature is enabled

All hit callbacks by `goto`, `gosub` and `start` work with the manual update mode, and only callbacks by `start` work with the auto update mode.

Actor assets' default behave threads and hit callbacks can be binded in the actor editor, the bindings will be assigned automatically during scene loading. These bindings can then be overridden for specific actor instances in the scene editor.

The actor editor can produce actor assets, press **Ctrl+5/Cmd+5** in edit mode to switch to the actor/projectile tab. GB BASIC allows importing external formats as actor/projectile, besides creating from scratch.

Actor data (frame, animations, animation) can also come from inline code. These data is arranged as following respectively. For frame data: it comes one sprite unit after another; in every unit, it is arranged as y offset from previous unit, x offset from previous unit, tile index, properties; it comes with an end mark (-128) at the end of the current frame. For animations data: it starts with a base index and frame count to fill in; then it comes one frame after another; in every frame, it is arranged as begin frame index plus end frame index. For animation data: it comes with an index pointing to the desired motion.

Try the following project, which demonstrates how to create and manipulate an actor.

![edit, run, style="width: 640px;"](imgs/running-actor.png)
<!-- prg
!edit, run, title="Playing with actor", style=""
url://prgs/actor-1.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="event-binding.html" class="nav-link">Event Binding</a>, and <a href="actor-behaviours.html" class="nav-link">Actor Behaviours</a>.
  </span>
</div>
