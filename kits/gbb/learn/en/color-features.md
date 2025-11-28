# Color Features

[Prev]() [Next]()

For [VRAM Memory Map](memory-map.html#vram-memory-map) on colored devices, it is divided into two banks - bank 0 and bank 1. By writing specific values to the attributes area in CGB VRAM bank 1, you can specify the palette, banking, flip, priority, etc. for the tile map, enabling the use of [CGB Features](memory-map.html#cgb-features) such as banking and colors for the background and sprites.

This section explains how to use features like palette and VRAM banking in GB BASIC.

To detect at runtime whether the currently running device supports colored features, you can use the `query IS_CGB` statement.

```basic
if not query IS_CGB then
  print "Is not CGB"
  end
else
  print "Is CGB"
end if
```
<!-- prg
!edit, run, index="", title="Determining colored device", style=""
if not query IS_CGB then
  print "Is not CGB"
  end
else
  print "Is CGB"
end if
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="video-module.html" class="nav-link">Video Module</a>; <a href="page-not-found.html" class="nav-link">SGB Features</a>.
  </span>
</div>
