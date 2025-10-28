# Using Input Controls

[Prev]() [Next]()

In this section, we will introduce two approaches for obtaining user input: polling and callbacks.

## Polling User Input

The polling method is the most straightforward approach, but it is also relatively time-consuming. It continuously checks if a button is pressed and then executes the corresponding code, like what we did in the title screen.

By adding the following code, we can check if the direction buttons are pressed and then print something.

```basic
Setup:
  print "Setup"
  print "Press the D-Pad"
  return
Loop:
  ' Poll user input, then output something.
  if btnd(LEFT_BTN) then
    print "Left"
  else if btnd(RIGHT_BTN) then
    print "Right"
  else if btnd(UP_BTN) then
    print "Up"
  else if btnd(DOWN_BTN) then
    print "Down"
  end if
  update
  goto Loop
```
<!-- prg
!edit, run, title="Polling user input", style=""
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
    gosub Setup
    goto Loop
    end

    Setup:
      print "Setup"
      print "Press the D-Pad"
      return
    Loop:
      ' Poll user input, then output something.
      if btnd(LEFT_BTN) then
        print "Left"
      else if btnd(RIGHT_BTN) then
        print "Right"
      else if btnd(UP_BTN) then
        print "Up"
      else if btnd(DOWN_BTN) then
        print "Down"
      end if
      update
      goto Loop
  end do
-->

## Using Input Callbacks

The callback method is a more efficient approach. It associates the event of a button action with the corresponding code. When the button is pressed, that code is executed.

Now let's modify the previous program to use callbacks.

```basic
Setup:
  ' The following lines setup input callbacks.
  on btnd(LEFT_BTN) start OnLeft
  on btnd(RIGHT_BTN) start OnRight
  on btnd(UP_BTN) start OnUp
  on btnd(DOWN_BTN) start OnDown
  ' Keep the rest of the code unchanged.
  return
Loop:
  ' The polling code is no longer needed.
  update
  goto Loop

' Define the callback routines as follows, each outputs something.
OnLeft:
  print "Left"
  end
OnRight:
  print "Right"
  end
OnUp:
  print "Up"
  end
OnDown:
  print "Down"
  end
```
<!-- prg
!edit, run, title="Using input callback", style=""
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
    gosub Setup
    goto Loop

    Setup:
      ' The following lines setup input callbacks.
      on btnd(LEFT_BTN) start OnLeft
      on btnd(RIGHT_BTN) start OnRight
      on btnd(UP_BTN) start OnUp
      on btnd(DOWN_BTN) start OnDown
      print "Setup"
      print "Press the D-Pad"
      return
    Loop:
      ' The polling code is no longer needed.
      update
      goto Loop

    ' Define the callback routines as follows, each outputs something.
    OnLeft:
      print "Left"
      end
    OnRight:
      print "Right"
      end
    OnUp:
      print "Up"
      end
    OnDown:
      print "Down"
      end
    end
  end do
-->
