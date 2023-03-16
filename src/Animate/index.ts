import AnimateInstance from '../AnimateInstance';
import { TweenTo, EasingFunction } from '../types';

function AnimateFunction(from: any): {
  to(to: TweenTo, time: number, easing?: EasingFunction): AnimateInstance;
};
function AnimateFunction(
  from: any,
  to: TweenTo,
  time: number,
  easing?: EasingFunction,
): AnimateInstance;
function AnimateFunction(
  from: any,
  to?: TweenTo,
  time?: number,
  easing?: EasingFunction,
) {
  if (arguments.length > 1) {
    if (typeof time !== 'number') throw new Error(`"time" is required`);
    return new AnimateInstance(from, to, time, easing);
  }
  return {
    to(to: TweenTo, time: number, easing?: EasingFunction) {
      if (typeof time !== 'number') throw new Error(`"time" is required`);
      return new AnimateInstance(from, to, time, easing);
    },
  };
}

export default AnimateFunction;
