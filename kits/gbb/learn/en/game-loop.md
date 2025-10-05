# Game Loop

[Prev]() [Next]()

In GB BASIC, there are two update modes, manual mode and auto mode. In manual mode, programmers are in charge of explicitly invoking an `update` call at the close of each loop iteration to signal the completion of the current frame and allow the runtime to update internal states. In contrast, auto mode, as its name implies, does not require `update` call or in-code update loop, as the runtime handles these operations automatically.

* `auto update on`: turns on the auto update mechanism
* `auto update off`: turns off the auto update mechanism, GB BASIC operates in this way by default

By default, GB BASIC operates in the manual mode. The command `auto update on` enables the auto mode, while `auto update off` disables it.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    In most cases, it is recommended to use the automatic update mode.
  </span>
</div>

* `update`: updates all game status and events manually
* `=time`: gets the system time that increments once per Frame; will wrap around every ~18 minutes
  * returns the system time

In manual update mode, programmers need to explicitly call `update` once per cycle in main loop to notify the runtime that the current frame has completed and allow the runtime to update internal states.
