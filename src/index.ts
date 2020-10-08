import './polyfill';
import AnimationFrame from './utils/AnimationFrame';
import './parse';
import Animate from './Animate';
import { update, List } from './update';
import Easing from './utils/Easing';
import Transform from './Transform';

AnimationFrame(function ticker(elpased) {
  update(elpased);
}).play();

export default { Animate, AnimationFrame, update, Transform, Easing };
