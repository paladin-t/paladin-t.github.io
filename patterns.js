(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    factory(exports);
  } else {
    factory(root.Patterns = { });
  }
} (this, function (exports) {
  function setUserName (bot, matched) {
    bot.setUserName(matched[matched.length - 1]);
    bot.post('Call me Toby.');
  }

  var patterns = [
    {
      request: [ 'greetings' ],
      response: [ 'Hi.', 'Hello.' ],
      callback: function (bot) {
        if (!bot.getUserName()) {
          bot.setNextFailureHandler({
            response: [ 'Nice to meet you {USER_NAME}.' ],
            callback: setUserName
          });
          bot.post('What\'s your name?');
        }
      }
    },
    {
      request: [ 'hi' ],
      alias: [ 'greetings' ]
    },
    {
      request: [ 'hello' ],
      alias: [ 'greetings' ]
    },
    {
      request: [ 'how', 'do', 'you', 'do' ],
      alias: [ 'greetings' ]
    },

    {
      request: [ 'what', 'your', 'name' ],
      response: [ 'Call me Toby.', 'I\'m Toby.' ]
    },

    {
      request: [ 'my', 'name' ],
      response: [ 'Nice to meet you {USER_NAME}.' ],
      callback: setUserName
    },
    {
      request: [ 'call', 'me' ],
      alias: [ 'my', 'name' ]
    },

    {
      request: [ 'contact', 'tony' ],
      response: [ 'His email is:\n&emsp;<img src="imgs/mailto.png">' ],
      callback: function (bot) {
        bot.post(
          'You can also see:\n&emsp;' +
          '<a href="https://store.steampowered.com/developer/tony" target="_blank">Steam</a>' + '&ensp;|&ensp;' +
          '<a href="https://tonywang.itch.io/" target="_blank">Itch</a>' + '&ensp;|&ensp;' +
          '<a href="https://twitter.com/wangrenxin" target="_blank">Twitter</a>' + '&ensp;|&ensp;' +
          '<a href="https://github.com/paladin-t" target="_blank">GitHub</a>'
        );
      }
    },
    {
      request: [ 'contact', 'developer' ],
      alias: [ 'contact', 'tony' ]
    },
    {
      request: [ 'tony', 'email' ],
      alias: [ 'contact', 'tony' ]
    },

    {
      request: [ 'homepage' ],
      response: [ '<a href="https://paladin-t.github.io/" target="_blank">Homepage</a>' ]
    },
    {
      request: [ 'website' ],
      alias: [ 'homepage' ]
    },

    {
      request: [ 'steam' ],
      response: [ '<a href="https://store.steampowered.com/developer/tony" target="_blank">Steam</a>' ]
    },
    {
      request: [ 'itch' ],
      response: [ '<a href="https://tonywang.itch.io/" target="_blank">Itch</a>' ]
    },
    {
      request: [ 'twitter' ],
      response: [ '<a href="https://twitter.com/wangrenxin" target="_blank">Twitter</a>' ]
    },
    {
      request: [ 'github' ],
      response: [ '<a href="https://github.com/paladin-t" target="_blank">GitHub</a>' ]
    },

    {
      request: [ 'support', 'tony' ],
      response: [
        'Tony makes games and tools, you can support him by buying or downloading them from:\n&emsp;' +
        '<a href="https://store.steampowered.com/developer/tony" target="_blank">Steam</a>' + '&ensp;|&ensp;' +
        '<a href="https://tonywang.itch.io/" target="_blank">Itch</a>'
      ],
      callback: function (bot) {
        bot.post(
          'Also follow him for future creations:\n&emsp;' +
          '<a href="https://twitter.com/wangrenxin" target="_blank">Twitter</a>'
        );
      }
    },
    {
      request: [ 'support', 'you' ],
      alias: [ 'support', 'tony' ]
    },
    {
      request: [ 'support', 'development' ],
      alias: [ 'support', 'tony' ]
    },
    {
      request: [ 'support', 'developer' ],
      alias: [ 'support', 'tony' ]
    },

    {
      request: [ 'what', 'tony', 'doing' ],
      response: [ 'Couldn\'t tell much for Tony\'s next step, but he\'s been keeping motivated to make more interesting things.' ],
      callback: function (bot) {
        bot.post(
          'Follow him for future creations:\n&emsp;' +
          '<a href="https://store.steampowered.com/developer/tony" target="_blank">Steam</a>' + '&ensp;|&ensp;' +
          '<a href="https://tonywang.itch.io/" target="_blank">Itch</a>' + '&ensp;|&ensp;' +
          '<a href="https://twitter.com/wangrenxin" target="_blank">Twitter</a>'
        );
      }
    },
    {
      request: [ 'what', 'making' ],
      alias: [ 'what', 'tony', 'doing' ]
    },
    {
      request: [ 'what', 'developing' ],
      alias: [ 'what', 'tony', 'doing' ]
    },
    {
      request: [ 'what', 'next' ],
      alias: [ 'what', 'tony', 'doing' ]
    },
  ];

  exports.patterns = patterns;
}));
