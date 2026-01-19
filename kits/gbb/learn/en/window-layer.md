# Window Layer

[Prev]() [Next]()

From a hardware perspective, the Game Boy's display system consists of three layers: map, window, and sprite. GUI widgets in GB BASIC can be drawn on either the map or window layer, but not on the sprite layer. Generally, in-scene text or specific genres such as text-based games use the map layer to draw the majour contents of scenes, while windows, dialog boxes, game menus, or the HUD in most games use the window layer. You decide it according to actual situation.

For detailed specifications and API documentation on the window layer, please refer to the reference links at the end of this section. Similar to other GB BASIC APIs that support layer selection, the GUI API also uses specific parameter to designate which layer to draw onto.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="display-and-screen-modes.html#graphics-layers" class="nav-link">Graphics Layers</a>, and <a href="window.html" class="nav-link">Window</a>.
  </span>
</div>
