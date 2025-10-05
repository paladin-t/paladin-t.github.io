# Sub Routine

[Prev]() [Next]()

* `gosub lno|lbl|#pg:lno|#pg:lbl`: pushes the execution point to the stack, then performs an unconditional jump to transfer the execution to the specific location
  * objectives:
    * `lno`: line number
    * `lbl`: code line label
    * `#pg:lno`: code page index and line number
    * `#pg:lbl`: code page index and code line label
* `return`: pops the top execution point from the stack, then returns the execution to the point

Sub example:

```basic
gosub elsewhere
print "Went back"
end

elsewhere:
  print "Went elsewhere"
  return ' Go back.
```
<!-- prg
!edit, run, title="<code>gosub</code> and <code>return</code>", style=""
gosub elsewhere
print "Went back"
end

elsewhere:
  print "Went elsewhere"
  return ' Go back.
-->

**See also:** _[Lookup Priority of Labeled Destination](https://paladin-t.github.io/kits/gbb/manual.html#lookup-priority-of-labeled-destination)._
