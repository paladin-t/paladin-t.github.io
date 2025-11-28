# Memory Operations

[Prev]() [Next]()

// TODO

## `memcpy`/`memset`/`memadd`, `bankof`/`addressof`

* `memcpy(dst, bank, src, n)`: copies arbitrary data from an address in memory into another place
  * `dst`: the destination address
  * `bank`: the source ROM bank, `-1` for no bank switching
  * `src`: the source address
  * `n`: the count of bytes to copy
* `memcpy(dst, n) = read|data ...`: copies arbitrary data from an inline data sequence into another place in memory
  * `dst`: the destination address
  * `n`: the count of integer to copy
* `memcpy(dst, n[, offset]) = "{builtin}"`: copies arbitrary data from a builtin entry in ROM into another place in memory
  * `dst`: the destination address
  * `n`: the count of bytes to copy
  * `offset`: the offset of the source data in bytes
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
* `memcpy(dst[, n][, offset]) = with tile #pg|"{name}"`: copies arbitrary data from a tiles asset into another place in memory
  * `dst`: the destination address
  * `n`: the count of bytes to copy, omit to use the whole tiles asset size
  * `offset`: the offset of the source data in bytes
  * objectives:
    * `#pg`: tiles page index
    * `name`: tiles asset name
* `memcpy(dst[, n][, offset]) = with map #pg|#pg:n|"{name}"`: copies arbitrary data from a map asset into another place in memory
  * `dst`: the destination address
  * `n`: the count of bytes to copy, omit to use the whole map asset size
  * `offset`: the offset of the source data in bytes
  * objectives:
    * `#pg`: map page index
    * `#pg:n`: map page index and tile index
    * `name`: tiles asset name

* `memset(dst, val, n)`: sets the values of a range of memory space
  * `dst`: the destination address
  * `val`: the value in byte
  * `n`: the count of bytes to set

* `memadd(dst, val, n)`: adds the specific value to each byte of a range of space
  * `dst`: the destination address
  * `val`: the value in signed byte to be added to each destination byte
  * `n`: the count of bytes to add

* `=bankof(id)`: gets the bank of the specific identifier
  * `id`: the variable/array identifier
  * returns the bank of the identifier; must always be `0` for identifiers allocated in RAM heap
* `=addressof(id)`: gets the address of the specific identifier
  * `id`: the variable/array identifier
  * returns the address of the identifier
* `=bankof("{builtin}")`: gets the bank of the specific builtin entry
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
  * returns the bank of the entry
* `=addressof("{builtin}")`: gets the address of the specific builtin entry
  * objectives:
    * `"{builtin}"`: the name of a builtin entry
  * returns the address of the entry

* `=bankof read`: gets the bank of the current reading position of inline data sequence
  * returns the bank of the current reading position of inline data sequence
* `=addressof read`: gets the address of the current reading position of inline data sequence
  * returns the address of the current reading position of inline data sequence

* `=get {asset} bankof(#pg|#pg:n|"{name}")`: gets the bank of the specific asset
  * `{asset}`: the type of a asset; can be one of `tile`, `map`, `scene`, `actor`, `projectile`, `music`, and `sfx`
  * objectives:
    * `#pg`: asset page index
    * `#pg:n`: asset page index and sub index
    * `name`: asset name
  * returns the bank of the entry
* `=get {asset} addressof(#pg|#pg:n|"{name}")`: gets the address of the specific asset
  * `{asset}`: the type of a asset; can be one of `tile`, `map`, `scene`, `actor`, `projectile`, `music`, and `sfx`
  * objectives:
    * `#pg`: asset page index
    * `#pg:n`: asset page index and sub index
    * `name`: asset name
  * returns the address of the entry

