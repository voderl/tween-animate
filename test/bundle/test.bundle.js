/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

const { assert, should, expect } = __webpack_require__(9);
let now = 0;
performance.now = () => 0;
function ticker(elpased) {
  Object(_src__WEBPACK_IMPORTED_MODULE_0__["update"])(elpased);
}
requestAnimationFrame(ticker);
/** 透明度 */

let el = {
  value: 0,
};
let els = [{ value: 0 }, { value: 0 }, { value: 0 }];

const base = Object(_src__WEBPACK_IMPORTED_MODULE_0__["Animate"])({
  from: 0,
  to: 1,
  easing: _src__WEBPACK_IMPORTED_MODULE_0__["Easing"].Quadratic.In,
  time: 1000,
});
let show = base.extend().on('update', (ins, v) => {
  ins.every((el) => (el.value = v));
});
const show2 = show.extend(_src__WEBPACK_IMPORTED_MODULE_0__["Transform"].loop(2));
// extend 还可以补充？
const show2WithInterval = Object(_src__WEBPACK_IMPORTED_MODULE_0__["Animate"])(show2, 1000);
const show4 = show2WithInterval.extend(_src__WEBPACK_IMPORTED_MODULE_0__["Transform"].loop(2));
const hide = show.extend(_src__WEBPACK_IMPORTED_MODULE_0__["Transform"].reverse());
const yoyo = show.extend(_src__WEBPACK_IMPORTED_MODULE_0__["Transform"].yoyo());

describe('Check', function () {
  beforeEach(function () {
    el = {
      value: 0,
    };
    els = [{ value: 0 }, { value: 0 }, { value: 0 }];
    _src__WEBPACK_IMPORTED_MODULE_0__["List"].splice(0, _src__WEBPACK_IMPORTED_MODULE_0__["List"].length);
  });
  describe('support targets', function () {
    it('can work with none target', () => {
      show.apply().start();
    });
    it('can work with one target', () => {
      show.apply(el).start();
      ticker(700);
      assert.equal(el.value, show.easing(0.7));
    });
    it('can work with more target', () => {
      show.apply(...els).start();
      ticker(300);
      console.log(els, els.length);
      els.forEach((el) => {
        assert.equal(el.value, show.easing(0.3));
      });
    });
  });
  describe('extend', function () {});
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Easing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Easing", function() { return _Easing__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transform", function() { return _Transform__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Animate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animate", function() { return _Animate__WEBPACK_IMPORTED_MODULE_3__["Animate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "update", function() { return _Animate__WEBPACK_IMPORTED_MODULE_3__["update"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "List", function() { return _Animate__WEBPACK_IMPORTED_MODULE_3__["List"]; });









/***/ }),
/* 2 */
/***/ (function(module, exports) {

// References:
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// https://gist.github.com/1579671
// http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision
// https://gist.github.com/timhall/4078614
// https://github.com/Financial-Times/polyfill-service/tree/master/polyfills/requestAnimationFrame

// Expected to be used with Browserfiy
// Browserify automatically detects the use of `global` and passes the
// correct reference of `global`, `self`, and finally `window`
const ONE_FRAME_TIME = 16;

// Date.now
if (!(Date.now && Date.prototype.getTime)) {
  Date.now = function now() {
    return new Date().getTime();
  };
}

// performance.now
if (!(global.performance && global.performance.now)) {
  const startTime = Date.now();

  if (!global.performance) {
    global.performance = {};
  }

  global.performance.now = () => Date.now() - startTime;
}

// requestAnimationFrame
let lastTime = Date.now();
const vendors = ['ms', 'moz', 'webkit', 'o'];

for (let x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
  const p = vendors[x];

  global.requestAnimationFrame = global[`${p}RequestAnimationFrame`];
  global.cancelAnimationFrame =
    global[`${p}CancelAnimationFrame`] ||
    global[`${p}CancelRequestAnimationFrame`];
}

if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = (callback) => {
    if (typeof callback !== 'function') {
      throw new TypeError(`${callback}is not a function`);
    }

    const currentTime = Date.now();
    let delay = ONE_FRAME_TIME + lastTime - currentTime;

    if (delay < 0) {
      delay = 0;
    }

    lastTime = currentTime;

    return setTimeout(() => {
      lastTime = Date.now();
      callback(performance.now());
    }, delay);
  };
}

if (!global.cancelAnimationFrame) {
  global.cancelAnimationFrame = (id) => clearTimeout(id);
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// from https://github.com/tweenjs/tween.js
const Easing = {
  Linear: {
    None: function (k) {
      return k;
    },
  },
  Quadratic: {
    In: function (k) {
      return k * k;
    },
    Out: function (k) {
      return k * (2 - k);
    },
    InOut: function (k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k;
      }
      return -0.5 * (--k * (k - 2) - 1);
    },
  },
  Cubic: {
    In: function (k) {
      return k * k * k;
    },
    Out: function (k) {
      return --k * k * k + 1;
    },
    InOut: function (k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k + 2);
    },
  },
  Quartic: {
    In: function (k) {
      return k * k * k * k;
    },
    Out: function (k) {
      return 1 - --k * k * k * k;
    },
    InOut: function (k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
      }
      return -0.5 * ((k -= 2) * k * k * k - 2);
    },
  },
  Quintic: {
    In: function (k) {
      return k * k * k * k * k;
    },
    Out: function (k) {
      return --k * k * k * k * k + 1;
    },
    InOut: function (k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    },
  },
  Sinusoidal: {
    In: function (k) {
      return 1 - Math.cos((k * Math.PI) / 2);
    },
    Out: function (k) {
      return Math.sin((k * Math.PI) / 2);
    },
    InOut: function (k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    },
  },
  Exponential: {
    In: function (k) {
      return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    Out: function (k) {
      return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    InOut: function (k) {
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      if ((k *= 2) < 1) {
        return 0.5 * Math.pow(1024, k - 1);
      }
      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    },
  },
  Circular: {
    In: function (k) {
      return 1 - Math.sqrt(1 - k * k);
    },
    Out: function (k) {
      return Math.sqrt(1 - --k * k);
    },
    InOut: function (k) {
      if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    },
  },
  Elastic: {
    In: function (k) {
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
    },
    Out: function (k) {
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function (k) {
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      k *= 2;
      if (k < 1) {
        return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
      }
      return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
    },
  },
  Back: {
    In: function (k) {
      var s = 1.70158;
      return k * k * ((s + 1) * k - s);
    },
    Out: function (k) {
      var s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    },
    InOut: function (k) {
      var s = 1.70158 * 1.525;
      if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
      }
      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    },
  },
  Bounce: {
    In: function (k) {
      return 1 - Easing.Bounce.Out(1 - k);
    },
    Out: function (k) {
      if (k < 1 / 2.75) {
        return 7.5625 * k * k;
      } else if (k < 2 / 2.75) {
        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
      } else if (k < 2.5 / 2.75) {
        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
      } else {
        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
      }
    },
    InOut: function (k) {
      if (k < 0.5) {
        return Easing.Bounce.In(k * 2) * 0.5;
      }
      return Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
    },
  },
};
/* harmony default export */ __webpack_exports__["default"] = (Easing);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const Transform = {
  register(id, func) {
    this[id] = function (...args) {
      return function transformAnimate(animate) {
        if (!animate) return func;
        func(animate, ...args);
      };
    };
  },
};
Transform.register('loop', function (animate, num) {
  animate.on('start', (instance) => {
    instance.loopCount = num;
  });
  animate.on('end', (instance) => {
    instance.loopCount--;
    if (instance.loopCount <= 0) instance.isCompleted = true;
    else {
      instance.isCompleted = false;
    }
  });
});
Transform.register('reverse', function (animate) {
  animate.on('start', (ins) => {
    ins.isReversed = !ins.isReversed;
  });
});
Transform.register('yoyo', function (animate) {
  animate.on('end', (ins) => {
    ins.isReversed = !ins.isReversed;
    if (!ins.isYoyoed) ins.isCompleted = false;
    ins.isYoyoed = true;
  });
});
/* harmony default export */ __webpack_exports__["default"] = (Transform);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return List; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animate", function() { return Animate; });
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Easing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _Instance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);




// tween.update(elpased); 不指定则是内部list
// tween.update(elpased, list);
const List = []; // 更新队列, 每帧更新时更新此队列的
function update(elpased, list = List) {
  list.forEach((instance) => {
    if (instance.isPlaying) {
      instance.update(elpased);
    }
  });
}

function Animate(param) {
  if (
    Array.isArray(param) ||
    param instanceof BaseAnimate ||
    param instanceof AnimateChain ||
    typeof param === 'number'
  ) {
    /** 转向AnimateChain */
    return new AnimateChain(...arguments);
  }
  return new BaseAnimate(...arguments);
}
/**
 * 把一个eventEmitter的事件 复制到新的eventEmitter上面
 * @param {EventEmitter} eventEmitter
 * @param {EventEmitter} to
 */
function cloneEventEmitter(eventEmitter, to) {
  const { _events: events, _eventsCount } = eventEmitter;
  for (const id in events) {
    const value = events[id];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v.context === eventEmitter) v.context = to;
      });
    } else if (value.context === eventEmitter) {
      value.context = to;
    }
    to._events[id] = value;
  }
  to._eventsCount = _eventsCount;
}
/**
 * 基础动画，控制流程，transform，基础动画完成on
 * 一个基础动画控制一组，生成实例才有实例的events
 */
