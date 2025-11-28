# Adding a Player Character

[Prev]() [Next]()

Next, we will add a player character and define appropriate behaviours for it, allowing it to move within the scene.

## Configuring the Player Character

In the previous section, we added game assets, including the characters. We simply need to set the player character to use the "Top-down Player" controller, configure its collision grouping according to common design patterns, and add it to the scene.

## Complete Program for This Section

Try running the following code, and moving the player around the scene.

![edit, run, style="width: 640px;"](imgs/editor-scene-practical-item-collecting-player-character.png)
<!-- prg
!edit, run, title="Adding player character", style=""
url://prgs/practical-item-collecting-3.txt
-->

Interactions between the player character and other characters or items will be implemented later in the collision callbacks of non-player characters.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="making-a-player-character.html" class="nav-link">Making a Player Character</a>.
  </span>
</div>
