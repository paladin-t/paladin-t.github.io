# Memory Map

[Prev]() [Next]()

The CPU addresses other devices, including RAM, VRAM, ROM, and other I/O devices, uniformly as the address space on the memory bus. With this 16-bit address bus, its maximum addressing capability is 64KB. However, through the bank switching technique, certain regions can be mapped to different hardware "banks", enabling support for larger ROMs, as well as expanded RAM and VRAM on color-capable devices, among other features.

Understanding the memory layout helps in comprehending how the console works. Usually, there is no need to directly access memory addresses in BASIC code, but in certain special cases, it is possible to read or write to memory addresses directly with the `peek` and `poke` statements.

## Overall Memory Map

| Address | End    | Length (bytes) | Description                    | Notes                                               | Access         |
|---------|--------|----------------|--------------------------------|-----------------------------------------------------|----------------|
| 0x0000  | 0x3FFF | 16384          | 16KB ROM bank 00               | From cartridge, usually a fixed bank                | Read-only      |
| 0x4000  | 0x7FFF | 16384          | 16KB ROM bank 01–NN            | From cartridge, switchable bank via mapper (if any) | Read-only      |
| 0x8000  | 0x9FFF | 8192           | 8KB Video RAM (VRAM)           | In colored mode, switchable bank 0/1                | Read/write     |
| 0xA000  | 0xBFFF | 8192           | 8KB External RAM               | From cartridge, switchable bank if any              | Read/write     |
| 0xC000  | 0xCFFF | 4096           | 4KB Work RAM (WRAM)            |                                                     | Read/write     |
| 0xD000  | 0xDFFF | 4096           | 4KB Work RAM (WRAM)            | In colored mode, switchable bank 1-7                | Read/write     |
| 0xE000  | 0xFDFF | 7680           | Echo RAM (mirror of C000–DDFF) | Accessing this area is prohibited                   |                |
| 0xFE00  | 0xFE9F | 160            | Object Attribute Memory (OAM)  |                                                     | Read/write     |
| 0xFEA0  | 0xFEFF | 96             | Extension area                 | Dedicated to extension features                     | Detailed later |
| 0xFF00  | 0xFF7F | 128            | I/O registers                  |                                                     | Read/write     |
| 0xFF80  | 0xFFFE | 127            | High RAM (HRAM)                |                                                     | Read/write     |
| 0xFFFF  | -      | 1              | Interrupt Enable register (IE) |                                                     |                |

**See also**: <a class="nav-link" href="https://gbdev.io/pandocs/Memory_Map.html" target="_blank">Memory Map <i class="fa-solid fa-up-right-from-square"></i></a>.

## I/O Registers

| Address | End    | Length (bytes) | Compatibilities | Notes                                                  |
|---------|--------|----------------|-----------------|--------------------------------------------------------|
| 0xFF00  |        | 1              | DMG/CGB         | Joypad input                                           |
| 0xFF01  | 0xFF02 | 2              | DMG/CGB         | Serial transfer                                        |
| 0xFF04  | 0xFF07 | 4              | DMG/CGB         | Timer and divider                                      |
| 0xFF0F  |        | 1              | DMG/CGB         | Interrupts                                             |
| 0xFF10  | 0xFF26 | 23             | DMG/CGB         | Audio                                                  |
| 0xFF30  | 0xFF3F | 16             | DMG/CGB         | Wave pattern                                           |
| 0xFF40  | 0xFF4B | 12             | DMG/CGB         | LCD control, status, position, scrolling, and palettes |
| 0xFF4F  |        | 1              | CGB             | VRAM bank select                                       |
| 0xFF50  |        | 1              | DMG/CGB         | Boot ROM mapping control                               |
| 0xFF51  | 0xFF55 | 5              | CGB             | VRAM DMA                                               |
| 0xFF68  | 0xFF6B | 4              | CGB             | BG/OBJ palettes                                        |
| 0xFF70  |        | 1              | CGB             | WRAM bank select                                       |

