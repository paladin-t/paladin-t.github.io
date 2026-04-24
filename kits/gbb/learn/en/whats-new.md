# What's New

[Prev]() [Next]()

# Releases

## GB BASIC v1.9.0

<details open>
<summary><b>Click Me</b></summary>
<div>
This release mainly includes numerous improvements to the BASIC compiler. Which includes a new constant folding mechanism, enhancements to macros - and leveraging these features - optimizations in expression evaluation, and conditional compilation directives as <code>#if ... #else if ... #else ... #end if</code> allow static determination of which code participates in compilation. The new <code>#message ...</code>, <code>#warn ...</code>, and <code>#error ...</code> diagnostic directives help provide custom compile-time feedbacks. It also includes enhanced <code>for</code>, <code>while</code>, and <code>repeat</code> loops to support more flexible single-line syntax. <code>bankof(lbl)</code> and <code>addressof(lbl)</code> now support code labels as arguments. This update also contains other feature improvements and bug fixes.
</div>
</details>

* [Changelog](../documents/changelogs/Changelog_v1.9.0.txt) (Apr. 24, 2026)
* Download on [Steam](https://store.steampowered.com/app/2308700/)
* Also available on [Itch.io](https://tonywang.itch.io/gbbasic)

## GB BASIC v1.8.3

<details>
<summary><b>Click Me</b></summary>
<div>
This update introduces a number of enhancements to the syntax and compiler, adds a mechanism for passing macros via build command line arguments, and includes various bug fixes.
</div>
</details>

* [Changelog](../documents/changelogs/Changelog_v1.8.3.txt) (Apr. 9, 2026)
* Download on [Steam](https://store.steampowered.com/app/2308700/)
* Also available on [Itch.io](https://tonywang.itch.io/gbbasic)

## GB BASIC v1.8.1

<details>
<summary><b>Click Me</b></summary>
<div>
This update adds error visualization in the edit-as-image mode for the map editor, along with tiles and actor assets analysis features to help build more compact and organized assets. The map's edit-as-image mode now saves image data to the project file, allowing editing to resume later. This release also improves editor usability and fixes known issues.
</div>
</details>

* [Changelog](../documents/changelogs/Changelog_v1.8.1.txt) (Mar. 24, 2026)
* Download on [Steam](https://store.steampowered.com/app/2308700/)
* Also available on [Itch.io](https://tonywang.itch.io/gbbasic)

## GB BASIC v1.8

<details>
<summary><b>Click Me</b></summary>
<div>
This update brings significant enhancements to the map editor. New support for local palette has been added, allowing referencing, previewing, and code exporting of palette locally within a specific map asset. Additionally, when importing map assets from external images, you can now choose to automatically populate the local palette. A new edit-as-image mode has also been introduced, enabling pixel-by-pixel editing of map resources intuitively like editing an image. Upon completion, the map asset is automatically populated with tile and map cel data. This update also includes various editor improvements and bug fixes.
</div>
</details>

* [Changelog](../documents/changelogs/Changelog_v1.8.txt) (Mar. 10, 2026)
* Download on [Steam](https://store.steampowered.com/app/2308700/)
* Also available on [Itch.io](https://tonywang.itch.io/gbbasic)

## GB BASIC v1.7

<details>
<summary><b>Click Me</b></summary>
<div>
This update introduces the syntactic sugar <code>load dialog</code> to simplify initializing chat-style GUI operations. This version also optimizes RPN data fetching and calculation, improves VM instruction execution, optimizes building flags for the kernels, and boosts performance in certain computations; for example, the built-in "Mandelbrot Demo" program now runs approximately 12% to 14% faster compared to before optimization. Additionally, for the VRAM debugger feature added in the previous version, this update enhances the user experience and improves palette calculation. A kernel panic caused by numeric calculation overflow is fixed, along with some other fixes.
</div>
</details>

* [Changelog](../documents/changelogs/Changelog_v1.7.txt) (Feb. 14, 2026)
* Download on [Steam](https://store.steampowered.com/app/2308700/)
* Also available on [Itch.io](https://tonywang.itch.io/gbbasic)

## GB BASIC v1.6

<details>
<summary><b>Click Me</b></summary>
<div>
This release introduces a new VRAM debugger, which allows for verification and debugging of graphics element allocation in VRAM during development, and supports learning and referencing the VRAM usage patterns of other ROMs. This version also upgrades the underlying libraries, GBDK-2020 and SDL2. With several bug fixes and feature improvements, the stability of the program itself and its compatibility on Linux have been enhanced. Additionally, starting from this version, all tutorial chapters are now complete.
</div>
</details>

* [Changelog](../documents/changelogs/Changelog_v1.6.txt) (Jan. 26, 2026)
* Download on [Steam](https://store.steampowered.com/app/2308700/)
* Also available on [Itch.io](https://tonywang.itch.io/gbbasic)

## GB BASIC v1.5

<details>
<summary><b>Click Me</b></summary>
<div>
This release introduces support for custom kernels, allowing users to replace the default game runtime for their projects. The editor now supports installing and selecting custom kernels. Added new syntax to support more flexible actor control. It also includes many other improvements and bug fixes to the runtime, compiler, and usability. A new "Scroll Shooting" kernel and a starter kit which takes use of it were also added. Added new tutorials chapters and content. There are also other updates to the examples and documents.
</div>
</details>

* [Changelog](../documents/changelogs/Changelog_v1.5.txt) (Dec. 26, 2025)
* Download on [Steam](https://store.steampowered.com/app/2308700/)
* Also available on [Itch.io](https://tonywang.itch.io/gbbasic)

## GB BASIC v1.4

<details>
<summary><b>Click Me</b></summary>
<div>
This release introduces support for SGB features. It also includes a number of quality of life improvements, for instance, direct preview for map, scene, and actor assets with one-click. The memory related statements have been updated to support getting bank and address of assets, inline data sequence. Added new tutorials chapters and content. There are also some other improvements and bug fixes.
</div>
</details>

* [Changelog](../documents/changelogs/Changelog_v1.4.txt) (Nov. 28, 2025)
* Download on [Steam](https://store.steampowered.com/app/2308700/)
* Also available on [Itch.io](https://tonywang.itch.io/gbbasic)

## GB BASIC v1.3

<details>
<summary><b>Click Me</b></summary>
<div>
This release introduces support for importing and managing external ROMs, providing greater flexibility for developers working with existing game assets. There are two new sprite properties available <code>BANK_PROP</code> and <code>OBJPAL_PROP</code> which enhanced coding flexibility for CGB sprites. Now emotes support 8x8px-per-tile based sprites. Fixed some known bugs, improved usability and compatibility. Added new tutorials chapters and content.
</div>
</details>

* [Changelog](../documents/changelogs/Changelog_v1.3.txt) (Oct. 28, 2025)
* Download on [Steam](https://store.steampowered.com/app/2308700/)
* Also available on [Itch.io](https://tonywang.itch.io/gbbasic)

## GB BASIC v1.2

<details>
<summary><b>Click Me</b></summary>
<div>
This release introduces a public Tutorials platform, which provides a learning environment that is easier to read and practice with than the built-in documentation. Currently, about one-third of the content is complete, with subsequent content to be updated gradually. You can find the entry point by clicking the main menu, then clicking Help. Additionally, this update enhances the syntax's adaptability and convenience for different coding styles and fixes some bugs in the runtime, compiler and asset pipeline, and the editors. This version also adds a new "Minimal" starter kit for quickly building your game framework.
</div>
</details>

* [Changelog](../documents/changelogs/Changelog_v1.2.txt) (Oct. 5, 2025)
* Download on [Steam](https://store.steampowered.com/app/2308700/)
* Also available on [Itch.io](https://tonywang.itch.io/gbbasic)

## GB BASIC v1.1

<details>
<summary><b>Click Me</b></summary>
<div>
This update introduces several key features, including auto-update mode, an emote module, GUI components (progress bars and menus), and Point&Click controllers, while optimizing triggers, resource loading, controllers, touch/mouse handling, and thread handling. On the syntax side, new memory operations, data streaming, and macro scopes were added, along with improved label lookup. The editor significantly enhances functionality and usability, with improved map and trigger editing, code binding, resource sorting, and bitmap font support, refining the editing experience for maps, scenes, and other assets. Performance optimizations notably improve collision detection and camera tracking, while numerous bugs were fixed, memory mapping adjusted, and syntax refined for greater stability and efficiency.

This update includes several breaking changes, primarily aimed at refining and optimizing the syntax and design from the Alpha phase. These modifications address earlier inconsistencies, bringing greater internal cohesion to the runtime, syntax rules, and editor components. Starting with this release, the API will enter a more stable phase, with future updates prioritizing backward compatibility.

This marks a major milestone release for the project, with over 5,000 code commits since its inception - approximately 45% of which were submitted during this v1.1 iteration alone. For brevity.
</div>
</details>

* [Changelog](https://paladin-t.github.io/articles/gb-basic-v1-1.html) (Aug. 20, 2025)
* Download on [Steam](https://store.steampowered.com/app/2308700/)
* Also available on [Itch.io](https://tonywang.itch.io/gbbasic)

# Alpha Versions

## Devlogs

* [GB BASIC Alpha 4](https://paladin-t.github.io/articles/gb-basic-alpha-4.html) (May. 1, 2024)
* [GB BASIC Alpha 3](https://paladin-t.github.io/articles/gb-basic-alpha-3.html) (Oct. 14, 2023)
* [GB BASIC Alpha 2](https://paladin-t.github.io/articles/gb-basic-alpha-2.html) (May. 14, 2023)
* [GB BASIC Alpha 1](https://paladin-t.github.io/articles/gb-basic-alpha-1.html) (Mar. 16, 2023)

## Downloads

* Alpha versions on [itch.io](https://tonywang.itch.io/gbbasic-alpha)

# Prototype

## Devlog

* [Introducing GB BASIC](https://paladin-t.github.io/articles/introducing-gb-basic.html) (Dec. 30, 2022)

## Download

* Prototype on [GitHub](https://github.com/gbbasic/prototype)

# Kick-started

The GB BASIC project was kick-started on Sep. 13, 2022.
