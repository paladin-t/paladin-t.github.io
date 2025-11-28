# Native Functions

[Prev]() [Next]()

* `call func[, ...]`: calls the specific native function without return value
  * `func`: the native function to call, the name is case-sensitive; can be one of the following "Functions"
  * `...`: optional variadic arguments; numeric values separated by comma
* `=call func[, ...]`: calls the specific native function with return value
  * `func`: the native function to call, the name is case-sensitive; can be one of the following "Functions"
  * `...`: optional variadic arguments; numeric values separated by comma
  * returns the return value of the native function

| Functions                                                            | Short syntax              | Note                                                                                                           |
|----------------------------------------------------------------------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| `=call peek_banked bank, addr, wordwise`                             | `=peek [int](bank, addr)` | Gets the value at the specific banked memory address                                                           |
| `call clear_text`                                                    | `cls`                     | Clears the screen for the `TEXT_MODE`                                                                          |
| `call wait_for n`                                                    | `wait n`                  | Waits for `n` frames on the current thread                                                                     |
| `call wait_until_confirm`                                            | -                         | Waits until the A/Start button has been pressed; or anywhere of the screen has been tapped (extension feature) |
| `call send_sgb_packet bank, addr, sz`                                | -                         | Sends a packet of bytes to SGB devices                                                                         |
| `call set_sgb_border pb, paddr, psz, tb, taddr, tsz, mb, maddr, msz` | -                         | Sets border frame for SGB devices                                                                              |
| `call error`                                                         | -                         | Raises an error                                                                                                |
| `call camera_shake n, d`                                             | -                         | Shake camera for `n` frames with ["Camera shake directions"](#scene) specified by `d`                          |

<!-- Extra kernels can provide more native functions. -->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="thread-operations.html" class="nav-link">Thread Operations</a>; <a href="page-not-found.html" class="nav-link">Memory Operations</a>; <a href="page-not-found.html" class="nav-link">Camera</a>; <a href="page-not-found.html" class="nav-link">SGB Features</a>.
  </span>
</div>
