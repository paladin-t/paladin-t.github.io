## More Kernels

The [latest GitHub release](https://github.com/paladin-t/gbb/releases/latest) page contains official kernels that were not bundled into the binary distribution. See the "Assets" section in that page for downloads.

### How to Install

##### 1. Opening the Kernel Installation Interface

There are two ways to open the kernel installation interface:

1. Click the chip button on the top-right corner of the home screen
2. Click the "Application" -> "Kernels..." menu item under the main menu

##### 2. Installing a Kernel

Click the "Install" button on the "Installed Kernels" dialog. Then select a kernel package (.zip), and confirm to install, (i.e. The .zip file that contains this txt file).

##### 3. Uninstalling a Kernel

Click the delete button next to the kernel twice to uninstall it.

### Kernel List

For the moment, there are two ready-to-use official external kernels.

#### SFC Mouse Kernel

This kernel is integrated with an SFC/SNES mouse driver, and enables using it as the input hardware of the `touch` APIs. This requires the SGB adapter to bridge between the ROM software and the SFC/SNES hardware.

To use this feature, specify to use the kernel in your project, and the "SGB Features" in the project's property should be turned on. Then no special coding is required. In addition, `call is_sgb_mouse_installed` to get whether a compatible mouse has bee installed.

To debug this function or use it, use an SFC/SNES with plugged SGB and peripheral mouse, or find some emulators like Mesen. The mouse should be plugged in port 2

#### Speech Synthesizer Kernel

This kernel implements a realtime speech synthesizer that outputs gibberish voice on Game Boy.

The module uses the second square channel (the `NR2y` registers) for audio output. It was created primarily with English scenarios in mind. Thanks to its gibberish style, it also works well with non-English text, and you can write text for other languages based on English spelling-pronunciation rules.

The APIs are implemented as extra native functions, see the usages as follows:

```bas
' Setup the speech options, parameters for volume, speed, and pitch respectively.
call tune 14, 7, 100

' Speak something.
call say "Hello World!"

' Stop speaking.
call hush
```

### About OS Kernel

In GB BASIC, a game is ultimately compiled into a User Program and runs on top of a layer of software abstraction. This runtime layer is commonly referred to as the "kernel", and its responsibilities are almost identical to those of a Virtual Machine or an embedded Real-Time Operating System (RTOS).

The kernels came along with binary distributions are precompiled from their C/Assembly source code. The GB BASIC compiler compiles BASIC code into GBBVM instructions, which are then linked with these precompiled kernels to form the final ROMs.

**See also:** _[The OS Kernel](https://paladin-t.github.io/kits/gbb/learn/the-os-kernel.html), [Compiler and Kernel](https://paladin-t.github.io/kits/gbb/learn/compiler-and-kernel.html), and [Creating a Custom Kernel](https://paladin-t.github.io/kits/gbb/learn/creating-a-custom-kernel.html)._
