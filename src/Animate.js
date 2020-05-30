import EventEmitter from 'eventemitter3';
import Easing from './Easing';
import utils from './utils';
import { AnimateInstance, AnimateInstanceChain } from './Instance';
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
class BaseAnimate extends EventEmitter {
  constructor({
    from = 0,
    to = 1,
    easing = Easing.Linear.None,
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
    const ins = new AnimateInstance(this, args);
    ins.isRoot = true;
    return ins;
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
const getTimeAnimate = utils.cached(function (number) {
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

class AnimateChain extends EventEmitter {
  constructor(...args) {
    super();
    if (!testArgs(args)) throw new Error('Animate arguments error');
    this.chain = args;
  }

  extend(...args) {
    return args.reduce((acc, cur) => extendFunction(acc, cur), this);
  }

  apply(...args) {
    const ins = new AnimateInstanceChain(
      this,
      args,
      getInstance(this.chain, args),
    );
    ins.isRoot = true;
    return ins;
  }
}

export { List, update, Animate };
