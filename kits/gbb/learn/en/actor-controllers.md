# Actor Controllers

[Prev]() [Next]()

This section and the following subsections will introduce the controllers built into the default kernel and how to configure them for actors. In previous chapters, you have gained a preliminary impression of controllers; the next few subsections will completely unveil their nature.

## How to Control an Actor without Controller

Let's practice the knowledge mastered in [Actor](actor.html). By checking the button input and using the relevant actor APIs, we can fully move an actor and write other gameplay code.

```basic
' Prepare.
sprite on
option SPRITE8x16_ENABLED, true

' Define the actor.
fill actor(0, 56) = "Elephant"
let a = new actor()
def actor(a, 80, 72, 0) = "Elephant"
play actor a, 0

shell ">Actor: %x", a

' The main loop.
loop:
  ' Control the actor.
  if btn(UP_BTN) then
    move actor(a, 1) with 0, -1
  else if btn(DOWN_BTN) then
    move actor(a, 1) with 0, 1
  ...
  end if
  update
  goto loop
```
<!-- prg
!edit, run, title="Movable actor with manual control", style=""
url://prgs/actor-2.txt
-->

Furthermore, using the knowledge mastered in [Event Binding](event-binding.html), we can implement equivalent functionality within an actor's `behave` event.

```basic
' Prepare.
...

' Define the actor.
...
start actor a, Behave ' Start the actor's `behave` thread.
                      ' This can also be assigned in the actor and scene editors.

end

Behave:
  begin def
    def aa = stack0 ' Get the active owner actor.
    shell ">Actor: %x", aa
    Loop:
      ' Control the actor.
      if btn(UP_BTN) then
        move actor(aa, 1) with 0, -1
      else if btn(DOWN_BTN) then
        move actor(aa, 1) with 0, 1
      ...
      end if
      wait 1
      goto Loop
  end def
```
<!-- prg
!edit, run, title="Movable actor in "Behave"", style=""
url://prgs/actor-3.txt
-->

From previous chapters, it is understood that an actor has two configurable routines: `behave` and `on hits`. The latter, `on hits`, like other collision events, is passively triggered. Typically, the code within this routine is "transient" - it performs tasks such as identifying collision information, handling the collision, and then exits the routine. In contrast, the former, `behave`, is an active process that defines the character's behaviour. Initialization related to the actor can be written, followed optionally by executing a "continuous" loop. Ultimately, the implementation depends on the specific requirements of the game.

## Why Using Controllers

Since as described in the previous paragraph, we can already control actors using either a manual style or the `behave` callback style, why do we still need controllers?

Developing games for Game Boy compatible devices is different from developing for devices with more computational resources. GB BASIC builds some computationally intensive functions directly into the kernel. Developers only need to provide the required resources and data to the runtime, allowing the game to run in a data-driven manner. Using controllers offers the following benefits.

* Faster execution speed
* Less code that is easier to maintain
* Tighter integration with various system components

The program below demonstrates how to use a controller to manage an actor.

```basic
' Prepare.
...

' Define the actor.
...
set actor property(a, MOVE_SPEED_PROP) = 8
control actor a, TOPDOWN_PLAYER_BEHAVIOUR ' Apply the top-down controller to the actor.

shell ">Actor: %x", a

end
```
<!-- prg
!edit, run, title="Movable actor with a controller", style=""
url://prgs/actor-4.txt
-->

## How to Apply Controller to Actors

A controller can be assigned to an actor in the editor.

<img src="imgs/editor-actor-set-behaviour.png" class="diagram-image diagram-screenshot">

<div class="small-note">Setting actor behaviour</div>

Alternatively, the same effect can be achieved in code with the `control actor` statement, just like what we did in the previous sample.

```basic
let a = new actor()
control actor a, TOPDOWN_PLAYER_BEHAVIOUR
```
<!-- prg
!edit, run, title="Setting actor behaviour in code", style=""
let a = new actor()
control actor a, TOPDOWN_PLAYER_BEHAVIOUR
-->

## Controller Types

The following actor controllers are appliable to an actor to indicate its behaviours and interactions with other objects or a scene.

