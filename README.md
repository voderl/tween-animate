# tween-animate

- [tween-animate](#tween-animate)
  - [template](#template)
  - [how to use](#how-to-use)
  - [feature](#feature)
  - [userguide](#userguide)
    - [Animate](#animate)
      - [basic construction](#basic-construction)
      - [from and to](#from-and-to)
      - [apply](#apply)
      - [render](#render)
      - [combined](#combined)
      - [extend](#extend)
    - [update](#update)
    - [Easing](#easing)
    - [Transform](#transform)
    - [List](#list)
  - [problems](#problems)
  - [todo](#todo)
  - [install](#install)
  - [build](#build)

## template

[Test it with Codepen](https://codepen.io/voderl/pen/LYGYYeM)

```js
const { Animate, update, Easing, Transform, List } = tween;

function createZone(x, y, color) {
  const el = document.createElement('div');
  el.style.cssText = `
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: ${color};
    left: ${x}px;
    top: ${y}px;`;
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

- download
  ```url
  https://github.com/voderl/tween-animate/blob/master/dist/tween.umd.js
  ```
- cdn
  ```html
  <script src="https://unpkg.com/tween-animate"></script>
  ```

## feature

- write an animate and apply elements of the same structure
- easily transform on animte.(reverse, yoyo, loop);
- better performance (maybe...).

## userguide

### Animate

#### basic construction

```js
const base = Animate({
  from: 0,
  to: 1,
  easing: easingFunction, // see Easing Section
  time: 1000,
  list: // tween.update(elpased, list) in AnimationFrame, you can set your list Array and update manually
  update(el, v) {
    // every element will call this method
    // el: Element to which this animation is applied
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

#### apply

```js
base.apply(el1, el2, el3, el4, function callback() {});
```

#### render

In some situations, we need an animate can render its option, so we get render function. but now render function is only provided for [from, to, time];

Simultaneously,just for "from" and "to" property, if you get function after render, it will apply each element to get its value.

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
  update(el, v) {
    el.x = `${v.x}px`;
    el.y = `${v.y}px`;
  }
})
const el = {
  x: '20px',
  y: '20px',
}
Animate.apply(el)  // throw error

Animate.render({
  x: 200,
  y: 400,
}).apply(el)  // el will ease from { x: 20px, y: 20px} to { x: 200px, y: 200px}
```

#### combined

```js
const combined = Animate(animate1, 900, animate2);
// play animate1, then wait 900, then play animate2;
const combined = Animate(animate1, [900, animate3], animate2);
// play animate1, then wait 900 and animate3 are all completed, then play animate2; notice: if list have array, when it extends Transform.reverse, it maybe looks weird.
```

#### extend

create an new animate extend base Aniamte

```js
const base = Animate({
  from: 0,
  to: 1,
});
const base2 = base.extend({
  to: 3,
});
const base3 = base.extend(Transform.loop(9));
```

### update

```js
let time = performance.now();
function ticker(timestamp) {
  update(timestamp - time);
  time = timestamp;
  requestAnimationFrame(ticker);
}
requestAnimationFrame(ticker);
```

you can also set your list,

```js
const myList = [];
Animate({
  list: myList,
});
let time = performance.now();
function ticker(timestamp) {
  update(timestamp - time, myList);
  time = timestamp;
  requestAnimationFrame(ticker);
}
requestAnimationFrame(ticker);
```

### Easing

[details](https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md#user-content-available-easing-functions-tweeneasing)

### Transform

- reverse
- loop
- yoyo

[**test it on Codepen**](https://codepen.io/voderl/pen/yLeLgEo)

```js
const show = Animate({
  from: 0,
  to: 1,
  update(el, v) {
    el.style.opacity = v;
  },
});
const showAndHide = show.extend(Transform.yoyo());
const showAndHide4 = showAndHide(Transform.loop(3));
const showAndHide9 = showAndHide2(Transform.loop(9));
showAndHide9.apply(el);
```

### List

default update list

## problems

if you have an animate lasted 10 milliseconds, looped 99;
you let it update(1000), then it will just complete one loop, left loop 98.

if you try that update(1000) will successfully loop 99, when it loop Infinity and you leave this page, if the time you leaving is long, when you back to this page, Maximum call stack size exceeded.

so update(num) is not recommended....emmmm..it looks terrible

## todo

## install

```
npm install
```

## build

```
npm run build
```
