# Platformer Controller

[Prev]() [Next]()

The platformer genre is highly popular in gaming. These games typically involve players controlling a character that moves left and right, jumps to avoid obstacles, and progresses towards goals, all while being subject to gravity. The game environment usually includes elements like ground, platforms, and ladders. Non-player characters follow the same physics rules. This section explains how to configure an actor to use a platformer controller in GB BASIC and enable its interaction with other scene elements.

## Actor Asset Requirements

This section focuses on creating a player character. Non-player characters are covered in [Making a Non-Player Character](making-a-non-player-character.html).

<img src="imgs/asset-actor-frames-platformer.png" class="diagram-image diagram-schematic">

A platformer player character asset requires at least 2-3 animation sequences, totaling 4-6 frames. This includes 4 frames for walking left and right, and optionally 2 additional frames for climbing ladders. Idle frames can reuse walking frames to save resources. More frames can be added as needed. Non-player characters typically only need 2 animation sequences (4 frames total) for moving left and right; climbing is often unnecessary.

Ensure the actor has properties like "8x16", "Size", and "Anchor" correctly set.

<img src="imgs/editor-actor-properties-for-platformer.png" class="diagram-image diagram-screenshot">

<div class="small-note">Actor properties</div>

Other properties like collision groups are user-defined. Refer to [Actor](actor.html) for details.

Most importantly, select "Platformer Player" as the actor's behaviour controller.

<img src="imgs/editor-actor-behaviour-for-platformer.png" class="diagram-image diagram-screenshot">

<div class="small-note">Actor behaviour</div>

## Scene Asset Requirements

For a platformer game scene, "Use gravity" must be specified during creation.

<img src="imgs/editor-scene-creating-with-gravity.png" class="diagram-image diagram-screenshot">

<div class="small-note">Creating scene with gravity</div>

Definitions related to gravity, jumping, climbing, etc. can be adjusted as needed.

<img src="imgs/editor-scene-definition-for-platformer.png" class="diagram-image diagram-screenshot">

<div class="small-note">Scene definition</div>

## Composing the Game

Populate the scene map, remembering to set passability properties for elements like ground, ladders, and platforms. And don't forget to add the player actor to the scene.

<img src="imgs/editor-scene-making-for-platformer.png" class="diagram-image diagram-screenshot">

<div class="small-note">Platformer scene</div>

Now run the game scene and try controlling the player actor.

```basic
' Prepare.
auto update on ' Turn on the auto update mode.

' Load the scene and all the objects.
load scene(0, 0) = #0

end
```
<!-- prg
!edit, run, title="Smallest platformer setup", style=""
url://prgs/controller-platformer-1.txt
-->

See [Making a Non-Player Character](making-a-non-player-character.html) for non-player characters. This section explained the most basic usage of the platformer controller. For this genre, you can add mechanics like triggers, projectiles, various enemies, traps, scene transitions, jump damage, parallax scrolling, and etc. to complete a full game.

<!-- gem -->
