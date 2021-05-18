import EventEmitter from 'eventemitter3';
import { AnimateValue, AnimateOptions, TweenTo } from '../types';
import parse from '../parse';
import { transform } from '../transform';

function createTweenFunction(
  from: any[],
  to: TweenTo,
  options: AnimateOptions,
) {
  let middleware;
  if (options.parser) {
    const parser = options.parser;
    if ('parse' in parser && 'apply' in parser) {
      middleware = (item) => {
        const parsed = parse(parser.parse(item), to, options);
        const easing = options.easing;
        return (status) => {
          let v = parsed(easing(status));
          parser.apply(item, v);
          return v;
        };
      };
    } else
      throw new Error(
        `options "parser" should both have "parse" and "apply" methods`,
      );
  } else {
    middleware = (item) => {
      const parsed = parse(item, to, options);
      const easing = options.easing;
      return (status) => parsed(easing(status));
    };
  }
  if (from.length === 1) {
    return middleware(from[0]);
  }
  const list = from.map((item) => middleware(item));
  const easing = options.easing;
  return function tween(status: number) {
    const n = easing(status);
    return list.map((t) => t(n));
  };
}

/**
 * use delay to listener "start" event,
 * Animate(1, 1000).apply(0).on('start', console.log);
 * if you don't use delay, it will emit "start" before you listen
 */
const delay =
  'Promise' in window
    ? (function () {
        const resolved = Promise.resolve();
        return function delay(func: () => void) {
          resolved.then(func);
        };
      })()
    : function delay(func: () => void) {
        setTimeout(func);
      };

class AnimateInstance extends EventEmitter {
  isPlaying: boolean;
  isCompleted: boolean;
  time: number;
  startTime: number;
  fullTime: number;
  stopTime?: number;
  tween: (status: number, durtion: number, fullTime: number) => any;
  constructor(animate: AnimateValue, options: AnimateOptions, from: any[]) {
    super();
    this.isPlaying = true;
    this.isCompleted = false;

    this.time = 0;
    this.startTime = performance.now();

    const { to } = animate;
    if (!options.time)
      throw new Error('please give "time" option before apply');
    this.fullTime = options.time;

    this.tween = createTweenFunction(from, to, options);

    const emit = this.emit;
    this.emit = function (key: string, a) {
      emit.call(this, key, a);
      animate.emit(key, a);
    } as any;

    options.list.push(this); // add to update list

    delay(() => {
      this.emit('start');
    });
  }

  transform(key: string, ...args: any[]) {
    transform(this, key, ...args);
    return this;
  }

  stop() {
    this.isPlaying = false;
    this.stopTime = performance.now();
    this.emit('stop');
  }

  play() {
    const time = performance.now();
    if (this.stopTime) {
      const elpased = time - this.stopTime;
      this.time += elpased;
      this.startTime += elpased;
      this.stopTime = null;
    } else {
      throw new Error('play can be only called after stop is called');
    }
    this.isPlaying = true;
    this.emit('play');
  }

  update(now: number) {
    if (this.isPlaying) {
      const { fullTime, tween, startTime } = this;
      this.time = now - startTime;
      const status = this.time / fullTime;
      if (status >= 1) {
        const v = tween(1, fullTime, fullTime);
        if (v !== undefined) this.emit('update', v);
        this.complete();
      } else {
        const v = tween(status, this.time, fullTime);
        if (v !== undefined) this.emit('update', v);
      }
    }
  }

  updateElpased(elpased: number) {
    if (this.isPlaying) {
      const { fullTime, tween } = this;
      this.time += elpased;
      const status = this.time / fullTime;
      if (status >= 1) {
        const v = tween(1, fullTime, fullTime);
        if (v !== undefined) this.emit('update', v);
        this.complete();
      } else {
        const v = tween(status, this.time, fullTime);
        if (v !== undefined) this.emit('update', v);
      }
    }
  }

  complete() {
    this.isCompleted = true;
    this.emit('complete');
    this.destroy();
  }

  destroy() {
    this.isPlaying = false;
    this.emit = null;
    this.removeAllListeners();
    this.tween = null;
  }
}

export default AnimateInstance;
