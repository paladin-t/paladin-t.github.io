# Creating a Custom Kernel

[Prev]() [Next]()

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    This chapter covers advanced knowledge, which are not essential for game development using GB BASIC. You may choose to skip it. If you intend to make kernel modifications and distribute them, please read this chapter.
  </span>
</div>

The "Default Kernel" distributed with GB BASIC binaries includes the None, Platformer, Top-down, and Point&Click controllers. Additionally, the "Scroll Shooting" kernel includes the Scroll Shooting controller.

## Default Kernel

The default kernel includes all the general-purpose libraries, functions, properties, and object systems described in the [Reference Manual](https://paladin-t.github.io/kits/gbb/manual.html), and implements [Platformer](platformer-controller.html), [Top-down](top-down-controller.html), and [Point&Click](point-and-click-controller.html) behaviours for the actor controller. This kernel can meet the needs of the vast majority of game development in GB BASIC.

## Scroll Shooting Kernel

The scroll shooting kernel is an extension of the default kernel. In addition to the features provided by the default kernel, it implements an extra [Scroll Shooting](scroll-shooting-controller.html) behaviour for the actor controller, enabling the creation of common scrolling shooter games.

## Custom Kernels

In addition, GB BASIC also supports user-defined kernels and allows for custom distributions. This chapter explains practices related to custom kernels, including source fetching, development, packaging, and installation.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="the-os-kernel.html" class="nav-link">The OS Kernel</a>, and <a href="compiler-and-kernel.html" class="nav-link">Compiler and Kernel</a>.
  </span>
</div>
