# Making a Player Character

[Prev]() [Next]()

In previous subsections, we explored three fundamental built-in controllers. Properly configuring and coding these controllers allows for the development of player characters for various game types. This section will focus on common behavioural design patterns associated with these controllers.

## Character Movement

Most of the time, player character movement is driven by user input. In earlier subsections, we achieved this by doing nothing more than adding player controllers to actors.

```basic
' Prepare.
auto update on ' Turn on the auto update mode.

sprite on
option SPRITE8x16_ENABLED, true

' Define the actor.
fill actor(0, 36) = #0
let a = new actor()
def actor(a, 80, 72, 0) = #0
```
<!-- prg
!edit, run, title="Simple character movement", style=""
url://prgs/character-player-1.txt
-->

However, there are additional details to consider.

### Gravity and Jumping

Gravity and jump related properties are configured in the scene definition, and these two categories are only applicable to platformer type controllers.

Try the program below.

![edit, run, style="width: 640px;"](imgs/editor-scene-definition-gravity-and-jumping.png)
<!-- prg
!edit, run, index="SCENE:0", title="Gravity and jumping", style=""
url://prgs/character-player-2.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="scene-properties.html" class="nav-link">Scene Properties</a>, and <a href="actor.html" class="nav-link">Actor</a>.
  </span>
</div>

### Aligning to Tile

Platformer, point&click, and scroll shooting type controllers allow characters to move freely along one or two coordinate axes within scenes, while the top-down type is special, it supports aligning to tiles in either 8x8 or 16x16 pixels. Although this alignment may be interrupted by collisions between actors or launching projectiles, the character will attempt to realign when moving again.

Try the program below. Move slowly and observe how the character aligns to tiles.

![edit, run, style="width: 640px;"](imgs/editor-scene-definition-16x16-grid.png)
<!-- prg
!edit, run, index="SCENE:0", title="Aligning to tile", style=""
url://prgs/character-player-3.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="scene-properties.html" class="nav-link">Scene Properties</a>.
  </span>
</div>

## Camera Following

The camera's following target is determined by an actor property. When an actor's "Following" property is enabled, the camera will follow it. Additionally, the scene's "Camera dead zone" property affects the boundary at which the camera starts moving with the character.

<img src="imgs/editor-actor-following-property.png" class="diagram-image diagram-screenshot">

<div class="small-note">Following property of actor</div>

Try the programs below.

![edit, run, style="width: 640px;"](imgs/editor-scene-definition-camera-dead-zone-for-platformer.png)
<!-- prg
!edit, run, title="Camera following for platformer controller", style=""
url://prgs/character-player-4.txt
-->

![edit, run, style="width: 640px;"](imgs/editor-scene-definition-camera-dead-zone-for-topdown.png)
<!-- prg
!edit, run, title="Camera following for top-down controller", style=""
url://prgs/character-player-5.txt
-->

![edit, run, style="width: 640px;"](imgs/editor-scene-definition-camera-dead-zone-for-scroll-shooting.png)
<!-- prg
!edit, run, title="Camera following for scroll shooting controller", style=""
url://prgs/character-player-6.txt
-->

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    Note that when a camera following target is specified, a scene with valid size is required, it can be set by loading from asset or calling <code>set scene property</code>.
  </span>
</div>

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="scene-properties.html" class="nav-link">Scene Properties</a>, and <a href="actor.html" class="nav-link">Actor</a>.
  </span>
</div>

## Launching Projectiles

Some games may allow player characters to launch projectiles to attack enemies. Note that projectiles themselves also have collision groups.

Try the programs below.

```basic
' Prepare.
auto update on ' Turn on the auto update mode.

' Load the scene and all the objects.
load scene(0, 0) = #0

' Setup the player.
let a = find actor("Player")
gosub SetupPlayer

end

SetupPlayer:
  ' Setup the projectile for the player.
  fill projectile(126, 2) = "Dart"
  def projectile(0, 126) = "Dart"

  on btnd(B_BTN) start OnLaunchProjectile
  return

  OnLaunchProjectile:
    ' Handle projectile launching.
    begin do
      start projectile(0) with actor(a)
      end
    end do
```
<!-- prg
!edit, run, title="Projectile as bullet", style=""
url://prgs/character-player-7.txt
-->

