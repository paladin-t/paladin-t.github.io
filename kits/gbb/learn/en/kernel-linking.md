# Kernel Linking

[Prev]() [Next]()

In the previous sections such as [Compiler Architecture](compiler-architecture.html), [The OS Kernel](the-os-kernel.html), [The Memory Model](the-memory-model.html), [The Thread Model](the-thread-model.html), we have already explored the architecture of the OS kernel, its memory model, and thread model. This section will introduce more low-level details, including the kernel ROM layout, the organization of objects, and other aspects, so that users who need it can acquire the necessary understanding before learning the next chapter on how to create a custom kernel.

## Kernel ROM Layout

A precompiled kernel ROM contains key functions and features in ROM bank 0, such as the instruction executor, system call table, banked data handling functions, etc. Starting from ROM bank 1, several banks are occupied, storing various modules of the kernel and game engine. This is followed by built-in data and resources, such as icons, fonts, built-in actors, etc. which typically occupy less than one ROM bank. Subsequently, a small bootstrap program is located in a dedicated ROM bank. When the compiler and linker link the user program to the kernel ROM, they will link and replace it at the bootstrap location. If the user program exceeds one bank, it will continue to occupy the subsequently allocated ROM banks. Additionally, the ROM carries various RAM data structures for internal system use, such as system variables, thread stacks, object arrays and linked lists.

For example, a kernel ROM layout might look like this.

| Bank      | Range            | Size  | Used  | Used% | Free  | Free% | Occupation                     | Usage         |
|-----------|------------------|-------|-------|-------|-------|-------|--------------------------------|---------------|
| ROM 0     | 0x0000 -> 0x3FFF | 16384 | 12682 |  77%  |  3702 |  23%  | `#####################-......` | VM and engine |
| ROM 1     | 0x4000 -> 0x7FFF | 16384 | 16356 | 100%  |    28 |   0%  | `###########################-` | VM and engine |
| ROM 2     | 0x4000 -> 0x7FFF | 16384 | 16334 | 100%  |    50 |   0%  | `###########################-` | VM and engine |
| ROM 3     | 0x4000 -> 0x7FFF | 16384 | 16350 | 100%  |    34 |   0%  | `###########################-` | VM and engine |
| ROM 4     | 0x4000 -> 0x7FFF | 16384 | 16349 | 100%  |    35 |   0%  | `###########################-` | VM and engine |
| ROM 5     | 0x4000 -> 0x7FFF | 16384 | 16331 | 100%  |    53 |   0%  | `###########################-` | VM and engine |
| ROM 6     | 0x4000 -> 0x7FFF | 16384 | 16285 |  99%  |    99 |   1%  | `###########################-` | VM and engine |
| ROM 7     | 0x4000 -> 0x7FFF | 16384 | 11113 |  68%  |  5271 |  32%  | `###################.........` | VM and engine |
| ROM 8     | 0x4000 -> 0x7FFF | 16384 | 10536 |  64%  |  5848 |  36%  | `##################..........` | Builtin data  |
| ROM 9     | 0x4000 -> 0x7FFF | 16384 |    15 |   0%  | 16369 | 100%  | `............................` | Bootstrap     |
| WRAM LO   | 0xC000 -> 0xCFFF |  4096 |  3936 |  96%  |   160 |   4%  | `.-##########################` | Sys variables |
| WRAM HI 0 | 0xD000 -> 0xDFFF |  4096 |  2652 |  65%  |  1444 |  35%  | `##################..........` | Sys variables |

## Organization of Objects

In addition to basic system calls, a kernel also implements various types of objects, such as actor, controllers, trigger, emote, projectile, scene, etc. These objects have their own data structures and method functions, which vary by type and purpose. Some of them also interact, for example, loading related objects when loading a scene, dynamically loading corresponding data during scene scrolling, and performing collision detection between different types of objects, and so on. All objects and controllers are precompiled into different ROM banks.

Among them, there is a specific category called "actor controller". A kernel may contain multiple controllers simultaneously, each containing specialized logic for a specific genre of game. For instance, the default kernel includes three controllers: Platformer, Top-down, and Point&Click (detailed in previous chapters); and the scroll shooting kernel includes an extra controller: Scroll Shooting.

By installing a new kernel, support can be added for new actor controllers, object properties, and native functions. Optimization can also be performed specifically for a particular game project.

<!-- gem -->
