import EventEmitter from 'eventemitter3';
import { TweenTo, EasingFunction } from '../types';
import parse from '../parse';
import { TransfromFunction, transform } from '../transform';
import Easing from '../Easing';
import { GLOBAL_LIST } from '../update';

function createTweenFunction(
  from: any,
  to: TweenTo,
  easing: (v: number) => number,
) {
  const parsed = parse(from, to);
  return (status) => parsed(easing(status));
}

const DEFAULT_OPTIONS = {
  easing: Easing.Linear.None,
};

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
/**
 * chain multi "to" values in one "tween" function.
 */
function chain(
  ins: AnimateInstance,
  toList: Array<{
    to: TweenTo;
    time: number;
    easing: EasingFunction;
  }>,
) {
  const tween = ins.tween;
  const originFullTime = ins.fullTime;

  let currentStartTime = originFullTime;

  let lastTween = tween;
  let lastFullTime = originFullTime;

  const tweenFunctionList = toList.map(({ to, time, easing }, index) => {
    const currentValue = lastTween(1, lastFullTime);
    if (currentValue === undefined) throw new Error(`unexcepted error`);
    const newTween = createTweenFunction(currentValue, to, easing);
    lastTween = newTween;
    lastFullTime = time;
    const ref = {
      startTime: currentStartTime,
      endTime: currentStartTime + time,
      fullTime: time,
      lastStatus: null,
      tween: newTween as (status: number, duration: number) => number,
    };
    currentStartTime += time;
    return ref;
  });

  tweenFunctionList.unshift({
    startTime: 0,
    endTime: originFullTime,
    fullTime: originFullTime,
    lastStatus: null,
    tween,
  });

  ins.fullTime = currentStartTime;

  ins.tween = (status: number, duration: number) => {
    let hitIdx = -1;
    const len = tweenFunctionList.length;
    for (let i = 0; i < len; i++) {
      const item = tweenFunctionList[i];
      if (duration > item.endTime) {
        if (item.lastStatus !== 1) {
          item.tween(1, item.fullTime);
          item.lastStatus = 1;
        }
      } else {
        hitIdx = i;
        break;
      }
    }
    for (let i = len - 1; i > hitIdx; i--) {
      const item = tweenFunctionList[i];
      if (item.lastStatus !== 0) {
        item.tween(0, 0);
        item.lastStatus = 0;
      }
    }
    const currentItem = tweenFunctionList[hitIdx];
    const _duration = currentItem.fullTime - (currentItem.endTime - duration);
    if (currentItem.lastStatus !== null) currentItem.lastStatus = null;
    return currentItem.tween(_duration / currentItem.fullTime, _duration);
  };

  // reset to origin object
  ins.tween(0, 0);
}

class AnimateInstance extends EventEmitter<
  'start' | 'update' | 'complete' | 'stop' | 'play'
> {
  isPlaying: boolean;
  isCompleted: boolean;
  time: number;
  startTime: number;
  fullTime: number;
  stopTime?: number;
  tween: (status: number, durtion: number) => any;
  private _isStarted: boolean;
  private _toList: Array<{
    to: TweenTo;
    time: number;
    easing: EasingFunction;
  }>;
  constructor(
    from: any,
    to: TweenTo,
    time: number,
    easing: EasingFunction = DEFAULT_OPTIONS.easing,
  ) {
    super();
    this.isPlaying = true;
    this.isCompleted = false;

    this.time = 0;

    this.fullTime = time;

    this.tween = createTweenFunction(from, to, easing);

    this.startTime = performance.now();

    this._toList = [];

    this._isStarted = false;
    delay(() => {
      this.start();
    });
  }

  start() {
    if (this._isStarted || !this.isPlaying) return;
    if (this._toList.length > 0) {
      chain(this, this._toList);
      this._toList = null;
    }
    this._isStarted = true;
    this.emit('start');
    this.updateElpased(0);
    GLOBAL_LIST.push(this); // add to update list
    return this;
  }

  transform: TransfromFunction = function (key: string, ...args: any[]) {
    if (this._isStarted)
      throw new Error('Cannot apply transform to running AnimateInstance');
    if (this._toList.length > 0) {
      chain(this, this._toList);
      this._toList = [];
    }
    transform(this, key, ...args);
    return this;
  };

  to(to: TweenTo, time: number, easing = DEFAULT_OPTIONS.easing) {
    if (typeof time !== 'number') throw new Error(`"time" is required`);
    if (this._isStarted)
      throw new Error('Cannot set "to" to running AnimateInstance');
    this._toList.push({
      to,
      time,
      easing,
    });
    return this;
  }

  stop() {
    this.isPlaying = false;
    this.stopTime = performance.now();
    this.emit('stop');
    return this;
  }

  play() {
    const time = performance.now();
    if (this.stopTime) {
      const elpased = time - this.stopTime;
      this.startTime += elpased;
      this.stopTime = null;
    } else {
      throw new Error(
        'play can be only called after stop is called. you maybe want to call "start"?',
      );
    }
    this.isPlaying = true;
    this.emit('play');
    if (!this._isStarted) this.start();
    return this;
  }

  update(now: number) {
    if (!this.isPlaying) return;

    this.time = now - this.startTime;
    const status = this.time / this.fullTime;
    if (status >= 1) {
      const v = this.tween(1, this.fullTime);
      if (v !== undefined) this.emit('update', v);
      this.complete();
    } else {
      const v = this.tween(status, this.time);
      if (v !== undefined) this.emit('update', v);
    }
  }

  updateElpased(elpased: number) {
    if (!this.isPlaying) return;

    this.time += elpased;

    /** need to add startTime to support both "update" and "updateElpased" */
    this.startTime -= elpased;

    const status = this.time / this.fullTime;
    if (status >= 1) {
      const v = this.tween(1, this.fullTime);
      if (v !== undefined) this.emit('update', v);
      this.complete();
    } else {
      const v = this.tween(status, this.time);
      if (v !== undefined) this.emit('update', v);
    }
  }

  complete() {
    this.isCompleted = true;
    this.emit('complete');
    if (this.isCompleted) {
      this.destroy();
    }
  }

  destroy() {
    this.isPlaying = false;

    /** if you call destory directly, ensure this instance can be deleted in the list.  */
    this.isCompleted = true;

    this.emit = null;
    this.removeAllListeners();
    this.tween = null;
  }
}

export default AnimateInstance;
