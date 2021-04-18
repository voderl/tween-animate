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
  ins.tween = (status: number, duration: number, fullTime: number) => {
    if (status >= 1) return tween(1, _fullTime, _fullTime);
    const _duration = duration % _fullTime;
    return tween(_duration / _fullTime, _duration, _fullTime);
  };
});

register('speed', (ins: AnimateInstance, speed: number) => {
  ins.fullTime /= speed;
});

register('reverse', (ins: AnimateInstance) => {
  const tween = ins.tween;
  ins.tween = (status: number, duration: number, fullTime: number) => {
    return tween(1 - status, duration, fullTime);
  };
});

register('yoyo', (ins: AnimateInstance) => {
  const _fullTime = ins.fullTime;
  ins.fullTime *= 2;
  const tween = ins.tween;
  ins.tween = (status: number, duration: number, fullTime) => {
    if (status <= 0.5) {
      return tween(2 * status, duration, _fullTime);
    } else {
      return tween(2 * (1 - status), fullTime - duration, _fullTime);
    }
  };
});

register('delay', (ins: AnimateInstance, time: number) => {
  const _fullTime = ins.fullTime;
  ins.fullTime += time;
  const tween = ins.tween;
  ins.tween = (status: number, duration: number, fullTime: number) => {
    if (duration > time) {
      const _duration = duration - time;
      return tween(_duration / _fullTime, _duration, _fullTime);
    }
  };
});

register('step', (ins: AnimateInstance, count: number) => {
  const tween = ins.tween;
  const stepTime = ins.fullTime / count;
  ins.tween = (status: number, duration: number, fullTime: number) => {
    const v = tween(((status * count) | 0) / count, duration, fullTime);
    ins.isPlaying = false;
    setTimeout(() => {
      ins.time += stepTime;
      ins.isPlaying = true;
    }, stepTime);
    return v;
  };
});
