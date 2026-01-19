# I/O Features

[Prev]() [Next]()

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    This chapter covers information about I/O (input/output) features. If you wish to add features such as game saving, using a real-time clock, or serial communication to your game, please read the corresponding sections in this chapter. You may also skip this chapter and return to it when needed.
  </span>
</div>

Technically, user input, screen display, and audio output all fall under the broad category of I/O. However, in game development, these are typically considered part of the core interaction layer and are covered in dedicated chapters. This chapter focuses on non-core, peripheral I/O.

In the following sections, we will learn about SRAM persistence, RTC, and serial communication. Using these I/O features in GB BASIC does not require understanding the underlying hardware principles; only a brief introduction is provided here. SRAM is typically a memory chip soldered onto the game cartridge, often with a battery for data retention; RTC is also a dedicated module chip on the cartridge with a battery also to keep the clock running; the serial port hardware is built into the Game Boy console itself. If you need to use SRAM or RTC features, you must set the correct options in your game project properties. If the final ROM will be used on a physical cartridge, ensure the cartridge supports the corresponding hardware features. Serial communication requires no special software settings, but for hardware debugging or use, please prepare two devices and a suitable connecting cable.

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    Some more modern game cartridge storage solutions may use chips such as FRAM (which does not require a battery) instead of the SRAM+battery approach. For the sake of simplicity, we will still refer to them collectively as SRAM.
  </span>
</div>

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="system-overview.html" class="nav-link">System Overview</a>.
  </span>
</div>
