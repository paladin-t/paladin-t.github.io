# Scroll Shooting Controller

[Prev]() [Next]()

The scroll shooting genre is a cornerstone of game development, prevalent in arcade and action games. These games typically involve players controlling a character that moves within a limited area of a viewport while shooting at enemies, as the scene automatically scrolls. The player's goal is to survive the scrolling sequence and achieve a high score, facing enemies that attack from various directions. Non-player characters usually follow fixed movement patterns and bullet-firing logic. This section will explain how to configure an actor to use a scroll shooting controller in GB BASIC and enable it to interact with the world through movement, collision, and action triggers.

## Actor Asset Requirements

This section focuses on creating a player character. Non-player characters are covered in [Making a Non-Player Character](making-a-non-player-character.html).

<img src="imgs/asset-actor-frames-scroll-shooting.png" class="diagram-image diagram-schematic">

A scroll shooting player character asset requires at least 1 animation sequence, totaling 2 frames. This includes one or two frames for idle or moving in four directions. More frames can be added as needed. Non-player characters typically need the same amount of animation sequences and frames for all the motions.

Ensure the actor has properties like "8x16", "Size", and "Anchor" correctly set.

<img src="imgs/editor-actor-properties-for-scroll-shooting.png" class="diagram-image diagram-screenshot">

<div class="small-note">Actor properties</div>

Other properties like collision groups are user-defined. Refer to [Actor](actor.html) for details.

Most importantly, select "Scroll Shooting Player" as the actor's behaviour controller.

<img src="imgs/editor-actor-behaviour-for-scroll-shooting.png" class="diagram-image diagram-screenshot">

<div class="small-note">Actor behaviour</div>

## Scene Asset Requirements

For a scroll shooting game scene, "Use gravity" must be not specified during creation.

<img src="imgs/editor-scene-creating-without-gravity.png" class="diagram-image diagram-screenshot">

<div class="small-note">Creating scene without gravity</div>

Definitions related to camera, etc. can be adjusted as needed. Fields about gravity, jumping, climbing, etc. are not needed and ignored by scroll shooting controller.

<img src="imgs/editor-scene-definition-for-scroll-shooting.png" class="diagram-image diagram-screenshot">

<div class="small-note">Scene definition</div>

## Composing the Game

Populate the scene map. And don't forget to add the player actors, triggers, and etc. to the scene.

<img src="imgs/editor-scene-making-for-scroll-shooting.png" class="diagram-image diagram-screenshot">

<div class="small-note">Scroll Shooting scene</div>

Now run the game scene and try controlling the player actor.

```basic
' Prepare.
auto update on ' Turn on the auto update mode.

' Configure the scroll shooting controller.
call def_shooting RIGHT_DIR, 4, 1264

' Load the scene and all the objects.
load scene(0, 0) = #0

end
```
<!-- prg
!edit, run, title="Smallest scroll shooting setup", style=""
url://prgs/controller-scroll-shooting-1.txt
-->

See [Making a Non-Player Character](making-a-non-player-character.html) for non-player characters. This section explained the most basic usage of the scroll shooting controller. For this genre, you can add mechanics like triggers, enemies with various behaviours, items, scene transitions, tile animations, and etc. to complete a full game.

<!-- gem -->
