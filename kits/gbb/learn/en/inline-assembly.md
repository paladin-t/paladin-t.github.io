# Inline Assembly

[Prev]() [Next]()

While games can be written entirely in BASIC, inline assembly is offered as an optional advanced feature. Similar to native functions, GB BASIC supports calling hardware assembly instructions directly in BASIC. BASIC code is more intuitive, while assembly code runs faster.

## Assembly Syntax and Rules

When a block of assembly code is being executed, it will keep running until it returns, and other BASIC threads will not be dispatched during that time. Assembly code is essentially like a native function. Therefore, a `begin asm ... end asm` block should typically end with a `ret` instruction to return execution to the BASIC program. Before executing `ret`, the stack pointer (`sp`) must be restored to its value upon entry to maintain stack balance. Furthermore, other registers (`af`, `bc`, `de`, `hl`) do not need to be preserved within the assembly block. Assembly blocks take no input parameters and return no values. Data exchange between assembly and BASIC is achieved through variable references and direct address access.

Jump label declarations in assembly code follow the same syntax as BASIC, i.e. `lbl:`. Jump labels work inside the scope of a `begin asm ... end asm` block only. When using labels, cross-block assembly jumps, jumps between assembly and BASIC, and `goto` into an assembly block are not supported.

BASIC variables, arrays, and RAM symbols in a kernel can be referenced directly in assembly code as addresses (16-bit unsigned integers). Other elements in assembly remain consistent with BASIC. For example, numeric literals can be in binary, decimal, octal, or hexadecimal, and comments follow the same syntax as BASIC. The low 8 bits of a 16-bit number can be unpacked using `low(n)` or `<n`, and the high 8 bits using `high(n)` or `>n`.

If a BASIC identifier is referenced only in assembly code but not used in BASIC, it may trigger an "Unused variable" warning. Use `do nothing with foo` in BASIC to suppress the unreferenced warning for `foo`.

## Executing Inline Assembly Blocks

Using `begin asm/end asm` blocks is the recommended way for writing assembly in GB BASIC. When placed within BASIC code, this block declares an assembly segment that is called upon execution. The execution flows sequentially, making the transition seamless. Note that assembly blocks cannot be nested.

* `begin asm/end asm`: declares and executes a block of inline assembly code

Inline assembly example:

```basic
let foo = 42
' Execution falls through to the block below.
begin asm ' Declare and execute a block of inline assembly code.
  ' Accessing BASIC variable, and calculating.
    ld a,(foo)  ' a = foo.
    add a,a     ' a = a + a.
    ld (foo),a  ' foo = a.
    ret         ' Required to return from the ASM routine.
end asm
' Assembly finished, execution continues below.
print "foo=%d", foo

' Execute the second assembly block.
begin asm
  ' Accessing BASIC variable, calculating, comparing, and jumping.
    ld a,(foo)  ' a = foo
  loop:
    cp 42       ' Compare a and 42 (a.k.a. a - 42, affects flags).
    jr z,done   ' If a == 42 (with zero flag) then jump to done.
    dec a       ' a = a - 1.
    jr loop     ' Jump to loop
  done:
    ld (foo),a  ' foo = a.
    ret         ' Required to return from the ASM routine.
end asm
print "foo=%d", foo
```
<!-- prg
!edit, run, title="Inline assembly", style=""
let foo = 42
' Execution falls through to the block below.
begin asm ' Declare and execute a block of inline assembly code.
  ' Accessing BASIC variable, and calculating.
    ld a,(foo)  ' a = foo.
    add a,a     ' a = a + a.
    ld (foo),a  ' foo = a.
    ret         ' Required to return from the ASM routine.
end asm
' Assembly finished, execution continues below.
print "foo=%d", foo

' Execute the second assembly block.
begin asm
  ' Accessing BASIC variable, calculating, comparing, and jumping.
    ld a,(foo)  ' a = foo
  loop:
    cp 42       ' Compare a and 42 (a.k.a. a - 42, affects flags).
    jr z,done   ' If a == 42 (with zero flag) then jump to done.
    dec a       ' a = a - 1.
    jr loop     ' Jump to loop
  done:
    ld (foo),a  ' foo = a.
    ret         ' Required to return from the ASM routine.
end asm
print "foo=%d", foo
-->

`Begin asm/end asm` statements support both modern and retro syntax.

| Modern syntax | Retro syntax |
|---------------|--------------|
| `begin asm`   | `beginasm`   |
| `end asm`     | `endasm`     |

An assembly block can be named by appending a string after `begin asm`. Then the block can be called using `call asm "name"`, and the bank and starting address of the block can be retrieved using `get asm bankof("name")` and `get asm addressof("name")`.

* `begin asm "name"/end asm`: declares and executes a block of named inline assembly code
  * `name`: the name of the assembly block

