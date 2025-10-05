# Data Types

[Prev]() [Next]()

## Memory Management

All the data types including ID are value-types in the language. In other words memory of variables per se are managed by GB BASIC itself rather than by a programmer. But the object "value" referenced by an ID "variable" is not always automatically managed.

Thus a programmer is in charge of creating and deleting objects properly, or there will be memory leak. In particular, "actor" should be deleted when it's no longer in use; however "projectile" will be automatically collected when it's no longer alive; and "trigger" is array based, it will be collected when scene unloads, system shuts down, or shrunk manually.

Do not assume that the allocated ID values of threads, actors, and projectiles remain constant across different versions of GB BASIC.

## Number Calculation

The runtime of GB BASIC emulates an 8-bit CPU with limited processing power, making floating-point calculations costly. To optimize running speed, GB BASIC represents all numeric data as integers, specifically 16-bit signed integers. But what about operations like speed accumulation? To address this, GB BASIC employs scaled integers. For example, an actor's movement speed is scaled by 1/16. Therefore, a movement speed value of 16 for an actor indicates a speed of 1x, a value of 1 signifies 1/16x, and 32 represents 2x, and so on.

## Trigonometric Functions

Due to the integer nature of GB BASIC, the domain of angle values and related trigonometric functions is mapped from "0° to 360°" to "0 to 256", and the range of sine and cosine trigonometric functions is mapped from "-1.0 to 1.0" to "-127 to 127".

| Degree | GB BASIC representation | Sine | Cosine |
|--------|-------------------------|------|--------|
|   0°   |   0                     |    0 |  127   |
|   1°   |   0                     |    3 |  127   |
|   2°   |   1                     |    6 |  127   |
| ...    | ...                     |  ... |  ...   |
|  90°   |  64                     |  127 |    0   |
| ...    | ...                     |  ... |  ...   |
| 180°   | 128                     |    0 | -127   |
| ...    | ...                     |  ... |  ...   |
| 270°   | 192                     | -127 |    0   |
| ...    | ...                     |  ... |  ...   |
| 358°   | 254                     |   -6 |  127   |
| 359°   | 255                     |   -3 |  127   |
| 360°   |   0 (256)               |    0 |  127   |

The `=deg(angle)` function provides a convenient way to map angles with a domain of 0° to 360° to an internal representation ranging from 0 to 256.
