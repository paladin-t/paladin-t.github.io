(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    factory(exports);
  } else {
    factory(root.Bot = { });
  }
} (this, function (exports) {
  function split (request) {
    return request
      .replace(/[^\w\s]/gi, ' ')
      .split(' ')
      .filter(function (word) {
        return word != '';
      });
  }

  function alias (patterns, alias) {
    var pattern = patterns
      .find(function (pattern) {
        return pattern.request.toString() == alias.toString();
      });

    return pattern;
  }

  function match (words, pattern) {
    if (words.length == 0)
      return false;

    words = words
      .map(function (word) {
        return word.toLowerCase();
      });
      
    var matched = words
      .reduce(function (matched, word) {
        if (word == pattern[matched])
          return matched + 1;

        return matched;
      }, 0);

    return matched == pattern.length;
  }

  function Bot () {
    this.userName == null;
    this.nextFailureHandler = null;

    this.patterns = [ ];
    this.posted = null;
  }
  Bot.prototype.getUserName = function (name) {
    return this.userName;
  };
  Bot.prototype.setUserName = function (name) {
    this.userName = name;

    return this;
  };
  Bot.prototype.getNextFailureHandler = function () {
    return this.nextFailureHandler;
  };
  Bot.prototype.setNextFailureHandler = function (handler) {
    this.nextFailureHandler = handler;

    return this;
  };
  Bot.prototype.learn = function (pattern) {
    this.patterns.push({
      request: pattern.request,
      response: pattern.response,
      callback: pattern.callback,
      alias: pattern.alias
    });

    return this;
  };
  Bot.prototype.think = function (request, output) {
    if (typeof(request) != 'string' || request == '')
      return this;

    var words = split(request);
    var candidates = [ ];
    this.patterns.forEach(function (pattern) {
      if (match(words, pattern.request)) {
        candidates.push({
          words: words,
          pattern: pattern
        });
      }
    }.bind(this));

    if (candidates.length == 0) {
      var fail = this.getNextFailureHandler();
      if (fail) {
        candidates.push({
          words: words,
          pattern: {
            request: fail.request,
            response: fail.response,
            callback: fail.callback,
            alias: fail.alias
          }
        });
        this.setNextFailureHandler(null);
      } else {
        try {
          var evaluated = eval(request);
          candidates.push({
            words: words,
            pattern: {
              response: [ evaluated.toString() ]
            }
          });
        } catch (_) {
          candidates.push({
            words: words,
            pattern: {
              response: [ 'There is as yet insufficient data for a meaningful answer.' ],
              callback: function (bot, words) {
                var key = request;
                bot.post(
                  'Would you like to search "' + key + '" on the internet?\n&emsp;' +
                  '<a href="' + 'https://google.com/search?q=' + key + '" target="_blank">Google</a>' + '&ensp;|&ensp;' +
                  '<a href="' + 'https://bing.com/search?q=' + key + '" target="_blank">Bing</a>' + '&ensp;|&ensp;' +
                  '<a href="' + 'https://duckduckgo.com/?q=' + key + '" target="_blank">DuckDuckGo</a>' + '&ensp;|&ensp;' +
                  '<a href="' + 'https://www.wolframalpha.com/input/?i=' + key + '" target="_blank">Wolfram</a>'
                );
              }
            }
          });
        }
      }
    } else {
      candidates
        .sort(function (left, right) {
          return left.words.length > right.words.length;
        });
    }
    var matched = candidates[0];
    var ret = matched.pattern;
    if (!ret.response && ret.alias)
      ret = alias(this.patterns, ret.alias);
    if (!ret.response)
      throw 'Invalid pattern: ' + ret.request.toString() + '.';

    var rsp = ret.response;
    if (Array.isArray(rsp))
      rsp = rsp[Math.floor(Math.random() * rsp.length)];

    if (ret.callback)
      ret.callback(this, matched.words, output);
    output(this.escape(rsp));

    if (this.posted) {
      this.posted.forEach(function (posted) {
        output(this.escape(posted));
      }.bind(this));
    }
    this.posted = null;

    return this;
  };
  Bot.prototype.post = function (message) {
    if (!this.posted)
      this.posted = [ ];
    this.posted.push(message);

    return this;
  };
  Bot.prototype.escape = function (message) {
    if (this.getUserName())
      message = message.replace('{USER_NAME}', this.getUserName());

    return message;
  };

  exports.Bot = Bot;
}));
