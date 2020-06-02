import validate from '../src/validate';

const { assert } = require('chai');
describe('Check', function () {
  describe('type change', function () {
    it('from string to number', () => {
      const check = {
        x: Number,
        y: [String, Number],
        z: {
          default: 3,
        },
      };
      const data = {
        x: '1',
        y: 2,
      };
      validate(check, data);
      assert.strictEqual(data, {
        x: 1,
        y: '2',
        z: 3,
      });
    });
  });
});
