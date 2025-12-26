# Point&Click Controller

[Prev]() [Next]()

The point-and-click genre is renowned for its focus on storytelling and puzzle-solving. These games typically involve players using a cursor to interact with the environment by selecting hotspots, collecting items for their inventory, and combining objects to solve logic-based challenges. The game environment is usually a richly detailed, static scene filled with interactive characters, dialogue trees, and essential story items. Non-player characters are central to the experience, providing clues and advancing the narrative through conversation. This section will explain how to configure an actor (typically the cursor) for point-and-click interactions in GB BASIC and enable it to examine, pick up, and use items within the scene.

## Actor Asset Requirements

This section focuses on creating a player character. Non-player characters are covered in [Making a Non-Player Character](making-a-non-player-character.html).

<img src="imgs/asset-actor-frames-pointnclick.png" class="diagram-image diagram-schematic">

A point&click player character asset requires at least 2 animation sequences, totaling 2 frames. This includes two frames representing the normal and clickable states of a user-controlled cursor respectively. More frames can be added as needed. The number of animations and frames required for non-player characters depends on specific requirements - for instance: using a single frame for static interactive objects, and multiple frames for objects with rich animations.

Ensure the actor has properties like "8x16", "Size", and "Anchor" correctly set.

<img src="imgs/editor-actor-properties-for-pointnclick.png" class="diagram-image diagram-screenshot">

<div class="small-note">Actor properties</div>

Other properties like collision groups are user-defined. Refer to [Actor](actor.html) for details.

Most importantly, select one of the "Point&Click" Players as the actor's behaviour controller.

<img src="imgs/editor-actor-behaviour-for-pointnclick.png" class="diagram-image diagram-screenshot">

<div class="small-note">Actor behaviour</div>

## Scene Asset Requirements

For a point&click game scene, "Use gravity" must be not specified during creation.

<img src="imgs/editor-scene-creating-without-gravity.png" class="diagram-image diagram-screenshot">

<div class="small-note">Creating scene without gravity</div>

Definitions related to camera, etc. can be adjusted as needed. Fields about gravity, jumping, climbing, etc. are not needed and ignored by point&click controller.

<img src="imgs/editor-scene-definition-for-pointnclick.png" class="diagram-image diagram-screenshot">

<div class="small-note">Scene definition</div>

## Composing the Game

Populate the scene map. And don't forget to add the player actor to the scene.

<img src="imgs/editor-scene-making-for-pointnclick.png" class="diagram-image diagram-screenshot">

<div class="small-note">Point&Click scene</div>

Now run the game scene and try controlling the player actor.

```basic
' Prepare.
auto update on ' Turn on the auto update mode.

' Load the scene and all the objects.
load scene(0, 0) = #0

end
```
<!-- prg
!edit, run, title="Smallest point&click setup", style=""
url://prgs/controller-point-and-click-1.txt
-->

See [Making a Non-Player Character](making-a-non-player-character.html) for non-player characters. This section explained the most basic usage of the point&click controller. For this genre, you can add mechanics like triggers, collectable items, dialogue trees, scene transitions, and etc. to complete a full game.

<!-- gem -->
