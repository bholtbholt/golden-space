// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({4:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var Msg;
(function (Msg) {
    Msg["UpdateScale"] = "UPDATE_SCALE";
    Msg["UpdateDesktopBaseSize"] = "UPDATE_DESKTOP_BASE_SIZE";
    Msg["UpdateMobileBaseSize"] = "UPDATE_MOBILE_BASE_SIZE";
    Msg["UpdateDisplay"] = "UPDATE_DISPLAY";
    Msg["UpdateRatio"] = "UPDATE_RATIO";
})(Msg || (Msg = {}));
exports.Msg = Msg;
},{}],7:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
function roundDecimals(num) {
    return Math.round(num * 100) / 100;
}
function exponentialScaleAbsolute(base, ratio) {
    var md = base;
    var sm = roundDecimals(md / ratio);
    var xs = roundDecimals(sm / ratio);
    var xxs = roundDecimals(xs / ratio);
    var lg = roundDecimals(md * ratio);
    var xl = roundDecimals(lg * ratio);
    var xxl = roundDecimals(xl * ratio);
    return {
        xxs: xxs,
        xs: xs,
        sm: sm,
        md: md,
        lg: lg,
        xl: xl,
        xxl: xxl
    };
}
exports.exponentialScaleAbsolute = exponentialScaleAbsolute;
function exponentialScaleRelative(base, ratio) {
    var md = base / base;
    var sm = roundDecimals(md / ratio);
    var xs = roundDecimals(sm / ratio);
    var xxs = roundDecimals(xs / ratio);
    var lg = roundDecimals(md * ratio);
    var xl = roundDecimals(lg * ratio);
    var xxl = roundDecimals(xl * ratio);
    return {
        xxs: xxs,
        xs: xs,
        sm: sm,
        md: md,
        lg: lg,
        xl: xl,
        xxl: xxl
    };
}
exports.exponentialScaleRelative = exponentialScaleRelative;
function linearScaleAbsolute(base, ratio) {
    var distance = base * ratio;
    var md = base;
    var sm = md - distance;
    var xs = sm - distance;
    var xxs = xs - distance;
    var lg = md + distance;
    var xl = lg + distance;
    var xxl = xl + distance;
    return {
        xxs: xxs,
        xs: xs,
        sm: sm,
        md: md,
        lg: lg,
        xl: xl,
        xxl: xxl
    };
}
exports.linearScaleAbsolute = linearScaleAbsolute;
function linearScaleRelative(base, distance) {
    var md = base / base;
    var sm = md - distance;
    var xs = sm - distance;
    var xxs = xs - distance;
    var lg = md + distance;
    var xl = lg + distance;
    var xxl = xl + distance;
    return {
        xxs: xxs,
        xs: xs,
        sm: sm,
        md: md,
        lg: lg,
        xl: xl,
        xxl: xxl
    };
}
exports.linearScaleRelative = linearScaleRelative;
},{}],5:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var types_1 = require("./types");
var scale_1 = require("./scale");
function update(message, size) {
    var dom = window.Model.domElements;
    switch (message) {
        case 'UPDATE_RATIO':
            window.Model.ratio = size;
            update(types_1.Msg.UpdateScale);
            break;
        case 'UPDATE_SCALE':
            var baseSize = window.Model.desktopFontSize;
            var ratio = window.Model.ratio;
            var relativeScale_1 = scale_1.exponentialScaleRelative(baseSize, ratio);
            var absoluteScale = scale_1.exponentialScaleAbsolute(baseSize, ratio);
            window.Model.relativeScale = relativeScale_1;
            window.Model.absoluteScale = absoluteScale;
            Object.keys(relativeScale_1).map(function (key) {
                dom.root.style.setProperty("--space-" + key, relativeScale_1[key] + "rem");
            });
            update(types_1.Msg.UpdateDisplay);
            break;
        case 'UPDATE_DESKTOP_BASE_SIZE':
            dom.root.style.setProperty('--desktop-font-size', size + "px");
            window.Model.desktopFontSize = size;
            update(types_1.Msg.UpdateScale);
            break;
        case 'UPDATE_MOBILE_BASE_SIZE':
            break;
        case 'UPDATE_DISPLAY':
            dom.relativeDisplays.map(function (element) {
                var size = element.dataset.scale;
                element.innerHTML = window.Model.relativeScale[size] + ' rem';
            });
            dom.absoluteDisplays.map(function (element) {
                var size = element.dataset.scale;
                element.innerHTML = window.Model.absoluteScale[size] + ' px';
            });
            break;
        default:
            break;
    }
}
exports.update = update;
},{"./types":4,"./scale":7}],3:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var types_1 = require("./types");
var update_1 = require("./update");
window.Model = {};
// init function
(function () {
    //////////////////////////////////////
    // Build DOM elements for the model
    //////////////////////////////////////
    var domRoot = document.documentElement;
    var relativeDisplayElements = Array.from(document.querySelectorAll('[data-behavior~="get-relative-size"]'));
    var absoluteDisplayElements = Array.from(document.querySelectorAll('[data-behavior~="get-absolute-size"]'));
    var desktopScale = document.querySelector('[data-behavior~="change-base-desktop"]');
    var exponentialToggles = Array.from(document.querySelectorAll('[data-behavior~="get-new-scale"]'));
    var domElements = {
        root: domRoot,
        relativeDisplays: relativeDisplayElements,
        absoluteDisplays: absoluteDisplayElements,
        desktopScale: desktopScale,
        exponentialToggles: exponentialToggles
    };
    //////////////////////////////////////
    // Initialize the model
    //////////////////////////////////////
    var model = {
        domElements: domElements,
        mobileFontSize: 14,
        desktopFontSize: 18,
        relativeScale: {
            xxs: 0.2,
            xs: 0.4,
            sm: 0.8,
            md: 1,
            lg: 1.5,
            xl: 2,
            xxl: 4
        },
        absoluteScale: {
            xxs: 3,
            xs: 7,
            sm: 14,
            md: 18,
            lg: 27,
            xl: 36,
            xxl: 72
        },
        ratio: 1.618
    };
    window.Model = model;
    //////////////////////////////////////
    // Bind Listeners
    //////////////////////////////////////
    domElements.exponentialToggles.map(function (input) {
        input.addEventListener('change', function () {
            var size = parseFloat(this.value);
            update_1.update(types_1.Msg.UpdateRatio, size);
        });
    });
    domElements.desktopScale.addEventListener('change', function () {
        var size = parseInt(this.value);
        update_1.update(types_1.Msg.UpdateDesktopBaseSize, size);
    });
    update_1.update(types_1.Msg.UpdateDisplay);
})();
},{"./types":4,"./update":5}],9:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '50273' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[9,3])
//# sourceMappingURL=/dist/621f1908af9e0cf2a3f85d995da263e2.map