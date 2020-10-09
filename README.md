# tween-animate

## 目标

### 使用
```js
import { Animate } from 'Tween';
const animate = Animate({
  x: 100,
  y: (v) => v + 100,
}, {
  isAssign: false,
}).transform('yoyo').on('update', e => console.log(e));

animate.apply({
  x: 0,
  y: 0
}, 1000);

// tween to {x: 100, y: 100}
```

### 效率更高，性能更好的补间动画

https://voderl.github.io/tween-animate/performance/
32*32的图片的imageData，使用tween变换，即每帧有4096个值参与变换，具体性能可控制台performance页面测试。

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

## build

```
npm run build
```