## VRAM Memory Map

See the follows for VRAM visualisation.

<svg class="diagram-svg" style="max-width: 800px;" viewBox="0 0 680 710" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" id="vram_map">
  <defs>
    <rect id="tile" x="0" y="0" width="12" height="12" class="highlight"></rect>
    <rect id="entry" x="0" y="0" width="6" height="6" class="highlight"></rect>
    <g id="tiles_row">
      <use x="0" y="0" href="#tile" onmouseenter="tile(0)"></use>
      <use x="12" y="0" href="#tile" onmouseenter="tile(1)"></use>
      <use x="24" y="0" href="#tile" onmouseenter="tile(2)"></use>
      <use x="36" y="0" href="#tile" onmouseenter="tile(3)"></use>
      <use x="48" y="0" href="#tile" onmouseenter="tile(4)"></use>
      <use x="60" y="0" href="#tile" onmouseenter="tile(5)"></use>
      <use x="72" y="0" href="#tile" onmouseenter="tile(6)"></use>
      <use x="84" y="0" href="#tile" onmouseenter="tile(7)"></use>
      <use x="96" y="0" href="#tile" onmouseenter="tile(8)"></use>
      <use x="108" y="0" href="#tile" onmouseenter="tile(9)"></use>
      <use x="120" y="0" href="#tile" onmouseenter="tile(10)"></use>
      <use x="132" y="0" href="#tile" onmouseenter="tile(11)"></use>
      <use x="144" y="0" href="#tile" onmouseenter="tile(12)"></use>
      <use x="156" y="0" href="#tile" onmouseenter="tile(13)"></use>
      <use x="168" y="0" href="#tile" onmouseenter="tile(14)"></use>
      <use x="180" y="0" href="#tile" onmouseenter="tile(15)"></use>
    </g>
    <g id="tiles_block">
      <rect x="0" y="0" width="192" height="96" class="block"></rect>
      <use x="0" y="0" href="#tiles_row" onmouseenter="row(0)"></use>
      <use x="0" y="12" href="#tiles_row" onmouseenter="row(1)"></use>
      <use x="0" y="24" href="#tiles_row" onmouseenter="row(2)"></use>
      <use x="0" y="36" href="#tiles_row" onmouseenter="row(3)"></use>
      <use x="0" y="48" href="#tiles_row" onmouseenter="row(4)"></use>
      <use x="0" y="60" href="#tiles_row" onmouseenter="row(5)"></use>
      <use x="0" y="72" href="#tiles_row" onmouseenter="row(6)"></use>
      <use x="0" y="84" href="#tiles_row" onmouseenter="row(7)"></use>
    </g>
    <g id="map_row">
      <use x="0" y="0" href="#entry" onmouseenter="mapX(0)"></use>
      <use x="6" y="0" href="#entry" onmouseenter="mapX(1)"></use>
      <use x="12" y="0" href="#entry" onmouseenter="mapX(2)"></use>
      <use x="18" y="0" href="#entry" onmouseenter="mapX(3)"></use>
      <use x="24" y="0" href="#entry" onmouseenter="mapX(4)"></use>
      <use x="30" y="0" href="#entry" onmouseenter="mapX(5)"></use>
      <use x="36" y="0" href="#entry" onmouseenter="mapX(6)"></use>
      <use x="42" y="0" href="#entry" onmouseenter="mapX(7)"></use>
      <use x="48" y="0" href="#entry" onmouseenter="mapX(8)"></use>
      <use x="54" y="0" href="#entry" onmouseenter="mapX(9)"></use>
      <use x="60" y="0" href="#entry" onmouseenter="mapX(10)"></use>
      <use x="66" y="0" href="#entry" onmouseenter="mapX(11)"></use>
      <use x="72" y="0" href="#entry" onmouseenter="mapX(12)"></use>
      <use x="78" y="0" href="#entry" onmouseenter="mapX(13)"></use>
      <use x="84" y="0" href="#entry" onmouseenter="mapX(14)"></use>
      <use x="90" y="0" href="#entry" onmouseenter="mapX(15)"></use>
      <use x="96" y="0" href="#entry" onmouseenter="mapX(16)"></use>
      <use x="102" y="0" href="#entry" onmouseenter="mapX(17)"></use>
      <use x="108" y="0" href="#entry" onmouseenter="mapX(18)"></use>
      <use x="114" y="0" href="#entry" onmouseenter="mapX(19)"></use>
      <use x="120" y="0" href="#entry" onmouseenter="mapX(20)"></use>
      <use x="126" y="0" href="#entry" onmouseenter="mapX(21)"></use>
      <use x="132" y="0" href="#entry" onmouseenter="mapX(22)"></use>
      <use x="138" y="0" href="#entry" onmouseenter="mapX(23)"></use>
      <use x="144" y="0" href="#entry" onmouseenter="mapX(24)"></use>
      <use x="150" y="0" href="#entry" onmouseenter="mapX(25)"></use>
      <use x="156" y="0" href="#entry" onmouseenter="mapX(26)"></use>
      <use x="162" y="0" href="#entry" onmouseenter="mapX(27)"></use>
      <use x="168" y="0" href="#entry" onmouseenter="mapX(28)"></use>
      <use x="174" y="0" href="#entry" onmouseenter="mapX(29)"></use>
      <use x="180" y="0" href="#entry" onmouseenter="mapX(30)"></use>
      <use x="186" y="0" href="#entry" onmouseenter="mapX(31)"></use>
    </g>
    <g id="tilemap">
      <rect x="0" y="0" width="192" height="192" class="block"></rect>
      <use x="0" y="0" href="#map_row" onmouseenter="mapY(0)"></use>
      <use x="0" y="6" href="#map_row" onmouseenter="mapY(1)"></use>
      <use x="0" y="12" href="#map_row" onmouseenter="mapY(2)"></use>
      <use x="0" y="18" href="#map_row" onmouseenter="mapY(3)"></use>
      <use x="0" y="24" href="#map_row" onmouseenter="mapY(4)"></use>
      <use x="0" y="30" href="#map_row" onmouseenter="mapY(5)"></use>
      <use x="0" y="36" href="#map_row" onmouseenter="mapY(6)"></use>
      <use x="0" y="42" href="#map_row" onmouseenter="mapY(7)"></use>
      <use x="0" y="48" href="#map_row" onmouseenter="mapY(8)"></use>
      <use x="0" y="54" href="#map_row" onmouseenter="mapY(9)"></use>
      <use x="0" y="60" href="#map_row" onmouseenter="mapY(10)"></use>
      <use x="0" y="66" href="#map_row" onmouseenter="mapY(11)"></use>
      <use x="0" y="72" href="#map_row" onmouseenter="mapY(12)"></use>
      <use x="0" y="78" href="#map_row" onmouseenter="mapY(13)"></use>
      <use x="0" y="84" href="#map_row" onmouseenter="mapY(14)"></use>
      <use x="0" y="90" href="#map_row" onmouseenter="mapY(15)"></use>
      <use x="0" y="96" href="#map_row" onmouseenter="mapY(16)"></use>
      <use x="0" y="102" href="#map_row" onmouseenter="mapY(17)"></use>
      <use x="0" y="108" href="#map_row" onmouseenter="mapY(18)"></use>
      <use x="0" y="114" href="#map_row" onmouseenter="mapY(19)"></use>
      <use x="0" y="120" href="#map_row" onmouseenter="mapY(20)"></use>
      <use x="0" y="126" href="#map_row" onmouseenter="mapY(21)"></use>
      <use x="0" y="132" href="#map_row" onmouseenter="mapY(22)"></use>
      <use x="0" y="138" href="#map_row" onmouseenter="mapY(23)"></use>
      <use x="0" y="144" href="#map_row" onmouseenter="mapY(24)"></use>
      <use x="0" y="150" href="#map_row" onmouseenter="mapY(25)"></use>
      <use x="0" y="156" href="#map_row" onmouseenter="mapY(26)"></use>
      <use x="0" y="162" href="#map_row" onmouseenter="mapY(27)"></use>
      <use x="0" y="168" href="#map_row" onmouseenter="mapY(28)"></use>
      <use x="0" y="174" href="#map_row" onmouseenter="mapY(29)"></use>
      <use x="0" y="180" href="#map_row" onmouseenter="mapY(30)"></use>
      <use x="0" y="186" href="#map_row" onmouseenter="mapY(31)"></use>
    </g>
    <style type="text/css">
      text { fill: var(--fg, #000); dominant-baseline: middle; font-feature-settings: "tnum"; }
      .descr { fill: var(--inline-code-color, #310); }
      .centered { text-anchor: middle; }
      .right    { text-anchor: end; }
      rect { stroke: var(--fg, #000); fill: var(--bg, #fff); }
      #tile:hover, #entry:hover { fill: var(--icons, #777); }
      .block { stroke-width: 4; }
      .hover + * { display: none; }  .hover:hover + * { display: initial; }
    </style>
  </defs>
  <text x="90" y="20" class="right">$8000</text>
  <text x="90" y="116" class="right">$8800</text>
  <text x="90" y="212" class="right">$9000</text>
  <text x="90" y="308" class="right">$9800</text>
  <text x="90" y="500" class="right">$9C00</text>
  <text x="90" y="692" class="right">$9FFF</text>
  <text x="590" y="20">$8000</text>
  <text x="590" y="116">$8800</text>
  <text x="590" y="212">$9000</text>
  <text x="590" y="308">$9800</text>
  <text x="590" y="500">$9C00</text>
  <text x="590" y="692">$9FFF</text>
  <text x="196" y="10" class="centered">Bank 0</text>
  <text x="484" y="10" class="centered">Bank 1</text>
  <text x="196" y="704" class="centered">Bank 0</text>
  <text x="484" y="704" class="centered">Bank 1</text>
  <g class="hover">
    <use x="100" y="20" href="#tiles_block" class="hover" onmouseenter="block(0x8000)"></use>
    <text x="90" y="68" class="right descr">Tile block 0</text>
    <use x="100" y="116" href="#tiles_block" class="hover" onmouseenter="block(0x8800)"></use>
    <text x="90" y="164" class="right descr">Tile block 1</text>
    <use x="100" y="212" href="#tiles_block" class="hover" onmouseenter="block(0x9000)"></use>
    <text x="90" y="260" class="right descr">Tile block 2</text>
    <use x="388" y="20" href="#tiles_block" class="hover" onmouseenter="block(0x8000)"></use>
    <text x="590" y="68" class="descr">Tile block 0</text>
    <use x="388" y="116" href="#tiles_block" class="hover" onmouseenter="block(0x8800)"></use>
    <text x="590" y="164" class="descr">Tile block 1</text>
    <use x="388" y="212" href="#tiles_block" class="hover" onmouseenter="block(0x9000)"></use>
    <text x="590" y="260" class="descr">Tile block 2</text>
  </g>
  <g>
    <text x="340" y="134" class="centered descr">Tile ID:</text>
    <text x="340" y="154" class="centered descr" id="tile_id">$1F</text>
    <text x="340" y="174" class="centered descr">Address:</text>
    <text x="340" y="194" class="centered descr" id="tile_addr">91F0–91FF</text>
  </g>
  <g class="hover">
    <use x="100" y="308" href="#tilemap" class="hover" onmouseenter="tmap(0x9800, 0)"></use>
    <text x="90" y="404" class="right descr">Tile map 0</text>
    <use x="100" y="500" href="#tilemap" class="hover" onmouseenter="tmap(0x9C00, 0)"></use>
    <text x="90" y="596" class="right descr">Tile map 1</text>
    <use x="388" y="308" href="#tilemap" class="hover" onmouseenter="tmap(0x9800, 1)"></use>
    <text x="590" y="404" class="descr">Attr map 0</text>
    <use x="388" y="500" href="#tilemap" class="hover" onmouseenter="tmap(0x9C00, 1)"></use>
    <text x="590" y="596" class="descr">Attr map 1</text>
  </g>
  <g>
    <text x="340" y="470" class="centered descr" id="map_what">Attribute for</text>
    <text x="338" y="490" class="right descr">X =</text><text x="342" y="490" class="descr" id="map_x">2</text>
    <text x="338" y="510" class="right descr">Y =</text><text x="342" y="510" class="descr" id="map_y">5</text>
    <text x="340" y="530" class="centered descr" id="map_addr">($98A2)</text>
  </g>
  <script>
// 
"use strict";
/*
 * Use of `on(event)` properties is normally discouraged in favor of `addEventHandler`s.
 * However, they *have* to be used here.
 *
 * For the sake of maintainability and the SVG's file size, the tilemaps are made of nested `(use)`
 * elements. However, those elements have a "closed root", thus the "inside" elements are *not*
 * exposed to anything outside of them.
 *
 * I have tried putting `(script)` blocks inside of the "template" element, but they appear to only
 * run on the template, not within any of its clones.
 * The only remaining thing is the `on*` attributes, which *do* appear to be cloned!
 */
var toHex = (num, nbDigits) => num.toString(16).toUpperCase().padStart(nbDigits, '0');
var svg = document.getElementById("vram_map");
/*
 * Tile blocks
 */
// Since the hover events are dispatched to several separate handlers, we need something to
// centralize all of their information.
var tileInfo = { x: null, y: null, baseAddr: null };
var updateTileID = () => {
  // Do nothing if all of the handlers haven't fired at least once yet.
  // Check all properties to avoid relying on the order in which the events are triggered.
  if (Object.values(tileInfo).includes(null)) {
    return;
  }
  const tileID = tileInfo.y * 16 + tileInfo.x + (tileInfo.baseAddr >> 4 & 0x80);
  svg.getElementById("tile_id").textContent = `$${toHex(tileID, 2)}`;
  const tileAddr = tileInfo.baseAddr + (tileInfo.y * 16 + tileInfo.x) * 16;
  svg.getElementById("tile_addr").textContent = `${toHex(tileAddr, 4)}–${toHex(tileAddr + 15, 4)}`;
};
// These are event handlers, called into by `onmouseenter` attributes within `vram_map.svg`.
// Have each hover event attempt to recalc the tile ID; this will cause up to two unnecessary recalcs,
// but avoids relying on the order upon which the events are fired.
var tile  = x    => { tileInfo.x = x;           updateTileID(); };
var row   = y    => { tileInfo.y = y;           updateTileID(); };
var block = addr => { tileInfo.baseAddr = addr; updateTileID(); };
/*
 * Tilemap
 */
// Since the hover events are dispatched to several separate handlers, we need something to
// centralize all of their information.
var mapInfo = { x: null, y: null, baseAddr: null, bank: null };
var updateMapCoords = () => {
  // Do nothing if all of the handlers haven't fired at least once yet.
  // Check all properties to avoid relying on the order in which the events are triggered.
  if (Object.values(mapInfo).includes(null)) {
    return;
  }
  svg.getElementById("map_what").textContent = mapInfo.bank == 0 ? "Tile ID for" : "Attribute for";
  svg.getElementById("map_x").textContent = mapInfo.x;
  svg.getElementById("map_y").textContent = mapInfo.y;
  const mapAddr = mapInfo.baseAddr + mapInfo.x + mapInfo.y * 32;
  svg.getElementById("map_addr").textContent = `($${toHex(mapAddr, 4)})`;
};
// These are event handlers, called into by `onmouseenter` attributes within `vram_map.svg`.
// Have each hover event attempt to recalc the tile ID; this will cause up to two unnecessary recalcs,
// but avoids relying on the order upon which the events are fired.
var mapX = x            => { mapInfo.x = x;                                updateMapCoords(); };
var mapY = y            => { mapInfo.y = y;                                updateMapCoords(); };
var tmap = (addr, bank) => { mapInfo.baseAddr = addr; mapInfo.bank = bank; updateMapCoords(); };
// Remove the entries from the global scope when the route changes.
if (!window.onRouteChanged) {
  window.onRouteChanged = [ ];
}
window.onRouteChanged.push((name, path) => {
  const entriesToRemove = [
    'tileInfo',
    'mapInfo',
    'toHex',
    'svg',
    'updateTileID',
    'tile',
    'row',
    'block',
    'updateMapCoords',
    'mapX',
    'mapY',
    'tmap'
  ];
  entriesToRemove.forEach(entry => {
    if (!window.hasOwnProperty(entry)) return;
    try {
      delete window[entry];
    } catch (e) {
      try {
        window[entry] = undefined;
      } catch (deleteError) {
      }
    }
  });
});
//
  </script>
</svg>

<div class="small-note">From <a href="https://gbdev.io/pandocs/Memory_Map.html" target="_blank">Pan Docs <i class="fa-solid fa-up-right-from-square"></i></a></div>

## LCD Control: 0xFF40 (LCDC)

LCDC is the main LCD Control register. Its bits toggle what elements are displayed on the screen, and how.

| 7              | 6               | 5             | 4               | 3           | 2        | 1          | 0                         |
|----------------|-----------------|---------------|-----------------|-------------|----------|------------|---------------------------|
| LCD&PPU enable | Window tile map | Window enable | BG&Window tiles | BG tile map | OBJ size | OBJ enable | BG&Window enable/priority |

* **LCD&PPU enable**: 0 = Off; 1 = On
* **Window tile map area**: 0 = 0x9800-0x9BFF; 1 = 0x9C00-0x9FFF
* **Window enable**: 0 = Off; 1 = On
* **BG&Window tile data area**: 0 = 0x8800-0x97FF; 1 = 0x8000-0x8FFF
* **BG tile map area**: 0 = 0x9800-0x9BFF; 1 = 0x9C00-0x9FFF
* **OBJ size**: 0 = 8×8; 1 = 8×16
* **OBJ enable**: 0 = Off; 1 = On
* **BG&Window enable/priority [Different meaning in CGB Mode]**: 0 = Off; 1 = On

<div class="content-error">
  <img src="imgs/logo-nokbd.png" class="logo-tip"></img>
  <span class="content-text">
    <strong>CAUTION!</strong>
    <br>
    Stopping LCD operation (bit 7 from 1 to 0) may be performed during VBlank only, disabling the display outside of the VBlank period may damage the hardware by burning in a black horizontal line similar to that which appears when the GB is turned off. This appears to be a serious issue. NEVER DO THIS in BASIC code.
    <br>
    Use <code>screen on</code>/<code>screen off</code> instead.
  </span>
</div>

**See also**: <a class="nav-link" href="https://gbdev.io/pandocs/LCDC.html" target="_blank">LCDC <i class="fa-solid fa-up-right-from-square"></i></a>.

## CGB Features

### VRAM Bank: 0xFF4F (VBK, CGB mode only)

This register can be written to change VRAM banks. Only bit 0 matters, all other bits are ignored.

### WRAM Bank: 0xFF70 (SVBK/WBK, CGB mode only)

In CGB Mode, 32KB of internal RAM are available. This memory is divided into 8 banks of 4KB each. Bank 0 is always available in memory at 0xC000-0xCFFF, banks 1-7 can be selected into the address space at 0xD000-0xDFFF.

<table>
  <thead>
    <tr>
      <th> </th>
      <th>7</th>
      <th>6</th>
      <th>5</th>
      <th>4</th>
      <th>3</th>
      <th>2</th>
      <th>1</th>
      <th>0</th>
    </tr>
  </thead>
  <tr>
    <td>SVBK</td>
    <th colspan="5"> </th>
    <th colspan="3">WRAM bank</th>
  </tr>
</table>

* WRAM bank (Read/write): writing a value will map the corresponding bank to 0xD000-0xDFFF, except 0, which maps bank 1 instead.

In GB BASIC, you do not need to switch RAM banks.

**See also**: <a class="nav-link" href="https://gbdev.io/pandocs/CGB_Registers.html" target="_blank">CGB Registers <i class="fa-solid fa-up-right-from-square"></i></a>.

## Extension RAM Area: 0xFFA0-0xFEFF

| Address | End    | Length (bytes) | Name   | Description                    | Notes                                               | Access     |
|---------|--------|----------------|--------|--------------------------------|-----------------------------------------------------|------------|
| 0xFEA0  | -      | 1              | `EXTF` | Extension status               | In extension mode                                   | Read-only  |
| 0xFEA1  | -      | 1              | `PLTF` | Platform flags                 | In extension mode                                   | Read-only  |
| 0xFEA2  | -      | 1              | `LOCF` | Localization flags             | Not documented. In extension mode                   | Read-only  |
| 0xFEA3  | -      | 1              | -      | Reserved                       |                                                     |            |
| 0xFEA4  | -      | 1              | `TCHX` | Touch x                        | In extension mode                                   | Read-only  |
| 0xFEA5  | -      | 1              | `TCHY` | Touch y                        | In extension mode                                   | Read-only  |
| 0xFEA6  | -      | 1              | `TCHF` | Touch pressed status           | In extension mode                                   | Read-only  |
| 0xFEA7  | -      | 1              | -      | Reserved                       |                                                     |            |
| 0xFEA8  | -      | 1              | `KEYM` | Key modifier flags             | In extension mode                                   | Read-only  |
| 0xFEA9  | -      | 1              | `KEYC` | First valid key code in buffer | In extension mode                                   | Read/write |
| 0xFEAA  | -      | 1              | -      | Reserved                       |                                                     |            |
| 0xFEAB  | -      | 1              | -      | Reserved                       |                                                     |            |
| 0xFEAC  | -      | 1              | `STMF` | Streaming status               | In extension mode                                   | Read/write |
| 0xFEAD  | -      | 1              | `STMB` | Streaming byte                 | In extension mode                                   | Read/write |
| 0xFEAE  | -      | 1              | -      | Reserved                       |                                                     |            |
| 0xFEAF  | -      | 1              | `TRSF` | Transfer status                | In extension mode                                   | Read/write |
| 0xFEB0  | 0xFEEF | 64             | `TRSC` | Transfer buffer                | In extension mode                                   | Read/write |
| 0xFEF0  | 0xFEFF | 16             | -      | Reserved                       | In extension mode, accessing behaviour is undefined |            |

## ROM Banking

### ROM Bank 00: 0x0000-0x3FFF (read-only)

This area normally contains the first 16KB (bank 00) of the cartridge ROM.

### ROM Bank 01-NN: 0x4000-0x7FFF (read-only)

This area may contain any of the further 16KB banks of the cartridge ROM.

In GB BASIC, you do not need to switch ROM banks, it is handled automatically.

**Seel also**: <a class="nav-link" href="https://gbdev.io/pandocs/MBCs.html" target="_blank">MBCs <i class="fa-solid fa-up-right-from-square"></i></a>.
