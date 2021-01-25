// Donate.
(function () {
  var oneOff = document.getElementById('one-off-donation');
  oneOff.onload = function () {
    oneOff.style.height = (oneOff.contentWindow.document.body.scrollHeight + 20) + 'px';
  };
  var periodical = document.getElementById('periodical-donation');
  periodical.onload = function () {
    periodical.style.height = (periodical.contentWindow.document.body.scrollHeight + 20) + 'px';
  };
  document.body.onresize = function () {
    oneOff.style.height = (oneOff.contentWindow.document.body.scrollHeight + 20) + 'px';
    periodical.style.height = (periodical.contentWindow.document.body.scrollHeight + 20) + 'px';
  };
})();
