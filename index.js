// Chatbot.
(function () {
  var button = document.getElementById('send');
  var input = document.getElementById('message');
  var output = document.getElementById('output-box');

  var mute = false;
  var bot = new Bot.Bot();
  Patterns.patterns.forEach(function (pattern) {
    bot.learn(pattern);
  });

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
        Sam && Sam.sam && Sam.sam.say(words);
      }, 500);
    } catch (ex) {
      console.warn('Speech error:\n  ' + ex.toString());
    }

    return words;
  }

  function send () {
    var req = input.value;
    if (!req || req.length == 0)
      return;

    output.innerHTML += '<br>You: ' + req + '<br>';
    output.scrollTop = output.scrollHeight;
    input.value = '';

    var words = '';
    bot.think(req, function (rsp) {
      Sam && Sam.sam && Sam.sam.setup();

      if (req == 'mute')
        mute = true;
      else if (req == 'unmute')
        mute = false;
      words += rsp + ' ';

      rsp = rsp.replaceAll('\n', '<br>');
      setTimeout(function () {
        output.innerHTML += 'Bot: ' + rsp + '<br>';
        output.scrollTop = output.scrollHeight;
      }, 500);
    });

    if (!mute && Sam && Sam.sam)
      say(words);
  }

  function clear () {
    output.innerHTML = '';

    return 'Okey.';
  }

  button.onclick = send;
  input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      send();
    }
  });
  output.innerHTML += 'Tony: ';
  output.innerHTML += 'You can also chat with my agent bot, ';
  output.innerHTML += 'or get my contact information from him. ';
  output.innerHTML += 'He\'s been doing a good job, although he\'s a bit of a martinet.<br>';

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
