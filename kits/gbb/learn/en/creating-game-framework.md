# Creating Game Framework

[Prev]() [Next]()

Next, we will add the title screen, loading of the main scene, establish the game loop, and integrate these logics.

## Essential Workflow

The first task in this program is to turn on the auto update mode. Then displays the Logo screen, waits for its thread to finish, jumps to the Title screen, and hands over control to that screen.

```basic-readonly
auto update on  ' Turn on the auto update mode.
join start Logo ' Show the logo and wait until it fades out.
goto Title      ' Goto the title.
end
```

## Logo Screen

The Logo screen displays the game's icon in a thread. This process first fades in, then waits for a period, finally fades out and ends the thread. Some detailed code is omitted below.

```basic-readonly
Logo:
  ' Set all palette to transparent.
  palette MAP_LAYER, 0b00000000
    palette MAP_LAYER, 0, 0, "BG0:0"
    palette MAP_LAYER, 0, 1, "BG0:0"
    palette MAP_LAYER, 0, 2, "BG0:0"
    palette MAP_LAYER, 0, 3, "BG0:0"

  ' Show the logo.
  map on

  fill tile(1, 16) = "IconTiles"
  def map(      _
    8, 7, 4, 4, _   ' X, y, width, height.
    1,          _   ' Base tile.
    4,          _   ' Pitch.
    -36         _   ' -(x + y * pitch) = -(8 + 7 * 4);
                _   ' with this offset, we can put the source map starts from 0,0
                _   ' to the destination area starts from 8,7.
                _   ' The later usage will omit the `pitch` and `offset` parameters,
                _   ' allowing the compiler and VM to automatically determine their values.
  ) = "IconIndices" ' The following lines show another approach.

  fill tile(17, 10) = "PoweredBy"
  def map(        _
    5, 16, 10, 1, _      ' X, y, width, height.
    17            _      ' Base tile.
  ) = "PoweredByIndices" ' The following lines show another approach.

  wait 20

  ' Fade in.
  palette MAP_LAYER, 0b01000000
    palette MAP_LAYER, 0, 0, "BG0:0"
    palette MAP_LAYER, 0, 1, "BG0:0"
    palette MAP_LAYER, 0, 2, "BG0:0"
    palette MAP_LAYER, 0, 3, "BG0:1"
  wait 20
  ...

  ' Wait.
  ...

  ' Fade out.
  ...

  ' Clear data in the VRAM.
  ...

  ' Reset all palette.
  palette MAP_LAYER, 0b11100100
    palette MAP_LAYER, 0, 0, "BG0:0"
    palette MAP_LAYER, 0, 1, "BG0:1"
    palette MAP_LAYER, 0, 2, "BG0:2"
    palette MAP_LAYER, 0, 3, "BG0:3"

  ' Finish.
  end
```

The logo can be simply specified in the project property dialog.

## Title Screen

This screen displays the game title and waits for the player to press Start or A key. Then it jumps to the main scene initialization process and hands control to the main scene.

```basic-readonly
Title:
  ' Show the logo.
  map on
  image(1, 32, -64, MAP_LAYER) = with map "Title"
  for y = -64 to 20
    map 32, y
    wait 1
  next

  ' Blink the "START" text until user interaction.
  fill tile(129, 4) = "Start" ' Fill the tiles start from tile 129.
  i = start BlinkStart        ' Start the blink thread.
  call wait_until_confirm     ' Wait until user confirmed.
  kill i                      ' Kill the blink thread.
  def map(       _            ' Clear the "START" text.
    4, 12, 4, 1, _
    0            _
  ) = data 0, 0, 0, 0

  ' Setup the game.
  gosub SetupGame

  ' Switch to the main scene.
  gosub GotoScene1

  ' Finish.
  end

BlinkStart:
  ' Blink the "START" text and loop.
  while true
    def map(       _
      4, 12, 4, 1, _
      129          _    ' Tile indices start from 129.
    ) = data 0, 1, 2, 3 ' Set the tiles' indices.
    wait 20
    def map(       _
      4, 12, 4, 1, _
      0            _    ' Tile indices start from 0.
    ) = data 0, 0, 0, 0 ' Clear the tiles' indices.
    wait 20
  end while
  ' No `end` needed.

GotoScene1:
  ' Goto scene 1.
  gosub FadeOut
  goto Scene1
```

## Common Routines

Before introducing the main scene, it's necessary to understand some common subroutines, such as game initialization, fade in/out, scene reset, etc.

```basic-readonly
SetupGame:
  ' Declare the constants.
  def DOWN_IDLE  = 0                          ' Idle animations.
  def RIGHT_IDLE = 1
  def UP_IDLE    = 2
  def LEFT_IDLE  = 3
  def DOWN_WALK  = 4                          ' Walk animations.
  def RIGHT_WALK = 5
  def UP_WALK    = 6
  def LEFT_WALK  = 7
  def TO_IDLE    = 16                         ' Turn to idle without changing direction.
  def START_DIR  = 0                          ' The start value of directions, and
  def END_DIR    = 3                          ' the end value of directions, they are used
                                              ' to determine the range of values of directions.

  option ACTOR_HIT_WITH_DETAILS_ENABLED, true ' Turn on this feature to distinguish hit directions.

  return

FadeIn:
  ' Fade in.
  gosub Fade1
  wait 2
  gosub Fade2
  wait 2
  gosub Fade3
  return

FadeOut:
  ' Fade out.
  gosub Fade2
  wait 2
  gosub Fade1
  wait 2
  gosub Fade0
  return

FadeGrades:
  ' The four fade grades for map and sprite layers.
  Fade0:
    palette MAP_LAYER, 0b00000000
      palette MAP_LAYER, 0, 0, "BG0:0"
      palette MAP_LAYER, 0, 1, "BG0:0"
      palette MAP_LAYER, 0, 2, "BG0:0"
      palette MAP_LAYER, 0, 3, "BG0:0"
      ...
    palette SPRITE_LAYER, 0b00000000
      palette SPRITE_LAYER, 0, 0, "OBJ0:0"
      palette SPRITE_LAYER, 0, 1, "OBJ0:0"
      palette SPRITE_LAYER, 0, 2, "OBJ0:0"
      palette SPRITE_LAYER, 0, 3, "OBJ0:0"
      ...
    return
  Fade1:
    ...
  Fade2:
    ...
  Fade3:
    ...

ResetScene:
  ' Reset game scene.
  kill                      ' Kill the other threads.
  memset(0x8000, 0, 0x2000) ' Reset the VRAM.
  option VRAM_BANK, VRAM_BANK1
  memset(0x8000, 0, 0x2000)
  option VRAM_BANK, VRAM_BANK0
  load scene() = nothing    ' Clear the scene and objects.
  restore                   ' Reset the data sequence cursor.
  randomize                 ' Initialize the random seed.
  return
```

## Game Logic

The main scene currently doesn't have much logic; it just resets the scene, loads the scene, and fades in for display.

```basic-readonly
Scene1:
  ' Reset.
  gosub ResetScene

  ' Load the scene.
  load scene(0, 0) = #0

  ' Fade in.
  gosub FadeIn

  end
```

## Complete Program for This Section

Try running the complete program below as a reference for this section.

```basic
auto update on  ' Turn on the auto update mode.
join start Logo ' Show the logo and wait until it fades out.
goto Title      ' Goto the title.
end
```
<!-- prg
!edit, run, title="Basic game framework", style=""
url://prgs/practical-item-collecting-2.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="game-loop.html" class="nav-link">Game Loop</a>.
  </span>
</div>
