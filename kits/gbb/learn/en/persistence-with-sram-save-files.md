# Persistence with SRAM Save Files

[Prev]() [Next]()

## Using the Feature

You can choose a non-zero size of SRAM to use its persistence feature, or zero to disable it.

<img src="imgs/editor-project-property-sram.png" class="diagram-image diagram-screenshot">

<div class="small-note">Selecting a SRAM option for a project</div>

This feature is only available on a cartridge with an SRAM chip. All the bytes will be set to zero on the first initialization.

| SRAM types | Total size | File count (banks) | Usable size per file |
|------------|------------|--------------------|----------------------|
| 0x00       | 0KB        | 0                  | 0B                   |
| 0x01       | 2KB        | 1                  | 2046B                |
| 0x02       | 8KB        | 1                  | 8190B                |
| 0x03       | 32KB       | 4                  | 8190B                |
| 0x04       | 128KB      | 16                 | 8190B                |

Different SRAM options determine the available storage size and number of banks. In software terms, each SRAM bank is referred to as a handle. For example, a `handle` value of `0` corresponds to SRAM bank 0, `handle` `1` corresponds to SRAM bank 1, and so on.

Try the following example.

```basic
gosub refresh

loop:
  if btnu then gosub refresh
  update
  goto loop

refresh:
  fopen 0             ' Open file 0.
  let a = fread 0, 0  ' Read file 0, at address 0.
  a = a + 1           ' Increase it.
  fwrite 0, 0, a      ' Write it back to file 0, address 0.
  fclose 0            ' Close file 0.
  print "Data: %d", a ' Print the read value.
  return
```
<!-- prg
!edit, run, title="SRAM Persistence", style=""
url://prgs/persistence-1.txt
-->

## API

* `=fopen(handle)`: opens the specific file
  * `handle`: the file number to operate, with range of value determined by "SRAM types"
  * returns `true` for succeeded, otherwise `false`
* `=fclose(handle)`: closes the specific file
  * `handle`: the file number to operate, with range of value determined by "SRAM types"
  * returns `true` for succeeded, otherwise `false`

* `=fread(handle, addr)`: reads one byte from the specific file
  * `handle`: the file number to operate, with range of value determined by "SRAM types"
  * `addr`: the address to read, starts from 0, the length is determined by "SRAM types"
  * returns the read byte, it will return `0` if any error occur
* `=fwrite(handle, addr, val)`: writes one byte to the specific file
  * `handle`: the file number to operate, with range of value determined by "SRAM types"
  * `addr`: the address to read, starts from 0, the length is determined by "SRAM types"
  * `val`: the byte to write
  * returns `true` for succeeded, otherwise `false`

With an opened file, use `memcpy`, `memset` to read or write the file content with the following "SRAM addresses" constants. More specifically, the start address of each file is determined by `FILE_ADDRESS`.

| SRAM addresses | Note                                    |
|----------------|-----------------------------------------|
| `SRAM_ADDRESS` | The start address of SRAM               |
| `FILE_ADDRESS` | The start address of each file (banked) |

**See also**: <a class="nav-link" href="https://gbdev.io/pandocs/Memory_Map.html#external-memory-and-hardware" target="_blank">External Memory and Hardware <i class="fa-solid fa-up-right-from-square"></i></a>.

<!-- gem -->
