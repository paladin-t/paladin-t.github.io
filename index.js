// Chatbot.
(function () {
  var button = document.getElementById('send');
  var input = document.getElementById('message');
  var output = document.getElementById('output-box');

  var muted = false;
  var bot = new Bot.Bot();
  Patterns.patterns.forEach(function (pattern) {
    bot.learn(pattern);
  });

  function mute () {
    muted = true;
  }

  function unmute () {
    muted = false;
  }

  function say (words) {
    try {
      if (words === null)
        words = 'null';
      else if (words === undefined)
        words = 'undefined';
      else if (typeof words != 'string')
        words = eval(words).toString();
      words = words
        .replaceAll('\'', '')
        .replaceAll('\"', '')
        .replaceAll('\n', '')
        .replaceAll('&emsp;', '')
        .replaceAll('&ensp;', '');
      while (true) {
        var open = words.indexOf('<');
        var close = open >= 0 ? words.indexOf('>', open + 1) : -1;
        if (open < 0 || close < 0)
          break;
        open = words.substr(0, open);
        close = words.substr(close + 1);
        words = open + ' ' + close;
      }
      setTimeout(function () {
        if (typeof Sam != 'undefined')
          Sam.sam.say(words);
      }, 500);
    } catch (ex) {
      console.warn('Speech synthesis error:\n  ' + ex.toString());
    }

    return words;
  }

  function send (req, think) {
    if (!req)
      req = input.value;
    if (!think)
      think = bot.think.bind(bot);
    if (!req || req.length == 0)
      return;

    output.innerHTML += '<br>You: ' + req + '<br>';
    output.scrollTop = output.scrollHeight;
    input.value = '';

    var words = '';
    think(req, function (rsp) {
      if (typeof Sam != 'undefined')
        Sam.sam.setup();

      if (req == 'mute')
        mute();
      else if (req == 'unmute')
        unmute();
      words += rsp + ' ';

      rsp = rsp.replaceAll('\n', '<br>');
      setTimeout(function () {
        output.innerHTML += 'Bot: ' + rsp + '<br>';
        output.scrollTop = output.scrollHeight;
      }, 500);
    });

    if (!muted && typeof Sam != 'undefined')
      say(words);
  }

  function clear () {
    output.innerHTML = '';

    return 'Okey.';
  }

  button.onclick = function () {
    send();
  };
  input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      send();
    }
  });
  window.enableSpeechInput = function () {
    var failed = function () {
      var msg = 'Speech recognition is not supported by your browser.';
      output.innerHTML += '<br>Bot: ' + msg + '.<br>';
      output.scrollTop = output.scrollHeight;

      say(msg);
    };
    var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      failed();

      return;
    }

    try {
      var recognition = new Recognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.maxAlternatives = 10;
      var GrammerList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
      if (GrammerList) {
        var KEYWORDS = [
          'tony', 'toby', 'chengdu',
          'contact', 'support'
        ];
        var speechRecognitionList = new GrammerList();
        var grmr = '';
        KEYWORDS.forEach(function (val, i) {
          grmr += val;
          if (i != KEYWORDS.length - 1)
            grmr += ' | ';
        });
        speechRecognitionList.addFromString(grmr, 1);
        recognition.grammars = speechRecognitionList;
      }
      recognition.addEventListener('end', () => {
        recognition.start();
        console.log('Restart listening.');
      });
      recognition.addEventListener('result', function (event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          var identificated = event.results[i][0].transcript;
          console.error('Got: ' + identificated);
          send(identificated);
        }
        recognition.stop();
      });
      recognition.start();
      console.log('Start listening.');
      output.innerHTML += '<br>Bot: I am lisening.<br>';
      output.scrollTop = output.scrollHeight;
      // speechSynthesis.speak(new SpeechSynthesisUtterance('I am listening.'));
      // say('I am lisening.');

      window.enableSpeechInput = function () {
        output.innerHTML += '<br>Bot: I am lisening.<br>';
        output.scrollTop = output.scrollHeight;
      };
    } catch (ex) {
      failed();

      console.warn('Speech recognition error:\n  ' + ex.toString());
    }
  };
  output.innerHTML += 'Tony: ';
  output.innerHTML += 'You can chat with my agent bot here, ';
  output.innerHTML += 'i.e. enter "How to contact Tony?" to get my email address, ';
  output.innerHTML += 'or try whatever you want. ';
  output.innerHTML += 'Click to <a class="link" onclick="enableSpeechInput()">enable speech input</a>. ';
  output.innerHTML += 'Also click to <a href="message.html">leave a message</a>.<br>';

  window.mute = mute;
  window.unmute = unmute;
  window.say = say;
  window.clear = clear;
})();

// Show more buttons.
(function () {
  function toggle (btnId, moreId) {
    var more = document.getElementById(moreId);
    var btn = document.getElementById(btnId);
    btn.onclick = function () {
      if (!more.style.display || more.style.display === 'inline-block') {
        more.style.display = 'inline';
        btn.innerHTML = 'Show less';
      } else {
        more.style.display = 'inline-block';
        btn.innerHTML = 'Show more...';
      }
    };
  }

  toggle('toggle-tiny', 'more-tiny');
})();
