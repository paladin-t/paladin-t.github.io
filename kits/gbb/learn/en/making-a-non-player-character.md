# Making a Non-Player Character

[Prev]() [Next]()

In the previous section, we explored common behavioural design patterns for creating player characters. This section will extend the discussion to creating non-player characters (NPCs).

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    For Non-Player Character development, a controller is not necessary and is not recommended unless specific requirements exist. This section will provide examples using common behavioural patterns without controllers.
  </span>
</div>

## Character Movement

It is possible to move characters by manually setting the actor's direction in code, playing appropriate animations, and using the `move actor` statement. Refer to the programs below. This approach is recommended.

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)   ' Get the actor handle.
start actor a, MoveActor ' Start the thread to behave character motion and movement.

end

MoveActor:
  def obj = stack0 ' Allocated by the kernel for this type of callback.
  ' Move right.
  set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
  play actor obj, RIGHT_WALK
  move actor(obj, 60) with 1, 0, MOVABLE_FOR_FULL_FLAG
  Loop:
    ' Move left.
    set actor property(obj, DIRECTION_PROP) = LEFT_DIR
    play actor obj, LEFT_WALK
    move actor(obj, 120) with -1, 0, MOVABLE_FOR_FULL_FLAG
    ' Move right.
    set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
    play actor obj, RIGHT_WALK
    move actor(obj, 120) with 1, 0, MOVABLE_FOR_FULL_FLAG
    ' Loop.
    goto Loop
```
<!-- prg
!edit, run, title="Moving with gravity", style=""
url://prgs/character-non-player-1.txt
-->

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)   ' Get the actor handle.
start actor a, MoveActor ' Start the thread to behave character motion and movement.

end

MoveActor:
  def obj = stack0 ' Allocated by the kernel for this type of callback.
  ' Move right.
  set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
  play actor obj, RIGHT_WALK
  move actor(obj, 60) with 1, 0, MOVABLE_FOR_COLLISIONS_FLAG
  Loop:
    ' Move down.
    set actor property(obj, DIRECTION_PROP) = DOWN_DIR
    play actor obj, DOWN_WALK
    move actor(obj, 120) with 0, 1, MOVABLE_FOR_COLLISIONS_FLAG
    ' Move left.
    set actor property(obj, DIRECTION_PROP) = LEFT_DIR
    play actor obj, LEFT_WALK
    move actor(obj, 120) with -1, 0, MOVABLE_FOR_COLLISIONS_FLAG
    ' Move up.
    set actor property(obj, DIRECTION_PROP) = UP_DIR
    play actor obj, UP_WALK
    move actor(obj, 120) with 0, -1, MOVABLE_FOR_COLLISIONS_FLAG
    ' Move right.
    set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
    play actor obj, RIGHT_WALK
    move actor(obj, 120) with 1, 0, MOVABLE_FOR_COLLISIONS_FLAG
    ' Loop.
    goto Loop
```
<!-- prg
!edit, run, title="Moving without gravity", style=""
url://prgs/character-non-player-2.txt
-->

<details open>
<summary><b>Details</b></summary>
<div class="details-text">
By setting the actor's direction in code and specifying `PLATFORMER_MOVE_BEHAVIOUR` or `TOPDOWN_MOVE_BEHAVIOUR`, the actor will move automatically. This approach is not recommended unless specific needs require it.

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)                     ' Get the actor handle.
control actor a, PLATFORMER_MOVE_BEHAVIOUR ' Control the character with a "move" controller.
start actor a, MoveActor                   ' Start the thread to behave character motion.

end

MoveActor:
  def obj = stack0 ' Allocated by the kernel for this type of callback.
  ' Move right.
  set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
  wait 60
  Loop:
    ' Move left.
    set actor property(obj, DIRECTION_PROP) = LEFT_DIR
    wait 120
    ' Move right.
    set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
    wait 120
    ' Loop.
    goto Loop
