# Jumps and Labels

[Prev]() [Next]()

* `goto lno|lbl|#pg:lno|#pg:lbl`: performs an unconditional jump to transfer the execution to the specific location
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label

Jump example:

```basic
goto elsewhere
print "Went back" ' This line will not be executed.
end

elsewhere:
  print "Went elsewhere"
  ' Not going back.
```
<!-- prg
!edit, run, title="<code>goto</code>", style=""
goto elsewhere
print "Went back" ' This line will not be executed.
end

elsewhere:
  print "Went elsewhere"
  ' Not going back.
-->

**See also:** _[Lookup Priority of Labeled Destination](https://paladin-t.github.io/kits/gbb/manual.html#lookup-priority-of-labeled-destination)._
