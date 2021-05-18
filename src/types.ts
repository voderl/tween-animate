import EventEmitter from 'eventemitter3';
import AnimateInstance from './AnimateInstance';

export type TweenValue =
  | number
  | {
      [key: string]: TweenValue;
    }
  | TweenValue[];

export type TweenTo =
  | number
  | {
      [key: string]: TweenTo;
    }
  | TweenTo[]
  | ((from: TweenValue, config: AnimateOptions) => TweenValue);

export type AnimateOptions = {
  time: number;
  easing: (v: number) => number;
  isAssign: boolean;
  list: any[];
  parser?: {
    parse: (v: any) => TweenValue;
    apply: (el: any, v: TweenValue) => void;
  };
};

export interface AnimateValue extends EventEmitter {
  to: TweenTo;
}

export interface AnimateWrapper {
  (options: number | Partial<AnimateOptions>): AnimateWrapper;
  apply: (...args: any[]) => AnimateInstance;
  on: (key: string, ...args: any[]) => AnimateWrapper;
  once: (key: string, ...args: any[]) => AnimateWrapper;
  off: (key: string, ...args: any[]) => AnimateWrapper;
  animate: AnimateValue;
  config: AnimateWrapper;
  transform: (key: string, ...args: any[]) => AnimateWrapper;
}
