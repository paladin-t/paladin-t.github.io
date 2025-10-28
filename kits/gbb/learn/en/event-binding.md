# Event Binding

[Prev]() [Next]()

This section will introduce how to define events for actors and triggers, bind handlers in the editor, and considerations for writing handlers.

## Events for Objects

### Trigger Events

A trigger is used to play a role of interactable area that fires an event when a player walks into it or leaves from it. For the built-in [Actor Behaviours](page-not-found.html), triggers only collide with actors that perform player controllers.

#### Defining Trigger Event in Scene Editor

Switch to and enable the triggers layer in the scene editor to define a trigger.

<img src="imgs/editor-scene-selecting-layer-of-trigger.png" class="diagram-image diagram-screenshot">

<div class="small-note">Selecting the "Triggers" layer</div>

Select a hit type for the trigger's event type.

<img src="imgs/editor-scene-selecting-event-of-trigger.png" class="diagram-image diagram-screenshot">

<div class="small-note">Selecting trigger event type</div>

Select and bind an event handler for the trigger.

<img src="imgs/editor-scene-binding-events-for-trigger.png" class="diagram-image diagram-screenshot">

<div class="small-note">Binding trigger event</div>

### Actor Events

Generally, for the built-in [Actor Behaviours](page-not-found.html), you can assign an event handler to an actor to handle collisions and interactions.

#### Defining Actor Event in Actor Editor

Select and bind the default event handlers for the actor in the actor editor.

<img src="imgs/editor-actor-binding-events.png" class="diagram-image diagram-screenshot">

<div class="small-note">Binding actor event</div>

#### Overriding Actor Event in Scene Editor

Switch to the actors layer in the scene editor, and make sure that layer is enabled.

<img src="imgs/editor-scene-selecting-layer-of-actor.png" class="diagram-image diagram-screenshot">

<div class="small-note">Selecting the "Actors" layer</div>

Override the scene-wise event handlers for the actor in the scene editor.

<img src="imgs/editor-scene-binding-events-for-actor.png" class="diagram-image diagram-screenshot">

<div class="small-note">Overridding actor event</div>

### Projectile Events

