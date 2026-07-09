# Native Functions

[Prev]() [Next]()

This section includes several functions that were implemented as native functions in the kernel.

## API

* `call func[, ...]`: calls the specific native function without return value
  * `func`: the native function to call, the name is case-sensitive; can be one of the following "Functions"
  * `...`: optional variadic arguments; numeric values separated by comma
* `=call func[, ...]`: calls the specific native function with return value
  * `func`: the native function to call, the name is case-sensitive; can be one of the following "Functions"
  * `...`: optional variadic arguments; numeric values separated by comma
  * returns the return value of the native function

Some native functions have corresponding short syntax forms that are semantically equivalent.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    If a short syntax is available, it is recommended to use it whenever possible.
  </span>
</div>

| Functions                                                            | Short syntax              | Note                                                                                                              |
|----------------------------------------------------------------------|---------------------------|-------------------------------------------------------------------------------------------------------------------|
| `=call peek_banked bank, addr, wordwise`                             | `=peek [int](bank, addr)` | Gets the value at the specific banked memory address                                                              |
| `call clear_text`                                                    | `cls`                     | Clears the screen for the `TEXT_MODE`                                                                             |
| `call wait_for n`                                                    | `wait n`                  | Waits for `n` frames on the current thread                                                                        |
| `call wait_until_confirm`                                            | -                         | Waits until the A or Start button has been pressed; or anywhere of the screen has been tapped (extension feature) |
| `=call wait_for_key_code` (**experimental**)                         | -                         | Waits until a key on keyboard has been pressed; returns `(modifiers LSHIFT 4) BOR key` (extension feature)        |
| `=call wait_for_key_ascii` (**experimental**)                        | -                         | Waits until a key on keyboard has been pressed; returns the ASCII code (extension feature)                        |
| `call rumble n[, i]`                                                 | -                         | Rumbles for `n` frames with intensity `i`                                                                         |
| `call send_sgb_packet bank, addr, sz`                                | -                         | Sends a packet of bytes to SGB device                                                                             |
| `call set_sgb_border pb, paddr, psz, tb, taddr, tsz, mb, maddr, msz` | -                         | Sets border frame for SGB device                                                                                  |
| `call error`                                                         | -                         | Raises an error                                                                                                   |
| `call camera_shake n, d`                                             | -                         | Shakes camera for `n` frames with ["Camera shake directions"](camera.html) specified by `d`                       |
| `call install_vbl_isr`                                               | -                         | Installs an overridable VBL ISR defined in named assembly block (do not need to call it manually)                 |
| `call uninstall_vbl_isr`                                             | -                         | Installs the overridable VBL ISR defined in named assembly block (do not need to call it manually)                |
| `call install_lcd_isr`                                               | -                         | Installs an overridable LCD ISR defined in named assembly block (do not need to call it manually)                 |
| `call uninstall_lcd_isr`                                             | -                         | Installs the overridable LCD ISR defined in named assembly block (do not need to call it manually)                |

The `=call wait_for_key_code` and `=call wait_for_key_ascii` functions are extension and experimental features. The `=call wait_for_key_ascii` function returns the literal ASCII value of a letter, digit, or symbol, or a special control value. See the "Key ASCII" constants below.

| Key ASCII                 | Value                  |
|---------------------------|------------------------|
| `'A'` to `'Z'`            | `65` to `90`           |
| `'a'` to `'a'`            | `97` to `122`          |
| `'0'` to `'1'`            | `48` to `57`           |
| `'!'`, `'@'`, `'#'`, etc. | `33`, `64`, `35`, etc. |
| Space                     | `32`                   |
| Return                    | `13`                   |
| Esc                       | `27`                   |
| Backspace                 | `8`                    |
| Up arrow                  | `5` (`0x05`)           |
| Down arrow                | `24` (`0x18`)          |
| Left arrow                | `19` (`0x13`)          |
| Right arrow               | `4` (`0x04`)           |
| LCtrl/RCtrl               | `224`/`228`            |
| LShift/RShift             | `225`/`229`            |
| LAlt/RAlt                 | `226`/`230`            |

**See also:** _[Keyboard Input](https://paladin-t.github.io/kits/gbb/manual.html#keyboard-input) for information about keyboard extension._

The `call rumble n[, i]` function waits until `n` frames elapsed, the intensity argument can be one of the following "Rumble intensity" constants or an arbitrary frame mask. This feature requires the "Rumble" feature in a project's property and a cartridge that supports motor rumble.

| Rumble intensity          | Value  | Note          |
|---------------------------|--------|---------------|
| `RUMBLE_INTENSITY_LOW`    | `0x01` |               |
| `RUMBLE_INTENSITY_MEDIUM` | `0x02` |               |
| `RUMBLE_INTENSITY_HIGH`   | `0x03` |               |
| `RUMBLE_INTENSITY_MAX`    | `0xFF` | Default value |

<!-- Extra kernels can provide more native functions. -->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="thread-operations.html" class="nav-link">Thread Operations</a>; <a href="memory-operations.html" class="nav-link">Memory Operations</a>; <a href="camera.html" class="nav-link">Camera</a>; <a href="sgb-features.html" class="nav-link">SGB Features</a>.
  </span>
</div>
