# Completing Game Logic

[Prev]() [Next]()

Finally, we will complete the game logic by adding collection counting and implementing NPC reactions based on different collection states.

## Coins Counting

In the previous `Scene1` routine, add a call to `CountItems` after loading the scene to initialize the coin count.

```basic-readonly
Scene1:
  ...
  ' Count total item count.
  gosub CountItems
  total_items = items
  ...
  end
```

We want the NPC to react differently based on how many coins we've collected. Add a call to `CountItems` in `OnHitsNpc` to get the current coin count.

```basic-readonly
OnHitsNpc:
  begin def
    ...
    lock
      ...
      gosub CountItems
      ...
    unlock
    end
  end def
```

## NPC Reactions

When the player hasn't collected all coins, the NPC shows the current collection progress. When all coins are collected, the NPC congratulates the player.

```basic-readonly
OnHitsNpc:
  begin def
    ...
    lock
      ...
      gosub CountItems
      if cleared then
        emote(0, -12, 192) with actor(obj0) = "Emote"
      end if
      gosub OpenDialog
      if not cleared then
        label "ChillBitmap", "Collect the coins, will ya."
        label "ChillBitmap", "Got: %d, ", (total_items - items);
        label "ChillBitmap", "Total: %d.", total_items
      else
        label "ChillBitmap", "Thank you! You've collected'em all."
      end if
      call wait_until_confirm
      gosub CloseDialog
    unlock
    end
  end def
```

## Complete Program for This Section

Try running the following code, moving the player around the scene, collecting all the coins, and talk to the NPC.

![edit, run, style="width: 640px;"](imgs/running-practical-item-collecting.png)
<!-- prg
!edit, run, title="The complete game", style=""
url://prgs/practical-item-collecting-6.txt
-->

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    Great job completing this tutorial chapter! Now it's your turn to create something amazing. Design your own game world, add more levels, create unique characters, and bring your imagination to life. Happy coding!
  </span>
</div>

In the following chapters, we will learn about more advanced and low-level topics, and provide practical application projects similar to this chapter.
