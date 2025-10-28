# Using Graphical Resources

[Prev]() [Next]()

In this section, we'll incorporate the graphical resources we created in the previous section into our game and use the corresponding graphical statements to draw them for the main game flow.

```basic
' Keep the rest of the code unchanged.

Setup:
  option SCREEN_MODE, OBJECTS_MODE  ' Use the objects mode, which supports graphics maps, sprites, scenes, actors, etc.
  map on                            ' Enable the map layer.
  fill tile(0, 3) = read            ' Fill the tiles for map with the inline data sequence. Is equivalent to: `fill map(0, 3) = read`.
  def map(0, 0, 20, 18) = read      ' Define the map with the inline data sequence.
  map 0, 0                          ' Put the map to 0, 0.
  sprite on                         ' Enable the sprite layer.
  let x = 85
  let y = 87
  fill sprite(0, 1) = read          ' Fill the tiles for sprite with the inline data sequence.
  def sprite(0) = 0                 ' Define the sprite with the first sprite tile.
  gosub DrawPlayer
  ' Keep the rest of the code unchanged.
  return

' Omitted `OnLeft`, `OnRight`, `OnUp`, and `OnDown` since they have not been much changed.

DrawPlayer:
  sprite 0, x, y                    ' Draw the sprite at the specified position.
  let tx = (x - 4) / 8
  let ty = (y - 12) / 8
  let t = get map(tx, ty)           ' Get the map tile index at the specified position (from VRAM).
  if t = 2 then                     ' If it is a cherry.
    set map(tx, ty) = 0             ' Eat the cherry by setting to 0, which was defined as the empty tile by us.
  end if
  return

' The inline data sequences are omitted.
```
<!-- prg
!edit, run, title="Using graphical resources", style=""
auto update on
join start Title
goto Game
end

Title:
  let started = false

  begin do
    option SCREEN_MODE, TEXT_MODE
    locate 2, 5
    print "Minimal Program"
    on btnd(START_BTN) start OnStart

    Blink:
      locate 4, 16
      print "Press Start";
      wait 30
      locate 4, 16
      print "           ";
      wait 30
      if started then
        started = false
        off btnd(START_BTN)
        end
      end if
      goto Blink
      end

    OnStart:
      started = true
      end
  end do

Game:
  begin do
    cls
    gosub Setup
    end

    Setup:
      option SCREEN_MODE, OBJECTS_MODE  ' Use the objects mode, which supports graphics maps, sprites, scenes, actors, etc.
      map on                            ' Enable the map layer.
      fill tile(0, 3) = read            ' Fill the tiles for map with the inline data sequence. Is equivalent to: `fill map(0, 3) = read`.
      def map(0, 0, 20, 18) = read      ' Define the map with the inline data sequence.
      map 0, 0                          ' Put the map to 0, 0.
      sprite on                         ' Enable the sprite layer.
      let x = 85
      let y = 87
      fill sprite(0, 1) = read          ' Fill the tiles for sprite with the inline data sequence.
      def sprite(0) = 0                 ' Define the sprite with the first sprite tile.
      gosub DrawPlayer
      on btn(LEFT_BTN) start OnLeft
      on btn(RIGHT_BTN) start OnRight
      on btn(UP_BTN) start OnUp
      on btn(DOWN_BTN) start OnDown
      return

    OnLeft:
      if x = 16 then end
      dec x
      gosub DrawPlayer
      end
    OnRight:
      if x = 152 then end
      inc x
      gosub DrawPlayer
      end
    OnUp:
      if y = 24 then end
      dec y
      gosub DrawPlayer
      end
    OnDown:
      if y = 144 then end
      inc y
      gosub DrawPlayer
      end

    DrawPlayer:
      sprite 0, x, y                    ' Draw the sprite at the specified position.
      let tx = (x - 4) / 8
      let ty = (y - 12) / 8
      let t = get map(tx, ty)           ' Get the map tile index at the specified position (from VRAM).
      if t = 2 then                     ' If it is a cherry.
        set map(tx, ty) = 0             ' Eat the cherry by setting to 0, which was defined as the empty tile by us.
      end if
      return
  end do

' Tile data, including 3 tiles.
data 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ' Empty.
data 0xff, 0x01, 0x81, 0x7f, 0xbd, 0x7f, 0xa5, 0x7b, 0xa5, 0x7b, 0xbd, 0x63, 0x81, 0x7f, 0xff, 0xff ' Wall.
data 0x04, 0x04, 0x04, 0x04, 0x0a, 0x0a, 0x12, 0x12, 0x66, 0x00, 0x99, 0x77, 0x99, 0x77, 0x66, 0x66 ' Cherry.

' Map data, indexing the above tiles.
data 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1
data 1, 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 2, 2, 0, 0, 1
data 1, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1
data 1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 1
data 1, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 1
data 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
data 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

' Sprite data, including 1 tile.
data 0x5a, 0x3c, 0xe3, 0x42, 0x7c, 0x99, 0xeb, 0xa5, 0xfb, 0xa5, 0x66, 0x99, 0xe7, 0x42, 0x5a, 0x3c
-->

In the upcoming chapters, we will introduce how to use resources created from the editors, as well as some more advanced features to enable more efficient game development.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="page-not-found.html" class="nav-link">Tiles</a>, <a href="page-not-found.html" class="nav-link">Map</a>, and <a href="page-not-found.html" class="nav-link">Sprite</a>.
  </span>
</div>

In the following chapters, we will learn about more advanced objects and provide practical application projects, similar to this chapter.
