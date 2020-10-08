import utils from './utils/utils';
import { AnimateInstance } from './AnimateInstance';
export const List = [];
export const funcList = [];
const { filter } = utils;
export function update(elpased, list = List) {
  if (funcList.length !== 0) {
    funcList.forEach((func) => func());
    funcList.splice(0, funcList.length);
  }
  if (list.length === 0) return;
  filter(list, (ins: AnimateInstance) => {
    if (ins.isCompleted) {
      ins.destroy();
      return false;
    }
    if (ins.isPlaying) ins.update(elpased);
    return true;
  });
}
