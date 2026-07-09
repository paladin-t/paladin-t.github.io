# SFC Mouse Kernel

[Prev]() [Next]()

This kernel is integrated with an SFC/SNES mouse driver, and enables using it as the input hardware of the `touch` APIs. This requires the SGB adapter to bridge between the ROM software and the SFC/SNES hardware.

## Technical Notes

To use this feature, specify to use the kernel in your project, and the "SGB Features" in the project's property should be turned on. Then no special coding is required. In addition, `call is_sgb_mouse_installed` to get whether a compatible mouse has bee installed.

<img src="imgs/editor-project-property-enabling-sgb-features-for-sfc-mouse.png" class="diagram-image diagram-screenshot">

<div class="small-note">Enabling SGB features for SFC mouse</div>

To debug this function or use it, use an SFC/SNES with plugged SGB and peripheral mouse, or find some emulators like Mesen. The mouse should be plugged in port 2.

<img src="imgs/photo-sfc-mouse.jpg" class="diagram-image diagram-screenshot" style="max-width: 400px;">

<div class="small-note">SFC/SNES mouse</div>

<img src="imgs/photo-sfc-mouse-with-sgb.jpg" class="diagram-image diagram-screenshot" style="max-width: 400px;">

<div class="small-note">Using an SFC mouse with SGB</div>

## Predefined Macros

This kernel has the following predefined macros:

```basic-readonly
HAS_SFC_MOUSE=1
```

## API Usage

No special coding is needed for the extended features in this kernel. Just select this kernel for your project and enable SFC features, and modules like touch and Point&Click controller will properly recognize and handle the SFC mouse driver.

## Examples

Try the following project, which demonstrates how to use the point&click controller with SFC/SNES mouse support. You can build a ROM and test it on an SFC/SNES with SGB and mouse plugged, or on a capable emulator.

![edit, run, style="width: 640px;"](imgs/editor-project-property-selecting-sfc-mouse-kernel.png)
<!-- prg
!edit, run, title="Point and Click controller with SFC/SNES mouse", style=""
url://prgs/official-kernel-sfc-mouse-1.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="official-kernels.html" class="nav-link">Official Kernels</a>, and <a href="https://github.com/paladin-t/gbb/releases/latest.html" class="nav-link">latest GitHub release</a>.
  </span>
</div>
