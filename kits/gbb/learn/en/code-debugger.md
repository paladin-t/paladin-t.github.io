# Code Debugger

[Prev]() [Next]()

GB BASIC includes a complete set of breakpoint, inspector, and debugger mechanisms to support development-time debugging, and troubleshooting of game programs.

## Setting Breakpoints

Toggle breakpoints by clicking the code line gutter (the line number area) or pressing F9 on a specific line. You can set breakpoints in BASIC or inline assembly code this way.

<img src="imgs/editor-code-setting-breakpoint.png" class="diagram-image diagram-screenshot">

<div class="small-note">Setting breakpoints</div>

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    Write <code>shell "||"</code> to break execution in code.
  </span>
</div>

## Program Inspector

In the "Inspector" section, you can use buttons to resume or pause the program, step through BASIC or assembly code, or toggle breakpoints.

When BASIC code is available, the BASIC source is displayed in the view.

<img src="imgs/debugger-code-inspector-basic.png" class="diagram-image diagram-screenshot">

<div class="small-note">BASIC inspector</div>

When debugging assembly instructions, disassembly information is displayed in the view.

<img src="imgs/debugger-code-inspector-asm.png" class="diagram-image diagram-screenshot">

<div class="small-note">ASM inspector</div>

The "Breakpoints" tab contains all breakpoints. You can edit breakpoints here, or add assembly breakpoints at any ROM location.

<img src="imgs/debugger-code-inspector-breakpoints.png" class="diagram-image diagram-screenshot">

<div class="small-note">Breakpoints inspector</div>

## Kernel and Object Inspector

In the "Kernel" section, you can view live information about objects such as the VM heap, threads, and objects such as actors and triggers.

<img src="imgs/debugger-code-kernel-memory.png" class="diagram-image diagram-screenshot">

<div class="small-note">Kernel memory</div>

## CPU Register and Hardware Memory Inspector

In the "Device" section, you can view all CPU registers and the data of the entire memory bus, with support for in-place editing of RAM data.

<img src="imgs/debugger-code-device-memory.png" class="diagram-image diagram-screenshot">

<div class="small-note">Device memory</div>
