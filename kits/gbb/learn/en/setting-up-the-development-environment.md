# Setting Up the Development Environment

[Prev]() [Next]()

## Obtaining the Compilation Toolchain

Kernel development and compilation depend on the GBDK toolchain. Corresponding to the methods of obtaining the kernel source code, there are two ways to acquire the complete kernel development toolchain:

1. Use the toolchain from the source environment package ejected by the desktop environments
2. Visit <a class="nav-link" href="https://github.com/paladin-t/gbb/releases" target="_blank">GB BASIC Releases - GitHub <i class="fa-solid fa-up-right-from-square"></i></a> and download the source code that includes the toolchain for the relevant release version

## Setting Up the Compilation Toolchain

The `gbdk` directory contains the toolchain binaries for Windows, Linux, and MacOS platforms. `build.cmd`/`build.sh`, or `gbbvm.cmd`/`gbbvm.sh` are the shell scripts used to compile the kernel source code. To minimize dependencies for kernel compilation as much as possible, the default build script directly calls the GBDK compiler and linker, rather than using build systems like `make` or `cmake`. Of course, you can organize your own compilation toolchain according to your habits and needs.

In the subsequent sections of this chapter, we will use the kernel source package obtained in the form of an ejected VM as an example.

<img src="imgs/kernel-development-ejected-vm.png" class="diagram-image diagram-screenshot">

<div class="small-note">GBDK and source code in the ejected VM package</div>

The `src` directory contains the complete source code for the default kernel; `gbdk` contains the binary files for compiling the kernel; and `build.cmd`/`build.sh` are the default compilation scripts. After extraction, you can directly execute `build.cmd`/`build.sh` to build your first self-compiled kernel ROM. You can also use your preferred code editor, such as VS Code, to open this workspace and correctly configure the compilation script to the editor's action or shortcut.

During compilation, we define the following macros to specify the VM's heap size, stack size, and total number of threads:

```c-readonly
#define VM_TOTAL_CONTEXT_STACK_SIZE 1024
#define VM_MAX_CONTEXTS             16
#define VM_HEAP_SIZE                1024
```

For other compilation and linking parameters, please refer to the configuration in the default build scripts.

## Compiling the Kernel Source Code

Compile the source code using the GBDK provided in the kernel package. Some output files will be generated in the workspace's root directory. Among them, `gbbvm.gb` and `gbbvm.sym` are the target files we need later. The former is the kernel ROM, and the latter is the symbol table for the corresponding version.

<img src="imgs/kernel-development-compiled-result.png" class="diagram-image diagram-screenshot">

<div class="small-note">Compiled output</div>

In the next section, we will explain the structure and principles of the source code, as well as how to modify or add new features.
