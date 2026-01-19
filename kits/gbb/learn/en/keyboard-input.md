# Keyboard Input

[Prev]() [Next]()

_The keyboard input feature (experimental) supports transfering key codes and modifiers from the host environment to the VM, which allows GB BASIC users to interact with it not limited to the eight buttons._

This section introduces using keyboard input with register operations.

Try the following program.

```basic
def KEYM = 0xFEA8
def KEYC = 0xFEA9

loop:
  let k = peek(KEYC)   ' Get the key code.
  if k <> 0 then       ' If a key code is available.
    let m = peek(KEYM) ' Get the key modifiers.
    print "Key pressed %d, %x", k, m
    poke KEYC, 0       ' Clear the key code, and acknowledge to accept more key codes.
  end if
  update
  goto loop
```
<!-- prg
!edit, run, title="Keyboard input", style=""
if not query IS_GBB then
  print "Invalid device"
  end
end if

print "Press some key..."

def KEYM = 0xFEA8
def KEYC = 0xFEA9

loop:
  let k = peek(KEYC)   ' Get the key code.
  if k <> 0 then       ' If a key code is available.
    let m = peek(KEYM) ' Get the key modifiers.
    print "Key pressed %d, %x", k, m
    poke KEYC, 0       ' Clear the key code, and acknowledge to accept more key codes.
  end if
  update
  goto loop
-->

## API

There are two special registers that can be used to get the status of the key modifiers and the last pressed key code.

| Addresses | Name   | Description                    | Access     |
|-----------|--------|--------------------------------|------------|
| 0xFEA8    | `KEYM` | Key modifier flags             | Read-only  |
| 0xFEA9    | `KEYC` | First valid key code in buffer | Read/write |

* `KEYM`: the key modifier flags, `0x00` for no pressing, `0x01` for **Ctrl**, `0x02` for **Shift**, `0x04` for **Alt**, `0x08` for **Meta**, and these bits can be combined
* `KEYC`: the key code, with range of values from 0 to 255, `0x00` for no key pressed; after reading, also write `0x00` to it to acknowledge to accept more key codes

`Peek` the `KEYM` register to get the key modifiers. `Peek` the `KEYC` register to get the last pressed key code, then `poke` the `KEYC` register to `0x00` to acknowledge to accept more key codes, i.e.

**See also:** _[Key codes](https://paladin-t.github.io/kits/gbb/extensions.html#keyboard-input)._

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="extension-features.html" class="nav-link">Extension Features</a>.
  </span>
</div>
