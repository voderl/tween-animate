const utils = {
  /**
   * 实现的一个filter， 直接改变源数组，(怕filter生成新数组影响原数组回收,或带来回收成本)
   * 也不知道到底有没有什么好处，先这样= =
   * @param {array} arr
   * @param {function} func
   */
  filter(arr, func) {
    let keep = false;
    let start = 0;
    let deleteCount = 0;
    const len = arr.length;
    for (let i = 0; i < len - deleteCount; i++) {
      if (func(arr[i], deleteCount + i)) {
        if (keep) {
          keep = !keep;
          arr.splice(start, i - start);
          deleteCount += i - start;
          i = start;
        }
      } else if (!keep) {
        start = i;
        keep = !keep;
      }
    }
    if (keep) {
      arr.splice(start, arr.length - start);
    }
    return arr;
  },
  clone(obj) {
    if (typeof obj !== 'object') return obj;
    const newObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      const val = obj[key];
      newObj[key] = typeof val === 'object' ? this.clone(val) : val;
    }
    return newObj;
  },
  cached(fn) {
    const cache = Object.create(null);
    return function cachedFn(str) {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  },
};
export default utils;