function extendFunction(animate, transform) {
  if (typeof transform !== 'function') throw new Error('extend params error');
  const newAnimate = new AnimateChain(animate);
  // if extend Function, it just control its child instance
  // cloneEventEmitter(animate, newAnimate);
  transform(newAnimate);
  return newAnimate;
}
class BaseAnimate extends eventemitter3__WEBPACK_IMPORTED_MODULE_0___default.a {
  constructor({
    from = 0,
    to = 1,
    easing = _Easing__WEBPACK_IMPORTED_MODULE_1__["default"].Linear.None,
    time = 1000,
    list = List,
  }) {
    super();
    this.from = from;
    this.to = to;
    this.easing = easing;
    this.time = time;
    this.list = list;
  }

  apply(...args) {
    return new _Instance__WEBPACK_IMPORTED_MODULE_3__["AnimateInstance"](this, args);
  }

  extend(value, ...args) {
    let newValue = {};
    let animate = this;
    if (typeof value === 'object') {
      const newData = {
        from: this.from,
        to: this.to,
        easing: this.easing,
        time: this.time,
        list: this.list,
        ...newValue,
      };
      animate = new BaseAnimate(newData);
      cloneEventEmitter(this, animate);
    } else if (value) {
      args.unshift(value);
    }
    return args.reduce((acc, cur) => extendFunction(acc, cur), animate);
  }
}
/**
 * 合成一个新的Animate，
 * 使用call返回一个新的AnimateInstance，有新的begin，新的end，新的start
 * 或者说是 有一个 AnimateInstanceChain
 */
function testArgs(args) {
  if (
    args instanceof BaseAnimate ||
    typeof args === 'number' ||
    args instanceof AnimateChain
  )
    return true;
  if (Array.isArray(args) && args.every((v) => testArgs(v))) return true;
  return false;
}
/**
 * 允许传入时间
 */
/**
 * 动画是Chain， 由子AnimateInstance组成，子instance作为 动画，等待
 */
const getTimeAnimate = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].cached(function (number) {
  return new BaseAnimate({
    time: number,
  });
});

function getInstance(chain, el) {
  if (Array.isArray(chain)) {
    return chain.map((v) => getInstance(v, el));
  }
  if (typeof chain === 'number') {
    const animate = getTimeAnimate(chain);
    const ins = animate.apply(...el);
    ins.update = function update(elpased) {
      if (elpased) this.time += elpased;
      else {
        this.time = performance.now();
      }
      if (this.time - this.startTime >= this.animate.time) this.end();
    };
    return ins;
  }
  return chain.apply(...el);
}

class AnimateChain extends eventemitter3__WEBPACK_IMPORTED_MODULE_0___default.a {
  constructor(...args) {
    super();
    if (!testArgs(args)) throw new Error('Animate arguments error');
    this.chain = args;
  }

  extend(...args) {
    return args.reduce((acc, cur) => extendFunction(acc, cur), this);
  }

  apply(...args) {
    return new _Instance__WEBPACK_IMPORTED_MODULE_3__["AnimateInstanceChain"](this, args, getInstance(this.chain, args));
  }
}




