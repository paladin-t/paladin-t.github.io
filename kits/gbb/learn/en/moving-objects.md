# Moving Objects

[Prev]() [Next]()

Next, we'll modify the input callback functions to replace the simple print statements with character movement. The modifications are as follows, and they won't use any more complex flow logic than if-else statements.

```basic
OnLeft:             ' Callback routine for the Left button.
  if x = 1 then end ' If the player is at the left edge, do nothing.
  gosub ErasePlayer ' Erase the player representation at the old position.
  dec x             ' x = x - 1.
  gosub DrawPlayer  ' Draw the player representation at the new position.
  end
OnRight:            ' The following callbacks are similar to the above.
  ...
OnUp:
  ...
OnDown:
  ...

ErasePlayer:
  locate x, y
  print " ";        ' Erase the player with space.
  return
DrawPlayer:
  locate x, y
  print "@";        ' Draw the player with @.
  return
```
<!-- prg
!edit, run, title="Moving the player", style=""
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
      gosub DrawPlayer
      on btnd(LEFT_BTN) start OnLeft
      on btnd(RIGHT_BTN) start OnRight
      on btnd(UP_BTN) start OnUp
      on btnd(DOWN_BTN) start OnDown
      return

    OnLeft:             ' Callback routine for the Left button.
      if x = 1 then end ' If the player is at the left edge, do nothing.
      gosub ErasePlayer ' Erase the player representation at the old position.
      dec x             ' x = x - 1.
      gosub DrawPlayer  ' Draw the player representation at the new position.
      end
    OnRight:            ' The following callbacks are similar to the above.
      if x = 18 then end
      gosub ErasePlayer
      inc x
      gosub DrawPlayer
      end
    OnUp:
      if y = 1 then end
      gosub ErasePlayer
      dec y
      gosub DrawPlayer
      end
    OnDown:
      if y = 16 then end
      gosub ErasePlayer
      inc y
      gosub DrawPlayer
      end

    ErasePlayer:
      locate x, y
      print " ";        ' Erase the player with space.
      return
    DrawPlayer:
      locate x, y
      print "@";        ' Draw the player with @.
      return
  end do
-->

In the code above, `inc n` is equivalent to `n = n + 1`, and `dec n` is equivalent to `n = n - 1`, but using `inc`/`dec` will execute faster. We've also added an `ErasePlayer` routine to erase the character from its old position before moving it; otherwise, the character would leave a trail of movement behind.
