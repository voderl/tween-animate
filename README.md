# 补间动画

动画 ，from to，可以传入 from 生成一个动画，extend 生成新函数，附带参数，或者转换

extend. bind from， to， time，speed, updateDelay
extend. transform reverse，loop，fast，slow，yoyo？， 都是返回一个函数
create 一个 动画
fade，

就是直接改数字 再 update(v => obj.prop = v);
再应用动画

可以再传入 to，锁定，再
// 传入一个配置， 参数传入为对象

```js
import { Animate, Easing } from 'Tween';
const loop = new Transform(num);
loop(9);
Transform.register(funtion (animate, num) {

})
Transform.get('loop', 9)  function (animate) {
                              registered(animate, num);
                          }
Transform : { 专门注册的变换, 更改自身，独立开来
  loop(num) {
    return function(Animate) {

    }
  }
  reverse() {

  }
}
Animate({
  from: 0,
  to: 1,
  easing: , // 变化， 组合Animate， 设计是只应用一个，但是可以应用多个
  // 再统一设置， 合成后的Animate依旧可以使用熟悉， 额外value，
  // 可以提供统一参数， 由父Animate 提供给 子Animate
  // 等到完成后执行
  interval: , // 每多少间隔更新一次
  time: ,  // 总时间
  animates: [

  ],
  extend ：创建一个新的 {}, Transform, {}, Transform
  update: { // 改变自身  // 应用组件，
    .reverse(); // 播放开始，播放结束 // 组件的拓展
    reversed Loop();
  }
  EventEmitter: {
    start,
    end,
    stop,
    continue,
    update,
    destroy,
  }
})
EventEmitter:{

}
AnimateInstance: {
  status: initial, playing, stop, end
  play();
  stop();
  Animate: { // 结束后默认, 如果要加事件 不如直接一个新的Animate

  }
  on: {

  }
  once: {
    // 同样原理的once
  }
}
Animate 同时是 可以render的，就是使用props，来操纵，父动画 提供给子动画
子动画如果有props， 实际元素和模板元素分离
一个anime 应用到多个 el ， el = [];

属性，props
分为 属性 ， 事件， extend 将创建一个新的
new Animate({})   // .once 是只执行一次，每次调用实例根据实例判断

AnimateInstance 的示例 中要有EventEmitter吗？如果是多个
// 自身的once， 有多个 el，执行 不太一样
// apply之前调用on， 和 apply之后调用on
//Animate是 引用的，确保之前创建的实例，在基础实例更改后能正常响应
Animate.render(props); => Animate
Animate.extend({}, {}); => data, events
anime.on('update', (v, el) => el.opacity = v);
anime.apply(el);
anime.apply([el1, el2], handle);
const combined = new Animate([animate1, animate2], animate2, [

]);// 如果是数组，则异步执行，全部执行完成才会进入下一个
// 如果是对象，则异步执行，只要有一个执行完成就会进入下一个
AnimateInstance.
AnimateInstance.stop();
combined.provide() {

}
```

```jsx
<async>
  <show>

  </show>
</async>
<hide></hide>
```

// 使用 extend 将拓展一个配置
