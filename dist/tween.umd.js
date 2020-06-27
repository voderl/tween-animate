(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.tween = {}));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

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
	if (!(commonjsGlobal.performance && commonjsGlobal.performance.now)) {
	  const startTime = Date.now();

	  if (!commonjsGlobal.performance) {
	    commonjsGlobal.performance = {};
	  }

	  commonjsGlobal.performance.now = () => Date.now() - startTime;
	}

	// requestAnimationFrame
	let lastTime = Date.now();
	const vendors = ['ms', 'moz', 'webkit', 'o'];

	for (let x = 0; x < vendors.length && !commonjsGlobal.requestAnimationFrame; ++x) {
	  const p = vendors[x];

	  commonjsGlobal.requestAnimationFrame = commonjsGlobal[`${p}RequestAnimationFrame`];
	  commonjsGlobal.cancelAnimationFrame =
	    commonjsGlobal[`${p}CancelAnimationFrame`] ||
	    commonjsGlobal[`${p}CancelRequestAnimationFrame`];
	}

	if (!commonjsGlobal.requestAnimationFrame) {
	  commonjsGlobal.requestAnimationFrame = (callback) => {
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

	if (!commonjsGlobal.cancelAnimationFrame) {
	  commonjsGlobal.cancelAnimationFrame = (id) => clearTimeout(id);
	}

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

	var eventemitter3 = createCommonjsModule(function (module) {

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
	{
	  module.exports = EventEmitter;
	}
	});

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
	  clone(obj, cloner) {
	    const newObj = Array.isArray(obj) ? [] : {};
	    for (const key in obj) {
	      const val = obj[key];
	      let value = cloner(key, val);
	      if (value === undefined) {
	        newObj[key] = typeof val === 'object' ? this.clone(val, cloner) : val;
	      } else newObj[key] = value;
	    }
	    return newObj;
	  },
	  isDef(v) {
	    return v !== undefined && v !== null;
	  },
	  cached(fn) {
	    const cache = Object.create(null);
	    return function cachedFn(str) {
	      const hit = cache[str];
	      return hit || (cache[str] = fn(str));
	    };
	  },
	};

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	/**
	 * parse from and to
	 * @example from: { x: {a: 1}, y: 1}, to : {x: {a: 2}, y: 3}
	 * =>  [{key:x, list:[{key:a, from: 1, step: 1}]}, { key: y, from: 1, step: 3}];
	 *
	 */
	/**
	 * 转化为易于显示的格式
	 * @param value
	 */
	function stringfy(value) {
	    if (typeof value === 'object')
	        return JSON.stringify(value, null, '\t');
	    else
	        return "\"" + value + "\"";
	}
	/**
	 * extended Error
	 */
	var ParseError = /** @class */ (function (_super) {
	    __extends(ParseError, _super);
	    function ParseError(from, to) {
	        var _this = this;
	        var message = "from and to has different format:\n\"from\":  " + stringfy(from) + ",\n\"to\"  : " + stringfy(to) + ".\n";
	        _this = _super.call(this, message) || this;
	        _this.name = 'Parse Error';
	        return _this;
	    }
	    return ParseError;
	}(Error));
	function parseFromTo(fromValue, toValue) {
	    if (fromValue === toValue)
	        return null;
	    if (typeof toValue === 'object' && typeof fromValue === 'object') {
	        return parseFrom(fromValue, toValue, []);
	    }
	    else if (typeof toValue === 'number' && typeof fromValue === 'number') {
	        return {
	            from: fromValue,
	            step: toValue - fromValue,
	        };
	    }
	    else
	        throw new ParseError(fromValue, toValue);
	}
	function parseFrom(from, to, list) {
	    for (var key in to) {
	        var toValue = to[key];
	        var fromValue = from[key];
	        if (fromValue !== toValue) {
	            if (typeof toValue === 'object' && typeof fromValue === 'object') {
	                var arr = {
	                    key: key,
	                    list: parseFrom(fromValue, toValue, []),
	                };
	                list.push(arr);
	            }
	            else if (typeof toValue === 'number' && typeof fromValue === 'number') {
	                list.push({
	                    key: key,
	                    from: fromValue,
	                    step: toValue - fromValue,
	                });
	            }
	            else
	                throw new ParseError(fromValue, toValue);
	        }
	    }
	    return list;
	}
	function getStatus(parsed, value, applyTo) {
	    if (applyTo === void 0) { applyTo = {}; }
	    if (parsed === null)
	        return applyTo;
	    if (!Array.isArray(parsed))
	        return parsed.from + value * parsed.step;
	    return baseGetStatus(parsed, value, applyTo);
	}
	function baseGetStatus(parsed, value, list) {
	    if (list === void 0) { list = {}; }
	    parsed.forEach(function (info) {
	        if ('from' in info)
	            list[info.key] = info.from + value * info.step;
	        else if (typeof list[info.key] === 'object')
	            baseGetStatus(info.list, value, list[info.key]);
	        else
	            list[info.key] = baseGetStatus(info.list, value, {});
	    });
	    return list;
	}

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
	    this.speed = 1;
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
	    return this;
	  }

	  begin() {
	    this.emit('begin');
	    this.isCompleted = false;
	    this.startTime = performance.now();
	    this.time = this.startTime;
	    this.isPlaying = true;
	  }

	  end() {
	    this.isCompleted = true;
	    this.emit('end');
	    if (this.isCompleted) this.complete();
	    else this.begin();
	  }

	  play() {
	    this.animate.list.push(this);
	    this.isPlaying = true;
	  }

	  stop() {
	    const list = this.animate.list;
	    const index = list.indexOf(this);
	    if (index > -1) list.splice(index, 1);
	    this.isPlaying = false;
	  }

	  complete() {
	    this.emit('complete');
	    this.stop();
	    if (typeof this.callback === 'function') this.callback();
	    if (this.isRoot) this.destroy();
	  }

	  destroy() {
	    this.el = null;
	    this.animate = null;
	    this.callback = null;
	  }
	}

	function EMPTY() {}
	class AnimateInstance extends BaseAnimateInstance {
	  constructor(animate, el) {
	    super(animate, el);
	    if (typeof animate.update === 'function') {
	      this.onUpdate = animate.update;
	    } else this.onUpdate = EMPTY;
	    // render 一层 起点 终点， 有from，有to
	    if (
	      ['from', 'to'].some((key) => typeof animate[key] === 'function') ||
	      !utils.isDef(animate.from)
	    ) {
	      const functionalFrom = typeof animate.from === 'function';
	      const functionalTo = typeof animate.to === 'function';
	      this.parsed = el.map((el, i) => {
	        const from = functionalFrom ? animate.from(el, i) : el;
	        const to = functionalTo ? animate.to(el, i) : animate.to;
	        return parseFromTo(from, to);
	      });
	      this.noFrom = true;
	      if (!animate.assign) this.value = [];
	    } else {
	      this.parsed = parseFromTo(animate.from, animate.to);
	      this.noFrom = false;
	    }
	    // if (animate._parsed) {
	  }

	  start(callback) {
	    this.animate.list.push(this);
	    return super.start(callback);
	  }

	  begin() {
	    super.begin();
	  }

	  update(elpased) {
	    if (typeof elpased === 'number') this.time += elpased;
	    else {
	      this.time = performance.now();
	    }
	    const { animate, isReversed, speed, noFrom, parsed } = this;
	    const { time: fullTime, easing, assign } = animate;
	    let ratio = ((this.time - this.startTime) * speed) / fullTime;
	    let completed = false;
	    let value;
	    if (ratio < 1) value = easing(isReversed ? 1 - ratio : ratio);
	    else {
	      value = isReversed ? 0 : 1;
	      completed = true;
	    }
	    if (noFrom) {
	      // 如果没有from 每一个单独做一个parsed
	      if (assign) {
	        this.el.forEach((e, i) => {
	          this.onUpdate(e, getStatus(parsed[i], value, e));
	        });
	      } else {
	        this.el.forEach((e, i) => {
	          this.value[i] = getStatus(parsed[i], value, this.value[i]);
	          this.onUpdate(e, this.value[i]);
	        });
	      }
	    } else {
	      if (assign) {
	        this.el.forEach((e) => {
	          this.onUpdate(e, getStatus(parsed, value, e));
	        });
	      } else {
	        this.value = getStatus(parsed, value, this.value);
	        this.el.forEach((e, i) => {
	          this.onUpdate(e, this.value);
	        });
	      }
	    }
	    if (completed) {
	      this.end();
	    }
	  }

	  destroy() {
	    super.destroy();
	    this.parsed = null;
	    this.onUpdate = null;
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
	    this.instanceChain = chain;
	  }

	  next() {
	    const { count, instanceChain, isReversed } = this;
	    if (count >= instanceChain.length) {
	      this.end();
	      return;
	    }
	    const index = isReversed ? instanceChain.length - 1 - count : count;
	    const v = instanceChain[index];
	    this.count += 1;
	    this.instance = v;
	    const cb = (delay) => this.next(delay);
	    const data = {
	      isReversed: this.isReversed,
	      speed: this.speed,
	    };
	    if (Array.isArray(v)) {
	      const waitAll = waitAllComplete(v.length, cb);
	      v.forEach((instance) => {
	        Object.assign(instance, data);
	        instance.start(waitAll);
	      });
	    } else {
	      Object.assign(v, data);
	      v.start(cb);
	    }
	  }

	  play() {
	    const ins = this.instance;
	    if (Array.isArray(ins)) ins.forEach((instance) => instance.play());
	    else ins.play();
	  }

	  stop() {
	    const ins = this.instance;
	    if (Array.isArray(ins)) ins.forEach((instance) => instance.stop());
	    else ins.stop();
	  }
	  /**
	   * stop ?
	   * 父动画如何控制子动画的状态，双方状态独立，状态只有isPlaying，isReversed
	   */
	  begin() {
	    super.begin();
	    this.count = 0;
	    this.next();
	  }

	  destroy() {
	    super.destroy();
	    this.instanceChain.forEach((c) => c.destroy());
	    this.instanceChain = null;
	    this.instance = null;
	  }
	}

	/**
	 *  Vue props validate
	 */
	function warn(data) {
	  throw new Error(data);
	}
	const hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}
	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}
	const _toString = Object.prototype.toString;
	function toRawType(value) {
	  return _toString.call(value).slice(8, -1);
	}
	function cached(fn) {
	  const cache = Object.create(null);
	  return function cachedFn(str) {
	    const hit = cache[str];
	    return hit || (cache[str] = fn(str));
	  };
	}
	/**
	 * Hyphenate a camelCase string.
	 */
	const hyphenateRE = /\B([A-Z])/g;
	const hyphenate = cached((str) => {
	  return str.replace(hyphenateRE, '-$1').toLowerCase();
	});

	/**
	 * Capitalize a string.
	 */
	const capitalize = cached((str) => {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	});
	function isPlainObject(obj) {
	  return _toString.call(obj) === '[object Object]';
	}

	function validate(propOptions, propsData) {
	  Object.keys(propOptions).forEach((key) => {
	    propsData[key] = validateProp(key, propOptions, propsData);
	  });
	  return propsData;
	}

	function validateProp(key, propOptions, propsData) {
	  const prop = propOptions[key];
	  const absent = !hasOwn(propsData, key);
	  let value = propsData[key];
	  // boolean casting
	  const booleanIndex = getTypeIndex(Boolean, prop.type);
	  if (booleanIndex > -1) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (value === '' || value === hyphenate(key)) {
	      // only cast empty string / same name to boolean if
	      // boolean has higher priority
	      const stringIndex = getTypeIndex(String, prop.type);
	      if (stringIndex < 0 || booleanIndex < stringIndex) {
	        value = true;
	      }
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(prop, key);
	  }
	  // if (
	  //   process.env.NODE_ENV !== 'production'
	  // ) {
	  assertProp(prop, key, value, absent);
	  // }
	  return value;
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue(prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined;
	  }
	  const def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    warn(
	      'Invalid default value for prop "' +
	        key +
	        '": ' +
	        'Props with type Object/Array must use a factory function ' +
	        'to return the default value.',
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  // call factory function for non-Function types
	  // a value is Function if its prototype is function even across different execution context
	  return typeof def === 'function' && getType(prop.type) !== 'Function'
	    ? def()
	    : def;
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp(prop, name, value, absent) {
	  if (prop.required && absent) {
	    warn('Missing required prop: "' + name + '"');
	    return;
	  }
	  if (value == null && !prop.required) {
	    return;
	  }
	  let type = prop.type;
	  let valid = !type || type === true;
	  const expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (let i = 0; i < type.length && !valid; i++) {
	      const assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }

	  if (!valid) {
	    warn(getInvalidTypeMessage(name, value, expectedTypes));
	    return;
	  }
	  const validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	      );
	    }
	  }
	}

	const simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

	function assertType(value, type) {
	  let valid;
	  const expectedType = getType(type);
	  if (simpleCheckRE.test(expectedType)) {
	    const t = typeof value;
	    valid = t === expectedType.toLowerCase();
	    // for primitive wrapper objects
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
	    valid,
	    expectedType,
	  };
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType(fn) {
	  const match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match ? match[1] : '';
	}

	function isSameType(a, b) {
	  return getType(a) === getType(b);
	}

	function getTypeIndex(type, expectedTypes) {
	  if (!Array.isArray(expectedTypes)) {
	    return isSameType(expectedTypes, type) ? 0 : -1;
	  }
	  for (let i = 0, len = expectedTypes.length; i < len; i++) {
	    if (isSameType(expectedTypes[i], type)) {
	      return i;
	    }
	  }
	  return -1;
	}

	function getInvalidTypeMessage(name, value, expectedTypes) {
	  let message =
	    `Invalid prop: type check failed for prop "${name}".` +
	    ` Expected ${expectedTypes.map(capitalize).join(', ')}`;
	  const expectedType = expectedTypes[0];
	  const receivedType = toRawType(value);
	  const expectedValue = styleValue(value, expectedType);
	  const receivedValue = styleValue(value, receivedType);
	  // check if we need to specify expected value
	  if (
	    expectedTypes.length === 1 &&
	    isExplicable(expectedType) &&
	    !isBoolean(expectedType, receivedType)
	  ) {
	    message += ` with value ${expectedValue}`;
	  }
	  message += `, got ${receivedType} `;
	  // check if we need to specify received value
	  if (isExplicable(receivedType)) {
	    message += `with value ${receivedValue}.`;
	  }
	  return message;
	}

	function styleValue(value, type) {
	  if (type === 'String') {
	    return `"${value}"`;
	  } else if (type === 'Number') {
	    return `${Number(value)}`;
	  } else {
	    return `${value}`;
	  }
	}

	function isExplicable(value) {
	  const explicitTypes = ['string', 'number', 'boolean'];
	  return explicitTypes.some((elem) => value.toLowerCase() === elem);
	}

	function isBoolean(...args) {
	  return args.some((elem) => elem.toLowerCase() === 'boolean');
	}

	// tween.update(elpased); 不指定则是内部list
	// tween.update(elpased, list);
	const List = []; // 更新队列, 每帧更新时更新此队列的

	function isAnimate(animate) {
	  return (
	    animate instanceof BaseAnimate || animate instanceof AnimateChain || false
	  );
	}

	function update(elpased, list = List) {
	  if (list.length === 0) return;
	  for (let i = 0, len = list.length; i < len; i++) {
	    list[i].update(elpased);
	  }
	}

	function Animate(param) {
	  if (Array.isArray(param) || isAnimate(param) || typeof param === 'number') {
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
	  // 不过多个增加事件时，可能会都增加，还是要深复制
	  to._events = utils.clone(events, (key, value) => {
	    if (key === 'context') {
	      if (value === eventEmitter) return to;
	      else return value;
	    }
	  });
	  to._eventsCount = _eventsCount;
	}
	/**
	 * 基础动画，控制流程，transform，基础动画完成on
	 * 相当于在上面再包一层来控制transform
	 */
	function extendFunction(animate, transform) {
	  if (typeof transform !== 'function') throw new Error('extend params error');
	  const newAnimate = new AnimateChain(animate);
	  transform(newAnimate);
	  return newAnimate;
	}
	// 类似于vue的校验props方式，写一个list便于去更改
	const defalutCheck = {
	  to: {
	    default: 1,
	    required: true,
	  },
	  easing: {
	    type: Function,
	    default: Easing.Linear.None,
	  },
	  time: {
	    default: 1000,
	  },
	  list: {
	    type: Array,
	    default() {
	      return List;
	    },
	  },
	  assign: {
	    default: true,
	    type: Boolean,
	  },
	};

	const animateList = [
	  'from',
	  'to',
	  'easing',
	  'time',
	  'list',
	  'update',
	  'assign',
	];
	Animate.renderableList = ['from', 'to', 'time'];

	class BaseAnimate extends eventemitter3 {
	  constructor(data) {
	    super();
	    if (data) {
	      const handled = validate(defalutCheck, data);
	      Object.assign(this, handled);
	      // renderable test
	      if (
	        Animate.renderableList.some((key) => typeof this[key] === 'function')
	      ) {
	        this.needRender = true;
	      }
	    }
	  }

	  render(props = {}, renderableList = Animate.renderableList) {
	    if (!this.needRender) return null;
	    let newAnimate = new BaseAnimate();
	    renderableList.forEach((key) => {
	      // render
	      if (typeof this[key] === 'function') {
	        newAnimate[key] = this[key](props);
	      }
	    });
	    animateList.forEach((key) => {
	      if (!newAnimate.hasOwnProperty(key)) {
	        newAnimate[key] = this[key];
	      }
	    });
	    renderableList.forEach((key) => {
	      // check Props
	      if (defalutCheck[key]) {
	        validateProp(key, defalutCheck, newAnimate);
	      }
	    });

	    ['needRender', '_events', '_eventsCount'].forEach((key) => {
	      newAnimate[key] = this[key];
	    });
	    newAnimate.needRender = false;
	    return newAnimate;
	  }

	  destroy() {
	    this.from = null;
	    this.to = null;
	    this.list = null;
	    this.easing = null;
	    this.update = null;
	    this.removeAllListeners();
	  }

	  apply(...args) {
	    if (this.needRender) throw new Error('you should render before apply');
	    let cb;
	    if (typeof args[args.length - 1] === 'function') {
	      cb = args.pop();
	    }
	    const ins = new AnimateInstance(this, args);
	    ins.isRoot = true;
	    ins.start(cb);
	    return ins;
	  }

	  extend(value, ...args) {
	    let newValue = {};
	    let animate = this;
	    if (typeof value === 'object') {
	      const newData = {};
	      Object.keys(this).forEach((key) => {
	        if (key.charAt(0) !== '_') newData[key] = this[key];
	      });
	      Object.assign(newData, newValue);
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
	  if (Array.isArray(args) && args.every((v) => testArgs(v))) return true;
	  if (typeof args === 'number' || isAnimate(args)) return true;

	  return false;
	}
	/**
	 * 动画是Chain， 由子AnimateInstance组成，子instance作为 动画，等待
	 */
	const getTimeAnimate = utils.cached(function (number) {
	  return new BaseAnimate({
	    from: 0,
	    to: 1,
	    time: number,
	  });
	});

	function getInstance(chain, el) {
	  if (Array.isArray(chain)) {
	    return chain.map((v) => getInstance(v, el));
	  }
	  if (typeof chain === 'number') {
	    const animate = getTimeAnimate(chain);
	    const ins = new AnimateInstance(animate, el);
	    ins.update = function update(elpased) {
	      if (elpased) this.time += elpased;
	      else {
	        this.time = performance.now();
	      }
	      if (this.time - this.startTime >= this.animate.time) this.end();
	    };
	    return ins;
	  }
	  if (chain instanceof BaseAnimate) {
	    return new AnimateInstance(chain, el);
	  } else if (chain instanceof AnimateChain) {
	    return new AnimateInstanceChain(chain, el, getInstance(chain.chain, el));
	  } else throw new Error('Aniamte arguments dont fit format');
	}

	class AnimateChain extends eventemitter3 {
	  constructor(...args) {
	    super();
	    if (!testArgs(args)) throw new Error('Animate arguments error');
	    if (
	      args.some((anime) => {
	        return typeof anime === 'object' && anime.needRender;
	      })
	    )
	      this.needRender = true;
	    this.chain = args;
	  }

	  extend(...args) {
	    return args.reduce((acc, cur) => extendFunction(acc, cur), this);
	  }

	  render(props = {}, renderableList = Animate.renderableList) {
	    if (!this.needRender) return null;
	    const newAnimate = new AnimateChain();
	    newAnimate.chain = this.chain.map((animate) => {
	      if (typeof animate === 'object' && animate.needRender) {
	        return animate.render(props, renderableList);
	      } else return animate;
	    });
	    ['needRender', '_events', '_eventsCount'].forEach((key) => {
	      newAnimate[key] = this[key];
	    });
	    newAnimate.needRender = false;
	    return newAnimate;
	  }

	  destroy() {
	    this.chain = null;
	    this.removeAllListeners();
	  }

	  apply(...args) {
	    if (this.needRender) throw new Error('you should render before apply');
	    let cb;
	    if (typeof args[args.length - 1] === 'function') {
	      cb = args.pop();
	    }
	    const ins = new AnimateInstanceChain(
	      this,
	      args,
	      getInstance(this.chain, args),
	    );
	    ins.isRoot = true;
	    ins.start(cb);
	    return ins;
	  }
	}

	const Transform = {
	  register(id, func) {
	    this[id] = function (...args) {
	      if (args.length === 1 && isAnimate(args[0])) return func(args[0]);
	      return function transformAnimate(animate) {
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
	  animate.on('start', (ins) => {
	    ins.isYoyoed = false;
	  });
	  animate.on('end', (ins) => {
	    ins.isReversed = !ins.isReversed;
	    if (!ins.isYoyoed) ins.isCompleted = false;
	    ins.isYoyoed = true;
	  });
	});

	exports.Animate = Animate;
	exports.Easing = Easing;
	exports.List = List;
	exports.Transform = Transform;
	exports.update = update;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tween.umd.js.map