```
<!-- prg
!edit, run, title="Controlled moving with gravity", style=""
url://prgs/character-non-player-3.txt
-->

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)                  ' Get the actor handle.
control actor a, TOPDOWN_MOVE_BEHAVIOUR ' Control the character with a "move" controller.
start actor a, MoveActor                ' Start the thread to behave character motion.

end

MoveActor:
  def obj = stack0 ' Allocated by the kernel for this type of callback.
  ' Move right.
  set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
  wait 96
  Loop:
    ' Move down.
    set actor property(obj, DIRECTION_PROP) = DOWN_DIR
    wait 160
    ' Move left.
    set actor property(obj, DIRECTION_PROP) = LEFT_DIR
    wait 192
    ' Move up.
    set actor property(obj, DIRECTION_PROP) = UP_DIR
    wait 160
    ' Move right.
    set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
    wait 192
    ' Loop.
    goto Loop
```
<!-- prg
!edit, run, title="Controlled moving without gravity", style=""
url://prgs/character-non-player-4.txt
-->

The fundamental difference between controllers: the platformer controller excels at horizontal movement and may climb and jump vertically; the top-down controller excels at movement in four directions (horizontal and vertical). Therefore, any character affected by gravity can use the platformer pattern, while any character not affected by gravity can use the top-down pattern, even if the game isn't strictly a top-down game.
</div>
</details>

### Pinned

Enabling the pinned property for an actor makes it unaffected by the camera, keeping it fixed at a specific screen position.

<img src="imgs/editor-actor-pinned-property.png" class="diagram-image diagram-screenshot">

<div class="small-note">Pinned property of actor</div>

Try the program below.

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

end
```
<!-- prg
!edit, run, title="Pinned actor", style=""
url://prgs/character-non-player-5.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="actor.html" class="nav-link">Actor</a>.
  </span>
</div>

## Idling

For a character in an idle state, it is possible to set its direction and play appropriate animations. If the actor is moving, consider using the `stop actor` statement to interrupt its movement. This approach is recommended.

Try the programs below.

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)     ' Get the actor handle.
start actor a, BehaveActor ' Start the thread to behave character motion and movement.

end

BehaveActor:
  def obj = stack0 ' Allocated by the kernel for this type of callback.
  ' Move right.
  set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
  play actor obj, RIGHT_WALK
  move actor(obj, 40) with 1, 0, MOVABLE_FOR_FULL_FLAG
  ' Idle.
  play actor obj, TO_IDLE
  stop actor(obj)
  end
```
<!-- prg
!edit, run, title="Idling with gravity", style=""
url://prgs/character-non-player-6.txt
-->

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)     ' Get the actor handle.
start actor a, BehaveActor ' Start the thread to behave character motion and movement.

end

BehaveActor:
  def obj = stack0 ' Allocated by the kernel for this type of callback.
  ' Move right.
  set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
  play actor obj, RIGHT_WALK
  move actor(obj, 96) with 1, 0, MOVABLE_FOR_COLLISIONS_FLAG
  ' Idle.
  play actor obj, TO_IDLE
  stop actor(obj)
  end
```
<!-- prg
!edit, run, title="Idling without gravity", style=""
url://prgs/character-non-player-7.txt
-->

<details open>
<summary><b>Details</b></summary>
<div class="details-text">
By specifying `PLATFORMER_IDLE_BEHAVIOUR` or `TOPDOWN_IDLE_BEHAVIOUR` in code, the actor will remain stationary. This approach is not recommended unless specific needs require it.

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)                     ' Get the actor handle.
control actor a, PLATFORMER_MOVE_BEHAVIOUR ' Control the character with a "move" controller.
start actor a, BehaveActor                 ' Start the thread to behave character motion.

end

BehaveActor:
  def obj = stack0 ' Allocated by the kernel for this type of callback.
  ' Move right.
  set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
  wait 40
  ' Idle.
  control actor a, PLATFORMER_IDLE_BEHAVIOUR
  stop actor(obj)
  end
```
<!-- prg
!edit, run, title="Controlled idling with gravity", style=""
url://prgs/character-non-player-8.txt
-->

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)                  ' Get the actor handle.
control actor a, TOPDOWN_MOVE_BEHAVIOUR ' Control the character with a "move" controller.
start actor a, BehaveActor              ' Start the thread to behave character motion.

