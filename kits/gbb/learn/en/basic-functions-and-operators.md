# Basic Functions and Operators

[Prev]() [Next]()

## Time

* `sleep(ms)`: sleeps for the specific milliseconds; this statement blocks all threads
  * `ms`: the milliseconds

## Program

* `end`: ternimates the current program

## Application

* `reset`: performs a warm reset by reloading and re-executing the program; this statement restarts the whole program immediately

## Array and String

* `=len(str)`: gets the length of the specific string
  * `str`: the string to measure
  * returns the length of the string
* `=len(arr)`: gets the length of all the dimensions of the specific array
  * `arr`: the array to measure
  * returns the length of the array

## Character

* `=asc(ch)`: gets the ASCII code of the specific character
  * `ch`: the character constant to examine, none-ASCII characters (with values greater than 255) are not accepted
  * returns the ASCII code
  * **see also:** _[ASCII Table](https://paladin-t.github.io/kits/gbb/manual.html#ascii-table)_

## Angle

* `=deg(angle)`: maps the specific angle from degree to GB BASIC representation
  * `angle`: the angle constant to map
  * returns the mapped angle

## Randomization

* `randomize`: seeds the randomizer
* `randomize seed`: seeds the randomizer with the specific seed
  * `seed`: the seed number
* `=rnd`: generates a random number
  * returns random value, with range of values from 0 to 100
* `=rnd(hi)`: generates a random number not greater than the specific high value
  * returns random value, with range of values from 0 to `hi`
* `=rnd(lo, hi)`: generates a random number between the specific pair of low and high values
  * returns random value, with range of values from `lo` to `hi`

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    The Game Boy is a very simple 8-bit system. Unlike more complex software and hardware systems, it has almost no inherent randomness. Therefore, to achieve more realistic randomness, it is common to call <code>randomize</code> to initialize the random number generator after player input has been received. This ensures that the random seed is different each time the program runs.
  </span>
</div>

Initializing the random number generator at the start of the game program often does not produce the desired random effect. Try running the following code multiple times.

```basic
randomize

print "%d, %d, %d, %d, %d", rnd, rnd, rnd, rnd, rnd
```
<!-- prg
!edit, run, title="Fake random", style=""
randomize

print "%d, %d, %d, %d, %d", rnd, rnd, rnd, rnd, rnd
-->

No matter when `randomize` is called, it incorporates the internal `SYS_TIME` and `DIV_REG` when initializing the random number generator. While the latter is influenced by user input. You can try calling `randomize` at a time when user input has already been received. Please try running the following code multiple times again.

```basic
print "Press any key..."
wait_for_input:
  if not btnu then ' Wait for user input.
    update
    goto wait_for_input
  end if
  randomize        ' Initialize the random number generator.

print "%d, %d, %d, %d, %d", rnd, rnd, rnd, rnd, rnd
```
<!-- prg
!edit, run, title="Randomization", style=""
print "Press any key..."
wait_for_input:
  if not btnu then ' Wait for user input.
    update
    goto wait_for_input
  end if
  randomize        ' Initialize the random number generator.

print "%d, %d, %d, %d, %d", rnd, rnd, rnd, rnd, rnd
-->
