# Special Effects

[Prev]() [Next]()

| Effect types      | Note                                                   |
|-------------------|--------------------------------------------------------|
| `PULSE_EFFECT`    | Performs tile animation                                |
| `PARALLAX_EFFECT` | Performs parallax scrolling                            |
| `WOBBLE_EFFECT`   | Performs wobbling through scanlines (**experimental**) |

* `fx PULSE_EFFECT, interval, t0, n0, #pg_0a|#pg:n_0a, #pg_0b|#pg:n_0b[, ...]`: enables the pulse effect
  * `interval`: the flip interval
  * `t0`: the start tile index to modify
  * `n0`: the tile count to modify
  * objectives (a):
    * `#pg_0a`: tiles page index for the first state
    * `#pg:n_0a`: tiles page index and tile index for the first state
    * `#pg_0b`: tiles page index for the second state
    * `#pg:n_0b`: tiles page index and tile index for the second state
  * `...`: optional variadic arguments; for the second and more groups of values
* `fx PULSE_EFFECT`: disables the pulse effect

* `fx PARALLAX_EFFECT, lo0, hi0, sft0[, ...]`: enables the parallax effect (and stops any wobble effect); takes up to three sections of data
  * `lo0`: the start y tile index of the parallax section
  * `hi0`: the end y tile index of the parallax section
  * `sft0`: the shift value
  * `...`: optional variadic arguments; for the second and third groups of values
* `fx PARALLAX_EFFECT`: disables the parallax effect

* `fx WOBBLE_EFFECT, val`: **experimental**, enables the wobble effect (and stops any parallax effect); for colored device only
  * `val`: the wobble value, with range of value from 0 to 15
* `fx WOBBLE_EFFECT`: **experimental**, disables the wobble effect

// TODO
