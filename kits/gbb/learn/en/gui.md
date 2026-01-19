# GUI

[Prev]() [Next]()

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    This chapter introduces the GUI (Graphical User Interface) components in GB BASIC, including <code>label</code>, <code>progressbar</code>, and <code>menu</code>, along with some application examples. Users interested in utilizing GUI features are advised not to skip this chapter. Additionally, the next chapter is closely related and is recommended to be read together.
  </span>
</div>

GB BASIC supports three GUI widgets: [label](label-and-dialog.html), [progress bar](progress-bar.html), and [menu](menu.html). The following sections will provide a detailed explanation. This section gives some overall information.

GUI programming in GB BASIC uses a declarative command paradigm. For instance, a single command is used to define the currently active widget type, its VRAM location and size, parameters, and so on. A specific fill/refresh command statement then draws this widget. Like other declarative statements in GB BASIC, these commands only need to be executed once, not every frame, to keep the widget state resident in memory and video memory. Typically, one `def` statement can be followed by one or more widget fill statements in terms of time sequence, which update the widget one or more times, until this widget is no longer the object that needs processing in the game logic.

All GUI widgets share a same subset of rumtime states, so consider manipulating only one widget at a time, or redefining before putting/drawing across multiple threads or mixed invokings.

The following statement is a general command used to clear the context of the currently active widget. This statement does not clear the widget's data in memory and video memory itself, but only resets the GUI state to the initial "not manipulating any widget" state.

* `def widget() = nothing`: undefines widget; this only resets the previous widget states, but does not resets graphics elements and VRAM

## Cheat Sheet of GUI Widgets

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

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    Some GUI widgets, such as <code>label</code> and <code>menu</code>, are closely related to font and text. Therefore, it is <strong>strongly recommended to read</strong> this chapter together with the next one - <a href="fonts-and-unicode.html" class="nav-link">Fonts and Unicode</a>.
  </span>
</div>
