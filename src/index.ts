import './polyfill';
import AnimationFrame from './utils/AnimationFrame';
import './parse';
import Animate from './Animate';
import { update, List } from './update';
import Easing from './utils/Easing';
import Transform from './Transform';

const ticker = AnimationFrame(function ticker(elpased) {
  update(elpased);
});
ticker.play();
Animate.play = ticker.play;
Animate.stop = ticker.stop;

const Tween = {
  Animate,
  update,
  Transform,
  Easing,
};
export default Tween;
