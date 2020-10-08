import EventEmitter from 'eventemitter3';
import parseFromTo from './parse';
import Transform from './Transform';

import { AnimateConfig } from './define';

export class AnimateInstance extends EventEmitter {
  isReversed: boolean;
  isPlaying: boolean;
  isCompleted: boolean;
  private time: number;
  private fullTime: number;
  private animateConfig: AnimateConfig;
  private parsed: (status: number) => any;
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
    if (this.isCompleted) this.complete();
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
      this.emit(
        'update',
        parsed(animateConfig.easing(isReversed ? 1 - status : status)),
        this,
      );
    } else {
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

export class WrapperInstance extends EventEmitter {
  isPlaying: boolean;
  isCompleted: boolean;
  private isReversed: boolean;
  private animateInstance: AnimateInstance | WrapperInstance;
  constructor(ins: AnimateInstance | WrapperInstance) {
    super();
    this.animateInstance = ins;
    (ins as any).on('complete', (animateInstance) => {
      this.end();
      if (!this.isCompleted) animateInstance.isComplete = false;
    });
    (ins as any).on('update', (v) => {
      this.emit('update', v, this);
    });
    (ins as any).on('destroy', (v) => {
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
    if (this.isCompleted) this.complete();
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
