# Playing Music

[Prev]() [Next]()

* `play #pg|"{name}"|"{builtin}"`: plays music of the specific asset page or builtin asset
  * objectives:
    * `#pg`: music page index
    * `name`: music asset name
    * `"{builtin}"`: the name of a builtin entry
<!-- * `play bank, addr` -->
* `stop`: stops the current music playback

Try the following example.

```basic
sound on
print "A to play"
print "B to stop"

loop:
  if btnu(A_BTN) then
    play #0
  else if btnu(B_BTN) then
    stop
  end if
  update
  goto loop
```
<!-- prg
!edit, run, title="Playing music", style=""
url://prgs/music-1.txt
-->

<!-- gem -->
