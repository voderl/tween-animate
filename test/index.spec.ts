require('module-alias/register');

import { assert } from 'chai';

// polyfill window in nodejs
(globalThis as any).window = global;

import Animate from '../src';
import Easing from '../src/Easing';

const DELTA = 0.0000001;

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
  it('different usage', (done) => {
    const easing = Easing.Bounce.In;
    const from1 = {
      x: 0,
    };
    const from2 = {
      x: 0,
    };
    Animate(
      from1,
      {
        x: 100,
      },
      1000,
      easing,
    );
    Animate(from2).to(
      {
        x: 100,
      },
      1000,
      easing,
    );
    Animate(100, 0, 1000, easing).on('update', () => void 0);

    setTimeout(() => {
      Animate.updateElpased(500);
      assert.deepEqual(from1.x, from2.x);
      assert.deepEqual(from1.x, 100 * easing(0.5));
      done();
    });
  });

  it('no time option will throw an error', () => {
    assert.throw(() => {
      // @ts-ignore
      Animate(0, 100);
    }, /time/);

    assert.throw(() => {
      // @ts-ignore
      Animate(0, 100, 1000).to(200);
    }, /time/);

    assert.throw(() => {
      // @ts-ignore
      Animate(0).to(200);
    }, /time/);
  });

  it('tween change origin object', (done) => {
    const from1 = {
      x: 0,
    };
    Animate(
      from1,
      {
        x: 100,
      },
      1000,
    );
    setTimeout(() => {
      Animate.updateElpased(1000);
      assert.equal(from1.x, 100);
      done();
    });
  });

  describe('transform test', () => {
    function transform(ins: any, list: any) {
      list.forEach((transformProps) => {
        ins.transform(...transformProps);
      });
      return ins;
    }

    it('transform loop', (done) => {
      const obj = { x: 0 };
      Animate(obj, { x: 100 }, 1000).transform('loop', 3);
      setTimeout(() => {
        Animate.updateElpased(2900);
        assert.equal(obj.x, 90);
        done();
      });
    });

    it('transform speed', (done) => {
      const obj = { x: 0 };
      const obj2 = { x: 0 };
      Animate(obj, { x: 100 }, 1000).transform('speed', 2);
      Animate(obj2, { x: 100 }, 1000).transform('speed', 0.5);
      setTimeout(() => {
        Animate.updateElpased(400);
        assert.equal(obj.x, 80);
        assert.equal(obj2.x, 20);
        done();
      });
    });

    it('transform reverse', (done) => {
      const obj = { x: 0 };
      Animate(obj, { x: 100 }, 1000).transform('reverse');
      setTimeout(() => {
        Animate.updateElpased(0);
        assert.equal(obj.x, 100);
        Animate.updateElpased(900);
        assert.closeTo(obj.x, 10, DELTA);
        done();
      });
    });

    it('transform yoyo', (done) => {
      const obj = { x: 0 };
      Animate(obj, { x: 100 }, 1000).transform('yoyo');
      setTimeout(() => {
        Animate.updateElpased(900);
        assert.closeTo(obj.x, 90, DELTA);
        Animate.updateElpased(100);
        assert.equal(obj.x, 100);
        Animate.updateElpased(900);
        assert.closeTo(obj.x, 10, DELTA);
        Animate.updateElpased(100);
        assert.equal(obj.x, 0);
        done();
      });
    });

    it('transform wait', (done) => {
      const obj = { x: 0 };
      const event: any[] = [];
      Animate(obj, { x: 100 }, 1000)
        .transform('wait', 1000)
        .on('complete', () => event.push('complete'));
      setTimeout(() => {
        Animate.updateElpased(900);
        assert.equal(obj.x, 90);
        Animate.updateElpased(100);
        assert.equal(obj.x, 100);
        assert.deepEqual(event, []);
        Animate.updateElpased(1000);
        assert.equal(obj.x, 100);
        assert.deepEqual(event, ['complete']);
        done();
      });
    });

    it('transform step', (done) => {
      const obj = { x: 0 };
      Animate(obj, { x: 100 }, 1000).transform('step', 10);
      const obj2 = { x: 0 };
      Animate(obj2, { x: 100 }, 1000).transform('step', 10, 'ceil');
      setTimeout(() => {
        Animate.updateElpased(50);
        assert.equal(obj.x, 0);
        assert.equal(obj2.x, 10);
        Animate.updateElpased(100);
        assert.equal(obj.x, 10);
        assert.equal(obj2.x, 20);
        Animate.updateElpased(850);
        assert.equal(obj.x, 100);
        assert.equal(obj2.x, 100);
        done();
      });
    });

    it('Animate transform nested', () => {
      const animate1 = transform(
        Animate(0, 100, 1000),
        Array(1).fill(['loop', 2]),
      );
      const animate2 = transform(
        Animate(0, 100, 1000),
        Array(2).fill(['loop', 2]),
      );
      const animate3 = transform(
        Animate(0, 100, 1000),
        Array(3).fill(['loop', 2]),
      );
      assert.equal(animate1.fullTime, 2000);
      assert.equal(animate2.fullTime, 4000);
      assert.equal(animate3.fullTime, 8000);
    });

    it('loop and yoyo', (done) => {
      const animate = transform(Animate(0, 100, 1000), [['loop', 2], ['yoyo']]);
      let currentValue = 0;
      animate.on('update', (v) => {
        currentValue = v;
      });

      const testValue = (timeList: number[], valueList: number[]) => {
        timeList.forEach((time, index) => {
          Animate.updateElpased(time);
          assert.closeTo(currentValue, valueList[index], 0.00001);
        });
      };
      setTimeout(() => {
        // loop1
        testValue([100, 800, 100], [10, 90, 100]);
        // loop2
        testValue([100, 800, 100], [10, 90, 100]);
        // yoyo loop1
        testValue([100, 800, 100], [90, 10, 100]);
        // yoyo loop2
        testValue([100, 800, 100], [90, 10, 0]);
        done();
      });
    });

    it('yoyo and loop', (done) => {
      const animate = transform(Animate(0, 100, 1000), [['yoyo'], ['loop', 2]]);
      let currentValue = 0;
      animate.on('update', (v) => {
        currentValue = v;
      });

      const testValue = (timeList: number[], valueList: number[]) => {
        timeList.forEach((time, index) => {
          Animate.updateElpased(time);
          assert.closeTo(currentValue, valueList[index], 0.00001);
        });
      };
      setTimeout(() => {
        // loop1
        testValue([100, 800, 100], [10, 90, 100]);
        // yoyo1
        testValue([100, 800, 100], [90, 10, 0]);
        // loop2
        testValue([100, 800, 100], [10, 90, 100]);
        // yoyo2
        testValue([100, 800, 100], [90, 10, 0]);
        done();
      });
    });
  });

  it('chain values', (done) => {
    const animate = Animate(0).to(100, 1000).to(50, 1000).to(150, 1000);
    let currentValue = 0;
    animate.on('update', (v) => {
      currentValue = v;
    });
    const testValue = (timeList: number[], valueList: number[]) => {
      timeList.forEach((time, index) => {
        Animate.updateElpased(time);
        assert.closeTo(currentValue, valueList[index], 0.00001);
      });
    };
    setTimeout(() => {
      testValue([800, 200, 800, 200, 800, 200], [80, 100, 60, 50, 130, 150]);
      done();
    });
  });

  it('events lifecycle', (done) => {
    const addEvents = (ins: any, _events: any[], prefix = '') => {
      ['start', 'update', 'complete'].forEach((key: string) => {
        ins.on(key, (v) => {
          _events.push(prefix + key);
        });
      });
    };
    const events = [];
    addEvents(
      Animate({
        x: 0,
      }).to(
        {
          x: 100,
        },
        1000,
      ),
      events,
    );
    setTimeout(() => {
      Animate.updateElpased(1500);
      assert.deepEqual(events, ['start', 'update', 'update', 'complete']);
      done();
    });
  });

  it('destory', (done) => {
    const animate = Animate(0, 100, 1000);
    setTimeout(() => {
      assert.equal(Animate.list.includes(animate), true);
      animate.destroy();
      Animate.updateElpased(0);
      assert.equal(Animate.list.includes(animate), false);
      done();
    });
  });
});