Note that certain special assembly block names have specific behaviours and purposes. This will be explained later in the [Defining ISR in Assembly](#defining-isr-in-assembly) section.

## Calling Assembly Routines

In addition, the following statements support calling assembly by direct bank and address, data sequence, identifiers, named symbols, etc.

* `call asm bank, addr`: calls the assembly function at the specific address
  * `bank`: the bank of the assembly entry
  * `addr`: the address of the assembly entry
* `call asm data ...`: calls the assembly instructions in numeric machine code at the specific address
  * parameter details:
    * `data ...`: the variadic in-place data sequence
* `call asm id|"{builtin}"|#pg:lno|#pg:lbl|"{name}"`: calls the assembly function at the specific address
  * parameter details:
    * `id`: the variable/array identifier
    * `"{builtin}"`: the name of a builtin entry
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
    * `name`: the assembly block name

The `call` keyword can be omitted, which means `asm ...` is short for `call asm ...`.

The following example demonstrates declaring an assembly block outside the execution flow and calling it from anywhere:

```basic
let foo = 0
' Loop in BASIC.
for i = 0 to 4
  call asm "IncFoo" ' Call the assembly block.
  print "foo=%d", foo
next
end ' The main execution flow ends here.
' Declare a named block of inline assembly code.
begin asm "IncFoo"
    ld a,(foo)      ' a = foo.
    add 1           ' a = a + 1.
    ld (foo),a      ' foo = a.
    ret             ' Required to return from the ASM routine.
end asm
```
<!-- prg
!edit, run, title="Reenterable assembly block", style=""
let foo = 0
' Loop in BASIC.
for i = 0 to 4
  call asm "IncFoo" ' Call the assembly block.
  print "foo=%d", foo
next
end ' The main execution flow ends here.
' Declare a named block of inline assembly code.
begin asm "IncFoo"
    ld a,(foo)      ' a = foo.
    add 1           ' a = a + 1.
    ld (foo),a      ' foo = a.
    ret             ' Required to return from the ASM routine.
end asm
-->

## Defining ISR in Assembly

| ISR assembly names | Description                            |
|--------------------|----------------------------------------|
| `on vbl`           | Called when a V-blank interrupt occurs |
| `on lcd`           | Called when an LCD interrupt occurs    |

By naming an assembly block using a name from the "ISR assembly names" table above, it is installed as a specific ISR callback. Unlike regular assembly blocks, these specially named blocks are not executed in the normal code flow. Instead, after the ISR is installed, execution continues with the code following the block, and the block is automatically triggered when the corresponding interrupt occurs.

The code below shows a simple ISR in assembly setup.

```basic
screen TEXT_MODE

let foo = 0          ' Declare a variable for testing.
begin asm "on vbl"   ' Define and install a V-blank ISR.
    ' Do something in the ISR.
    ld a,(foo)       ' a = foo.
    add 1            ' a = a + 1.
    ld (foo),a       ' foo = a.
    ret              ' Required to return from the ASM routine.
end asm

let bar = 0
loop:
  if bar <> foo then ' Has changed.
    bar = foo
    print "foo=%d", foo
  end if
  goto loop
```
<!-- prg
!edit, run, title="Simple ISR in assembly", style=""
screen TEXT_MODE

let foo = 0          ' Declare a variable for testing.
begin asm "on vbl"   ' Define and install a V-blank ISR.
    ' Do something in the ISR.
    ld a,(foo)       ' a = foo.
    add 1            ' a = a + 1.
    ld (foo),a       ' foo = a.
    ret              ' Required to return from the ASM routine.
end asm

let bar = 0
loop:
  if bar <> foo then ' Has changed.
    bar = foo
    print "foo=%d", foo
  end if
  goto loop
-->

The code below shows how to enabling things impossible in pure BASIC, like distortion effect, with assembly ISR.

```basic
' This program demonstrates how to install assembly ISRs with a graphics effects
' example.
'
' It installs:
'   1. An LCD STAT ISR that modifies the SCX (scroll x) register per scanline,
'      creating a horizontal wave distortion that simulates water ripples
'   2. A VBL ISR advances the wave phase each frame for smooth animation
' Hardware registers used:
'   0xff41 (STAT) - LCD status
'   0xff43 (SCX)  - background scroll x
'   0xff44 (LY)   - current scanline (read-only)
'   0xff45 (LYC)  - scanline compare

' Load the background image.
image(1, 0, 0, MAP_LAYER) = with map "Background"

' Pre-fill the sine wave table.
dim sine[32] ' 32 words = 64 bytes.
let addr = addressof(sine)
for i = 0 to 63
  poke(addr, (6 * sin(i * 4)) / 127)
  inc addr
next
do nothing with sine

' Declare a wave phase counter.
' Incremented by 1 each V-blank, wraps at 64 (table size).
let phase = 0
do nothing with phase

' Install a VBL ISR.
' Advances the wave phase and prepares the first scanline's SCX value.
begin asm "on vbl"
    ' Increment phase (wraps at 64).
    ld a,(phase)
    inc a
    and 0x3f
    ld (phase),a
    ' Set SCX for scanline 0.
    ld l,a
    ld h,0
    ld de,sine
    add hl,de
    ld a,(hl)
    ldh (0x43),a      ' SCX = sine[phase].
    ' Reset LYC to 0.
    xor a
    ldh (0x45),a      ' LYC = 0.
    ret
end asm

' Install an LCD ISR.
' Triggered per scanline. Reads the sine table to compute horizontal
' displacement.
begin asm "on lcd"
    ' Read current scanline.
    ldh a,(0x44)      ' A = LY.
    ' Skip if in V-blank (LY >= 144).
    cp 144
    jr nc,lcd_done
    ' Store scanline in B.
    ld b,a
    ' Table index = (scanline + phase) mod 64.
    ld a,(phase)
    add a,b
    and 0x3f
    ld l,a
    ld h,0
    ld de,sine
    add hl,de
    ld a,(hl)
    ' Apply displacement to SCX.
    ldh (0x43),a      ' SCX = sine[(scanline + phase) mod 64].
  lcd_done:
    ret
end asm

' Enable the STAT Mode 0 interrupt.
' STAT bit 3 enables the Mode 0 interrupt source.
poke 0xff41, 0x08
```
<!-- prg
!edit, run, title="ISR effect in assembly", style=""
url://prgs/asm-isr-1.txt
-->

## CPU Instructions

For the CPU instructions, refer to the following tables.

### Instructions

<div style="overflow: auto; scrollbar-width: thin;">
<table style="display: table;" cellspacing="0" cellpadding="0" class="withborder" bgcolor="#bfbfbf" width="1350">
  <tr style="font-family: monospace; font-size: 8pt" align="center" bgcolor="#9f9f9f"><td class="withborder">&nbsp;</td><td class="withborder" style="width: 8em"><b>&nbsp;x0&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x1&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x2&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x3&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x4&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x5&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x6&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x7&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x8&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x9&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;xA&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;xB&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;xC&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;xD&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;xE&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;xF&nbsp;</b></td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;0x&nbsp;</b></td><td class="withborder" bgcolor="#ff99cc">NOP<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccffcc">LD BC,d16<br>3&nbsp;&nbsp;12<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD (BC),A<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffcccc">INC BC<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffff99">INC B<br>1&nbsp;&nbsp;4<br>Z 0 H -</td><td class="withborder" bgcolor="#ffff99">DEC B<br>1&nbsp;&nbsp;4<br>Z 1 H -</td><td class="withborder" bgcolor="#ccccff">LD B,d8<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RLCA<br>1&nbsp;&nbsp;4<br>0 0 0 C</td><td class="withborder" bgcolor="#ccffcc">LD (a16),SP<br>3&nbsp;&nbsp;20<br>- - - -</td><td class="withborder" bgcolor="#ffcccc">ADD HL,BC<br>1&nbsp;&nbsp;8<br>- 0 H C</td><td class="withborder" bgcolor="#ccccff">LD A,(BC)<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffcccc">DEC BC<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffff99">INC C<br>1&nbsp;&nbsp;4<br>Z 0 H -</td><td class="withborder" bgcolor="#ffff99">DEC C<br>1&nbsp;&nbsp;4<br>Z 1 H -</td><td class="withborder" bgcolor="#ccccff">LD C,d8<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RRCA<br>1&nbsp;&nbsp;4<br>0 0 0 C</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;1x&nbsp;</b></td><td class="withborder" bgcolor="#ff99cc">STOP 0<br>2&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccffcc">LD DE,d16<br>3&nbsp;&nbsp;12<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD (DE),A<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffcccc">INC DE<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffff99">INC D<br>1&nbsp;&nbsp;4<br>Z 0 H -</td><td class="withborder" bgcolor="#ffff99">DEC D<br>1&nbsp;&nbsp;4<br>Z 1 H -</td><td class="withborder" bgcolor="#ccccff">LD D,d8<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RLA<br>1&nbsp;&nbsp;4<br>0 0 0 C</td><td class="withborder" bgcolor="#ffcc99">JR r8<br>2&nbsp;&nbsp;12<br>- - - -</td><td class="withborder" bgcolor="#ffcccc">ADD HL,DE<br>1&nbsp;&nbsp;8<br>- 0 H C</td><td class="withborder" bgcolor="#ccccff">LD A,(DE)<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffcccc">DEC DE<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffff99">INC E<br>1&nbsp;&nbsp;4<br>Z 0 H -</td><td class="withborder" bgcolor="#ffff99">DEC E<br>1&nbsp;&nbsp;4<br>Z 1 H -</td><td class="withborder" bgcolor="#ccccff">LD E,d8<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RRA<br>1&nbsp;&nbsp;4<br>0 0 0 C</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;2x&nbsp;</b></td><td class="withborder" bgcolor="#ffcc99">JR NZ,r8<br>2&nbsp;&nbsp;12/8<br>- - - -</td><td class="withborder" bgcolor="#ccffcc">LD HL,d16<br>3&nbsp;&nbsp;12<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD (HL+),A<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffcccc">INC HL<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffff99">INC H<br>1&nbsp;&nbsp;4<br>Z 0 H -</td><td class="withborder" bgcolor="#ffff99">DEC H<br>1&nbsp;&nbsp;4<br>Z 1 H -</td><td class="withborder" bgcolor="#ccccff">LD H,d8<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffff99">DAA<br>1&nbsp;&nbsp;4<br>Z - 0 C</td><td class="withborder" bgcolor="#ffcc99">JR Z,r8<br>2&nbsp;&nbsp;12/8<br>- - - -</td><td class="withborder" bgcolor="#ffcccc">ADD HL,HL<br>1&nbsp;&nbsp;8<br>- 0 H C</td><td class="withborder" bgcolor="#ccccff">LD A,(HL+)<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffcccc">DEC HL<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffff99">INC L<br>1&nbsp;&nbsp;4<br>Z 0 H -</td><td class="withborder" bgcolor="#ffff99">DEC L<br>1&nbsp;&nbsp;4<br>Z 1 H -</td><td class="withborder" bgcolor="#ccccff">LD L,d8<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffff99">CPL<br>1&nbsp;&nbsp;4<br>- 1 1 -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;3x&nbsp;</b></td><td class="withborder" bgcolor="#ffcc99">JR NC,r8<br>2&nbsp;&nbsp;12/8<br>- - - -</td><td class="withborder" bgcolor="#ccffcc">LD SP,d16<br>3&nbsp;&nbsp;12<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD (HL-),A<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffcccc">INC SP<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffff99">INC (HL)<br>1&nbsp;&nbsp;12<br>Z 0 H -</td><td class="withborder" bgcolor="#ffff99">DEC (HL)<br>1&nbsp;&nbsp;12<br>Z 1 H -</td><td class="withborder" bgcolor="#ccccff">LD (HL),d8<br>2&nbsp;&nbsp;12<br>- - - -</td><td class="withborder" bgcolor="#ffff99">SCF<br>1&nbsp;&nbsp;4<br>- 0 0 1</td><td class="withborder" bgcolor="#ffcc99">JR C,r8<br>2&nbsp;&nbsp;12/8<br>- - - -</td><td class="withborder" bgcolor="#ffcccc">ADD HL,SP<br>1&nbsp;&nbsp;8<br>- 0 H C</td><td class="withborder" bgcolor="#ccccff">LD A,(HL-)<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffcccc">DEC SP<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffff99">INC A<br>1&nbsp;&nbsp;4<br>Z 0 H -</td><td class="withborder" bgcolor="#ffff99">DEC A<br>1&nbsp;&nbsp;4<br>Z 1 H -</td><td class="withborder" bgcolor="#ccccff">LD A,d8<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ffff99">CCF<br>1&nbsp;&nbsp;4<br>- 0 0 C</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;4x&nbsp;</b></td><td class="withborder" bgcolor="#ccccff">LD B,B<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD B,C<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD B,D<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD B,E<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD B,H<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD B,L<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD B,(HL)<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD B,A<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD C,B<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD C,C<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD C,D<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD C,E<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD C,H<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD C,L<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD C,(HL)<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD C,A<br>1&nbsp;&nbsp;4<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;5x&nbsp;</b></td><td class="withborder" bgcolor="#ccccff">LD D,B<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD D,C<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD D,D<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD D,E<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD D,H<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD D,L<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD D,(HL)<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD D,A<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD E,B<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD E,C<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD E,D<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD E,E<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD E,H<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD E,L<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD E,(HL)<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD E,A<br>1&nbsp;&nbsp;4<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;6x&nbsp;</b></td><td class="withborder" bgcolor="#ccccff">LD H,B<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD H,C<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD H,D<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD H,E<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD H,H<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD H,L<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD H,(HL)<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD H,A<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD L,B<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD L,C<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD L,D<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD L,E<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD L,H<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD L,L<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD L,(HL)<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD L,A<br>1&nbsp;&nbsp;4<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;7x&nbsp;</b></td><td class="withborder" bgcolor="#ccccff">LD (HL),B<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD (HL),C<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD (HL),D<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD (HL),E<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD (HL),H<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD (HL),L<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ff99cc">HALT<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD (HL),A<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD A,B<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD A,C<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD A,D<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD A,E<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD A,H<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD A,L<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD A,(HL)<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD A,A<br>1&nbsp;&nbsp;4<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;8x&nbsp;</b></td><td class="withborder" bgcolor="#ffff99">ADD A,B<br>1&nbsp;&nbsp;4<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADD A,C<br>1&nbsp;&nbsp;4<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADD A,D<br>1&nbsp;&nbsp;4<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADD A,E<br>1&nbsp;&nbsp;4<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADD A,H<br>1&nbsp;&nbsp;4<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADD A,L<br>1&nbsp;&nbsp;4<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADD A,(HL)<br>1&nbsp;&nbsp;8<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADD A,A<br>1&nbsp;&nbsp;4<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADC A,B<br>1&nbsp;&nbsp;4<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADC A,C<br>1&nbsp;&nbsp;4<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADC A,D<br>1&nbsp;&nbsp;4<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADC A,E<br>1&nbsp;&nbsp;4<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADC A,H<br>1&nbsp;&nbsp;4<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADC A,L<br>1&nbsp;&nbsp;4<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADC A,(HL)<br>1&nbsp;&nbsp;8<br>Z 0 H C</td><td class="withborder" bgcolor="#ffff99">ADC A,A<br>1&nbsp;&nbsp;4<br>Z 0 H C</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;9x&nbsp;</b></td><td class="withborder" bgcolor="#ffff99">SUB B<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SUB C<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SUB D<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SUB E<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SUB H<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SUB L<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SUB (HL)<br>1&nbsp;&nbsp;8<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SUB A<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SBC A,B<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SBC A,C<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SBC A,D<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SBC A,E<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SBC A,H<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SBC A,L<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SBC A,(HL)<br>1&nbsp;&nbsp;8<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">SBC A,A<br>1&nbsp;&nbsp;4<br>Z 1 H C</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;Ax&nbsp;</b></td><td class="withborder" bgcolor="#ffff99">AND B<br>1&nbsp;&nbsp;4<br>Z 0 1 0</td><td class="withborder" bgcolor="#ffff99">AND C<br>1&nbsp;&nbsp;4<br>Z 0 1 0</td><td class="withborder" bgcolor="#ffff99">AND D<br>1&nbsp;&nbsp;4<br>Z 0 1 0</td><td class="withborder" bgcolor="#ffff99">AND E<br>1&nbsp;&nbsp;4<br>Z 0 1 0</td><td class="withborder" bgcolor="#ffff99">AND H<br>1&nbsp;&nbsp;4<br>Z 0 1 0</td><td class="withborder" bgcolor="#ffff99">AND L<br>1&nbsp;&nbsp;4<br>Z 0 1 0</td><td class="withborder" bgcolor="#ffff99">AND (HL)<br>1&nbsp;&nbsp;8<br>Z 0 1 0</td><td class="withborder" bgcolor="#ffff99">AND A<br>1&nbsp;&nbsp;4<br>Z 0 1 0</td><td class="withborder" bgcolor="#ffff99">XOR B<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">XOR C<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">XOR D<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">XOR E<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">XOR H<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">XOR L<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">XOR (HL)<br>1&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">XOR A<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;Bx&nbsp;</b></td><td class="withborder" bgcolor="#ffff99">OR B<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">OR C<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">OR D<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">OR E<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">OR H<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">OR L<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">OR (HL)<br>1&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">OR A<br>1&nbsp;&nbsp;4<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffff99">CP B<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">CP C<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">CP D<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">CP E<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">CP H<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">CP L<br>1&nbsp;&nbsp;4<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">CP (HL)<br>1&nbsp;&nbsp;8<br>Z 1 H C</td><td class="withborder" bgcolor="#ffff99">CP A<br>1&nbsp;&nbsp;4<br>Z 1 H C</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;Cx&nbsp;</b></td><td class="withborder" bgcolor="#ffcc99">RET NZ<br>1&nbsp;&nbsp;20/8<br>- - - -</td><td class="withborder" bgcolor="#ccffcc">POP BC<br>1&nbsp;&nbsp;12<br>- - - -</td><td class="withborder" bgcolor="#ffcc99">JP NZ,a16<br>3&nbsp;&nbsp;16/12<br>- - - -</td><td class="withborder" bgcolor="#ffcc99">JP a16<br>3&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#ffcc99">CALL NZ,a16<br>3&nbsp;&nbsp;24/12<br>- - - -</td><td class="withborder" bgcolor="#ccffcc">PUSH BC<br>1&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#ffff99">ADD A,d8<br>2&nbsp;&nbsp;8<br>Z 0 H C</td><td class="withborder" bgcolor="#ffcc99">RST 0x00<br>1&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#ffcc99">RET Z<br>1&nbsp;&nbsp;20/8<br>- - - -</td><td class="withborder" bgcolor="#ffcc99">RET<br>1&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#ffcc99">JP Z,a16<br>3&nbsp;&nbsp;16/12<br>- - - -</td><td class="withborder" bgcolor="#ff99cc">PREFIX CB<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ffcc99">CALL Z,a16<br>3&nbsp;&nbsp;24/12<br>- - - -</td><td class="withborder" bgcolor="#ffcc99">CALL a16<br>3&nbsp;&nbsp;24<br>- - - -</td><td class="withborder" bgcolor="#ffff99">ADC A,d8<br>2&nbsp;&nbsp;8<br>Z 0 H C</td><td class="withborder" bgcolor="#ffcc99">RST 0x08<br>1&nbsp;&nbsp;16<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;Dx&nbsp;</b></td><td class="withborder" bgcolor="#ffcc99">RET NC<br>1&nbsp;&nbsp;20/8<br>- - - -</td><td class="withborder" bgcolor="#ccffcc">POP DE<br>1&nbsp;&nbsp;12<br>- - - -</td><td class="withborder" bgcolor="#ffcc99">JP NC,a16<br>3&nbsp;&nbsp;16/12<br>- - - -</td><td class="withborder">&nbsp;</td><td class="withborder" bgcolor="#ffcc99">CALL NC,a16<br>3&nbsp;&nbsp;24/12<br>- - - -</td><td class="withborder" bgcolor="#ccffcc">PUSH DE<br>1&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#ffff99">SUB d8<br>2&nbsp;&nbsp;8<br>Z 1 H C</td><td class="withborder" bgcolor="#ffcc99">RST 0x10<br>1&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#ffcc99">RET C<br>1&nbsp;&nbsp;20/8<br>- - - -</td><td class="withborder" bgcolor="#ffcc99">RETI<br>1&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#ffcc99">JP C,a16<br>3&nbsp;&nbsp;16/12<br>- - - -</td><td class="withborder">&nbsp;</td><td class="withborder" bgcolor="#ffcc99">CALL C,a16<br>3&nbsp;&nbsp;24/12<br>- - - -</td><td class="withborder">&nbsp;</td><td class="withborder" bgcolor="#ffff99">SBC A,d8<br>2&nbsp;&nbsp;8<br>Z 1 H C</td><td class="withborder" bgcolor="#ffcc99">RST 0x18<br>1&nbsp;&nbsp;16<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;Ex&nbsp;</b></td><td class="withborder" bgcolor="#ccccff">LDH (a8),A<br>2&nbsp;&nbsp;12<br>- - - -</td><td class="withborder" bgcolor="#ccffcc">POP HL<br>1&nbsp;&nbsp;12<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD (C),A<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder">&nbsp;</td><td class="withborder">&nbsp;</td><td class="withborder" bgcolor="#ccffcc">PUSH HL<br>1&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#ffff99">AND d8<br>2&nbsp;&nbsp;8<br>Z 0 1 0</td><td class="withborder" bgcolor="#ffcc99">RST 0x20<br>1&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#ffcccc">ADD SP,r8<br>2&nbsp;&nbsp;16<br>0 0 H C</td><td class="withborder" bgcolor="#ffcc99">JP (HL)<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD (a16),A<br>3&nbsp;&nbsp;16<br>- - - -</td><td class="withborder">&nbsp;</td><td class="withborder">&nbsp;</td><td class="withborder">&nbsp;</td><td class="withborder" bgcolor="#ffff99">XOR d8<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffcc99">RST 0x28<br>1&nbsp;&nbsp;16<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;Fx&nbsp;</b></td><td class="withborder" bgcolor="#ccccff">LDH A,(a8)<br>2&nbsp;&nbsp;12<br>- - - -</td><td class="withborder" bgcolor="#ccffcc">POP AF<br>1&nbsp;&nbsp;12<br>Z N H C</td><td class="withborder" bgcolor="#ccccff">LD A,(C)<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ff99cc">DI<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder">&nbsp;</td><td class="withborder" bgcolor="#ccffcc">PUSH AF<br>1&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#ffff99">OR d8<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#ffcc99">RST 0x30<br>1&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#ccffcc">LD HL,SP+r8<br>2&nbsp;&nbsp;12<br>0 0 H C</td><td class="withborder" bgcolor="#ccffcc">LD SP,HL<br>1&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#ccccff">LD A,(a16)<br>3&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#ff99cc">EI<br>1&nbsp;&nbsp;4<br>- - - -</td><td class="withborder">&nbsp;</td><td class="withborder">&nbsp;</td><td class="withborder" bgcolor="#ffff99">CP d8<br>2&nbsp;&nbsp;8<br>Z 1 H C</td><td class="withborder" bgcolor="#ffcc99">RST 0x38<br>1&nbsp;&nbsp;16<br>- - - -</td></tr>
</table>
</div>

### Prefixed Instructions (0xCB 0xHH)

<div style="overflow: auto; scrollbar-width: thin;">
<table cellspacing="0" cellpadding="0" class="withborder" bgcolor="#bfbfbf" width="1350">
  <tr style="font-family: monospace; font-size: 8pt" align="center" bgcolor="#9f9f9f"><td class="withborder">&nbsp;</td><td class="withborder" style="width: 8em"><b>&nbsp;x0&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x1&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x2&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x3&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x4&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x5&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x6&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x7&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x8&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;x9&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;xA&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;xB&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;xC&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;xD&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;xE&nbsp;</b></td><td class="withborder" style="width: 8em"><b>&nbsp;xF&nbsp;</b></td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;0x&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">RLC B<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RLC C<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RLC D<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RLC E<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RLC H<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RLC L<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RLC (HL)<br>2&nbsp;&nbsp;16<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RLC A<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RRC B<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RRC C<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RRC D<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RRC E<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RRC H<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RRC L<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RRC (HL)<br>2&nbsp;&nbsp;16<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RRC A<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;1x&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">RL B<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RL C<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RL D<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RL E<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RL H<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RL L<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RL (HL)<br>2&nbsp;&nbsp;16<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RL A<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RR B<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RR C<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RR D<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RR E<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RR H<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RR L<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RR (HL)<br>2&nbsp;&nbsp;16<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">RR A<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;2x&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">SLA B<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SLA C<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SLA D<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SLA E<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SLA H<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SLA L<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SLA (HL)<br>2&nbsp;&nbsp;16<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SLA A<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SRA B<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SRA C<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SRA D<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SRA E<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SRA H<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SRA L<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SRA (HL)<br>2&nbsp;&nbsp;16<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SRA A<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;3x&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">SWAP B<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SWAP C<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SWAP D<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SWAP E<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SWAP H<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SWAP L<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SWAP (HL)<br>2&nbsp;&nbsp;16<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SWAP A<br>2&nbsp;&nbsp;8<br>Z 0 0 0</td><td class="withborder" bgcolor="#80ffff">SRL B<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SRL C<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SRL D<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SRL E<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SRL H<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SRL L<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SRL (HL)<br>2&nbsp;&nbsp;16<br>Z 0 0 C</td><td class="withborder" bgcolor="#80ffff">SRL A<br>2&nbsp;&nbsp;8<br>Z 0 0 C</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;4x&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">BIT 0,B<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 0,C<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 0,D<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 0,E<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 0,H<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 0,L<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 0,(HL)<br>2&nbsp;&nbsp;16<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 0,A<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 1,B<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 1,C<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 1,D<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 1,E<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 1,H<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 1,L<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 1,(HL)<br>2&nbsp;&nbsp;16<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 1,A<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;5x&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">BIT 2,B<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 2,C<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 2,D<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 2,E<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 2,H<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 2,L<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 2,(HL)<br>2&nbsp;&nbsp;16<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 2,A<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 3,B<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 3,C<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 3,D<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 3,E<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 3,H<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 3,L<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 3,(HL)<br>2&nbsp;&nbsp;16<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 3,A<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;6x&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">BIT 4,B<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 4,C<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 4,D<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 4,E<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 4,H<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 4,L<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 4,(HL)<br>2&nbsp;&nbsp;16<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 4,A<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 5,B<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 5,C<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 5,D<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 5,E<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 5,H<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 5,L<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 5,(HL)<br>2&nbsp;&nbsp;16<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 5,A<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;7x&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">BIT 6,B<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 6,C<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 6,D<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 6,E<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 6,H<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 6,L<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 6,(HL)<br>2&nbsp;&nbsp;16<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 6,A<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 7,B<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 7,C<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 7,D<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 7,E<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 7,H<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 7,L<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 7,(HL)<br>2&nbsp;&nbsp;16<br>Z 0 1 -</td><td class="withborder" bgcolor="#80ffff">BIT 7,A<br>2&nbsp;&nbsp;8<br>Z 0 1 -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;8x&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">RES 0,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 0,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 0,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 0,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 0,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 0,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 0,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 0,A<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 1,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 1,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 1,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 1,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 1,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 1,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 1,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 1,A<br>2&nbsp;&nbsp;8<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;9x&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">RES 2,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 2,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 2,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 2,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 2,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 2,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 2,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 2,A<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 3,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 3,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 3,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 3,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 3,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 3,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 3,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 3,A<br>2&nbsp;&nbsp;8<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;Ax&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">RES 4,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 4,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 4,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 4,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 4,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 4,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 4,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 4,A<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 5,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 5,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 5,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 5,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 5,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 5,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 5,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 5,A<br>2&nbsp;&nbsp;8<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;Bx&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">RES 6,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 6,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 6,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 6,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 6,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 6,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 6,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 6,A<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 7,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 7,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 7,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 7,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 7,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 7,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 7,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">RES 7,A<br>2&nbsp;&nbsp;8<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;Cx&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">SET 0,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 0,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 0,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 0,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 0,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 0,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 0,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 0,A<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 1,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 1,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 1,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 1,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 1,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 1,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 1,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 1,A<br>2&nbsp;&nbsp;8<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;Dx&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">SET 2,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 2,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 2,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 2,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 2,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 2,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 2,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 2,A<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 3,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 3,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 3,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 3,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 3,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 3,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 3,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 3,A<br>2&nbsp;&nbsp;8<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;Ex&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">SET 4,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 4,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 4,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 4,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 4,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 4,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 4,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 4,A<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 5,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 5,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 5,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 5,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 5,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 5,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 5,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 5,A<br>2&nbsp;&nbsp;8<br>- - - -</td></tr>
  <tr style="font-family: monospace; font-size: 8pt" align="center"><td class="withborder" bgcolor="#9f9f9f"><b>&nbsp;Fx&nbsp;</b></td><td class="withborder" bgcolor="#80ffff">SET 6,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 6,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 6,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 6,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 6,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 6,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 6,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 6,A<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 7,B<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 7,C<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 7,D<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 7,E<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 7,H<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 7,L<br>2&nbsp;&nbsp;8<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 7,(HL)<br>2&nbsp;&nbsp;16<br>- - - -</td><td class="withborder" bgcolor="#80ffff">SET 7,A<br>2&nbsp;&nbsp;8<br>- - - -</td></tr>
</table>
</div>

### Legend

<table cellspacing="0" cellpadding="0" style="font-family: monospace; font-size: 8pt; border: none; color: var(--text-color); background-color: transparent;">
  <tr><td bgcolor="#ff99cc" style="border: none; color: var(--text-color);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td style="border: none; color: var(--text-color); background-color: transparent;">Misc/control instructions</td></tr>
  <tr><td bgcolor="#ffcc99" style="border: none; color: var(--text-color);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td style="border: none; color: var(--text-color); background-color: transparent;">Jumps/calls</td></tr>
  <tr><td bgcolor="#ccccff" style="border: none; color: var(--text-color);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td style="border: none; color: var(--text-color); background-color: transparent;">8bit load/store/move instructions</td></tr>
  <tr><td bgcolor="#ccffcc" style="border: none; color: var(--text-color);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td style="border: none; color: var(--text-color); background-color: transparent;">16bit load/store/move instructions</td></tr>
  <tr><td bgcolor="#ffff99" style="border: none; color: var(--text-color);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td style="border: none; color: var(--text-color); background-color: transparent;">8bit arithmetic/logical instructions</td></tr>
  <tr><td bgcolor="#ffcccc" style="border: none; color: var(--text-color);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td style="border: none; color: var(--text-color); background-color: transparent;">16bit arithmetic/logical instructions</td></tr>
  <tr><td bgcolor="#80ffff" style="border: none; color: var(--text-color); border-radius: 0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td style="border: none; color: var(--text-color); background-color: transparent;">8bit rotations/shifts and bit instructions</td></tr>
</table>

<table cellspacing="0" cellpadding="0" style="border: none; color: var(--text-color); background-color: transparent;">
  <tr style="font-family: monospace; font-size: 8pt" align="center">
    <td align="right" style="border: none; color: var(--text-color);">&nbsp;<br>Length in bytes&nbsp;&rarr;<br>&nbsp;</td>
    <td style="border: none; color: var(--text-color);">&nbsp;</td>
    <td class="withborder" style="width: 7em; border-bottom: 1px solid #e6e6e6; background-color: var(--bg-color);">INS reg<br>2&nbsp;&nbsp;8<br>Z N H C</td>
    <td style="border: none; color: var(--text-color);">&nbsp;</td>
    <td align="left" style="border: none; color: var(--text-color);">&larr;&nbsp;Instruction mnemonic<br>&larr;&nbsp;Duration in cycles<br>&larr;&nbsp;Flags affected</td>
  </tr>
</table>

### Data Addressing Modes

`n8` means immediate 8-bit data. <br>
`n16` means immediate little-endian 16-bit data. <br>
`a8` means 8-bit unsigned data, which is added to 0xFF00 in certain instructions to create a 16-bit address in HRAM (High RAM). <br>
`a16` means little-endian 16-bit address. <br>
`e8` means 8-bit signed data.

### Mnemonic Aliases

`LD A, (HL+)` has the alternative mnemonics `LD A, (HLI)` and `LDI A, (HL)`. <br>
`LD (HL+), A` has the alternative mnemonics `LD (HLI), A` and `LDI (HL), A`. <br>
`LD A, (HL-)` has the alternative mnemonics `LD A, (HLD)` and `LDD A, (HL)`. <br>
`LD (HL-), A` has the alternative mnemonics `LD (HLD), A` and `LDD (HL), A`. <br>
`LD HL, SP+e8` has the alternative mnemonics `LDHL SP, e8`. <br>
ALU instructions (`ADD`, `ADC`, `SUB`, `SBC`, `AND`, `XOR`, `OR`, and `CP`) can be written with the left-hand side `A` omitted. <br>
Thus for example `ADD A, B` has the alternative mnemonic `ADD B`, and `CP A, 0xF` has the alternative mnemonic `CP 0xF`.

**See also:** _[CPU (SM83) Instruction Set](https://gbdev.io/gb-opcodes/optables/), [CPU Instruction Note](https://gbdev.io/pandocs/CPU_Instruction_Set.html), [CPU Manual](http://marc.rawer.de/Gameboy/Docs/GBCPUman.pdf)._
