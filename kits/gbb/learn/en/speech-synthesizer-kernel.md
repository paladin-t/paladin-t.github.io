# Speech Synthesizer Kernel

[Prev]() [Next]()

This kernel implements a realtime speech synthesizer that outputs gibberish voice on Game Boy.

## Technical Notes

The module uses the second square channel (the `NR2y` registers) for audio output. It was created primarily with English scenarios in mind. Thanks to its gibberish style, it also works well with non-English text, and you can write text for other languages based on English spelling-pronunciation rules.

## Predefined Macros

This kernel has the following predefined macros:

```basic-readonly
HAS_SPEECH=1
```

## API Usage

The APIs are implemented as extra native functions, see the usages as follows:

* `call tune vol, spd, pitch`: setups the speech options
  * `vol`: the volume
  * `spd`: the speed
  * `pitch`: the pitch
* `call say "words"`: speaks something
  * `words`: the text to speak
* `call hush`: stops speaking

## Examples

```basic
print "Press A"

' Turn the sound on.
sound on

' Setup the speech options, parameters for volume, speed, and pitch respectively.
call tune 14, 7, 100

loop:
  if btnu(A_BTN) then
    print "Hello World!"
    ' Speak something.
    call say "Hello World!"
  else if btnu(B_BTN) then
    ' Stop speaking.
    call hush
  end if
  update
  goto loop
```
<!-- prg
!edit, run, title="Speech", style=""
url://prgs/official-kernel-speech-1.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="official-kernels.html" class="nav-link">Official Kernels</a>, and <a href="https://github.com/paladin-t/gbb/releases/latest.html" class="nav-link">latest GitHub release</a>.
  </span>
</div>
