# Top-down Controller

[Prev]() [Next]()

The top-down genre is a cornerstone of game development, prevalent in adventure, RPG, and shooter games. These games typically involve players controlling a character that moves freely in all directions across a map, interacting with objects, engaging in combat, and exploring environments. The game world is usually viewed from an overhead perspective and includes elements such as obstacles, non-player characters, and collectible items. Non-player characters often follow predefined paths or simple AI behaviours. This section will explain how to configure an actor to use a top-down controller in GB BASIC and enable it to interact with the world through movement, collision, and action triggers.

## Actor Asset Requirements

This section focuses on creating a player character. Non-player characters are covered in [Making a Non-Player Character](making-a-non-player-character.html).

<img src="imgs/asset-actor-frames-topdown.png" class="diagram-image diagram-schematic">

A top-down player character asset requires at lease 4-8 animation sequences, totaling 8-12 frames. This includes 8 frames for walking in four directions, and optionally 4 frames for idleing in each direction. More frames can be added as needed. Non-player characters typically need the same amount of animation sequences and frames for all the motions.

Ensure the actor has properties like "8x16", "Size", and "Anchor" correctly set.

<img src="imgs/editor-actor-properties-for-topdown.png" class="diagram-image diagram-screenshot">

<div class="small-note">Actor properties</div>

Other properties like collision groups are user-defined. Refer to [Actor](actor.html) for details.

Most importantly, select "Topdown Player" as the actor's behaviour controller.

<img src="imgs/editor-actor-behaviour-for-topdown.png" class="diagram-image diagram-screenshot">

<div class="small-note">Actor behaviour</div>

## Scene Asset Requirements

For a top-down game scene, "Use gravity" must be not specified during creation.

<img src="imgs/editor-scene-creating-without-gravity.png" class="diagram-image diagram-screenshot">

<div class="small-note">Creating scene without gravity</div>

Definitions related to camera, etc. can be adjusted as needed. Fields about gravity, jumping, climbing, etc. are not needed and ignored by top-down controller.

<img src="imgs/editor-scene-definition-for-topdown.png" class="diagram-image diagram-screenshot">

<div class="small-note">Scene definition</div>

## Composing the Game

Populate the scene map, remembering to set passability properties for elements like earth, buildings, plants, and etc. And don't forget to add the player actor to the scene.

<img src="imgs/editor-scene-making-for-topdown.png" class="diagram-image diagram-screenshot">

<div class="small-note">Top-down scene</div>

Now run the game scene and try controlling the player actor.

```basic
' Prepare.
auto update on ' Turn on the auto update mode.

' Load the scene and all the objects.
load scene(0, 0) = #0

end
```
<!-- prg
!edit, run, title="Smallest top-down setup", style=""
url://prgs/controller-top-down-1.txt
-->

See [Making a Non-Player Character](making-a-non-player-character.html) for non-player characters. This section explained the most basic usage of the top-down controller. For this genre, you can add mechanics like triggers, projectiles, various enemies, traps, scene transitions, tile animations, and etc. to complete a full game.

<!-- gem -->
