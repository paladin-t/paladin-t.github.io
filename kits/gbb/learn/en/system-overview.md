# System Overview

[Prev]() [Next]()

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    The previous two chapters covered topics related to basic syntax, data types, and memory stack. Before continuing with the software programming aspects of GB BASIC, this chapter will first provide an overview of the hardware and operating system. You can skip this chapter for now and refer back to it when you encounter system-related knowledge needed in subsequent learning. However, it is recommended to take some time to read the sections on <a href="memory-map.html" class="nav-link">Memory Map</a>, <a href="the-os-kernel.html" class="nav-link">The OS Kernel</a>, and <a href="video-module.html" class="nav-link">Video Module</a>.
  </span>
</div>

We are using BASIC, a high-level programming language, for game development. Therefore, most of the time we think at the software level without needing to concern ourselves with underlying hardware details such as registers, memory addresses, and ROM banking. However, when using GB BASIC, a Fantasy Console, we must always keep in mind that we are targeting a system with limited capabilities, where the computing resources and RAM available to us are very constrained. Thus, a basic understanding of its hardware and operating system is greatly beneficial for writing efficient programs.

This chapter will provide necessary information to help you understand the hardware and operating system of the console.

## Hardware Components

A GB BASIC console is consist of hardware components as follows.

* Core
  * CPU
  * RAM
  * VRAM
* Video and audio
  * PPU
  * Screen
  * Audio output
* Input
  * Gamepad
  * Mouse and touch screen (optional)
  * Keyboard (optional)
* I/O ports
  * Cartridge slot
  * Serial port
  * Infrared (optional)
* Cartridge
  * ROM
  * SRAM (optional)
  * RTC (optional)
* Power supply
  * Power switch
  * Battery (optional)
  * Power port

The cartridge is a separate, replaceable component, which roughly corresponds to the final target file we export (strictly speaking, it only equates to the ROM part). The remaining components form the main body of the console, which is provided in the form of an emulator for the GB BASIC application. Some of the components, such as mouse, touch screen, and keyboard are not available for the original Game Boy models, but dedicated to the fantasy console only.

## Hardware Models

Different hardware models support different technical specifications, as detailed below.

<table>
  <thead>
    <tr>
      <th colspan="2">Components</th>
      <th>DMG</th>
      <th>CGB</th>
      <th>GBB (grayscale)</th>
      <th>GBB (colored)</th>
    </tr>
  </thead>
  <tr>
    <td rowspan="11">Console</td>
    <td>CPU</td>
    <td>4.19MHz</td>
    <td>8.38MHz</td>
    <td>4.19MHz</td>
    <td>8.38MHz</td>
  </tr>
  <tr>
    <td>RAM</td>
    <td>4KB + 4KB</td>
    <td>4KB + 4KB x 7 (banked)</td>
    <td>4KB + 4KB</td>
    <td>4KB + 4KB x 7 (banked)</td>
  </tr>
  <tr>
    <td>VRAM</td>
    <td>8KB</td>
    <td>8KB x 2 (banked)</td>
    <td>8KB</td>
    <td>8KB x 2 (banked)</td>
  </tr>
  <tr>
    <td>Screen</td>
    <td>160x144</td>
    <td>160x144</td>
    <td>160x144</td>
    <td>160x144</td>
  </tr>
  <tr>
    <td>Audio output</td>
    <td>4 channels</td>
    <td>4 channels</td>
    <td>4 channels</td>
    <td>4 channels</td>
  </tr>
  <tr>
    <td>Gamepad</td>
    <td>8 buttons</td>
    <td>8 buttons</td>
    <td>8 buttons</td>
    <td>8 buttons</td>
  </tr>
  <tr>
    <td>Pointing device</td>
    <td>-</td>
    <td>-</td>
    <td>Supported</td>
    <td>Supported</td>
  </tr>
  <tr>
    <td>Keyboard</td>
    <td>-</td>
    <td>-</td>
    <td>Supported</td>
    <td>Supported</td>
  </tr>
  <tr>
    <td>Serial port</td>
    <td>Supported</td>
    <td>Supported</td>
    <td>Supported</td>
    <td>Supported</td>
  </tr>
  <tr>
    <td>Infrared</td>
    <td>-</td>
    <td>Supported</td>
    <td>-</td>
    <td>TBD</td>
  </tr>
  <tr>
    <td>Cartridge slot</td>
    <td>1 slot</td>
    <td>1 slot</td>
    <td>1 slot</td>
    <td>1 slot</td>
  </tr>
  <tr>
    <td rowspan="2">Cartridge</td>
    <td>SRAM</td>
    <td>Supported</td>
    <td>Supported</td>
    <td>Supported</td>
    <td>Supported</td>
  </tr>
  <tr>
    <td>RTC</td>
    <td>Supported</td>
    <td>Supported</td>
    <td>Supported</td>
    <td>Supported</td>
  </tr>
</table>

## The System Stack

The games we write are compiled into user-mode programs that run on the kernel (which in this tutorial series can also be referred to as the operating system or virtual machine), and the kernel runs on its compatible real or virtual devices. The entire system stack is shown in the figure below.

<img src="imgs/system-system-stack.png" class="diagram-image diagram-schematic">
