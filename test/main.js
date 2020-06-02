import { Animate, update, Easing, Transform, List } from '../src';

window.List = List;
window.update = update;
const el = document.getElementById('animate');
const els = document.querySelectorAll('.a');

const box = document.createElement('div');
box.style.setProperty('background-color', '#008800');
box.style.setProperty('width', '100px');
box.style.setProperty('height', '100px');
document.body.appendChild(box);
window.box = box;
let time = performance.now();

function ticker(timestamp) {
  const elpased = timestamp - time;
  time = timestamp;
  try {
    update(elpased);
    requestAnimationFrame(ticker);
  } catch (err) {
    console.log(err);
  }
}
requestAnimationFrame(ticker);

const body = document.body;
function create(id, tween) {
  const el = document.createElement('p');
  el.innerText = id;
  body.appendChild(el);
  return tween.apply(el, () => console.log('end'));
}
setTimeout(() => {
  const base = Animate({
    to: 1,
    easing: Easing.Quadratic.In,
    time: 1000,
    update(el, v) {
      console.log(el, v);
    },
  });
  const move = Animate({
    from(v) {
      return (el) => {
        const [x = 0, y = 0] = el.style.transform.match(/\d+(?=px)/g) || [];
        return {
          x: parseInt(x),
          y: parseInt(y),
        };
      };
    },
    to(v) {
      return {
        x: v.x,
        y: v.y,
      };
    },
    easing: Easing.Quadratic.In,
    time: 1000,
    update(el, v) {
      // change sortable
      el.style.setProperty('transform', `translate(${v.x}px, ${v.y}px)`);
    },
    assign: false,
  });
  const move2 = move.extend(Transform.yoyo());
  const MoveDelayYoyo = Animate(move, 1000, move.extend(Transform.reverse));
  const base2 = base.extend(Transform.yoyo());
  MoveDelayYoyo.render({
    x: 300,
    y: 200,
  }).apply(box);
  // console.log(base2);
  // base2.apply(0);
});
// const objectChange = Animate({
//   to: {
//     x: 100,
//     y: 200,
//   },
//   easing: Easing.Quadratic.In,
//   time: 1000,
//   update(el, v) {
//     console.log(el, v);
//   },
// });
// var a = { x: 0, y: 0 };
// objectChange.apply(a, () => {
//   console.log(a);
// });
// const combined = Animate(base, 1000, base);
// combined.apply(0);
// base.apply(0, () => {
//   base.apply(1);
// });

// /** 透明度 */
// const show = base;
// const show2 = show.extend(Transform.loop(2));
// // extend 还可以补充？
// const show2WithInterval = Animate(show2, 1000);

// const show4 = show2WithInterval.extend(Transform.loop(2));

// const yoyo = show.extend(Transform.yoyo());
// const yoyo2 = Animate(yoyo, yoyo);
// const yoyoE4 = show.extend(Transform.yoyo(), Transform.loop(4));
// create('yoyo', yoyo);
// create('yoyo and loop 2', yoyo2);
// create('yoyo and loop 4', yoyoE4);
// window.test = create(
//   'loop4 and yoyo',
//   show.extend(Transform.loop(4), Transform.yoyo),
// );
// create('loop Infinity', yoyo.extend(Transform.loop(Infinity)));
// window.animate = {
//   show,
//   hide: show.extend(Transform.reverse()),
//   yoyo,
//   yoyo2,
//   yoyoE4,
//   show2,
//   show4,
//   els: [...els],
// };
// const dir = Animate({
//   from: {
//     x: 0,
//     y: 0,
//     scale: {
//       x: 999,
//       y: 0,
//     },
//   },
//   to: {
//     x: 100,
//     y: 200,
//     scale: {
//       x: 0,
//       y: 666,
//     },
//   },
//   time: 1000,
//   update(el, v) {
//     console.log(v);
//   },
// });
// const move = Animate({});
// move(el, el, el).to({
//   x: 100,
//   y: 100,
// });
// dir.apply(1);
// const list2 = [];
// window.list2 = list2;
// const newBase = Animate({
//   from: 0,
//   to: 1,
//   easing: Easing.Quadratic.In,
//   time: 2000,
//   list: list2,
// }).on('update', (ins, v) => ins.every((el) => (el.style.opacity = v)));
// const a = newBase.extend(Transform.loop(9));
// create('try loop', a);
// 如果一个由其他动画组成的动画Chain， 一次更新100s，它也只是一个小段结束了，应该保留一个
// delayed的值，直接更新100s，按照100s主动触发更新
