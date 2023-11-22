## Launching

GB BASIC accepts a number of launching options to customize some behaviours.

# Launching Options

## Application Options

* "-W PATH": specify current working directory of the application
* "-L": specify to launch the application under compile-only mode
* "-Q": specify to not quit after compiling when "-L" is specified
* "-A FPS": specify expected `FPS` for the application
* "-B": specify to enable borderless window
* "-S WxH": specify the application window size with `W`x`H`
* "-D": specify to disable high-DPI adaption if available
* "-M": specify to put the application window always on top of other windows
* "-X1": specify to launch with scale value 1
* "-X2": specify to launch with scale value 2
* "-X3": specify to launch with scale value 3
* "-X4": specify to launch with scale value 4
* "-R RDR": specify whether to use software renderer, `RDR` can be either "0" or "1"; defaults to "0"
  * "0": hardware accelerated
  * "1": software

## Compiler Options

These options are used when compile-only mode is specified, i.e.

```shell
gbbasic temp.gbb -o gbbasic.gb -r gbbvm.gb -s gbbvm.sym -f default.json
```

* "-r PATH": specify kernel ROM path for input
* "-s PATH": specify symbols data path for input
* "-o PATH": specify ROM path for output
* "-a OUT": specify AST output method, `OUT` can be one of the following value; defaults to "none"
  * "none": disable AST output
  * "stdout": output to console view
  * ${FILE}: output to a specific file
* "-f PATH": specify font config path
* "-n": specify to use explicit line-number mode; omit to let parser to determine
* "-i OPT": whether to enable case-insensitive for the parser; defaults to "true"
  * "true"
  * "false"
* "-z": specify to enable code optimization for the following cases; omit to disable optimization
  * Use `lshift` to optimize base 2 multiplications
  * Use `rshift` to optimize base 2 divisions
* "-t NAME": specify program title
* "-g TYPE": specify cartridge type, `TYPE` is combined with the following symbols and joined with "|"; defaults to "classic|colored"
  * "classic"
  * "colored"
  * "extension"
* "-m TYPE": specify RAM type, `TYPE` can be one of the following value; defaults to "3"
  * "0": 0KB
  * "1": 2KB
  * "2": 8KB
  * "3": 32KB
  * "4": 128KB
* "-c OPT": specify whether to enable the RTC feature; defaults to "true"
  * "true"
  * "false"
