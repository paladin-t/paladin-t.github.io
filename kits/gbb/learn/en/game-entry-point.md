# Game Entry Point

[Prev]() [Next]()

## Getting Started

Let's start writing our minimal game framework! We will proceed step-by-step from scratch. Don't worry, the content of this section is no more complicated than the "Hello, World!" program.

We divide this program into two main segments: a Title, which serves as the game's start screen, and a Game segment, used for the main flow of the game. In this section, we first create the outermost flow with the manual update mode, we'll switch to the auto mode in later sections. Try the code as follows.

```basic
join start Title ' Start with the Title thread, and wait until it ends.
goto Game        ' Hand the control right to the Game segment.
end              ' That's all for the outermost flow.

Title:
  print "Title"  ' Print "Title" on the screen.
  end

Game:
  print "Game"   ' Print "Game" on the screen.
  end
```
<!-- prg
!edit, run, title="Getting Started!", style=""
join start Title ' Start with the Title thread, and wait until it ends.
goto Game        ' Hand the control right to the Game segment.
end              ' That's all for the outermost flow.

Title:
  print "Title"  ' Print "Title" on the screen.
  end

Game:
  print "Game"   ' Print "Game" on the screen.
  end
-->

We want the Title segment to be an independent routine. When the game player presses a certain key, the program jumps to the Game segment. After that, the program's control right remains in the Game segment until game over or other events occur. We will continue to refine this flow in the following sections of this chapter.

## Make Good Use of Threads

The Title segment is the first independent thread we create in practical. Remember the rules for avoiding thread related chaos mentioned in [Thread Operations](thread-operations.html)? We won't go into detail here, but please be sure to keep them in mind.

## Make Good Use of <code>goto</code>

In BASIC, `goto` is a powerful tool that allows us to jump to any segment of the program. However, misuse of `goto` can lead to a messy program structure that is difficult to maintain. Therefore, we recommend using `goto` when encountering specific patterns. For example:

* Jumping backward
  * When encountering conditional branches, `goto` can be used to jump to a position later in the code segment, such as a logical exit, to terminate this segment of logic
  * Other scenarios suitable for backward jumps should be identified through practice
* Jumping forward
  * Used for looping behaviour. For example, a monster constantly chasing the player can use `goto` to jump to the start of the code segment to achieve a loop
  * Apart from the scenario mentioned above, forward jumps are generally not needed in practice

```basic
let foo = rnd(3)

gosub sub
end

sub:
  if foo = 1 then goto done
  print "Not one."
  if foo = 2 then goto done
  print "Not two."
  if foo = 3 then goto done
  print "Not three."

  done: ' The common exit point for all branches above.
    print "Done."
    return
```
<!-- prg
!edit, run, title="<code>goto</code> later position", style=""
print "Press any key..."
wait_for_input:
  if not btnu then ' Wait for user input.
    update
    goto wait_for_input
  end if
  randomize        ' Initialize the random number generator.

let foo = rnd(3)

gosub sub
end

sub:
  if foo = 1 then goto done
  print "Not one."
  if foo = 2 then goto done
  print "Not two."
  if foo = 3 then goto done
  print "Not three."

  done: ' The common exit point for all branches above.
    print "Done."
    return
-->

In the code above, we use `goto` to ensure that `sub` has only one exit. Of course, for this specific example, the same effect could be achieved by using `return`s earlier, but `goto` can express the logic more concisely in certain situations.

```basic
goto proc
end

proc:
  print "Start walking..."
  loop:       ' The loop starts here.
    let foo = rnd(3)
    select case foo
      case 0
        print "Walk left."
      case 1
        print "Walk right."
      case 2
        print "Walk up."
      case 3
        print "Walk down."
    end select
    wait rnd(30, 100)
    goto loop ' Jump back to the start of the loop.
```
<!-- prg
!edit, run, title="<code>goto</code> earlier position", style=""
goto proc
end

proc:
  print "Start walking..."
  loop:       ' The loop starts here.
    let foo = rnd(3)
    select case foo
      case 0
        print "Walk left."
      case 1
        print "Walk right."
      case 2
        print "Walk up."
      case 3
        print "Walk down."
    end select
    wait rnd(30, 100)
    goto loop ' Jump back to the start of the loop.
-->

In the code above, we use `goto` to implement a loop and create a wandering behaviour. The same effect could also be achieved using loop statements, but `goto` can express the logic more concisely in certain situations.
