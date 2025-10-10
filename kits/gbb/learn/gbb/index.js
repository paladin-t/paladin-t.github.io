/*
** GB BASIC
** Copyright (C) 2023 - 2025 Tony Wang, all rights reserved
** Learn more: https://paladin-t.github.io/kits/gbb/
*/

/**< The location parser class. */

class LocationParser {
  #isApp = false;
  #protocol = null;
  #host = null;
  #ports = null;
  #search = null;
  #args = null;

  get isApp() {
    return this.#isApp;
  }
  get protocol() {
    return this.#protocol;
  }
  get host() {
    return this.#host;
  }
  get ports() {
    return this.#ports;
  }

  constructor(servers) {
    this.#isApp = window.location.protocol == 'file:';

    if (this.#isApp) {
      this.#protocol = servers?.[0];
      this.#host = servers?.[1];
      this.#ports = [ servers?.[2], servers?.[3] ];
    } else {
      this.#protocol = window.location.protocol;
      const sepIdx = window.location.host.indexOf(':');
      this.#host = sepIdx >= 0 ? window.location.host.substring(0, sepIdx) : window.location.host;
    }

    this.#search = window.location.search || ''
    let args = this.#search || ''
    if (args && args[0] == '?') args = args.substr(1)

    this.#args = { };
    if (args != '') {
      const parts = args.split('&');
      parts.forEach((part) => {
        const kv = part.split('=');
        this.#args[kv[0]] = kv[1];
      });
    }
  }

