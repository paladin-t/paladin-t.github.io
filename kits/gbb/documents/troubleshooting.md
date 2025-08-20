## Troubleshooting

This page lists common GB BASIC errors along with potential solutions.

# Syntax Error

The compiler typically indicates the location of syntax errors and provides error types. This information is usually sufficient to identify and resolve issues. Below are some less obvious cases.

## Using Parenthesized Expressions When Omitting Function Call Parentheses

* Example: `PRINT (2 + 1) - 1`
  * Expected output: "2"
* Example: `SET ACTOR PROPERTY(a, POSITION_PROP) = (1 + 2) * 8, 15 * 8`

Analysis:

* Cause: Omitting function call parentheses causes the code to be parsed as `PRINT(2 + 1)` and `-1` instead of a mathematical expression
* Solution: Use parentheses to clarify the function call scope, e.g., `PRINT((2 + 1) - 1)`, `SET ACTOR PROPERTY(a, POSITION_PROP) = ((1 + 2) * 8, 15 * 8)`, etc.

# Variable Issues

_Debug tips: use `SHELL ">%d", foo` to show the value of a variable onto the debug layer._

## Unexpected Variable Values

* Example: Variables change mysteriously

Analysis:

* Cause: Memory corruption (e.g. array overflows, stack issues)
* Solution: Correct mistakes

## Infinite Loops

* Example: Program freezes

Analysis:

* Cause: Wrong loop states
* Solution: Correct mistakes

# Stack Corruption

_Debug tips: use `SHELL ">\#"` to show the stack pointer of current thread onto the debug layer._

## Mismatched `PUSH`/`POP`

* Example: Program behaves unexpectedly or crashes

Analysis:

* Cause: Unbalanced `PUSH` and `POP` operations lead to logic errors, stack overflow, or excessive popping
* Solution: Audit `PUSH` and `POP` usage to ensure parity

## Excessive `PUSH` Operations

* Example: Program behaves unexpectedly or crashes

Analysis:

* Cause: Stack overflow due to exceeding stack capacity with `PUSH`
* Solution: Limit `PUSH` operations to stay within stack limits

## Excessive Subroutine Calls

* Example: Program behaves unexpectedly or crashes

Analysis:

* Cause: Stack overflow from `GOSUB` calls (which implicitly `PUSH`)
* Solution: Reduce nested `GOSUB` calls or optimize stack usage

## Expression Is Too Long

* Example: Program behaves unexpectedly or crashes

Analysis:

* Cause: Expressions exceeding the maximum length cause stack corruption
* Solution: Break expressions into smaller parts or use temporary variables to simplify complex expressions

## Misusing `GOTO` Instead of `GOSUB`

* Example: Program behaves unexpectedly or crashes

Analysis:

* Cause: Using `GOTO` where `GOSUB` is intended prevents proper `RETURN`
* Solution: Verify `GOSUB`, `GOTO`, and `RETURN` logic

## Jumping (`GOSUB`/`GOTO`) into A `FOR` Loop

* Example: Program behaves unexpectedly or crashes

Analysis:

* Cause: `FOR` loops with non-constant termination conditions or step values involve implicit `PUSH` operations. Jumping into such loops corrupts the stack
* Solution: Ensure jump targets avoid `FOR` loops

## `GOTO` Out of A `FOR` Loop

* Example: Program behaves unexpectedly or crashes

Analysis:

* Cause: `FOR` loops implicitly `PUSH` to the stack. Exiting via `GOTO` disrupts stack integrity
* Solution: Restructure logic to avoid jumping out of `FOR` loops

# Glitches

## Using Colored Features on Classic Devices

* Example: Graphical corruption

Analysis:

* Cause: Colored devices support more RAM, VRAM, and palette space than Classic devices. Code written for Colored devices may write data to memory regions shared with Classic devices, causing tile corruption on Classic hardware
* Solution: Remove Colored-specific features or optimize code for cross-device compatibility

## Tile Out-of-Bounds

* Example: Graphical corruption

Analysis:

* Cause: Tiles exceed valid VRAM boundaries
* Solution: Verify tile indices to ensure they remain within valid ranges

## Tile Overlap

* Example: Graphical corruption

Analysis:

* Cause: Multiple tile-filling operations unintentionally write to the same VRAM space
* Solution: Check tile indices to prevent overlap

## Array Out-of-Bounds

* Example: Graphical corruption or logic errors

Analysis:

* Cause: Array indices exceed valid ranges, modifying unintended memory regions (e.g., other data elements or variables)
* Solution: Validate array indices to ensure they stay within bounds

# Performance Issues

## Slow Rendering or Input Lag

* Example: Game runs sluggishly, button inputs feel delayed

Analysis:

* Cause: Excessive loops or complex calculations per frame
* Solution: Simplify or optimize logic

## Flickering Sprites

* Example: Sprites disappear or flicker during movement

Analysis:

* Cause: Sprite limit exceeded (devices support 10 sprites per scanline)
* Solution: Prioritize visible sprites (e.g., cull off-screen objects)

# Crashes

## Accessing Prohibited Memory

* Example: Program crashes

Analysis:

* Cause: Attempting to read/write restricted memory regions
* Solution: Review code to prevent illegal memory access, or use `QUERY(IS_GBB)` to check the runtime environment before using extension features

# Emulation-Specific Issues

## Save State Corruption

* Example: Save/load breaks game state

Analysis:

* Cause: GB BASIC uses hashed program title for SRAM persistence signature, which may not match previous save state conventions
* Solution: Consider a final name for your program
