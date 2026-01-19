# Audio

[Prev]() [Next]()

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    This chapter covers technical information about audio features. Good music and sound effects are essential for an engaging game, so it is recommended that you spend some time reading this chapter.
  </span>
</div>

The audio system supports four channels, including two duty (square wave), one wave (custom waveform), and one noise generator. It should be noted that both music and all sound effects share these four channels, so playing a sound effect will briefly override the corresponding music channel for a short while.

The following APIs are used to turn the audio system on and off. Before playing any sound, make sure to execute `sound on`.

* `sound on`: turns on the sound feature for music or SFX
* `sound off`: turns off the sound feature

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="system-overview.html" class="nav-link">System Overview</a>.
  </span>
</div>
