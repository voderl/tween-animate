import Easing from './utils/Easing';
import EventEmitter from 'eventemitter3';
import utils from './utils/utils';
import { AnimateInstance, WrapperInstance } from './AnimateInstance';
import { List, funcList } from './update';
import Transform from './Transform';

import { AnimateConfig } from './define';

const defaultAnimateConfig: AnimateConfig = {
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
      if (value === eventEmitter) return to;
      return value;
    }
  });
  to._eventsCount = _eventsCount;
}

class AnimateClass extends EventEmitter {
  config: AnimateConfig;
  to: any;
  constructor(to, config?: AnimateConfig) {
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
class AnimateWrapper extends EventEmitter {
  private animate: AnimateClass | AnimateWrapper;
  constructor(animate: AnimateClass | AnimateWrapper) {
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
function Animate(to, config?: AnimateConfig) {
  return new AnimateClass(to, config);
}
Animate.config = function (config: AnimateConfig) {
  Object.assign(defaultAnimateConfig, config);
};
export default Animate;
