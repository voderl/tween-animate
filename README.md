# tween-animate
#### 示例
[Codepen示例](https://codepen.io/voderl/pen/PozZBXj)
```js
import { Animate, Easing } from 'Tween';
const animate = Animate({
  x: 100,
  y: (v) => v + 100,
}, {
  easing:Easing.Quadratic.In,
  isAssign: false,
}).transform('yoyo').on('update', e => console.log(e));

animate.apply({
  x: 0,
  y: 0
}, 2000);

// tween to {x: 100, y: 100}
```
#### Animate 
```js
const animate = Animate(to, options)
// Animate extends EventEmitter
// @to - 变换到的结构，如果有值为函数则为： (oldValue: number):number => newValue;
type options = {
  easing: (number) => number, 
  isAssign: boolean, // 是否直接应用到from对象
}
```
#### AnimateInstance
```js
const animateInstance = animate.apply(from, time: number);
// AnimateInstance extends EventEmitter
```

#### EventEmitter 
```js
animate.on('update', (e) => void console.log(e));
animateInstance.on('update', (e) => void console.log(e));
```
- start
- update
- complete 

#### transform
```js
animate.transform('yoyo').transform('loop',2);
animate.transform('loop', 2).transfrom('yoyo');
// 上述两种写法实际动画是不同的
```
- yoyo
- loop
- reverse

### 效率更高，性能更好的补间动画

https://voderl.github.io/tween-animate/performance/  
32*32的图片的imageData，分别使用[tween-animate](https://github.com/voderl/tween-animate)和[tween.js](https://github.com/tweenjs/tween.js)变换，(4096个值的数组)，具体性能可控制台performance页面测试。

在给定from 和to时，会自动生成用于update的函数，提高效率，性能。
```js
parseFromTo(
  { x: [1, 2, 3], y: 1 }, // from
  { x: [1, 2, 6], y: 3 }, // to
  { isAssign: false },
);
// 得到实际更新函数如下
/** 由from和to得到更新函数
 * @param a - from
 * @param b - status - range 0 - 1
 */
function anonymous(a,b) {
  var a={};var a_x=a["x"]=[];a_x["2"]=3+b*3;a["y"]=1+b*2;return a;
}
// 当 isAssign 为 `true` 时(默认为true);
function anonymous(a,b) {
var a_x=a["x"];a_x["2"]=3+b*3;a["y"]=1+b*2;return a;
}
```
### get start
```html
<script src="https://unpkg.com/tween-animate"></script>
```
```shell
yarn add tween-animate
```

### todo

1. 在只给定 from 时也编译出 `(to: any) => renderFunction` 结构, 进一步提高效率
2. tween 到一个变化的对象，即传入配置`isRefresh`, 每帧执行，需要刷新时全局刷新。有此配置的，不预先生成更新函数

## install

```
npm install
```

## start

```
npm run watch
npm run template
```
then open http://localhost:3000/

## build

```
npm run build
```
