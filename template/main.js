const { Animate, update, Easing, Transform, List } = tween;

function createZone(x, y, color) {
  const el = document.createElement('div');
  el.className = 'zone';
  el.style.backgroundColor = color;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  return el;
}
const greenBox = createZone(100, 100, '#008800');
const redBox = createZone(500, 500, 'red');

let time = performance.now();
function ticker(timestamp) {
  const elpased = timestamp - time;
  time = timestamp;
  update(elpased);
  requestAnimationFrame(ticker);
}
requestAnimationFrame(ticker);

const move = Animate({
  from(v) {
    return (el) => {
      return {
        x: parseInt(el.style.left) || 0,
        y: parseInt(el.style.top) || 0,
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
    el.style.left = `${v.x}px`;
    el.style.top = `${v.y}px`;
  },
  assign: false,
});
const moveYoyo = move.extend(Transform.yoyo(), Transform.loop(Infinity));
moveYoyo
  .render({
    x: 300,
    y: 200,
  })
  .apply(greenBox, redBox);
