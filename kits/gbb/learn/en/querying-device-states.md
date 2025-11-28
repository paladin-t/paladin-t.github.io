# Querying Device States

[Prev]() [Next]()

* `=query(what)`: queries a device setting
  * `what`: the status type; can be one of the following "Query keys" constants

| Query keys            | Value type               | Default value                    | Note                                                                               |
|-----------------------|--------------------------|----------------------------------|------------------------------------------------------------------------------------|
| `IS_CGB`              | Boolean                  | Determined by device             | Whether the current program is running on a colored device                         |
| `IS_SGB`              | Boolean                  | Determined by device             | Whether the current program is running on a super device                           |
| `IS_AGB`              | Boolean                  | Determined by device             | Whether the current program is running on an advanced device                       |
| `IS_GBB`              | Boolean                  | Determined by device             | Whether the current program is running on a GB BASIC enhanced device               |
| `MAX_THREADS`         | Integer (8-bit unsigned) | `16`                             | The max thread count                                                               |
| `ACTIVE_THREADS`      | Integer (8-bit unsigned) | `1` (main thread)                | The active thread count                                                            |
| `FREE_THREADS`        | Integer (8-bit unsigned) | `15`                             | The free thread count                                                              |
| `CURRENT_THREAD_ID`   | Integer (8-bit unsigned) | Determined by the current thread | The current thread ID                                                              |
| `SRAM_BANKS`          | Integer (8-bit unsigned) | Determined by cartridge          | The SRAM bank count                                                                |
| `SRAM_LENGTH`         | Integer                  | Determined by cartridge          | The SRAM space length per bank                                                     |
| `VRAM_BANKS`          | Integer (8-bit unsigned) | Determined by device             | The VRAM bank count                                                                |
| `MAP_X`               | Integer (16-bit signed)  | `0`                              | The map position in x-axis                                                         |
| `MAP_Y`               | Integer (16-bit signed)  | `0`                              | The map position in y-axis                                                         |
| `CAMERA_X`            | Integer (16-bit signed)  | `0`                              | The camera position in x-axis                                                      |
| `CAMERA_Y`            | Integer (16-bit signed)  | `0`                              | The camera position in y-axis                                                      |
| `MAX_ACTORS`          | Integer (8-bit unsigned) | `21`                             | The max actor count                                                                |
| `INSTANTIATED_ACTORS` | Integer (8-bit unsigned) | `0`                              | The instantiated actor count                                                       |
| `FREE_ACTORS`         | Integer (8-bit unsigned) | `21`                             | The free actor count                                                               |
| `ACTIVE_ACTORS`       | Integer (8-bit unsigned) | `0`                              | The active actor count                                                             |
| `MAX_PROJECTILES`     | Integer (8-bit unsigned) | `5`                              | The max projectile count                                                           |
| `ACTIVE_PROJECTILES`  | Integer (8-bit unsigned) | `0`                              | The active projectile count                                                        |
| `FREE_PROJECTILES`    | Integer (8-bit unsigned) | `5`                              | The free projectile count                                                          |
| `MAX_TRIGGERS`        | Integer (8-bit unsigned) | `31`                             | The max trigger count                                                              |
| `ACTIVE_TRIGGERS`     | Integer (8-bit unsigned) | `0`                              | The active trigger count                                                           |
| `FREE_TRIGGERS`       | Integer (8-bit unsigned) | `31`                             | The free trigger count                                                             |
| `SERIAL_STATUS`       | Integer (8-bit unsigned) | Determined by device             | The status of the serial port                                                      |
| `RTC_SEC`             | Integer (8-bit unsigned) | Determined by clock              | Select the second state of the RTC device for reading                              |
| `RTC_MIN`             | Integer (8-bit unsigned) | Determined by clock              | Select the minute state of the RTC device for reading                              |
| `RTC_HR`              | Integer (8-bit unsigned) | Determined by clock              | Select the hour state of the RTC device for reading                                |
| `RTC_DAY`             | Integer (8-bit unsigned) | Determined by clock              | Select the day state of the RTC device for reading                                 |
| `SYS_TIME`            | Integer (16-bit signed)  | Determined by device             | The system time that increments once per Frame; will wrap around every ~18 minutes |
| `DIV_REG`             | Integer (8-bit unsigned) | Determined by device             | The value of the divider register                                                  |
| `PLATFORM_FLAGS`      | Integer (8-bit unsigned) | Determined by host environment   | The platform flags (extension feature)                                             |

// TODO
