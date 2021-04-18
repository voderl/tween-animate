import EventEmitter from 'eventemitter3';
import {
  AnimateOptions,
  TweenTo,
  AnimateValue,
  AnimateWrapper,
} from '../types';
import AnimateInstance from '../AnimateInstance';
import cloneEventEmitter from '../utils/cloneEventEmitter';
import Easing from '../Easing';
import { GLOBAL_LIST } from '../update';

const OPTIONS = {
  time: 0,
  easing: Easing.Linear.None,
  isAssign: true,
  list: GLOBAL_LIST,
};

function parseOptions(
  inputOptions?: number | Partial<AnimateOptions>,
  baseOptions?: AnimateOptions,
): AnimateOptions {
  if (!inputOptions) return OPTIONS;
  const options = baseOptions ? { ...baseOptions } : { ...OPTIONS };
  if (typeof inputOptions === 'number') options.time = inputOptions;
  else {
    Object.assign(options, inputOptions);
  }
  return options;
}

const WrapperAnimateAssignData = {
  hasCloneEventEmitter: false,
  on: function (...args) {
    if (!this.hasCloneEventEmitter) {
      this.animate = cloneAnimate(this.animate);
      this.hasCloneEventEmitter = true;
    }
    this.animate.on(...args);
    return this;
  },
  once: function (...args) {
    if (!this.hasCloneEventEmitter) {
      this.animate = cloneAnimate(this.animate);
      this.hasCloneEventEmitter = true;
    }
    this.animate.on(...args);
    return this;
  },
  off: function (...args) {
    if (!this.hasCloneEventEmitter) {
      this.animate = cloneAnimate(this.animate);
      this.hasCloneEventEmitter = true;
    }
    this.animate.on(...args);
    return this;
  },
};
// return wrapper
function createAnimateWrapper(
  animate: AnimateValue,
  options: AnimateOptions,
): AnimateWrapper {
  const _function = function AnimateWrapper(_options: typeof options) {
    return createAnimateWrapper(
      _function.animate,
      parseOptions(_options, options),
    );
  };
  _function.animate = animate;
  _function.config = _function;
  Object.assign(_function, WrapperAnimateAssignData);
  _function.apply = function (...items) {
    const ins = new AnimateInstance(_function.animate, options, items);
    return ins;
  };
  _function.transform = function (key: string, ...args: any[]) {
    const wrapper = createAnimateWrapper(_function.animate, options) as any;
    wrapper.apply = function (...items) {
      const baseIns = _function.apply(...items);
      const ins = baseIns.transform(key, ...args);
      return ins;
    };
    return wrapper;
  };
  return _function as any;
}

function cloneAnimate(animate: AnimateValue) {
  const _animate = new EventEmitter() as AnimateValue;
  _animate.to = animate.to;
  cloneEventEmitter(animate, _animate);
  return _animate;
}

function AnimateFunction(
  to: TweenTo,
  options?: number | Partial<AnimateOptions>,
): AnimateWrapper;
function AnimateFunction(
  from: any,
  to: TweenTo,
  options: number | Partial<AnimateOptions>,
): AnimateInstance;
function AnimateFunction(
  fromOrTo: TweenTo | any,
  toOroptions?: TweenTo | typeof options,
  options?: number | Partial<AnimateOptions>,
) {
  if (arguments.length >= 3) {
    const animate = new EventEmitter() as AnimateValue;
    animate.to = toOroptions as TweenTo;
    return new AnimateInstance(animate, parseOptions(options), [fromOrTo]);
  }
  const animate = new EventEmitter() as AnimateValue;
  animate.to = fromOrTo;
  return createAnimateWrapper(
    animate,
    parseOptions(toOroptions as typeof options),
  );
}

export default AnimateFunction;
