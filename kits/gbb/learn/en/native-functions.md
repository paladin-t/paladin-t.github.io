# Native Functions

[Prev]() [Next]()

* `call func[, ...]`: calls the specific native function
  * `func`: the native function to call, the name is case-sensitive; can be one of the following "Functions"
  * `...`: optional variadic arguments; numeric values separated by comma

| Functions                 | Short syntax | Note                                                                                                           |
|---------------------------|--------------|----------------------------------------------------------------------------------------------------------------|
| `call clear_text`         | `cls`        | Clears the screen for the `TEXT_MODE`                                                                          |
| `call wait_for n`         | `wait n`     | Waits for `n` frames on the current thread                                                                     |
| `call wait_until_confirm` | -            | Waits until the A/Start button has been pressed; or anywhere of the screen has been tapped (extension feature) |
| `call error`              | -            | Raises an error                                                                                                |
| `call camera_shake n, d`  | -            | Shake camera for `n` frames with ["Camera shake directions"](https://paladin-t.github.io/kits/gbb/manual.html#scene) specified by `d`                          |

<!-- Extra kernels can provide more native functions. -->
