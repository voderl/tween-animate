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
var a = Animate(1, {
  time: 1000,
});

var b = a
  .on('start', () => console.log('start'))
  .on('update', (v) => console.log('update', v))
  .on('complete', () => console.log('complete'));

var c = b.transform('loop', 2).apply(0);
