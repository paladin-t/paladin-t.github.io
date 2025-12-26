# Scene Properties

[Prev]() [Next]()

## Property Definition

Expand the definition section in the scene editor to define the definition data of the scene.

<img src="imgs/editor-scene-definition.png" class="diagram-image diagram-screenshot">

<div class="small-note">Scene definition</div>

## Getting and Setting Scene Properties

* `=get scene width(#pg|"{name}")`: gets the width in tiles of the specific asset page
  * objectives:
    * `#pg`: scene page index
    * `name`: scene asset name
  * returns the width in tiles
* `=get scene height(#pg|"{name}")`: gets the height in tiles of the specific asset page
  * objectives:
    * `#pg`: scene page index
    * `name`: scene asset name
  * returns the height in tiles
* `=get scene property(x, y, prop)`: gets the scene property at the specific position
  * `x`: the x position in tiles
  * `y`: the y position in tiles
  * `prop`: the property type; can be one of the following "Blocking properties" constants
  * returns the property value
* `=get scene property(prop)`: gets the specific scene property
  * `prop`: the property type; can be one of the following "Scene properties" constants
  * returns the property value
* `set scene property(prop) = val`: sets the specific scene property
  * `prop`: the property type; can be one of the following "Scene properties" constants
  * `val`: the property value

| Scene properties         | Value type               | Note                                                             | Access     |
|--------------------------|--------------------------|------------------------------------------------------------------|------------|
| `IS_16x16_GRID`          | Boolean                  | Whether the scene grid is 16x16 or 8x8 for controlling           | Read/write |
| `IS_16x16_PLAYER`        | Boolean                  | Whether the player is approximately 16x16 or 8x8 for controlling | Read/write |
| `CLAMP_CAMERA_PROP`      | Boolean                  | Whether to clamp camera inside the scene                         | Read/write |
| `GRAVITY_PROP`           | Integer (8-bit unsigned) | Downward gravity value                                           | Read/write |
| `JUMP_GRAVITY_PROP`      | Integer (8-bit unsigned) | Upward gravity (jump)                                            | Read/write |
| `JUMP_MAX_COUNT_PROP`    | Integer (8-bit unsigned) | Max count the player can jump                                    | Read/write |
| `JUMP_MAX_TICKS_PROP`    | Integer (8-bit unsigned) | Max ticks the player can respond to jump instructions            | Read/write |
| `CLIMB_VELOCITY_PROP`    | Integer (8-bit unsigned) | Gravity for clambing                                             | Read/write |
| `WIDTH_PROP`             | Integer (8-bit unsigned) | Width of scene                                                   | Read/write |
| `HEIGHT_PROP`            | Integer (8-bit unsigned) | Height of scene                                                  | Read/write |
| `CAMERA_DEADZONE_PROP`   | Integer (8-bit unsigned) | Camera deadzone in both directions                               | Write-only |
| `CAMERA_DEADZONE_X_PROP` | Integer (8-bit unsigned) | Camera deadzone in x-axis                                        | Read/write |
| `CAMERA_DEADZONE_Y_PROP` | Integer (8-bit unsigned) | Camera deadzone in y-axis                                        | Read/write |

<!-- Extra kernels can provide more scene properties. -->

| Blocking properties   | Value type               | Note                                                        | Access    |
|-----------------------|--------------------------|-------------------------------------------------------------|-----------|
| `BLOCKING_PROP`       | Integer (8-bit unsigned) | Get full blocking information at the specific position      | Read-only |
| `BLOCKING_X_PROP`     | Integer (8-bit unsigned) | Get blocking information in x-axis at the specific position | Read-only |
| `BLOCKING_LEFT_PROP`  | Integer (8-bit unsigned) | Get blocking information in left at the specific position   | Read-only |
| `BLOCKING_RIGHT_PROP` | Integer (8-bit unsigned) | Get blocking information in right at the specific position  | Read-only |
| `BLOCKING_Y_PROP`     | Integer (8-bit unsigned) | Get blocking information in y-axis at the specific position | Read-only |
| `BLOCKING_UP_PROP`    | Integer (8-bit unsigned) | Get blocking information in up at the specific position     | Read-only |
| `BLOCKING_DOWN_PROP`  | Integer (8-bit unsigned) | Get blocking information in down at the specific position   | Read-only |
