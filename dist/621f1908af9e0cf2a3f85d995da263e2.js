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
})({7:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
function roundDecimals(num) {
    return Math.round(num * 100) / 100;
}
function exponentialScaleComputed(base, ratio) {
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
exports.exponentialScaleComputed = exponentialScaleComputed;
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
function linearScaleComputed(base) {
    var distance = base * 0.25;
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
exports.linearScaleComputed = linearScaleComputed;
function linearScaleRelative(base) {
    var distance = 0.25;
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
},{}],3:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var scale_1 = require("./scale");
(function () {
    var domRoot = document.documentElement;
    var spaceSize = parseInt(getComputedStyle(domRoot).getPropertyValue("--desktop-font-size"));
    function updateCustomProperties(scale) {
        Object.keys(scale).map(function (key) {
            domRoot.style.setProperty("--space-" + key, scale[key] + "rem");
        });
    }
    function toggleLinear(event) {
        updateCustomProperties(scale_1.linearScaleRelative(spaceSize));
        console.log('linear relative', scale_1.linearScaleRelative(spaceSize));
        console.log('linear computed', scale_1.linearScaleComputed(spaceSize));
    }
    function toggleScale(event) {
        var ratio = event.target.value;
        updateCustomProperties(scale_1.exponentialScaleRelative(spaceSize, ratio));
        console.log('exponential relative', scale_1.exponentialScaleRelative(spaceSize, ratio));
        console.log('exponential computed', scale_1.exponentialScaleComputed(spaceSize, ratio));
    }
    // Bindings
    document.querySelector('[data-behavior~="toggle-linear"]').addEventListener('change', toggleLinear);
    Array.from(document.querySelectorAll('[data-behavior~="get-new-scale"]')).map(function (input) {
        input.addEventListener('change', toggleScale);
    });
})();
},{"./scale":7}],9:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '61515' + '/');
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