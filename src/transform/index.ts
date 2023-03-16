import AnimateInstance from '../AnimateInstance';

const transforms = {};

/**
 * register a transform
 * @param id - transform id
 * @param func
 */
export function register(
  id: string,
  func: (ins: AnimateInstance, ...args: any[]) => void,
) {
  if (id in transforms) throw new Error(`${id} exists`);
  transforms[id] = func;
}

/**
 * apply transfrom to AnimateInstance
 * @param ins
 * @param id
 * @param args
 */
export function transform(ins: AnimateInstance, id: string, ...args) {
  const item = transforms[id];
  if (typeof item === 'function') {
    item(ins, ...args);
  } else throw new Error(`transform "${id}" don't exist`);
}

// internal transforms

register('loop', (ins: AnimateInstance, count) => {
  const _fullTime = ins.fullTime;
  ins.fullTime *= count;
  const tween = ins.tween;

  // when loop infinity, status cannot work, we need duration.
  ins.tween = (status: number, duration: number) => {
    const _duration = duration % _fullTime;
    if (_duration === 0) {
      if (duration === 0) return tween(0, 0);
      return tween(1, _fullTime);
    }
    return tween(_duration / _fullTime, _duration);
  };
});

register('speed', (ins: AnimateInstance, speed: number) => {
  ins.fullTime /= speed;
});

register('reverse', (ins: AnimateInstance) => {
  const tween = ins.tween;
  const { fullTime } = ins;
  ins.tween = (status: number, duration: number) => {
    return tween(1 - status, fullTime - duration);
  };
});

register('yoyo', (ins: AnimateInstance) => {
  const _fullTime = ins.fullTime;
  ins.fullTime *= 2;
  const tween = ins.tween;
  ins.tween = (status: number, duration: number) => {
    if (status <= 0.5) {
      return tween(2 * status, duration);
    } else {
      return tween(2 * (1 - status), 2 * _fullTime - duration);
    }
  };
});

register('wait', (ins: AnimateInstance, time: number) => {
  const _fullTime = ins.fullTime;
  ins.fullTime += time;
  const tween = ins.tween;
  let lastStatus = null;
  ins.tween = (status: number, duration: number) => {
    if (duration > _fullTime) {
      if (lastStatus !== 1) {
        lastStatus = 1;
        return tween(1, _fullTime);
      }
      return;
    }
    if (lastStatus !== null) lastStatus = null;
    return tween(duration / _fullTime, duration);
  };
});

register(
  'step',
  (ins: AnimateInstance, steps: number, type: 'floor' | 'ceil' = 'floor') => {
    const tween = ins.tween;
    const originFullTime = ins.fullTime;
    let lastStatus = null;
    const stepFunction = type === 'floor' ? Math.floor : Math.ceil;
    ins.tween = (status: number, duration: number) => {
      const _status = stepFunction(status * steps) / steps;
      if (_status === lastStatus) return;
      lastStatus = _status;
      return tween(_status, originFullTime * _status);
    };
  },
);

type TransformKey = 'loop' | 'speed' | 'reverse' | 'yoyo' | 'wait' | 'step';
export interface TransfromFunction {
  (key: 'loop', count: number): AnimateInstance;
  (key: 'speed', speed: number): AnimateInstance;
  (key: 'reverse'): AnimateInstance;
  (key: 'yoyo'): AnimateInstance;
  (key: 'wait', waitTime: number): AnimateInstance;
  (key: 'step', steps: number, type?: 'floor' | 'ceil'): AnimateInstance;
  <T extends string>(
    key: T extends TransformKey ? never : T,
    ...args: any[]
  ): AnimateInstance;
}
