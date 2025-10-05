# Variables and Expressions

[Prev]() [Next]()

* `let foo`: declares a variable without assignment
* `let bar = 42`: declares a variable and assigns a value to it

Each variable declaration takes one word (two bytes) of allocated space in memory.

An expression is a syntactic entity that may be evaluated to determine its value. It is a combination of one or more constants, variables, functions and operators that GB BASIC interprets (according to the particular rules of precedence and of association) and computes to produce ("to return", in a stateful environment) another value. See the following table for all supported operators and their usages. High priorities (with larger numbers) are evaluated before low ones (with smaller numbers).

| Operators | Priority | Note                          | Example       |
|-----------|----------|-------------------------------|---------------|
| `+`       | 3        | Add                           | `a + b`       |
| `-`       | 3        | Minus                         | `a - b`       |
| `*`       | 4        | Multiply                      | `a * b`       |
| `/`       | 4        | Divide                        | `a / b`       |
| `mod`     | 4        | Modulo (remainder)            | `a mod b`     |
| `-`       | 6        | Negative                      | `-a`          |
| `=`       | 2        | Equal to                      | `a = b`       |
| `<`       | 2        | Less than                     | `a < b`       |
| `<=`      | 2        | Less than or equal to         | `a <= b`      |
| `>`       | 2        | Greater than                  | `a > b`       |
| `>=`      | 2        | Greater than or equal to      | `a >= b`      |
| `<>`      | 2        | Not equal                     | `a <> b`      |
| `and`     | 1        | Logic and                     | `a and b`     |
| `or`      | 1        | Logic or                      | `a or b`      |
| `not`     | 6        | Logic not                     | `not a`       |
| `band`    | 5        | Bitwise and                   | `a band b`    |
| `bor`     | 5        | Bitwise or                    | `a bor b`     |
| `bxor`    | 5        | Bitwise xor                   | `a bxor b`    |
| `bnot`    | 5        | Bitwise not                   | `bnot a`      |
| `lshift`  | 5        | Left shift                    | `a lshift b`  |
| `rshift`  | 5        | Right shift                   | `a rshift b`  |
| `sgn`     | -        | Sign of a number (-1, 0 or 1) | `sgn(a)`      |
| `abs`     | -        | Absolute value                | `abs(a)`      |
| `sqr`     | -        | Squared value                 | `sqr(a)`      |
| `sqrt`    | -        | Square root                   | `sqrt(a)`     |
| `sin`     | -        | Sine value                    | `sin(a)`      |
| `cos`     | -        | Cosine value                  | `cos(a)`      |
| `atan2`   | -        | Atan2 value                   | `atan2(a, b)` |
| `pow`     | -        | Exponential value             | `pow(a, b)`   |
| `min`     | -        | Minimum value                 | `min(a, b)`   |
| `max`     | -        | Maximum value                 | `max(a, b)`   |

```basic
let a = 22
let b = 7
let c = a / b
print "%d/%d=%d", a, b, c
```
<!-- prg
!edit, run, title="Variables and expressions", style=""
let a = 22
let b = 7
let c = a / b
print "%d/%d=%d", a, b, c
-->
