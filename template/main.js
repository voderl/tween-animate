/// <reference types="../dist/tween-animate.d.ts" />
function createZone() {
  const div = document.createElement('div');
  const el = document.createElement('canvas');
  el.width = WIDTH;
  el.height = HEIGHT;
  el.style.cssText = `
    width: 400px;
    height: 400px;
    image-rendering: pixelated;
  `;
  div.appendChild(el);
  div.style.cssText = `
    display: inline-block;
    background-color: black;
  `;
  document.body.appendChild(div);
  return el.getContext('2d');
}

const Animate = window.Animate;

console.log(Animate);

Animate.play();
var a = Animate({
  x: 0,
  y: 0,
})
  .to(
    {
      x: 150,
    },
    1000,
  )
  .to(
    {
      x: 100,
      y: 100,
    },
    2000,
  );

var b = a
  .transform('yoyo')
  .on('start', () => console.log('start'))
  .on('update', (v) => console.log('update', v))
  .on('complete', () => console.log('complete'));

// Animate(0, 10, 10000)
//   .transform('step', 10)
//   .transform('loop', Infinity)
//   .on('update', (v) => console.log('update', v));
