/**
 * filter with modify array
 * @param {array} arr
 * @param {function} func
 */
export default function filterWithModifyArray(arr, func) {
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
}
