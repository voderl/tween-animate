// References:
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// https://gist.github.com/1579671
// http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision
// https://gist.github.com/timhall/4078614
// https://github.com/Financial-Times/polyfill-service/tree/master/polyfills/requestAnimationFrame

// Expected to be used with Browserfiy
// Browserify automatically detects the use of `global` and passes the
// correct reference of `global`, `self`, and finally `window`

const ONE_FRAME_TIME = 16;

// Date.now
if (!(Date.now && Date.prototype.getTime)) {
  Date.now = function now(): number {
    return new Date().getTime();
  };
}

// performance.now
if (!(window.performance && window.performance.now)) {
  const startTime = Date.now();

  if (!window.performance) {
    (window as any).performance = {};
  }

  window.performance.now = (): number => Date.now() - startTime;
}

// requestAnimationFrame
let lastTime = Date.now();
const vendors = ['ms', 'moz', 'webkit', 'o'];

for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  const p = vendors[x];

  window.requestAnimationFrame = (window as any)[`${p}RequestAnimationFrame`];
  window.cancelAnimationFrame =
    (window as any)[`${p}CancelAnimationFrame`] ||
    (window as any)[`${p}CancelRequestAnimationFrame`];
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (
    callback: (...parms: any[]) => void,
  ): number => {
    if (typeof callback !== 'function') {
      throw new TypeError(`${callback}is not a function`);
    }

    const currentTime = Date.now();
    let delay = ONE_FRAME_TIME + lastTime - currentTime;

    if (delay < 0) {
      delay = 0;
    }

    lastTime = currentTime;

    return window.setTimeout(() => {
      lastTime = Date.now();
      callback(performance.now());
    }, delay);
  };
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (id: number): void => clearTimeout(id);
}
