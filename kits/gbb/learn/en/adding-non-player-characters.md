# Adding Non-Player Characters

[Prev]() [Next]()

Next, we will add an NPC, enabling them to move freely within the scene, and add a few collectable coins.

## NPC

Write a behaviour routine to make the NPC wander aimlessly in the scene.

```basic-readonly
BehaveNpc:
  ' Behave the NPC.
  begin def
    reserve 1        ' Reserve for `dir`.
    def dir = stack1 ' Allocated by the above `reserve` statement.
    def obj = stack0 ' Allocated by the kernel for this type of callback.

    UpdateNpc1:
      dir = rnd(START_DIR, END_DIR)
      set actor property(obj, DIRECTION_PROP) = dir
      control actor obj, TOPDOWN_MOVE_BEHAVIOUR
      wait 144
      stop actor(obj)
      control actor obj, NONE_BEHAVIOUR
      play actor obj, TO_IDLE
      wait 72
      goto UpdateNpc1
      end
  end def
```

Set the above routine as the NPC's Behave routine in the actor editor for the NPC. Then place the NPC in the scene.

## Coins

In the `SetupGame` routine from the previous section, add some variables to track the status and count of coins.

```basic-readonly
SetupGame:
  ...
  ' Declare the variables.
  let total_items = 0                         ' The total item count.
  let items = 0                               ' The item count.
  let cleared = false                         ' Whether all the items have been collected.
  let x
  let t

  return
```

Add a `CountItems` routine to count the number of coins in the scene.

```basic-readonly
CountItems:
  ' Count the items.
  items = 0
  x = nothing
  while true
    t = find actor("Coin", x)
    if t = nothing then
      exit
    end if
    x = t
    inc items
  end while
  cleared = (items = 0)
  return
```

Place several coins in the scene.

## Complete Program for This Section

Try running the following code, and moving the player around the scene to see the new added characters.

![edit, run, style="width: 640px;"](imgs/editor-scene-practical-item-collecting-non-player-character.png)
<!-- prg
!edit, run, title="Adding non-player characters", style=""
url://prgs/practical-item-collecting-4.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="making-a-non-player-character.html" class="nav-link">Making a Non-Player Character</a>.
  </span>
</div>
