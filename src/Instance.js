import utils from './utils';
import { parseFromTo, getStatus } from './parse';
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
    this.isPlaying = true;
  }

  stop() {
    this.isPlaying = false;
  }

  complete() {
    this.emit('complete');
    this.stop();
    if (typeof this.callback === 'function') this.callback(this.delayed);
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
    if (this.delayed) this.update(this.delayed);
  }

  complete() {
    const list = this.animate.list;
    const i = list.indexOf(this);
    if (i > -1) list.splice(i, 1);
    super.complete();
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
      this.delayed = this.time - this.startTime - fullTime;
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

  next(delayed = 0) {
    const { count, instanceChain, isReversed } = this;
    this.delayed = delayed;
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
      delayed: this.delayed,
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
    this.next(this.delayed);
    this.delay = 0;
  }

  destroy() {
    super.destroy();
    this.instanceChain.forEach((c) => c.destroy());
    this.instanceChain = null;
    this.instance = null;
  }
}

export { AnimateInstance, AnimateInstanceChain };
