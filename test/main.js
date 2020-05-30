import { Animate, update, Easing, Transform, List } from '../src';

window.List = List;
window.update = update;
const el = document.getElementById('animate');
const els = document.querySelectorAll('.a');
let time = performance.now();
function ticker(timestamp) {
  requestAnimationFrame(ticker);
  const elpased = timestamp - time;
  update(elpased);
  time = timestamp;
}
requestAnimationFrame(ticker);

const body = document.body;
function create(id, tween) {
  const el = document.createElement('p');
  el.innerText = id;
  body.appendChild(el);
  return tween.apply(el).start(() => console.log('end'));
}
const base = Animate({
  from: 0,
  to: 1,
  easing: Easing.Quadratic.In,
  time: 1000,
});
/** 透明度 */
const show = base.extend().on('update', (ins, v) => {
  ins.every((el) => (el.style.opacity = v));
});
const show2 = show.extend(Transform.loop(2));
// extend 还可以补充？
const show2WithInterval = Animate(show2, 1000);

const show4 = show2WithInterval.extend(Transform.loop(2));

const yoyo = show.extend(Transform.yoyo());
const yoyo2 = Animate(yoyo, yoyo);
const yoyoE4 = show.extend(Transform.yoyo(), Transform.loop(4));
create('yoyo', yoyo);
create('yoyo and loop 2', yoyo2);
create('yoyo and loop 4', yoyoE4);
window.test = create(
  'loop4 and yoyo',
  show.extend(Transform.loop(4), Transform.yoyo),
);
window.animate = {
  show,
  hide: show.extend(Transform.reverse()),
  yoyo,
  yoyo2,
  yoyoE4,
  show2,
  show4,
  els: [...els],
};
const width = base.extend({
  to: 20,
});
const list2 = [];
window.list2 = list2;
const newBase = Animate({
  from: 0,
  to: 1,
  easing: Easing.Quadratic.In,
  time: 2000,
  list: list2,
}).on('update', (ins, v) => ins.every((el) => (el.style.opacity = v)));
const a = newBase.extend(Transform.loop(9));
create('try loop', a);
// 如果一个由其他动画组成的动画Chain， 一次更新100s，它也只是一个小段结束了，应该保留一个
// delayed的值，直接更新100s，按照100s主动触发更新
