import filterWithModifyArray from '../utils/filterWithModifyArray';
import AnimateInstance from '../AnimateInstance';

/**
 * global update list
 */
export const GLOBAL_LIST = [];

/**
 * call this function in your custom requestAnimationFrame
 * ```js
 * const { update }  = Animate;
 * function animate(time) {
 *   requestAnimationFrame(animate)
 *   update();
 * }
 * requestAnimationFrame(animate)
 * ```
 * @param list - update list , default to global list
 */
export function update(list = GLOBAL_LIST) {
  if (list.length === 0) return;
  const now = performance.now();
  filterWithModifyArray(list, (ins: AnimateInstance) => {
    if (ins.isCompleted) {
      return false;
    }
    ins.update(now);
    return true;
  });
}
/**
 * behaves like update, can pass elpased time, like `updateElpased(1000)` to update 1000ms;
 * @param elpased elpased time
 * @param list update list
 */
export function updateElapsed(elpased: number, list = GLOBAL_LIST) {
  if (list.length === 0) return;
  filterWithModifyArray(list, (ins: AnimateInstance) => {
    if (ins.isCompleted) {
      return false;
    }
    ins.updateElpased(elpased);
    return true;
  });
}

export const animationFrame = (function () {
  const requestAnimationFrame = window.requestAnimationFrame;
  let playing = false;
  function ticker() {
    if (playing) {
      update();
      requestAnimationFrame(ticker);
    }
  }
  return {
    /**
     * play requestAnimationFrame.
     * if you want to use custom requestAnimaionFrame, use update function
     */
    play() {
      playing = true;
      requestAnimationFrame(ticker);
    },
    /**
     * stop requestAnimationFrame
     */
    stop() {
      playing = false;
    },
  };
})();
