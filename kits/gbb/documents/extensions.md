## Extensions

GB BASIC implements a few extension features upon the original architecture, which defines the "[fantasy](/kits/gbb/about.html#why-fantasy-console)" part of the console.

The introduction of these extended features stems from a thought of mine: what could we do if we were to reinterpret old handheld consoles from a modern perspective? For instance, the idea of adding touchscreen support led to the creation of the "touch" API family...

# Kernel Extension

To enable extension for the built-in emulator, click the main menu, then "Application", "Preferences...", switch to the "Device" tab, choose a device type with "extension". To enable extension for a project and its output ROM, open the project properties dialog, choose a cart type with "extension".

GB BASIC has implemented the kernel extension by taking use of a chunk of unused bus addresses of the original architecture. See the [Implementation Instructions](#implementation-instructions) section below for details.

## Platform Detection

GB BASIC is extended with a new set of [platform detection](/kits/gbb/manual.html#platform-detection) operations.

* This feature uses the `PLTF` register to store platform information.

## Mouse and Touch

GB BASIC is extended with a new set of [mouse and touch](/kits/gbb/manual.html#mouse-and-touch) API.

* This feature uses the `TCHX`, `TCHY` and `TCHF` registers to transfer mouse/touch data.
  * `TCHX`: the x position in pixels, with range of values from 0 to 159
  * `TCHY`: the y position in pixels, with range of values from 0 to 143
  * `TCHF`: the mouse/touch pressing status, `0x00` for no pressing, `0x01` for the first finger touched or LMB (Left Mouse Button), `0x02` for RMB (Right Mouse Button)

## Keyboard Input

GB BASIC is extended with a new set of [keyboard Input](/kits/gbb/manual.html#keyboard-input) API.

* This feature uses the `KEYM` and `KEYC` registers to transfer keyboard data.
  * `KEYM`: the key modifier flags, `0x00` for no pressing, `0x01` for Ctrl, `0x02` for Shift, `0x04` for Alt, `0x08` for Meta, and these bits can be combined
  * `KEYC`: the key code, with range of values from 0 to 255, `0x00` for no key pressed; after reading, also write `0x00` to it to acknowledge to accept more key codes

<details>
<summary><b>Key codes</b></summary>

```bas
' Macro of key codes.

def KEYCODE_NOTHING         = 0

def KEYCODE_A               = 4
def KEYCODE_B               = 5
def KEYCODE_C               = 6
def KEYCODE_D               = 7
def KEYCODE_E               = 8
def KEYCODE_F               = 9
def KEYCODE_G               = 10
def KEYCODE_H               = 11
def KEYCODE_I               = 12
def KEYCODE_J               = 13
def KEYCODE_K               = 14
def KEYCODE_L               = 15
def KEYCODE_M               = 16
def KEYCODE_N               = 17
def KEYCODE_O               = 18
def KEYCODE_P               = 19
def KEYCODE_Q               = 20
def KEYCODE_R               = 21
def KEYCODE_S               = 22
def KEYCODE_T               = 23
def KEYCODE_U               = 24
def KEYCODE_V               = 25
def KEYCODE_W               = 26
def KEYCODE_X               = 27
def KEYCODE_Y               = 28
def KEYCODE_Z               = 29

def KEYCODE_1               = 30
def KEYCODE_2               = 31
def KEYCODE_3               = 32
def KEYCODE_4               = 33
def KEYCODE_5               = 34
def KEYCODE_6               = 35
def KEYCODE_7               = 36
def KEYCODE_8               = 37
def KEYCODE_9               = 38
def KEYCODE_0               = 39

def KEYCODE_RETURN          = 40
def KEYCODE_ESCAPE          = 41
def KEYCODE_BACKSPACE       = 42
def KEYCODE_TAB             = 43
def KEYCODE_SPACE           = 44

def KEYCODE_MINUS           = 45
def KEYCODE_EQUALS          = 46
def KEYCODE_LEFTBRACKET     = 47
def KEYCODE_RIGHTBRACKET    = 48
def KEYCODE_BACKSLASH       = 49
def KEYCODE_NONUSHASH       = 50
def KEYCODE_SEMICOLON       = 51
def KEYCODE_APOSTROPHE      = 52
def KEYCODE_GRAVE           = 53
def KEYCODE_COMMA           = 54
def KEYCODE_PERIOD          = 55
def KEYCODE_SLASH           = 56

def KEYCODE_F1              = 58
def KEYCODE_F2              = 59
def KEYCODE_F3              = 60
def KEYCODE_F4              = 61
def KEYCODE_F5              = 62
def KEYCODE_F6              = 63
def KEYCODE_F7              = 64
def KEYCODE_F8              = 65
def KEYCODE_F9              = 66
def KEYCODE_F10             = 67
def KEYCODE_F11             = 68
def KEYCODE_F12             = 69

def KEYCODE_PRINTSCREEN     = 70
def KEYCODE_SCROLLLOCK      = 71
def KEYCODE_PAUSE           = 72
def KEYCODE_INSERT          = 73
def KEYCODE_HOME            = 74
def KEYCODE_PAGEUP          = 75
def KEYCODE_DELETE          = 76
def KEYCODE_END             = 77
def KEYCODE_PAGEDOWN        = 78
def KEYCODE_RIGHT           = 79
def KEYCODE_LEFT            = 80
def KEYCODE_DOWN            = 81
def KEYCODE_UP              = 82

def KEYCODE_NUMLOCKCLEAR    = 83
def KEYCODE_KEYPAD_DIVIDE   = 84
def KEYCODE_KEYPAD_MULTIPLY = 85
def KEYCODE_KEYPAD_MINUS    = 86
def KEYCODE_KEYPAD_PLUS     = 87
def KEYCODE_KEYPAD_ENTER    = 88
def KEYCODE_KEYPAD_1        = 89
def KEYCODE_KEYPAD_2        = 90
def KEYCODE_KEYPAD_3        = 91
def KEYCODE_KEYPAD_4        = 92
def KEYCODE_KEYPAD_5        = 93
def KEYCODE_KEYPAD_6        = 94
def KEYCODE_KEYPAD_7        = 95
def KEYCODE_KEYPAD_8        = 96
def KEYCODE_KEYPAD_9        = 97
def KEYCODE_KEYPAD_0        = 98
def KEYCODE_KEYPAD_PERIOD   = 99

def KEYCODE_LCTRL           = 224
def KEYCODE_LSHIFT          = 225
def KEYCODE_LALT            = 226
def KEYCODE_LGUI            = 227
def KEYCODE_RCTRL           = 228
def KEYCODE_RSHIFT          = 229
def KEYCODE_RALT            = 230
def KEYCODE_RGUI            = 231
```
</details>

## Streaming

GB BASIC is extended with a new set of [streaming](/kits/gbb/manual.html#streaming) API.

* This feature uses the `STMF` register and the `STMB` byte to transfer streaming data.
  * `STMF`: streaming transfer status; can be one of the "Streaming status" constants below
  * `STMB`: streaming transfer byte

## Shell Command

GB BASIC is extended to support to execute [shell commands](/kits/gbb/manual.html#shell-command).

* This feature uses the `TRSF` register and the `TRSC` buffer to transfer command data.
  * `TRSF`: command transfer status; can be one of the "Transfer status" constants below
  * `TRSC`: command transfer buffer

### Emulation Control

GB BASIC is extended to support to execute specialized shell commands for [emulation control](/kits/gbb/manual.html#emulation-control).

* This feature uses the `TRSF` register and the `TRSC` buffer to transfer emulation control.
  * `TRSF`: emulation control transfer status; can be one of the "Transfer status" constants below
  * `TRSC`: emulation control transfer buffer

### Debugging

GB BASIC is extended to support to execute specialized shell commands for [debugging](/kits/gbb/manual.html#debugging).

* This feature uses the `TRSF` register and the `TRSC` buffer to transfer debugging data.
  * `TRSF`: debugging data transfer status; can be one of the "Transfer status" constants below
  * `TRSC`: debugging data transfer buffer

### Setting Mouse Cursor

GB BASIC is extended to support to execute specialized shell commands for [setting mouse cursor](/kits/gbb/manual.html#setting-mouse-cursor).

* This feature uses the `TRSF` register and the `TRSC` buffer to transfer cursor type.
  * `TRSF`: cursor type transfer status; can be one of the "Transfer status" constants below
  * `TRSC`: cursor type transfer buffer

## Implementation Instructions

These details are not required to know to use GB BASIC. They are guides for someone who want to make running environments (such as an emulator) compatible with GB BASIC's extension features.

### ROM Map

| Address | Name         | Description               |
|---------|--------------|---------------------------|
| 0x0143  | Feature flag | Cartridge mask (extended) |

The "Feature flag" can be a value combined by the following masks.

| Cartridge mask (basic type) | Cartridge mask (extension type) | Description       |
|-----------------------------|---------------------------------|-------------------|
| 0x00                        |                                 | Classic only      |
| 0x80                        |                                 | Classic & colored |
| 0xC0                        |                                 | Colored only      |
|                             | 0x20                            | With extension    |

### RAM Map

| Address | End    | Length (bytes) | Initial value         | Name   | Description                    | Access     |
|---------|--------|----------------|-----------------------|--------|--------------------------------|------------|
| 0xFEA0  | -      | 1              | Determined at runtime | `EXTF` | Extension status               | Read-only  |
| 0xFEA1  | -      | 1              | Determined at runtime | `PLTF` | Platform flags                 | Read-only  |
| 0xFEA2  | -      | 1              | -                     | -      | Reserved                       | -          |
| 0xFEA3  | -      | 1              | -                     | -      | Reserved                       | -          |
| 0xFEA4  | -      | 1              | 0x00                  | `TCHX` | Touch x                        | Read-only  |
| 0xFEA5  | -      | 1              | 0x00                  | `TCHY` | Touch y                        | Read-only  |
| 0xFEA6  | -      | 1              | 0x00                  | `TCHF` | Touch pressed status           | Read-only  |
| 0xFEA7  | -      | 1              | -                     | -      | Reserved                       | -          |
| 0xFEA8  | -      | 1              | 0x00                  | `KEYM` | Key modifier flags             | Read-only  |
| 0xFEA9  | -      | 1              | 0x00                  | `KEYC` | First valid key code in buffer | Read/write |
| 0xFEAA  | -      | 1              | -                     | -      | Reserved                       | -          |
| 0xFEAB  | -      | 1              | -                     | -      | Reserved                       | -          |
| 0xFEAC  | -      | 1              | 0x00                  | `STMF` | Streaming status               | Read/write |
| 0xFEAD  | -      | 1              | 0x00                  | `STMB` | Streaming byte                 | Read/write |
| 0xFEAE  | -      | 1              | -                     | -      | Reserved                       | -          |
| 0xFEAF  | -      | 1              | 0x00                  | `TRSF` | Transfer status                | Read/write |
| 0xFEB0  | 0xFEEF | 64             | 0x00                  | `TRSC` | Transfer buffer                | Read/write |
| 0xFEF0  | 0xFEFF | 16             | -                     | -      | Reserved                       | -          |

The `EXTF` can be one of the following codes; a device writes to this register with the specific value determined by the device itself after booting. When detecting a device's extension capabilities, the ROM reads `EXTF` and `TRSF`. If the former is set to a valid extension value and the latter is 0x00, the device is determined to support extension functions. Please ensure all extension bytes are set to the correct initial values.

| Extension status | Description            |
|------------------|------------------------|
| 0x00             | Without extension      |
| 0x11             | Classic with extension |
| 0x21             | Colored with extension |
| 0x51             | SGB with extension     |

The `PLTF` can be one of the following codes; a device writes to this register with the specific value determined by the device itself after booting.

| Platform flag | Description                         |
|---------------|-------------------------------------|
| 0b10000000    | Is running in an editor application |
| 0b00000001    | Windows                             |
| 0b00000010    | Linux                               |
| 0b00000100    | MacOS                               |
| 0b00001000    | HTML                                |

The `STMF` can be one of the following codes.

| Streaming status | Description   |
|------------------|---------------|
| 0x00             | Ready         |
| 0x01             | Busy          |
| 0x02             | Filled        |
| 0x80             | End-of-stream |

The `TRSF` can be one of the following codes.

| Transfer status | Description |
|-----------------|-------------|
| 0x00            | Ready       |
| 0x01            | Busy        |
| 0x02            | Filled      |

### Keyboard Protocol

Device fills the `KEYM` register with the key modifier flags continuously per frame.

Device reads key-up codes of keyboard, and stores it in a FIFO queue, the queue can store up to 2 key codes. The `KEYC` register is the head of the queue, and the device reads it continuously to get if the queue head is cleared to `0x00`, if so, it sets the `KEYC` register to the next key code in the queue, and make another available slot for new coming code. Device cannot append new code to the queue if the queue is full.

### Transfer Protocol

Device reads the `STMF` register continuously to wait until it's set to the "Filled" status; then it reads the `STMB` byte and clears it with 0; after that, it sets the `STMF` register to "Ready" status so that the VM can write to it again; finally it waits for a "End-ofstream" status, then sets the `STMF` register to "Ready" as well, and raises a file saving request to serialize the streamed binary data.

Device reads the `TRSF` register continuously to wait until it's set to the "Filled" status; then it reads all the bytes from the transfer buffer and clears it with 0; finally it sets the `TRSF` register to the "Ready" status so that the VM can write to it again.

Device takes further actions determined by the heading byte(s) of the read buffer data.

| Protocol header         | Description                    |
|-------------------------|--------------------------------|
| "http://" or "https://" | Performs web surfing           |
| "file://"               | Performs filesystem browsing   |
| "\|\|"                  | Performs emulation pause       |
| "[]"                    | Performs emulation stop        |
| ">"                     | Performs debugging             |
| "^"                     | Sets mouse cursor              |
| "@"                     | Syncs modules                  |
| Others                  | Executes the command literally |
