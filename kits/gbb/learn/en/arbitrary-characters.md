# Arbitrary Characters

[Prev]() [Next]()

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    This section is optional. Read it carefully when you need to dynamically represent text via GB BASIC's arbitrary character code points.
  </span>
</div>

In statements such as `label` and `menu`, numeric codes can be dynamically treated as characters using the `"%c"` placeholder, in addition to string literals. This encoding defaults to extended ASCII (0–255) defined in a font asset. Within the font editor, Characters for indices 0–255 can be modified, or arbitrary characters added within specified ranges.

## Escaping Numbers to Characters

Numbers can be used to dynamically replace `"%c"` in a string with a character. To save ROM space, a font asset supports around 4000 arbitrary characters at most. If you need more, consider splitting into multiple font assets. Conversely, this means the number representing a character is not an ASCII or Unicode code, but a local arbitrary index within the font asset. That is, in code we write a number (a.k.a. arbitrary index), and GB BASIC looks up the corresponding glyph via its codepoint from the font asset and compiles it into the final ROM.

## Editing Arbitraries

Click the "Arbitrary" button at the right-bottom of the font editor's tool panel to open the arbitrary editor for the font asset page. In this editor, characters are entered via Unicode escape sequences, such as `"\u963F"` etc. Under the "Basic" tab, you can specify characters for indices 0–255.

<img src="imgs/editor-font-arbitrary-basic.png" class="diagram-image diagram-screenshot">

<div class="small-note">Basic font arbitrary</div>

Under the "Ranges" tab, you can specify wider ranges or choose from preset ranges. Note that this tab does not show the specific values of arbitrary indices. To export a complete character information table for "Basic" and "Ranges", click "Arbitrary Mapping" or "Arbitrary Mapping File..." in the font editor's export menu.

<img src="imgs/editor-font-arbitrary-ranges.png" class="diagram-image diagram-screenshot">

<div class="small-note">Font arbitrary ranges</div>

## API

In programming, the following statements map characters to the character codes (arbitrary indices) compatible with `"%c"`.

* `=arb(ch)`: gets the arbitrary index of the specific character in the first font asset
  * `ch`: the character to address
  * returns the arbitrary index
* `=arb(#pg|"{name}", ch)`: gets the arbitrary index of the specific character defined in a font asset
  * parameter details:
    * `#pg`: font page index
    * `name`: font asset name
  * `ch`: the character to address
  * returns the arbitrary index

Try the following project, which demonstrates how to work with arbitraries.

```basic
map on
def label(0, 0, 7, 2, 65) = MAP_LAYER, 0, 0, 0
label #1,       _ ' Use font #1.
  "%c%c呀",     _ ' Two %c placeholders and a character literal.
  289,          _ ' Arbitrary index constant.
  arb(#1, "好")   ' Getting arbitrary index with `arg(...)`.
```
<!-- prg
!edit, run, title="Using arbitrary", style=""
url://prgs/arbitrary-1.txt
-->
