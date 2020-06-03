# tween-animate

## template

```js
const { Animate, update, Easing, Transform, List } = tween;

function createZone(x, y, color) {
  const el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.width = '100px';
  el.style.height = '100px';
  el.style.backgroundColor = color;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  return el;
}
const greenBox = createZone(0, 0, '#008800');
const redBox = createZone(400, 100, 'red');

let time = performance.now();
function ticker(timestamp) {
  update(timestamp - time);
  time = timestamp;
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
    y: 150,
  })
  .apply(greenBox, redBox);
```

## how to use

[Test it with Codepen](https://codepen.io/voderl/pen/LYGYYeM)

```html
<script src="https://unpkg.com/tween-animate"></script>
```

## feature

- write an animate and apply elements of the same structure
- easily transform on animte.(reverse, yoyo, loop);
- better performance (maybe...).

## problems

if you have an animate lasted 10 milliseconds, loops 99;
you let it update(1000), then it just complete one loop, left loop 98.

if you use delayed to directly update it's delayed, when it loop Infinity and you leave this page,
when you back to this page, Maximum call stack size exceeded.

so update(num) is not recommended.

## use

### Animate

#### basic construction

```js
const base = Animate({
  from: 0,
  to: 1,
  easing: easingFunction,
  time: 1000,
  update(el, v) {
    // every element will call this method
    // el: Element to which the animation is applied
    // v: easing value (if it is an object, its value will change)
  },
  // default: true, when "from" and "to" are both object, or just has "to"("from" is getted from applied element), is change the applied element ?
  assign: true,
});
```

#### from and to

```js
Number, Object;
```

if options don't have "from" property, "from" will be getted from applied elements.

#### easing

[details](https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md#user-content-available-easing-functions-tweeneasing)

#### apply

```js
base.apply(el1, el2, el3, el4, function callback() {});
```

#### render

In some situations, we need an animate can render its option.(only some property support render [from, to, time]);  
Simultaneously,just for from and to property, if you get function after render, it will apply each element to get value

```js
const base = Animate({
  from(v) {
    return (el) => {
      return {
        x: parseInt(el.x) || 0,
        y: parseInt(el.y) || 0,
      }
    }
  }
  to(v) {
    return {
      x: v.x,
      y: v.y
    }
  },
  time: 1000,
})
const el = {
  x: '20px',
  y: '20px',
}
Animate.apply(el)  // throw error

Animate.render({
  x: 200,
  y: 400,
}).apply(el)  // el will ease from { x: 20, y: 20} to { x: 200, y: 400}

// you can set assgin false and give it an update function to achieve from { x: 20px, y: 20px} to { x: 200px, y: 200px}
```

## install

```
npm install
```

## build

```
npm run build
```
