// Font.
function toggleFont() {
  var pixelFont = SiteStorage.SiteStorage.get('pixel_font', 'false');
  var font = document.getElementById('font');
  var set = function () {
    var style = pixelFont == 'false' ? 'font: 16px Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace, sans-serif;' : '';
    var content = document.getElementById('article-content');
    if (content)
      content.style = style;
    for (var i = 0; i < 999; ++i) {
      var comment = document.getElementById('article-comment-' + i.toString());
      if (!comment)
        break;
      comment.style = style;
    }
    var codes = document.getElementsByTagName('code');
    for (var i in codes)
      codes[i].style = style;
  };
  set();
  font.onclick = function () {
    if (pixelFont == 'true')
      pixelFont = 'false';
    else
      pixelFont='true';
    set();
    SiteStorage.SiteStorage.set('pixel_font', pixelFont);
  };
}
