# Using Unicode Strings

[Prev]() [Next]()

GB BASIC strives to fully support Unicode, including its use in comments, variables or other identifiers, strings, and more. A special feature is its support for both literal and escape sequence representations of Unicode within strings. This section illustrates this feature with an example.

```basic
map on
def label(0, 0, 8, 2, 65) = MAP_LAYER, 2, 0, 0 ' Takes tile indices from 65 to 79.
label #0, "Unicode Test"

window on
window 7, 111
load dialog(2, 0, 16, 4, 1) = _                ' Takes tile indices from 1 to 64.
  #0,                         _                ' Fill the label background with border.
  WINDOW_LAYER, 2, 2, 10

label #0, "\u0048\u0065\u006c\u006c\u006f\u0020\u0057\u006f\u0072\u006c\u0064"
label #0, "\u4f60\u597d\u4e16\u754c"
label #0, "\u3053\u3093\u306b\u3061\u306f\u4e16\u754c"
label #0, "\u041f\u0440\u0438\u0432\u0435\u0442\u002c\u0020\u043c\u0438\u0440"
label #0, "\u0054\u0065\u0073\u0074\u0020\u00e1\u00e9\u00ed\u00f3\u00fa\u00fc %d...\f", 42
for i = 111 to 144
  window 7, i
next
label #0, "\r";
for i = 144 to 111 step -1
  window 7, i
next
label #0, "Hello\nWorld"
label #0, "你好世界"
label #0, "こんにちは世界"
label #0, "Привет, мир\f";
label #0, "Test áéíóúü %d", 42
```
<!-- prg
!edit, run, title="Unicode demo", style=""
url://prgs/unicode-1.txt
-->

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="output.html" class="nav-link">Output</a> escapes.
  </span>
</div>
