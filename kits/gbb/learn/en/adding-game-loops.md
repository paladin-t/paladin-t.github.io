# Adding Game Loops

[Prev]() [Next]()

In this section, we will replace the `print` statements in `Title` and `Game` to bring them closer to the desired form.

First, we add a title "Minimal Program" to the Title screen and create a blinking "Press Start" effect. The Title thread will end once the player presses the Start button.

```basic
Title:
  begin do
    locate 2, 5
    print "Minimal Program"  ' Draw the title.

    Blink:
      locate 4, 16
      print "Press Start";
      wait 1
      locate 4, 16
      print "           ";
      wait 1
      if btn(START_BTN) then ' Check if the Start button is pressed.
        end                  ' If so, end the Title thread.
      end if
      update
      goto Blink             ' Loop back to the start of the Blink routine.
      end
  end do
```
<!-- prg
!edit, run, title="Title loop", style=""
join start Title
goto Game
end

Title:
  begin do
    locate 2, 5
    print "Minimal Program"  ' Draw the title.

    Blink:
      locate 4, 16
      print "Press Start";
      wait 1
      locate 4, 16
      print "           ";
      wait 1
      if btn(START_BTN) then ' Check if the Start button is pressed.
        end                  ' If so, end the Title thread.
      end if
      update
      goto Blink             ' Loop back to the start of the Blink routine.
      end
  end do

Game:
  cls
  print "Game"
  end
-->

After the Title thread ends, control of the game transfers to Game. Like other typical games, a "two-step" design pattern is used here: first initialize the game, then enter the game loop. These two processes are implemented by the `Setup` and `Loop` routines respectively.

```basic
Game:
  begin do
    cls
    gosub Setup ' Call the Setup routine.
    goto Loop   ' Goto the Loop routine.
    end

    Setup:
      ' Initialize the game.
      print "Setup"
      return
    Loop:
      ' Main game loop.
      print "Loop"
      wait 60
      update
      goto Loop
  end do
```
<!-- prg
!edit, run, title="Game loop", style=""
join start Title
goto Game
end

Title:
  begin do
    locate 2, 5
    print "Minimal Program"

    Blink:
      locate 4, 16
      print "Press Start";
      wait 1
      locate 4, 16
      print "           ";
      wait 1
      if btn(START_BTN) then
        end
      end if
      update
      goto Blink
      end
  end do

Game:
  begin do
    cls
    gosub Setup ' Call the Setup routine.
    goto Loop   ' Goto the Loop routine.
    end

    Setup:
      ' Initialize the game.
      print "Setup"
      return
    Loop:
      ' Main game loop.
      print "Loop"
      wait 60
      update
      goto Loop
  end do
-->

Excellent! Now we have a rudimentary title screen and a working main game loop. In the next sections, we will add some game logic.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    <strong>See also</strong>: <a href="game-loop.html" class="nav-link">Game Loop</a>.
  </span>
</div>
