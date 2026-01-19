# Serial Communication

[Prev]() [Next]()

## Using the Feature

The serial communication module is integrated into the Game Boy console and does not require special cartridge hardware. By using this feature, you can implement data communication functions such as versus battles, item transfers, etc.

Try the following example. Use emulator instances or a pair of devices to test this program.

```basic
serial on
let a = 1
let b = 0
print "A to send"
print "B to receive"

loop:
  if btnu(A_BTN) then ' Press A to send.
    b = swrite a
    print "Send: %d", b
    a = a + 1
  else if btnu(B_BTN) then ' Press B to receive.
    b = sread
    print "Recv: %d", b
  end if
  update
  goto loop
```
<!-- prg
!edit, run, title="Serial Communication", style=""
url://prgs/serial-1.txt
-->

## API

* `serial on`: turns on the serial port
* `serial off`: turns off the serial port

* `=sread(wait = true)`: reads one byte from the serial port
  * `wait`: `true` to wait if the program is in the receiving state, `false` to return immediately
  * returns the read byte or `SERIAL_ERROR` (for sending, error) when `wait` is `true`; otherwise returns the read byte or `SERIAL_BUSY` (for receiving) or `SERIAL_ERROR` (for sending, error) in "Serial statuses"
* `=swrite(val, wait = true)`: writes one byte to the serial port
  * `val`: the byte to write
  * `wait`: `true` to wait if the program is in the sending state, `false` to return immediately
  * returns the written byte or `SERIAL_ERROR` (for receiving, error) when `wait` is `true`; otherwise returns the written byte or `SERIAL_BUSY` (for sending) or `SERIAL_ERROR` (for receiving, error) in "Serial statuses"

| Serial statuses | Note                                            |
|-----------------|-------------------------------------------------|
| `SERIAL_IDLE`   | The serial device is ready for operation        |
| `SERIAL_BUSY`   | The serial device is busy doing operation       |
| `SERIAL_ERROR`  | The serial device got error with some operation |

**See also**: <a class="nav-link" href="https://gbdev.io/pandocs/Serial_Data_Transfer_(Link_Cable).html" target="_blank">Serial Data Transfer (Link Cable) <i class="fa-solid fa-up-right-from-square"></i></a>.
