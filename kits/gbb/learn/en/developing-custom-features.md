# Developing Custom Features

[Prev]() [Next]()

## Source Code Structure

<div class="diagram-container-fade-bottom" style="max-height: 400px;">
  <img src="imgs/kernel-development-source-code-structure.png" class="diagram-image diagram-screenshot">

  <div class="small-note">Source code structure of the kernel</div>
</div>

### Core VM

In the source tree, `main.c` is the kernel entry point. It performs high-level kernel initialization and establishes the outermost VM loop.

The `vm.c`/`vm.h` files form the core of the kernel, implementing the foundational Virtual Machine. They handle VM initialization, memory management, thread scheduling, instruction execution, and library function calls. `vm.i` contains macro definitions for VM instructions, used for referencing them within the kernel source. `vm_instructions.c` registers all basic and advanced library functions to the kernel, enabling their invocation when the VM executes specific VM instructions.

### VM Modules

Additionally, other source and header files in the root directory prefixed with `vm_` implement various modules. For example, `vm_actor.c`/`vm_actor.h` implement the actor system, `vm_scene.c`/`vm_scene.h` implement the scene system, `vm_device.c`/`vm_device.h` implement device-related functions, and so on.

### Actor Controllers

The `ctrl` directory contains the actor controller dispatcher, navigation on scene tiles, and specific behaviour implementations.

### Utilities

The `utils` directory contains various utility modules reused by different parts of the VM.

### Drivers

The `drv` directory contains device drivers. Currently, it only holds the "hUGE" music driver at the moment; the SFX driver is provided by `utils/sfx_player.c`/`utils/sfx_player.h`.

### Inline Data

The `data` directory contains a bootstrap program composed of default program instructions, as well as built-in resource data such as sprites, fonts, music, sound effects, etc.

## Kernel Manifest Structure

A typical kernel manifest structure is as follows.

```json-readonly
{
  "id": "...",
  "title": {
    "english": "..."
  },
  "description": {
    "english": "..."
  },
  "url": "...",
  "kernel": {
    "rom": "*.gb",
    "symbols": "*.sym",
    "aliases": "*.aliases.json",
    "source_code": "*.zip"
  },
  "bootstrap": {
    "bank": 9
  },
  "memory": {
    "heap_size": "1024",
    "stack_size": "64"
  },
  "objects": {
    "max_actor_count": 21,
    "max_trigger_count": 31
  },
  "snippets": [
    {
      "type": "...",
      "content": [
        "...",
        "...",
        ""
      ],
      "name": {
        "english": "..."
      }
    },
    ...
  ],
  "animations": [
    {
      "type": "...",
      "names": [
        {
          "english": "Down"
        },
        {
          "english": "Right"
        },
        {
          "english": "Up"
        },
        {
          "english": "Left"
        },
        {
          "english": "Move Down"
        },
        {
          "english": "Move Right"
        },
        {
          "english": "Move Up"
        },
        {
          "english": "Move Left"
        }
      ]
    },
    ...
  ],
  "behaviours": [
    {
      "type": "...",
      "id": "...",
      "value": "0x??",
      "syntax": "...",
      "name": {
        "english": "..."
      },
      "animation": "..."
    },
    ...
  ],
  "properties": [
    {
      "value": "...",
      "syntax": "..."
    },
    ...
  ],
  "natives": [
    {
      "syntax": "..."
    },
    ...
  ]
}
```

Among these, `"id"`, `"title"`, and `"description"` are **required** fields, which configure the kernel's unique ID, title, and a short piece of text for tooltips, respectively. The `"id"` should be a short, readable word or phrase with clear meaning; `"title"` and `"description"` are text for the kernel's users to read.

`"url"` is an optional field that defines a relevant link for the kernel, such as its release page or source code repository.

`"kernel/rom"` and `"kernel/symbols"` are **required** fields, used to define the location (typically a filename with extension) of the kernel's precompiled ROM and symbol table file within the package. `"kernel/aliases"` and `"kernel/source_code"` are optional fields, used to define the location of the kernel's symbol aliases and source code package, respectively.

`"bootstrap/bank"` is a **required** field that defines the bank number for the bootstrap entry point within the precompiled ROM. This bank number is not fixed for all kernels, but its address is always 0x4000.

`"memory/heap_size"` and `"memory/stack_size"` are optional fields used to define the available heap size of the kernel VM and the stack size per thread.

`"objects"` is an optional field containing configuration for the maximum number of various objects.

`"snippets"` is an optional field containing code snippets intended for kernel users to reuse and insert into their own projects.

`"animations"` is an optional field that defines how different actor controllers in this kernel interpret the meaning of actor animations.

`"behaviours"` is an optional field that defines all configuration related to actor controllers in this kernel.

`"properties"` is an optional field containing the names and enumeration values for extended object properties in this kernel.

`"natives"` is an optional field containing the names of extended native functions in this kernel.

## Making Custom Features

### Making Custom Actor Controllers

To create your own actor controller, create the corresponding module in the `ctrl` directory and add its enumeration value and update entry to the `controller` module. You also need to add the corresponding configuration values to the manifest file before packaging.

To modify built-in controllers, edit the existing modules in the `ctrl` directory.

### Making Custom Object Properties

To create a new object property, add the property to the corresponding module, such as `vm_actor.c`/`vm_actor.h` or `vm_scene.c`/`vm_scene.h`, etc. You also need to add the corresponding configuration values to the manifest file before packaging.

To modify the implementation of an existing property, edit the property within its module.

### Making Custom Native Functions

The default kernel contains the following built-in native functions: `peek_banked`, `clear_text`, `wait_for`, `wait_until_confirm`, `send_sgb_packet`, `set_sgb_border`, `error`, `camera_shake`.

For example, a native function should follow the calling convention below.

```c-readonly
BOOLEAN foo(POINTER THIS, BOOLEAN start, UINT16 * stack_frame) OLDCALL BANKED { // INVOKABLE.
    // Get the context.
    SCRIPT_CTX * THIS_ = (SCRIPT_CTX *)THIS;
    // Pop the arguments from the stack.
    const UINT8 aaa    = (UINT8)*(THIS_->stack_ptr - 1);
    const UINT16 bbb   = (UINT16)*(THIS_->stack_ptr - 2);
    const BOOLEAN ccc  = (BOOLEAN)*(THIS_->stack_ptr - 3);

    // Do something.
    ...

    // The following line of code is optional, and is
    // used to push the return value onto the stack.
    // *(THIS_->stack_ptr++) = val;

    // Return `TRUE` for finished, otherwise `FALSE` for waiting.
    return TRUE;
}
```

To create a new native function, add your implementation. You also need to add the corresponding configuration values to the manifest file before packaging.

To modify the implementation of an existing native function, edit its function body.

<!-- gem -->
