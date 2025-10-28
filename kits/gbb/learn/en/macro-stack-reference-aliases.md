# Macro Stack Reference Aliases

[Prev]() [Next]()

* `def ... = stack0|stack1|...|stackN`: defines a stack reference with an alias, i.e. `def meaningful = stack0`

Unlike variable or array declaration, the stack reference definition doesn't allocate any memory space.

By default, `stack` references defined by `def ... = stackN`, like other symbols, are defined in the global scope. Additionally, GB BASIC supports defining local lexical scopes using `begin def/end def`, where a `def ... = stackN` reference is only valid within that specific scope. See the [Macro Scope](macro-scope.html) section for detail.

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="stack-operations.html" class="nav-link">Stack Operations</a>, and <a href="the-memory-model.html" class="nav-link">The Memory Model</a>.
  </span>
</div>
