function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Tween = {}));
})(this, function (exports) {
  'use strict';

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
    return module = {
      path: basedir,
      exports: {},
      require: function require(path, base) {
        return commonjsRequire(path, base === undefined || base === null ? module.path : base);
      }
    }, fn(module, module.exports), module.exports;
  }

  function commonjsRequire() {
    throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  } // References:
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // https://gist.github.com/1579671
  // http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision
  // https://gist.github.com/timhall/4078614
  // https://github.com/Financial-Times/polyfill-service/tree/master/polyfills/requestAnimationFrame
  // Expected to be used with Browserfiy
  // Browserify automatically detects the use of `global` and passes the
  // correct reference of `global`, `self`, and finally `window`


  var ONE_FRAME_TIME = 16; // Date.now

  if (!(Date.now && Date.prototype.getTime)) {
    Date.now = function now() {
      return new Date().getTime();
    };
  } // performance.now


  if (!(commonjsGlobal.performance && commonjsGlobal.performance.now)) {
    var startTime = Date.now();

    if (!commonjsGlobal.performance) {
      commonjsGlobal.performance = {};
    }

    commonjsGlobal.performance.now = function () {
      return Date.now() - startTime;
    };
  } // requestAnimationFrame


  var lastTime = Date.now();
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !commonjsGlobal.requestAnimationFrame; ++x) {
    var p = vendors[x];
    commonjsGlobal.requestAnimationFrame = commonjsGlobal["".concat(p, "RequestAnimationFrame")];
    commonjsGlobal.cancelAnimationFrame = commonjsGlobal["".concat(p, "CancelAnimationFrame")] || commonjsGlobal["".concat(p, "CancelRequestAnimationFrame")];
  }

  if (!commonjsGlobal.requestAnimationFrame) {
    commonjsGlobal.requestAnimationFrame = function (callback) {
      if (typeof callback !== 'function') {
        throw new TypeError("".concat(callback, "is not a function"));
      }

      var currentTime = Date.now();
      var delay = ONE_FRAME_TIME + lastTime - currentTime;

      if (delay < 0) {
        delay = 0;
      }

      lastTime = currentTime;
      return setTimeout(function () {
        lastTime = Date.now();
        callback(performance.now());
      }, delay);
    };
  }

  if (!commonjsGlobal.cancelAnimationFrame) {
    commonjsGlobal.cancelAnimationFrame = function (id) {
      return clearTimeout(id);
    };
  }

  function AnimationFrame(update) {
    var requestAnimationFrame = window.requestAnimationFrame;
    var performance = window.performance;
    var playing = false;
    var time = 0;

    function ticker(timestamp) {
      if (playing) {
        update(timestamp - time);
        time = timestamp;
        requestAnimationFrame(ticker);
      }
    }

    return {
      play: function play() {
        playing = true;
        time = performance.now();
        requestAnimationFrame(ticker);
      },
      stop: function stop() {
        playing = false;
      }
    };
  } // tweenTo的对象是函数时，带入函数得到值来parse， 先parse，再得到值与最终幻象值
  // 只在开始时parse一次, 如果返回为对象，则每次刷新时都更新， 就是当前值

  /**
   * 转化为易于显示的格式
   * @param value
   */


  function stringfy(obj) {
    return JSON.stringify(obj, function (key, value) {
      return typeof value === 'function' ? value.toString() : value;
    }, '\t');
  }
  /**
   * extended Error
   */


  var ParseError = /*#__PURE__*/function (_Error) {
    _inherits(ParseError, _Error);

    var _super = _createSuper(ParseError);

    function ParseError(from, to) {
      var _this;

      _classCallCheck(this, ParseError);

      var message = "\"from\" and \"to\" have different format:\n\"from\":  ".concat(stringfy(from), ",\n\"to\"  : ").concat(stringfy(to), ".\n");
      _this = _super.call(this, message);
      _this.name = 'Parse Error';
      return _this;
    }

    return ParseError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  function getEmptyType(from) {
    if (Array.isArray(from)) return '[]';
    if (_typeof(from) === 'object') return '{}';
    return "throw new Error(`\"from\" type error: ".concat(stringfy(from), "`)");
  }

  function parseFromTo(from, rawTo, config) {
    var to = typeof rawTo === 'function' ? rawTo(from) : rawTo;

    var _ref = config || {},
        _ref$isAssign = _ref.isAssign,
        isAssign = _ref$isAssign === void 0 ? true : _ref$isAssign;

    var expression;

    if (from !== to) {
      if (_typeof(to) === 'object' && _typeof(from) === 'object') {
        expression = (isAssign ? '' : "var a=".concat(getEmptyType(from), ";")) + baseParseFromTo(from, to, 'a', isAssign);
      } else if (typeof to === 'number' && typeof from === 'number') {
        expression = "a=".concat(from, "+b*").concat(to - from, ";");
      } else throw new ParseError(from, to);
    }

    var func = new Function('a', 'b', expression + 'return a;');
    return function tween(status) {
      return func(from, status);
    };
  }

  function baseParseFromTo(from, to, expressionKey, isAssign) {
    var expression = '';

    for (var key in to) {
      var fromValue = from[key];
      var toValue = typeof to[key] === 'function' ? to[key](fromValue) : to[key];

      if (fromValue !== toValue) {
        if (_typeof(toValue) === 'object' && _typeof(fromValue) === 'object') {
          var newExpressionKey = "".concat(expressionKey, "_").concat(key);
          expression += "var ".concat(newExpressionKey, "=").concat(expressionKey, "[\"").concat(key, "\"]").concat(isAssign ? '' : "=".concat(getEmptyType(fromValue)), ";").concat(baseParseFromTo(fromValue, toValue, newExpressionKey, isAssign));
        } else if (typeof toValue === 'number' && typeof fromValue === 'number') {
          expression += "".concat(expressionKey, "[\"").concat(key, "\"]=").concat(fromValue, "+b*").concat(toValue - fromValue, ";");
        } else throw new ParseError(fromValue, toValue);
      }
    }

    return expression;
  }
  /**
   * The Ease class provides a collection of easing functions for use with tween.js.
   */


  var Easing = {
    Linear: {
      None: function None(amount) {
        return amount;
      }
    },
    Quadratic: {
      In: function In(amount) {
        return amount * amount;
      },
      Out: function Out(amount) {
        return amount * (2 - amount);
      },
      InOut: function InOut(amount) {
        if ((amount *= 2) < 1) {
          return 0.5 * amount * amount;
        }

        return -0.5 * (--amount * (amount - 2) - 1);
      }
    },
    Cubic: {
      In: function In(amount) {
        return amount * amount * amount;
      },
      Out: function Out(amount) {
        return --amount * amount * amount + 1;
      },
      InOut: function InOut(amount) {
        if ((amount *= 2) < 1) {
          return 0.5 * amount * amount * amount;
        }

        return 0.5 * ((amount -= 2) * amount * amount + 2);
      }
    },
    Quartic: {
      In: function In(amount) {
        return amount * amount * amount * amount;
      },
      Out: function Out(amount) {
        return 1 - --amount * amount * amount * amount;
      },
      InOut: function InOut(amount) {
        if ((amount *= 2) < 1) {
          return 0.5 * amount * amount * amount * amount;
        }

        return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
      }
    },
    Quintic: {
      In: function In(amount) {
        return amount * amount * amount * amount * amount;
      },
      Out: function Out(amount) {
        return --amount * amount * amount * amount * amount + 1;
      },
      InOut: function InOut(amount) {
        if ((amount *= 2) < 1) {
          return 0.5 * amount * amount * amount * amount * amount;
        }

        return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
      }
    },
    Sinusoidal: {
      In: function In(amount) {
        return 1 - Math.cos(amount * Math.PI / 2);
      },
      Out: function Out(amount) {
        return Math.sin(amount * Math.PI / 2);
      },
      InOut: function InOut(amount) {
        return 0.5 * (1 - Math.cos(Math.PI * amount));
      }
    },
    Exponential: {
      In: function In(amount) {
        return amount === 0 ? 0 : Math.pow(1024, amount - 1);
      },
      Out: function Out(amount) {
        return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
      },
      InOut: function InOut(amount) {
        if (amount === 0) {
          return 0;
        }

        if (amount === 1) {
          return 1;
        }

        if ((amount *= 2) < 1) {
          return 0.5 * Math.pow(1024, amount - 1);
        }

        return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
      }
    },
    Circular: {
      In: function In(amount) {
        return 1 - Math.sqrt(1 - amount * amount);
      },
      Out: function Out(amount) {
        return Math.sqrt(1 - --amount * amount);
      },
      InOut: function InOut(amount) {
        if ((amount *= 2) < 1) {
          return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
        }

        return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
      }
    },
    Elastic: {
      In: function In(amount) {
        if (amount === 0) {
          return 0;
        }

        if (amount === 1) {
          return 1;
        }

        return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
      },
      Out: function Out(amount) {
        if (amount === 0) {
          return 0;
        }

        if (amount === 1) {
          return 1;
        }

        return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
      },
      InOut: function InOut(amount) {
        if (amount === 0) {
          return 0;
        }

        if (amount === 1) {
          return 1;
        }

        amount *= 2;

        if (amount < 1) {
          return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
        }

        return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
      }
    },
    Back: {
      In: function In(amount) {
        var s = 1.70158;
        return amount * amount * ((s + 1) * amount - s);
      },
      Out: function Out(amount) {
        var s = 1.70158;
        return --amount * amount * ((s + 1) * amount + s) + 1;
      },
      InOut: function InOut(amount) {
        var s = 1.70158 * 1.525;

        if ((amount *= 2) < 1) {
          return 0.5 * (amount * amount * ((s + 1) * amount - s));
        }

        return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
      }
    },
    Bounce: {
      In: function In(amount) {
        return 1 - Easing.Bounce.Out(1 - amount);
      },
      Out: function Out(amount) {
        if (amount < 1 / 2.75) {
          return 7.5625 * amount * amount;
        } else if (amount < 2 / 2.75) {
          return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
        } else if (amount < 2.5 / 2.75) {
          return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
        } else {
          return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
        }
      },
      InOut: function InOut(amount) {
        if (amount < 0.5) {
          return Easing.Bounce.In(amount * 2) * 0.5;
        }

        return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
      }
    }
  };
  var eventemitter3 = createCommonjsModule(function (module) {
    var has = Object.prototype.hasOwnProperty,
        prefix = '~';
    /**
     * Constructor to create a storage for our `EE` objects.
     * An `Events` instance is a plain object whose properties are event names.
     *
     * @constructor
     * @private
     */

    function Events() {} //
    // We try to not inherit from `Object.prototype`. In some engines creating an
    // instance in this way is faster than calling `Object.create(null)` directly.
    // If `Object.create(null)` is not supported we prefix the event names with a
    // character to make sure that the built-in object properties are not
    // overridden or used as an attack vector.
    //


    if (Object.create) {
      Events.prototype = Object.create(null); //
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

      var listener = new EE(fn, context || emitter, once),
          evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);else emitter._events[evt] = [emitter._events[evt], listener];
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
      if (--emitter._eventsCount === 0) emitter._events = new Events();else delete emitter._events[evt];
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
      var names = [],
          events,
          name;
      if (this._eventsCount === 0) return names;

      for (name in events = this._events) {
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
      var evt = prefix ? prefix + event : event,
          handlers = this._events[evt];
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
      var evt = prefix ? prefix + event : event,
          listeners = this._events[evt];
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
      var listeners = this._events[evt],
          len = arguments.length,
          args,
          i;

      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;

          case 2:
            return listeners.fn.call(listeners.context, a1), true;

          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;

          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;

          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;

          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }

        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }

        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length,
            j;

        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;

            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;

            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;

            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;

            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
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
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        } //
        // Reset the array, or remove it completely if we have no more listeners.
        //


        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else clearEvent(this, evt);
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
    }; //
    // Alias methods names because people roll like that.
    //


    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on; //
    // Expose the prefix.
    //

    EventEmitter.prefixed = prefix; //
    // Allow `EventEmitter` to be imported as module namespace.
    //

    EventEmitter.EventEmitter = EventEmitter; //
    // Expose the module.
    //

    {
      module.exports = EventEmitter;
    }
  });
  var utils = {
    /**
     * 实现的一个filter， 直接改变源数组，(怕filter生成新数组影响原数组回收,或带来回收成本)
     * 也不知道到底有没有什么好处，先这样= =
     * @param {array} arr
     * @param {function} func
     */
    filter: function filter(arr, func) {
      var keep = false;
      var start = 0;
      var deleteCount = 0;
      var len = arr.length;

      for (var i = 0; i < len - deleteCount; i++) {
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
    clone: function clone(obj, cloner) {
      var newObj = Array.isArray(obj) ? [] : {};

      for (var key in obj) {
        var val = obj[key];
        var value = cloner(key, val);

        if (value === undefined) {
          newObj[key] = _typeof(val) === 'object' ? this.clone(val, cloner) : val;
        } else newObj[key] = value;
      }

      return newObj;
    },
    isDef: function isDef(v) {
      return v !== undefined && v !== null;
    },
    cached: function cached(fn) {
      var cache = Object.create(null);
      return function cachedFn(str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
      };
    }
  };
  var Transform = {
    $register: function $register(id, func) {
      this[id] = func;
    },
    $apply: function $apply(id, ins) {
      if (typeof this[id] === 'function') {
        var on = function on(a, b) {
          return ins.on(a, b);
        };

        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        this[id].apply(this, [on].concat(args));
      } else throw new Error("transform \"".concat(id, "\" don't exist"));
    }
  };
  Transform.$register('loop', function (on, num) {
    on('start', function (ins) {
      ins.loopCount = num;
    });
    on('end', function (ins) {
      ins.loopCount--;
      if (ins.loopCount > 0) ins.isCompleted = false;
    });
  });
  Transform.$register('reverse', function (on) {
    on('start', function (ins) {
      ins.isReversed = !ins.isReversed;
    });
  });
  Transform.$register('yoyo', function (on) {
    on('start', function (ins) {
      ins.isYoyoed = false;
    });
    on('end', function (ins) {
      ins.isReversed = !ins.isReversed;
      if (!ins.isYoyoed) ins.isCompleted = false;
      ins.isYoyoed = true;
    });
  });

  var AnimateInstance = /*#__PURE__*/function (_eventemitter) {
    _inherits(AnimateInstance, _eventemitter);

    var _super2 = _createSuper(AnimateInstance);

    function AnimateInstance(from, to, time, animate) {
      var _this2;

      _classCallCheck(this, AnimateInstance);

      _this2 = _super2.call(this);
      _this2.isPlaying = false;
      _this2.fullTime = time;
      _this2.animateConfig = animate.config;
      _this2.parsed = parseFromTo(from, to, animate.config);

      _this2.animateConfig.list.push(_assertThisInitialized(_this2));

      return _this2;
    }

    _createClass(AnimateInstance, [{
      key: "_trigger",
      value: function _trigger() {
        this.start();
      }
      /** 动画开始 */

    }, {
      key: "start",
      value: function start() {
        var isReversed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.time = 0;
        this.play();
        this.isReversed = isReversed;
        this.isPlaying = true;
        this.isCompleted = false;
        this.emit('start', this);
        this.begin();
      }
      /** 动画完成 */

    }, {
      key: "complete",
      value: function complete() {
        this.isPlaying = false;
        this.emit('complete', this);
      }
      /** 动画每次开始 */

    }, {
      key: "begin",
      value: function begin() {
        this.emit('begin', this);
      }
      /** 动画每次结束 */

    }, {
      key: "end",
      value: function end() {
        this.isCompleted = true;
        this.emit('end', this);
        if (this.isCompleted) this.complete();else {
          this.time = 0;
          this.begin();
        }
      }
    }, {
      key: "play",
      value: function play() {
        this.isPlaying = true;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.isPlaying = false;
      }
    }, {
      key: "update",
      value: function update(elpased) {
        var isReversed = this.isReversed,
            fullTime = this.fullTime,
            animateConfig = this.animateConfig,
            parsed = this.parsed;
        this.time += elpased;
        var status = this.time / fullTime;

        if (status < 1) {
          this.emit('update', parsed(animateConfig.easing(isReversed ? 1 - status : status)), this);
        } else {
          this.emit('update', parsed(isReversed ? 0 : 1), this);
          this.end();
        }
      }
    }, {
      key: "transform",
      value: function transform(id) {
        var ins = new WrapperInstance(this);

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        Transform.$apply.apply(Transform, [id, ins].concat(args));

        this._trigger = function () {
          return ins._trigger();
        };

        return ins;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.emit('destroy');
        this.removeAllListeners();
        this._trigger = null;
        this.parsed = null;
      }
    }]);

    return AnimateInstance;
  }(eventemitter3);

  var WrapperInstance = /*#__PURE__*/function (_eventemitter2) {
    _inherits(WrapperInstance, _eventemitter2);

    var _super3 = _createSuper(WrapperInstance);

    function WrapperInstance(ins) {
      var _this3;

      _classCallCheck(this, WrapperInstance);

      _this3 = _super3.call(this);
      _this3.animateInstance = ins;
      ins.on('complete', function (animateInstance) {
        _this3.end();

        if (!_this3.isCompleted) animateInstance.isComplete = false;
      });
      ins.on('update', function (v) {
        _this3.emit('update', v, _assertThisInitialized(_this3));
      });
      ins.on('destroy', function (v) {
        _this3.emit('destroy');

        _this3.destroy();
      });
      return _this3;
    }

    _createClass(WrapperInstance, [{
      key: "_trigger",
      value: function _trigger() {
        this.start();
      }
    }, {
      key: "transform",
      value: function transform(id) {
        var ins = new WrapperInstance(this);

        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        Transform.$apply.apply(Transform, [id, ins].concat(args));

        this._trigger = function () {
          return ins._trigger();
        };

        return ins;
      }
      /** 动画开始 */

    }, {
      key: "start",
      value: function start() {
        var isReversed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.play();
        this.isReversed = isReversed;
        this.isPlaying = true;
        this.isCompleted = false;
        this.emit('start', this);
        this.begin();
      }
      /** 动画完成 */

    }, {
      key: "complete",
      value: function complete() {
        this.stop();
        this.emit('complete', this);
      }
      /** 动画每次开始 */

    }, {
      key: "begin",
      value: function begin() {
        this.emit('begin', this);
        this.animateInstance.start(this.isReversed);
      }
      /** 动画每次结束 */

    }, {
      key: "end",
      value: function end() {
        this.isCompleted = true;
        this.emit('end', this);
        if (this.isCompleted) this.complete();else {
          this.begin();
        }
      }
    }, {
      key: "play",
      value: function play() {
        this.animateInstance.play();
        this.isPlaying = true;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.animateInstance.stop();
        this.isPlaying = false;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.removeAllListeners();
        this.animateInstance = null;
      }
    }]);

    return WrapperInstance;
  }(eventemitter3);

  var List = [];
  var funcList = [];
  var filter = utils.filter;

  function update(elpased) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : List;

    if (funcList.length !== 0) {
      funcList.forEach(function (func) {
        return func();
      });
      funcList.splice(0, funcList.length);
    }

    if (list.length === 0) return;
    filter(list, function (ins) {
      if (ins.isCompleted) {
        ins.destroy();
        return false;
      }

      if (ins.isPlaying) ins.update(elpased);
      return true;
    });
  }

  var defaultAnimateConfig = {
    easing: Easing.Linear.None,
    list: List,
    isAssign: true
  };
  /**
   * 把一个eventEmitter的事件 复制到新的eventEmitter上面
   * @param {EventEmitter} eventEmitter
   * @param {EventEmitter} to
   */

  function cloneEventEmitter(eventEmitter, to) {
    var events = eventEmitter._events,
        _eventsCount = eventEmitter._eventsCount; // 不过多个增加事件时，可能会都增加，还是要深复制

    to._events = utils.clone(events, function (key, value) {
      if (key === 'context') {
        if (value === eventEmitter) return to;
        return value;
      }
    });
    to._eventsCount = _eventsCount;
  }

  var AnimateClass = /*#__PURE__*/function (_eventemitter3) {
    _inherits(AnimateClass, _eventemitter3);

    var _super4 = _createSuper(AnimateClass);

    function AnimateClass(to, config) {
      var _this4;

      _classCallCheck(this, AnimateClass);

      _this4 = _super4.call(this);
      _this4.to = to;
      _this4.config = _objectSpread(_objectSpread({}, defaultAnimateConfig), config);
      return _this4;
    }
    /**
     * @param {function} el - 生成具体的动画实例
     */


    _createClass(AnimateClass, [{
      key: "apply",
      value: function apply(el, time) {
        var ins = new AnimateInstance(el, this.to, time, this);
        cloneEventEmitter(this, ins);
        funcList.push(function () {
          ins._trigger();
        });
        return ins;
      }
      /**
       *
       */

    }, {
      key: "clone",
      value: function clone() {
        var animate = new AnimateClass(this.to, this.config);
        cloneEventEmitter(this, animate);
        return animate;
      }
    }, {
      key: "transform",
      value: function transform(id) {
        var animate = new AnimateWrapper(this);

        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        Transform.$apply.apply(Transform, [id, animate].concat(args));
        return animate;
      }
    }]);

    return AnimateClass;
  }(eventemitter3);

  var AnimateWrapper = /*#__PURE__*/function (_eventemitter4) {
    _inherits(AnimateWrapper, _eventemitter4);

    var _super5 = _createSuper(AnimateWrapper);

    function AnimateWrapper(animate) {
      var _this5;

      _classCallCheck(this, AnimateWrapper);

      _this5 = _super5.call(this);
      _this5.animate = animate;
      return _this5;
    }

    _createClass(AnimateWrapper, [{
      key: "apply",
      value: function apply(el, time) {
        var child = this.animate.apply(el, time);
        var ins = new WrapperInstance(child);
        cloneEventEmitter(this, ins);

        child._trigger = function () {
          ins._trigger();
        };

        return ins;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new AnimateWrapper(this.animate);
      }
    }, {
      key: "transform",
      value: function transform(id) {
        var animate = new AnimateWrapper(this);

        for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          args[_key5 - 1] = arguments[_key5];
        }

        Transform.$apply.apply(Transform, [id, animate].concat(args));
        return animate;
      }
    }]);

    return AnimateWrapper;
  }(eventemitter3);

  var Animate = function Animate(to, config) {
    return new AnimateClass(to, config);
  };

  Animate.config = function (config) {
    Object.assign(defaultAnimateConfig, config);
  };

  var ticker = AnimationFrame(function ticker(elpased) {
    update(elpased);
  });
  ticker.play();
  Animate.play = ticker.play;
  Animate.stop = ticker.stop;
  exports.Animate = Animate;
  exports.Easing = Easing;
  exports.Transform = Transform;
  exports.update = update;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
