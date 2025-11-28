# GUI

[Prev]() [Next]()

GB BASIC supports three GUI widgets: [label](#label-widget), [progress bar](#progressbar-widget), and [menu](#menu-widget). The following sections will provide a detailed explanation. This sections gives some overall information.

* `def widget() = nothing`: undefines widget; this only resets the widget states, but does not resets graphics elements and VRAM

All GUI widgets share a same subset of rumtime states, so consider manipulating only one widget at a time, or redefining before putting/drawing across multiple threads or mixed invokings.

// TODO

## Widgets

| Widget types                 | Label                    | ProgressBar                  | Menu                     |
|------------------------------|--------------------------|------------------------------|--------------------------|
| Supported layers             | Map/window               | Map/window                   | Map/window               |
| Defining                     | `def label(...) = ...`   | `def progressbar(...) = ...` | `def menu(...) = ...`    |
| Undefining                   | `def widget() = nothing` | `def widget() = nothing`     | `def widget() = nothing` |
| Filling                      | `label ...`              | `progressbar ...`            | `menu ...`               |
| Clearing                     | -                        | -                            | `menu nothing`           |
| Support button interaction   | Yes                      | -                            | Yes                      |
| Support touch interaction    | Yes                      | -                            | Yes                      |
| Registering event callback   | -                        | -                            | `on menu() start ...`    |
| Unregistering event callback | -                        | -                            | `off menu()`             |

**See also:** _[Cheat Sheet of GUI Widgets](https://paladin-t.github.io/kits/gbb/manual.html#cheat-sheet-of-gui-widgets)._

// TODO

## Font Production

The font editor can produce and configure assets for `label`, and `menu`'s text drawing, press **Ctrl+6/Cmd+6** in edit mode 

| Font types   | Supported characters   | Variable width |
|--------------|------------------------|----------------|
| TTF          | UTF-8                  | Yes            |
| Bitmap-based | Extended ASCII (0-255) | No             |

// TODO

## Text Measurement

* `=width #pg|"{name}", txt`: measures the width of the specified text in pixels
  * objectives:
    * `#pg`: font page index
    * `name`: font asset name
  * `txt`: the text to measure; an escape with placeholder, stack, carriage return, new line or new page is not supported
  * returns the width in pixels
* `=height #pg|"{name}", txt`: measures the height of the specified text in pixels
  * objectives:
    * `#pg`: font page index
    * `name`: font asset name
  * `txt`: the text to measure; an escape with placeholder, stack, carriage return, new line or new page is not supported
  * returns the height in pixels

These functions are useful for determining the dimensions of text before drawing it on the screen, allowing for precise placement and alignment of GUI elements.

// TODO
