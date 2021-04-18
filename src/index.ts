import './polyfill';
import AnimateFunction from './Animate';
import { animationFrame, updateElapsed, GLOBAL_LIST, update } from './update';
import { register } from './transform';
import Easing from './Easing';

type AnimateFunctionType = typeof AnimateFunction;
interface Animate extends AnimateFunctionType {
  play: typeof animationFrame.play;
  stop: typeof animationFrame.stop;
  registerTransform: typeof register;
  Easing: typeof Easing;
  update: typeof update;
  list: typeof GLOBAL_LIST;
  updateElpased: typeof updateElapsed;
}

const Animate = AnimateFunction as Animate;

Animate.play = animationFrame.play;
Animate.stop = animationFrame.stop;
Animate.registerTransform = register;
Animate.Easing = Easing;
Animate.update = update;
Animate.list = GLOBAL_LIST;
Animate.updateElpased = updateElapsed;

export default Animate;
