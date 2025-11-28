# Serial Communication

[Prev]() [Next]()

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

// TODO
