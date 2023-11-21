## Extensions

# Kernel Extension

To enable extension for the built-in emulator, click the main menu, then "Application", "Preferences...", switch to the "Device" tab, choose a device type with "extension". To enable extension for a project and its output ROM, open the project properties dialog, choose a cart type with "extension".

GB BASIC has implemented the kernel extension by taking use of a chunk of unused bus addresses of the original architecture. See the [Implementation Instructions](#implementation-instructions) section below for details.

## Running Speed

Under construction...

## Mouse and Touch

GB BASIC is extended with a new set of [mouse and touch](/kits/gbb/manual.html#mouse-and-touch) API.

* This feature uses the `TCHX`, `TCHY` and `TCHF` registers to transfer mouse/touch data.
  * `TCHX`: the x position in pixels, with range of values from 0 to 159
  * `TCHY`: the y position in pixels, with range of values from 0 to 143
  * `TCHF`: the mouse/touch pressing status, 0 for no pressing, 1 for pressing

## Shell Command

GB BASIC is extended to support to execute [shell commands](/kits/gbb/manual.html#shell-command).

* This feature uses the `TRSF` register and the `TRSC` buffer to transfer command data.
  * `TRSF`: command transfer status; can be one of the "Transfer status" constants below
  * `TRSC`: command transfer buffer

## Debugging

GB BASIC is extended to support to execute specialized shell commands for [debugging](/kits/gbb/manual.html#debugging).

* This feature uses the `TRSF` register and the `TRSC` buffer to transfer debugging data.
  * `TRSF`: debugging data transfer status; can be one of the "Transfer status" constants below
  * `TRSC`: debugging data transfer buffer

## Implementation Instructions

These details are not required to know to use GB BASIC. They are guides for someone who want to make running environments compatible with GB BASIC's extension features.

### ROM Map

| Address | Name | Description |
|---|---|---|
| 0x0143 | Feature flag | Cartridge mask (extended) |

The "Feature flag" can be a value combined by the following masks.

| Cartridge mask (basic type) | Cartridge mask (extension type) | Description |
|---|---|---|
| 0x00 | | Classic only |
| 0x80 | | Classic & colored |
| 0xC0 | | Colored only |
| | 0x20 | With extension |

### RAM Map

| Start | End | Name | Description | Cartridge Access |
|---|---|---|---|---|
| 0xFEA0 | - | EXTF | Extension status | Read-only |
| 0xFEA1 | - | TCHX | Touch x | Read-only |
| 0xFEA2 | - | TCHY | Touch y | Read-only |
| 0xFEA3 | - | TCHF | Touch pressed | Read-only |
| 0xFEA4 | - | TRSF | Transfer status | Read/write |
| 0xFEA5 | 0xFEE4 | TRSC | Transfer buffer | Read/write |
| 0xFEE5 | 0xFEFF | - | Reserved | - |

The `EXTF` can be one of the following codes; a device writes to this register with the specific value determined by the device itself after booting.

| Extension status | Description |
|---|---|
| 0x00 | Without extension |
| 0x21 | Classic with extension |
| 0x31 | Colored with extension |

The `TRSC` can be one of the following codes.

| Transfer status | Description |
|---|---|
| 0x00 | Ready |
| 0x01 | Busy |
| 0x02 | Filled |

### Transfer Protocol

Device reads the `TRSF` register continuously to wait untill it's set to the "Filled" status; then it reads all the bytes from the transfer buffer and clears it with 0; finally it sets the `TRSF` register to the "Ready" status.

Device takes further actions determined by the heading byte(s) of the read buffer data.

| Protocol header | Description |
|---|---|
| "http://" or "https://" | Performs web surfing |
| "file://" | Performs filesystem browsing |
| ">" | Performs debugging |
| Others | Executes the command literally |