| Actor behaviours                          | Note                                                                                                       | Kernel          |
|-------------------------------------------|------------------------------------------------------------------------------------------------------------|-----------------|
| `NONE_BEHAVIOUR`                          | An actor with this value behaves nothing                                                                   | Default         |
| `PLATFORMER_PLAYER_BEHAVIOUR`             | An actor with this value behaves as a player controlled platformer character                               | Default         |
| `PLATFORMER_MOVE_BEHAVIOUR`               | An actor with this value behaves as a moving platformer character, not required to `move actor`            | Default         |
| `PLATFORMER_IDLE_BEHAVIOUR`               | An actor with this value behaves as an idle platformer character, not required for a non-moving actor      | Default         |
| `TOPDOWN_PLAYER_BEHAVIOUR`                | An actor with this value behaves as a player controlled top-down character                                 | Default         |
| `TOPDOWN_MOVE_BEHAVIOUR`                  | An actor with this value behaves as a moving top-down character, not required to `move actor`              | Default         |
| `TOPDOWN_IDLE_BEHAVIOUR`                  | An actor with this value behaves as an idle top-down character, not required for a non-moving actor        | Default         |
| `POINTNCLICK_PLAYER_BEHAVIOUR`            | An actor with this value behaves as a player controlled point&click character                              | Default         |
| `POINTNCLICK_PLAYER_WITH_MOUSE_BEHAVIOUR` | An actor with this value behaves as a player controlled point&click character with mouse support           | Default         |
| `POINTNCLICK_PLAYER_WITH_TOUCH_BEHAVIOUR` | An actor with this value behaves as a player controlled point&click character with touch support           | Default         |
| `SHOOTING_PLAYER_BEHAVIOUR`               | An actor with this value behaves as a player controlled scroll shooting character                          | Scroll Shooting |
| `SHOOTING_MOVE_BEHAVIOUR`                 | An actor with this value behaves as a moving scroll shooting character, not required to `move actor`       | Scroll Shooting |
| `SHOOTING_IDLE_BEHAVIOUR`                 | An actor with this value behaves as an idle scroll shooting character, not required for a non-moving actor | Scroll Shooting |

Both `POINTNCLICK_PLAYER_WITH_MOUSE_BEHAVIOUR` and `POINTNCLICK_PLAYER_WITH_TOUCH_BEHAVIOUR` controllers support obtaining user input from pointing devices, and will fall back to `POINTNCLICK_PLAYER_BEHAVIOUR` if no such device is available. The difference between the two lies in the fact that the "mouse"-driven behaviour moves a small distance according to the movement speed towards the input point each time, while the "touch"-driven behaviour moves immediately to the input point location.

The following behaviour options can be used in conjunction with an actor behaviour to specify the actor's detailed behaviour.

| Behaviour options | Note                                                         | Applicable to                                        |
|-------------------|--------------------------------------------------------------|------------------------------------------------------|
| `RIGID_BEHAVIOUR` | An actor with this options barely overlaps with other actors | `TOPDOWN_PLAYER_BEHAVIOUR`, `TOPDOWN_MOVE_BEHAVIOUR` |

(Top-down) actors with the "rigid" option are less likely to overlap with other actors. Usually, there is no need to enable this option.

Behaviour options can be set for an actor by performing a bitwise OR operation with their compatible actor behaviour.

The "Default Kernel" distributed with GB BASIC includes the None, Platformer, Top-down, and Point&Click controllers. Additionally, the "Scroll Shooting" kernel includes the Scroll Shooting controllers.

<!-- Extra kernels can provide more controllers. -->

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    The next four subsections will respectively introduce several built-in controllers: <a href="platformer-controller.html" class="nav-link">Platformer Controller</a>, <a href="top-down-controller.html" class="nav-link">Top-down Controller</a>, <a href="point-and-click-controller.html" class="nav-link">Point&Click Controller</a>, and <a href="scroll-shooting-controller.html" class="nav-link">Scroll Shooting Controller</a>.
  </span>
</div>

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="event-binding.html" class="nav-link">Event Binding</a>, <a href="page-not-found.html" class="nav-link">Practical Projects: Four Unique Games</a>, and <a href="compiler-and-kernel.html" class="nav-link">Compiler and Kernel</a>.
  </span>
</div>
