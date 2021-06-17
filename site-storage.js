(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    factory(exports);
  } else {
    factory(root.SiteStorage = { });
  }
} (this, function (exports) {
  var SiteStorage = {
    get: function (key, default_) {
      if (typeof(localStorage) == 'undefined')
        return default_;

      return localStorage.getItem(key);
    },
    set: function (key, val) {
      if (typeof(localStorage) == 'undefined')
        return;

      localStorage.setItem(key, val);
    }
  };

  exports.SiteStorage = SiteStorage;
}));