end

BehaveActor:
  def obj = stack0 ' Allocated by the kernel for this type of callback.
  ' Move right.
  set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
  wait 96
  ' Idle.
  control actor a, TOPDOWN_IDLE_BEHAVIOUR
  stop actor(obj)
  end
```
<!-- prg
!edit, run, title="Controlled idling without gravity", style=""
url://prgs/character-non-player-9.txt
-->
</div>
</details>

## Wandering

It enables characters to wander randomly within the scene by switching between idle and move states, combined with delays and randomization.

Try the programs below.

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)     ' Get the actor handle.
start actor a, BehaveActor ' Start the thread to behave character motion and movement.

end

BehaveActor:
  begin def
    reserve 1        ' Reserve for `dir`.
    def dir = stack1 ' Allocated by the above `reserve` statement.
    def obj = stack0 ' Allocated by the kernel for this type of callback.

    ' The wandering loop.
    Loop:
      ' Determine a direction to go.
      dir = rnd(0, 1) ' 0 for left, 1 for right.
      ' Move.
      if dir = 0 then
        set actor property(obj, DIRECTION_PROP) = LEFT_IDLE
        play actor obj, LEFT_WALK
        move actor(obj, 60) with -1, 0, MOVABLE_FOR_FULL_FLAG
      else ' if dir = 1 then
        set actor property(obj, DIRECTION_PROP) = RIGHT_IDLE
        play actor obj, RIGHT_WALK
        move actor(obj, 60) with 1, 0, MOVABLE_FOR_FULL_FLAG
      end if
      ' Idle for a while.
      stop actor(obj)
      play actor obj, TO_IDLE
      wait 72
      ' Loop again.
      goto Loop
      end
  end def
```
<!-- prg
!edit, run, title="Wandering with gravity", style=""
url://prgs/character-non-player-10.txt
-->

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)     ' Get the actor handle.
start actor a, BehaveActor ' Start the thread to behave character motion and movement.

end

BehaveActor:
  begin def
    reserve 1        ' Reserve for `dir`.
    def dir = stack1 ' Allocated by the above `reserve` statement.
    def obj = stack0 ' Allocated by the kernel for this type of callback.

    ' The wandering loop.
    Loop:
      ' Determine a direction to go.
      dir = rnd(START_DIR, END_DIR)
      ' Move.
      set actor property(obj, DIRECTION_PROP) = dir
      control actor obj, TOPDOWN_MOVE_BEHAVIOUR
      wait 144
      ' Idle for a while.
      stop actor(obj)
      control actor obj, NONE_BEHAVIOUR
      play actor obj, TO_IDLE
      wait 72
      ' Loop again.
      goto Loop
      end
  end def
