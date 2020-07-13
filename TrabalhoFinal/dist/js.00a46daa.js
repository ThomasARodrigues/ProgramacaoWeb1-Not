// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/vue/dist/vue.runtime.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function (_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = ('__proto__' in {}); // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if ("development" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if ("development" !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if ("development" !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if ("development" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if ("development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if ("development" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if ("development" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if ("development" !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("development" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function () {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if ("development" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function (target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals. ' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = (key in target);
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if ("development" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if ("development" !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("development" !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("development" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ("development" !== 'production' && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if ("development" !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if ("development" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ("development" !== 'production' && isDef(data) && isDef(data.nativeOn)) {
        warn("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">.", context);
      }

      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if ("development" !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ("development" !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject("development" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if ("development" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if ("development" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("development" !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("development" !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if ("development" !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if ("development" !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$2 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$2; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "development" !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if ("development" !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if ("development" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("development" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if ("development" !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if ("development" !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if ("development" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if ("development" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if ("development" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.11';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if ("development" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("development" !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if ("development" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if ("development" !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if ("development" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("development" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};
/*  */

/*  */

/*  */

/*  */
// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.

var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.

function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecesarry `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def$$1 === 'object') {
    var res = {};

    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }

    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function (d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("development" !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
/*  */
// install platform specific utils

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("development" !== 'production' && "development" !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if ("development" !== 'production' && "development" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
/*  */


var _default = Vue;
exports.default = _default;
},{}],"js/models/Employee.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Employee = function Employee(id, nome, salario, idade, avatar) {
  _classCallCheck(this, Employee);

  this.id = id;
  this.nome = nome;
  this.salario = salario;
  this.idade = idade;
  this.avatar = avatar;
};

var _default = Employee;
exports.default = _default;
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/vue-hot-reload-api/dist/index.js":[function(require,module,exports) {
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }

      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)

      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update
      var restore = patchScopedSlots(instance)
      instance.$forceUpdate()
      instance.$nextTick(restore)
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      // prevent record.options._Ctor from being overwritten accidentally
      newCtor.options._Ctor = record.options._Ctor
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

// 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.
function patchScopedSlots (instance) {
  if (!instance._u) { return }
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  var original = instance._u
  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return function () {
    instance._u = original
  }
}

},{}],"js/components/Employee/FormEmployee.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Employee = _interopRequireDefault(require("../../models/Employee"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      errorMessage: "",
      id: "",
      nome: "",
      salario: "",
      idade: "",
      avatar: ""
    };
  },
  methods: {
    onSubmit: function onSubmit() {
      this.errorMessage = '';

      if (!this.nome) {
        this.errorMessage = 'Campo nome é obrigatório';
        return;
      }

      if (this.avatar == null) {}

      var employee = new _Employee.default(this.id, this.nome, this.salario, this.idade, this.avatar);
      this.$parent.salvar(employee);
      this.id = '';
      this.nome = '';
      this.salario = '';
      this.idade = '';
      this.avatar = '';
    },
    carregar: function carregar(employee) {
      this.id = employee.id;
      this.nome = employee.nome;
      this.salario = employee.salario;
      this.idade = employee.idade;
      this.avatar = employee.avatar;
      this.errorMessage = '';
    }
  }
};
exports.default = _default;
        var $a5b5bd = exports.default || module.exports;
      
      if (typeof $a5b5bd === 'function') {
        $a5b5bd = $a5b5bd.options;
      }
    
        /* template */
        Object.assign($a5b5bd, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h1", [_vm._v("Formulário de Empregados")]),
    _vm._v(" "),
    _c(
      "form",
      {
        attrs: { id: "form-empregados" },
        on: {
          submit: function($event) {
            $event.preventDefault()
            return _vm.onSubmit($event)
          }
        }
      },
      [
        _c("p", [
          _c("label", { attrs: { for: "nome" } }, [_vm._v("Nome:")]),
          _c("br"),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.nome,
                expression: "nome"
              }
            ],
            attrs: { name: "nome" },
            domProps: { value: _vm.nome },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.nome = $event.target.value
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("p", [
          _c("label", { attrs: { for: "salario" } }, [_vm._v("Salário:")]),
          _c("br"),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.salario,
                expression: "salario"
              }
            ],
            attrs: { name: "salario", type: "number" },
            domProps: { value: _vm.salario },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.salario = $event.target.value
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("p", [
          _c("label", { attrs: { for: "idade" } }, [_vm._v("Idade:")]),
          _c("br"),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.idade,
                expression: "idade"
              }
            ],
            attrs: { name: "idade", type: "number" },
            domProps: { value: _vm.idade },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.idade = $event.target.value
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("p", [
          _c("label", { attrs: { for: "avatar" } }, [_vm._v("Avatar:")]),
          _c("br"),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.avatar,
                expression: "avatar"
              }
            ],
            attrs: { name: "avatar", type: "url" },
            domProps: { value: _vm.avatar },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.avatar = $event.target.value
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("p"),
        _c("div", { staticClass: "error" }, [_vm._v(_vm._s(_vm.errorMessage))]),
        _vm._v(" "),
        _c("input", { attrs: { type: "submit", value: "Salvar" } }),
        _vm._v(" "),
        _c("p")
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$a5b5bd', $a5b5bd);
          } else {
            api.reload('$a5b5bd', $a5b5bd);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"../../models/Employee":"js/models/Employee.js","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"js/components/Employee/ListaEmployee.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  methods: {
    editar: function editar(employee) {
      this.$parent.editar(employee);
    },
    excluir: function excluir(id) {
      if (confirm("Deseja realmente excluir este empregado?")) this.$parent.excluir(id);
    }
  },
  props: {
    empregados: Array
  }
};
exports.default = _default;
        var $c6bf2e = exports.default || module.exports;
      
      if (typeof $c6bf2e === 'function') {
        $c6bf2e = $c6bf2e.options;
      }
    
        /* template */
        Object.assign($c6bf2e, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h1", [_vm._v("Listagem de Empregados")]),
    _vm._v(" "),
    _c("table", { attrs: { border: "1" } }, [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "tbody",
        _vm._l(this.empregados, function(employee) {
          return _c("tr", { key: employee.id }, [
            _c("td", [_vm._v(_vm._s(employee.id))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(employee.nome))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(employee.salario))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(employee.idade))]),
            _vm._v(" "),
            _c("td", [
              _c("img", {
                attrs: { src: employee.avatar, width: "100", height: "100" }
              })
            ]),
            _vm._v(" "),
            _c("td", [
              _c(
                "a",
                {
                  attrs: { href: "#" },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.editar(employee)
                    }
                  }
                },
                [_vm._v("editar")]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  attrs: { href: "#" },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.excluir(employee.id)
                    }
                  }
                },
                [_vm._v("excluir")]
              )
            ])
          ])
        }),
        0
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("ID")]),
        _vm._v(" "),
        _c("th", [_vm._v("Nome")]),
        _vm._v(" "),
        _c("th", [_vm._v("Salário")]),
        _vm._v(" "),
        _c("th", [_vm._v("Idade")]),
        _vm._v(" "),
        _c("th", [_vm._v("Avatar")]),
        _vm._v(" "),
        _c("th", [_vm._v("Ações")])
      ])
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$c6bf2e', $c6bf2e);
          } else {
            api.reload('$c6bf2e', $c6bf2e);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"js/components/Employee/Employee.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FormEmployee = _interopRequireDefault(require("./FormEmployee"));

var _ListaEmployee = _interopRequireDefault(require("./ListaEmployee"));

var _Employee = _interopRequireDefault(require("../../models/Employee"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = {
  data: function data() {
    return {
      contador: 6,
      empregados: [new _Employee.default(1, "BB-8", 6900, 5, "data:image/jpeg;base64,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"), new _Employee.default(2, "R2-D2", 9200, 22, "data:image/jpeg;base64,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"), new _Employee.default(3, "Chewie", 5120, 34, "data:image/jpeg;base64,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"), new _Employee.default(4, "Han Solo", 87510, 45, "data:image/jpeg;base64,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"), new _Employee.default(5, "Amidala", 54500, 33, "data:image/jpeg;base64,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")]
    };
  },
  methods: {
    salvar: function salvar(employee) {
      if (employee.id) {
        var index = this.empregados.findIndex(function (x) {
          return x.id == employee.id;
        });

        var empregados = _toConsumableArray(this.empregados);

        empregados[index] = employee;
        this.empregados = empregados;
      } else {
        employee.id = this.contador;
        this.contador = this.contador + 1;
        this.empregados.push(employee);
      }
    },
    excluir: function excluir(id) {
      var index = this.empregados.findIndex(function (x) {
        return x.id == id;
      });
      this.empregados.splice(index, 1);
    },
    editar: function editar(employee) {
      this.$refs.FormEmployee.carregar(employee);
    }
  },
  components: {
    FormEmployee: _FormEmployee.default,
    ListaEmployee: _ListaEmployee.default
  }
};
exports.default = _default;
        var $c85f25 = exports.default || module.exports;
      
      if (typeof $c85f25 === 'function') {
        $c85f25 = $c85f25.options;
      }
    
        /* template */
        Object.assign($c85f25, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("FormEmployee", { ref: "FormEmployee" }),
      _vm._v(" "),
      _c("ListaEmployee", { attrs: { empregados: _vm.empregados } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$c85f25', $c85f25);
          } else {
            api.reload('$c85f25', $c85f25);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./FormEmployee":"js/components/Employee/FormEmployee.vue","./ListaEmployee":"js/components/Employee/ListaEmployee.vue","../../models/Employee":"js/models/Employee.js","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.runtime.esm.js"}],"js/App.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _Employee = _interopRequireDefault(require("./components/Employee/Employee"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
var _default = _vue.default.extend({
  components: {
    Employee: _Employee.default
  }
});

exports.default = _default;
        var $f15ead = exports.default || module.exports;
      
      if (typeof $f15ead === 'function') {
        $f15ead = $f15ead.options;
      }
    
        /* template */
        Object.assign($f15ead, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_c("Employee")], 1)
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$f15ead', $f15ead);
          } else {
            api.reload('$f15ead', $f15ead);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"vue":"../node_modules/vue/dist/vue.runtime.esm.js","./components/Employee/Employee":"js/components/Employee/Employee.vue","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _vue.default({
  render: function render(createElement) {
    return createElement(_App.default);
  }
}).$mount('#app');
},{"vue":"../node_modules/vue/dist/vue.runtime.esm.js","./App.vue":"js/App.vue"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50709" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
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
        parents.push(k);
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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map