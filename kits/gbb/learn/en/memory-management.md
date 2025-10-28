# Memory Management

[Prev]() [Next]()

There is no heap allocation in GB BASIC. The addresses of variables, arrays, strings, and resources are all determined at compile-time.

Strings are not stored in RAM but are solidified in ROM. Escape characters and placeholder formatting are supported for text output functions.

GB BASIC represents numeric values as integers, specifically 16-bit signed integers that occupy 2 bytes of memory. In arrays, each element is also a 16-bit signed integer. Additionally, boolean, ID, and nothing types are essentially variants of the integer type. Their underlying storage is also 16-bit signed integers, but in code, they are treated as having different semantics.

Variables and arrays declared in BASIC code have fixed locations in memory that cannot be changed. The size of arrays also cannot be dynamically altered. Both variables and arrays are arranged in the order they are declared.

The inline data sequence is special in that its data is compiled and stored in ROM at a fixed address, and its basic allocation unit is the byte (8-bit signed/unsigned).

Macros themselves occupy zero memory space. They are only compile-time directives and do not result in ROM allocation or runtime RAM allocation.

The vast majority of resources do not need to be loaded into RAM; instead, the data in ROM is accessed directly.

For the complete specifications of data types, please refer to the table below.

| Data types | Size                           | Range              | Allocated in | Used for                                                                               |
|------------|--------------------------------|--------------------|--------------|----------------------------------------------------------------------------------------|
| String     | Determined by length and usage | ASCII, Unicode     | ROM          | `print`, `text`, `label`, `menu`, etc.                                                 |
| Integer    | 16-bit signed                  | 0x0000 to 0xFFFF   | RAM          | Variables, array elements, etc.                                                        |
| Byte       | 8-bit signed/unsigned          | 0x00 to 0xFF       | ROM          | `data` directive                                                                       |
| Boolean    | 16-bit signed                  | `false` and `true` | RAM          | Variables, array elements, etc.                                                        |
| ID         | 16-bit signed                  | 0 or non-zero      | RAM          | Handles, variables, array elements, etc. references to object instances, threads, etc. |
| Nothing    | 16-bit signed                  | `nothing`          | RAM          | Handles, variables, array elements, etc. for empty object instance or thread, etc.     |

For the complete specifications of syntax elements, please refer to the table below.

| Syntax elements      | Element size             | Data types                    | Allocated in | Declared or defined by |
|----------------------|--------------------------|-------------------------------|--------------|------------------------|
| Variable             | 2 bytes                  | Integer, boolean, ID, nothing | RAM          | `let`                  |
| Array                | 2 bytes                  | Integer, boolean, ID, nothing | RAM          | `dim`                  |
| Handle               | 2 bytes                  | ID, nothing                   | RAM          | `start`, `new`, etc.   |
| Inline data sequence | 1 byte                   | Bytes                         | ROM          | `data` directive       |
| Macros               |                          | N/A                           |              | Macro `def`s           |
| Resources            | Determined by asset type | Determined by asset type      | ROM          | Asset editors          |

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <span>You can hover over the code analysis icon in the code editor to view the memory allocation of your program.</span>
    <br>
    <br>
    <img src="imgs/editor-code-memory-allocations.png" class="diagram-image diagram-screenshot">
  </span>
</div>