```basic
' Prepare.
auto update on ' Turn on the auto update mode.

' Load the scene and all the objects.
load scene(0, 0) = #0

' Setup the player.
let a = find actor("Player")
gosub SetupPlayer

end

SetupPlayer:
  ' Setup the projectile for the player.
  fill projectile(118, 10) = "Sword"                                   ' Setup the projectile.
  def projectile(0, 118) = "Sword"

  on btnd(B_BTN) start OnLaunchSwordProjectile
  return

  OnLaunchSwordProjectile:
    ' Handle projectile launching.
    begin def
      ' Make the player stand still.
      stop actor(a)
      control actor a, NONE_BEHAVIOUR
      play actor a, TO_IDLE

      ' Launch a projectile.
      start projectile(                                              _
        0,                                                           _ ' Type.
        0,                                                           _ ' Offset X.
        0,                                                           _ ' Offset Y.
        0,                                                           _ ' Offset angle.
        PROJECTILE_ANIMATION_NO_LOOP_FLAG bor PROJECTILE_STRONG_FLAG _ ' Flags.
      ) with actor(a)                                                  ' Player should be already initialized and assigned to `a`.

      ' Make the player movable.
      wait 20

      control actor a, TOPDOWN_PLAYER_BEHAVIOUR

      ' Finish.
      end
    end def
```
<!-- prg
!edit, run, title="Projectile as sword", style=""
url://prgs/character-player-8.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="projectile.html" class="nav-link">Projectile</a>.
  </span>
</div>

## Interacting with Scene

Interactions between player characters and scenes - such as collisions, climbing, and falling - are determined by the scene's properties layer.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="scene-layers.html" class="nav-link">Scene Layers</a>.
  </span>
</div>

## Character Collisions

In GB BASIC, whether collision events are triggered, along with their conditions and timing, is determined by the player controller, actor, projectile, and trigger modules. For collisions between actors, and between actors and projectiles, the collision group bits are evaluated. Objects sharing any common bit set to `1` are considered part of the same group; objects with no common bits set to `1` are in different groups. Events that trigger `on hits` can be categorized into two types: those triggered automatically and those triggered "on action" (i.e. by pressing an "action" key or clicking the mouse).

**Between actors**

When two actors collide, if they meet the criteria and have binded event callbacks, the callbacks for both actors will be invoked. Besides event triggering, the colliding actors might also stop moving. Details are as follows.

| Collision reactions           | Platformer player controller | Top-down player controller | Point&Click player controller | Scrol Shooting player controller |
|-------------------------------|------------------------------|----------------------------|-------------------------------|----------------------------------|
| Fires `on hits` automatically | Same group                   | Same group                 |                               | Same group                       |
| Fires `on hits` on action     | Different group              | Different group            | Any group (non-zero)          | Different group                  |
| Stops on collision            |                              | Same group                 |                               |                                  |

**Between actor and projectile**

When an actor and a projectile collide, the event callback binded to the actor is invoked. The projectile itself does not require and cannot have an event callback binded to it. For any built-in controller, it only interacts with projectiles that share at least one collision group bit set to `1`.

| Collision reactions           | Platformer player controller | Top-down player controller | Point&Click player controller | Scrol Shooting player controller |
|-------------------------------|------------------------------|----------------------------|-------------------------------|----------------------------------|
| Fires `on hits` automatically | Same group                   | Same group                 | Same group                    | Same group                       |

**Between actor and trigger**

When an actor and a trigger collide, the event callback binded to the trigger is invoked. Since triggers do not have group assignments, they can interact with any qualifying actor. Trigger collision callbacks are divided into `enter` and `leave` events.

| Collision reactions                   | Platformer player controller | Top-down player controller | Point&Click player controller | Scrol Shooting player controller |
|---------------------------------------|------------------------------|----------------------------|-------------------------------|----------------------------------|
| Fires `on hits` `enter` automatically | Any                          | Any                        |                               | Any                              |
| Fires `on hits` `leave` automatically | Any                          | Any                        |                               | Any                              |
| Fires `on hits` `enter` on action     |                              |                            | Any                           |                                  |

For instance, collision groups for players, player projectiles, enemies, and NPCs can be assigned as follows:

* Player: `0b11111101`
* Player's projectiles: `0b00000010` (inverse of player's collision group to avoid colliding with the owner player)
* Enemies: `0b00000011` (can collide with players or their projectiles)
* NPCs
  * Platformer: `0b00000000` (set to all zeros, only responds to "action")
  * Top-down: `0b00000000` (set to all zeros, only responds to "action")
  * Scroll Shooting: `0b00000000` (set to all zeros, only responds to "action")
  * Point&Click: `0b00000001` (must be non-zero to respond to "action")

You can design your own collision group convention for actual needs.

**See also:** _[Cheat Sheet of Collision Rules](https://paladin-t.github.io/kits/gbb/manual.html#cheat-sheet-of-collision-rules)._

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="platformer-controller.html" class="nav-link">Platformer Controller</a>, <a href="top-down-controller.html" class="nav-link">Top-down Controller</a>, <a href="point-and-click-controller.html" class="nav-link">Point&Click Controller</a>, and <a href="scroll-shooting-controller.html" class="nav-link">Scroll Shooting Controller</a>.
  </span>
</div>
