# VRAM Debugger

[Prev]() [Next]()

GB BASIC includes a built-in VRAM debugger for viewing and debugging tile layouts, resolving potential overflows, and analyzing VRAM usage patterns in other games. Consider keeping an eye on it during development.

<img src="imgs/debugger-vram-debugger.png" class="diagram-image diagram-screenshot">

<div class="small-note">VRAM debugger</div>

Click the view icon in the bottom-right corner to toggle the VRAM debugger. It appears on the right side of the emulator interface, featuring the following sections from top to bottom: "Tiles" (current tile allocation), "BG/WIN map" (BG or WIN map views), "OAM" (sprite or actor allocation), "Palettes" (grayscale or color palettes), and "Status (readonly)" (partial LCD status). Hover over an element to view its details and highlight valid references in other sections or in game.
