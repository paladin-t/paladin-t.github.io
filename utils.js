if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      if (this == null)
        throw new TypeError('"this" is null or not defined.');
      if (typeof predicate !== 'function')
        throw new TypeError('Predicate must be a function.');

      var obj = Object(this);
      var len = obj.length >>> 0;
      var self = arguments[1];
      var i = 0;
      while (i < len) {
        var val = obj[i];
        if (predicate.call(self, val, i, obj))
          return val;
        ++i;
      }

      return undefined;
    }
  });
}