Projectile event handling is not implemented by binding routines to the projectile itself, but is instead managed by the actor. For details, refer to the [Parameters of Projectile Events](#parameters-of-projectile-events) part in this page.

## Binding Events

### Binding Event Handlers in Editor

When binding a routine, switch to the target code page in the popup code dialog box, select the target code line, and then click the ok button to confirm and complete the binding.

<img src="imgs/editor-code-selecting-handler-of-event.png" class="diagram-image diagram-screenshot">

<div class="small-note">Binding to code</div>

### Binding Event Handlers in Code

In addition to binding event handlers in the editors, they can also be binded directly in the code.

#### Binding Trigger Event Handler in Code

Key code as follows. See [Trigger](trigger.html) for more information.

```basic
dim trigger[1]
on trigger(0) ENTER bor LEAVE start OnHits
```
<!-- prg
!edit, run, title="Binding trigger event handler in code", style=""
dim trigger[1]
on trigger(0) ENTER bor LEAVE start OnHits

OnHits:
  ' Do something.
  end
-->

#### Binding Actor Event Handler in Code

Key code as follows. See [Actors](actor.html) for more information.

```basic
let a = new actor()
on actor(a) hits start OnHits
```
<!-- prg
!edit, run, title="Binding actor event handler in code", style=""
let a = new actor()
on actor(a) hits start OnHits

end

OnHits:
  ' Do something.
  end
-->

## Using Event Handlers

### How to Use Callback Parameters in Event Handlers

#### Parameters of Trigger Events

When a player actor enters or leaves a trigger, an `ENTER` or `LEAVE` event is triggered, and a callback routine is started as a thread on the actor, based on the hit type property set for the trigger in the scene editor. The event type and the trigger index are passed to the event handler routine as its stack local variables. The space for these parameters is automatically allocated and released when the callback thread ends. In most cases, manual release is not required.

```basic
' Load the scene.
load scene(0, 0) = #0
...
end

OnHits:
  ' Callback routine for the trigger events.
  begin def
    ' These lines of stack references are allocated by the kernel for this type of callback.
    ' [  STACK  TOP  ]
    def index = stack1 ' The index of the trigger.
    def event = stack0 ' The event type.
    ' [ STACK BOTTOM ]

    ' Handle the trigger event.
    if event = ENTER then
      if index = 0 then
        ...
      else ' if index = 1 then
        ...
      end if
    else ' if event = LEAVE then
      ...
    end if
    end
  end def
```
<!-- prg
!edit, run, title="Parameters of trigger events", style=""
url://prgs/trigger-event-1.txt
-->

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    In the program above, we created two triggers in the scene editor and binded their event handlers. Since triggers themselves are invisible, we added two special areas on the map to locate them. For demonstration purposes, we used a simple shell function to output trigger event information to the simulator's debug layer.
    <br>
    Try running the program and move the player character to enter and leave the two triggers in the scene. Then see the output.
  </span>
</div>

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <span>Trigger indices start from 0 and increment according to their creation order in the scene editor.</span>
    <br>
    <br>
    <img src="imgs/editor-scene-trigger-objects.png" class="diagram-image diagram-screenshot">
  </span>
</div>

#### Parameters of Actor Events

##### Simple Parameters of Actor Events

When a player actor collides with other actors, an on hits event is triggered, and a callback routine is started as a thread on the event owner actor. The event owner actor and the actor that caused the event are passed as parameters to the event handler routine as its stack local variables. The space for these parameters is automatically allocated and released when the callback thread ends. In most cases, manual release is not required.

```basic
' Load the scene.
load scene(0, 0) = #0

' Initialize the variables.
let n0 = find actor("Number0")
let n1 = find actor("Number1")

end

OnHits:
  ' Callback routine for the actor events.
  begin def
    ' These lines of stack references are allocated by the kernel for this type of callback.
    ' [  STACK  TOP  ]
    def obj0 = stack1  ' The event owner actor - a number actor in this program.
    def obj1 = stack0  ' The actor that caused the event - the player actor.
    ' [ STACK BOTTOM ]

    ' Handle the actor event.
    if obj0 = n0 then
      ...
    else ' if obj0 = n1 then
      ...
    end if
    end
  end def
```
<!-- prg
!edit, run, title="Parameters of actor events", style=""
url://prgs/actor-event-1.txt
-->

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    In the program above, we created two actors in the actor editor and binded their event handlers, then instantiated them in the scene editor. Whether actors overlap is determined by <a href="page-not-found.html" class="nav-link">Actor Controllers</a>. In this example, the Top-down controller we use does not cause actors to overlap. For demonstration purposes, we used a simple shell function to output trigger event information to the simulator's debug layer.
    <br>
    Try running the program and move the player character to touch the other two actors in the scene. Then see the output.
  </span>
</div>

##### Detailed Parameters of Actor Events

GB BASIC supports detailed parameters for actor events. To use this feature, you need to turn on the `option ACTOR_HIT_WITH_DETAILS_ENABLED, true`. This feature is disabled by default. With this option on, the event handler routine receives the collision group and the direction of the event as extra parameters. The space for these parameters is automatically allocated and released when the callback thread ends. In most cases, manual release is not required.

```basic
' Load the scene.
option ACTOR_HIT_WITH_DETAILS_ENABLED, true ' Turn on this feature to distinguish hit directions and collision groups.
load scene(0, 0) = #0

' Initialize the variables.
let n0 = find actor("Number0")
let n1 = find actor("Number1")

end

OnHits:
  ' Callback routine for the actor events.
  begin def
    ' These lines of stack references are allocated by the kernel for this type of callback.
    ' [  STACK  TOP  ]
    def obj0 = stack3  ' The event owner actor - a number actor in this program.
    def obj1 = stack2  ' The actor that caused the event - the player actor.
    def group = stack1 ' The collision group of the second actor.
    def dir = stack0   ' The direction of the event, is from the first object toward the second one.
    ' [ STACK BOTTOM ]

    ' Handle the actor event.
    if obj0 = n0 then
      ...
    else ' if obj0 = n1 then
      ...
    end if
    if dir = LEFT_DIR then
      ...
    else if dir = RIGHT_DIR then
      ...
    else if dir = UP_DIR then
      ...
    else ' if dir = DOWN_DIR then
      ...
    end if
    end
  end def
```
<!-- prg
!edit, run, title="Parameters with details of actor events", style=""
url://prgs/actor-event-2.txt
-->

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    The group parameter holds the collision group of the second actor. The direction parameter holds the direction of the event, which is from the first object toward the second one.
    <br>
    Try running the program and move the player character to touch the other two actors in the scene. Then see the output.
  </span>
</div>

#### Parameters of Projectile Events

When a projectile hits an actor, an on hits event is triggered, and a callback routine is started as a thread on the actor. The event owner actor and the projectile that caused the event are passed as parameters to the event handler routine as its stack local variables. The space for these parameters is automatically allocated and released when the callback thread ends. In most cases, manual release is not required.

Similar to actor events, GB BASIC supports detailed parameters for projectile events. To use this feature, you need to turn on the `option ACTOR_HIT_WITH_DETAILS_ENABLED, true`. With this option on, the event handler routine receives the collision group and the direction of the event as extra parameters.

```basic
' Load the scene.
option ACTOR_HIT_WITH_DETAILS_ENABLED, true ' Turn on this feature to distinguish hit directions and collision groups.
load scene(0, 0) = #0

' Setup the projectile.
fill projectile(126, 2) = "Bullet"
def projectile(0, 126) = "Bullet"

on btnd(B_BTN) start OnLaunchProjectile

' Initialize the variables.
let p = find actor("Player")
let n0 = find actor("Number0")
let n1 = find actor("Number1")

end

OnLaunchProjectile:
  ' Handle projectile launching.
  begin do
    start projectile(0) with actor(p)
    end
  end do

OnHits:
  ' Callback routine for the actor events.
  begin def
    ' These lines of stack references are allocated by the kernel for this type of callback.
    ' [  STACK  TOP  ]
    def obj0 = stack3  ' The event owner actor - a number actor in this program.
    def obj1 = stack2  ' The actor that caused the event - the player actor.
    def group = stack1 ' The collision group of the second actor.
    def dir = stack0   ' The direction of the event, is from the first object toward the second one.
    ' [ STACK BOTTOM ]

    ' Handle the projectile event.
    if obj1 is projectile then
      if obj0 = n0 then
        ...
      else ' if obj0 = n1 then
        ...
      end if
      ...
      end
    end if

    if obj0 = n0 then
      ...
    else ' if obj0 = n1 then
      ...
    end if
    ...
    end

    ...
  end def
```
<!-- prg
!edit, run, title="Parameters of projectile events", style=""
url://prgs/projectile-event-1.txt
-->

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    In the program above, we created a projectile in the actor editor, then defined and instantiated it in code. The group parameter holds the collision group of the projectile. The direction parameter holds the direction of the event, which is from the first object toward the second one.
    <br>
    Try running the program and press B to launch projectiles to hit the other actors. Then see the output.
  </span>
</div>

### How to Define Local Variables in Event Handlers

#### Why Not Use a <code>let</code> Statement

In short terms, variables or arrays declared with `let` or `dim` are allocated in the global memory space. Since event handlers run as concurrent threads, it's generally necessary to avoid issues caused by concurrent access to global variables. Using locks with `let`s doesn't always adequately address these requirements.

For more detailed information, review the [Avoiding Unexpected Concurrent State Access](thread-operations.html#avoiding-unexpected-concurrent-state-access) part in the [Thread Operations](thread-operations.html) section.

#### How to Declare Local Variables

Let's review the program demonstrated in [Actor Routines](actor.html#actor-routines). We used the `reserve` statement to allocate local variables on the stack for the current thread. We'll borrow code to adapt that program here.

```basic
BehaveNpc1:
  ' Behave as NPC1.
  begin def
    reserve 1        ' Reserve for `dir`.
    def dir = stack1 ' Allocated by the above `reserve` statement.
    def obj = stack0 ' Allocated by the kernel for this type of callback.

    UpdateNpc1:
      dir = rnd(START_DIR, END_DIR)
      set actor property(obj, DIRECTION_PROP) = dir
      ...
      goto UpdateNpc1
      end
  end def
```
<!-- prg
!edit, run, title="Declaring local variables", style=""
url://prgs/declaring-local-variables-1.txt
-->

Note that the variables we reserved and the callback parameters are on the same thread stack. Therefore, attention must be paid to their relative positions. For example, in this program, we used `reserve` to allocate space for `dir` (`stack1`), while `obj` (`stack0`) was allocated by the kernel for this type of callback. The same rule applies to other types of callbacks.

<img src="imgs/editor-code-reserve-statement.png" class="diagram-image diagram-screenshot">

<div class="small-note">Reserving stack space</div>

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    In the program above, we have allocated dedicated variables for the thread. This practice enhances code adaptability to better suit concurrent programming and enables code reuse.
    <br>
    Try running the program and watch how the actors behave.
  </span>
</div>

#### How to Use Local Variables

By using [Macro Stack Reference Aliases](macro-stack-reference-aliases.html) to define aliases to stack references, we can work with stack variables more intuitively. Now let's combine the knowledge we've learned into a single program. We declare some stack local variables in both `BehaveNpc1` and `OnHits` respectively. These two routines may execute concurrently and can work perfectly without interfering with each other.

```basic
BehaveNpc1:
  ' Behave as NPC1.
  begin def
    reserve 1        ' Reserve for `dir`.
    def dir = stack1 ' Allocated by the above `reserve` statement.
    def obj = stack0 ' Allocated by the kernel for this type of callback.

    UpdateNpc1:
      dir = rnd(START_DIR, END_DIR)
      set actor property(obj, DIRECTION_PROP) = dir
      ...
      goto UpdateNpc1
      end
  end def

OnHits:
  ' Callback routine for the actor events.
  begin def
    ' These lines of stack references are allocated by the kernel for this type of callback.
    ' [  STACK  TOP  ]
    def obj0 = stack3  ' The event owner actor - a number actor in this program.
    def obj1 = stack2  ' The actor that caused the event - the player actor.
    def group = stack1 ' The collision group of the second actor.
    def dir = stack0   ' The direction of the event, is from the first object toward the second one.
    ' [ STACK BOTTOM ]

    ...
  end def
```
<!-- prg
!edit, run, title="Using local variables", style=""
url://prgs/using-local-variables-1.txt
-->

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    In the program above, we have allocated dedicated variables for the thread. This practice enhances code adaptability to better suit concurrent programming and enables code reuse.
    <br>
    Try running the program and operate the player character. Then watch how the actors behave.
  </span>
</div>

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="stack-operations.html" class="nav-link">Stack Operations</a>, <a href="the-memory-model.html" class="nav-link">The Memory Model</a>, <a href="the-thread-model.html" class="nav-link">The Thread Model</a>, <a href="macro-stack-reference-aliases.html" class="nav-link">Macro Stack Reference Aliases</a>, <a href="thread-operations.html" class="nav-link">Thread Operations</a>, <a href="collision-detection-and-response.html" class="nav-link">Collision Detection and Response</a>, and <a href="page-not-found.html" class="nav-link">Actor Behaviours</a>.
  </span>
</div>

<!-- gem -->
