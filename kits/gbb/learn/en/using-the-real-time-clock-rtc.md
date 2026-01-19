# Using the Real-Time Clock (RTC)

[Prev]() [Next]()

## Using the Feature

You can enable or disable the RTC feature for a project.

<img src="imgs/editor-project-property-rtc.png" class="diagram-image diagram-screenshot">

<div class="small-note">Toggling the RTC feature for a project</div>

GB BASIC supports RTC module for retrieving real-world time. This feature is only available on a cartridge with an RTC chip.

The `RTC_ENABLED` must be on to use the RTC feature.

Try the following example.

```basic
option RTC_ENABLED, true           ' Enable and start the RTC feature.
option RTC_START, true
print "Press to refresh..."
gosub refresh

loop:
  if btnu then gosub refresh
  update
  goto loop

refresh:
  option RTC_LATCH, 0              ' Toggle the latch to read the time.
  option RTC_LATCH, 1

  print " Day: %d", query(RTC_DAY) ' Query day.

  print "Time: ";

  let hr = query(RTC_HR)           ' Query hour.
  if hr < 10 then print "0";
  print hr;
  print ":";

  let mi = query(RTC_MIN)          ' Query minute.
  if mi < 10 then print "0";
  print mi;
  print ":";

  let sec = query(RTC_SEC)         ' Query second.
  if sec < 10 then print "0";
  print sec

  return
```
<!-- prg
!edit, run, title="RTC", style=""
url://prgs/rtc-1.txt
-->

## API

The RTC feature does not have a dedicated API; access to this functionality is achieved through the `query` and `option` statements of the [Device](device.html) module.

* `=option(what, val)`: sets a device setting
  * `what`: the setting type; can be one of the following "Option keys" constants
  * `val`: the option value, with data type determined by "Option keys"

| Option keys   | Value type               | Default value       | Note                                                   |
|---------------|--------------------------|---------------------|--------------------------------------------------------|
| `RTC_SEC`     | Integer (8-bit unsigned) | Determined by clock | Select the second state of the RTC device for writing  |
| `RTC_MIN`     | Integer (8-bit unsigned) | Determined by clock | Select the minute state of the RTC device for writing  |
| `RTC_HR`      | Integer (8-bit unsigned) | Determined by clock | Select the hour state of the RTC device for writing    |
| `RTC_DAY`     | Integer (8-bit unsigned) | Determined by clock | Select the day state of the RTC device for writing     |
| `RTC_ENABLED` | Integer (8-bit unsigned) | `false`             | Select the enabled state of the RTC device for writing |
| `RTC_START`   | Integer (8-bit unsigned) | Determined by clock | Select the start state of the RTC device for writing   |
| `RTC_LATCH`   | Integer (8-bit unsigned) | Determined by clock | Select the latch state of the RTC device for writing   |

* `=query(what)`: queries a device setting
  * `what`: the status type; can be one of the following "Query keys" constants

| Query keys | Value type               | Default value       | Note                                                  |
|------------|--------------------------|---------------------|-------------------------------------------------------|
| `RTC_SEC`  | Integer (8-bit unsigned) | Determined by clock | Select the second state of the RTC device for reading |
| `RTC_MIN`  | Integer (8-bit unsigned) | Determined by clock | Select the minute state of the RTC device for reading |
| `RTC_HR`   | Integer (8-bit unsigned) | Determined by clock | Select the hour state of the RTC device for reading   |
| `RTC_DAY`  | Integer (8-bit unsigned) | Determined by clock | Select the day state of the RTC device for reading    |

**See also**: <a class="nav-link" href="https://gbdev.io/pandocs/MBC3.html#a000-bfff---rtc-register-08-0c-readwrite" target="_blank">MBC3 <i class="fa-solid fa-up-right-from-square"></i></a>.
