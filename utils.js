if (!String.prototype.replaceAll) {
  Object.defineProperty(String.prototype, 'replaceAll', {
    value: function (search, replace) {
      return this.split(search).join(replace);
    }
  });
}

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

if (!Float32Array.prototype.concat) {
  Object.defineProperty(Float32Array.prototype, 'concat', {
    value: function () {
      var bytesPerIndex = 4;
      var buffers = Array.prototype.slice.call(arguments);

      buffers.unshift(this);

      buffers = buffers
        .map(function (item) {
          if (item instanceof Float32Array) {
            return item.buffer;
          } else if (item instanceof ArrayBuffer) {
            if (item.byteLength / bytesPerIndex % 1 !== 0)
              throw new Error('One of the ArrayBuffers is not from a Float32Array.');

            return item;
          } else {
            throw new Error('You can only concat Float32Array, or ArrayBuffers.');
          }
        });

      var concatenatedByteLength = buffers
        .map(function (a) { return a.byteLength; })
        .reduce(function (a, b) { return a + b; }, 0);

      var concatenatedArray = new Float32Array(concatenatedByteLength / bytesPerIndex);

      var offset = 0;
      buffers.forEach(function (buffer) {
        concatenatedArray.set(new Float32Array(buffer), offset);
        offset += buffer.byteLength / bytesPerIndex;
      });

      return concatenatedArray;
    }
  });
}
