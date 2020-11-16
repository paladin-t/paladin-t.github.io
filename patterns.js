(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    factory(exports);
  } else {
    factory(root.Patterns = { });
  }
} (this, function (exports) {
  var homepage = '<a href="https://paladin-t.github.io/" target="_blank">Homepage</a>';
  var steam = '<a href="https://store.steampowered.com/developer/tony" target="_blank">Steam</a>';
  var itch = '<a href="https://tonywang.itch.io/" target="_blank">Itch</a>';
  var twitter = '<a href="https://twitter.com/wangrenxin" target="_blank">Twitter</a>';
  var github = '<a href="https://github.com/paladin-t" target="_blank">GitHub</a>';
  var rss = '<a href="https://paladin-t.github.io/feed.xml" target="_blank" class="label" style="display: inline; color: white;">RSS</a>';
  function search (key) {
    return '<a href="' + 'https://google.com/search?q=' + key + '" target="_blank">Google</a>' + '&ensp;|&ensp;' +
      '<a href="' + 'https://bing.com/search?q=' + key + '" target="_blank">Bing</a>' + '&ensp;|&ensp;' +
      '<a href="' + 'https://duckduckgo.com/?q=' + key + '" target="_blank">DuckDuckGo</a>' + '&ensp;|&ensp;' +
      '<a href="' + 'https://www.wolframalpha.com/input/?i=' + key + '" target="_blank">Wolfram</a>';
  }

  function setUserName (bot, matched) {
    bot.setNextFailureHandler(null);
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
      request: [ 'hola' ],
      alias: [ 'greetings' ]
    },
    {
      request: [ 'bonjour' ],
      alias: [ 'greetings' ]
    },
    {
      request: [ 'ciao' ],
      alias: [ 'greetings' ]
    },

    {
      request: [ 'bye' ],
      response: [ 'I\'ll be back.\n&emsp;<img src="imgs/bot/iwillbeback.jpg" width="118" height="118" style="border-radius: 6px;">' ]
    },
    {
      request: [ 'byebye' ],
      alias: [ 'bye' ]
    },
    {
      request: [ 'see', 'you' ],
      alias: [ 'bye' ]
    },

    {
      request: [ 'thank' ],
      response: [ 'Anytime.' ]
    },
    {
      request: [ 'thanks' ],
      alias: [ 'thank' ]
    },

    {
      request: [ 'ok' ],
      response: [ 'Well...' ]
    },
    {
      request: [ 'okey' ],
      alias: [ 'ok' ]
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
      request: [ 'i', 'am' ],
      alias: [ 'my', 'name' ]
    },
    {
      request: [ 'i', 'm' ],
      alias: [ 'my', 'name' ]
    },

    {
      request: [ 'nice', 'meet', 'you' ],
      response: [ 'Welcome to look around.' ]
    },

    {
      request: [ 'who', 'you' ],
      response: [ 'I\'m possibly the minimal rule based chatbot implementation in plain JavaScript.' ],
      callback: function (bot) {
        bot.post('Tony created me.');
      }
    },
    {
      request: [ 'what', 'you', 'do' ],
      alias: [ 'who', 'you' ]
    },
    {
      request: [ 'what', 'your', 'work' ],
      alias: [ 'who', 'you' ]
    },
    {
      request: [ 'what', 'your', 'job' ],
      alias: [ 'who', 'you' ]
    },

    {
      request: [ 'who', 'tony' ],
      response: [ 'Tony is my creator. He makes video games and development tools as an independent developer.' ],
      callback: function (bot) {
        bot.post('He also works as a freelancer sometimes.');
      }
    },
    {
      request: [ 'what', 'tony', 'do' ],
      alias: [ 'who', 'tony' ]
    },
    {
      request: [ 'what', 'your', 'work' ],
      alias: [ 'who', 'tony' ]
    },
    {
      request: [ 'what', 'your', 'job' ],
      alias: [ 'who', 'tony' ]
    },

    {
      request: [ 'where', 'you' ],
      response: [ 'I\'m hosted on the internet and run in your browser.' ]
    },
    {
      request: [ 'where', 'tony' ],
      response: [ 'He\'s from Chengdu.', 'He lives in Chengdu, the land of abundance.' ]
    },
    {
      request: [ 'where', 'chengdu' ],
      response: [ 'It\'s a beautiful city in China.' ],
      callback: function (bot) {
        bot.post(
          'Would you like to search "Chengdu" on the internet?\n&emsp;' +
          search('Chengdu')
        );
      }
    },

    {
      request: [ 'contact', 'tony' ],
      response: [ 'His email is:\n&emsp;<img src="imgs/bot/mailto.png">' ],
      callback: function (bot) {
        bot.post(
          'You can also see:\n&emsp;' +
          steam + '&ensp;|&ensp;' +
          itch + '&ensp;|&ensp;' +
          twitter + '&ensp;|&ensp;' +
          github
        );
        bot.post(
          'Or subscribe to this site:\n&emsp;' +
          rss
        );
      }
    },
    {
      request: [ 'contact', 'developer' ],
      alias: [ 'contact', 'tony' ]
    },
    {
      request: [ 'email', 'tony' ],
      alias: [ 'contact', 'tony' ]
    },
    {
      request: [ 'tony', 'contact' ],
      alias: [ 'contact', 'tony' ]
    },
    {
      request: [ 'developer', 'contact' ],
      alias: [ 'contact', 'tony' ]
    },
    {
      request: [ 'tony', 'email' ],
      alias: [ 'contact', 'tony' ]
    },

    {
      request: [ 'homepage' ],
      response: [ homepage ]
    },
    {
      request: [ 'website' ],
      alias: [ 'homepage' ]
    },

    {
      request: [ 'steam' ],
      response: [ steam ]
    },
    {
      request: [ 'itch' ],
      response: [ itch ]
    },
    {
      request: [ 'twitter' ],
      response: [ twitter ]
    },
    {
      request: [ 'github' ],
      response: [ github ]
    },
    {
      request: [ 'rss' ],
      response: [ rss ]
    },

    {
      request: [ 'support', 'tony' ],
      response: [
        'Tony makes games and tools, you can support him by buying or downloading this or that from:\n&emsp;' +
        steam + '&ensp;|&ensp;' +
        itch
      ],
      callback: function (bot) {
        bot.post(
          'Also follow him for future creations:\n&emsp;' +
          twitter
        );
        bot.post(
          'Or subscribe to this site:\n&emsp;' +
          rss
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
          steam + '&ensp;|&ensp;' +
          itch + '&ensp;|&ensp;' +
          twitter
        );
        bot.post(
          'Or subscribe to this site:\n&emsp;' +
          rss
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

    {
      request: [ 'mute' ],
      response: [ 'Okey.' ]
    },
    {
      request: [ 'unmute' ],
      response: [ 'Okey.' ]
    }
  ];

  exports.patterns = patterns;
}));