```
<!-- prg
!edit, run, title="Wandering without gravity", style=""
url://prgs/character-non-player-11.txt
-->

## Chasing

By obtaining and calculating the spatial relationship between the player character and the current non-player character, it is possible to implement a chasing behaviour.

Try the programs below.

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)     ' Get the player actor handle.
let b = find actor(#1)     ' Get the NPC actor handle.
start actor b, BehaveActor ' Start the thread to behave character motion and movement.

end

BehaveActor:
  begin def
    reserve 2        ' Reserve for `x0`, `x1`.
    def x0 = stack2  ' Allocated by the above `reserve` statement.
    def x1 = stack1  ' Allocated by the above `reserve` statement.
    def obj = stack0 ' Allocated by the kernel for this type of callback.

    ' The wandering loop.
    Loop:
      ' Determine a direction to go.
      x0 = get actor property(obj, POSITION_X_PROP)
      x1 = get actor property(a, POSITION_X_PROP)
      ' Move.
      if x0 < x1 then
        set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
        play actor obj, RIGHT_WALK
        move actor(obj, 60) with 1, 0, MOVABLE_FOR_FULL_FLAG
      else
        set actor property(obj, DIRECTION_PROP) = LEFT_DIR
        play actor obj, LEFT_WALK
        move actor(obj, 60) with -1, 0, MOVABLE_FOR_FULL_FLAG
      end if
      ' Idle for a while.
      stop actor(obj)
      play actor obj, TO_IDLE
      wait 72
      ' Loop again.
      goto Loop
      end
  end def
```
<!-- prg
!edit, run, title="Chasing with gravity", style=""
url://prgs/character-non-player-12.txt
-->

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)     ' Get the player actor handle.
let b = find actor(#1)     ' Get the NPC actor handle.
start actor b, BehaveActor ' Start the thread to behave character motion and movement.

end

BehaveActor:
  begin def
    reserve 2        ' Reserve for `p0`, `p1`.
    def p0 = stack2  ' Allocated by the above `reserve` statement.
    def p1 = stack1  ' Allocated by the above `reserve` statement.
    def obj = stack0 ' Allocated by the kernel for this type of callback.

    ' The wandering loop.
    Loop:
      ' Horizontal movement.
      p0 = get actor property(obj, POSITION_X_PROP)
      p1 = get actor property(a, POSITION_X_PROP)
      if p0 < p1 then
        set actor property(obj, DIRECTION_PROP) = RIGHT_DIR
      else
        set actor property(obj, DIRECTION_PROP) = LEFT_DIR
      end if
      control actor obj, TOPDOWN_MOVE_BEHAVIOUR
      wait 72
      ' Idle for a while.
      stop actor(obj) ' Rest.
      control actor obj, NONE_BEHAVIOUR
      play actor obj, TO_IDLE
      wait 72
      ' Vertical movement.
      p0 = get actor property(obj, POSITION_Y_PROP)
      p1 = get actor property(a, POSITION_Y_PROP)
      if p0 < p1 then
        set actor property(obj, DIRECTION_PROP) = DOWN_DIR
      else
        set actor property(obj, DIRECTION_PROP) = UP_DIR
      end if
      control actor obj, TOPDOWN_MOVE_BEHAVIOUR
      wait 72
      ' Idle for a while.
      stop actor(obj) ' Rest.
      control actor obj, NONE_BEHAVIOUR
      play actor obj, TO_IDLE
      wait 72
      ' Loop again.
      goto Loop
      end
  end def
```
<!-- prg
!edit, run, title="Chasing without gravity", style=""
url://prgs/character-non-player-13.txt
-->

## Attacking

The simplest attack method is to handle it directly in the non-player character's collision callback: inflict damage on the collided player character and, based on requirements, change its movement state or play a damage animation.

Try the program below.

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#0)     ' Get the player actor handle.
let b = find actor(#1)     ' Get the NPC actor handle.
start actor b, BehaveActor ' Start the thread to behave character motion and movement.
on actor(b) hits start OnHits

let t

end

BehaveActor:
  begin def
    ...
  end def
OnHits:
  ' Triggered when the player intersects with the NPC.
  begin def
    ...
    start PlayerHurt
    end
  end def

PlayerHurt:
  ' Hurt the player, then make the player invincible and blink for a while.
  begin do
    ' Make the player not hurtable for a while.
    t = get actor property(a, COLLISION_GROUP_PROP)
    set actor property(a, COLLISION_GROUP_PROP) = 0x00
    ' Decrease the player's HP here.
    ' ...
    ' Blink the actor.
    set actor property(a, HIDDEN_PROP) = true
    wait 10
    set actor property(a, HIDDEN_PROP) = false
    wait 10
    set actor property(a, HIDDEN_PROP) = true
    wait 10
    set actor property(a, HIDDEN_PROP) = false
    wait 10
    set actor property(a, HIDDEN_PROP) = true
    wait 10
    set actor property(a, HIDDEN_PROP) = false
    wait 10
    ' Restore the collision state.
    set actor property(a, COLLISION_GROUP_PROP) = t
    end
  end do
```
<!-- prg
!edit, run, title="Attacking", style=""
url://prgs/character-non-player-14.txt
-->

## Throwing Projectiles

A the non-player character can throw projectiles just like how a player character does.

Try the program below.

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

fill projectile(126, 2) = "Dart" ' Setup the projectile.
def projectile(0, 126) = "Dart"

let a = find actor(#0)     ' Get the player actor handle.
let b = find actor(#1)     ' Get the NPC actor handle.
start actor b, BehaveActor ' Start the thread to behave character motion and movement.

end

BehaveActor:
  begin def
    reserve 2        ' Reserve for `p0`, `p1`.
    def p0 = stack2  ' Allocated by the above `reserve` statement.
    def p1 = stack1  ' Allocated by the above `reserve` statement.
    def obj = stack0 ' Allocated by the kernel for this type of callback.

    ' The wandering loop.
    Loop:
      ' Horizontal movement.
      ...
      ' Idle for a while.
      ...
      ' Launch projectiles.
      start projectile(0) with actor(obj)
      wait 20
      start projectile(0) with actor(obj)
      wait 32
      ' Vertical movement.
      ...
      ' Idle for a while.
      ...
      ' Launch projectiles.
      ...
      ' Loop again.
      goto Loop
      end
  end def
```
<!-- prg
!edit, run, title="Throwing projectile", style=""
url://prgs/character-non-player-15.txt
-->

## Adding an Emote

Emotes are generated the same way for all actors. This can be triggered by actor collisions, trigger collisions, or other logic.

Try the program below.

```basic
...

' Load the scene and all the objects.
option ACTOR_HIT_WITH_DETAILS_ENABLED, true ' Turn on this feature to distinguish hit directions and collision groups.
load scene(0, 0) = #0

let a = find actor(#1)           ' Get the NPC actor handle.
on actor(a) hits start HitsActor ' Register an action callback to process the dialogue.

end

HitsActor:
  ' Triggered when the player interacts with the NPC.
  begin def
    def obj0 = stack3 ' These lines of stack references are allocated by the kernel for this type of callback.
    def obj1 = stack2
    def group = stack1
    def dir = stack0

    lock
      ' Stop the player.
      stop actor(obj0)
      control actor obj0, NONE_BEHAVIOUR
      ' Let the NPC face to the player.
      if dir = LEFT_DIR then
        play actor obj0, LEFT_IDLE
        play actor obj1, RIGHT_IDLE
      else if dir = RIGHT_DIR then
        ...
      else if dir = UP_DIR then
        ...
      else ' if dir = DOWN_DIR then
        ...
      end if
      ' Raise an emote.
      emote(0, -12, 192) with actor(obj0) = "Emote"
    unlock
    end
  end def
```
<!-- prg
!edit, run, title="Adding emote", style=""
url://prgs/character-non-player-16.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="emote.html" class="nav-link">Emote</a>.
  </span>
</div>

## Talking with Dialogues

Using [GUI](page-not-found.html) functionality, it is possible to create a dialogue system. This can be triggered by actor collisions, player actions, or other logic.

Try the program below.

```basic
...

' Load the scene and all the objects.
load scene(0, 0) = #0

let a = find actor(#1)           ' Get the NPC actor handle.
on actor(a) hits start HitsActor ' Register an action callback to process the dialogue.

end

HitsActor:
  ' Triggered when the player interacts with the NPC.
  begin def
    def obj0 = stack3 ' These lines of stack references are allocated by the kernel for this type of callback.
    def obj1 = stack2
    def group = stack1
    def dir = stack0

    lock
      ' Stop the player.
      stop actor(obj0)
      control actor obj0, NONE_BEHAVIOUR
      ' Let the NPC face to the player.
      if dir = LEFT_DIR then
        play actor obj0, LEFT_IDLE
        play actor obj1, RIGHT_IDLE
      else if dir = RIGHT_DIR then
        ...
      else if dir = UP_DIR then
        ...
      else ' if dir = DOWN_DIR then
        ...
      end if
      ' Talk.
      gosub OpenDialog
      label "ChillBitmap", "Hello. I'm talking..."
      call wait_until_confirm
      gosub CloseDialog
    unlock
    end
  end def

OpenDialog:
  ' Raise the dialog (window layer).
  ...
CloseDialog:
  ' Lower the dialog (window layer).
  ...
```
<!-- prg
!edit, run, title="Talking with dialogues", style=""
url://prgs/character-non-player-17.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="page-not-found.html" class="nav-link">GUI</a>.
  </span>
</div>
