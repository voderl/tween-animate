(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tween = factory());
}(this, (function () { 'use strict';

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

	function AnimationFrame(update) {
	    const requestAnimationFrame = window.requestAnimationFrame;
	    const performance = window.performance;
	    let playing = false;
	    let time = 0;
	    function ticker(timestamp) {
	        if (playing) {
	            update(timestamp - time);
	            time = timestamp;
	            requestAnimationFrame(ticker);
	        }
	    }
	    return {
	        play() {
	            playing = true;
	            time = performance.now();
	            requestAnimationFrame(ticker);
	        },
	        stop() {
	            playing = false;
	        },
	    };
	}

	/**
	 * parse from and to
	 * @example
	      parseFromTo(
	        { x: [1, 2, 3], y: 1 },
	        { x: [1, 2, 6], y: 3 },
	        { isAssign: false },
	      );
	 * @param a - from
	 * @param b - status - range 0 - 1
	 * @render ƒ anonymous(a,b) {
	            var a={};var a_x=a["x"]=[];a_x["2"]=3+b*3;a["y"]=1+b*2;return a;
	            }
	 */
	// 生成Animate时，根据to 生成一个render， 再给予时获得最终的函数
	parseFromTo({ x: [1, 2, 3], y: 1 }, { x: [1, 2, 6], y: 3 }, {
	    isAssign: true,
	});
	// tweenTo的对象是函数时，带入函数得到值来parse， 先parse，再得到值与最终幻象值
	// 只在开始时parse一次, 如果返回为对象，则每次刷新时都更新， 就是当前值
	/**
	 * 转化为易于显示的格式
	 * @param value
	 */
	function stringfy(obj) {
	    return JSON.stringify(obj, (key, value) => (typeof value === 'function' ? value.toString() : value), '\t');
	}
	/**
	 * extended Error
	 */
	class ParseError extends Error {
	    constructor(from, to) {
	        const message = `"from" and "to" have different format:
"from":  ${stringfy(from)},
"to"  : ${stringfy(to)}.
`;
	        super(message);
	        this.name = 'Parse Error';
	    }
	}
	function getEmptyType(from) {
	    if (Array.isArray(from))
	        return '[]';
	    if (typeof from === 'object')
	        return '{}';
	    return `throw new Error(\`"from" type error: ${stringfy(from)}\`)`;
	}
	function parseFromTo(from, rawTo, config) {
	    const to = typeof rawTo === 'function' ? rawTo(from) : rawTo;
	    const { isAssign = true } = config || {};
	    let expression;
	    if (from !== to) {
	        if (typeof to === 'object' && typeof from === 'object') {
	            expression =
	                (isAssign ? '' : `var a=${getEmptyType(from)};`) +
	                    baseParseFromTo(from, to, 'a', isAssign);
	        }
	        else if (typeof to === 'number' && typeof from === 'number') {
	            expression = `a=${from}+b*${to - from};`;
	        }
	        else
	            throw new ParseError(from, to);
	    }
	    const func = new Function('a', 'b', expression + 'return a;');
	    console.log(func);
	    return function tween(status) {
	        return func(from, status);
	    };
	}
	function baseParseFromTo(from, to, expressionKey, isAssign) {
	    let expression = '';
	    for (const key in to) {
	        const fromValue = from[key];
	        const toValue = typeof to[key] === 'function' ? to[key](fromValue) : to[key];
	        if (fromValue !== toValue) {
	            if (typeof toValue === 'object' && typeof fromValue === 'object') {
	                const newExpressionKey = `${expressionKey}_${key}`;
	                expression += `var ${newExpressionKey}=${expressionKey}["${key}"]${isAssign ? '' : `=${getEmptyType(fromValue)}`};${baseParseFromTo(fromValue, toValue, newExpressionKey, isAssign)}`;
	            }
	            else if (typeof toValue === 'number' && typeof fromValue === 'number') {
	                expression += `${expressionKey}["${key}"]=${fromValue}+b*${toValue - fromValue};`;
	            }
	            else
	                throw new ParseError(fromValue, toValue);
	        }
	    }
	    return expression;
	}

	/**
	 * The Ease class provides a collection of easing functions for use with tween.js.
	 */
	const Easing = {
	    Linear: {
	        None: function (amount) {
	            return amount;
	        },
	    },
	    Quadratic: {
	        In: function (amount) {
	            return amount * amount;
	        },
	        Out: function (amount) {
	            return amount * (2 - amount);
	        },
	        InOut: function (amount) {
	            if ((amount *= 2) < 1) {
	                return 0.5 * amount * amount;
	            }
	            return -0.5 * (--amount * (amount - 2) - 1);
	        },
	    },
	    Cubic: {
	        In: function (amount) {
	            return amount * amount * amount;
	        },
	        Out: function (amount) {
	            return --amount * amount * amount + 1;
	        },
	        InOut: function (amount) {
	            if ((amount *= 2) < 1) {
	                return 0.5 * amount * amount * amount;
	            }
	            return 0.5 * ((amount -= 2) * amount * amount + 2);
	        },
	    },
	    Quartic: {
	        In: function (amount) {
	            return amount * amount * amount * amount;
	        },
	        Out: function (amount) {
	            return 1 - --amount * amount * amount * amount;
	        },
	        InOut: function (amount) {
	            if ((amount *= 2) < 1) {
	                return 0.5 * amount * amount * amount * amount;
	            }
	            return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
	        },
	    },
	    Quintic: {
	        In: function (amount) {
	            return amount * amount * amount * amount * amount;
	        },
	        Out: function (amount) {
	            return --amount * amount * amount * amount * amount + 1;
	        },
	        InOut: function (amount) {
	            if ((amount *= 2) < 1) {
	                return 0.5 * amount * amount * amount * amount * amount;
	            }
	            return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
	        },
	    },
	    Sinusoidal: {
	        In: function (amount) {
	            return 1 - Math.cos((amount * Math.PI) / 2);
	        },
	        Out: function (amount) {
	            return Math.sin((amount * Math.PI) / 2);
	        },
	        InOut: function (amount) {
	            return 0.5 * (1 - Math.cos(Math.PI * amount));
	        },
	    },
	    Exponential: {
	        In: function (amount) {
	            return amount === 0 ? 0 : Math.pow(1024, amount - 1);
	        },
	        Out: function (amount) {
	            return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
	        },
	        InOut: function (amount) {
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
	        },
	    },
	    Circular: {
	        In: function (amount) {
	            return 1 - Math.sqrt(1 - amount * amount);
	        },
	        Out: function (amount) {
	            return Math.sqrt(1 - --amount * amount);
	        },
	        InOut: function (amount) {
	            if ((amount *= 2) < 1) {
	                return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
	            }
	            return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
	        },
	    },
	    Elastic: {
	        In: function (amount) {
	            if (amount === 0) {
	                return 0;
	            }
	            if (amount === 1) {
	                return 1;
	            }
	            return (-Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI));
	        },
	        Out: function (amount) {
	            if (amount === 0) {
	                return 0;
	            }
	            if (amount === 1) {
	                return 1;
	            }
	            return (Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1);
	        },
	        InOut: function (amount) {
	            if (amount === 0) {
	                return 0;
	            }
	            if (amount === 1) {
	                return 1;
	            }
	            amount *= 2;
	            if (amount < 1) {
	                return (-0.5 *
	                    Math.pow(2, 10 * (amount - 1)) *
	                    Math.sin((amount - 1.1) * 5 * Math.PI));
	            }
	            return (0.5 *
	                Math.pow(2, -10 * (amount - 1)) *
	                Math.sin((amount - 1.1) * 5 * Math.PI) +
	                1);
	        },
	    },
	    Back: {
	        In: function (amount) {
	            const s = 1.70158;
	            return amount * amount * ((s + 1) * amount - s);
	        },
	        Out: function (amount) {
	            const s = 1.70158;
	            return --amount * amount * ((s + 1) * amount + s) + 1;
	        },
	        InOut: function (amount) {
	            const s = 1.70158 * 1.525;
	            if ((amount *= 2) < 1) {
	                return 0.5 * (amount * amount * ((s + 1) * amount - s));
	            }
	            return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
	        },
	    },
	    Bounce: {
	        In: function (amount) {
	            return 1 - Easing.Bounce.Out(1 - amount);
	        },
	        Out: function (amount) {
	            if (amount < 1 / 2.75) {
	                return 7.5625 * amount * amount;
	            }
	            else if (amount < 2 / 2.75) {
	                return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
	            }
	            else if (amount < 2.5 / 2.75) {
	                return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
	            }
	            else {
	                return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
	            }
	        },
	        InOut: function (amount) {
	            if (amount < 0.5) {
	                return Easing.Bounce.In(amount * 2) * 0.5;
	            }
	            return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
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
	            }
	            else if (!keep) {
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
	            }
	            else
	                newObj[key] = value;
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

	const Transform = {
	    $register(id, func) {
	        this[id] = func;
	    },
	    $apply(id, ins, ...args) {
	        if (typeof this[id] === 'function') {
	            const on = (a, b) => ins.on(a, b);
	            this[id](on, ...args);
	        }
	        else
	            throw new Error(`transform "${id}" don't exist`);
	    },
	};
	Transform.$register('loop', (on, num) => {
	    on('start', (ins) => {
	        ins.loopCount = num;
	    });
	    on('end', (ins) => {
	        ins.loopCount--;
	        if (ins.loopCount > 0)
	            ins.isCompleted = false;
	    });
	});
	Transform.$register('reverse', (on) => {
	    on('start', (ins) => {
	        ins.isReversed = !ins.isReversed;
	    });
	});
	Transform.$register('yoyo', (on) => {
	    on('start', (ins) => {
	        ins.isYoyoed = false;
	    });
	    on('end', (ins) => {
	        ins.isReversed = !ins.isReversed;
	        if (!ins.isYoyoed)
	            ins.isCompleted = false;
	        ins.isYoyoed = true;
	    });
	});

	class AnimateInstance extends eventemitter3 {
	    constructor(from, to, time, animate) {
	        super();
	        this.isPlaying = false;
	        this.fullTime = time;
	        this.animateConfig = animate.config;
	        this.parsed = parseFromTo(from, to, animate.config);
	        this.animateConfig.list.push(this);
	    }
	    _trigger() {
	        this.start();
	    }
	    /** 动画开始 */
	    start(isReversed = false) {
	        this.time = 0;
	        this.play();
	        this.isReversed = isReversed;
	        this.isPlaying = true;
	        this.isCompleted = false;
	        this.emit('start', this);
	        this.begin();
	    }
	    /** 动画完成 */
	    complete() {
	        this.isPlaying = false;
	        this.emit('complete', this);
	    }
	    /** 动画每次开始 */
	    begin() {
	        this.emit('begin', this);
	    }
	    /** 动画每次结束 */
	    end() {
	        this.isCompleted = true;
	        this.emit('end', this);
	        if (this.isCompleted)
	            this.complete();
	        else {
	            this.time = 0;
	            this.begin();
	        }
	    }
	    play() {
	        this.isPlaying = true;
	    }
	    stop() {
	        this.isPlaying = false;
	    }
	    update(elpased) {
	        const { isReversed, fullTime, animateConfig, parsed } = this;
	        this.time += elpased;
	        const status = this.time / fullTime;
	        if (status < 1) {
	            this.emit('update', parsed(animateConfig.easing(isReversed ? 1 - status : status)), this);
	        }
	        else {
	            this.emit('update', parsed(isReversed ? 0 : 1), this);
	            this.end();
	        }
	    }
	    transform(id, ...args) {
	        const ins = new WrapperInstance(this);
	        Transform.$apply(id, ins, ...args);
	        this._trigger = () => ins._trigger();
	        return ins;
	    }
	    destroy() {
	        this.emit('destroy');
	        this.removeAllListeners();
	        this._trigger = null;
	        this.parsed = null;
	    }
	}
	class WrapperInstance extends eventemitter3 {
	    constructor(ins) {
	        super();
	        this.animateInstance = ins;
	        ins.on('complete', (animateInstance) => {
	            this.end();
	            if (!this.isCompleted)
	                animateInstance.isComplete = false;
	        });
	        ins.on('update', (v) => {
	            this.emit('update', v, this);
	        });
	        ins.on('destroy', (v) => {
	            this.emit('destroy');
	            this.destroy();
	        });
	    }
	    _trigger() {
	        this.start();
	    }
	    transform(id, ...args) {
	        const ins = new WrapperInstance(this);
	        Transform.$apply(id, ins, ...args);
	        this._trigger = () => ins._trigger();
	        return ins;
	    }
	    /** 动画开始 */
	    start(isReversed = false) {
	        this.play();
	        this.isReversed = isReversed;
	        this.isPlaying = true;
	        this.isCompleted = false;
	        this.emit('start', this);
	        this.begin();
	    }
	    /** 动画完成 */
	    complete() {
	        this.stop();
	        this.emit('complete', this);
	    }
	    /** 动画每次开始 */
	    begin() {
	        this.emit('begin', this);
	        this.animateInstance.start(this.isReversed);
	    }
	    /** 动画每次结束 */
	    end() {
	        this.isCompleted = true;
	        this.emit('end', this);
	        if (this.isCompleted)
	            this.complete();
	        else {
	            this.begin();
	        }
	    }
	    play() {
	        this.animateInstance.play();
	        this.isPlaying = true;
	    }
	    stop() {
	        this.animateInstance.stop();
	        this.isPlaying = false;
	    }
	    destroy() {
	        this.removeAllListeners();
	        this.animateInstance = null;
	    }
	}

	const List = [];
	const funcList = [];
	const { filter } = utils;
	function update(elpased, list = List) {
	    if (funcList.length !== 0) {
	        funcList.forEach((func) => func());
	        funcList.splice(0, funcList.length);
	    }
	    if (list.length === 0)
	        return;
	    filter(list, (ins) => {
	        if (ins.isCompleted) {
	            ins.destroy();
	            return false;
	        }
	        if (ins.isPlaying)
	            ins.update(elpased);
	        return true;
	    });
	}

	const defaultAnimateConfig = {
	    easing: Easing.Linear.None,
	    list: List,
	    isAssign: true,
	};
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
	            if (value === eventEmitter)
	                return to;
	            return value;
	        }
	    });
	    to._eventsCount = _eventsCount;
	}
	class AnimateClass extends eventemitter3 {
	    constructor(to, config) {
	        super();
	        this.to = to;
	        this.config = { ...defaultAnimateConfig, ...config };
	    }
	    /**
	     * @param {function} el - 生成具体的动画实例
	     */
	    apply(el, time) {
	        const ins = new AnimateInstance(el, this.to, time, this);
	        cloneEventEmitter(this, ins);
	        funcList.push(() => {
	            ins._trigger();
	        });
	        return ins;
	    }
	    /**
	     *
	     */
	    clone() {
	        const animate = new AnimateClass(this.to, this.config);
	        cloneEventEmitter(this, animate);
	        return animate;
	    }
	    transform(id, ...args) {
	        const animate = new AnimateWrapper(this);
	        Transform.$apply(id, animate, ...args);
	        return animate;
	    }
	}
	class AnimateWrapper extends eventemitter3 {
	    constructor(animate) {
	        super();
	        this.animate = animate;
	    }
	    apply(el, time) {
	        const ins = new WrapperInstance(this.animate.apply(el, time));
	        cloneEventEmitter(this, ins);
	        return ins;
	    }
	    clone() {
	        return new AnimateWrapper(this.animate);
	    }
	    transform(id, ...args) {
	        const animate = new AnimateWrapper(this);
	        Transform.$apply(id, animate, ...args);
	        return animate;
	    }
	}
	function Animate(to, config) {
	    return new AnimateClass(to, config);
	}
	Animate.config = function (config) {
	    Object.assign(defaultAnimateConfig, config);
	};

	AnimationFrame(function ticker(elpased) {
	    update(elpased);
	}).play();
	var index = { Animate, AnimationFrame, update, Transform, Easing };

	return index;

})));
//# sourceMappingURL=tween.umd.js.map
