## About

GameBuilder BASIC (GB BASIC) is a retro Fantasy Console that generates ROMs compatible with the popular handheld game console.

# About This Software

Hi, I'm Tony Wang.

Enlightened with BASIC, I started to write computer programs when I was a young boy. Almost at the same age, I got a GameBoy Pocket as my first handheld gaming console. I was quite into them both. I learned many other programming languages and owned quite a number of newer handheld and home consoles with age. Now I'm almost living by writing game programs, and could still have a lot of fun from these two of my hobbies.

I found that the simple and straightforward nature of BASIC and GameBoy becames more charming when the other modern technologies went complex and excessive. I've worked on a lot of game titles, game development tools and programming language projects both in office and home. Eventually, I managed to bring you GB BASIC, I hope you would enjoy.

## Why Fantasy Console?

Most of the technical specifications are referenced from real hardwares, however GB BASIC also implements a few <a href="/kits/gbb/extensions.html#kernel-extension">extension</a> features which are fictional. On the other hand, these features are totally implementable, so technically it is possible that we can see these features come true on hardware.

## Are Programming Skills Required?

Short answer: yes. Gameplay logic is organized by code, to be specific as the name implies, you will program in BASIC. But no worry, it is an easy to learn language, and you will find it fun to use in GB BASIC dispite you have experience in another programming language or not.

# License

## The Fantasy Console

The main development environment of GB BASIC, including components such as the compiler, asset pipeline, editors, etc. and the kernel (VM), is open-sourced under the MIT license.

```
MIT License

Copyright (C) 2023 - 2026 Tony Wang

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## Your Game

GB BASIC's license terms and copyright do not apply to the content you create with it; you are free to license your games how you see best fit, and will be their sole copyright owner(s). Though not required, including i.e. "Powered by GB BASIC" in your game project/ROM credits would be sincerely appreciated by the developer. (You are not required to show anything related to "GB BASIC" in your game)

Note however that the GB BASIC executable/binary that you would distribute with your game is a copy of the "Software" as defined in the license, and you are therefore required to include the copyright notice and license statement somewhere in your documentation.

Consider that a link to this page in your game documentation or credits would be an acceptable way to satisfy the license terms.

## Third-party Components

GB BASIC uses several third-party libraries and code snippets, which are distributed under their own license and copyright statements. You can refer to the "Credits" section below for a brief overview of all third-party components used in GB BASIC and their respective licenses.

## The Starter Kits and Examples

Unless otherwise specified, all starter kits and examples are released as public domain.

## Disclaimer

The above explanations of GB BASIC's license terms and their implications for its users do not constitute legal advice. They reflect the GB BASIC team's understanding of their own license terms and that of their third-party components; in case of doubt, please refer to your lawyer.

## Licenses in Plain Text

* [Licenses](/kits/gbb/licenses/Licenses.txt)

# Credits

## Libs

### Application Libs

* SDL - from [libsdl-org/SDL](https://github.com/libsdl-org/SDL)
* ImGui - from [ocornut/imgui](https://github.com/ocornut/imgui)
* binjgb - from [binji/binjgb](https://github.com/binji/binjgb)
* RapidJSON - from [Tencent/rapidjson](https://github.com/Tencent/rapidjson)
* LZ4 - from [lz4/lz4](https://github.com/lz4/lz4)
* zlib - from [zlib.net](https://zlib.net/)

### Kernel (VM) Toolchains

* GBDK-2020 - from [gbdk-2020/gbdk-2020](https://github.com/gbdk-2020/gbdk-2020)
* gbvm - from [untoxa/gbvm](https://github.com/untoxa/gbvm) and [chrismaltby/gbvm](https://github.com/chrismaltby/gbvm)
* hUGEDriver - from [SuperDisk/hUGEDriver](https://github.com/SuperDisk/hUGEDriver)
* VGM2GBSFX - from [untoxa/VGM2GBSFX](https://github.com/untoxa/VGM2GBSFX)

### Other Libs

* AudioFile - from [adamstark/AudioFile](https://github.com/adamstark/AudioFile)
* b64.c - from [jwerle/b64.c](https://github.com/jwerle/b64.c)
* BigInt - from [faheel/BigInt](https://github.com/faheel/BigInt)
* CivetWeb - from [civetweb/civetweb](https://github.com/civetweb/civetweb)
* clip - from [dacap/clip](https://github.com/dacap/clip)
* Dirent - from [tronkko/dirent](https://github.com/tronkko/dirent)
* ImGuiCodeEditor - from [paladin-t/sdl_code_edit](https://github.com/paladin-t/sdl_code_edit)
* ImGuiSDL - from [gbbasic/imgui_sdl](https://github.com/gbbasic/imgui_sdl)
* jo_gif - by [Jon Olick](https://www.jonolick.com/home/gif-writer)
* Jpath - from [paladin-t/jpath](https://github.com/paladin-t/jpath)
* MD4C - from [mity/md4c](http://github.com/mity/md4c)
* mpc - from [orangeduck/mpc](https://github.com/orangeduck/mpc)
* Portable File Dialogs - from [samhocevar/portable-file-dialogs](https://github.com/samhocevar/portable-file-dialogs)
* promise-cpp - from [xhawk18/promise-cpp](https://github.com/xhawk18/promise-cpp)
* RapidFuzz - from [rapidfuzz/rapidfuzz-cpp](https://github.com/rapidfuzz/rapidfuzz-cpp)
* stb - from [nothings/stb](https://github.com/nothings/stb)

## Fonts

* LanaPixel - by [eishiya](/kits/gbb/licenses/LanaPixel_License.txt)
* NotoSans - by [Adobe](/kits/gbb/licenses/NotoSans_License.txt)
* SourceHanSans - by [Adobe](/kits/gbb/licenses/SourceHanSans_License.txt)

## Sounds

* Unreal Superhero - from [untoxa](/kits/gbb/licenses/UnrealSuperhero_License.txt)
* 8-Bit Gameboy Songs DX - by [TipTopTomCat](/kits/gbb/licenses/8BitGameboySongsDX_License.txt)
* Sweet Sounds SFX - by [Coffee 'Valen' Bat](/kits/gbb/licenses/SweetSounds_SFX_License.txt)

## Examples

* Mandelbrot - ported from [Retro Basic Benchmarking with Mandelbrot](https://projects.drogon.net/retro-basic-benchmarking-with-mandelbrot/)
