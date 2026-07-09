# Scene Transfer Kernel

[Prev]() [Next]()

This kernel implements scene blit and transition methods.

Consider two scenarios: First, displaying game dialogue by temporarily replacing a portion of the map's tilemap instead of using the window layer, then restoring the scene display after the dialogue ends. Second, switching between game scenes with a scrolling effect rather than a fade out/in. This kernel was created to fulfill these requirements.

## Technical Notes

The functionality in this kernel is provided by two native functions: `blit_scene` and `transition_scene`. Note that you should have loaded a scene using scene loading statements before calling these functions. `blit_scene` uses previous scene information to restore the scene tilemap, while `transition_scene` performs the switch using both the previous scene information and the new target scene information.

There are two tilemap areas with base addresses at 0x9800 and 0x9C00. Typically, one is used for the BG layer and the other for the WIN layer, and they can be specified via bits 3 and 6 of the LCDC register. During the transition phase of the `transition_scene` function, a central area of the tilemap region opposite to the current BG layer is used as a temporary map display area. Therefore, the game's HUD should not be too tall (a height of no more than 7 tiles should be a safe value), you can inspect its behaviour in the VRAM debugger. `transition_scene` only supports transitions for scenes smaller than a single screen. The scene width must match the screen viewport width (=20 tiles), and the scene height can be less than or equal to the screen viewport height (<=18 tiles). This function does not operate on data outside the map and attributes layers, so consider handling the loading and unloading of objects like actors and triggers yourself.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="memory-map.html#vram-memory-map" class="nav-link">VRAM Memory Map</a>.
  </span>
</div>

## Predefined Macros

This kernel has the following predefined macros:

```basic-readonly
HAS_SCENE_TRANSFER=1
```

## API Usage

The APIs are implemented as extra native functions, see the usages as follows:

* `call blit_scene x, y, w, h`: makes blit of a region of scene data (including the map display and the attribute layers) to the current scene
  * `x`: the x position to blit in tiles
  * `y`: the y position to blit in tiles
  * `w`: the width to blit in tiles
  * `h`: the height to blit in tiles
* `call transition_scene dir, map_bank, map_addr, attr_bank, attr_addr`: transitions to another scene with scrolling effect
  * `dir`: the direction the old scene scrolls out of the viewport; can be one of `DOWN_DIR`, `RIGHT_DIR`, `UP_DIR`, or `LEFT_DIR` of the "Directions" constants
  * `map_bank`: the bank of the new scene map data
  * `map_addr`: the address of the new scene map data
  * `attr_bank`: the bank of the new scene attributes data
  * `attr_addr`: the address of the new scene attributes data

These two functions only operate map display and attribute layers, they won't affect objects.

## Examples

The following program demonstrates how to restore map tiles covered by other content (such as dialogue text) using the `blit_scene` function. Note that the `blit_scene` function uses the latest loaded scene information for restoring.

```basic
' Initialize the game.
auto update on        ' Turn on the auto update mode.
load scene(0, 0) = #0 ' Load the scene.
end

ShowMessage:
  begin do
    lock
      ' Show a dialog on the map layer, this operation takes a few map tiles for the dialog.
      load dialog(2, 14, 16, 4, 5) = #1, MAP_LAYER, 3, 2, 0
      label #1, "The Quick Brown Fox Jumps Over the Lazy Dog"
      wait 10
      call wait_until_confirm
      ' Restore the map tiles.
      call blit_scene 2, 14, 16, 4
    unlock
    end
  end do
```
<!-- prg
!edit, run, title="Scene blit", style=""
url://prgs/official-kernel-scene-transfer-1.txt
-->

The following program demonstrates how to implement a scrolling transition between scenes using the `transition_scene` function.

```basic
' This program demonstrates how to implement scene scrolling transitions via the
' `transition_scene` function. The methods demonstrated here are viable
' practices; feel free to write your own logic in real projects.

' Initialize the game.
...

auto update on                                            ' Turn on the auto update mode.

load scene(0, 0) = #0                                     ' Load the initial scene.
gosub CreatePlayer                                        ' Create the player.

window on
window 7, 128
load dialog(0, 0, 20, 2, 216) = #1, WINDOW_LAYER, 0, 1, 0 ' Show the HUD area
label "Cubic", "GB BASIC-Scroll Scene Trans"              ' with some text.

end

CreatePlayer:
  ...
  return

DisposeObjects:
  ...
  return

SwitchScene:
  ' Scroll transition to another scene. Both scenes must share the same tileset.
  gosub DisposeObjects                                    ' Clear all objects first.
  if scene_index = 0 then
    ' Switch to scene #0.
    call transition_scene _                               ' Call the `transition_scene` native function.
      scroll_dir, _                                       ' Scroll direction.
      get map bankof(#0:0), get map addressof(#0:0), _    ' Map visual layer address.
      get scene bankof(#0:0), get scene addressof(#0:0)   ' Scene attribute layer address.
    ' Reload the scene. The above `call transition_scene` loads the new scene's
    ' map and attribute layers into place, using `load scene` again here is to
    ' load objects (including actors and triggers) defined in the scene asset,
    ' although this reloads the map and attribute layers, it does not affect the
    ' player experience.
    load scene(0, 0) = #0
    ' Recreate the player.
    gosub CreatePlayer
  else ' if scene_index = 1 then
    ' Switch to scene #1.
    call transition_scene _
      scroll_dir, _
      get map bankof(#1:0), get map addressof(#1:0), _
      get scene bankof(#1:0), get scene addressof(#1:0)
    load scene(0, 0) = #1
    gosub CreatePlayer
  end if
  return

...

OnEnteredTriggerLeft:
  actor_pos = RIGHT_DIR
  scroll_dir = RIGHT_DIR
  goto OnEnteredTrigger
OnEnteredTriggerRight:
  ...
  goto OnEnteredTrigger
OnEnteredTriggerUp:
  ...
  goto OnEnteredTrigger
OnEnteredTriggerDown:
  ...
  goto OnEnteredTrigger
OnEnteredTrigger:
  stop actor(actor_player)                                ' Stop the player.
  control actor actor_player, NONE_BEHAVIOUR
  inc scene_index                                         ' Loop the scene index.
  if scene_index = 2 then
    scene_index = 0
  end if
  gosub SwitchScene                                       ' Switch to another scene.
  end
```
<!-- prg
!edit, run, title="Scene transition", style=""
url://prgs/official-kernel-scene-transfer-2.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="official-kernels.html" class="nav-link">Official Kernels</a>, and <a href="https://github.com/paladin-t/gbb/releases/latest.html" class="nav-link">latest GitHub release</a>.
  </span>
</div>
