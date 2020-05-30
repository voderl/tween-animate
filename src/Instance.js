import utils from './utils';
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
    return this;
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
    this.stop();
    if (typeof this.callback === 'function') this.callback(this.delayed);
    if (this.isRoot) this.destroy();
  }

  destroy() {
    this.animate = null;
    this.callback = null;
    this.el = null;
  }
}

class AnimateInstance extends BaseAnimateInstance {
  constructor(animate, el) {
    super(animate, el);
    this.value = this.animate.from;
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
    if (completed) {
      this.delayed = this.time - this.startTime - fullTime;
      this.end();
    }
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
    const cb = (delay) => this.next(delay);
    if (Array.isArray(v)) {
      const waitAll = waitAllComplete(v.length, cb);
      v.forEach((instance) => {
        instance.isReversed = isReversed;
        instance.delayed = delayed;
        instance.start(waitAll);
      });
    } else {
      v.isReversed = isReversed;
      v.delayed = delayed;
      v.start(cb);
    }
  }

  begin() {
    super.begin();
    this.count = 0;
    this.next(this.delayed);
  }

  destroy() {
    super.destroy();
    this.instanceChain.forEach((c) => c.destroy());
    this.instanceChain = null;
  }
}

export { AnimateInstance, AnimateInstanceChain };
