export type AnimateConfig = {
  freshFrame?: number;
  easing?: (number) => number;
  isAssign?: boolean; // 在作用到对象时，是否直接deepAssign
  stopWhenLeave?: boolean; // 离开page时，动画是做暂停处理还是继续播放
  list?: Array<any>; // 更新的队列，默认队列为一个队列，单独做队列得单独处理
  formattor?: () => any; // 值变化时触发的formattor
};

export type AnimateInstanceConfig = {
  isAssign: boolean;
};

// event
/**
 * start
 * stop
 * end
 * complete
 */