* `=get palette bankof([#pg|#pg:n|"{name}|"{name:n}"])`: gets the bank of the default palette asset
  * objectives:
    * `#pg`: palette asset index, with range of value from `#0` to `#7` for "BG0" to "BG7", and `#8` to `#15` for "OBJ0" to "OBJ7"
      * `n`: color index, with range of value from 0 to 3
    * `name`: palette asset name, with range of value from "BG0" to "BG7", and "OBJ0" to "OBJ7"
      * `n`: color index, with range of value from 0 to 3
  * returns the bank of the entry
* `=get palette addressof([#pg|#pg:n|"{name}|"{name:n}"])`: gets the address of the default palette asset
  * objectives:
    * `#pg`: palette asset index, with range of value from `#0` to `#7` for "BG0" to "BG7", and `#8` to `#15` for "OBJ0" to "OBJ7"
      * `n`: color index, with range of value from 0 to 3
    * `name`: palette asset name, with range of value from "BG0" to "BG7", and "OBJ0" to "OBJ7"
      * `n`: color index, with range of value from 0 to 3
  * returns the address of the entry

## `peek`/`poke`

* `poke(pos, val)`: sets the value at the specific memory address
  * `pos`: the address to access
  * `val`: the value in byte
* `poke int(pos, val)`: sets the value at the specific memory address wordwise
  * `pos`: the address to access
  * `val`: the value in word (two bytes)
* `=peek(pos)`: gets the value at the specific memory address
  * `pos`: the address to access
  * returns the value in byte
* `=peek int(pos)`: gets the value at the specific memory address wordwise
  * `pos`: the address to access
  * returns the value in word (two bytes)
* `=peek(bank, addr)`: gets the value at the specific banked memory address
  * `bank`: the bank to access
  * `addr`: the address to access
  * returns the value in byte
* `=peek int(bank, addr)`: gets the value at the specific banked memory address wordwise
  * `bank`: the bank to access
  * `addr`: the address to access
  * returns the value in word (two bytes)

## `pack`/`unpack`

* `=pack(b0, b1)`: packs the two bytes into a 16-bit integer
  * `b0`: the first byte
  * `b1`: the second byte
  * returns the packed 16-bit integer; the bit order is `(B1 LSHIFT 8) BOR (B0)`
* `unpack(val, b0, b1)`: unpacks the 16-bit integer into two bytes and stores them into the two variables
  * `val`: the 16-bit integer to unpack
  * `b0`: the first variable; the bits are extracted as `val BAND 0xFF`
  * `b1`: the second variable; the bits are extracted as `(val RSHIFT 8) BAND 0xFF`
* `=pack(n0, n1, n2, n3)`: packs the four nibbles (4 bits per nibble) into a 16-bit integer
  * `n0`: the first nibble
  * `n1`: the second nibble
  * `n2`: the third nibble
  * `n3`: the fourth nibble
  * returns the packed 16-bit integer; the bit order is `(B3 LSHIFT 12) BOR (B2 LSHIFT 8) BOR (B1 LSHIFT 4) BOR (B0)`
* `unpack(val, n0, n1, n2, n3)`: unpacks the 16-bit integer into four nibbles (4 bits per nibble) and stores them into the four variables
  * `val`: the 16-bit integer to unpack
  * `n0`: the first variable; the bits are extracted as `val BAND 0x0F`
  * `n1`: the second variable; the bits are extracted as `(val RSHIFT 4) BAND 0x0F`
  * `n2`: the third variable; the bits are extracted as `(val RSHIFT 8) BAND 0x0F`
  * `n3`: the fourth variable; the bits are extracted as `(val RSHIFT 12) BAND 0x0F`

## `swap`

* `swap var0, var1`: swaps the values of the two variables
  * `var0`: passed by reference; the first variable
  * `var1`: passed by reference; the second variable

## `inc`/`dec`

* `inc var`: increases the value of the specific variable; this is equivalent to `var = var + 1` but simpler
  * `var`: passed by reference; the variable to operate
* `dec var`: decreases the value of the specific variable; this is equivalent to `var = var - 1` but simpler
  * `var`: passed by reference; the variable to operate
