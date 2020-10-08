import EventEmitter from 'eventemitter3';

type ON = (id: string, func: (ins: any) => void) => void;
const Transform = {
  $register(id: string, func: (on: ON, ...args: any) => void) {
    this[id] = func;
  },
  $apply(id: string, ins: EventEmitter, ...args) {
    if (typeof this[id] === 'function') {
      const on = (a, b) => ins.on(a, b);
      this[id](on, ...args);
    } else throw new Error(`transform "${id}" don't exist`);
  },
};
Transform.$register('loop', (on, num) => {
  on('start', (ins) => {
    ins.loopCount = num;
  });
  on('end', (ins) => {
    ins.loopCount--;
    if (ins.loopCount > 0) ins.isCompleted = false;
  });
});
Transform.$register('reverse', (on) => {
  on('start', (ins) => {
    ins.isReversed = !ins.isReversed;
  });
});
Transform.$register('yoyo', (on) => {
  on('start', (ins) => {
    ins.isYoyoed = false;
  });
  on('end', (ins) => {
    ins.isReversed = !ins.isReversed;
    if (!ins.isYoyoed) ins.isCompleted = false;
    ins.isYoyoed = true;
  });
});
export default Transform;
