import { Animate, update, Easing, Transform, List } from '../src';
const { assert } = require('chai');
let now = 0;
performance.now = () => 0;
function ticker(elpased) {
  update(elpased);
}
requestAnimationFrame(ticker);
/** 透明度 */

let el = {
  value: 0,
};
let els = [{ value: 0 }, { value: 0 }, { value: 0 }];

const base = Animate({
  from: 0,
  to: 1,
  easing: Easing.Quadratic.In,
  time: 1000,
});
let show = base.extend().on('update', (ins, v) => {
  ins.every((el) => (el.value = v));
});
const show2 = show.extend(Transform.loop(2));
// extend 还可以补充？
const show2WithInterval = Animate(show2, 1000);
const show4 = show2WithInterval.extend(Transform.loop(2));
const hide = show.extend(Transform.reverse());
const yoyo = show.extend(Transform.yoyo());

describe('Check', function () {
  beforeEach(function () {
    el = {
      value: 0,
    };
    els = [{ value: 0 }, { value: 0 }, { value: 0 }];
    List.splice(0, List.length);
  });
  describe('support targets', function () {
    it('can work with none target', () => {
      show.apply().start();
    });
    it('can work with one target', () => {
      show.apply(el).start();
      ticker(700);
      assert.equal(el.value, show.easing(0.7));
    });
    it('can work with more target', () => {
      show.apply(...els).start();
      ticker(300);
      els.forEach((el) => {
        assert.equal(el.value, show.easing(0.3));
      });
    });
  });
  describe('extend', function () {});
});
