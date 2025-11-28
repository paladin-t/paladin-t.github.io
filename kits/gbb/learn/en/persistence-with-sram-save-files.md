# Persistence with SRAM Save Files

[Prev]() [Next]()

This feature is only available on a cartridge with an SRAM chip. All the bytes will be set to zero on the first initialization.

| SRAM types | Total size | File count (banks) | Usable size per file |
|------------|------------|--------------------|----------------------|
| 0x00       | 0KB        | 0                  | 0B                   |
| 0x01       | 2KB        | 1                  | 2046B                |
| 0x02       | 8KB        | 1                  | 8190B                |
| 0x03       | 32KB       | 4                  | 8190B                |
| 0x04       | 128KB      | 16                 | 8190B                |

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

// TODO

<!-- gem -->
