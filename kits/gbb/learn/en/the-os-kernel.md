# The OS Kernel

[Prev]() [Next]()

Our game is ultimately compiled into a User Program and runs on top of a layer of software abstraction. This runtime layer is commonly referred to as the "kernel", and its responsibilities are almost identical to those of a Virtual Machine or an embedded Real-Time Operating System (RTOS). In this section, we will examine this layer from the perspective of an OS.

The kernels came along with binary distributions are precompiled from their C/Assembly source code. The GB BASIC compiler compiles BASIC code into GBBVM instructions, which are then linked with these precompiled kernels to form final ROMs. Further more, it is also possible to modify and precompile your own kernel to replace the default one, or to install and use kernels modified by others, allowing for customization or addition of features beyond the default feature set.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="compiler-and-kernel.html" class="nav-link">Compiler and Kernel</a>, and <a href="creating-a-custom-kernel.html" class="nav-link">Creating a Custom Kernel</a>.
  </span>
</div>

## The OS Architecture

From the perspective of an RTOS, this operating system layer can be divided into the following modules.

<img src="imgs/gbbvm-os-kernel-components.png" class="diagram-image diagram-schematic">

* **Execution engine**: Runs GBBVM instructions
* **Memory management**: Responsible for memory access, stack operations, general direct memory access, and game object allocation and release
* **Thread scheduling**: Handles thread creation, execution, termination, and other operations
* **Hardware drivers**: Interfaces with I/O operations such as VRAM, audio devices, and user input
* **Game components**: Encapsulates advanced features related to resource management and gameplay
* **System calls**: Executes calls from user programs to game components and core functions, as well as managing related callbacks

## The Instruction Set

GBBVM (GameBuilder BASIC Virtual Machine) is the core execution engine of GB BASIC, and its instruction set design reflects a sophisticated bridge between high-level language and underlying hardware. From a high-level language perspective, the relationship between GBBVM assembly and BASIC can be summarized as follows.

### Semantic Mapping: Conversion of High-Level Structures to Instruction Sequences

<details open>
<summary><b>Details</b></summary>
<div class="details-text">
The high-level language structures of GB BASIC are decomposed step-by-step by the compiler into GBBVM instructions, forming a clear semantic mapping. For example:

* Control flow structures
  * `if/then/else` → `VM_IF_CONST` (conditional comparison) + `VM_JUMP` (jump)
  * `for/to/next` → `VM_FOR` + `VM_LOOP` or `VM_FOR` + `VM_ACC` + `VM_JUMP`
  * `gosub`/`return` → `VM_CALL_FAR` + `VM_RET_FAR`
* Expression evaluation
  * `a + b * c` → `VM_RPN` (Reverse Polish Notation evaluation), implementing operator precedence through stack operations
* Variable operations
  * `let x = 42` → `VM_SET_TLOCAL` (constant assignment) + other instructions
  * `inc x` → `VM_ACC_CONST` + `SET_TLOCAL`
</div>
</details>

The GBBVM instruction set is essentially a linearized representation mapped from BASIC syntax, where each high-level structure corresponds to a deterministic pattern of instruction sequences, ensuring predictable compilation results.

### Instruction-Level Optimization: Optimization and Reordering of Instruction Sequences

<details open>
<summary><b>Details</b></summary>
<div class="details-text">
Some writing styles in high-level languages are optimized by the compiler into more efficient equivalent instruction sequences. For example:

* Array index calculations with dimension 1 are simplified
* Simple expression calculations are optimized at compile time
* Multiplication and division by integer multiples of 2 is optimized into shift operations
* `for` loops with constant conditions and steps use more efficient instructions
* Optimizable parameter evaluations are simplified to constants or some stack operations are omitted
* Return values of function calls without left-hand values are ignored
</div>
</details>

The GB BASIC compiler is designed to strike a balance between runtime efficiency of the final instructions, the size of the compiled output, and developer productivity.

### Stack-Based Architecture: Underlying Support for High-Level Abstraction

<details open>
<summary><b>Details</b></summary>
<div class="details-text">
GBBVM adopts a stack-based execution model, naturally suited to the characteristics of high-level languages. For example:

* Expression evaluation
  * Compiled into RPN expressions consisting of instructions like `VM_PUSH`, `VM_RPN`, `R_OPERATOR`, `R_STOP`
* Function calls
  * Parameters are pushed onto the thread's local stack space
  * Return addresses for calls (e.g., `VM_CALL_FAR`) are saved via the stack
  * User-defined local variables are allocated on the stack via `VM_RESERVE`
</div>
</details>

The stack architecture allows GBBVM to transparently handle complex operations (like nested function calls and recursion) without requiring developers to manage registers or memory addresses.

### Memory Management: Abstraction from Variables to Addresses

<details open>
<summary><b>Details</b></summary>
<div class="details-text">
GBBVM hides memory address operations through a reference mechanism. For example:

* Variable access
  * `VM_SET`
* Indirect addressing
  * `VM_SET_INDIRECT`
* Stack local addressing
  * `VM_GET_TLOCAL`, `VM_SET_TLOCAL`
</div>
</details>

The GB BASIC compiler compiles memory accesses into corresponding GBBVM instructions and generates the correct addressing relationships, allowing BASIC developers to avoid worrying about the physical layout of memory.

### Concurrency Model: Threads and High-Level Language Synchronization

<details open>
<summary><b>Details</b></summary>
<div class="details-text">
GB BASIC's threading mechanism implements lightweight concurrency through GBBVM instructions. For example:

* Thread creation and lifecycle management
  * `start ...` → `VM_BEGIN_THREAD`
  * `join id` → `VM_JOIN`
  * `kill id` → `VM_TERMINATE`
* Thread waiting
  * `wait ...` → `VM_WAIT`, `VM_WAIT_N`
* Synchronization control
  * `lock/unlock` → `VM_LOCK`/`VM_UNLOCK`
</div>
</details>

GBBVM encapsulates thread context (stack, PC, registers) in the `SCRIPT_CTX` structure, enabling concurrent programming in BASIC to abstract away hardware details and achieve a high-level language concurrency model.

### Extensibility: Synergy Between Instruction Set and High-Level Features

<details open>
<summary><b>Details</b></summary>
<div class="details-text">
The GBBVM instruction set supports GB BASIC's advanced game features through an extensible design. For example:

* Data-driven programming
  * `def scene(...)` → `VM_DEF_SCENE`
  * `on btn(key) start ...` → Registering event callbacks
* Dynamic features
  * `=new actor()` → `VM_NEW_ACTOR`
  * `del actor(id)` → `VM_DEL_ACTOR`
* Event callbacks
  * `on ... start ...` → Registering event callbacks
* Hiding banking details
  * Code execution → Banking is automatically allocated and managed by the compiler
  * Resource loading → Bank allocation and references are automatically handled by the asset pipeline
</div>
</details>

GBBVM translates GB BASIC's structured, declarative syntax (like resource loading, object management, event binding) into imperative instruction sequences, and hides the complexities of banking, maintaining the simplicity of the high-level language while providing the highest possible underlying execution efficiency.

### Summary: GBBVM Assembly - The "Intermediate Layer Abstraction" for High-Level Languages

<details open>
<summary><b>Details</b></summary>
<div class="details-text">

1. **Compilation target**: GBBVM is the compilation target for GB BASIC, mapping high-level structures to deterministic instruction sequences
2. **Execution engine**: Through a stack-based architecture and reference mechanism, it transparently implements memory management and control flow for the high-level language
3. **Concurrency foundation**: Provides a lightweight threading model, freeing GB BASIC's concurrent programming from hardware limitations
4. **Extension bridge**: Supports GB BASIC's data-driven and dynamic features through an extensible instruction set

</div>
</details>

From a high-level language perspective, GBBVM assembly is an intermediate layer of abstraction between GB BASIC and the hardware. It preserves the semantic clarity and ease of use of BASIC while achieving efficient execution on the resource-constrained target platform through a streamlined instruction set design. This design philosophy - high-level language semantics combined with low-level execution efficiency - is precisely the role of GBBVM as an RTOS.
