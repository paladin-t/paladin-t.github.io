# Trigger

[Prev]() [Next]()

## Making Triggers

You can create trigger objects in the scene editor. To make use of triggers, instantiate them in the scene editor as well or using code.

Note that trigger is a logical object, it does not have any visual representation at runtime but just defines an area with events.

### Defining Triggers in Scene Editor

Switch to and enable the triggers layer in the scene editor to define triggers.

<img src="imgs/editor-scene-making-triggers.png" class="diagram-image diagram-screenshot">

<div class="small-note">Making triggers in scene editor</div>

### Defining Triggers in Code

You can define triggers in code as well. Use the `dim trigger[n]` statement to allocate triggers, and use the `def trigger` statement to define the trigger's area. Call the `on trigger` statement to register a callback for when the player enters or leaves the trigger. For example:

```basic
dim trigger[1]                             ' Allocate 1 trigger.
def trigger(0) = 7, 8, 2, 2                ' Put the trigger somewhere.
on trigger(0) ENTER bor LEAVE start OnHits ' Register a callback for the trigger which will be called when the player enters or leaves it.
```
<!-- prg
!edit, run, title="Using trigger in code", style=""
dim trigger[1]                             ' Allocate 1 trigger.
def trigger(0) = 7, 8, 2, 2                ' Put the trigger somewhere.
on trigger(0) ENTER bor LEAVE start OnHits ' Register a callback for the trigger which will be called when the player enters or leaves it.

end

OnHits:
  ' Do something.
  end
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="event-binding.html" class="nav-link">Event Binding</a> for more information about trigger event callbacks.
  </span>
</div>

## API

### Allocating and Defining Triggers

* `dim trigger[n]`: specifies the active trigger count, this function has the same influence with `option ACTIVE_TRIGGERS, n`; this function does not clear triggers before `n`
  * `n`: the trigger count
* `def trigger(idx) = x, y, w, h`: defines the specific trigger's area
  * `idx`: the trigger index to define
  * `x`: the x position in tiles
  * `y`: the y position in tiles
  * `w`: the width of area to set in tiles, with range of values from 1 to 255
  * `h`: the height of area to set in tiles, with range of values from 1 to 255
* `def trigger(idx) = read|data ...`: defines the specific trigger's area with data sequence
  * `idx`: the trigger index to define

### Trigger Callbacks

* `on trigger(idx) evt start lno|lbl|#pg:lno|#pg:lbl`: registers a callback for when the player enters or leaves the trigger
  * `idx`: the trigger index
  * `evt`: the event type; can be one or more of the following "Events" constants
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
  * **see also:** _[Cheat Sheet of Collision Rules](https://paladin-t.github.io/kits/gbb/manual.html#cheat-sheet-of-collision-rules)._
* `off trigger(idx) evt`: unregisters a callback for when the player enters or leaves the trigger
  * `idx`: the trigger index
  * `evt`: the event type; can be one or more of the following "Events" constants

A trigger callback is a routine that takes two parameters for the trigger index and event respectively. See the following callback signature for detail.

* signature of trigger callback `(idx, evt)`
  * `idx`: the trigger index
  * `evt`: the event type; can be one or more of the following "Events" constants

| Events  | Note                                  |
|---------|---------------------------------------|
| `ENTER` | Occurs when a player enters a trigger |
| `LEAVE` | Occurs when a player leaves a trigger |

Triggers' hit callbacks can be binded in the scene editor, the bindings will be assigned automatically during scene loading.

Try the following project, which demonstrates how to create trigger and let an actor interact with it.

![edit, run, style="width: 640px;"](imgs/running-trigger.png)
<!-- prg
!edit, run, title="Playing with trigger", style=""
url://prgs/trigger-1.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="event-binding.html" class="nav-link">Event Binding</a>.
  </span>
</div>
