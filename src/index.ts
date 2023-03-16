import './polyfill';
import AnimateFunction from './Animate';
import { animationFrame, updateElapsed, GLOBAL_LIST, update } from './update';
import { register } from './transform';
import Easing from './Easing';
import AnimateInstance from './AnimateInstance';

export type AnimateInstanceType = AnimateInstance;

export type AnimateFunctionType = typeof AnimateFunction;

interface AnimateType extends AnimateFunctionType {
  play: typeof animationFrame.play;
  stop: typeof animationFrame.stop;
  registerTransform: typeof register;
  Easing: typeof Easing;
  update: typeof update;
  list: typeof GLOBAL_LIST;
  updateElpased: typeof updateElapsed;
}

const Animate = AnimateFunction as AnimateType;

Animate.play = animationFrame.play;
Animate.stop = animationFrame.stop;
Animate.registerTransform = register;
Animate.Easing = Easing;
Animate.update = update;
Animate.list = GLOBAL_LIST;
Animate.updateElpased = updateElapsed;

export default Animate as AnimateType;
