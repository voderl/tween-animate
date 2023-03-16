import parse from '../src/parse';
import { assert } from 'chai';
import cloneDeep from 'lodash/cloneDeep';

const STATUS_LIST = [0, 1, Math.random(), Math.random(), Math.random()];

function stringfy(obj: any) {
  return JSON.stringify(
    obj,
    (key, value) => (typeof value === 'function' ? value.toString() : value),
    '\t',
  );
}
const examples = {
  number: {
    from: -10 * Math.random(),
    to: 10 * Math.random(),
    test(v, from, to) {
      return from + v * (to - from);
    },
  },
  object: {
    from: {
      a: 13,
      b: 17,
    },
    to: {
      a: 17,
      b: 13,
    },
    test(v) {
      return {
        a: 13 + v * (17 - 13),
        b: 17 + v * (13 - 17),
      };
    },
  },
  array: {
    from: [1, 2, 3],
    to: [4, 5, 6],
    test(v, fromArr, toArr) {
      return fromArr.map((from, index) => {
        return from + v * (toArr[index] - from);
      });
    },
  },
  'nested-object-1': {
    from: [
      1,
      {
        a: 1,
      },
    ],
    to: [
      5,
      {
        a: 2,
      },
    ],
    test(v) {
      return [
        1 + 4 * v,
        {
          a: 1 + v,
        },
      ];
    },
  },
  'nested-object-2': {
    from: {
      a: 1,
      b: [1, 2],
    },
    to: {
      a: 5,
      b: [3, 4],
    },
    test(v) {
      return {
        a: 1 + 4 * v,
        b: [1 + 2 * v, 2 + 2 * v],
      };
    },
  },
  'nested-object-3': {
    from: {
      a: [
        {
          b: [
            [
              [
                [
                  {
                    c: 1,
                  },
                ],
              ],
            ],
          ],
        },
      ],
    },
    to: {
      a: [
        {
          b: [
            [
              [
                [
                  {
                    c: 10,
                  },
                ],
              ],
            ],
          ],
        },
      ],
    },
    test(v) {
      return {
        a: [
          {
            b: [
              [
                [
                  [
                    {
                      c: 1 + 9 * v,
                    },
                  ],
                ],
              ],
            ],
          },
        ],
      };
    },
  },
};
describe('parse from and to', () => {
  Object.keys(examples).forEach((key) => {
    const item = examples[key];
    describe(key, function () {
      const { from, to, test } = item;
      it('tween', function () {
        const _from = cloneDeep(from);
        const tween = parse(_from, to);
        STATUS_LIST.forEach((v) => {
          assert.deepEqual(
            tween(v),
            test(v, from, to),
            `\nfrom:${stringfy(from)}\nto:${stringfy(to)}\nstatus:${v}\n`,
          );
        });
      });
    });
  });

  it('parse error when meet NaN', () => {
    assert.throw(() => {
      parse(
        {
          x: NaN,
          y: NaN,
        },
        {
          x: 100,
          y: 100,
        },
      );
    });
  });

  it('parse error when different format', () => {
    assert.throw(() => {
      parse(
        {
          x: 0,
        },
        {
          x: 100,
          y: 100,
        },
      );
    });

    assert.throw(() => {
      parse(
        {
          x: 0,
        },
        {
          x: undefined,
        },
      );
    });

    assert.throw(() => {
      parse(100, {
        x: 0,
      });
    });

    assert.throw(() => {
      parse(
        {
          x: 0,
        },
        100,
      );
    });
  });
});
