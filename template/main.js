const { Animate, AnimationFrame, update, Transform, Easing } = Tween;
const WIDTH = 32;
const HEIGHT = WIDTH;
function createZone() {
  const el = document.createElement('canvas');
  el.width = WIDTH;
  el.height = HEIGHT;
  el.style.cssText = `
    width: 400px;
    height: 400px;
    image-rendering: pixelated;
  `;
  document.body.appendChild(el);
  return el.getContext('2d');
}
const inner = { value: 2 };
function getImageData(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(ctx);
    };
    img.onerror = (err) => reject(err);
  });
}
async function tweenImageData() {
  const ctx = await getImageData('icons.png');
  const fromData = ctx.getImageData(0, 32 * 3, 32, 32);
  const toData = ctx.getImageData(0, 32 * 4, 32, 32);
  const playStage = createZone();
  playStage.putImageData(fromData, 0, 0);
  const btn = document.createElement('button');
  btn.innerText = '按下开始';
  document.body.appendChild(btn);
  btn.addEventListener('click', () => {
    btn.disabled = true;
    Animate(toData.data, {
      easing: Easing.Quadratic.In,
    })
      .transform('yoyo')
      .apply(fromData.data, 1000)
      .on('update', () => {
        playStage.putImageData(fromData, 0, 0);
      })
      .on('complete', () => (btn.disabled = false));
  });
}
tweenImageData();
