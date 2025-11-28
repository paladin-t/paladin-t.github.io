# Making a Cutscene

[Prev]() [Next]()

Cutscenes in games are used to display cinematic sequences and performances. They typically involve movement of multiple characters, camera shakes, dialogues, sound effects, and scene transitions. This section introduces common cutscene techniques.

Refer to the complete example program below. It demonstrates effects such as character movement, following, dialogue, and emotes.

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)           ' Get the player actor handle.
let b = find actor(#1)           ' Get the NPC actor handle.
on actor(b) hits start HitsActor ' Register an action callback to process the dialogue.

end

HitsActor:
  ' Triggered when the player interacts with the NPC.
  begin def
    def obj0 = stack3 ' These lines of stack references are allocated by the kernel for this type of callback.
    def obj1 = stack2
    def group = stack1
    def dir = stack0

    ' Let the NPC face to the player.
    ...
    ' Perform.
    gosub Perform
    end
  end def

Perform:
  ' Take over the control of the player.
  control actor a, NONE_BEHAVIOUR
  ' Raise an emote.
  emote(0, -12, 192) with actor(b) = "Emote"
  ' Talk.
  gosub OpenDialog
  label "ChillBitmap", "Follow me..."
  call wait_until_confirm
  gosub CloseDialog
  ' Move the player behind the NPC.
  play actor a, TO_MOVE
  move actor(a, 10) to 64, 32, MOVABLE_FOR_COLLISIONS_FLAG
  play actor a, RIGHT_IDLE
  play actor b, RIGHT_IDLE
  ' Move the actors.
  begin do
    ' Move right.
    begin do
      set actor property(a, DIRECTION_PROP) = RIGHT_DIR
      play actor a, RIGHT_WALK
      move actor(a, 0) to 112, 32, MOVABLE_FOR_FULL_FLAG
      set actor property(b, DIRECTION_PROP) = RIGHT_DIR
      play actor b, RIGHT_WALK
      move actor(b, 0) to 128, 32, MOVABLE_FOR_FULL_FLAG
      wait 40
      set actor property(a, DIRECTION_PROP) = RIGHT_DIR
      play actor a, RIGHT_WALK
      move actor(a, 0) to 128, 32, MOVABLE_FOR_FULL_FLAG
      set actor property(b, DIRECTION_PROP) = DOWN_DIR
      play actor b, DOWN_WALK
      move actor(b, 0) to 128, 48, MOVABLE_FOR_FULL_FLAG
      wait 19
    end do
    ' Move down.
      ...
    ' Move left.
      ...
    ' Move up.
      ...
    ' Move right.
      ...
    ' Stop them.
    begin do
      stop actor(a)
      play actor a, TO_IDLE
      stop actor(b)
      play actor b, LEFT_IDLE
    end do
  end do
  ' Talk.
  gosub OpenDialog
  label "ChillBitmap", "That's it."
  call wait_until_confirm
  gosub CloseDialog
  ' Return the control to the player.
  control actor a, TOPDOWN_PLAYER_BEHAVIOUR
  return

...
```
<!-- prg
!edit, run, title="Cutscene", style=""
url://prgs/cutscene-1.txt
-->

Cutscenes are not a single feature but rather a combination of multiple techniques.

## Temporarily Taking Control of Player Character

By temporarily using the `control actor` statement to set the player to a non-player character, we can temporarily remove the gamer's control over their character. This allows us to control its animations, movements, and other behaviours like a non-player character. After the cutscene ends, use `control actor` again to return control to the gamer. During this period, the game camera can remain to follow this actor as its target.

## Character Movement

Refer to the previous section [Making a Non-Player Character](making-a-non-player-character.html).

## Camera Shake

Refer to [Camera](page-not-found.html).

## Dialogue

Refer to [GUI](page-not-found.html).

## Sound Effects

Refer to [Playing Sound Effects](page-not-found.html).

## Scene Transition

Refer to [Scene Definition and Loading](scene-definition-and-loading.html).
