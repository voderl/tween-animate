require('module-alias/register');

import { assert } from 'chai';
import isEqualWith from 'lodash/isEqualWith';

// polyfill window in nodejs
(globalThis as any).window = global;

import Animate from './';

describe('tween', function () {
  it('export successfully', () => {
    assert.equal(typeof Animate, 'function');
    assert.equal(
      [
        'play',
        'stop',
        'registerTransform',
        'Easing',
        'update',
        'updateElpased',
        'list',
      ].every((key) => key in Animate),
      true,
    );
  });
  it('3 params', (done) => {
    const o = {
      x: 0,
    };
    Animate(
      o,
      {
        x: 100,
      },
      {
        time: 1000,
      },
    );
    setTimeout(() => {
      Animate.updateElpased(1000);
      assert.deepEqual(o, { x: 100 });
      done();
    });
  });
  it('Animate config and re-config', () => {
    const a = Animate(
      {
        x: 100,
      },
      1000,
    );
    a.on('test', () => void 0);
    const a_reconfig_1 = a(100);
    const a_reconfig_2 = a.config(100).on('test', () => void 0);
    assert.equal(
      a.animate,
      a_reconfig_1.animate,
      'no new listener will keep animate same',
    );
    assert.notEqual(
      a.animate,
      a_reconfig_2.animate,
      'new listener will create new eventemitter',
    );
    assert.equal(a_reconfig_2.animate.listenerCount('test'), 2);
    assert.equal(a.animate.listenerCount('test'), 1);
  });

  it('no time option will throw an error', () => {
    const a = Animate({
      x: 100,
    });
    assert.throw(() => {
      a.apply(0);
    }, /time/);
  });

  it('option "list" usage', (done) => {
    const customList = [];
    const a = Animate(
      {
        x: 100,
      },
      {
        time: 1000,
        list: customList,
      },
    );
    const b = Animate(
      {
        x: 100,
      },
      1000,
    );
    const a_start = { x: 0 };
    a.apply(a_start);
    const b_start = { x: 0 };
    b.apply(b_start);
    setTimeout(() => {
      Animate.updateElpased(1000);
      assert.equal(a_start.x, 0, 'global update 1000');
      assert.equal(b_start.x, 100, 'global update 1000');
      Animate.updateElpased(1000, customList);
      assert.equal(a_start.x, 100, 'custom update 1000');
      done();
    });
  });

  it('option "isAssign" usage', (done) => {
    const a = Animate(
      {
        x: 100,
      },
      {
        time: 1000,
      },
    );
    const from1 = {
      x: 0,
    };
    const from2 = {
      x: 0,
    };
    a({
      isAssign: true,
    }).apply(from1);
    a({
      isAssign: false,
    }).apply(from2);
    setTimeout(() => {
      Animate.updateElpased(1000);
      assert.equal(from1.x, 100);
      assert.equal(from2.x, 0);
      done();
    });
  });

  it('apply to 1 value or more values', (done) => {
    const a = Animate((from: any) => {
      return {
        x: from.x + 100,
      };
    }, 1000);
    let value1;
    const b = a
      .apply({
        x: 0,
      })
      .on('update', (v) => (value1 = v));
    let values;
    const c = a
      .apply(
        {
          x: 0,
        },
        {
          x: 1,
        },
      )
      .on('update', (v) => (values = v));
    setTimeout(() => {
      Animate.updateElpased(1000);
      assert.deepEqual(value1, { x: 100 }, 'value 1');
      assert.deepEqual(values, [{ x: 100 }, { x: 101 }], 'values');
      done();
    });
  });

  it('Animate add listeners keep same with AnimateInstance add listeners', () => {
    const a = Animate(
      {
        x: 100,
      },
      1000,
    );
    let test = 0;
    a.on('test', () => test++);
    const a_ins = a.apply({ x: 0 });
    const a_ins_2 = a.apply({ x: 0 });
    a_ins.on('test', () => (test += 10));
    a_ins.emit('test');
    assert.equal(test, 11);
    a_ins_2.emit('test');
    assert.equal(test, 12);
  });

  describe('transform test', () => {
    const transformList = [
      ['loop', 2],
      ['loop', 2],
    ];

    function transform(ins: any, list: typeof transformList) {
      return list.reduce(
        (acc, cur) => {
          const last = acc[acc.length - 1];
          acc.push(last.transform(...cur));
          return acc;
        },
        [ins],
      );
    }

    it('Animate transform nested', () => {
      const [a1, a2, a3] = transform(Animate(100, 1000), transformList).map(
        (v) => {
          return v.apply(0);
        },
      );
      assert.equal(a1.fullTime, 1000);
      assert.equal(a2.fullTime, 2000);
      assert.equal(a3.fullTime, 4000);
    });

    it('Animate Instance transform', () => {});
  });

  it('events lifecycle', (done) => {
    const a = Animate((from: any) => {
      return {
        x: from.x + 100,
      };
    }, 1000);
    const addEvents = (ins: any, _events: any[], prefix = '') => {
      ['start', 'update', 'complete'].forEach((key: string) => {
        ins.on(key, (v) => {
          _events.push(prefix + key);
        });
      });
    };
    const events = [];
    addEvents(
      a.apply({
        x: 0,
      }),
      events,
    );
    setTimeout(() => {
      Animate.updateElpased(2000);
      assert.deepEqual(events, ['start', 'update', 'complete']);
      done();
    });
  });

  it('"options" parser', (done) => {
    const a = Animate(
      (from: any) => {
        return {
          x: from.x + 100,
          y: from.y + 100,
        };
      },
      {
        time: 1000,
        parser: {
          parse(el) {
            return {
              x: parseInt(el.x),
              y: parseInt(el.y),
            };
          },
          apply(el, v: any) {
            el.x = v.x + 'px';
            el.y = v.y + 'px';
          },
        },
      },
    );
    const el = {
      x: '1px',
      y: '0px',
    };
    a.apply(el);
    setTimeout(() => {
      Animate.updateElpased(1000);
      assert.deepEqual(el, {
        x: '101px',
        y: '100px',
      });
      done();
    });
  });
});