  get(key) {
    if (!(key in this.#args))
      return null;

    return this.#args[key];
  }
  getString(key) {
    let val = this.get(key);
    if (!val)
      return null;

    return val;
  }
  getBool(key) {
    let val = this.get(key);
    if (!val)
      return false;

    val = val.toLowerCase();

    return val == 'true' || val == 'yes';
  }
  getInteger(key) {
    let val = this.get(key);
    if (!val)
      return null;

    return parseInt(val);
  }
  getFloat(key) {
    let val = this.get(key);
    if (!val)
      return null;

    return Number.parseFloat(val);
  }
  getJson(key) {
    let val = this.get(key);
    if (!val)
      return null;

    return JSON.parse(val);
  }
}

/**< Initialize the module. */

// Show the loading suggestion.
if (window.location.protocol == 'file:') {
  const suggestion = document.getElementById('loading-suggestion');
  suggestion.style.display = 'block';
  suggestion.innerHTML = 'Recommend accessing via a local or cloud HTTP server rather than double-clicking the file for full functionality.';
} else {
  document.getElementById('loading-suggestion').remove();
}

// Parse the parameters.
const params = new LocationParser(null);

// Initialize the module.
const canvas = document.getElementById('canvas');
const spinner = document.getElementById('spinner');
var Module = {
  canvas: canvas,
  print: function (text) {
    console.log(text);
  },
  printErr: function (text) {
    console.warn(text);
  },
  setStatus: function (text) {
    if (!Module.setStatus.last) {
      Module.setStatus.last = {
        time: Date.now(),
        text: ''
      };
    }
    if (text === Module.setStatus.text)
      return;
    const m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
    const now = Date.now();
    if (m && now - Date.now() < 30)
      return;
    if (m) {
      text = m[1];
      spinner.hidden = false;
    } else {
      if (!text) {
        spinner.hidden = true;
      }
    }
  }
};
Module.setStatus('Loading...');
window.onerror = function () {
  Module.setStatus('Error, see JavaScript console.');
  spinner.style.display = 'none';
  Module.setStatus = function (text) {
    if (text)
      Module.printErr('[post-exception status] ' + text);
  };
};
document.addEventListener('fullscreenchange', function (event) {
  if (document.fullscreenElement) {
    console.log('Entered fullscreen mode.');
  } else {
    console.log('Left fullscreen mode.');
  }
});
canvas.addEventListener('touchstart', function (event) {
  event.preventDefault();
}, false);
canvas.addEventListener('touchend', function (event) {
  event.preventDefault();
}, false);
canvas.addEventListener('mousedown', function (_) {
  window.focus();
}, false);
canvas.addEventListener('contextmenu', function (event) {
  event.preventDefault();
}, false);

/**< Interfaces. */

// Returns whether there's a touch screen.
function isMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    return true;

  return false;
}
// Returns whether is running in a cross origin iframe environment.
function isInCrossOriginIframe() {
  if (window.self == window.top)
    return false; // Not in an iframe.

  try {
    // Try to access `location.href` in the parent window.
    // Will throw `SecurityError` on error occurs.
    const parentHref = window.top.location.href;

    // Returns same origin if `parentHref` is accessible.
    return false;
  } catch (e) {
    // Determin whether is in a cross origin iframe.
    if (e instanceof DOMException) {
      console.log('Is running in a cross origin iframe.');

      return true; // Cross origin.
    }

    return false; // Other error.
  }
}
// Returns whether the file sync feature has been disabled.
function isFileSyncDisabled() {
  return params.getBool('nosync');
}
// Transfer the project data.
/*function getProjectData() {
  return '';
}*/
// Returns the custom splash image.
/*function getSplashImage() {
  return ''; // Base64 encoded.
}*/
// Returns the encoded ROM.
function getEncodedRom() {
  return params.getString('rom'); // Base64 encoded [and LZ4 compressed].
}
// Returns the SRAM file name.
function getSramFileName() {
  return 'gbbasic';
}
// Returns the SRAM auto save interval in frames.
function getSramAutoSaveInterval() {
  return 60 * 30; // ~30sec.
}

// Confirm exit.
let blockMessageOnExit = null;
window.onbeforeunload = () => {
  return blockMessageOnExit;
};
function blockExit(msg) {
  blockMessageOnExit = msg;
}
function allowExit() {
  blockMessageOnExit = null;
}

// Tips.
function isDesktopVersionSuggestionTipsEnabled() { return false; }
const tipsQueue = [ ];
let tipsAutoCloseTimer = null;
let tipsAutoCloseTicks = 10;
function nextTips() {
  if (tipsQueue.length == 0)
    return;

  const browserTips = document.getElementById('browser-tips');
  const browserTipsContent = document.getElementById('browser-tips-content');
  const browserTipsCountdown = document.getElementById('browser-tips-countdown');
  const browserTipsCloseButton = document.getElementById('browser-tips-close-button');

  if (window.getComputedStyle(browserTips, null).display != 'none')
    return;

  const [ tip ] = tipsQueue.splice(0, 1);
  canvas.style.top = '40px';
  canvas.style.height = 'calc(100% - 40px)';
  const style = window.getComputedStyle(canvas);
  canvas.height = parseFloat(style.height);
  if (typeof ccall == 'function' && !!(Module?.ExternalEventTypes)) {
    ccall(
      'pushEvent',
      'number', [ 'number', 'number', 'number', 'number' ],
      [
        Module.ExternalEventTypes.RESIZE_WINDOW.value,
        0,
        parseInt(style.width),
        parseInt(style.height)
      ]
    );
  }
  browserTips.style.display = 'block';
  switch (tip.type) {
    case 'error':
      browserTips.style.background = '#d9534f';
      break;
    case 'warning':
      browserTips.style.background = '#f0ad4e';
      break;
    case 'info': // Fall through.
    default:
      browserTips.style.background = '#6a914d';
      break;
  }
  browserTipsContent.innerHTML = tip.content;
  if (tip.timeout == -1)
    browserTipsCountdown.innerHTML = '';
  else
    browserTipsCountdown.innerHTML = `(${tip.timeout})`;
  browserTipsCloseButton.innerHTML = tip.ok;
  browserTipsCloseButton.onclick = () => {
    hideTips();
  };

  if (tipsAutoCloseTimer) {
    clearInterval(tipsAutoCloseTimer);
    tipsAutoCloseTimer = null;
  }
  tipsAutoCloseTicks = tip.timeout;
  if (tipsAutoCloseTicks != -1) {
    tipsAutoCloseTimer = setInterval(() => {
      tipsAutoCloseTicks -= 1;
      browserTipsCountdown.innerHTML = `(${Math.floor(tipsAutoCloseTicks)})`;
      if (tipsAutoCloseTicks <= 0)
        hideTips();
    }, 1000);
  }
}
function showTips({ content, type, timeout, ok }) {
  switch (type) {
    case 'error':
      console.error(content);
      break;
    case 'warning':
      console.warn(content);
      break;
    case 'info': // Fall through.
    default:
      console.log(content);
      break;
  }

  tipsQueue.push({ content, type, timeout: timeout || 10, ok: ok || '[OK]' });

  nextTips();
}
function hideTips() {
  const browserTips = document.getElementById('browser-tips');
  const browserTipsContent = document.getElementById('browser-tips-content');
  const browserTipsCountdown = document.getElementById('browser-tips-countdown');
  const browserTipsCloseButton = document.getElementById('browser-tips-close-button');

  browserTips.style.display = 'none';
  browserTips.style.background = '#6a914d';
  browserTipsContent.innerHTML = '';
  browserTipsCountdown.innerHTML = '(10)';
  browserTipsCloseButton.onclick = null;
  canvas.style.top = '0px';
  canvas.style.height = 'calc(100%)';
  const style = window.getComputedStyle(canvas);
  canvas.height = parseFloat(style.height);
  if (typeof ccall == 'function' && !!(Module?.ExternalEventTypes)) {
    ccall(
      'pushEvent',
      'number', [ 'number', 'number', 'number', 'number' ],
      [
        Module.ExternalEventTypes.RESIZE_WINDOW.value,
        0,
        parseInt(style.width),
        parseInt(style.height)
      ]
    );
  }

  if (tipsAutoCloseTimer) {
    clearInterval(tipsAutoCloseTimer);
    tipsAutoCloseTimer = null;
    tipsAutoCloseTicks = 10;
  }

  nextTips();
}

/**< Show browser tips. */

function isFileSyncSupported() {
  if (typeof FileSystemHandle == 'undefined')
    return false;
  if (typeof FileSystemFileHandle == 'undefined')
    return false;
  if (typeof FileSystemWritableFileStream == 'undefined')
    return false;
  if (!window.showOpenFilePicker || !window.showSaveFilePicker)
    return false;

  if (isFileSyncDisabled())
    return false;

  return true;
};

function isFileApiSuggestionTipsEnabled() { return false; }
if (!isFileSyncSupported()) {
  if (isFileApiSuggestionTipsEnabled()) {
    showTips({
      content: 'A browser with <a href="https://caniuse.com/native-filesystem-api" target="_blank">File System Access API</a> capability is recommended.',
      timeout: -1
    });
  } else {
    console.warn('A browser with File System Access API capability is recommended.');
  }
}
