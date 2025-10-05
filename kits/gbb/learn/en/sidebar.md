# [Preface](index)

--------------------------------------------------------------------------------

# [I. Welcome and Introduction](welcome-and-introduction)

## [1. What Is GB BASIC?](what-is-gb-basic)

## [2. Installation and Using](installation-and-using)

## [3. Hello, World!](hello-world)

--------------------------------------------------------------------------------

# [II. Basic Syntax and Program Structure](basic-syntax-and-program-structure)

## [1. Comments](comments)

## [2. Output](output)

## [3. Variables and Expressions](variables-and-expressions)

## [4. Jumps and Labels](jumps-and-labels)

## [5. Sub Routine](sub-routine)

## [6. Conditional Statements](conditional-statements)

## [7. Loop Statements](loop-statements)

## [8. Basic Functions and Operators](basic-functions-and-operators)

--------------------------------------------------------------------------------

# [III. Data Types and Memory Stack](data-types-and-memory-stack)

## [1. Data Types](data-types)

## [2. Arrays](arrays)

## [3. Inline Data Sequences](inline-data-sequences)

## [4. Stack Operations](stack-operations)

--------------------------------------------------------------------------------

# [IV. System Overview](system-overview)

## [1. The CPU](the-cpu)

## [2. Memory Map](memory-map)

### [2.1 Memory Management](memory-management)

## [3. The OS Kernel](the-os-kernel)

### [3.1 The Memory Model](the-memory-model)

### [3.2 The Thread Model](the-thread-model)

## [4. Video Module](video-module)

### [4.1. Display and Screen Modes](display-and-screen-modes)

## [5. Audio Module](audio-module)

## [6. Input Module](input-module)

## [7. Serial Port](serial-port)

--------------------------------------------------------------------------------

# [V. Usage of Macros](usage-of-macros)

## [1. Macro Functions](macro-functions)

## [2. Macro Expressions](macro-expressions)

## [3. Macro Constants](macro-constants)

## [4. Macro Variable Aliases](macro-variable-aliases)

## [5. Macro Stack Reference Aliases](macro-stack-reference-aliases)

## [6. Macro Scope](macro-scope)

--------------------------------------------------------------------------------

# [VI. Game Loop and Thread Management](game-loop-and-thread-management)

## [1. Game Loop](game-loop)

## [2. Code Block and Scope](code-block-and-scope)

## [3. Thread Operations](thread-operations)

--------------------------------------------------------------------------------

# [VII. Practical Project: Building a Minimal Game Framework](practical-project-building-a-minimal-game-framework)

## [1. Game Entry Point](game-entry-point)

## [2. Adding Game Loops](adding-game-loops)

## [3. Adding Game Logic](adding-game-logic)

### [3.1 Using Input Controls](using-input-controls)

### [3.2 Using Auto Update Mode](using-auto-update-mode)

### [3.3 Moving Objects](moving-objects)

## [4. Adding Graphical Resources](adding-graphical-resources)

### [4.1 Declaring Graphical Resources](declaring-graphical-resources)

### [4.2 Using Graphical Resources](using-graphical-resources)

--------------------------------------------------------------------------------

# [VIII. Scenes and Object System](nothing)

## [1. Scenes](nothing)

Ref to event overriding.

### [1.1 Scene Definition and Loading](nothing)

How to reset a scene.

## [2. Triggers](nothing)

## [3. Actors](nothing)

How to iterate actors.

Explain routines and callbacks.

## [4. Projectiles](nothing)

How to create projectiles.

## [5. Object Interaction](nothing)

### [5.1 Collision Detection and Response](nothing)

How to set collision groups.

### [5.2 Event Binding](nothing)

Explain event overriding.

Explain stack parameters.

Emphasize `reserve`.

## [6. Emotes](nothing)

## [7. Color Features](nothing)

### [7.1 Palette](nothing)

### [7.2 VRAM Banking](nothing)

--------------------------------------------------------------------------------

# [IX. Actor Controllers](nothing)

Ref to event overriding.

Explain differences of collision handling and behaviours.

