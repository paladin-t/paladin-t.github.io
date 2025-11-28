# Setting Device Options

[Prev]() [Next]()

* `=option(what, val)`: sets a device setting
  * `what`: the setting type; can be one of the following "Option keys" constants
  * `val`: the option value, with data type determined by "Option keys"

| Option keys                      | Value type                             | Default value        | Note                                                                                            |
|----------------------------------|----------------------------------------|----------------------|-------------------------------------------------------------------------------------------------|
| `FAST_CPU_ENABLED`               | Boolean                                | Determined by device | Whether to enable the fast CPU mode for the current program, only available on a colored device |
| `AUTO_UPDATE_ENABLED`            | Boolean                                | `false`              | Whether to enable the automatic update feature                                                  |
| `ACTOR_HIT_WITH_DETAILS_ENABLED` | Boolean                                | `false`              | Whether to pass hit details for actor collision callback                                        |
| `OBJECT_SPRITE_BASE`             | Integer (8-bit unsigned)               | `0`                  | The start sprite index for actors, emotes, projectiles, etc.                                    |
| `SRAM_BANK`                      | Integer (8-bit unsigned)               | `0`                  | Select the SRAM bank                                                                            |
| `SRAM_ENABLED`                   | Boolean                                | `false`              | Whether to enable the SRAM                                                                      |
| `VRAM_BANK`                      | "VRAM banks" (8-bit unsigned integer)  | `VRAM_BANK0`         | Select the VRAM bank                                                                            |
| `VRAM_USAGE`                     | "VRAM usages" (8-bit unsigned integer) | `VRAM_TILES`         | Select the VRAM usage                                                                           |
| `SCREEN_ENABLED`                 | Boolean                                | `true`               | Whether to enable the screen                                                                    |
| `SCREEN_MODE`                    | Integer (8-bit unsigned)               | Not specified        | Will load the default font into VRAM when set this to `TEXT_MODE`                               |
| `MAP_ENABLED`                    | Boolean                                | `true`               | Whether to enable the map layer                                                                 |
| `WINDOW_ENABLED`                 | Boolean                                | `false`              | Whether to enable the window layer                                                              |
| `SPRITE_ENABLED`                 | Boolean                                | `false`              | Whether to enable the sprite layer                                                              |
| `SPRITE8x16_ENABLED`             | Boolean                                | `false`              | Whether to enable the 8x16 sprite mode or 8x8 mode                                              |
| `ACTIVE_TRIGGERS`                | Integer (8-bit unsigned)               | `0`                  | Specify the active trigger count                                                                |
| `SOUND_ENABLED`                  | Boolean                                | `false`              | Whether to enable the sound hardware                                                            |
| `MUSIC_POSITION`                 | Integer (8-bit unsigned)               | `0`                  | The music position to start from                                                                |
| `SERIAL_ENABLED`                 | Boolean                                | `false`              | Whether to enable the serial port                                                               |
| `RTC_SEC`                        | Integer (8-bit unsigned)               | Determined by clock  | Select the second state of the RTC device for writing                                           |
| `RTC_MIN`                        | Integer (8-bit unsigned)               | Determined by clock  | Select the minute state of the RTC device for writing                                           |
| `RTC_HR`                         | Integer (8-bit unsigned)               | Determined by clock  | Select the hour state of the RTC device for writing                                             |
| `RTC_DAY`                        | Integer (8-bit unsigned)               | Determined by clock  | Select the day state of the RTC device for writing                                              |
| `RTC_ENABLED`                    | Integer (8-bit unsigned)               | `false`              | Select the enabled state of the RTC device for writing                                          |
| `RTC_START`                      | Integer (8-bit unsigned)               | Determined by clock  | Select the start state of the RTC device for writing                                            |
| `RTC_LATCH`                      | Integer (8-bit unsigned)               | Determined by clock  | Select the latch state of the RTC device for writing                                            |

For `VRAM_BANK`. This feature is for colored device only, which has more VRAM.

| VRAM banks   | Note                                      |
|--------------|-------------------------------------------|
| `VRAM_BANK0` | Select regular map and normal tiles       |
| `VRAM_BANK1` | Select map attributes and extra tile bank |

For `VRAM_USAGE`. This feature is for colored device only.

| VRAM usages       | Note                                      |
|-------------------|-------------------------------------------|
| `VRAM_TILES`      | Select regular map and normal tiles       |
| `VRAM_ATTRIBUTES` | Select map attributes and extra tile bank |

// TODO
