# Adding Event Callbacks

[Prev]() [Next]()

We need to add event callback routines for the NPC and coins (collectible items), so that events are triggered when the player interacts with or collects them.

## NPC

First, add two helper routines to open and close dialog box.

```basic-readonly
OpenDialog:
  ' Raise the dialog (window layer).
  def label(0, 0, 20, 3, 196) = WINDOW_LAYER, 2, 3, 10
  fill tile(196, 60) = "WidgetBorder"
  window 7, 145
  window on
  for y = 145 to 123 step -2
    window 7, y
    wait 1
  next
  return
CloseDialog:
  ' Lower the dialog (window layer).
  for y = 123 to 145 step 2
    window 7, y
    wait 1
  next
  wait 10
  window off
  return
```

Then implement an On hits callback for the NPC. This routine is triggered when the player interacts with the NPC, making the NPC face the player and then engaging in a simple conversation through the dialog box.

```basic-readonly
OnHitsNpc:
  ' Triggered when the player interacts with the NPC.
  begin def
    ...

    lock
      stop actor(obj0)
      stop actor(obj1)
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
      gosub OpenDialog
      label "ChillBitmap", "Collect the coins, will ya."
      call wait_until_confirm
      gosub CloseDialog
    unlock
    end
  end def
```

## Coins

Implement an On hits callback for the coins. This routine is triggered when the player interacts with a coin and contains no logic other than removing the coin.

```basic-readonly
OnHitsCoin:
  ' Triggered when the player interacts with the coin.
  begin def
    ...

    del actor(obj0) ' Delete the coin.
    end
  end def
```

## Complete Program for This Section

Try running the following code, moving the player around the scene, and interacting with others.

```basic
' Actor behaviours and callbacks.

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
OnHitsNpc:
  ' Triggered when the player interacts with the NPC.
  begin def
    def obj0 = stack3 ' These lines of stack references are allocated by the kernel for this type of callback.
    def obj1 = stack2
    def group = stack1
    def dir = stack0

    lock
      stop actor(obj0)
      stop actor(obj1)
      if dir = LEFT_DIR then
        play actor obj0, LEFT_IDLE
        play actor obj1, RIGHT_IDLE
      else if dir = RIGHT_DIR then
        play actor obj0, RIGHT_IDLE
        play actor obj1, LEFT_IDLE
      else if dir = UP_DIR then
        play actor obj0, UP_IDLE
        play actor obj1, DOWN_IDLE
      else ' if dir = DOWN_DIR then
        play actor obj0, DOWN_IDLE
        play actor obj1, UP_IDLE
      end if
      gosub OpenDialog
      label "ChillBitmap", "Collect the coins, will ya."
      call wait_until_confirm
      gosub CloseDialog
    unlock
    end
  end def

OnHitsCoin:
  ' Triggered when the player interacts with the coin.
  begin def
    def obj0 = stack3 ' These lines of stack references are allocated by the kernel for this type of callback.
    def obj1 = stack2
    def group = stack1
    def dir = stack0

    del actor(obj0) ' Delete the coin.
    end
  end def
```
<!-- prg
!edit, run, title="Adding event callbacks", style=""
url://prgs/practical-item-collecting-5.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="event-binding.html" class="nav-link">Event Binding</a>.
  </span>
</div>
