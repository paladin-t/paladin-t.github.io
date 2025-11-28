# VRAM Banking

[Prev]() [Next]()

By switching VRAM banks on colored devices, you can load a large number of tiles, enabling the creation of large maps and complex actors etc.

## Switch VRAM Banks

In the previous [Resetting a Scene](scene-definition-and-loading.html#resetting-a-scene) section, we have already used VRAM bank switching to clear VRAM. GB BASIC does not have a dedicated statement for switching VRAM banks; instead, it uses the generic device control statement `option`, as follows:

```basic
option VRAM_BANK, VRAM_BANK0 ' Switch to VRAM bank 0.
option VRAM_BANK, VRAM_BANK1 ' Switch to VRAM bank 1.
```
<!-- prg
!edit, run, index="", title="Switch to VRAM bank 0", style=""
option VRAM_BANK, VRAM_BANK0 ' Switch to VRAM bank 0.
option VRAM_BANK, VRAM_BANK1 ' Switch to VRAM bank 1.
-->

Or:

```basic
option VRAM_USAGE, VRAM_TILES      ' Switch to VRAM bank 0.
option VRAM_USAGE, VRAM_ATTRIBUTES ' Switch to VRAM bank 1.
```
<!-- prg
!edit, run, index="", title="Switch to VRAM bank 1", style=""
option VRAM_USAGE, VRAM_TILES      ' Switch to VRAM bank 0.
option VRAM_USAGE, VRAM_ATTRIBUTES ' Switch to VRAM bank 1.
-->

The `VRAM_BANK` and `VRAM_USAGE` options are aliases for the same operation. The `VRAM_BANK` option is more semantically appropriate when you are working with tiles, while the `VRAM_USAGE` option is more semantically appropriate when you are working with attributes etc.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="page-not-found.html" class="nav-link">Device</a> for more about <code>option</code>.
  </span>
</div>

## Loading Tiles into Different VRAM Banks

After switching the VRAM bank using the `option` statement, you can load tiles as usual. The tiles will be loaded into the currently active VRAM bank.

### Loading Map Tiles into Different VRAM Banks

Use the `file tile` family of statements to load map tiles into the currently active VRAM bank. It has some aliases that perform the same operation, which may be more semantically appropriate in different contexts.

* `fill tile(first, n) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`
  * aliases:
    * `fill map(first, n) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`
    * `fill window(first, n) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`

```basic
option VRAM_BANK, VRAM_BANK1 ' Switch to VRAM bank 1.
fill tile(0, 5) = #0         ' Fill the tiles into VRAM bank 1.
option VRAM_BANK, VRAM_BANK0 ' Switch back to VRAM bank 0.
                             ' Although not necessary, it's good practice to restore the
                             ' context to its normal state after certain operations.
```
<!-- prg
!edit, run, index="", title="Loading map tiles", style=""
url://prgs/vram-banking-1.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="page-not-found.html" class="nav-link">Tiles</a>, <a href="page-not-found.html" class="nav-link">Map</a>, and <a href="page-not-found.html" class="nav-link">Window</a>.
  </span>
</div>

### Loading Sprite Tiles into Different VRAM Banks

Use the `file sprite` statement to load sprite tiles into the currently active VRAM bank. These tiles are from tiles assets.

* `fill sprite(first, n) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`

```basic
option VRAM_BANK, VRAM_BANK1 ' Switch to VRAM bank 1.
fill sprite(0, 5) = #0       ' Fill the tiles into VRAM bank 1.
option VRAM_BANK, VRAM_BANK0 ' Switch back to VRAM bank 0.
                             ' Although not necessary, it's good practice to restore the
                             ' context to its normal state after certain operations.
```
<!-- prg
!edit, run, index="", title="Loading sprite tiles", style=""
url://prgs/vram-banking-2.txt
-->

Use the `file actor` and `fill projectile` statements to load actor/projectile tiles into the currently active VRAM bank. These tiles are from actor/projectile assets.

* `fill actor(first, n) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`
* `fill projectile(first, n) = read|data ...|"{builtin}"|#pg|#pg:n|"{name}"`

```basic
option VRAM_BANK, VRAM_BANK1 ' Switch to VRAM bank 1.
fill actor(0, 1) = #0        ' Fill the tiles into VRAM bank 1.
option VRAM_BANK, VRAM_BANK0 ' Switch back to VRAM bank 0.
                             ' Although not necessary, it's good practice to restore the
                             ' context to its normal state after certain operations.
```
<!-- prg
!edit, run, index="", title="Loading sprite tiles", style=""
url://prgs/vram-banking-3.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="page-not-found.html" class="nav-link">Tiles</a>, and <a href="page-not-found.html" class="nav-link">Sprite</a>.
  </span>
</div>

## Using Tiles from Different VRAM Banks

By specifying the bank flag bit in the attributes layer of map/scene assets in the editor and in the actor's props. we can make these assets use tiles from different VRAM banks.

### Using Map Tiles from Different VRAM Banks

#### Banking for Maps

Switch to and enable the attributes layer in the map editor, then paint the bank bit into the desired tiles to indicate to use different VRAM banks.

<img src="imgs/editor-map-bank-bit.png" class="diagram-image diagram-screenshot">

<div class="small-note">Banking for maps</div>

Use the following loading method to load the tiles and map.

```basic
option VRAM_BANK, VRAM_BANK1
fill tile(0, 5) = #0               ' Fill the tiles into VRAM bank 1.
option VRAM_BANK, VRAM_BANK0

map on
option VRAM_USAGE, VRAM_ATTRIBUTES ' Switch to VRAM bank 1.
def map(0, 0, 20, 18) = #0:1       ' Fill the map's attributes layer with bank bit into VRAM bank 1.
option VRAM_USAGE, VRAM_TILES      ' Switch back to VRAM bank 0.
def map(0, 0, 20, 18) = #0:0       ' Fill the map's graphics layer into VRAM bank 0.
```
<!-- prg
!edit, run, index="", title="Banking for maps", style=""
url://prgs/vram-banking-4.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <span>After executing the code above, the tiles data in VRAM is as follows.</span>
    <br>
    <br>
    <img src="imgs/debugger-vram-map-bank-bit.png" class="diagram-image diagram-screenshot">
  </span>
</div>

#### Banking for Scenes

Create a scene asset from the map with bank bits, then switch to and enable the attributes layer in the scene editor.

<img src="imgs/editor-scene-bank-bit.png" class="diagram-image diagram-screenshot">

<div class="small-note">Banking for scenes</div>

Use the following loading method to load the tiles and scene.

```basic
option VRAM_BANK, VRAM_BANK1
fill tile(0, 5) = #0         ' Fill the tiles into VRAM bank 1.
option VRAM_BANK, VRAM_BANK0

load scene(0, 0) = #0        ' Load the scene's map layer, attributes layer, etc.
```
<!-- prg
!edit, run, index="", title="Banking for scenes", style=""
url://prgs/vram-banking-5.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <span>After executing the code above, the tiles data in VRAM is as follows. Note that <code>load scene</code> always loads a scene's tile references into VRAM bank 0.</span>
    <br>
    <br>
    <img src="imgs/debugger-vram-scene-bank-bit.png" class="diagram-image diagram-screenshot">
  </span>
</div>

### Using Sprite Tiles from Different VRAM Banks

#### Banking for Sprites

Use the following loading method to load the tiles and sprite.

```basic
option VRAM_BANK, VRAM_BANK1
fill sprite(0, 1) = #0                ' Fill the tiles into VRAM bank 1.
option VRAM_BANK, VRAM_BANK0

sprite on
def sprite(0) = 0                     ' Assign tile 0 to sprite 0.
set sprite property(0, BANK_PROP) = 1 ' Set the sprite to use VRAM bank 1.
sprite 0, 16, 24
```
<!-- prg
!edit, run, index="", title="Banking for sprites", style=""
url://prgs/vram-banking-6.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <span>After executing the code above, the tiles data in VRAM is as follows.</span>
    <br>
    <br>
    <img src="imgs/debugger-vram-sprite-bank-bit.png" class="diagram-image diagram-screenshot">
  </span>
</div>

#### Banking for Actors

Create an actor asset, then edit the actor's props. to specify the bank bit.

<img src="imgs/editor-actor-bank-bit.png" class="diagram-image diagram-screenshot">

<div class="small-note">Banking for actors</div>

Use the following loading method to load the tiles and actor.

```basic
option VRAM_BANK, VRAM_BANK1
fill actor(0, 1) = #0        ' Fill the tiles into VRAM bank 1.
option VRAM_BANK, VRAM_BANK0

sprite on
let a = new actor()
def actor(a, 8, 8, 0) = #0   ' Define the actor, and uses its props. to determine that VRAM bank 1 is used for tiles.
update ' Update once to show the actor.
```
<!-- prg
!edit, run, index="", title="Banking for actors", style=""
url://prgs/vram-banking-7.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <span>After executing the code above, the tiles data in VRAM is as follows.</span>
    <br>
    <br>
    <img src="imgs/debugger-vram-actor-bank-bit.png" class="diagram-image diagram-screenshot">
  </span>
</div>

## Switching Between Tiles from Different VRAM Banks in Code

GB BASIC supports switching between tiles from different VRAM banks in code for maps and sprites. See the following examples.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    In practice, tile banks used by scenes and actors are not switched in code, due to the scrolling mechanism of scene, and dynamic allocation of actor sprites.
  </span>
</div>

### Switching for Maps

To dynamically switch which VRAM bank's tiles are used by maps in code, you can use `option VRAM_USAGE, VRAM_ATTRIBUTES` to switch to the attributes mode. Then call `set map(x, y) = val` to set the map's bank bit to achieve the switch.

```basic
' Initialize the game.
auto update on                         ' Turn on the auto update mode.

' Prepare.
on btnd(A_BTN) start UseBank0
on btnd(B_BTN) start UseBank1

' Fill the two sets of tiles into both VRAM banks.
fill tile(0, 5) = #0                   ' Fill the tiles into VRAM bank 0.
option VRAM_BANK, VRAM_BANK1
fill tile(0, 5) = #1                   ' Fill the tiles into VRAM bank 1.
option VRAM_BANK, VRAM_BANK0

' Initialize the map with tiles in VRAM bank 0.
map on
def map(0, 0, 20, 18) = #0             ' Fill the map's graphics layer into VRAM bank 0.

end

UseBank0:
  ' Refill the map's attributes to use tiles in VRAM bank 0.
  lock
    option VRAM_USAGE, VRAM_ATTRIBUTES ' Switch to VRAM bank 1.
    for j = 0 to 17
      for i = 0 to 19
        set map(i, j) = 0x00           ' Use VRAM basnk 0.
      next
    next
    option VRAM_USAGE, VRAM_TILES      ' Switch back to VRAM bank 0.
  unlock
  end

UseBank1:
  ' Refill the map's attributes to use tiles in VRAM bank 1.
  lock
    option VRAM_USAGE, VRAM_ATTRIBUTES ' Switch to VRAM bank 1.
    for j = 0 to 17
      for i = 0 to 19
        set map(i, j) = 0x08           ' Use VRAM basnk 1.
      next
    next
    option VRAM_USAGE, VRAM_TILES      ' Switch back to VRAM bank 0.
  unlock
  end
```
<!-- prg
!edit, run, index="", title="Switching map tile bank", style=""
url://prgs/vram-banking-8.txt
-->

### Switching for Sprites

To dynamically switch which VRAM bank's tiles are used by sprites in code, you can use `set sprite property(id, BANK_PROP) = val` to set the sprite's bank property to achieve the switch.

```basic
' Initialize the game.
auto update on                            ' Turn on the auto update mode.

' Prepare.
on btnd(A_BTN) start UseBank0
on btnd(B_BTN) start UseBank1

' Fill the two sets of tiles into both VRAM banks.
fill sprite(0, 1) = #0                    ' Fill the tiles into VRAM bank 0.
option VRAM_BANK, VRAM_BANK1
fill sprite(0, 1) = #1                    ' Fill the tiles into VRAM bank 1.
option VRAM_BANK, VRAM_BANK0

' Initialize the map with tiles in VRAM bank 0.
sprite on
def sprite(0) = 0                         ' Assign tile 0 to sprite 0.
sprite 0, 16, 24

end

UseBank0:
  ' Refill the map's attributes to use tiles in VRAM bank 0.
  lock
    set sprite property(0, BANK_PROP) = 0 ' Set the sprite to use VRAM bank 0.
  unlock
  end

UseBank1:
  ' Refill the map's attributes to use tiles in VRAM bank 1.
  lock
    set sprite property(0, BANK_PROP) = 1 ' Set the sprite to use VRAM bank 1.
  unlock
  end
```
<!-- prg
!edit, run, index="", title="Switching sprite tile bank", style=""
url://prgs/vram-banking-9.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="page-not-found.html" class="nav-link">Tiles</a>, <a href="page-not-found.html" class="nav-link">Map</a>, and <a href="page-not-found.html" class="nav-link">Sprite</a>.
  </span>
</div>

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="memory-map.html#vram-memory-map" class="nav-link">VRAM Memory Map</a>, and <a href="memory-map.html#cgb-features" class="nav-link">CGB Features</a>; <a href="page-not-found.html" class="nav-link">SGB Features</a>.
  </span>
</div>
