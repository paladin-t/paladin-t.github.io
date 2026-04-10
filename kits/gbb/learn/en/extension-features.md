# Extension Features

[Prev]() [Next]()

GB BASIC includes a set of extension features. Some have been introduced and used in previous sections. This section provides a comprehensive description of all extension features.

## Compatibility Detection

```basic
if not query IS_GBB then
  print "Invalid device" ' Does not supports extension features.
  end
end if

print "Supports GBB"     ' Supports extension features.
```
<!-- prg
!edit, run, title="Compatibility detection", style=""
if not query IS_GBB then
  print "Invalid device" ' Does not supports extension features.
  end
end if

print "Supports GBB"     ' Supports extension features.
-->

## Platform Detection

Query device with `PLATFORM_FLAGS` or read from memory address `0xFEA1` to get the platform dependent flags, and then use the following code to check if the program is running on a specific platform.

```basic
' See https://paladin-t.github.io/kits/gbb/extensions.html#ram-map for details.
let flags = query(PLATFORM_FLAGS) ' or `peek(0xFEA1)`.

let os = flags band 0b00001111
select case os
  case 0b00000001
    print " OS: Windows"
  case 0b00000010
    print " OS: Linux"
  case 0b00000100
    print " OS: MacOS"
  case 0b00001000
    print " OS: HTML"
  else
    print " OS: Unknown"
end select

if flags band 0b10000000 then
  print "Env: Editor"
else
  print "Env: Emulator"
end if
```
<!-- prg
!edit, run, title="Platform detection", style=""
if not query IS_GBB then
  print "Invalid device"
  end
end if

' See https://paladin-t.github.io/kits/gbb/extensions.html#ram-map for details.
let flags = query(PLATFORM_FLAGS) ' or `peek(0xFEA1)`.

let os = flags band 0b00001111
select case os
  case 0b00000001
    print " OS: Windows"
  case 0b00000010
    print " OS: Linux"
  case 0b00000100
    print " OS: MacOS"
  case 0b00001000
    print " OS: HTML"
  else
    print " OS: Unknown"
end select

if flags band 0b10000000 then
  print "Env: Editor"
else
  print "Env: Emulator"
end if
-->

**See also:** _[Extensions/RAM Map](https://paladin-t.github.io/kits/gbb/extensions.html#ram-map)._

## Mouse and Touch

Refer to  [Mouse and Touch Input](mouse-and-touch-input.html).

## Keyboard Input

Refer to  [Keyboard Input](keyboard-input.html).

## Streaming

The "streaming" API supports transfering binary data from the VM to the host environment, then the host environment will save the transfered data to a file.

* `stream val`: streams one byte to the host environment
  * `val`: the byte value to be transferred, with range of values from 0 to 255
* `stream end`: indicates end-of-stream

```basic
loop:
  if btnd(A_BTN) then
    ' Streaming binary data with the `stream` statement.
    stream asc("H")
    stream asc("e")
    stream asc("l")
    stream asc("l")
    stream asc("o")
    stream asc(" ")
    stream asc("W")
    stream asc("o")
    stream asc("r")
    stream asc("l")
    stream asc("d")
    stream asc("!")
    stream end
    print "Ok"
  end if
  update
  goto loop
```
<!-- prg
!edit, run, title="Streaming", style=""
if not query IS_GBB then
  print "Invalid device"
  end
end if

print "Press A..."

loop:
  if btnd(A_BTN) then
    ' Streaming binary data with the `stream` statement.
    stream asc("H")
    stream asc("e")
    stream asc("l")
    stream asc("l")
    stream asc("o")
    stream asc(" ")
    stream asc("W")
    stream asc("o")
    stream asc("r")
    stream asc("l")
    stream asc("d")
    stream asc("!")
    stream end
    print "Ok"
  end if
  update
  goto loop
-->

## Shell Command

* `shell cmd`: executes the specific shell command
  * `cmd`: the shell command string

If `cmd` starts with "http://" or "https://", it will be treated as a URL and an attempt will be made to open the URL. If it starts with "file://", it will be treated as a file path and an attempt will be made to browse that path. Otherwise, it will be treated as a command-line command and an attempt will be made to execute the command.

```basic
loop:
  if btnd(A_BTN) then
    ' Web surfing with the `shell` statement.
    shell "https://paladin-t.github.io/"
    print "Ok"
  end if
  update
  goto loop
```
<!-- prg
!edit, run, title="Shell commands", style=""
if not query IS_GBB then
  print "Invalid device"
  end
end if

print "Press A..."

loop:
  if btnd(A_BTN) then
    ' Web surfing with the `shell` statement.
    shell "https://paladin-t.github.io/"
    print "Ok"
  end if
  update
  goto loop
-->

### Emulation Control

* `shell "||"`: executes a specialized command to pause emulation
  * `||`: required to indicate for pause
* `shell "[]"`: executes a specialized command to stop emulation
  * `[]`: required to indicate for stop

This is a specialized version of the `shell` command to control emulation.

### Debugging

* `shell ">fmt"[, ...]`: executes a specialized command for debug
  * `>`: required to indicate for debug
  * `fmt`: the format string, accepts the `print` "Escapes" for value interpretation
  * `...`: variadic data; numeric values separated by comma

This is a specialized version of the `shell` command for outputing some values in a running program to the GB BASIC window, i.e. `shell ">debug %d", n`.

```basic
let n = 0
loop:
  ' Simple debug output with the `shell` statement.
  if btnd(A_BTN) then
    shell ">debug %d", n
    n = n + 1
  end if
  update
  goto loop
```
<!-- prg
!edit, run, title="Debugging", style=""
if not query IS_GBB then
  print "Invalid device"
  end
end if

print "Press A..."

let n = 0
loop:
  ' Simple debug output with the `shell` statement.
  if btnd(A_BTN) then
    shell ">debug %d", n
    n = n + 1
  end if
  update
  goto loop
-->

### Setting Mouse Cursor

* `shell "^type"`: sets the mouse cursor type
  * `^`: required to indicate for cursor preference
  * `type`: the cursor type; can be one of the following "Mouse cursors" constants

| Mouse cursors | Note                |
|---------------|---------------------|
| `NONE`        | No cursor           |
| `POINTER`     | A regular pointer   |
| `HAND`        | Often for clickable |
| `BUSY`        | For busy            |

This is a specialized version of the `shell` command for setting the mouse cursor when it hovers on the emulation area.

### Syncing Modules

* `shell "@{module}"`: syncs the specific module
  * `"@{module}"`: the module name to sync; can be one of the following "Modules"

| Modules   | Note        |
|-----------|-------------|
| `"@sram"` | SRAM module |

For the moment only SRAM module is supported - `shell "@sram"` - this command notifies the emulator to save the SRAM. While not strictly required, it is recommended to ensure that the SRAM is saved when running within a GB BASIC emulator as part of an HTML export. Leaving this line unchanged is safe for other hardware and platforms.

This is a specialized version of the `shell` command for syncing modules.

### Dummy Command

* `shell "$..."`: performs a dummy shell command
  * `"$..."`: the dummy command

This type of command does nothing, but a stub or placeholder. However it is possible to introduce customized command handler by modifying the source code.

This is a specialized version of the `shell` command as placeholder.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="mouse-and-touch-input.html" class="nav-link">Mouse and Touch Input</a>, <a href="keyboard-input.html" class="nav-link">Keyboard Input</a>, and <a href="debugging-techniques.html" class="nav-link">Debugging Techniques</a>.
  </span>
</div>