How to make NPCs without controllers.

## [1. Platformer Controller](nothing)

## [2. Top-down Controller](nothing)

## [3. Point&Click Controller](nothing)

--------------------------------------------------------------------------------

# [X. Practical Project: Item Collection Game](nothing)

## [1. Minimal Game Framework](nothing)

## [2. Creating Resources](nothing)

## [3. Using Controllers](nothing)

## [4. Using Event Callbacks](nothing)

## [5. Moving Objects in Another Way](nothing)

## [6. Adding a Player Controller](nothing)

## [7. Completing Game Logic](nothing)

--------------------------------------------------------------------------------

# [XI. Audio and Sound Effects](nothing)

## [1. Playing Music](nothing)

## [2. Playing Sound Effects](nothing)

## [3. Using the Music Editor](nothing)

## [4. Making and Importing SFX](nothing)

## [5. Using the Built-in Sound Library](nothing)

--------------------------------------------------------------------------------

# [XII. Fonts and Unicode](nothing)

## [1. Using Fonts](nothing)

## [2. Using Unicode Strings](nothing)

--------------------------------------------------------------------------------

# [XIII. GUI](nothing)

## [1. Window Layer](nothing)

## [2. Label](nothing)

## [3. Progress Bar](nothing)

## [4. Menu](nothing)

--------------------------------------------------------------------------------

# [XIV. Practical Projects: Three Unique Games](nothing)

## [1. Platformer Game](nothing)

## [2. Top-down Game](nothing)

## [3. Point-and-Click Game](nothing)

--------------------------------------------------------------------------------

# [XV. Advanced Features](nothing)

## [1. Persistence with SRAM Save Files](nothing)

## [2. Using the Real-Time Clock (RTC)](nothing)

## [3. Serial Communication](nothing)

--------------------------------------------------------------------------------

# [XVI. Low-Level Features](nothing)

## [1. Native Functions](nothing)

## [2. Memory Operations](nothing)

* `memcpy`/`memset`/`memadd`
* `bankof`/`addressof`
* `peek`/`poke`
* `pack`/`unpack`
* `swap`
* `inc`/`dec`

## [3. Graphics Primitives](nothing)

## [4. Tiles](nothing)

## [5. Maps](nothing)

## [6. Images](nothing)

## [7. Sprites](nothing)

Explain flip, direction, rotate.

## [8. User Input and Interaction](nothing)

### [8.1 Gamepad Input](nothing)

### [8.2 Mouse and Touch Input](nothing)

Extension feature.

### [8.3 Keyboard Input](nothing)

Extension feature.

## [9. Camera Management](nothing)

## [10. Scroll](nothing)

## [11. Special Effects](nothing)

## [12. Device](nothing)

## [13. Extension Features](nothing)

Extension feature.

* Compatibility detection
* Platform detection
* Mouse and touch input
* Keyboard input
* Streaming
* Shell command
  * Executing host commands
  * Emulation control
  * Debugging
  * Setting mouse cursor
  * Syncing modules

--------------------------------------------------------------------------------

# [XVII. Debugging and Release](nothing)

## [1. Debugging Techniques](nothing)

Extension feature.

* `shell ">fmt"[, ...]`
* `dbginfo`

## [2. Building the ROM](nothing)

## [3. Exporting for Web Emulator](nothing)

## [4. Exporting as a Desktop Application](nothing)

--------------------------------------------------------------------------------

# [XVIII. Starter Kits](nothing)

## [1. Starter Kit List](nothing)

--------------------------------------------------------------------------------

# [XIX. Compiler and Kernel](nothing)

## [1. Compiler Architecture](nothing)

## [2. Kernel Architecture](nothing)

--------------------------------------------------------------------------------

# [XX. Creating a Custom Kernel](nothing)

## [1. Obtaining the Source Code](nothing)

## [2. Setting Up the Development Environment](nothing)

## [3. Developing Custom Features](nothing)

## [4. Distribution and Installation](nothing)

--------------------------------------------------------------------------------

**To add?**

* Project Structure
* Programming Paradigm
