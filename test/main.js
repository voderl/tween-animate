import { Animate, update, Easing } from '../src';

const el = document.getElementById('animate');

let time = performance.now();
function ticker(timestamp) {
  requestAnimationFrame(ticker);
  const elpased = timestamp - time;
  update(elpased);
  time = timestamp;
}
requestAnimationFrame(ticker);

const base = Animate({
  from: 0,
  to: 1,
  easing: Easing.Quadratic.In,
  time: 2000,
});

const show = base.extend().on('update', (ins, v) => {
  ins.every((el) => (el.style.opacity = v));
});
show.apply(el).start();