/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const utils = {
  /**
   * 实现的一个filter， 直接改变源数组，(怕filter生成新数组影响原数组回收,或带来回收成本)
   * 也不知道到底有没有什么好处，先这样= =
   * @param {array} arr
   * @param {function} func
   */
  filter(arr, func) {
    let keep = false;
    let start = 0;
    let deleteCount = 0;
    const len = arr.length;
    for (let i = 0; i < len - deleteCount; i++) {
      if (func(arr[i], deleteCount + i)) {
        if (keep) {
          keep = !keep;
          arr.splice(start, i - start);
          deleteCount += i - start;
          i = start;
        }
      } else if (!keep) {
        start = i;
        keep = !keep;
      }
    }
    if (keep) {
      arr.splice(start, arr.length - start);
    }
    return arr;
  },
  clone(obj) {
    if (typeof obj !== 'object') return obj;
    const newObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      const val = obj[key];
      newObj[key] = typeof val === 'object' ? this.clone(val) : val;
    }
    return newObj;
  },
  cached(fn) {
    const cache = Object.create(null);
    return function cachedFn(str) {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  },
};
/* harmony default export */ __webpack_exports__["default"] = (utils);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimateInstance", function() { return AnimateInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimateInstanceChain", function() { return AnimateInstanceChain; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

/**
 * Instance 即 实例，即animate在调用apply方法后返回的数据
 * 独立于animate，但又受控于animate的emitter
 * InstanceChian是 animateChain的实例，是播放子instance，最终完成自身播放
 */
class BaseAnimateInstance {
  constructor(animate, el) {
    this.el = el;
    this.isPlaying = false;
    this.isCompleted = false;
    this.isReversed = false;
    this.animate = animate;
    this.time = 0;
    this.emit('init');
  }

  emit(id, ...args) {
    this.animate.emit(id, this, ...args);
  }

  every(func) {
    this.el.forEach((v, i) => {
      if (v !== null && v !== undefined) func(v, i);
    });
  }

  start(callback) {
    this.emit('start'); // 全部恢复自身状态
    if (typeof callback === 'function') this.callback = callback;
    this.begin();
  }

  begin() {
    this.emit('begin');
    this.isCompleted = false;
    this.startTime = performance.now();
    this.time = this.startTime;
    this.play();
  }

  end() {
    this.isCompleted = true;
    this.emit('end');
    if (this.isCompleted) this.complete();
    else this.begin();
  }

  play() {
    this.isPlaying = true;
  }

  stop() {
    this.isPlaying = false;
  }

  complete() {
    this.emit('complete');
    if (typeof this.callback === 'function') this.callback();
  }
}

class AnimateInstance extends BaseAnimateInstance {
  constructor(animate, el) {
    super(animate, el);
    this.value = this.animate.from;
  }

  start(callback) {
    super.start(callback);
    this.animate.list.push(this);
  }

  complete() {
    super.complete();
    const list = this.animate.list;
    const i = list.indexOf(this);
    if (i > -1) list.splice(i, 1);
  }

  update(elpased) {
    if (elpased) this.time += elpased;
    else {
      this.time = performance.now();
    }
    const { animate, isReversed } = this;
    const { from, to, time: fullTime } = animate;
    let ratio = (this.time - this.startTime) / fullTime;
    let completed = false;
    let value;
    if (ratio < 1) value = animate.easing(isReversed ? 1 - ratio : ratio);
    else {
      value = isReversed ? 0 : 1;
      completed = true;
    }
    this.value = from + (to - from) * value;
    this.emit('update', this.value);
    if (completed) this.end();
  }
}

function waitAllComplete(num, callback) {
  let count = 0;
  if (typeof callback !== 'function')
    throw new Error('callback should be function');
  return function waitAll() {
    count += 1;
    if (count === num) callback();
  };
}
class AnimateInstanceChain extends BaseAnimateInstance {
  constructor(animate, el, chain) {
    super(animate, el);
    this.count = 0;
    this.instanceChain = chain;
  }

  next() {
    const { count, instanceChain, isReversed } = this;
    if (count >= instanceChain.length) return this.end();
    const index = isReversed ? instanceChain.length - 1 - count : count;
    const v = instanceChain[index];
    this.count += 1;
    const cb = () => this.next();
    if (Array.isArray(v)) {
      const waitAll = waitAllComplete(v.length, cb);
      v.forEach((instance) => {
        instance.isReversed = isReversed;
        instance.start(waitAll);
      });
    } else {
      v.isReversed = isReversed;
      v.start(cb);
    }
  }

  begin() {
    super.begin();
    this.count = 0;
    this.next();
  }
}




/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("chai");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vdGVzdC90ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Vhc2luZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9BbmltYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9fZXZlbnRlbWl0dGVyM0A0LjAuNEBldmVudGVtaXR0ZXIzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hhaVwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBa0U7QUFDbEUsT0FBTyx5QkFBeUIsR0FBRyxtQkFBTyxDQUFDLENBQU07QUFDakQ7QUFDQTtBQUNBO0FBQ0EsRUFBRSxtREFBTTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFdBQVcsR0FBRyxXQUFXLEdBQUcsV0FBVzs7QUFFbkQsYUFBYSxvREFBTztBQUNwQjtBQUNBO0FBQ0EsVUFBVSwyQ0FBTTtBQUNoQjtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNELDBCQUEwQiw4Q0FBUztBQUNuQztBQUNBLDBCQUEwQixvREFBTztBQUNqQyx1Q0FBdUMsOENBQVM7QUFDaEQseUJBQXlCLDhDQUFTO0FBQ2xDLHlCQUF5Qiw4Q0FBUzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksV0FBVyxHQUFHLFdBQVcsR0FBRyxXQUFXO0FBQ25ELElBQUkseUNBQUksV0FBVyx5Q0FBSTtBQUN2QixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNILG1DQUFtQztBQUNuQyxDQUFDOzs7Ozs7OztBQzFERDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFvQjtBQUNVO0FBQ007QUFDYzs7QUFFRTs7Ozs7OztBQ0xwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxxREFBcUQ7QUFDcEU7O0FBRUEsMkNBQTJDLEVBQUU7QUFDN0M7QUFDQSxjQUFjLEVBQUU7QUFDaEIsY0FBYyxFQUFFO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixTQUFTO0FBQ3RDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLG1DQUFtQztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVpRDs7Ozs7OztBQy9JakQsaUMiLCJmaWxlIjoidGVzdC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgeyBBbmltYXRlLCB1cGRhdGUsIEVhc2luZywgVHJhbnNmb3JtLCBMaXN0IH0gZnJvbSAnLi4vc3JjJztcbmNvbnN0IHsgYXNzZXJ0LCBzaG91bGQsIGV4cGVjdCB9ID0gcmVxdWlyZSgnY2hhaScpO1xubGV0IG5vdyA9IDA7XG5wZXJmb3JtYW5jZS5ub3cgPSAoKSA9PiAwO1xuZnVuY3Rpb24gdGlja2VyKGVscGFzZWQpIHtcbiAgdXBkYXRlKGVscGFzZWQpO1xufVxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2tlcik7XG4vKiog6YCP5piO5bqmICovXG5cbmxldCBlbCA9IHtcbiAgdmFsdWU6IDAsXG59O1xubGV0IGVscyA9IFt7IHZhbHVlOiAwIH0sIHsgdmFsdWU6IDAgfSwgeyB2YWx1ZTogMCB9XTtcblxuY29uc3QgYmFzZSA9IEFuaW1hdGUoe1xuICBmcm9tOiAwLFxuICB0bzogMSxcbiAgZWFzaW5nOiBFYXNpbmcuUXVhZHJhdGljLkluLFxuICB0aW1lOiAxMDAwLFxufSk7XG5sZXQgc2hvdyA9IGJhc2UuZXh0ZW5kKCkub24oJ3VwZGF0ZScsIChpbnMsIHYpID0+IHtcbiAgaW5zLmV2ZXJ5KChlbCkgPT4gKGVsLnZhbHVlID0gdikpO1xufSk7XG5jb25zdCBzaG93MiA9IHNob3cuZXh0ZW5kKFRyYW5zZm9ybS5sb29wKDIpKTtcbi8vIGV4dGVuZCDov5jlj6/ku6XooaXlhYXvvJ9cbmNvbnN0IHNob3cyV2l0aEludGVydmFsID0gQW5pbWF0ZShzaG93MiwgMTAwMCk7XG5jb25zdCBzaG93NCA9IHNob3cyV2l0aEludGVydmFsLmV4dGVuZChUcmFuc2Zvcm0ubG9vcCgyKSk7XG5jb25zdCBoaWRlID0gc2hvdy5leHRlbmQoVHJhbnNmb3JtLnJldmVyc2UoKSk7XG5jb25zdCB5b3lvID0gc2hvdy5leHRlbmQoVHJhbnNmb3JtLnlveW8oKSk7XG5cbmRlc2NyaWJlKCdDaGVjaycsIGZ1bmN0aW9uICgpIHtcbiAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgZWwgPSB7XG4gICAgICB2YWx1ZTogMCxcbiAgICB9O1xuICAgIGVscyA9IFt7IHZhbHVlOiAwIH0sIHsgdmFsdWU6IDAgfSwgeyB2YWx1ZTogMCB9XTtcbiAgICBMaXN0LnNwbGljZSgwLCBMaXN0Lmxlbmd0aCk7XG4gIH0pO1xuICBkZXNjcmliZSgnc3VwcG9ydCB0YXJnZXRzJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdjYW4gd29yayB3aXRoIG5vbmUgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgc2hvdy5hcHBseSgpLnN0YXJ0KCk7XG4gICAgfSk7XG4gICAgaXQoJ2NhbiB3b3JrIHdpdGggb25lIHRhcmdldCcsICgpID0+IHtcbiAgICAgIHNob3cuYXBwbHkoZWwpLnN0YXJ0KCk7XG4gICAgICB0aWNrZXIoNzAwKTtcbiAgICAgIGFzc2VydC5lcXVhbChlbC52YWx1ZSwgc2hvdy5lYXNpbmcoMC43KSk7XG4gICAgfSk7XG4gICAgaXQoJ2NhbiB3b3JrIHdpdGggbW9yZSB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICBzaG93LmFwcGx5KC4uLmVscykuc3RhcnQoKTtcbiAgICAgIHRpY2tlcigzMDApO1xuICAgICAgY29uc29sZS5sb2coZWxzLCBlbHMubGVuZ3RoKTtcbiAgICAgIGVscy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBhc3NlcnQuZXF1YWwoZWwudmFsdWUsIHNob3cuZWFzaW5nKDAuMykpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZXh0ZW5kJywgZnVuY3Rpb24gKCkge30pO1xufSk7XG4iLCJpbXBvcnQgJy4vcG9seWZpbGwnO1xuaW1wb3J0IEVhc2luZyBmcm9tICcuL0Vhc2luZyc7XG5pbXBvcnQgVHJhbnNmb3JtIGZyb20gJy4vVHJhbnNmb3JtJztcbmltcG9ydCB7IEFuaW1hdGUsIHVwZGF0ZSwgTGlzdCB9IGZyb20gJy4vQW5pbWF0ZSc7XG5cbmV4cG9ydCB7IEFuaW1hdGUsIHVwZGF0ZSwgTGlzdCwgRWFzaW5nLCBUcmFuc2Zvcm0gfTtcbiIsIi8vIFJlZmVyZW5jZXM6XG4vLyBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xuLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vMTU3OTY3MVxuLy8gaHR0cDovL3VwZGF0ZXMuaHRtbDVyb2Nrcy5jb20vMjAxMi8wNS9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUtQVBJLW5vdy13aXRoLXN1Yi1taWxsaXNlY29uZC1wcmVjaXNpb25cbi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3RpbWhhbGwvNDA3ODYxNFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0ZpbmFuY2lhbC1UaW1lcy9wb2x5ZmlsbC1zZXJ2aWNlL3RyZWUvbWFzdGVyL3BvbHlmaWxscy9yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcblxuLy8gRXhwZWN0ZWQgdG8gYmUgdXNlZCB3aXRoIEJyb3dzZXJmaXlcbi8vIEJyb3dzZXJpZnkgYXV0b21hdGljYWxseSBkZXRlY3RzIHRoZSB1c2Ugb2YgYGdsb2JhbGAgYW5kIHBhc3NlcyB0aGVcbi8vIGNvcnJlY3QgcmVmZXJlbmNlIG9mIGBnbG9iYWxgLCBgc2VsZmAsIGFuZCBmaW5hbGx5IGB3aW5kb3dgXG5jb25zdCBPTkVfRlJBTUVfVElNRSA9IDE2O1xuXG4vLyBEYXRlLm5vd1xuaWYgKCEoRGF0ZS5ub3cgJiYgRGF0ZS5wcm90b3R5cGUuZ2V0VGltZSkpIHtcbiAgRGF0ZS5ub3cgPSBmdW5jdGlvbiBub3coKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9O1xufVxuXG4vLyBwZXJmb3JtYW5jZS5ub3dcbmlmICghKGdsb2JhbC5wZXJmb3JtYW5jZSAmJiBnbG9iYWwucGVyZm9ybWFuY2Uubm93KSkge1xuICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gIGlmICghZ2xvYmFsLnBlcmZvcm1hbmNlKSB7XG4gICAgZ2xvYmFsLnBlcmZvcm1hbmNlID0ge307XG4gIH1cblxuICBnbG9iYWwucGVyZm9ybWFuY2Uubm93ID0gKCkgPT4gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbn1cblxuLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5sZXQgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuY29uc3QgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG5cbmZvciAobGV0IHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIWdsb2JhbC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xuICBjb25zdCBwID0gdmVuZG9yc1t4XTtcblxuICBnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZ2xvYmFsW2Ake3B9UmVxdWVzdEFuaW1hdGlvbkZyYW1lYF07XG4gIGdsb2JhbC5jYW5jZWxBbmltYXRpb25GcmFtZSA9XG4gICAgZ2xvYmFsW2Ake3B9Q2FuY2VsQW5pbWF0aW9uRnJhbWVgXSB8fFxuICAgIGdsb2JhbFtgJHtwfUNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZWBdO1xufVxuXG5pZiAoIWdsb2JhbC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IChjYWxsYmFjaykgPT4ge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7Y2FsbGJhY2t9aXMgbm90IGEgZnVuY3Rpb25gKTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgbGV0IGRlbGF5ID0gT05FX0ZSQU1FX1RJTUUgKyBsYXN0VGltZSAtIGN1cnJlbnRUaW1lO1xuXG4gICAgaWYgKGRlbGF5IDwgMCkge1xuICAgICAgZGVsYXkgPSAwO1xuICAgIH1cblxuICAgIGxhc3RUaW1lID0gY3VycmVudFRpbWU7XG5cbiAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBsYXN0VGltZSA9IERhdGUubm93KCk7XG4gICAgICBjYWxsYmFjayhwZXJmb3JtYW5jZS5ub3coKSk7XG4gICAgfSwgZGVsYXkpO1xuICB9O1xufVxuXG5pZiAoIWdsb2JhbC5jYW5jZWxBbmltYXRpb25GcmFtZSkge1xuICBnbG9iYWwuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSAoaWQpID0+IGNsZWFyVGltZW91dChpZCk7XG59XG4iLCIvLyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXG5jb25zdCBFYXNpbmcgPSB7XG4gIExpbmVhcjoge1xuICAgIE5vbmU6IGZ1bmN0aW9uIChrKSB7XG4gICAgICByZXR1cm4gaztcbiAgICB9LFxuICB9LFxuICBRdWFkcmF0aWM6IHtcbiAgICBJbjogZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiBrICogaztcbiAgICB9LFxuICAgIE91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiBrICogKDIgLSBrKTtcbiAgICB9LFxuICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgaWYgKChrICo9IDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gMC41ICogayAqIGs7XG4gICAgICB9XG4gICAgICByZXR1cm4gLTAuNSAqICgtLWsgKiAoayAtIDIpIC0gMSk7XG4gICAgfSxcbiAgfSxcbiAgQ3ViaWM6IHtcbiAgICBJbjogZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiBrICogayAqIGs7XG4gICAgfSxcbiAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XG4gICAgICByZXR1cm4gLS1rICogayAqIGsgKyAxO1xuICAgIH0sXG4gICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG4gICAgICBpZiAoKGsgKj0gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiAwLjUgKiBrICogayAqIGs7XG4gICAgICB9XG4gICAgICByZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKyAyKTtcbiAgICB9LFxuICB9LFxuICBRdWFydGljOiB7XG4gICAgSW46IGZ1bmN0aW9uIChrKSB7XG4gICAgICByZXR1cm4gayAqIGsgKiBrICogaztcbiAgICB9LFxuICAgIE91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiAxIC0gLS1rICogayAqIGsgKiBrO1xuICAgIH0sXG4gICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG4gICAgICBpZiAoKGsgKj0gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIC0wLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgLSAyKTtcbiAgICB9LFxuICB9LFxuICBRdWludGljOiB7XG4gICAgSW46IGZ1bmN0aW9uIChrKSB7XG4gICAgICByZXR1cm4gayAqIGsgKiBrICogayAqIGs7XG4gICAgfSxcbiAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XG4gICAgICByZXR1cm4gLS1rICogayAqIGsgKiBrICogayArIDE7XG4gICAgfSxcbiAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGsgKiBrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAqIGsgKyAyKTtcbiAgICB9LFxuICB9LFxuICBTaW51c29pZGFsOiB7XG4gICAgSW46IGZ1bmN0aW9uIChrKSB7XG4gICAgICByZXR1cm4gMSAtIE1hdGguY29zKChrICogTWF0aC5QSSkgLyAyKTtcbiAgICB9LFxuICAgIE91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiBNYXRoLnNpbigoayAqIE1hdGguUEkpIC8gMik7XG4gICAgfSxcbiAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG4gICAgfSxcbiAgfSxcbiAgRXhwb25lbnRpYWw6IHtcbiAgICBJbjogZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiBrID09PSAwID8gMCA6IE1hdGgucG93KDEwMjQsIGsgLSAxKTtcbiAgICB9LFxuICAgIE91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiBrID09PSAxID8gMSA6IDEgLSBNYXRoLnBvdygyLCAtMTAgKiBrKTtcbiAgICB9LFxuICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgaWYgKGsgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICBpZiAoayA9PT0gMSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIDAuNSAqIE1hdGgucG93KDEwMjQsIGsgLSAxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIChrIC0gMSkpICsgMik7XG4gICAgfSxcbiAgfSxcbiAgQ2lyY3VsYXI6IHtcbiAgICBJbjogZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBrICogayk7XG4gICAgfSxcbiAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XG4gICAgICByZXR1cm4gTWF0aC5zcXJ0KDEgLSAtLWsgKiBrKTtcbiAgICB9LFxuICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgaWYgKChrICo9IDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIGsgKiBrKSAtIDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtIChrIC09IDIpICogaykgKyAxKTtcbiAgICB9LFxuICB9LFxuICBFbGFzdGljOiB7XG4gICAgSW46IGZ1bmN0aW9uIChrKSB7XG4gICAgICBpZiAoayA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIGlmIChrID09PSAxKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgcmV0dXJuIC1NYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuICAgIH0sXG4gICAgT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgaWYgKGsgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICBpZiAoayA9PT0gMSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNYXRoLnBvdygyLCAtMTAgKiBrKSAqIE1hdGguc2luKChrIC0gMC4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XG4gICAgfSxcbiAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgIGlmIChrID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgaWYgKGsgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBrICo9IDI7XG4gICAgICBpZiAoayA8IDEpIHtcbiAgICAgICAgcmV0dXJuIC0wLjUgKiBNYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIC0xMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpICsgMTtcbiAgICB9LFxuICB9LFxuICBCYWNrOiB7XG4gICAgSW46IGZ1bmN0aW9uIChrKSB7XG4gICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICByZXR1cm4gayAqIGsgKiAoKHMgKyAxKSAqIGsgLSBzKTtcbiAgICB9LFxuICAgIE91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgIHJldHVybiAtLWsgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAxO1xuICAgIH0sXG4gICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG4gICAgICB2YXIgcyA9IDEuNzAxNTggKiAxLjUyNTtcbiAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIDAuNSAqIChrICogayAqICgocyArIDEpICogayAtIHMpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAyKTtcbiAgICB9LFxuICB9LFxuICBCb3VuY2U6IHtcbiAgICBJbjogZnVuY3Rpb24gKGspIHtcbiAgICAgIHJldHVybiAxIC0gRWFzaW5nLkJvdW5jZS5PdXQoMSAtIGspO1xuICAgIH0sXG4gICAgT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgaWYgKGsgPCAxIC8gMi43NSkge1xuICAgICAgICByZXR1cm4gNy41NjI1ICogayAqIGs7XG4gICAgICB9IGVsc2UgaWYgKGsgPCAyIC8gMi43NSkge1xuICAgICAgICByZXR1cm4gNy41NjI1ICogKGsgLT0gMS41IC8gMi43NSkgKiBrICsgMC43NTtcbiAgICAgIH0gZWxzZSBpZiAoayA8IDIuNSAvIDIuNzUpIHtcbiAgICAgICAgcmV0dXJuIDcuNTYyNSAqIChrIC09IDIuMjUgLyAyLjc1KSAqIGsgKyAwLjkzNzU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gNy41NjI1ICogKGsgLT0gMi42MjUgLyAyLjc1KSAqIGsgKyAwLjk4NDM3NTtcbiAgICAgIH1cbiAgICB9LFxuICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgaWYgKGsgPCAwLjUpIHtcbiAgICAgICAgcmV0dXJuIEVhc2luZy5Cb3VuY2UuSW4oayAqIDIpICogMC41O1xuICAgICAgfVxuICAgICAgcmV0dXJuIEVhc2luZy5Cb3VuY2UuT3V0KGsgKiAyIC0gMSkgKiAwLjUgKyAwLjU7XG4gICAgfSxcbiAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBFYXNpbmc7XG4iLCJjb25zdCBUcmFuc2Zvcm0gPSB7XG4gIHJlZ2lzdGVyKGlkLCBmdW5jKSB7XG4gICAgdGhpc1tpZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRyYW5zZm9ybUFuaW1hdGUoYW5pbWF0ZSkge1xuICAgICAgICBpZiAoIWFuaW1hdGUpIHJldHVybiBmdW5jO1xuICAgICAgICBmdW5jKGFuaW1hdGUsIC4uLmFyZ3MpO1xuICAgICAgfTtcbiAgICB9O1xuICB9LFxufTtcblRyYW5zZm9ybS5yZWdpc3RlcignbG9vcCcsIGZ1bmN0aW9uIChhbmltYXRlLCBudW0pIHtcbiAgYW5pbWF0ZS5vbignc3RhcnQnLCAoaW5zdGFuY2UpID0+IHtcbiAgICBpbnN0YW5jZS5sb29wQ291bnQgPSBudW07XG4gIH0pO1xuICBhbmltYXRlLm9uKCdlbmQnLCAoaW5zdGFuY2UpID0+IHtcbiAgICBpbnN0YW5jZS5sb29wQ291bnQtLTtcbiAgICBpZiAoaW5zdGFuY2UubG9vcENvdW50IDw9IDApIGluc3RhbmNlLmlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICBlbHNlIHtcbiAgICAgIGluc3RhbmNlLmlzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbn0pO1xuVHJhbnNmb3JtLnJlZ2lzdGVyKCdyZXZlcnNlJywgZnVuY3Rpb24gKGFuaW1hdGUpIHtcbiAgYW5pbWF0ZS5vbignc3RhcnQnLCAoaW5zKSA9PiB7XG4gICAgaW5zLmlzUmV2ZXJzZWQgPSAhaW5zLmlzUmV2ZXJzZWQ7XG4gIH0pO1xufSk7XG5UcmFuc2Zvcm0ucmVnaXN0ZXIoJ3lveW8nLCBmdW5jdGlvbiAoYW5pbWF0ZSkge1xuICBhbmltYXRlLm9uKCdlbmQnLCAoaW5zKSA9PiB7XG4gICAgaW5zLmlzUmV2ZXJzZWQgPSAhaW5zLmlzUmV2ZXJzZWQ7XG4gICAgaWYgKCFpbnMuaXNZb3lvZWQpIGlucy5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgIGlucy5pc1lveW9lZCA9IHRydWU7XG4gIH0pO1xufSk7XG5leHBvcnQgZGVmYXVsdCBUcmFuc2Zvcm07XG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50ZW1pdHRlcjMnO1xuaW1wb3J0IEVhc2luZyBmcm9tICcuL0Vhc2luZyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBBbmltYXRlSW5zdGFuY2UsIEFuaW1hdGVJbnN0YW5jZUNoYWluIH0gZnJvbSAnLi9JbnN0YW5jZSc7XG4vLyB0d2Vlbi51cGRhdGUoZWxwYXNlZCk7IOS4jeaMh+WumuWImeaYr+WGhemDqGxpc3Rcbi8vIHR3ZWVuLnVwZGF0ZShlbHBhc2VkLCBsaXN0KTtcbmNvbnN0IExpc3QgPSBbXTsgLy8g5pu05paw6Zif5YiXLCDmr4/luKfmm7TmlrDml7bmm7TmlrDmraTpmJ/liJfnmoRcbmZ1bmN0aW9uIHVwZGF0ZShlbHBhc2VkLCBsaXN0ID0gTGlzdCkge1xuICBsaXN0LmZvckVhY2goKGluc3RhbmNlKSA9PiB7XG4gICAgaWYgKGluc3RhbmNlLmlzUGxheWluZykge1xuICAgICAgaW5zdGFuY2UudXBkYXRlKGVscGFzZWQpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIEFuaW1hdGUocGFyYW0pIHtcbiAgaWYgKFxuICAgIEFycmF5LmlzQXJyYXkocGFyYW0pIHx8XG4gICAgcGFyYW0gaW5zdGFuY2VvZiBCYXNlQW5pbWF0ZSB8fFxuICAgIHBhcmFtIGluc3RhbmNlb2YgQW5pbWF0ZUNoYWluIHx8XG4gICAgdHlwZW9mIHBhcmFtID09PSAnbnVtYmVyJ1xuICApIHtcbiAgICAvKiog6L2s5ZCRQW5pbWF0ZUNoYWluICovXG4gICAgcmV0dXJuIG5ldyBBbmltYXRlQ2hhaW4oLi4uYXJndW1lbnRzKTtcbiAgfVxuICByZXR1cm4gbmV3IEJhc2VBbmltYXRlKC4uLmFyZ3VtZW50cyk7XG59XG4vKipcbiAqIOaKiuS4gOS4qmV2ZW50RW1pdHRlcueahOS6i+S7tiDlpI3liLbliLDmlrDnmoRldmVudEVtaXR0ZXLkuIrpnaJcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBldmVudEVtaXR0ZXJcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSB0b1xuICovXG5mdW5jdGlvbiBjbG9uZUV2ZW50RW1pdHRlcihldmVudEVtaXR0ZXIsIHRvKSB7XG4gIGNvbnN0IHsgX2V2ZW50czogZXZlbnRzLCBfZXZlbnRzQ291bnQgfSA9IGV2ZW50RW1pdHRlcjtcbiAgZm9yIChjb25zdCBpZCBpbiBldmVudHMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50c1tpZF07XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKCh2KSA9PiB7XG4gICAgICAgIGlmICh2LmNvbnRleHQgPT09IGV2ZW50RW1pdHRlcikgdi5jb250ZXh0ID0gdG87XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlLmNvbnRleHQgPT09IGV2ZW50RW1pdHRlcikge1xuICAgICAgdmFsdWUuY29udGV4dCA9IHRvO1xuICAgIH1cbiAgICB0by5fZXZlbnRzW2lkXSA9IHZhbHVlO1xuICB9XG4gIHRvLl9ldmVudHNDb3VudCA9IF9ldmVudHNDb3VudDtcbn1cbi8qKlxuICog5Z+656GA5Yqo55S777yM5o6n5Yi25rWB56iL77yMdHJhbnNmb3Jt77yM5Z+656GA5Yqo55S75a6M5oiQb25cbiAqIOS4gOS4quWfuuehgOWKqOeUu+aOp+WItuS4gOe7hO+8jOeUn+aIkOWunuS+i+aJjeacieWunuS+i+eahGV2ZW50c1xuICovXG5mdW5jdGlvbiBleHRlbmRGdW5jdGlvbihhbmltYXRlLCB0cmFuc2Zvcm0pIHtcbiAgaWYgKHR5cGVvZiB0cmFuc2Zvcm0gIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBFcnJvcignZXh0ZW5kIHBhcmFtcyBlcnJvcicpO1xuICBjb25zdCBuZXdBbmltYXRlID0gbmV3IEFuaW1hdGVDaGFpbihhbmltYXRlKTtcbiAgLy8gaWYgZXh0ZW5kIEZ1bmN0aW9uLCBpdCBqdXN0IGNvbnRyb2wgaXRzIGNoaWxkIGluc3RhbmNlXG4gIC8vIGNsb25lRXZlbnRFbWl0dGVyKGFuaW1hdGUsIG5ld0FuaW1hdGUpO1xuICB0cmFuc2Zvcm0obmV3QW5pbWF0ZSk7XG4gIHJldHVybiBuZXdBbmltYXRlO1xufVxuY2xhc3MgQmFzZUFuaW1hdGUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgZnJvbSA9IDAsXG4gICAgdG8gPSAxLFxuICAgIGVhc2luZyA9IEVhc2luZy5MaW5lYXIuTm9uZSxcbiAgICB0aW1lID0gMTAwMCxcbiAgICBsaXN0ID0gTGlzdCxcbiAgfSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5mcm9tID0gZnJvbTtcbiAgICB0aGlzLnRvID0gdG87XG4gICAgdGhpcy5lYXNpbmcgPSBlYXNpbmc7XG4gICAgdGhpcy50aW1lID0gdGltZTtcbiAgICB0aGlzLmxpc3QgPSBsaXN0O1xuICB9XG5cbiAgYXBwbHkoLi4uYXJncykge1xuICAgIHJldHVybiBuZXcgQW5pbWF0ZUluc3RhbmNlKHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgZXh0ZW5kKHZhbHVlLCAuLi5hcmdzKSB7XG4gICAgbGV0IG5ld1ZhbHVlID0ge307XG4gICAgbGV0IGFuaW1hdGUgPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBuZXdEYXRhID0ge1xuICAgICAgICBmcm9tOiB0aGlzLmZyb20sXG4gICAgICAgIHRvOiB0aGlzLnRvLFxuICAgICAgICBlYXNpbmc6IHRoaXMuZWFzaW5nLFxuICAgICAgICB0aW1lOiB0aGlzLnRpbWUsXG4gICAgICAgIGxpc3Q6IHRoaXMubGlzdCxcbiAgICAgICAgLi4ubmV3VmFsdWUsXG4gICAgICB9O1xuICAgICAgYW5pbWF0ZSA9IG5ldyBCYXNlQW5pbWF0ZShuZXdEYXRhKTtcbiAgICAgIGNsb25lRXZlbnRFbWl0dGVyKHRoaXMsIGFuaW1hdGUpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIGFyZ3MudW5zaGlmdCh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBhcmdzLnJlZHVjZSgoYWNjLCBjdXIpID0+IGV4dGVuZEZ1bmN0aW9uKGFjYywgY3VyKSwgYW5pbWF0ZSk7XG4gIH1cbn1cbi8qKlxuICog5ZCI5oiQ5LiA5Liq5paw55qEQW5pbWF0Ze+8jFxuICog5L2/55SoY2FsbOi/lOWbnuS4gOS4quaWsOeahEFuaW1hdGVJbnN0YW5jZe+8jOacieaWsOeahGJlZ2lu77yM5paw55qEZW5k77yM5paw55qEc3RhcnRcbiAqIOaIluiAheivtOaYryDmnInkuIDkuKogQW5pbWF0ZUluc3RhbmNlQ2hhaW5cbiAqL1xuZnVuY3Rpb24gdGVzdEFyZ3MoYXJncykge1xuICBpZiAoXG4gICAgYXJncyBpbnN0YW5jZW9mIEJhc2VBbmltYXRlIHx8XG4gICAgdHlwZW9mIGFyZ3MgPT09ICdudW1iZXInIHx8XG4gICAgYXJncyBpbnN0YW5jZW9mIEFuaW1hdGVDaGFpblxuICApXG4gICAgcmV0dXJuIHRydWU7XG4gIGlmIChBcnJheS5pc0FycmF5KGFyZ3MpICYmIGFyZ3MuZXZlcnkoKHYpID0+IHRlc3RBcmdzKHYpKSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn1cbi8qKlxuICog5YWB6K645Lyg5YWl5pe26Ze0XG4gKi9cbi8qKlxuICog5Yqo55S75pivQ2hhaW7vvIwg55Sx5a2QQW5pbWF0ZUluc3RhbmNl57uE5oiQ77yM5a2QaW5zdGFuY2XkvZzkuLog5Yqo55S777yM562J5b6FXG4gKi9cbmNvbnN0IGdldFRpbWVBbmltYXRlID0gdXRpbHMuY2FjaGVkKGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgcmV0dXJuIG5ldyBCYXNlQW5pbWF0ZSh7XG4gICAgdGltZTogbnVtYmVyLFxuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBnZXRJbnN0YW5jZShjaGFpbiwgZWwpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hhaW4pKSB7XG4gICAgcmV0dXJuIGNoYWluLm1hcCgodikgPT4gZ2V0SW5zdGFuY2UodiwgZWwpKTtcbiAgfVxuICBpZiAodHlwZW9mIGNoYWluID09PSAnbnVtYmVyJykge1xuICAgIGNvbnN0IGFuaW1hdGUgPSBnZXRUaW1lQW5pbWF0ZShjaGFpbik7XG4gICAgY29uc3QgaW5zID0gYW5pbWF0ZS5hcHBseSguLi5lbCk7XG4gICAgaW5zLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZShlbHBhc2VkKSB7XG4gICAgICBpZiAoZWxwYXNlZCkgdGhpcy50aW1lICs9IGVscGFzZWQ7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy50aW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy50aW1lIC0gdGhpcy5zdGFydFRpbWUgPj0gdGhpcy5hbmltYXRlLnRpbWUpIHRoaXMuZW5kKCk7XG4gICAgfTtcbiAgICByZXR1cm4gaW5zO1xuICB9XG4gIHJldHVybiBjaGFpbi5hcHBseSguLi5lbCk7XG59XG5cbmNsYXNzIEFuaW1hdGVDaGFpbiBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICghdGVzdEFyZ3MoYXJncykpIHRocm93IG5ldyBFcnJvcignQW5pbWF0ZSBhcmd1bWVudHMgZXJyb3InKTtcbiAgICB0aGlzLmNoYWluID0gYXJncztcbiAgfVxuXG4gIGV4dGVuZCguLi5hcmdzKSB7XG4gICAgcmV0dXJuIGFyZ3MucmVkdWNlKChhY2MsIGN1cikgPT4gZXh0ZW5kRnVuY3Rpb24oYWNjLCBjdXIpLCB0aGlzKTtcbiAgfVxuXG4gIGFwcGx5KC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gbmV3IEFuaW1hdGVJbnN0YW5jZUNoYWluKHRoaXMsIGFyZ3MsIGdldEluc3RhbmNlKHRoaXMuY2hhaW4sIGFyZ3MpKTtcbiAgfVxufVxuXG5leHBvcnQgeyBMaXN0LCB1cGRhdGUsIEFuaW1hdGUgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbiAgLCBwcmVmaXggPSAnfic7XG5cbi8qKlxuICogQ29uc3RydWN0b3IgdG8gY3JlYXRlIGEgc3RvcmFnZSBmb3Igb3VyIGBFRWAgb2JqZWN0cy5cbiAqIEFuIGBFdmVudHNgIGluc3RhbmNlIGlzIGEgcGxhaW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIGV2ZW50IG5hbWVzLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRXZlbnRzKCkge31cblxuLy9cbi8vIFdlIHRyeSB0byBub3QgaW5oZXJpdCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC4gSW4gc29tZSBlbmdpbmVzIGNyZWF0aW5nIGFuXG4vLyBpbnN0YW5jZSBpbiB0aGlzIHdheSBpcyBmYXN0ZXIgdGhhbiBjYWxsaW5nIGBPYmplY3QuY3JlYXRlKG51bGwpYCBkaXJlY3RseS5cbi8vIElmIGBPYmplY3QuY3JlYXRlKG51bGwpYCBpcyBub3Qgc3VwcG9ydGVkIHdlIHByZWZpeCB0aGUgZXZlbnQgbmFtZXMgd2l0aCBhXG4vLyBjaGFyYWN0ZXIgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGJ1aWx0LWluIG9iamVjdCBwcm9wZXJ0aWVzIGFyZSBub3Rcbi8vIG92ZXJyaWRkZW4gb3IgdXNlZCBhcyBhbiBhdHRhY2sgdmVjdG9yLlxuLy9cbmlmIChPYmplY3QuY3JlYXRlKSB7XG4gIEV2ZW50cy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIC8vXG4gIC8vIFRoaXMgaGFjayBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgYF9fcHJvdG9fX2AgcHJvcGVydHkgaXMgc3RpbGwgaW5oZXJpdGVkIGluXG4gIC8vIHNvbWUgb2xkIGJyb3dzZXJzIGxpa2UgQW5kcm9pZCA0LCBpUGhvbmUgNS4xLCBPcGVyYSAxMSBhbmQgU2FmYXJpIDUuXG4gIC8vXG4gIGlmICghbmV3IEV2ZW50cygpLl9fcHJvdG9fXykgcHJlZml4ID0gZmFsc2U7XG59XG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgYSBzaW5nbGUgZXZlbnQgbGlzdGVuZXIuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29uY2U9ZmFsc2VdIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEVFKGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHRoaXMuZm4gPSBmbjtcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5vbmNlID0gb25jZSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBTcGVjaWZ5IGlmIHRoZSBsaXN0ZW5lciBpcyBhIG9uZS10aW1lIGxpc3RlbmVyLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFkZExpc3RlbmVyKGVtaXR0ZXIsIGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSkge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGxpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyID0gbmV3IEVFKGZuLCBjb250ZXh0IHx8IGVtaXR0ZXIsIG9uY2UpXG4gICAgLCBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghZW1pdHRlci5fZXZlbnRzW2V2dF0pIGVtaXR0ZXIuX2V2ZW50c1tldnRdID0gbGlzdGVuZXIsIGVtaXR0ZXIuX2V2ZW50c0NvdW50Kys7XG4gIGVsc2UgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XS5mbikgZW1pdHRlci5fZXZlbnRzW2V2dF0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2UgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBbZW1pdHRlci5fZXZlbnRzW2V2dF0sIGxpc3RlbmVyXTtcblxuICByZXR1cm4gZW1pdHRlcjtcbn1cblxuLyoqXG4gKiBDbGVhciBldmVudCBieSBuYW1lLlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZ0IFRoZSBFdmVudCBuYW1lLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2xlYXJFdmVudChlbWl0dGVyLCBldnQpIHtcbiAgaWYgKC0tZW1pdHRlci5fZXZlbnRzQ291bnQgPT09IDApIGVtaXR0ZXIuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgZWxzZSBkZWxldGUgZW1pdHRlci5fZXZlbnRzW2V2dF07XG59XG5cbi8qKlxuICogTWluaW1hbCBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UgdGhhdCBpcyBtb2xkZWQgYWdhaW5zdCB0aGUgTm9kZS5qc1xuICogYEV2ZW50RW1pdHRlcmAgaW50ZXJmYWNlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xufVxuXG4vKipcbiAqIFJldHVybiBhbiBhcnJheSBsaXN0aW5nIHRoZSBldmVudHMgZm9yIHdoaWNoIHRoZSBlbWl0dGVyIGhhcyByZWdpc3RlcmVkXG4gKiBsaXN0ZW5lcnMuXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICB2YXIgbmFtZXMgPSBbXVxuICAgICwgZXZlbnRzXG4gICAgLCBuYW1lO1xuXG4gIGlmICh0aGlzLl9ldmVudHNDb3VudCA9PT0gMCkgcmV0dXJuIG5hbWVzO1xuXG4gIGZvciAobmFtZSBpbiAoZXZlbnRzID0gdGhpcy5fZXZlbnRzKSkge1xuICAgIGlmIChoYXMuY2FsbChldmVudHMsIG5hbWUpKSBuYW1lcy5wdXNoKHByZWZpeCA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lKTtcbiAgfVxuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgcmV0dXJuIG5hbWVzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGV2ZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIG5hbWVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gVGhlIHJlZ2lzdGVyZWQgbGlzdGVuZXJzLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyhldmVudCkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudFxuICAgICwgaGFuZGxlcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcblxuICBpZiAoIWhhbmRsZXJzKSByZXR1cm4gW107XG4gIGlmIChoYW5kbGVycy5mbikgcmV0dXJuIFtoYW5kbGVycy5mbl07XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBoYW5kbGVycy5sZW5ndGgsIGVlID0gbmV3IEFycmF5KGwpOyBpIDwgbDsgaSsrKSB7XG4gICAgZWVbaV0gPSBoYW5kbGVyc1tpXS5mbjtcbiAgfVxuXG4gIHJldHVybiBlZTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzIGxpc3RlbmluZyB0byBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgbGlzdGVuZXJzLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbiBsaXN0ZW5lckNvdW50KGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcblxuICBpZiAoIWxpc3RlbmVycykgcmV0dXJuIDA7XG4gIGlmIChsaXN0ZW5lcnMuZm4pIHJldHVybiAxO1xuICByZXR1cm4gbGlzdGVuZXJzLmxlbmd0aDtcbn07XG5cbi8qKlxuICogQ2FsbHMgZWFjaCBvZiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgZXZlbnQgaGFkIGxpc3RlbmVycywgZWxzZSBgZmFsc2VgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2ZW50LCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XVxuICAgICwgbGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgYXJnc1xuICAgICwgaTtcblxuICBpZiAobGlzdGVuZXJzLmZuKSB7XG4gICAgaWYgKGxpc3RlbmVycy5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnMuZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICBzd2l0Y2ggKGxlbikge1xuICAgICAgY2FzZSAxOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQpLCB0cnVlO1xuICAgICAgY2FzZSAyOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExKSwgdHJ1ZTtcbiAgICAgIGNhc2UgMzogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIpLCB0cnVlO1xuICAgICAgY2FzZSA0OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMpLCB0cnVlO1xuICAgICAgY2FzZSA1OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgNjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCwgYTUpLCB0cnVlO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMuZm4uYXBwbHkobGlzdGVuZXJzLmNvbnRleHQsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoXG4gICAgICAsIGo7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChsaXN0ZW5lcnNbaV0ub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzW2ldLmZuLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgICBzd2l0Y2ggKGxlbikge1xuICAgICAgICBjYXNlIDE6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0KTsgYnJlYWs7XG4gICAgICAgIGNhc2UgMjogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgMzogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMik7IGJyZWFrO1xuICAgICAgICBjYXNlIDQ6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIsIGEzKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCFhcmdzKSBmb3IgKGogPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgYXJnc1tqIC0gMV0gPSBhcmd1bWVudHNbal07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogQWRkIGEgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIGFkZExpc3RlbmVyKHRoaXMsIGV2ZW50LCBmbiwgY29udGV4dCwgZmFsc2UpO1xufTtcblxuLyoqXG4gKiBBZGQgYSBvbmUtdGltZSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZShldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIGFkZExpc3RlbmVyKHRoaXMsIGV2ZW50LCBmbiwgY29udGV4dCwgdHJ1ZSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgbGlzdGVuZXJzIG9mIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gT25seSByZW1vdmUgdGhlIGxpc3RlbmVycyB0aGF0IG1hdGNoIHRoaXMgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgT25seSByZW1vdmUgdGhlIGxpc3RlbmVycyB0aGF0IGhhdmUgdGhpcyBjb250ZXh0LlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIE9ubHkgcmVtb3ZlIG9uZS10aW1lIGxpc3RlbmVycy5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gdGhpcztcbiAgaWYgKCFmbikge1xuICAgIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XTtcblxuICBpZiAobGlzdGVuZXJzLmZuKSB7XG4gICAgaWYgKFxuICAgICAgbGlzdGVuZXJzLmZuID09PSBmbiAmJlxuICAgICAgKCFvbmNlIHx8IGxpc3RlbmVycy5vbmNlKSAmJlxuICAgICAgKCFjb250ZXh0IHx8IGxpc3RlbmVycy5jb250ZXh0ID09PSBjb250ZXh0KVxuICAgICkge1xuICAgICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgZXZlbnRzID0gW10sIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICBsaXN0ZW5lcnNbaV0uZm4gIT09IGZuIHx8XG4gICAgICAgIChvbmNlICYmICFsaXN0ZW5lcnNbaV0ub25jZSkgfHxcbiAgICAgICAgKGNvbnRleHQgJiYgbGlzdGVuZXJzW2ldLmNvbnRleHQgIT09IGNvbnRleHQpXG4gICAgICApIHtcbiAgICAgICAgZXZlbnRzLnB1c2gobGlzdGVuZXJzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIFJlc2V0IHRoZSBhcnJheSwgb3IgcmVtb3ZlIGl0IGNvbXBsZXRlbHkgaWYgd2UgaGF2ZSBubyBtb3JlIGxpc3RlbmVycy5cbiAgICAvL1xuICAgIGlmIChldmVudHMubGVuZ3RoKSB0aGlzLl9ldmVudHNbZXZ0XSA9IGV2ZW50cy5sZW5ndGggPT09IDEgPyBldmVudHNbMF0gOiBldmVudHM7XG4gICAgZWxzZSBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFsbCBsaXN0ZW5lcnMsIG9yIHRob3NlIG9mIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IFtldmVudF0gVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQ7XG5cbiAgaWYgKGV2ZW50KSB7XG4gICAgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcbiAgICBpZiAodGhpcy5fZXZlbnRzW2V2dF0pIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gQWxpYXMgbWV0aG9kcyBuYW1lcyBiZWNhdXNlIHBlb3BsZSByb2xsIGxpa2UgdGhhdC5cbi8vXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcblxuLy9cbi8vIEV4cG9zZSB0aGUgcHJlZml4LlxuLy9cbkV2ZW50RW1pdHRlci5wcmVmaXhlZCA9IHByZWZpeDtcblxuLy9cbi8vIEFsbG93IGBFdmVudEVtaXR0ZXJgIHRvIGJlIGltcG9ydGVkIGFzIG1vZHVsZSBuYW1lc3BhY2UuXG4vL1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuLy9cbi8vIEV4cG9zZSB0aGUgbW9kdWxlLlxuLy9cbmlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG1vZHVsZSkge1xuICBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbn1cbiIsImNvbnN0IHV0aWxzID0ge1xuICAvKipcbiAgICog5a6e546w55qE5LiA5LiqZmlsdGVy77yMIOebtOaOpeaUueWPmOa6kOaVsOe7hO+8jCjmgJVmaWx0ZXLnlJ/miJDmlrDmlbDnu4TlvbHlk43ljp/mlbDnu4Tlm57mlLYs5oiW5bim5p2l5Zue5pS25oiQ5pysKVxuICAgKiDkuZ/kuI3nn6XpgZPliLDlupXmnInmsqHmnInku4DkuYjlpb3lpITvvIzlhYjov5nmoLc9ID1cbiAgICogQHBhcmFtIHthcnJheX0gYXJyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcbiAgICovXG4gIGZpbHRlcihhcnIsIGZ1bmMpIHtcbiAgICBsZXQga2VlcCA9IGZhbHNlO1xuICAgIGxldCBzdGFydCA9IDA7XG4gICAgbGV0IGRlbGV0ZUNvdW50ID0gMDtcbiAgICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuIC0gZGVsZXRlQ291bnQ7IGkrKykge1xuICAgICAgaWYgKGZ1bmMoYXJyW2ldLCBkZWxldGVDb3VudCArIGkpKSB7XG4gICAgICAgIGlmIChrZWVwKSB7XG4gICAgICAgICAga2VlcCA9ICFrZWVwO1xuICAgICAgICAgIGFyci5zcGxpY2Uoc3RhcnQsIGkgLSBzdGFydCk7XG4gICAgICAgICAgZGVsZXRlQ291bnQgKz0gaSAtIHN0YXJ0O1xuICAgICAgICAgIGkgPSBzdGFydDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgha2VlcCkge1xuICAgICAgICBzdGFydCA9IGk7XG4gICAgICAgIGtlZXAgPSAha2VlcDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGtlZXApIHtcbiAgICAgIGFyci5zcGxpY2Uoc3RhcnQsIGFyci5sZW5ndGggLSBzdGFydCk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH0sXG4gIGNsb25lKG9iaikge1xuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgcmV0dXJuIG9iajtcbiAgICBjb25zdCBuZXdPYmogPSBBcnJheS5pc0FycmF5KG9iaikgPyBbXSA6IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgY29uc3QgdmFsID0gb2JqW2tleV07XG4gICAgICBuZXdPYmpba2V5XSA9IHR5cGVvZiB2YWwgPT09ICdvYmplY3QnID8gdGhpcy5jbG9uZSh2YWwpIDogdmFsO1xuICAgIH1cbiAgICByZXR1cm4gbmV3T2JqO1xuICB9LFxuICBjYWNoZWQoZm4pIHtcbiAgICBjb25zdCBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGNhY2hlZEZuKHN0cikge1xuICAgICAgY29uc3QgaGl0ID0gY2FjaGVbc3RyXTtcbiAgICAgIHJldHVybiBoaXQgfHwgKGNhY2hlW3N0cl0gPSBmbihzdHIpKTtcbiAgICB9O1xuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IHV0aWxzO1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuLyoqXG4gKiBJbnN0YW5jZSDljbMg5a6e5L6L77yM5Y2zYW5pbWF0ZeWcqOiwg+eUqGFwcGx55pa55rOV5ZCO6L+U5Zue55qE5pWw5o2uXG4gKiDni6znq4vkuo5hbmltYXRl77yM5L2G5Y+I5Y+X5o6n5LqOYW5pbWF0ZeeahGVtaXR0ZXJcbiAqIEluc3RhbmNlQ2hpYW7mmK8gYW5pbWF0ZUNoYWlu55qE5a6e5L6L77yM5piv5pKt5pS+5a2QaW5zdGFuY2XvvIzmnIDnu4jlrozmiJDoh6rouqvmkq3mlL5cbiAqL1xuY2xhc3MgQmFzZUFuaW1hdGVJbnN0YW5jZSB7XG4gIGNvbnN0cnVjdG9yKGFuaW1hdGUsIGVsKSB7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgdGhpcy5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNSZXZlcnNlZCA9IGZhbHNlO1xuICAgIHRoaXMuYW5pbWF0ZSA9IGFuaW1hdGU7XG4gICAgdGhpcy50aW1lID0gMDtcbiAgICB0aGlzLmVtaXQoJ2luaXQnKTtcbiAgfVxuXG4gIGVtaXQoaWQsIC4uLmFyZ3MpIHtcbiAgICB0aGlzLmFuaW1hdGUuZW1pdChpZCwgdGhpcywgLi4uYXJncyk7XG4gIH1cblxuICBldmVyeShmdW5jKSB7XG4gICAgdGhpcy5lbC5mb3JFYWNoKCh2LCBpKSA9PiB7XG4gICAgICBpZiAodiAhPT0gbnVsbCAmJiB2ICE9PSB1bmRlZmluZWQpIGZ1bmModiwgaSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGFydChjYWxsYmFjaykge1xuICAgIHRoaXMuZW1pdCgnc3RhcnQnKTsgLy8g5YWo6YOo5oGi5aSN6Ieq6Lqr54q25oCBXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMuYmVnaW4oKTtcbiAgfVxuXG4gIGJlZ2luKCkge1xuICAgIHRoaXMuZW1pdCgnYmVnaW4nKTtcbiAgICB0aGlzLmlzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB0aGlzLnRpbWUgPSB0aGlzLnN0YXJ0VGltZTtcbiAgICB0aGlzLnBsYXkoKTtcbiAgfVxuXG4gIGVuZCgpIHtcbiAgICB0aGlzLmlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoJ2VuZCcpO1xuICAgIGlmICh0aGlzLmlzQ29tcGxldGVkKSB0aGlzLmNvbXBsZXRlKCk7XG4gICAgZWxzZSB0aGlzLmJlZ2luKCk7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIHRoaXMuZW1pdCgnY29tcGxldGUnKTtcbiAgICBpZiAodHlwZW9mIHRoaXMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHRoaXMuY2FsbGJhY2soKTtcbiAgfVxufVxuXG5jbGFzcyBBbmltYXRlSW5zdGFuY2UgZXh0ZW5kcyBCYXNlQW5pbWF0ZUluc3RhbmNlIHtcbiAgY29uc3RydWN0b3IoYW5pbWF0ZSwgZWwpIHtcbiAgICBzdXBlcihhbmltYXRlLCBlbCk7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuYW5pbWF0ZS5mcm9tO1xuICB9XG5cbiAgc3RhcnQoY2FsbGJhY2spIHtcbiAgICBzdXBlci5zdGFydChjYWxsYmFjayk7XG4gICAgdGhpcy5hbmltYXRlLmxpc3QucHVzaCh0aGlzKTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIHN1cGVyLmNvbXBsZXRlKCk7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuYW5pbWF0ZS5saXN0O1xuICAgIGNvbnN0IGkgPSBsaXN0LmluZGV4T2YodGhpcyk7XG4gICAgaWYgKGkgPiAtMSkgbGlzdC5zcGxpY2UoaSwgMSk7XG4gIH1cblxuICB1cGRhdGUoZWxwYXNlZCkge1xuICAgIGlmIChlbHBhc2VkKSB0aGlzLnRpbWUgKz0gZWxwYXNlZDtcbiAgICBlbHNlIHtcbiAgICAgIHRoaXMudGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIH1cbiAgICBjb25zdCB7IGFuaW1hdGUsIGlzUmV2ZXJzZWQgfSA9IHRoaXM7XG4gICAgY29uc3QgeyBmcm9tLCB0bywgdGltZTogZnVsbFRpbWUgfSA9IGFuaW1hdGU7XG4gICAgbGV0IHJhdGlvID0gKHRoaXMudGltZSAtIHRoaXMuc3RhcnRUaW1lKSAvIGZ1bGxUaW1lO1xuICAgIGxldCBjb21wbGV0ZWQgPSBmYWxzZTtcbiAgICBsZXQgdmFsdWU7XG4gICAgaWYgKHJhdGlvIDwgMSkgdmFsdWUgPSBhbmltYXRlLmVhc2luZyhpc1JldmVyc2VkID8gMSAtIHJhdGlvIDogcmF0aW8pO1xuICAgIGVsc2Uge1xuICAgICAgdmFsdWUgPSBpc1JldmVyc2VkID8gMCA6IDE7XG4gICAgICBjb21wbGV0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gZnJvbSArICh0byAtIGZyb20pICogdmFsdWU7XG4gICAgdGhpcy5lbWl0KCd1cGRhdGUnLCB0aGlzLnZhbHVlKTtcbiAgICBpZiAoY29tcGxldGVkKSB0aGlzLmVuZCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdhaXRBbGxDb21wbGV0ZShudW0sIGNhbGxiYWNrKSB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYWxsYmFjayBzaG91bGQgYmUgZnVuY3Rpb24nKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdhaXRBbGwoKSB7XG4gICAgY291bnQgKz0gMTtcbiAgICBpZiAoY291bnQgPT09IG51bSkgY2FsbGJhY2soKTtcbiAgfTtcbn1cbmNsYXNzIEFuaW1hdGVJbnN0YW5jZUNoYWluIGV4dGVuZHMgQmFzZUFuaW1hdGVJbnN0YW5jZSB7XG4gIGNvbnN0cnVjdG9yKGFuaW1hdGUsIGVsLCBjaGFpbikge1xuICAgIHN1cGVyKGFuaW1hdGUsIGVsKTtcbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB0aGlzLmluc3RhbmNlQ2hhaW4gPSBjaGFpbjtcbiAgfVxuXG4gIG5leHQoKSB7XG4gICAgY29uc3QgeyBjb3VudCwgaW5zdGFuY2VDaGFpbiwgaXNSZXZlcnNlZCB9ID0gdGhpcztcbiAgICBpZiAoY291bnQgPj0gaW5zdGFuY2VDaGFpbi5sZW5ndGgpIHJldHVybiB0aGlzLmVuZCgpO1xuICAgIGNvbnN0IGluZGV4ID0gaXNSZXZlcnNlZCA/IGluc3RhbmNlQ2hhaW4ubGVuZ3RoIC0gMSAtIGNvdW50IDogY291bnQ7XG4gICAgY29uc3QgdiA9IGluc3RhbmNlQ2hhaW5baW5kZXhdO1xuICAgIHRoaXMuY291bnQgKz0gMTtcbiAgICBjb25zdCBjYiA9ICgpID0+IHRoaXMubmV4dCgpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgICBjb25zdCB3YWl0QWxsID0gd2FpdEFsbENvbXBsZXRlKHYubGVuZ3RoLCBjYik7XG4gICAgICB2LmZvckVhY2goKGluc3RhbmNlKSA9PiB7XG4gICAgICAgIGluc3RhbmNlLmlzUmV2ZXJzZWQgPSBpc1JldmVyc2VkO1xuICAgICAgICBpbnN0YW5jZS5zdGFydCh3YWl0QWxsKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2LmlzUmV2ZXJzZWQgPSBpc1JldmVyc2VkO1xuICAgICAgdi5zdGFydChjYik7XG4gICAgfVxuICB9XG5cbiAgYmVnaW4oKSB7XG4gICAgc3VwZXIuYmVnaW4oKTtcbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB0aGlzLm5leHQoKTtcbiAgfVxufVxuXG5leHBvcnQgeyBBbmltYXRlSW5zdGFuY2UsIEFuaW1hdGVJbnN0YW5jZUNoYWluIH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFpXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=