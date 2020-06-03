import EventEmitter from 'eventemitter3';
import Easing from './Easing';
import utils from './utils';
import { AnimateInstance, AnimateInstanceChain } from './Instance';
import { validate, validateProp } from './validate';
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
    if (list[i].isPlaying) list[i].update(elpased);
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

function isValidFromTo(v) {
  return (
    typeof v === 'number' || typeof v === 'object' || typeof v === 'function'
  );
}
Animate.renderableList = ['from', 'to', 'time'];

class BaseAnimate extends EventEmitter {
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

class AnimateChain extends EventEmitter {
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

export { List, update, Animate, isAnimate };
