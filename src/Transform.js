import { isAnimate } from './Animate';

const Transform = {
  register(id, func) {
    this[id] = function (...args) {
      if (args.length === 1 && isAnimate(args[0])) return func(args[0]);
      return function transformAnimate(animate) {
        func(animate, ...args);
      };
    };
  },
};
Transform.register('loop', function (animate, num) {
  animate.on('start', (instance) => {
    instance.loopCount = num;
  });
  animate.on('end', (instance) => {
    instance.loopCount--;
    if (instance.loopCount <= 0) instance.isCompleted = true;
    else {
      instance.isCompleted = false;
    }
  });
});
Transform.register('reverse', function (animate) {
  animate.on('start', (ins) => {
    ins.isReversed = !ins.isReversed;
  });
});
Transform.register('yoyo', function (animate) {
  animate.on('start', (ins) => {
    ins.isYoyoed = false;
  });
  animate.on('end', (ins) => {
    ins.isReversed = !ins.isReversed;
    if (!ins.isYoyoed) ins.isCompleted = false;
    ins.isYoyoed = true;
  });
});
export default Transform;