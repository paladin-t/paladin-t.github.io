/**< Chatbot. */
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
    words = words
      .replaceAll('\n', '')
      .replaceAll('&emsp;', '')
      .replaceAll('&ensp;', '');
    var open = words.indexOf('<');
    var close = words.lastIndexOf('>');
    if (open >= 0 && close >= 0) {
      open = words.substr(0, open);
      close = words.substr(close + 1);
      words = open + close;
    }
    setTimeout(function () {
      window.Speech.say(words);
    }, 500);
  } catch (ex) {
    console.warn('Speech error:\n  ' + ex.toString());
  }
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
    window.Speech && window.Speech.setup();

    if (req == 'mute')
      mute = true;
    else if (req == 'unmute')
      mute = false;
    words += rsp + ' ';

    rsp = rsp.replace('\n', '<br>');
    setTimeout(function () {
      output.innerHTML += 'Bot: ' + rsp + '<br>';
      output.scrollTop = output.scrollHeight;
    }, 500);
  });

  if (!mute && window.Speech)
    say(words);
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

/**< Show more buttons. */
function toggle (btn_id, more_id) {
  var more = document.getElementById(more_id);
  var btn = document.getElementById(btn_id);
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
