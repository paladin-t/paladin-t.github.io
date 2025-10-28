# The CPU

[Prev]() [Next]()

The Game Boy's CPU is a custom 8-bit chip called the Sharp LR35902 (or SM83). The chip is very similar to the much more popular Zilog Z80 and the Intel 8080. It runs at 4.19MHz or 8.38MHz for DMG and CGB models respectively.

<!-- SM83 assembly is currently not supported directly in the program; future versions may add support. -->

<!-- **See also**: <a class="nav-link" href="https://www.pastraiser.com/cpu/gameboy/gameboy_opcodes.html" target="_blank">Game Boy CPU (LR35902) Instruction Set <i class="fa-solid fa-up-right-from-square"></i></a>. -->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    Due to limited hardware computational resources, games written in GB BASIC often follow a programming philosophy of "achieving satisfactory results using only simple operations". For example, a developer can make an actor move on the screen simply by applying a controller for it, without needing to write complex interaction and collision detection code. However, as a developer, you can still use any combination of APIs to create your game. This means that programming and game design work need to be coordinated and considered closely so that the gameplay highlights the core fun, and the code can cleverly achieve these designs.
  </span>
</div>
