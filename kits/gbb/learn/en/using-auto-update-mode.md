# Using Auto Update Mode

[Prev]() [Next]()

Before we proceed, let's refactor our framework project from manual update mode to auto update mode.

```basic
auto update on ' Enable auto update mode.
' Keep the rest of the code unchanged.
end

Title:
  let started = false       ' Stores whether the Start button has been pressed.

  begin do
    locate 2, 5
    print "Minimal Program"
    ' Use input callback for the start button.
    on btnd(START_BTN) start OnStart

    Blink:
      locate 4, 16
      print "Press Start";
      wait 30
      locate 4, 16
      print "           ";
      wait 30
      if started then       ' Wait until the Start button has been pressed.
        started = false
        off btnd(START_BTN) ' Unregister the callback before proceeding.
        end
      end if
      goto Blink
      end

    OnStart:                ' Start button callback.
      started = true        ' Set the flag to true.
      end
  end do

Game:
  begin do
    cls
    gosub Setup
    end

    Setup:
      print "Press the D-Pad"
      ' Keep the rest of the code unchanged.
      return
    ' No loop or manual `update` is needed.

    ' Keep the rest of the code unchanged.
  end do
```
<!-- prg
!edit, run, title="Turn <code>auto update on</code>", style=""
auto update on ' Enable auto update mode.
join start Title
goto Game
end

Title:
  let started = false       ' Stores whether the Start button has been pressed.

  begin do
    locate 2, 5
    print "Minimal Program"
    ' Use input callback for the Start button.
    on btnd(START_BTN) start OnStart

    Blink:
      locate 4, 16
      print "Press Start";
      wait 30
      locate 4, 16
      print "           ";
      wait 30
      if started then       ' Wait until the Start button has been pressed.
        started = false
        off btnd(START_BTN) ' Unregister the callback before proceeding.
        end
      end if
      goto Blink
      end

    OnStart:                ' Start button callback.
      started = true        ' Set the flag to true.
      end
  end do

Game:
  begin do
    cls
    gosub Setup
    end

    Setup:
      print "Press the D-Pad"
      on btnd(LEFT_BTN) start OnLeft
      on btnd(RIGHT_BTN) start OnRight
      on btnd(UP_BTN) start OnUp
      on btnd(DOWN_BTN) start OnDown
      return
    ' No loop or manual `update` is needed.

    OnLeft:
      print "Left "
      end
    OnRight:
      print "Right"
      end
    OnUp:
      print "Up   "
      end
    OnDown:
      print "Down "
      end
  end do
-->

Finally, let's add some finishing touches. First, we'll add some walls to the scene, then use a "character" to represent the player.

```basic
Game:
  begin do
    cls
    gosub Setup
    end

    Setup:
      ' Draw the scene map.
      let x = 10
      let y = 8
      for i = 1 to 18
        locate i, 0
        print "#";
        locate i, 17
        print "#";
      next
      for i = 1 to 16
        locate 0, i
        print "#";
        locate 19, i
        print "#";
      next
      locate 1, 1
      print "Press the D-Pad"
      ' Draw the player.
      gosub DrawPlayer
      ' Keep the rest of the code unchanged.
      return

    OnLeft:
      locate 1, 2 ' Added this line to set the cursor position.
      print "Left "
      end
    OnRight:      ' The following three routines are similar to `OnLeft`.
      ...
    OnUp:
      ...
    OnDown:
      ...

    DrawPlayer:
      locate x, y
      print "@";
      return
  end do
```
<!-- prg
!edit, run, title="Turn <code>auto update on</code>", style=""
auto update on
join start Title
goto Game
end

Title:
  let started = false

  begin do
    locate 2, 5
    print "Minimal Program"
    on btnd(START_BTN) start OnStart

    Blink:
      locate 4, 16
      print "Press Start";
      wait 30
      locate 4, 16
      print "           ";
      wait 30
      if started then
        started = false
        off btnd(START_BTN)
        end
      end if
      goto Blink
      end

    OnStart:
      started = true
      end
  end do

Game:
  begin do
    cls
    gosub Setup
    end

    Setup:
      ' Draw the scene map.
      let x = 10
      let y = 8
      for i = 1 to 18
        locate i, 0
        print "#";
        locate i, 17
        print "#";
      next
      for i = 1 to 16
        locate 0, i
        print "#";
        locate 19, i
        print "#";
      next
      locate 1, 1
      print "Press the D-Pad"
      ' Draw the player.
      gosub DrawPlayer
      on btnd(LEFT_BTN) start OnLeft
      on btnd(RIGHT_BTN) start OnRight
      on btnd(UP_BTN) start OnUp
      on btnd(DOWN_BTN) start OnDown
      return
    ' No loop or manual `update` is needed.

    OnLeft:
      locate 1, 2 ' Added this line to set the cursor position.
      print "Left "
      end
    OnRight:      ' The following three routines are similar to `OnLeft`.
      locate 1, 2
      print "Right"
      end
    OnUp:
      locate 1, 2
      print "Up   "
      end
    OnDown:
      locate 1, 2
      print "Down "
      end

    DrawPlayer:
      locate x, y
      print "@";
      return
  end do
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    <strong>See also</strong>: <a href="game-loop.html" class="nav-link">Game Loop</a>.
  </span>
</div>
