# Compiler and Kernel

[Prev]() [Next]()

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    This chapter covers advanced knowledge, which are not essential for game development using GB BASIC. You may choose to skip it. If you are interested in the architectures about the compiler and kernel linking, please read this chapter.
  </span>
</div>

GB BASIC programs generally consist of code and assets. The code is compiled by the compiler into VM instructions, and assets are processed by the pipeline into binary data. The compiled instructions and resource data are then linked by GB BASIC with a kernel ROM to produce the final ROM file and related symbol table file. The overall architecture of the compiler and kernel is shown in the figure below.

<img src="imgs/system-overall-architecture.png" class="diagram-image diagram-schematic">

During runtime, the VM instructions and resource data are managed by the OS kernel and executed on it; the OS kernel runs on the player's hardware device or emulator.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="the-os-kernel.html" class="nav-link">The OS Kernel</a>, and <a href="creating-a-custom-kernel.html" class="nav-link">Creating a Custom Kernel</a>.
  </span>
</div>
